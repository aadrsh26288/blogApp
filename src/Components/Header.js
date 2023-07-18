import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaUserCheck } from "react-icons/fa";

const Header = () => {
	const [user] = useAuthState(auth);
	return (
		<header className=' lex bg-black p-4 text-white flex items-center justify-between'>
			<div className=''>
				<Link to='/'>
					{" "}
					<img
						src='https://img.icons8.com/color/512/autodesk.png'
						className='w-[30px] object-cover '
					/>{" "}
				</Link>
			</div>

			<div className='flex items-center  gap-4'>
				<div className=''>
					{user ? (
						<Link to='/addblog'>
							{" "}
							<button className='flex  '>Create Blog</button>
						</Link>
					) : (
						""
					)}
				</div>
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
				<p className='flex items-center gap-1 text-md text-[#6EEB83] '>
					<FaUserCheck className='' />
					{user?.displayName || user?.email}
				</p>
			</div>
		</header>
	);
};

export default Header;
