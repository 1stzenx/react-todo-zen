import axios from "axios";
import React, {
	createContext,
	useState,
} from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [name, setName] = useState("");
	const [userid, setUserid] = useState("");
	const [pending, setPending] = useState(false);
	const [error, setError] = useState("");
	const BASE_URL =
		"https://todo-app-z5ff.onrender.com"; //https://todo-app-z5ff.onrender.comhttp://localhost:5000

	const Signup = async (
		name,
		password,
		email,
	) => {
		setError("");
		setPending(true);
		try {
			const res = await axios({
				method: "post",
				url: `${BASE_URL}/signup`,
				data: { name, password, email },
				withCredentials: false,
			});
			if (!res) {
				setPending(false);
				setError("Server Error");
			}
			setPending(false);
			return res.data;
		} catch ({ response }) {
			setPending(false);
			setError(response.data.error);
		}
	};

	const login = async (email, password) => {
		setError("");
		setPending(true);
		try {
			const res = await axios({
				method: "post",
				url: `${BASE_URL}/login`,
				data: { email, password },
				withCredentials: false,
			});
			window.localStorage.setItem(
				"jwt",
				JSON.stringify(res.data),
			);
			window.localStorage.setItem(
				"isLoggedIn",
				"true",
			);

			setName(res.data.name);
			setUserid(res.data.id);
			setPending(false);
			return res.data;
		} catch ({ response }) {
			setPending(false);
			setError(response.data.error);
		}
	};

	const checkUserAlreadyLoggedIn = async () => {
		let data = JSON.parse(
			localStorage.getItem("jwt"),
		);
		if (!data) {
			window.location = "/login";
		} else {
			setName(data.name);
			setUserid(data.id);
		}
	};

	const logout = async () => {
		setName("");
		window.localStorage.removeItem("jwt");
		window.localStorage.removeItem("isLoggedIn");
		window.location = "/login";
	};

	return (
		<AuthContext.Provider
			value={{
				checkUserAlreadyLoggedIn,
				error,
				Signup,
				setError,
				name,
				logout,
				login,
				userid,
				pending,
			}}>
			{children}
		</AuthContext.Provider>
	);
}
