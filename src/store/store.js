import { configureStore } from "@reduxjs/toolkit";
import stateManage from "./stateManage";
import reviews from "./reviews";

const store = configureStore({
  reducer: {
    stateManage: stateManage,
    reviews: reviews,
  },
});

export default store;




// import { configureStore } from "@reduxjs/toolkit";
// import stateManage from "./stateManage"; 

// const store = configureStore({
//   reducer: {
//     stateManage: stateManage, 
//   },
// });

// export default store;