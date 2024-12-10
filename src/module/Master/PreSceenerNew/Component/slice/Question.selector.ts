import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { IQuestion } from "./Question.type";

// Change 'country' to 'presceener' to match your slice
export const selectQuestion = (state: RootState) => state.question;

// Selector for loading state
export const selectorLoading = createSelector(selectQuestion, (state) => {
  return state.loading;
});

// Selector for error state
export const selectorError = createSelector(selectQuestion, (state) => {
  return state.error;
});

// Selector for fetching presceeners
export const selectorGetQuestion = createSelector(selectQuestion, (state) => {
  return state.data as IQuestion[]; // Ensure to use the correct type IPresceener
});

// Selector for message
export const selectorMessage = createSelector(selectQuestion, (state) => {
  return state.message;
});
