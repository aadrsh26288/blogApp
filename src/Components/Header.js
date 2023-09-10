import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../Firebase/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaTimes, FaBars } from "react-icons/fa";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

import { useState } from "react";

const Header = () => {
	const [user] = useAuthState(auth);
	const [inputvalue, setinputValue] = useState("");
	const [suggestions, setSuggestions] = useState([""]);
	const [articles, setArticles] = useState([]);
	const [nav, setNav] = useState(false);
	const links = [
		{
			id: 1,
			link: "home",
		},
		{
			id: 2,
			link: "create",
		},
		{
			id: 3,
			link: "login",
		},
		{
			id: 4,
			link: "register",
		},
		{
			id: 5,
			link: "logout",
		},
	];
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
			<div className='fixed w-full top-0'>
				<div className=' z-0 bg-black p-4 text-white flex items-center w-full text-sm justify-between'>
					<div className='hidden md:flex items-center gap-10'>
						<Link to='/'>
							{" "}
							<img
								src='https://img.icons8.com/color/512/autodesk.png'
								className='w-[30px] object-cover '
							/>{" "}
						</Link>

						<div className='flex items-center gap-6'>
							<Link className='' to='/'>
								<p className='cursor-pointer'>Home</p>
							</Link>
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
						<div className='flex items-center gap-2'>
							<input
								type='text'
								placeholder='Search...'
								value={inputvalue}
								onChange={handlequeryChange}
								className='p-1 outline-none  text-black md:w-[300px] w-[200px] px-4  '
							/>
							{user ? (
								<button className='md:hidden flex items-center gap-1 text-md text-white border-2 p-1 px-2 rounded-md'>
									{/* <FaUserCheck className='' /> */}
									{user?.displayName || user?.email}
								</button>
							) : (
								""
							)}
						</div>
						<div className='z-20 bg-white shadow-xl rounded-b-md md:w-[300px] w-[200px]  absolute flex flex-col gap-2'>
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
								className='hidden md:flex '
								onClick={() => {
									signOut(auth);
								}}>
								Logout
							</button>
						) : (
							<Link to='/login'>
								<button className='hidden md:flex '>Login</button>
							</Link>
						)}

						<Link to='/register'>
							{" "}
							<button className=' hidden md:flex'>Register</button>
						</Link>

						{user ? (
							<button className='hidden md:flex items-center gap-1 text-md text-white border-2 p-1 px-2 rounded-md'>
								{/* <FaUserCheck className='' /> */}
								{user?.displayName || user?.email}
							</button>
						) : (
							""
						)}

						<div
							onClick={() => setNav(!nav)}
							className='cursor-pointer pr-4 z-10  md:hidden'>
							{nav ? (
								<FaTimes className='text-white' size={30} />
							) : (
								<FaBars className='text-white' size={30} />
							)}
						</div>
					</div>
				</div>
				{nav && (
					<div className='md:hidden  overflow-hidden flex flex-col  justify-start items-center  bg-white fixed w-full h-screen'>
						<div className='px-4 cursor-pointer capitalize flex flex-col gap-6 items-start mt-10 text-4xl'>
							<Link
								to='/'
								onClick={() => {
									setNav(!nav);
								}}>
								<p>Home</p>
							</Link>
							{user ? (
								<Link
									to='/addblog'
									onClick={() => {
										setNav(!nav);
									}}>
									{" "}
									<button className='flex font-weight-400 '>Create Blog</button>
								</Link>
							) : (
								""
							)}
							{user ? (
								<button
									className=' '
									onClick={() => {
										signOut(auth);
									}}>
									Logout
								</button>
							) : (
								<Link
									to='/login'
									onClick={() => {
										setNav(!nav);
									}}>
									<button className=' '>Login</button>
								</Link>
							)}
							<Link
								to='/register'
								onClick={() => {
									setNav(!nav);
								}}>
								<p>Register</p>
							</Link>{" "}
						</div>
						{user ? (
							""
						) : (
							<p className='mt-10 px-2 text-center'>
								Login or Register to create your own blog
							</p>
						)}
					</div>
				)}
			</div>
		</>
	);
};

export default Header;
