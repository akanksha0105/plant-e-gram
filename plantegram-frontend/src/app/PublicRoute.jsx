import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
	const { isAuthenticated, loading } = useSelector((store) => store.auth);

	if (loading) return null;

	if (isAuthenticated) {
		return <Navigate to='/' replace />;
	}

	return <Outlet />;
};

export default PublicRoute;
