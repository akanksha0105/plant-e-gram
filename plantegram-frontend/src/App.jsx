import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./app/router";

import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "./features/user/userSlice";

const App = () => {
	// TODO: Implement the Auth for the initial load of the App
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCurrentUser());
	}, []);
	return <RouterProvider router={router} />;
};

export default App;
