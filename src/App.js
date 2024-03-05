import "./App.css";
import Users from "./users/Users";
import Signup from "./users/signup";
import Login from "./users/login";

import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";
import Home from "./components/Home";
import { AppContextProvider } from "./Contexts/AppContext";
import UpdateTask from "./components/UpdateTask";
import { AuthProvider } from "./Contexts/AuthContext";
import React from "react";
import ProtectedRoute from "./util/ProtectedRoute";

function App() {
	const isLoggedIn =
		localStorage.getItem("isLoggedIn");

	return (
		<AuthProvider>
			<AppContextProvider>
				<BrowserRouter>
					<Routes>
						<Route
							path="/"
							element={
								isLoggedIn === "true" ? (
									<Home />
								) : (
									<Users />
								)
							}
						/>
						<Route
							path="/signup"
							element={<Signup />}
						/>
						<Route
							path="/login"
							element={
								isLoggedIn === "true" ? (
									<Home />
								) : (
									<Login />
								)
							}
						/>

						<Route
							path="/home"
							element={
								<ProtectedRoute>
									<Home />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/home/updatetask/:id"
							element={<UpdateTask />}
						/>
					</Routes>
				</BrowserRouter>
			</AppContextProvider>
		</AuthProvider>
	);
}

export default App;
