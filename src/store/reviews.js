import { createSlice } from "@reduxjs/toolkit";

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    reviewsByHouse: {}, // { houseId: [{ email, title, rating, review, timestamp }] }
    sortOption: "newest", // highest, lowest, newest, oldest
  },
  reducers: {
    addReview: (state, action) => {
      const { houseId, review } = action.payload;
      if (!state.reviewsByHouse[houseId]) {
        state.reviewsByHouse[houseId] = [];
      }
      state.reviewsByHouse[houseId].push(review);
    },
    setSortOption: (state, action) => {
      state.sortOption = action.payload;
    },
  },
});

export const { addReview, setSortOption } = reviewsSlice.actions;
export default reviewsSlice.reducer;