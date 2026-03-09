import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../app/axiosInstance";

export const getSavedPlants = createAsyncThunk(
	"savedPlants/fetchSavedPlants",
	async ({ page, limit }, { rejectWithValue }) => {
		try {
			const response = await api.get("/user/saved-plants", {
				params: { page, limit },
			});

			const { plants, hasMore, total } = response.data.savedPlants;
			return { data: plants, hasMore, total };
		} catch (err) {
			console.error("Fetch Saved Plants Error : ", err);
			return rejectWithValue(
				err.response?.data?.message || "Failed to fetch saved plants",
			);
		}
	},
);

const initialState = {
	plants: [], 
	page: 1, 
	limit: 10,
	hasMore: true, 
	savedPlantsLoading: false, 
	savedPlantsError: null, 
	savedPlantsSubset: [],
	totalSavedCount: 0,
};

const savedPlantsSlice = createSlice({
	name: "savedPlants",
	initialState,
	reducers: {
		addSavedPlant: (state, action) => {
			const exists = state.plants.find((p) => p._id === action.payload._id);

			if (!exists) {
				state.plants.push(action.payload);
			}
		},

		updateGardenBoard: (state, action) => {
			state.savedPlantsSubset = action.payload.savedPlantsSubset;
			state.totalSavedCount = action.payload.totalSavedCount;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getSavedPlants.pending, (state) => {
				state.savedPlantsLoading = true;
				state.savedPlantsError = null;
			})
			.addCase(getSavedPlants.fulfilled, (state, action) => {
				state.savedPlantsLoading = false;
				state.plants = action.payload.plants;
				state.savedPlantsError = null;
				state.hasMore = action.payload.hasMore;
			})
			.addCase(getSavedPlants.rejected, (state, action) => {
				state.savedPlantsLoading = false;
				state.savedPlantsError = action.payload;
			});
	},
});

export const { addSavedPlant, updateGardenBoard } = savedPlantsSlice.actions;
export default savedPlantsSlice.reducer;
