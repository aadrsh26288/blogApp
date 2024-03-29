import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import { auth, db } from "../Firebase/firebaseConfig";
import { BsFacebook, BsPinterest } from "react-icons/bs";
import { AiFillTwitterCircle } from "react-icons/ai";
import Comment from "./Comment";

const Blog = () => {
	const { id } = useParams();
	const [article, setArticle] = useState(null);
	const [user] = useAuthState(auth);

	useEffect(() => {
		const docRef = doc(db, "Articles", id);
		onSnapshot(docRef, (snapshot) => {
			setArticle({ ...snapshot.data(), id: snapshot.id });
		});
	});

	return (
		<div className='pt-10'>
			{article && (
				<div className="flex items-center justify-center flex-col bg-[url('https://images.unsplash.com/photo-1528035015334-80868324e60e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTEwfHxiYWNrZ3JvdW5kfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=2000&q=60')] bg-center bg-no-repeat object-cover h-[200px]">
					<p className='mon font-bold text-[32px] text-white  text-center '>
						{article.title}
					</p>
					{/* <p className="dm text-[32px] text-white ">by-{article.createdBy}</p> */}
				</div>
			)}

			{/* <img className="h-[350px] object-cover w-full" src=''/> */}
			{article && (
				<div className='flex py-5 md:flex-row flex-col items-start justify-center '>
					<div className='px-4 w-[400px] '>
						<img className='object-cover ' src={article.imageUrl} />
					</div>
					<div className='w-full p-2'>
						<div className='flex justify-between items-center w-full   '>
							<p className='mon text-[26px] font-bold  '>{article.title}</p>
							<p className='mon text-gray-400'>
								{article.createdAt.toDate().toDateString()}
							</p>
						</div>
						<p className='text-[14px] mon font-weight-400 text-[#475569] text-justify pr-4'>
							{article.description}
						</p>

						<div className='flex  flex-wrap gap-4 items-center gap-8 mt-12'>
							<div className='flex  items-center gap-2 text-gray-600 lex text-md'>
								<span>645</span>
								<span>SHARES</span>
							</div>

							<div className='flex gap-4 items-center gap-2 text-md  text-[#3B5998] lex '>
								<BsFacebook className=' ' />
								<span>SHARE</span>
							</div>

							<div className='flex items-center gap-2 text-md  text-[#00ACED] lex'>
								<AiFillTwitterCircle />
								<span>TWEET</span>
							</div>

							<div className='flex items-center gap-2 text-md  text-[#CC232A] lex'>
								<BsPinterest />
								<span>873</span>
							</div>
						</div>

						<Comment id={article.id} />
					</div>
				</div>
			)}
		</div>
	);
};

export default Blog;
