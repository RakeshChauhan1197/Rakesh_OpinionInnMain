import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "app/axiosInstanse";
import { IVendor, parameterList } from "./Vendor.type";
import { parentList } from "./Vendor.type";
import { stringify } from "querystring";

interface VendorState {
  data: IVendor[];
  options: any[];
  parentData: parentList[];
  parameterData: parameterList[];
  loading: boolean;
  message: string;
  error: string | null;
}

const initialState: VendorState = {
  data: [],
  options: [],
  parentData: [],
  parameterData: [],
  loading: false,
  message: "",
  error: null,
};

export const fetchParentVendors = createAsyncThunk("vendors/fetchParentVendors", async () => {
  const response = await axiosInstance.get<parentList[]>("/api/VendorMaster/BindParent");
  return response.data;
});

export const fetchParameterValues = createAsyncThunk("vendors/fetchParametervalue", async () => {
  const response = await axiosInstance.get<parameterList[]>("/api/VendorMaster/Dropdown");
  return response.data;
});

export const fetchVendors = createAsyncThunk("venodrs/fetchVendors", async () => {
  const response = await axiosInstance.get<IVendor[]>("api/VendorMaster");
  return response.data;
});

export const addVendor = createAsyncThunk(
  "vendors/addVendor",
  async (newVendor: IVendor, { dispatch }) => {
    const response = await axiosInstance.post("api/VendorMaster", newVendor);
    dispatch(fetchVendors());
    return response.data;
  }
);

export const updateVendor = createAsyncThunk(
  "vendors/updateVendor",
  async (updatedVendor: IVendor) => {
    const response = await axiosInstance.put(
      `api/VendorMaster/${updatedVendor.vid}`,
      updatedVendor
    );
    return response.data;
  }
);

export const deleteVendor = createAsyncThunk("vendors/deleteVendor", async (vendorId: number) => {
  await axiosInstance.delete(`api/VendorMaster/${vendorId}`);
  return vendorId;
});

export const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchParentVendors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchParentVendors.fulfilled, (state, action) => {
        state.loading = false;
        state.parentData = action.payload;
        state.error = null;
      })
      .addCase(fetchParentVendors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch parent vendors";
      })
      .addCase(fetchParameterValues.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchParameterValues.fulfilled, (state, action) => {
        state.loading = false;
        state.parameterData = action.payload;
        state.error = null;
      })
      .addCase(fetchParameterValues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch parent vendors";
      })
      .addCase(fetchVendors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendors.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchVendors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch vendors";
      })
      .addCase(addVendor.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.message = "Vendor added successfully";
        state.error = null;
      })
      .addCase(updateVendor.fulfilled, (state, action) => {
        const updateVendor = action.payload;
        const index = state.data.findIndex((vendor) => vendor.vid === updateVendor.vid);
        if (index !== -1) {
          state.data[index] = updateVendor;
        }
        state.message = "Vendor updated successfully";
        state.error = null;
      })
      .addCase(deleteVendor.fulfilled, (state, action) => {
        const id = action.payload;
        state.data = state.data.filter((vendor) => vendor.vid !== id);
        state.message = "Vendor deleted successfully";
        state.error = null;
      })
      .addCase(deleteVendor.rejected, (state, action) => {
        state.error = action.error.message || "Failed to delete vendor";
      });
  },
});

export default vendorSlice.reducer;
