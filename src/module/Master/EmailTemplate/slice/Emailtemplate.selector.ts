import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { ITemplate } from "./Emailtemplate.type";

// Assuming 'template' is the correct slice name in RootState
export const templateSelector = (state: RootState) => state.template;

// Selectors for template state properties
export const selectorLoading = createSelector(templateSelector, (templateState) => {
  return templateState.loading;
});

export const selectorError = createSelector(templateSelector, (templateState) => {
  return templateState.error;
});

export const selectorGetTemplates = createSelector(templateSelector, (templateState) => {
  return templateState.data as ITemplate[];
});

export const selectorMessage = createSelector(templateSelector, (templateState) => {
  return templateState.message;
});
