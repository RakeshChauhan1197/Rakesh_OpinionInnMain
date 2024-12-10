import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "app/axiosInstanse"; // Ensure axiosInstance path is correct
import { IPolls } from "./Polls.type"; // Ensure IPolls path is correct

// Define the state interface
interface CountryState {
  data: IPolls[];
  loading: boolean;
  message: string;
  error: string | null;
}

// Initialize the state
const initialState: CountryState = {
  data: [],
  loading: false,
  message: "",
  error: null,
};

// Async thunk to get Polls data
export const getPolls = createAsyncThunk<IPolls[]>("polls/getPolls", async () => {
  const response = await axiosInstance.get("api/Polls");
  return response.data;
});

// Async thunk to get Country data
export const getCountry = createAsyncThunk<IPolls[]>("country/getCountry", async () => {
  const response = await axiosInstance.get("api/CountryMaster?sField=CountryCode&sValue=%25");
  return response.data;
});

export const addPolls = createAsyncThunk("polls/addPolls", async (polls: IPolls) => {
  const response = await axiosInstance.post("api/Polls/AddUpdatePoll", polls);
  return response.data;
});

export const GetPollByID = createAsyncThunk("polls/updatePolls", async (tid: number) => {
  const response = await axiosInstance.get(`/api/Polls/GetPollByID?PID=${tid}`);
  return response.data;
});

export const pollsSlice = createSlice({
  name: "polls",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPolls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPolls.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getPolls.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getCountry.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getCountry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addPolls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPolls.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload); // Adding the new poll to existing data
        state.message = "Poll added successfully";
      })
      .addCase(addPolls.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add poll";
      })
      .addCase(GetPollByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetPollByID.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex((poll) => poll.pollId === action.payload.pollId);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
        state.message = "Poll updated successfully";
      })
      .addCase(GetPollByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update poll";
      });
  },
});

// Export the reducer to use in store
export default pollsSlice.reducer;
