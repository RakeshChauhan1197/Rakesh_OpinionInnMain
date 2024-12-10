import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { IVendorparent } from "./Vendorparent.type";
// Change 'country' to 'presceener' to match your slice
export const selectVendorparent = (state: RootState) => state.vendorparent;

// Selector for loading state
export const selectorLoading = createSelector(selectVendorparent, (state) => {
  return state.loading;
});

// Selector for error state
export const selectorError = createSelector(selectVendorparent, (state) => {
  return state.error;
});

// Selector for fetching presceeners
export const selectorGetVendorparent = createSelector(selectVendorparent, (state) => {
  return state.data as IVendorparent[]; // Ensure to use the correct type IPresceener
});

// Selector for message
export const selectorMessage = createSelector(selectVendorparent, (state) => {
  return state.message;
});
