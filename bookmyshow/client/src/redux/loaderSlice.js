import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "loaders",
  initialState: {
    loading: false, // initial state of loader
  },
  reducers: {
    ShowLoading: (state) => {
      state.loading = true; // Immer js is used to update the state in mutable way
    },
    HideLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { ShowLoading, HideLoading } = loaderSlice.actions;
export default loaderSlice.reducer;
