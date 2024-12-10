import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "app/axiosInstanse";
import { IEndpage } from "./Endpage.type";

interface EndpageState {
  data: IEndpage[];
  loading: boolean;
  message: string;
  error: string | null;
}

const initialState: EndpageState = {
  data: [],
  loading: false,
  message: "",
  error: null,
};

export const getEndpage = createAsyncThunk("endpage/getEndpage", async () => {
  const response = await axiosInstance.get("api/EndPage");
  return response.data as IEndpage[];
});

export const addEndpage = createAsyncThunk<string, IEndpage>(
  "endpage/addEndpage",
  async (endpage) => {
    const response = await axiosInstance.post("api/EndPage", endpage);
    alert("response" + JSON.stringify(response));
    return response.data;
  }
);
export const deleteEndpage = createAsyncThunk("endpage/deleteEndpage", async (id: number) => {
  const response = await axiosInstance.delete(`api/EndPage?id=${id}`);
  return response.data;
});

export const getShowURL = createAsyncThunk("endpage/getShowURL", async (id: number) => {
  const response = await axiosInstance.get(`api/EndPage?id=${id}`);
  return response.data;
});

export const getText = createAsyncThunk("endpage/getText", async () => {
  const response = await axiosInstance.get(`api/EndPage/GenerateText`);
  return response.data as IEndpage;
});

export const endpageSlice = createSlice({
  name: "endpage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEndpage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEndpage.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Expecting an array
        state.error = null;
      })
      .addCase(addEndpage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addEndpage.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.error = null;
      })
      .addCase(addEndpage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteEndpage.fulfilled, (state, action) => {
        const id = action.payload;
        state.data = state.data.filter((endpage) => endpage.cid !== id);
        state.message = "Endpage deleted successfully";
        state.error = null;
      })
      .addCase(deleteEndpage.rejected, (state, action) => {
        state.error = action.error.message || "Failed to delete Endpage";
      })
      .addCase(getShowURL.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getShowURL.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [action.payload]; // Assuming we are handling a single endpage as an array
        state.error = null;
      })
      .addCase(getShowURL.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch Endpage details";
      });
  },
});

export default endpageSlice.reducer;
