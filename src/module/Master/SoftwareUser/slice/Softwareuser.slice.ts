import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "app/axiosInstanse"; // Fixed typo
import { ISoftwareuser } from "./Softwareuser.type";
import Softwareuser from "../Softwareuser";

interface SoftwareuserState {
  data: ISoftwareuser[];
  loading: boolean;
  message: string;
  error: string | null;
}

const initialState: SoftwareuserState = {
  data: [],
  loading: false,
  message: "",
  error: null,
};

// Fetch software users
export const getSoftwareuser = createAsyncThunk("Softwareuser/getSoftwareuser", async () => {
  const response = await axiosInstance.get("api/AdminUser");
  return response.data as ISoftwareuser[];
});

export const addSoftwareuser = createAsyncThunk(
  "softwareuser/addSoftwareuser",
  async (softwareuser: ISoftwareuser) => {
    const response = await axiosInstance.post("api/AdminUser", softwareuser);
    return response.data.message;
  }
);

export const updateSoftwareuser = createAsyncThunk(
  "softwareuser/updateSoftwareuser",
  async (softwareuser: ISoftwareuser) => {
    const response = await axiosInstance.put(`api/AdminUser/${softwareuser.uid}`, softwareuser);
    return response.data;
  }
);

export const fetchSoftwareuser = createAsyncThunk("userrole/fetchuserrole", async () => {
  const response = await axiosInstance.get<ISoftwareuser[]>("api/AdminUser/Dropdown");
  return response.data;
});

export const lockunlockPuser = createAsyncThunk("user/lockUnlockPuser", async (user: number) => {
  const role = sessionStorage.getItem("roles");
  const response = await axiosInstance.put(`api/AdminUser/LockUnlock?UID=${user}&role=${role}`);
  return { message: response.data.message };
});

export const softwareuserSlice = createSlice({
  name: "softwareuser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSoftwareuser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.message = " ";
      state.error = null;
    });
    builder.addCase(getSoftwareuser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addSoftwareuser.fulfilled, (state, action) => {
      state.message = action.payload.message;
    });
    builder.addCase(lockunlockPuser.fulfilled, (state, action) => {
      state.message = action.payload.message;
    });

    builder.addCase(updateSoftwareuser.fulfilled, (state, action) => {
      const updatedSoftwareuser = action.payload;
      const index = state.data.findIndex(
        (softwareuser) => softwareuser.uid === updatedSoftwareuser.uid
      );
      if (index !== -1) {
        state.data[index] = updatedSoftwareuser;
      }
      state.message = "Software user updated successfully";
      state.error = null;
    });
    builder.addCase(fetchSoftwareuser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchSoftwareuser.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(fetchSoftwareuser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch vendors";
    });
    builder.addCase(getSoftwareuser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to load software users";
    });
    builder.addCase(addSoftwareuser.rejected, (state, action) => {
      state.error = action.error.message || "Failed to add user";
    });
    builder.addCase(lockunlockPuser.rejected, (state, action) => {
      state.error = action.error.message || "Failed to lock/unlock user";
    });
  },
});

export default softwareuserSlice.reducer;
