import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "app/axiosInstanse";
import { ICountry } from "./Country.type";
import { Alert } from "@mui/material";
import { Console } from "console";

interface CountryState {
  data: ICountry[];
  loading: boolean;
  message: string;
  error: string | null;
}

const initialState: CountryState = {
  data: [],
  loading: false,
  message: "",
  error: null,
};

export const getCountry = createAsyncThunk("country/getCountry", async () => {
  const response = await axiosInstance.get("/api/CountryMaster?sField=CountryCode&sValue=%25");
  return response.data as ICountry[];
});

export const addCountry = createAsyncThunk("country/addCountry", async (country: ICountry) => {
  const response = await axiosInstance.post("/api/countryMaster", country);
  return response.data;
});

export const updateCountry = createAsyncThunk(
  "country/updateCountry",
  async (country: ICountry) => {
    const response = await axiosInstance.put(`/api/countryMaster/${country.tID}`, country);
    return response.data;
  }
);

export const deleteCountry = createAsyncThunk("country/deleteCountry", async (id: number) => {
  await axiosInstance.delete(`/api/countryMaster/${id}`);
  return id;
});

export const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCountry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCountry.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getCountry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch countries";
      })
      .addCase(addCountry.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.message = "Country added successfully";
        state.error = null;
      })
      .addCase(updateCountry.fulfilled, (state, action) => {
        const updatedCountry = action.payload;
        alert("Update Country Payload: " + JSON.stringify(updatedCountry));
        const index = state.data.findIndex((country) => country.tID === updatedCountry.tID);
        if (index !== -1) {
          state.data[index] = updatedCountry;
        }
        state.message = "Country updated successfully";
        state.error = null;
      })
      .addCase(deleteCountry.fulfilled, (state, action) => {
        const id = action.payload;
        state.data = state.data.filter((country) => country.tID !== id);
        state.message = "Country deleted successfully";
        state.error = null;
      })
      .addCase(deleteCountry.rejected, (state, action) => {
        state.error = action.error.message || "Failed to delete country";
      });
  },
});

export default countrySlice.reducer;
