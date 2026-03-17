import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../app/axiosInstance";

export const getPlantProfile = createAsyncThunk(
	"plant/viewPlantProfile",
	async (id, { rejectWithValue }) => {
		try {
			const response = await api.get(`/plant/${id}`);
			return response.data.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data ?? "Failed to load plant profile",
			);
		}
	},
);

const initialState = {
	lastIdentifiedPlant: null,
	currentPlant: null,
	identifyLoading: false,
	profileLoading: false,
	error: null,
};

const plantSlice = createSlice({
	name: "plant",
	initialState,

	reducers: {
		setCurrentPlant: (state, action) => {
			state.currentPlant = action.payload;
		},
		clearError: (state) => {
			state.error = null;
		},
	},

	extraReducers: (builder) => {
		builder
			.addCase(getPlantProfile.pending, (state) => {
				state.profileLoading = true;
				state.error = null;
			})
			.addCase(getPlantProfile.fulfilled, (state, action) => {
				state.profileLoading = false;
				state.currentPlant = action.payload;
			})
			.addCase(getPlantProfile.rejected, (state, action) => {
				state.profileLoading = false;
				state.error = action.payload;
			});
	},
});

export const { setCurrentPlant, clearError } = plantSlice.actions;
export default plantSlice.reducer;
