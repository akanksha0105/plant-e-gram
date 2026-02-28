import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../app/axiosInstance";
import { fetchCurrentUser, setUser } from "../user/userSlice";

export const loginUser = createAsyncThunk(
	"auth/login",
	async ({ emailId, password }, { dispatch, rejectWithValue }) => {
		try {
			console.log("Here in login user", emailId, password);
			const response = await api.post("/auth/login", {
				emailId,
				password,
			});
			console.log("Response in login", response);
			//populate the user details
			dispatch(setUser(response?.data?.user));
			return response.data;
		} catch (err) {
			console.error("error : ", err);
			return rejectWithValue(err.response?.data?.message || "Login failed");
		}
	},
);

export const registerUser = createAsyncThunk(
	"auth/register",
	async (user, { dispatch, rejectWithValue }) => {
		try {
			const response = await api.post("/auth/signup", user);
			console.log("Response in register", response);
			dispatch(setUser(response?.data?.user));
			return response?.data;
		} catch (err) {
			console.error("error", err);
			return rejectWithValue(
				err.response?.data?.message || "Registeration failed",
			);
		}
	},
);

export const logoutUser = createAsyncThunk(
	"auth/logoutUser",
	async (_, { rejectWithValue }) => {
		try {
			await api.post("/auth/logout");
			return true;
		} catch (err) {
			return rejectWithValue(err);
		}
	},
);

const authSlice = createSlice({
	name: "auth",
	initialState: {
		isAuthenticated: false,
		loading: false,
		error: null,
	},

	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state) => {
				state.loading = false;
				// state.user = action.payload.user;
				state.isAuthenticated = true;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(logoutUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.isAuthenticated = false;
				state.loading = false;
				state.error = null;
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			// REGISTER
			.addCase(registerUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.loading = false;
				// state.user = action.payload.user;
				state.isAuthenticated = true;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(fetchCurrentUser.fulfilled, (state, action) => {
				state.loading = false;
				// state.user = action.payload.user;
				state.isAuthenticated = true;
			});
	},
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
