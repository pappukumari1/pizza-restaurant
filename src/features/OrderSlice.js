import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { generateUniqueId } from "../utils/utils";

const initialState = {
  currentOrdersCount: 0,
  allOrders: [],
  totalOrderDelivered: 0
};
export const orderStage = {
  ORDER_PLACED: "Order Placed",
  ORDER_IN_MAKING: "Order in making",
  ORDER_READY: "Order Ready",
  ORDER_PICKED: "Order Picked",
  ORDER_CANCELED: "Canceled",
};
const timer = {
  "Order Placed": 0,
  "Order in making": 0,
  "Order Ready": 0,
};
const approxMakingTime = {
  Small: 3,
  Medium: 4,
  Large: 5
}
export const OrderSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addNewOrder: (state, action) => {
      if (state.currentOrdersCount === 10) {
        toast.error("Not taking any order for now");
      } else {
        state.currentOrdersCount++;
        state.allOrders.push({
          ...action.payload,
          orderId: generateUniqueId(),
          approxMakingTime: approxMakingTime[action.payload.size],
          stage: orderStage.ORDER_PLACED,
          timer
        });
        toast.success("New order created.");
      }
    },
    moveToNextStage: (state, action) => {
      let allOrders = state.allOrders;
      let updatedOrders = allOrders.map((order) => {
        if (order.orderId === action.payload.orderId) {
          let currentStage = order.stage;
          switch (currentStage) {
            case orderStage.ORDER_PLACED:
              order.stage = orderStage.ORDER_IN_MAKING;
              break;
            case orderStage.ORDER_IN_MAKING:
              order.stage = orderStage.ORDER_READY;
              break;
            case orderStage.ORDER_READY:
              order.stage = orderStage.ORDER_PICKED;
              state.totalOrderDelivered++;
              state.currentOrdersCount--;
              break;
            default:
          }
        }
        return order;
      });
      state.allOrders = updatedOrders;
    },
    cancelOrder: (state, action) => {
      let updatedOrders = state.allOrders.map((order) => {
        if (order.orderId === action.payload.orderId) {
          order.stage = orderStage.ORDER_CANCELED;
        }
        return order;
      });
      state.allOrders = updatedOrders;
    },
    startTimer: (state, action) => {
      const { orderId } = action.payload;
      let ignoreStage = [orderStage.ORDER_PICKED, orderStage.ORDER_CANCELED];
      let allOrders = state.allOrders.map((order) => {
        if (order.orderId === orderId && !ignoreStage.includes(order.stage)) {
          order.timer[order.stage] = (order.timer[order.stage] || 0) + 1;
        }
        return order;
      });
      state.allOrders = allOrders;
    },
  },
});
export const { getInitialState } = OrderSlice;
export const { addNewOrder, moveToNextStage, cancelOrder, startTimer } =
  OrderSlice.actions;
export default OrderSlice.reducer;
