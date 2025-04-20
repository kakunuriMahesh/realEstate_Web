import { createSlice } from "@reduxjs/toolkit";

const stateManage = createSlice({
  name: "stateManage",
  initialState: {  menuState: false },
  reducers: {
    setMenuState: (state, action) => {
      state.menuState = action.payload;
    }
  },
});

export const { setMenuState } = stateManage.actions;
export default stateManage.reducer;
