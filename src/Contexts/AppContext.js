import React, {
	createContext,
	useContext,
	useState,
} from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";

export const AppContext = createContext();

export function AppContextProvider({ children }) {
	const { userid } = useContext(AuthContext);

	//https://todo-app-z5ff.onrender.comhttp://localhost:5000

	const [name, setName] = useState("");
	const [tasks, setTasks] = useState([]);
	const BASE_URL =
		"https://todo-app-z5ff.onrender.com";

	const getTasks = async () => {
		let { id } = JSON.parse(
			localStorage.getItem("jwt"),
		);
		if (id === null) return;
		let userid = id;
		await axios
			.post(`${BASE_URL}/get`, {
				userid,
			})
			.then((res) => {
				setTasks(res.data);
			})
			.catch((err) => {
				throw Error(err.error);
			});
	};

	const handleNewTask = async (task) => {
		let { jwt } = JSON.parse(
			localStorage.getItem("jwt"),
		);
		let config = {
			headers: {
				"x-auth-token": jwt,
				"content-type": "application/json",
			},
		};
		let url = `${BASE_URL}/add`;
		let data = {
			task,
			userid,
		};
		await axios
			.post(url, data, config)
			.then()
			.catch((err) => {
				throw Error(err.error);
			});
	};

	const handleIsCompleted = async (
		id,
		isCompleted,
	) => {
		let { jwt } = JSON.parse(
			localStorage.getItem("jwt"),
		);
		let config = {
			headers: {
				"x-auth-token": jwt,
				"content-type": "application/json",
			},
		};
		let url = `${BASE_URL}/complete`;
		let data = {
			id,
			isCompleted,
		};
		await axios
			.put(url, data, config)
			.then()
			.catch((err) =>
				console.error(
					"error updating task to completion!",
				),
			);
	};

	const handleUpdateTask = async (id, task) => {
		let { jwt } = JSON.parse(
			localStorage.getItem("jwt"),
		);
		let config = {
			headers: {
				"x-auth-token": jwt,
				"content-type": "application/json",
			},
		};
		let url = `${BASE_URL}/update/${id}`;
		let data = { task };
		try {
			await axios.put(url, data, config);
		} catch (error) {
			throw Error("Updating Error", error);
		}
	};

	const handleDelete = async (id) => {
		try {
			await axios({
				method: "delete",
				data: { id },
				url: `${BASE_URL}/delete`,
			});
		} catch (error) {
			throw Error("Error! Could not delete.");
		}
	};

	return (
		<AppContext.Provider
			value={{
				handleUpdateTask,
				handleDelete,
				setName,
				tasks,
				handleNewTask,
				getTasks,
				name,
				handleIsCompleted,
			}}>
			{children}
		</AppContext.Provider>
	);
}
