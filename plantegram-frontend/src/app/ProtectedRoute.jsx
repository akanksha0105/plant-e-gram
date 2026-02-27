import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

// TODO: Get isAuthenticated from Redux
const ProtectedRoute = () => {
	const { isAuthenticated } = useSelector((store) => store.auth);
	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
