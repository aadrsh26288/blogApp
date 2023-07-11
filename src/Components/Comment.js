import {
	arrayRemove,
	arrayUnion,
	doc,
	onSnapshot,
	updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
// import { } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 as uuidv4 } from "uuid";
import { RxCross2 } from "react-icons/rx";
import { auth, db } from "../Firebase/firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

const Comment = ({ id }) => {
	const [comments, setComments] = useState([]);
	const [comment, setComment] = useState("");
	const [currentlyLoggedinUser] = useAuthState(auth);
	const commentRef = doc(db, "Articles", id);

	useEffect(() => {
		const docRef = doc(db, "Articles", id);
		onSnapshot(docRef, (snapshot) => {
			setComments(snapshot.data().comments);
		});
	}, []);

	const handleChangeComment = (e) => {
		if (e.key === "Enter") {
			updateDoc(commentRef, {
				comments: arrayUnion({
					user: currentlyLoggedinUser.uid,
					userName: currentlyLoggedinUser.displayName,
					comment: comment,
					createdAt: new Date(),
					commentId: uuidv4(),
				}),
			}).then(() => {
				setComment("");
				toast("Comment added successfully", { type: "success" });
			});
		}
	};
	const handleDeleteComment = (comment) => {
		console.log(comment);
		// alert("clicked");
		updateDoc(commentRef, {
			comments: arrayRemove(comment),
		})
			.then((e) => {
				toast("Comment deleted successfully", { type: "success" });
			})
			.catch((e) => {
				console.log(e);
				toast("Error", { type: "error" });
			});
	};

	// console.log(comments)

	return (
		<div className=' mon mt-4'>
			<p>Comments...</p>
			{comments !== null &&
				comments?.map(({ commentId, user, comment, userName, createdAt }) => {
					return (
						<div className='text-black lex py-2' key={commentId}>
							<div className='gap-2 flex items-center '>
								<img
									src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXIdvC1Q4WL7_zA6cJm3yileyBT2OsWhBb9Q&usqp=CAU'
									className='rounded-full h-[40px] w-[40px]'
								/>
								<div>
									<div>
										<div className='flex items-center gap-3'>
											<span className='text-[18px] font-semibold'>
												{userName}
											</span>
											<p className='mon text-[15px]  '>
												{createdAt.toDate().toDateString()}
											</p>
										</div>
									</div>

									<p className='mon'>{comment}</p>
								</div>

								{currentlyLoggedinUser && currentlyLoggedinUser.uid === user ? (
									<RxCross2
										onClick={() =>
											handleDeleteComment({
												commentId,
												user,
												comment,
												userName,
												createdAt,
											})
										}
										className=' cursor-pointer text-[#6EEB83]  ml-10'
									/>
								) : (
									""
								)}
							</div>
						</div>
					);
				})}

			<div className='mr-5'>
				{currentlyLoggedinUser ? (
					<input
						type='text'
						placeholder='typing...'
						className='border-[1px] text-black rounded-xl px-6 border-[#0b2239] mt-4  outline-none w-full p-2 '
						value={comment}
						onChange={(e) => {
							setComment(e.target.value);
						}}
						onKeyUp={handleChangeComment}
					/>
				) : (
					<p>
						<Link to='/login'>
							<span>Login</span>
						</Link>
						/
						<Link to='/register'>
							<span>register </span>
						</Link>
						to comment
					</p>
				)}
			</div>
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='dark'
			/>
		</div>
	);
};

export default Comment;
