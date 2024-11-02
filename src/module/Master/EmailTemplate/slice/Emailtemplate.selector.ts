import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { ITemplate } from "./Emailtemplate.type";

// Change 'country' to 'presceener' to match your slice
export const selectTemplate = (state: RootState) => state.template;

// Selector for loading state
export const selectorLoading = createSelector(selectTemplate, (state) => {
  return state.loading;
});

// Selector for error state
export const selectorError = createSelector(selectTemplate, (state) => {
  return state.error;
});

// Selector for fetching presceeners
export const selectorGetTemplates = createSelector(selectTemplate, (state) => {
  return state.data as ITemplate[]; // Ensure to use the correct type IPresceener
});

// Selector for message
export const selectorMessage = createSelector(selectTemplate, (state) => {
  return state.message;
});
