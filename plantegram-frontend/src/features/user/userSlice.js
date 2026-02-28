import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../app/axiosInstance";
import { logoutUser } from "../auth/authSlice";

export const fetchCurrentUser = createAsyncThunk(
	"auth/fetchCurrentUser",
	async (_, { dispatch, rejectWithValue }) => {
		try {
			const response = await api.get("/user/me");
			console.log("Fetched current user response : ", response.data);
			dispatch(setUser(response.data.user));

			return response.data.user;
		} catch (err) {
			console.error("Fetch Current user error : ", err);
			return rejectWithValue(null);
		}
	},
);
const userSlice = createSlice({
	name: "user",
	initialState: {
		loading: false,
		profile: null,
		// followers: [], // array of user IDs
		// following: [], // array of user IDs
		savedPlants: [], // array of plant IDs
		// activityHistory: [], // array of activity objects
		// notifications: [], // array of notification objects
	},

	reducers: {
		setUser: (state, action) => {
			console.log("action.payload in setuser : ", action.payload);
			state.profile = action.payload.profile;
			state.savedPlants = action.payload.savedPlants;
		},

		clearUser: (state) => {
			state.profile = null;
			state.savedPlants = [];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCurrentUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchCurrentUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
				state.isAuthenticated = true;
			})
			.addCase(fetchCurrentUser.rejected, (state, action) => {
				state.loading = false;
				state.user = null;
				state.isAuthenticated = false;
				state.error = action.payload;
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.profile = null;
				state.savedPlants = [];
			});
	},
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
