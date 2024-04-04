import React from "react";
import {
	Navigate,
	useLocation,
} from "react-router-dom";

const ProtectedRoute = ({ children }) => {
	const isLoggedIn =
		localStorage.getItem("isLoggedIn");
	const location = useLocation();
	if (!isLoggedIn) {
		return (
			<Navigate
				to="/login"
				state={{ from: location }}
				replace
			/>
		);
	}
	return children;
};

export default ProtectedRoute;
