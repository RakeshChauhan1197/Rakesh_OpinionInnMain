import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "app/axiosInstanse";
import { IPresceener, ICountry } from "./Presceener.type";

interface PresceenerState {
  data: IPresceener[];
  newdata: {
    psid: 0;
    psName: "";
    psDesc: "";
    psCountry: "";
    Note: "";
  };
  loading: boolean;
  message: string;
  error: string | null;
}

const initialState: PresceenerState = {
  data: [],
  newdata: {
    psid: 0,
    psName: "",
    psDesc: "",
    psCountry: "",
    Note: "",
  },
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

export const addPresceener = createAsyncThunk<string, IPresceener>(
  "presceener/addPresceener",
  async (presceener) => {
    const response = await axiosInstance.post("api/PreScrennerK", presceener);
    return response.data.message;
  }
);

export const updatePresceener = createAsyncThunk<IPresceener, IPresceener>(
  "presceener/updatePresceener",
  async (presceener) => {
    const response = await axiosInstance.put(
      `api/PreScrennerK?psid=${presceener.psid}`,
      presceener
    );
    return response.data;
  }
);

export const deletePresceener = createAsyncThunk(
  "presceener/deletePresceener",
  async (id: number) => {
    const response = await axiosInstance.delete(`api/PreScrennerK?psid=${id}`);
    return response.data;
  }
);

export const getPresceenerByID = createAsyncThunk(
  "presceener/getPresceenerByID",
  async (psid: number) => {
    const response = await axiosInstance.get(`api/PreScrennerK/GetById?psid=${psid}`);
    return response.data;
  }
);

export const getCountry = createAsyncThunk<ICountry[]>("country/getCountry", async () => {
  const response = await axiosInstance.get("api/CountryMaster?sField=CountryCode&sValue=%25");
  return response.data;
});

const presceenerSlice = createSlice({
  name: "presceener",
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
      })
      .addCase(addPresceener.fulfilled, (state, action) => {
        state.message = action.payload;
      })
      .addCase(addPresceener.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updatePresceener.fulfilled, (state, action) => {
        const updatedPresceener = action.payload;
        const index = state.data.findIndex(
          (presceener) => presceener.psid === updatedPresceener.psid
        );
        if (index !== -1) {
          state.data[index] = updatedPresceener;
        }
        state.message = "Presceener updated successfully";
        state.error = null;
      })
      .addCase(updatePresceener.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deletePresceener.fulfilled, (state, action) => {
        const id = action.payload;
        state.data = state.data.filter((presceener) => presceener.psid !== id);
        state.message = "Presceener deleted successfully";
        state.error = null;
      })
      .addCase(deletePresceener.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getPresceenerByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPresceenerByID.fulfilled, (state, action) => {
        state.loading = false;
        state.newdata = action.payload;
        state.error = null;
      })
      .addCase(getPresceenerByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default presceenerSlice.reducer;
