import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { IPolls } from "./Polls.type";

// Change 'country' to 'presceener' to match your slice
export const selectPolls = (state: RootState) => state.polls;

// Selector for loading state
export const selectorLoading = createSelector(selectPolls, (state) => {
  return state.loading;
});

// Selector for error state
export const selectorError = createSelector(selectPolls, (state) => {
  return state.error;
});

// Selector for fetching presceeners
export const selectorGetPolls = createSelector(selectPolls, (state) => {
  return state.data as IPolls[]; // Ensure to use the correct type IPresceener
});

// Selector for message
export const selectorMessage = createSelector(selectPolls, (state) => {
  return state.message;
});
