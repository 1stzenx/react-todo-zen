import React, {
	useContext,
	useState,
} from "react";
import {
	MdOutlineCancel,
	MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import {
	Link,
	useNavigate,
	useParams,
} from "react-router-dom";
import { AppContext } from "../Contexts/AppContext";

const UpdateTask = () => {
	const navigate = useNavigate();
	const params = useParams();
	const [newTask, setNewTask] = useState("");
	const { handleUpdateTask } =
		useContext(AppContext);

	const handleSubmit = (e) => {
		e.preventDefault();
		handleUpdateTask(params.id, newTask);
		navigate("/home");
	};

	return (
		<div className="add-container relative ">
			<div className=" w-full h-full">
				<Link to="/home">
					<MdOutlineCancel className="text-gray-500 absolute cursor-pointer text-[2rem] right-8 mt-8" />
				</Link>

				<form onSubmit={handleSubmit}>
					<input
						className="absolute top-[40%] focus:ring-transparent bg-transparent rounded-3xl py-2.5 px-4 w-[370px] mx-auto text-lg outline-none text-gray-500  border-0 "
						type="text"
						placeholder="Update Task...."
						onChange={(e) =>
							setNewTask(e.target.value)
						}
					/>
					<button
						className="absolute flex items-center bg-blue-700 text-white text-[1rem] rounded-3xl p-4 right-8 bottom-16 cursor-pointer drop-shadow-lg"
						type="submit">
						Update Task
						<MdOutlineKeyboardArrowUp className="ml-2" />
					</button>
				</form>
			</div>
		</div>
	);
};

export default UpdateTask;
