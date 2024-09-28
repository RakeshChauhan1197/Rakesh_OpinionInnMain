import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ILoginRequest, ILoginSuccessResponce } from "./authentication.type";
import { service } from "service/service";

export const login = createAsyncThunk<ILoginSuccessResponce, ILoginRequest>(
  "auth/login",
  async (loginRequest: ILoginRequest, { rejectWithValue }) => {
    try {
      const { email, password } = loginRequest;
      const response = await service.postCall("/api/User", {
        userID: email,
        password: password,
      });
      console.log("response", response);
      return response.data as ILoginSuccessResponce;
    } catch (error) {
      const err = error as ILoginSuccessResponce;
      return rejectWithValue(err);
    }
  }
);

interface InitialState {
  data: ILoginSuccessResponce | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  message: string;
}

const initialState: InitialState = {
  data: null,
  status: "idle",
  error: null,
  message: "",
};

const auththenticationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.data = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<ILoginSuccessResponce>) => {
        state.status = "succeeded";
        state.error = "";
        state.data = action.payload;
        sessionStorage.setItem("id", action.payload.id);
        sessionStorage.setItem("username", action.payload.username);
        sessionStorage.setItem("roles", action.payload.roles);
        sessionStorage.setItem("firstName", action.payload.firstName);
        sessionStorage.setItem("lastName", action.payload.lastName);
        sessionStorage.setItem("country", action.payload.country);
        sessionStorage.setItem("profileImage", action.payload.profileImage);
        sessionStorage.setItem("token", action.payload.token);
        // Handle undefined value
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload.response.data.message;
      });
  },
});

export const { resetUser } = auththenticationSlice.actions;

export default auththenticationSlice.reducer;
