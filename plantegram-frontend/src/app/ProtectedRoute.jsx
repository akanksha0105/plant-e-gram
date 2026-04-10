import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
	const { isAuthenticated, isAuthChecked } = useSelector((store) => store.auth);

	// if (!isAuthChecked) {
	// 	return null;
	// }

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
