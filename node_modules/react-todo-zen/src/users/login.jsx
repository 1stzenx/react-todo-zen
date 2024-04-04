import React, { useEffect } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import {
	Link,
	useNavigate,
} from "react-router-dom";
import { useContext } from "react";
import { useState } from "react";
import Loader from "../components/Loader";

const Login = () => {
	const navigate = useNavigate();
	const { login, error, pending } =
		useContext(AuthContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async () => {
		const response = await login(email, password);
		if (!response) return;
		navigate("/home");
	};

	return (
		<div className="container py-4">
			<h1 className="font-bold text-[3rem] align-text-middle text-blue-700 mb-[5rem] ">
				TodoList App
			</h1>
			<div className="signup-container">
				<form>
					{error ? (
						<span className="error-bar">
							{error}
						</span>
					) : (
						""
					)}
					<div className="relative z-0 mb-6 w-full group">
						<input
							type="email"
							name="floating_email"
							id="floating_email"
							className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							placeholder=" "
							onChange={(e) =>
								setEmail(e.target.value)
							}
							required
						/>
						<label
							for="floating_email"
							className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
							Email address
						</label>
					</div>
					<div className="relative z-0 mb-6 w-full group">
						<input
							type="password"
							name="floating_password"
							id="floating_password"
							className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							placeholder=" "
							onChange={(e) =>
								setPassword(e.target.value)
							}
							required
						/>
						<label
							for="floating_password"
							className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
							Password
						</label>
					</div>
					<p className="text-gray-900 mb-3">
						Don't have an account?
						<Link to="/signup">
							<span className="text-blue-700 ml-2 cursor-pointer hover:underline">
								Signup
							</span>
						</Link>
					</p>
					<button
						onClick={handleLogin}
						disabled={pending ? true : false}
						className="text-white block bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full mt-8 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
						{pending ? <Loader /> : "Login"}
					</button>
				</form>
			</div>
			<p className="mt-8 text-sm">
				Email: chris@info.com ; Password: 00000000
			</p>
		</div>
	);
};

export default Login;
