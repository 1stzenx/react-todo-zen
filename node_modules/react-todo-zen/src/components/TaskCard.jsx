import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
	BsCircle,
	BsCheckCircleFill,
} from "react-icons/bs";
import { MdOutlineModeEdit } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";
import { AppContext } from "../Contexts/AppContext";

const TaskCard = ({ task, index }) => {
	const navigate = useNavigate();
	const myStyle1 = {
		marginLeft: "0.5rem",
	};
	const myStyle = {
		color: "red",
		textDecoration: "line-through",
		marginLeft: "0.5rem",
	};

	const updateTask = (id) => {
		navigate(`/home/updatetask/${id}`);
	};

	const { handleIsCompleted, handleDelete } =
		useContext(AppContext);

	return (
		<div
			key={index}
			className="flex items-center justify-between rounded-2xl p-4 bg-white mb-2 hover:cursor-pointer">
			<div
				onClick={() => {
					handleIsCompleted(
						task._id,
						task.isCompleted,
					);
				}}
				className="flex items-center min-w-[70%] max-w-[80%]">
				{task.isCompleted ? (
					<BsCheckCircleFill className="text-blue-700 cursor-pointer" />
				) : (
					<BsCircle
						onClick={() => {
							handleIsCompleted(
								task._id,
								task.isCompleted,
							);
						}}
						className="text-blue-700 cursor-pointer"
					/>
				)}
				<span
					className="leading-[20px]"
					style={
						task.isCompleted ? myStyle : myStyle1
					}>
					{task.task}
				</span>
			</div>
			<div className="flex justify-center items-center">
				<MdOutlineModeEdit
					onClick={() => {
						updateTask(task._id, task.task);
					}}
					className="text-[1.7rem] mr-4 opacity-50"
				/>

				<FiTrash2
					onClick={() => {
						handleDelete(task._id);
					}}
					className="text-[#727171] text-[1.4rem]"
				/>
			</div>
		</div>
	);
};

export default TaskCard;
