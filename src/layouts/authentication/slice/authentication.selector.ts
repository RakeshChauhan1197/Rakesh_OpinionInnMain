import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../../../app/store";

export const user = (state: RootState) => state.auththenication;

export const loading = createSelector(user, (state) => {
  return state.status;
});

export const message = createSelector(user, (state) => {
  return state.message;
});
