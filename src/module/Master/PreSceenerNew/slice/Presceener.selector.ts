import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { IPresceener } from "./Presceener.type";

export const selectPresceener = (state: RootState) => state.presceener;
export const selectorLoading = createSelector(selectPresceener, (state) => {
  return state.loading;
});
export const selectorError = createSelector(selectPresceener, (state) => {
  return state.error;
});
export const selectorGetPresceeners = createSelector(selectPresceener, (state) => {
  return state.data as IPresceener[];
});
export const selectorMessage = createSelector(selectPresceener, (state) => {
  return state.message;
});
