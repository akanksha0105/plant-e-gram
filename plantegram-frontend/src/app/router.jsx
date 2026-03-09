import { createBrowserRouter } from "react-router-dom";
import Garden from "../features/garden/pages/GardenBoard";
import Landing from "../pages/Landing";
import AuthLayout from "../features/auth/pages/AuthLayout";
import Login from "../features/auth/pages/Login";
import Signup from "../features/auth/pages/Signup";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import MainLayout from "../layouts/MainLayout";
import PlantProfile from "../features/plants/PlantProfile";
import SavedPlantsPage from "../features/plants/SavedPlants";

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
					{ path: "/garden-board", element: <Garden /> },
					{ path: "/saved-plants", element: <SavedPlantsPage /> },
					{ path: "/plants/:plantId", element: <PlantProfile /> },
				],
			},
		],
	},
]);

export default router;
