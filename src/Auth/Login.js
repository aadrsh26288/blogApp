import React, { useState } from "react";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";
import formbg from "../Images/formbg.png";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/type";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        // alert('login sucsessfull')
        // toast('login sucsessfull',{type:'success'})
        navigate("/");
      })
      .catch((err) => {
        alert("login failed");
      });
  };

  return (
    <>
      <div className="text-white flex flex-col items-center justify-center text-center">
        <p className="text-[40px] text-[#6EEB83] dm">Welcome</p>
        <p className="text-[20px] lex">let's Login quickly</p>
      </div>
      <div className="max-w-[80%] mx-auto flex-col md:flex-row flex mt-10">
        <div>
          <img
            src="https://images.unsplash.com/photo-1580196969807-cc6de06c05be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aWxsdXN0cmF0aW9ufGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=2000&q=60"
            className="md:w-[300px] h-[150px]  md:h-full w-full object-cover"
          />
        </div>

        <div className=" w-full  md:p-8 lex">
          <div className="flex flex-col md:px-4 gap-2 mt-5">
            <label>Email</label>
            <input
              type="email"
              autocomplete="off"
              className="p-2 bg-transparent outline-none border-[1px] border-[#6EEB83] w-full"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col md:px-4 gap-2 mt-5">
            <label>Password</label>
            <input
              type="password"
              autocomplete="off"
              className="p-2 bg-transparent outline-none border-[1px] border-[#6EEB83]"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col md:flex-row justify-between px-4 items-center">
            <button
              type="submit"
              className="bg-[#6EEB83] text-white px-10 mt-5 p-2"
              onClick={handleLogin}
            >
              Submit
            </button>
            <p className="md:text-[20px] md:mt-0 mt-2 text-md text-center lex">
              Don't have an account?
              <Link to="/register">
                <span className="text-[#6EEB83] ">Register</span>
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;