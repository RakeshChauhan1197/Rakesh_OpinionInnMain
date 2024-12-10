import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "app/axiosInstanse"; // Ensure the path is correct
import { Ipromocodes } from "./Promocodes.type";
import { ICountry } from "./Promocodes.type";
// Define the state structure for Promocodes
interface PromocodesState {
  data: Ipromocodes[];
  loading: boolean;
  message: string;
  error: string | null;
}

const initialState: PromocodesState = {
  data: [],
  loading: false,
  message: "",
  error: null,
};

// Corrected typo in the action name and endpoint
export const getPromocodes = createAsyncThunk("promocodes/getPromocodes", async () => {
  const response = await axiosInstance.get("api/Promo");
  return response.data as Ipromocodes[]; // Ensure response data matches the type
});

export const addPromocodes = createAsyncThunk(
  "promocodes/addPromocodes",
  async (data: Ipromocodes) => {
    alert("data" + JSON.stringify(data));
    const response = await axiosInstance.post("api/Promo", data);
    alert("response" + JSON.stringify(response));
    return response.data.message;
  }
);

export const updatePromocodes = createAsyncThunk<Ipromocodes, Ipromocodes>(
  "promocodes/updatePromocodes",
  async (promocodes) => {
    const response = await axiosInstance.put(`api/Promo/${promocodes.pid}`, promocodes);
    return response.data;
  }
);

export const deletePromocodes = createAsyncThunk(
  "promocodes/deletePromocodes", // Corrected action name
  async (id: number) => {
    alert("id" + JSON.stringify(id));
    const response = await axiosInstance.delete(`api/Promo?pid=${id}`);
    alert("response" + JSON.stringify(response));
    return response.data.message;
  }
);

export const getCountry = createAsyncThunk<ICountry[]>("country/getCountry", async () => {
  const response = await axiosInstance.get("api/CountryMaster?sField=CountryCode&sValue=%25");
  return response.data;
});

export const lockunlockPromocodes = createAsyncThunk(
  "user/lockUnlockPuser",
  async (pid: number) => {
    alert("promocode" + JSON.stringify(pid));
    const response = await axiosInstance.put(`/api/Promo/LockUser?PID=${pid}`);
    return { message: response.data.message }; // Return as an object
  }
);

export const promocodesSlice = createSlice({
  name: "promocodes", // Corrected slice name to match the domain
  initialState,
  reducers: {}, // Empty reducers (can be added later if needed)
  extraReducers: (builder) => {
    builder
      .addCase(getPromocodes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPromocodes.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Set the data from the payload
        state.error = null;
      })
      .addCase(getPromocodes.rejected, (state, action) => {
        state.loading = false;
        // Safeguard against undefined error message
        state.error = action.error.message; // Default error message if undefined
      })
      .addCase(addPromocodes.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPromocodes.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload; // Set success message
        state.error = null;
      })
      .addCase(addPromocodes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Handle error
      })
      .addCase(updatePromocodes.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePromocodes.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPromocode = action.payload;
        state.data = state.data.map((promocode) =>
          promocode.pid === updatedPromocode.pid ? updatedPromocode : promocode
        );
        state.error = null;
      })
      .addCase(updatePromocodes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Handle error
      })
      .addCase(deletePromocodes.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePromocodes.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload;
        state.data = state.data.filter((promocode) => promocode.pid !== id);
        state.error = null;
      })
      .addCase(deletePromocodes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Handle error
      });
  },
});

export default promocodesSlice.reducer; // Export the reducer with the correct slice name
