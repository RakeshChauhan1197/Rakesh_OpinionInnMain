import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "app/axiosInstanse";
import { ITemplate } from "./Emailtemplate.type";
import { Ivariable } from "./Emailtemplate.type";

interface TemplateState {
  // Renamed to TemplateState
  data: ITemplate[];
  loading: boolean;
  message: string;
  error: string | null;
}

const initialState: TemplateState = {
  data: [],
  loading: false,
  message: "",
  error: null,
};

// Fetch Template
export const getTemplate = createAsyncThunk<ITemplate[]>(
  "template/getTemplate", // Updated action name
  async () => {
    const response = await axiosInstance.get("api/Template");
    return response.data;
  }
);
export const fetchVariables = createAsyncThunk("variables/fetchvariables", async () => {
  const response = await axiosInstance.get<{ variables: string }>("api/Template/GetVariables");
  return response.data;
});

const templateSlice = createSlice({
  name: "template", // Updated slice name
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTemplate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTemplate.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getTemplate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default templateSlice.reducer;
