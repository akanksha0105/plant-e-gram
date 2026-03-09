import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../app/axiosInstance";
import { fetchCurrentUser } from "../user/userSlice";

export const loginUser = createAsyncThunk(
	"auth/login",
	async ({ emailId, password }, { rejectWithValue }) => {
		try {
			const response = await api.post("/auth/login", { emailId, password });

			return response.data?.user;
		} catch (err) {
			return rejectWithValue(err.response?.data?.message ?? "Login failed");
		}
	},
);

export const registerUser = createAsyncThunk(
	"auth/register",
	async (user, { rejectWithValue }) => {
		try {
			const response = await api.post("/auth/signup", user);
			return response.data?.user;
		} catch (err) {
			return rejectWithValue(
				err.response?.data?.message ?? "Registration failed",
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
			return rejectWithValue(err.response?.data?.message ?? "Logout failed");
		}
	},
);

const initialState = {
	isAuthenticated: false,
	loading: false,
	error: null,

	isAuthChecked: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,

	reducers: {
		logout: (state) => {
			state.isAuthenticated = false;
			state.error = null;
		},
	},

	extraReducers: (builder) => {
		const handlePending = (state) => {
			state.loading = true;
			state.error = null;
		};

		const handleAuthFulfilled = (state) => {
			state.loading = false;
			state.isAuthenticated = true;

			state.isAuthChecked = true;
		};

		const handleRejected = (state, action) => {
			state.loading = false;
			state.error = action.payload ?? "An unexpected error occurred";
		};

		builder

			.addCase(loginUser.pending, handlePending)
			.addCase(loginUser.fulfilled, handleAuthFulfilled)
			.addCase(loginUser.rejected, handleRejected)

			.addCase(registerUser.pending, handlePending)
			.addCase(registerUser.fulfilled, handleAuthFulfilled)
			.addCase(registerUser.rejected, handleRejected)

			.addCase(logoutUser.pending, handlePending)
			.addCase(logoutUser.fulfilled, (state) => {
				state.isAuthenticated = false;
				state.loading = false;
				state.error = null;
				state.isAuthChecked = true;
			})
			.addCase(logoutUser.rejected, handleRejected)

			.addCase(fetchCurrentUser.pending, handlePending)
			.addCase(fetchCurrentUser.fulfilled, (state) => {
				state.loading = false;
				state.isAuthenticated = true;
				state.isAuthChecked = true;
			})
			.addCase(fetchCurrentUser.rejected, (state) => {
				state.loading = false;
				state.isAuthenticated = false;
				state.isAuthChecked = true;

				state.error = null;
			});
	},
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
