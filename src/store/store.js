import { configureStore } from "@reduxjs/toolkit";
import stateManage from "./stateManage"; 

const store = configureStore({
  reducer: {
    stateManage: stateManage, 
  },
});

export default store;