import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import plantReducer from "../features/plantIdentification/plantSlice";
import savedPlantsReducer from "../features/plants/savedPlantsSlice";
import gardenBoardReducer from "../features/garden/gardenBoardSlice";
const appStore = configureStore({
	reducer: {
		auth: authReducer,
		user: userReducer,
		plant: plantReducer,
		savedPlants: savedPlantsReducer,
		gardenBoard: gardenBoardReducer,
	},
});

export default appStore;
