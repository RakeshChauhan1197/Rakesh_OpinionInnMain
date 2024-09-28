import { configureStore } from "@reduxjs/toolkit";
import auththenicationSlice from "../layouts/authentication/slice/authentication.slice";
import CountryReducer from "module/Master/Country/slice/Country.slice";

export const store = configureStore({
  reducer: {
    auththenication: auththenicationSlice,
    country: CountryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
