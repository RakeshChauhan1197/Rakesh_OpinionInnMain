import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { IPuser } from "./Portaluser.type";

export const user = (state: RootState) => state.puser;

export const selectorLoading = createSelector(user, (state) => {
  return state.loading;
});
export const selectorError = createSelector(user, (state) => {
  return state.error;
});

export const selectorGetPuser = createSelector(user, (state) => {
  return state.data as IPuser[];
});

export const selectorMessage = createSelector(user, (state) => {
  return state.message;
});
