import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { IAffiliate } from "./Affiliate.type";

export const user = (state: RootState) => state.affiliate;

export const selectorLoading = createSelector(user, (state) => {
  return state.loading;
});
export const selectorError = createSelector(user, (state) => {
  return state.error;
});

export const selectorGetAffiliate = createSelector(user, (state) => {
  return state.data as IAffiliate[];
});

export const selectorMessage = createSelector(user, (state) => {
  return state.message;
});
