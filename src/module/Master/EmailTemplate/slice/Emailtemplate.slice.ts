import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "app/axiosInstanse";
import { ITemplate } from "./Emailtemplate.type";

interface TemplateState {
  data: ITemplate[];
  loading: boolean;
  message: string;
  error: string | null;
  variables: string;
}

const initialState: TemplateState = {
  data: [],
  loading: false,
  message: "",
  error: null,
  variables: "",
};

// Fetch Template
export const getTemplate = createAsyncThunk<ITemplate[]>("template/getTemplate", async () => {
  const response = await axiosInstance.get("api/Template");
  return response.data;
});

// Fetch Variables
export const fetchTemplateVariables = createAsyncThunk<{ variables: string }>(
  "template/fetchVariables",
  async () => {
    const response = await axiosInstance.get<{ variables: string }>("api/Template/GetVariables");
    return response.data;
  }
);
// Add Template
export const addTemplate = createAsyncThunk("template/addTemplate", async (template: ITemplate) => {
  const response = await axiosInstance.post("api/Template", template);
  return response.data;
});

// Update Template
export const updateTemplate = createAsyncThunk(
  "template/updateTemplate",
  async (template: ITemplate) => {
    const response = await axiosInstance.put(`api/Template?tid=${template.tid}`, template);
    return response.data;
  }
);

// Delete Template
export const deleteTemplate = createAsyncThunk("template/deleteTemplate", async (id: number) => {
  const response = await axiosInstance.delete(`api/Template?tid=${id}`);
  return response.data;
});

const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle getTemplate
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
        state.error = action.error.message || "Failed to fetch templates";
      })
      // Handle addTemplate
      .addCase(addTemplate.fulfilled, (state, action) => {
        state.message = "Template added successfully";
        state.data.push(action.payload);
        state.error = null;
      })
      .addCase(addTemplate.rejected, (state, action) => {
        state.error = action.error.message;
      })

      // Handle updateTemplate
      .addCase(updateTemplate.fulfilled, (state, action) => {
        const updatedTemplate = action.payload;
        const index = state.data.findIndex((template) => template.tid === updatedTemplate.tid);
        if (index !== -1) {
          state.data[index] = updatedTemplate;
        }
        state.message = "Template updated successfully";
        state.error = null;
      })
      .addCase(updateTemplate.rejected, (state, action) => {
        state.error = action.error.message;
      })

      // Handle deleteTemplate
      .addCase(deleteTemplate.fulfilled, (state, action) => {
        const id = action.payload; // The ID used in the delete request
        state.data = state.data.filter((template) => template.tid !== id);
        state.message = " ";
        state.error = null;
      })
      .addCase(deleteTemplate.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(fetchTemplateVariables.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTemplateVariables.fulfilled,
        (state, action: PayloadAction<{ variables: string }>) => {
          state.loading = false;
          state.variables = action.payload.variables;
          state.error = null;
        }
      )
      .addCase(fetchTemplateVariables.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch template variables";
      });
  },
});

export default templateSlice.reducer;
