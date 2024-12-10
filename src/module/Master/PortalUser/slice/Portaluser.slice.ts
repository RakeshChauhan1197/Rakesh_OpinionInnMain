import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "app/axiosInstanse";
import { IPuser } from "./Portaluser.type";
import { json } from "stream/consumers";

interface PuserState {
  data: IPuser[];
  loading: boolean;
  message: string;
  error: string | null;
}
const initialState: PuserState = {
  data: [],
  loading: false,
  message: "",
  error: null,
};

// Fetch portal users
export const getPuser = createAsyncThunk("Puser/getPuser", async () => {
  const response = await axiosInstance.get("/api/PortalUser");
  return response.data as IPuser[];
});

// Lock/Unlock User
export const lockunlockPuser = createAsyncThunk("user/lockUnlockPuser", async (user: number) => {
  const role = sessionStorage.getItem("roles");
  const response = await axiosInstance.put(`/api/AdminUser/LockUnlock?UID=${user}&role=${role}`);
  return { message: response.data.message }; // Return as an object
});

export const blockUsersCSVEmails = createAsyncThunk(
  "user/csvEmail",
  async ({ emailID }: { emailID: string }) => {
    const uid = 1;
    const response = await axiosInstance.post(
      `api/PortalUser/CSVEmails?emailIds=${emailID}&encUID=${uid}`
    );
    alert("ResponseM" + JSON.stringify(response.data.message));
    return { message: response.data.message };
  }
);

export const uploadCSV = createAsyncThunk("user/uploadCSV", async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const uid = 1;
  alert("file" + JSON.stringify(formData));
  const response = await axiosInstance.post(`api/PortalUser/uploadCSV?&encUID=${uid}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return { message: response.data.message };
});

export const skipIPValidation = createAsyncThunk(
  "user/skipIPValidation",
  async ({ emailID, skip_IP_Validation }: { emailID: string; skip_IP_Validation: number }) => {
    const response = await axiosInstance.put(
      `/api/PortalUser/SetIPValidation?skip_IP_Validation=${skip_IP_Validation}&emailID=${emailID}`
    );
    return { message: response.data.message };
  }
);

export const downloadUser = createAsyncThunk(
  "Puser/downloadPuser",
  async ({ startDate, endDate }: { startDate: string; endDate: string }) => {
    const response = await axiosInstance.get(
      `/api/PortalUser/downloadUser?startDate=${startDate}&endDate=${endDate}`
    );
    return response.data as IPuser[];
  }
);

// Resend Password Link
export const passwordLink = createAsyncThunk("user/resendPasswordLink", async (user: number) => {
  const response = await axiosInstance.put(`/api/PortalUser/ResendPassLink?UID=${user}`);
  return { data: response.data, message: response.data.message };
});

export const puserSlice = createSlice({
  name: "puser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle getPuser success
    builder.addCase(getPuser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.message = null; // Reset the message on success
      state.error = null; // Reset the error on success
    });

    // Handle passwordLink success
    builder.addCase(passwordLink.fulfilled, (state, action) => {
      state.message = action.payload.message; // Store the message from resend password link
    });

    builder.addCase(blockUsersCSVEmails.fulfilled, (state, action) => {
      state.message = action.payload.message; // Store the message from CSV Email
    });

    builder.addCase(uploadCSV.fulfilled, (state, action) => {
      state.message = action.payload.message; // Store the message from CSV Email
    });
    // Handle lockunlockPuser success
    builder.addCase(lockunlockPuser.fulfilled, (state, action) => {
      state.message = action.payload.message; // Store the message from lock/unlock
    });

    builder.addCase(skipIPValidation.fulfilled, (state, action) => {
      state.message = action.payload.message; // Handle success message for IP validation
    });

    // Handle errors for getPuser
    builder.addCase(getPuser.rejected, (state, action) => {
      state.error = action.error.message;
    });
    // Handle errors for addCSVEmail
    builder.addCase(blockUsersCSVEmails.rejected, (state, action) => {
      state.error = action.error.message;
    });
    // Handle errors for lockunlockPuser
    builder.addCase(lockunlockPuser.rejected, (state, action) => {
      state.error = action.error.message;
    });

    // Handle errors for passwordLink
    builder.addCase(passwordLink.rejected, (state, action) => {
      state.error = action.error.message;
    });

    builder.addCase(skipIPValidation.rejected, (state, action) => {
      state.error = action.error.message;
    });

    builder.addCase(uploadCSV.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default puserSlice.reducer;
