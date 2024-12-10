import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { Itestimonials } from "./Testimonials.type";
// Change 'country' to 'presceener' to match your slice
export const selectTestimonials = (state: RootState) => state.testimonials;

// Selector for loading state
export const selectorLoading = createSelector(selectTestimonials, (state) => {
  return state.loading;
});

// Selector for error state
export const selectorError = createSelector(selectTestimonials, (state) => {
  return state.error;
});

// Selector for fetching presceeners
export const selectorGetTestimonials = createSelector(selectTestimonials, (state) => {
  return state.data as Itestimonials[]; // Ensure to use the correct type IPresceener
});

// Selector for message
export const selectorMessage = createSelector(selectTestimonials, (state) => {
  return state.message;
});
