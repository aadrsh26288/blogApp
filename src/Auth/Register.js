import React, { useEffect, useState } from "react";
import {
	createUserWithEmailAndPassword,
	updateProfile,
	onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";
import formbg from "../Images/formbg.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [loggedin, setLoggedin] = useState("");
	const navigate = useNavigate();

	// useEffect(()=>{
	//   onAuthStateChanged(auth,currentUser=>{
	//     setLoggedin(currentUser)
	//   })
	// })

	const handleRegistration = async () => {
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			updateProfile(auth.currentUser, { displayName: name });
			toast("Registration successful", { type: "success" });
			navigate("/");
		} catch (error) {
			alert("error");
		}
	};

	return (
		<>
			<div className='flex flex-col items-center justify-center text-center mt-2'>
				<p className='text-[40px] font-bold mon '>Welcome</p>
				<p className='text-[20px] mon  '>let's sign up quickly</p>
			</div>
			<div className='max-w-[80%] lex  mx-auto flex-col md:flex-row flex mt-4 '>
				<div>
					<img
						src='https://images.unsplash.com/photo-1580196969807-cc6de06c05be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aWxsdXN0cmF0aW9ufGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=2000&q=60'
						className='md:w-[300px] h-[150px]  md:h-full w-full object-cover'
					/>
				</div>

				<div className='mon w-full  md:p-8'>
					<div className='flex flex-col md:px-4 gap-2 '>
						<label>Name</label>
						<input
							type='text'
							className='p-2 bg-transparent outline-none border-[1px] hover:border-black '
							placeholder='Name'
							onChange={(e) => {
								setName(e.target.value);
							}}
						/>
					</div>

					<div className='flex flex-col md:px-4 gap-2 mt-5'>
						<label>Email</label>
						<input
							type='email'
							autocomplete='off'
							className='p-2 bg-transparent outline-none border-[1px] hover:border-black '
							placeholder='Email'
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						/>
					</div>

					<div className='flex flex-col md:px-4 gap-2 mt-5'>
						<label>Password</label>
						<input
							type='password'
							autocomplete='off'
							className='p-2 bg-transparent outline-none border-[1px] hover:border-black'
							placeholder='Password'
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
					</div>

					<div className='flex flex-col md:flex-row justify-between px-4 items-center'>
						<button
							type='submit'
							className='bg-black text-white px-10 mt-5 p-2'
							onClick={handleRegistration}>
							Submit
						</button>
						<p className='md:text-[20px] text-md text-center'>
							already have an account?
							<Link to='/login'>
								<span className='text-[#6EEB83]'>log-in</span>
							</Link>{" "}
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Register;
