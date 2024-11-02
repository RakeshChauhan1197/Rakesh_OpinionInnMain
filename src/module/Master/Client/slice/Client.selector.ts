import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { IClient } from "./Client.type";

export const client = (state: RootState) => state.client;

export const selectorLoading = createSelector(client, (state) => {
  return state.loading;
});

export const selectorError = createSelector(client, (state) => {
  return state.error;
});

export const selectorGetClient = createSelector(client, (state) => {
  return state.data as IClient[];
});

export const selectorMessage = createSelector(client, (state) => {
  return state.message;
});
