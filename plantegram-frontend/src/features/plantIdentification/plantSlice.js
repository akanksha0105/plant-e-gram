import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../app/axiosInstance";

export const identifyPlant = createAsyncThunk(
	"plant/identifyPlant",
	async ({ files, emailId }, { rejectWithValue }) => {
		try {
			const formData = new FormData();

			files
				.filter((f) => f.done)
				.forEach((f) => formData.append("images", f.file));

			formData.append("emailId", emailId);

			const response = await api.post("/plant/identify", formData);
			return response.data.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data ?? "Plant identification failed",
			);
		}
	},
);

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
		setLastIdentifiedPlant: (state, action) => {
			state.lastIdentifiedPlant = action.payload;
		},
		clearIdentifiedPlant: (state) => {
			state.lastIdentifiedPlant = null;
		},
		clearError: (state) => {
			state.error = null;
		},
	},

	extraReducers: (builder) => {
		builder

			.addCase(identifyPlant.pending, (state) => {
				state.identifyLoading = true;

				state.error = null;
			})
			.addCase(identifyPlant.fulfilled, (state, action) => {
				state.identifyLoading = false;

				state.lastIdentifiedPlant = action.payload;
				state.currentPlant = action.payload;
			})
			.addCase(identifyPlant.rejected, (state, action) => {
				state.identifyLoading = false;
				state.error = action.payload;
			})

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

export const {
	setCurrentPlant,
	setLastIdentifiedPlant,
	clearIdentifiedPlant,
	clearError,
} = plantSlice.actions;
export default plantSlice.reducer;
