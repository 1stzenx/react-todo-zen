import React from "react";
import TaskCard from "./TaskCard";

const Task = ({ tasks }) => {
	return (
		<div className="mt-16 ">
			<h5 className="text-gray-400 font-semibold text-sm mb-2">
				TODAY'S TASKS
			</h5>
			<div className=" h-[450px] w-full">
				{tasks.length === 0 ? (
					<p className="text-gray-500 font-medium text-center text-sm mt-16">
						No task has been added
					</p>
				) : (
					tasks.map((task, index) => {
						return (
							<TaskCard
								task={task}
								index={index}
							/>
						);
					})
				)}
			</div>
		</div>
	);
};

export default Task;
