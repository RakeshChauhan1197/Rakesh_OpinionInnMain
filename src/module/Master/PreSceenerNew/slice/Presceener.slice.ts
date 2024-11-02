import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "app/axiosInstanse";
import { IPresceener } from "./Presceener.type";

interface PresceenerState {
  data: IPresceener[];
  loading: boolean;
  message: string;
  error: string | null;
}

const initialState: PresceenerState = {
  data: [],
  loading: false,
  message: "",
  error: null,
};

// Fetch Presceener
export const getPresceener = createAsyncThunk<IPresceener[]>(
  "presceener/getPresceener",
  async () => {
    const response = await axiosInstance.get("api/PreScrennerK");
    return response.data;
  }
);

// Assuming you have these async thunks defined somewhere
// Uncomment and implement if these actions exist in your application
// export const addPresceener = createAsyncThunk<IPresceener, IPresceener>(
//   "presceener/addPresceener",
//   async (newPresceener) => {
//     const response = await axiosInstance.post("api/PreScennerK", newPresceener);
//     return response.data;
//   }
// );

// export const updatePresceener = createAsyncThunk<IPresceener, IPresceener>(
//   "presceener/updatePresceener",
//   async (updatedPresceener) => {
//     const response = await axiosInstance.put(`api/PreScennerK/${updatedPresceener.tID}`, updatedPresceener);
//     return response.data;
//   }
// );

// export const deletePresceener = createAsyncThunk<string, string>(
//   "presceener/deletePresceener",
//   async (id) => {
//     await axiosInstance.delete(`api/PreScennerK/${id}`);
//     return id;
//   }
// );

const presceenerSlice = createSlice({
  name: "presceener", // Updated to match the slice's purpose
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPresceener.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPresceener.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getPresceener.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch presceeners";
      });
    // Uncomment to handle these actions if implemented
    // .addCase(addPresceener.fulfilled, (state, action) => {
    //   state.data.push(action.payload);
    //   state.message = "Presceener added successfully";
    //   state.error = null;
    // })
    // .addCase(updatePresceener.fulfilled, (state, action) => {
    //   const updatedPresceener = action.payload;
    //   const index = state.data.findIndex((presceener) => presceener.tID === updatedPresceener.tID);
    //   if (index !== -1) {
    //     state.data[index] = updatedPresceener;
    //   }
    //   state.message = "Presceener updated successfully";
    //   state.error = null;
    // })
    // .addCase(deletePresceener.fulfilled, (state, action) => {
    //   const id = action.payload;
    //   state.data = state.data.filter((presceener) => presceener.tID !== id);
    //   state.message = "Presceener deleted successfully";
    //   state.error = null;
    // })
    // .addCase(deletePresceener.rejected, (state, action) => {
    //   state.error = action.error.message || "Failed to delete presceener";
    // });
  },
});

export default presceenerSlice.reducer;
