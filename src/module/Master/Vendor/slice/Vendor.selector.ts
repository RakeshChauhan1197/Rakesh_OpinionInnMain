import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { IVendor } from "./Vendor.type";

export const vendor = (state: RootState) => state.vendor;

export const selectorLoading = createSelector(vendor, (state) => {
  return state.loading;
});

export const selectorError = createSelector(vendor, (state) => {
  return state.error;
});

export const selectorGetVendor = createSelector(vendor, (state) => {
  return state.data as IVendor[];
});

export const selectorGetParentVendor = createSelector(vendor, (state) => {
  return state.data as IVendor[];
});

export const selectorMessage = createSelector(vendor, (state) => {
  return state.message;
});
