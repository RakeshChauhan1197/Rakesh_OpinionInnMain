import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { ICountry } from "./Country.type";

export const user = (state: RootState) => state.country;

export const selectorLoading = createSelector(user, (state) => {
  return state.loading;
});
export const selectorError = createSelector(user, (state) => {
  return state.error;
});

export const selectorGetCountry = createSelector(user, (state) => {
  return state.data as ICountry[];
});

export const selectorMessage = createSelector(user, (state) => {
  return state.message; // Assuming you are using `message` for status messages
});
