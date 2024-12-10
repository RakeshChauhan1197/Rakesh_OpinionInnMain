import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "app/axiosInstanse"; // Ensure the path is correct
import { IVendorparent } from "./Vendorparent.type";

// Define the state structure for Vendorparents
interface VendorparentState {
  data: IVendorparent[];
  loading: boolean;
  message: string;
  error: string | null;
}

const initialState: VendorparentState = {
  data: [],
  loading: false,
  message: "",
  error: null,
};

// Fetch vendor parents
export const getVendorParent = createAsyncThunk("vendorparent/getVendorParent", async () => {
  const response = await axiosInstance.get("api/VendorParent");
  return response.data as IVendorparent[]; // Ensure response data matches the type
});

// Add vendor parent
export const addVendorparent = createAsyncThunk(
  "vendorparent/addVendorparent",
  async (vendorparent: IVendorparent) => {
    alert("vendorparent" + JSON.stringify(vendorparent));
    const response = await axiosInstance.post("api/VendorParent", vendorparent);
    alert("response" + JSON.stringify(response));
    return response.data.message;
  }
);

// Update vendor parent
export const updateVendorparent = createAsyncThunk(
  "vendorparent/updateVendorparent",
  async (vendorparent: IVendorparent) => {
    alert("vendorparent" + JSON.stringify(vendorparent));
    const response = await axiosInstance.put(
      `api/VendorParent?tid=${vendorparent.tid}`,
      vendorparent
    );
    alert("response" + JSON.stringify(response));
    return response.data;
  }
);

// Slice
export const vendorparentSlice = createSlice({
  name: "vendorparent",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVendorParent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVendorParent.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Set the data from the payload
        state.error = null;
      })
      .addCase(getVendorParent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch data";
      })
      .addCase(addVendorparent.pending, (state) => {
        state.loading = true;
      })
      .addCase(addVendorparent.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload; // Set success message
        state.error = null;
      })
      .addCase(addVendorparent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateVendorparent.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateVendorparent.fulfilled, (state, action) => {
        state.loading = false;
        const updatedVendorparent = action.payload;
        state.data = state.data.map((vendorparent) =>
          vendorparent.tid === updatedVendorparent.tid ? updatedVendorparent : vendorparent
        );
        state.error = null;
      })
      .addCase(updateVendorparent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default vendorparentSlice.reducer; // Export the reducer with the correct slice name
