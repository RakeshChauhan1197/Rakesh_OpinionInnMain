import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { ISoftwareuser } from "./Softwareuser.type";

// Selector to get the software user state
export const selectSoftwareUserState = (state: RootState) => state.softwareUser;

// Selector to get loading state
export const selectLoading = createSelector(selectSoftwareUserState, (state) => state.loading);

// Selector to get error state
export const selectError = createSelector(selectSoftwareUserState, (state) => state.error);

// Selector to get software users data
export const selectSoftwareUsers = createSelector(
  selectSoftwareUserState,
  (state) => state.data as ISoftwareuser[]
);

// Selector to get message
export const selectMessage = createSelector(selectSoftwareUserState, (state) => state.message);
