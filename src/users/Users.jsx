import React from "react";
import "./Users.css";
import { Link } from "react-router-dom";

const Users = () => {
	return (
		<div className="container py-4 flex flex-col justify-center align-middle">
			<h1 className="font-bold text-[3rem] text-center text-blue-700 mb-1 ">
				TodoList App
			</h1>
			<p className="text-gray-900 mb-[6rem] text-center font-medium leading-snug">
				The best app to keep track of all your
				activities all through the day.
			</p>
			<Link
				to="/login"
				className="text-white block bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
				Continue
			</Link>
		</div>
	);
};

export default Users;
