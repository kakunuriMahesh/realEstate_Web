import { createSlice } from "@reduxjs/toolkit";

const servicesSlice = createSlice({
  name: "services",
  initialState: {
    sellSubmissions: [], // Array of submissions
  },
  reducers: {
    addSellSubmission: (state, action) => {
      state.sellSubmissions.push(action.payload);
    },
  },
});

export const { addSellSubmission } = servicesSlice.actions;
export default servicesSlice.reducer;