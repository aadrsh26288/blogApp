import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../Firebase/firebaseConfig";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { AiFillHeart } from "react-icons/ai";

const Likeblog = ({ id, likes }) => {
	const [user] = useAuthState(auth);
	const LikeRef = doc(db, "Articles", id);

	const handleLike = () => {
		if (likes?.includes(user.uid)) {
			updateDoc(LikeRef, {
				likes: arrayRemove(user.uid),
			}).then(() => {});
		} else {
			updateDoc(LikeRef, {
				likes: arrayUnion(user.uid),
			}).then(() => {
				console.log("liked");
			});
		}
	};

	return (
		<div className='cursor-pointer text-[14px]'>
			<AiFillHeart
				className={
					likes?.includes(user.uid)
						? `text-[12px] mon cursor-pointer text-red-500`
						: "cursor-pointer"
				}
				onClick={handleLike}
			/>
		</div>
	);
};

export default Likeblog;
