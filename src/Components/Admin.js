import React, { useState, useEffect } from "react";
import { db, auth } from "../Firebase/firebaseConfig";
// import { onSnapshot } from "firebase/firestore";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../Firebase/firebaseConfig";

import { deleteDoc, doc } from "firebase/firestore";

const Admin = () => {
	const [articles, setArticles] = useState([]);

	const handleDelete = (id, imageUrl) => {
		if (window.confirm("Are you sure you want to delete this article?")) {
			try {
				const storageRef = ref(storage, imageUrl);
				deleteDoc(doc(db, "Articles", id)).then(() => {
					deleteObject(storageRef);
				});
			} catch (err) {
				console.log(err);
				alert("Something went wrong");
			}
		}
	};

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

	console.log(articles);
	return (
		<div className='h-full'>
			<div className='flex justify-between max-w-[85%] text-xl font-semibold mx-auto mt-10'>
				<p>Sr no.</p>
				<p>Title</p>
				{/* <p>Created by</p> */}
				<p>Delete</p>
			</div>
			<div>
				{articles.map((article, index) => {
					return (
						<div className='flex justify-between max-w-[85%] mx-auto my-4'>
							<p>{index}</p>
							<a>{article.title}</a>
							{/* <p>{article.createdBy}</p> */}
							<button
								onClick={() => handleDelete(article.id, article.imageUrl)}
								className='ml-4 bg-black px-10 py-1 text-center rounded-lg text-white '>
								Delete
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Admin;
