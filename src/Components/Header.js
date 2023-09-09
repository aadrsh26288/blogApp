import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../Firebase/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

import { useState } from "react";

const Header = () => {
	const [user] = useAuthState(auth);
	const [inputvalue, setinputValue] = useState("");
	const [suggestions, setSuggestions] = useState([""]);
	const [articles, setArticles] = useState([]);

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

		fetchArticles();
	}, []);

	const handlequeryChange = (e) => {
		const value = e.target.value;
		setinputValue(value);

		if (value.trim() === "") {
			setSuggestions([]);
		} else {
			const filterArticle = articles.filter((article) => {
				return article.title.toLowerCase().includes(inputvalue.toLowerCase());
			});
			setSuggestions(filterArticle);
		}
	};

	const SuggestionsClick = () => {
		setSuggestions([]);
		setinputValue("");
	};

	console.log("Header", articles);

	return (
		<>
			<header className=' z-0 bg-black p-4 text-white flex items-center justify-between'>
				<div className='flex items-center gap-10'>
					<Link to='/'>
						{" "}
						<img
							src='https://img.icons8.com/color/512/autodesk.png'
							className='w-[30px] object-cover '
						/>{" "}
					</Link>

					<div className='flex items-center gap-6'>
						<p className='cursor-pointer'>Home</p>
						{user ? (
							<Link to='/addblog'>
								{" "}
								<button className='flex font-weight-400 '>Create Blog</button>
							</Link>
						) : (
							""
						)}
					</div>
					{/* <p className='cursor-pointer'>Top blogs</p> */}
					<p className='cursor-pointer'>Latest Stories</p>
					<p className='cursor-pointer'>Communities</p>
				</div>

				<div>
					<div>
						<input
							type='text'
							placeholder='Search...'
							value={inputvalue}
							onChange={handlequeryChange}
							className='p-1 outline-none  text-black w-[300px] px-4  '
						/>
					</div>
					<div className=' bg-white shadow-xl rounded-b-md w-[300px] absolute flex flex-col gap-2'>
						{suggestions.map((s) => {
							return (
								// Add a condition to check if s.id exists before creating the link
								s.id ? (
									<Link
										onClick={() => {
											SuggestionsClick();
										}}
										className=''
										to={`http://localhost:3000/article/${s.id}`}
										key={s.id}>
										<div className='flex justify-start p-2 gap-2'>
											<img
												src={s.imageUrl}
												className='w-12 h-12 object-cover rounded-sm '
												alt={s.title}
											/>
											<p className='text-black text-sm w-full text-start font-medium'>
												{s.title}
											</p>
										</div>
									</Link>
								) : null
							);
						})}
					</div>
				</div>

				<div className='flex items-center  gap-4'>
					{user ? (
						<button
							onClick={() => {
								signOut(auth);
							}}>
							Logout
						</button>
					) : (
						<Link to='/login'>
							<button className=' '>Login</button>
						</Link>
					)}

					<Link to='/register'>
						{" "}
						<button className=' '>Register</button>
					</Link>

					{user ? (
						<button className='flex items-center gap-1 text-md text-white border-2 p-1 px-2 rounded-md'>
							{/* <FaUserCheck className='' /> */}
							{user?.displayName || user?.email}
						</button>
					) : (
						""
					)}
				</div>
			</header>
		</>
	);
};

export default Header;
