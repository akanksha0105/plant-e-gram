import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../app/axiosInstance";
import { setLastIdentifiedPlant } from "../plantIdentification/plantSlice";
import { updateGardenBoard } from "../plants/savedPlantsSlice";

export const fetchCurrentUser = createAsyncThunk(
	"auth/fetchCurrentUser",
	async (_, { dispatch, rejectWithValue }) => {
		try {
			const response = await api.get("/user/me");

			dispatch(setUser(response.data.data.user));
			dispatch(setLastIdentifiedPlant(response.data.data.lastIdentifiedPlant));
			dispatch(
				updateGardenBoard({
					totalSavedCount: response?.data?.data?.totalSavedCount,
					savedPlantsSubset: response?.data?.data?.savedPlantsSubset,
				}),
			);
			return response.data.user;
		} catch (err) {
			return rejectWithValue(null);
		}
	},
);

const initialState = {
	loading: false,
	error: null,

	profile: null,
	emailId: "",
};

const userSlice = createSlice({
	name: "user",
	initialState,

	reducers: {
		setUser: (state, action) => {
			const payload = action.payload;
			if (!payload) return;

			if (payload.profile !== undefined) {
				state.profile = payload.profile;
				state.emailId = payload.emailId ?? "";
				state.savedPlantsIdsArray = payload.savedPlants ?? [];
			} else {
				const { emailId, savedPlants, ...profile } = payload;
				state.profile = profile;

				state.emailId = emailId;
				state.savedPlantsIdsArray = savedPlants;
			}
		},

		clearUser: (state) => {
			state.profile = null;
			state.emailId = "";
			state.savedPlantsIdsArray = [];
			state.error = null;
		},
	},

	extraReducers: (builder) => {
		builder

			.addCase(fetchCurrentUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchCurrentUser.fulfilled, (state) => {
				state.loading = false;
			})
			.addCase(fetchCurrentUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})

			.addCase("auth/logoutUser/fulfilled", (state) => {
				state.profile = null;
				state.emailId = "";
				state.savedPlantsIdsArray = [];
				state.error = null;
			});
	},
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
