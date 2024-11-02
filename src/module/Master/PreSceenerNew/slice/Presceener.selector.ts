import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { IPresceener } from "./Presceener.type";

// Change 'country' to 'presceener' to match your slice
export const selectPresceener = (state: RootState) => state.prescreener;

// Selector for loading state
export const selectorLoading = createSelector(selectPresceener, (state) => {
  return state.loading;
});

// Selector for error state
export const selectorError = createSelector(selectPresceener, (state) => {
  return state.error;
});

// Selector for fetching presceeners
export const selectorGetPresceeners = createSelector(selectPresceener, (state) => {
  return state.data as IPresceener[]; // Ensure to use the correct type IPresceener
});

// Selector for message
export const selectorMessage = createSelector(selectPresceener, (state) => {
  return state.message;
});
