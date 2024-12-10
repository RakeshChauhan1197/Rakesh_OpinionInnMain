import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { Ipromocodes } from "./Promocodes.type";
// Change 'country' to 'presceener' to match your slice
export const selectPromocodes = (state: RootState) => state.promocodes;

// Selector for loading state
export const selectorLoading = createSelector(selectPromocodes, (state) => {
  return state.loading;
});

// Selector for error state
export const selectorError = createSelector(selectPromocodes, (state) => {
  return state.error;
});

// Selector for fetching presceeners
export const selectorGetPromocodes = createSelector(selectPromocodes, (state) => {
  return state.data as Ipromocodes[]; // Ensure to use the correct type IPresceener
});

// Selector for message
export const selectorMessage = createSelector(selectPromocodes, (state) => {
  return state.message;
});
