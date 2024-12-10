import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { IEndpage } from "./Endpage.type";
export const user = (state: RootState) => state.endpage;

export const selectorLoading = createSelector(user, (state) => {
  return state.loading;
});
export const selectorError = createSelector(user, (state) => {
  return state.error;
});

export const selectorGetEndpage = createSelector(user, (state) => {
  return state.data as IEndpage[];
});

export const selectorMessage = createSelector(user, (state) => {
  return state.message;
});
