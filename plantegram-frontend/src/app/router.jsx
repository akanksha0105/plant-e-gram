import { createBrowserRouter } from "react-router-dom";
import Plants from "../pages/Plants";
import Garden from "../pages/Garden";
import Landing from "../pages/Landing";
import AuthLayout from "../features/auth/pages/AuthLayout";
import Login from "../features/auth/pages/Login";
import Signup from "../features/auth/pages/Signup";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import MainLayout from "../layouts/MainLayout";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Landing />,
	},
	{
		element: <PublicRoute />, // 👈 block authenticated users
		children: [
			{
				element: <AuthLayout />, // layout for login/signup
				children: [
					{ path: "/login", element: <Login /> },
					{ path: "/signup", element: <Signup /> },
				],
			},
		],
	},

	{
		element: <ProtectedRoute />,
		children: [
			{
				element: <MainLayout />,
				children: [
					{ path: "/garden", element: <Garden /> },
					{ path: "/plants", element: <Plants /> },
					// { path: "/plants/:id", element: <PlantProfile /> },
				],
			},
		],
	},
]);

export default router;
