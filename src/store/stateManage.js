import { createSlice } from "@reduxjs/toolkit";

const stateManage = createSlice({
  name: "stateManage",
  initialState: {  menuState: false, serviceState:false },
  reducers: {
    setMenuState: (state, action) => {
      state.menuState = action.payload;
    },
    setServiceState: (state, action) => {
      state.serviceState = action.payload;
    }
  },
});

export const { setMenuState, setServiceState } = stateManage.actions;
export default stateManage.reducer;
