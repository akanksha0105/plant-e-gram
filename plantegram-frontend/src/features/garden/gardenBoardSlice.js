import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../app/axiosInstance";

export const getGardenBoard = createAsyncThunk(
	"gardenBoard/getGardenBoardData",
	async (_, { rejectWithValue }) => {
		try {
			const response = await api.get("/garden-board");
			return response.data.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data ?? "Fetching dashboard data failed",
			);
		}
	},
);
export const identifyPlant = createAsyncThunk(
	"gardenBoard/identifyPlant",
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

const initialState = {
	lastIdentifiedPlant: null,
	identifyLoading: false,
	gardenBoardLoading: false,
	gardenBoardError: null,
	totalSavedPlantsCount: 0,
	savedPlantsSubset: [],
};

const gardenBoardSlice = createSlice({
	name: "gardenBoard",
	initialState,

	reducers: {},

	extraReducers: (builder) => {
		builder
			.addCase(getGardenBoard.pending, (state) => {
				state.gardenBoardLoading = true;
				state.error = null;
			})
			.addCase(getGardenBoard.fulfilled, (state, action) => {
				state.gardenBoardLoading = false;
				state.lastIdentifiedPlant = action.payload.lastIdentifiedPlant;
				state.savedPlantsSubset = action.payload.savedPlantsSubset;
				state.totalSavedPlantsCount = action.payload.totalSavedPlantsCount;
			})
			.addCase(getGardenBoard.rejected, (state, action) => {
				state.gardenBoardLoading = false;
				state.error = action.payload;
			})
			.addCase(identifyPlant.pending, (state) => {
				state.identifyLoading = true;

				state.error = null;
			})
			.addCase(identifyPlant.fulfilled, (state, action) => {
				state.identifyLoading = false;
				state.lastIdentifiedPlant = action.payload.lastIdentifiedPlant;
				//add the plant to the savedplants subset
				//update the total savedcount
			})
			.addCase(identifyPlant.rejected, (state, action) => {
				state.identifyLoading = false;
				state.error = action.payload;
			});
	},
});

// export const { setLastIdentifiedPlant

// } = gardenBoardSlice.actions;
export default gardenBoardSlice.reducer;
