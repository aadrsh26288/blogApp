import React, { useState, useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db, auth } from "../Firebase/firebaseConfig";
import Deleteblogs from "./Deleteblogs";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import Likeblog from "./Likeblog";
import { TfiCommentAlt } from "react-icons/tfi";
import { AiOutlineTwitter, AiFillYoutube } from "react-icons/ai";
import Social from "./Social";

const Allblogs = () => {
	const [articles, setArticles] = useState([]);
	const [showAll, setShowAll] = useState(false);
	const [userBlogCounts, setUserBlogCounts] = useState([]);
	const [user] = useAuthState(auth);

	// useEffect(() => {
	// 	const ArticleRef = collection(db, "Articles");
	// 	const q = query(ArticleRef, orderBy("createdAt", "desc"));
	// 	onSnapshot(q, (snapshot) => {
	// 		const articles = snapshot.docs.map((doc) => ({
	// 			id: doc.id,
	// 			...doc.data(),
	// 		}));
	// 		setArticles(articles);
	// 	});
	// }, []);

	useEffect(() => {
		const fetchArticles = async () => {
			const ArticleRef = collection(db, "Articles");
			const q = query(ArticleRef, orderBy("createdAt", "desc"));
			const unsubscribe = onSnapshot(q, (snapshot) => {
				const articles = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setArticles(articles);
			});

			return () => {
				unsubscribe();
			};
		};

		const calculateBlogCounts = () => {
			const blogCounts = [];
			articles.forEach((article) => {
				const { createdBy } = article;
				const existingUser = blogCounts.find(
					(user) => user.createdBy === createdBy,
				);
				if (existingUser) {
					existingUser.blogCount++;
				} else {
					blogCounts.push({ createdBy, blogCount: 1 });
				}
			});
			setUserBlogCounts(blogCounts);
		};
		fetchArticles();
		calculateBlogCounts();
	}, [articles]);

	return (
		<>
			<div className='z-0'>
				{/* <Social article={articles} /> */}

				<div className=' flex md:max-w-[85%] md:flex-row flex-col  mx-auto justify-center  gap-10 content-center'>
					<div className=' w-full text-black bg-white'>
						{articles.length === 0 ? (
							<h1 className='text-center mt-20 lex text-6xl'>Loading...</h1>
						) : (
							""
						)}

						{articles.slice(0, showAll ? articles.length : 5).map((article) => {
							return (
								<div>
									<div
										key={article.id}
										className=' bg-white py-3 rounded-xl flex flex-col lg:flex-row justify-center gap-4 w-full'>
										<div className='overflow-hidden pl-3 '>
											<Link to={`/article/${article.id}`}>
												<img
													src={article.imageUrl}
													className='w-[350px]  object-cover '
												/>
											</Link>
										</div>

										<div className='w-full  px-3'>
											{user && user.uid === article.userId && (
												<div className='flex justify-end p-1 cursor-pointer'>
													<Deleteblogs
														className='text-xl float-right w-full  cursor-pointer'
														id={article.id}
														imageUrl={article.imageUrl}></Deleteblogs>
												</div>
											)}

											<p className='mon font-bold text-[26px] -mt-2 '>
												{article.title}
											</p>
											<div className='flex justify-between items-center w-full  pr-5'>
												<p className='mon text-[12px] font-semibold '>
													{article.createdBy}
												</p>
												<p className='mon text-[12px] text-gray-500'>
													{article.createdAt.toDate().toDateString()}
												</p>
											</div>
											<div className='mt-7'>
												<p className='text-[12px] mon font-weight-400 text-[#475569] text-justify pb-4'>
													{article.description
														.split(" ")
														.slice(0, 10)
														.join(" ")}
													...
												</p>
											</div>

											<div className='flex items-center mb-4 gap-6 justify-end'>
												<Link to={`/article/${article.id}`}>
													{" "}
													<div className='flex items-center gap-1 text-[12px] mon'>
														<TfiCommentAlt className='mt-1' />
														<span>{article.comments?.length}</span>
													</div>
												</Link>
												<div>
													{user && (
														<p className='text-[12px] mon flex items-center gap-1 w-full justify-end '>
															{" "}
															<Likeblog
																id={article.id}
																likes={article.likes}
															/>{" "}
															{article.likes?.length}
														</p>
													)}

													{!user ? (
														<p className=' text-[12px] mon'>
															{article.likes?.length} Likes
														</p>
													) : (
														""
													)}
												</div>
											</div>
										</div>
									</div>
								</div>
							);
						})}
						{articles.length === 0 ? (
							""
						) : (
							<div className='w-full flex justify-center'>
								{articles.length > 5 ? (
									<button
										onClick={() => {
											setShowAll(!showAll);
										}}
										className=' my-4 bg-black text-white p-2 rounded-md px-8'>
										{showAll == true ? "Show Less" : "Show All"}
									</button>
								) : (
									""
								)}
							</div>
						)}
					</div>
					{/* {articles.length === 0 ? (
						""
					) : (
						
					)} */}

					<div className='md:w-[40%] '>
						<div className='bg-white p-3'>
							<h1 className='mon text-[24px] font-bold'>Follow Us</h1>
							<div className='grid grid-cols-2 p-1 gap-2'>
								<div className=' flex justify-center items-center gap-1 rounded-xl bg-blue-500 text-white p-2 text-xl'>
									<AiOutlineTwitter className='' />
									<p className='text-[14px] mon font-weight-400'>Twitter</p>
								</div>

								<div className=' flex justify-center items-center gap-1 rounded-xl bg-red-500 text-white p-2 text-xl'>
									<AiFillYoutube className='' />
									<p className='text-[14px] mon font-weight-400'>Youtube</p>
								</div>
							</div>
						</div>
						<div className='bg-white mt-10'>
							<h1 className='p-3 text-[24px] font-bold mon'>
								Discover more of what matters to you
							</h1>
							<div className='grid grid-cols-3 gap-4 p-3'>
								<div className='w-full rounded-xl flex items-center justify-center bg-gray-300 text-[14px] mon p-2'>
									#Tech
								</div>

								<div className=' w-full rounded-xl flex items-center justify-center bg-gray-300 text-[14px] mon p-2'>
									#Sports
								</div>

								<div className=' w-full rounded-xl flex items-center justify-center bg-gray-300 text-[14px] mon p-2'>
									#Politics
								</div>

								<div className='w-full rounded-xl flex items-center justify-center bg-gray-300 text-[14px] mon p-2'>
									#Writing
								</div>

								<div className='w-full rounded-xl flex items-center justify-center bg-gray-300 text-[14px] mon p-1'>
									#Life
								</div>

								<div className='rounded-xl flex items-center justify-center bg-gray-300 text-[14px] mon p-1'>
									#New
								</div>
							</div>
						</div>
						<Social article={articles} />

						<div className='bg-white mt-10 p-2'>
							<p className='text-[20px] font-semibold mon'>Top Writters</p>
							{userBlogCounts.map((blogger) => (
								// <li key={blogger.createdBy}>
								// 	{blogger.createdBy}: {blogger.blogCount} blogs
								// </li>

								<div className='mon flex justify-between items-center mt-3 '>
									<div className='flex items-center gap-2'>
										<img
											src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXIdvC1Q4WL7_zA6cJm3yileyBT2OsWhBb9Q&usqp=CAU'
											className='rounded-full h-[35px] w-[35px]'
										/>
										<p className='text-[14px] font-semibold'>
											{blogger.createdBy}
										</p>
									</div>

									<p>{blogger.blogCount}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Allblogs;
