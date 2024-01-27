import { configureStore } from "@reduxjs/toolkit";
import OrderReducer from "./features/OrderSlice.js";
export default configureStore({
  reducer: { Order: OrderReducer },
});
