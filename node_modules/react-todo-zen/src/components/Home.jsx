import React, { useEffect } from "react";
import Task from "./Task";
import { MdClear } from "react-icons/md";
import {
	BiLogOut,
	BiMenuAltLeft,
} from "react-icons/bi";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { useState, useContext } from "react";
import { AppContext } from "../Contexts/AppContext";
import { AuthContext } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import AddTask from "./AddTask";

const Menu = () => {
	const navigate = useNavigate();

	const { tasks, getTasks } =
		useContext(AppContext);
	const {
		logout,
		name,
		checkUserAlreadyLoggedIn,
	} = useContext(AuthContext);
	const [active, setActive] = useState(false);
	const [addTask, setAddTask] = useState(false);

	const hide = {
		left: -300,
		transition: "0.8s ease",
	};
	const show = {
		left: 0,
		transition: "0.8s ease",
	};

	function handleLogout() {
		logout();
		navigate("/login");
	}

	useEffect(() => {
		checkUserAlreadyLoggedIn();
		getTasks();
	});

	return (
		<>
			{addTask ? (
				<AddTask
					closeAddTaskComponent={() =>
						setAddTask(false)
					}
				/>
			) : (
				<div className="container relative">
					<div
						style={active ? show : hide}
						className="sidebar absolute h-full w-[240px] bg-blue-900  top-0 p-8 z-10">
						<MdClear
							onClick={() => setActive(false)}
							className="z-[1000]  absolute text-[1.5rem] cursor-pointer right-0 mr-4 text-white"
						/>

						<div className="mt-16">
							<div className="overflow-hidden relative w-12 h-12 bg-gray-100 rounded-full dark:bg-gray-600">
								<svg
									className="absolute -left-1 w-14 h-14 text-gray-400"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg">
									<path
										fill-rule="evenodd"
										d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
										clip-rule="evenodd"></path>
								</svg>
							</div>
							<h4 className="text-[2rem] mt-4 text-white font-bold leading-tight">
								{name}
							</h4>
						</div>

						<button
							onClick={handleLogout}
							style={{
								backgroundColor:
									"rgba(0,0,0, 0.2)",
							}}
							className="text-white w-full font-light mt-16 text-lg rounded-3xl px-5 py-2.5 text-center inline-flex items-center mr-2">
							<BiLogOut className="mr-2" />
							Log Out
						</button>
					</div>
					<div className="relative h-auto ">
						<div className="flex justify-between content-center items-center mb-8 ">
							<BiMenuAltLeft
								className="icon-menu cursor-pointer mr-16 "
								onClick={() => setActive(true)}
							/>
						</div>
						<h1 className="font-semibold text-blue-900 text-[1.8rem] leading-tight">
							Welcome, <span>{name}!</span>
						</h1>
					</div>
					<Task tasks={tasks} />

					<BsFillPlusCircleFill
						onClick={() => setAddTask(true)}
						className="absolute hover:animate-bounce text-blue-700 text-[3.4rem] right-8 bottom-10 z-50 cursor-pointer drop-shadow-lg"
					/>
				</div>
			)}
			)
		</>
	);
};

export default Menu;
