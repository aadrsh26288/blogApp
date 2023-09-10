import React, { useState } from "react";
import { Timestamp, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db, auth } from "../Firebase/firebaseConfig";
// import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import Likeblog from "./Likeblog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Addblog(req, res, next) {
	const [user] = useAuthState(auth);
	console.log(user);
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		image: "",
		createdAt: Timestamp.now().toDate(),
	});

	const [progress, setProgress] = useState(0);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleImageChange = (e) => {
		setFormData({ ...formData, image: e.target.files[0] });
	};

	const handlePublish = () => {
		if (!formData.title || !formData.description || !formData.image) {
			alert("Please fill all the fields");
			return;
		}
		setLoading(true);
		const storageRef = ref(
			storage,
			`/images/${Date.now()}${formData.image.name}`,
		);

		const uploadImage = uploadBytesResumable(storageRef, formData.image);

		uploadImage.on(
			"state_changed",
			(snapshot) => {
				const progressPercent = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100,
				);
				setProgress(progressPercent);
			},
			(err) => {
				console.log(err);
				setLoading(false); // Set loading to false in case of an error
			},
			() => {
				setFormData({
					title: "",
					description: "",
					image: "",
				});

				getDownloadURL(uploadImage.snapshot.ref)
					.then((url) => {
						const articleRef = collection(db, "Articles");
						addDoc(articleRef, {
							title: formData.title,
							description: formData.description,
							imageUrl: url,
							createdAt: Timestamp.now().toDate(),
							createdBy: user.displayName,
							userId: user.uid,
							likes: [],
							comments: [],
						})
							.then(() => {
								toast("Article added successfully", { type: "success" });
								setProgress(0);
								setLoading(false); // Set loading to false on success
								navigate("/");
							})
							.catch((err) => {
								toast("Error adding article", { type: "error" });
								setLoading(false); // Set loading to false in case of an error
							});
					})
					.catch((err) => {
						console.log(err);
						setLoading(false); // Set loading to false in case of an error
					});
			},
		);
	};

	return (
		<div className=' p-3 mt-3  mon max-w-[90%] mx-auto '>
			{!user ? (
				<>
					<h2>
						<Link to='/signin'>Login to create article</Link>
					</h2>
					Don't have an account? <Link to='/register'>Signup</Link>
				</>
			) : (
				<>
					<h2 className='text-2xl font-semibold text-center'>Create Article</h2>
					<div className='flex flex-col gap-1  '>
						<label htmlFor='' className='mon font-semibold'>
							Title
						</label>
						<input
							type='text'
							name='title'
							placeholder='Title'
							className='outline-none  bg-transparent p-2 border-[1px] rounded-lg border-black '
							value={formData.title}
							onChange={(e) => handleChange(e)}
						/>
					</div>

					{/* description */}
					<div className='flex flex-col gap-1 mt-5'>
						<label htmlFor='' className='mon font-semibold'>
							Description
						</label>
						<textarea
							name='description'
							placeholder='Description'
							className='outline-none p-2  border-[1px] bg-transparent rounded-lg border-black h-[180px]'
							value={formData.description}
							onChange={(e) => handleChange(e)}
						/>
					</div>

					{/* image */}
					<div className='flex flex-col gap-1 mt-5'>
						<label htmlFor='' className='mon font-semibold'>
							Image
						</label>
						<input
							type='file'
							name='image'
							accept='image/*'
							id='file_input'
							className='block p-2 w-full text-sm  rounded-lg cursor-pointer  focus:outline-none border-[1px] border-black'
							onChange={(e) => handleImageChange(e)}
						/>
					</div>

					{progress === 0 ? null : (
						<div className='progress'>
							<div
								className=' bg-black text-white lex  mt-2'
								style={{ width: `${progress}%` }}>
								{`uploading image ${progress}%`}
							</div>
						</div>
					)}
					{/* <div></div> */}
					<button
						className='bg-white text-balck px-10 mt-5 p-2'
						onClick={handlePublish}>
						{loading === true ? (
							<div className='flex gap-3 items-center'>
								<div className=' loader bw '>
									<div className='spin' />
								</div>
								<p className='text-md font-semibold'>Publishing...</p>
							</div>
						) : (
							"publish"
						)}
					</button>
				</>
			)}
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
				theme='light'
			/>
			{/* Same as */}
			<ToastContainer />
		</div>
	);
}
