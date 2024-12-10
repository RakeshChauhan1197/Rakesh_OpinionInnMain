import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "app/axiosInstanse";
import { IAffiliate } from "./Affiliate.type";
import { ITemplate } from "module/Master/EmailTemplate/slice/Emailtemplate.type";

interface AffiliateState {
  data: IAffiliate[]; // Holds affiliate data
  signupType: string[]; // Holds signup types
  httpMethods: string[]; // Holds HTTP methods
  loading: boolean; // Loading state
  message: string; // General message
  error: string | null; // Error messages
}

const initialState: AffiliateState = {
  data: [],
  signupType: [],
  httpMethods: [],
  loading: false,
  message: "",
  error: null,
};

// Async thunks for API calls
export const getAffiliate = createAsyncThunk<IAffiliate[]>("affiliate/getAffiliate", async () => {
  const response = await axiosInstance.get("api/Affiliate");
  return response.data;
});

export const getAffiliateuser = createAsyncThunk<IAffiliate[]>(
  "affiliate/getAffiliateuser",
  async () => {
    const response = await axiosInstance.get("api/Affiliate/UserDropdownlist");
    return response.data;
  }
);

export const getSignuptype = createAsyncThunk<string[]>("affiliate/getSignuptype", async () => {
  const response = await axiosInstance.get("api/Affiliate/SignUPType");
  return response.data;
});

export const getHttpmethod = createAsyncThunk<string[]>("affiliate/getHttpmethod", async () => {
  const response = await axiosInstance.get("api/Affiliate/HTTPMethod");
  return response.data;
});

export const addAffiliate = createAsyncThunk<string, IAffiliate>(
  "affiliate/addAffiliate",
  async (affiliate) => {
    alert("affiliate" + JSON.stringify(affiliate));
    const response = await axiosInstance.post("api/Affiliate", affiliate);
    alert("response" + JSON.stringify(response));
    return response.data;
  }
);

export const updateAffiliate = createAsyncThunk<IAffiliate, IAffiliate>(
  "affiliate/updateAffiliate",
  async (affiliate) => {
    const response = await axiosInstance.put(`api/Affiliate?tid=${affiliate.tid}`, affiliate);
    return response.data;
  }
);

export const deleteAffiliate = createAsyncThunk("affiliate/deleteAffiliate", async (id: number) => {
  const response = await axiosInstance.delete(`api/Affiliate?tid=${id}`);
  return response.data;
});

export const getAffiliateByID = createAsyncThunk(
  "affiliate/getAffiliateByID",
  async (tid: number) => {
    alert("tid" + JSON.stringify(tid));
    const response = await axiosInstance.get(`api/Affiliate/GetAffiliatebyId?tid=${tid}`);
    alert("response" + JSON.stringify(response));
    return response.data;
  }
);

// Slice definition
export const affiliateSlice = createSlice({
  name: "affiliate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Affiliates
      .addCase(getAffiliate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAffiliate.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getAffiliate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch affiliates.";
      })

      // Add Affiliate
      .addCase(addAffiliate.fulfilled, (state, action) => {
        state.message = action.payload;
      })
      .addCase(addAffiliate.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateAffiliate.fulfilled, (state, action) => {
        const updatedAffiliate = action.payload;
        const index = state.data.findIndex((affiliate) => affiliate.tid === updatedAffiliate.tid);
        if (index !== -1) {
          state.data[index] = updatedAffiliate;
        }
        state.message = "Affiliate updated successfully";
        state.error = null;
      })
      .addCase(updateAffiliate.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteAffiliate.fulfilled, (state, action) => {
        const id = action.payload;
        state.data = state.data.filter((affiliate) => affiliate.tid !== id);
        state.message = "Affiliate deleted successfully";
        state.error = null;
      })
      .addCase(deleteAffiliate.rejected, (state, action) => {
        state.error = action.error.message;
      })
      // Get Signup Types
      .addCase(getSignuptype.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSignuptype.fulfilled, (state, action) => {
        state.loading = false;
        state.signupType = action.payload;
        state.error = null;
      })
      .addCase(getSignuptype.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch signup types.";
      })
      .addCase(getAffiliateByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAffiliateByID.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })

      // Get HTTP Methods
      .addCase(getHttpmethod.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHttpmethod.fulfilled, (state, action) => {
        state.loading = false;
        state.httpMethods = action.payload;
        state.error = null;
      })
      .addCase(getHttpmethod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch HTTP methods.";
      });
  },
});

export default affiliateSlice.reducer;
