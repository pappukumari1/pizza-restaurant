import { Box, Button, Container } from "@mui/material";
import React from "react";
import OrderCard from "../../components/OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrder, orderStage} from "../../features/OrderSlice";
import { useNavigate } from "react-router-dom";
import { getTimeString } from "../../utils/utils";

const OrderInfo = () => {
  const { allOrders, totalOrderDelivered } = useSelector((state) => state.Order);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getOrderByStage = (stageName) => {
    let ordersByStage = allOrders.filter((order) => order.stage === stageName);
    return ordersByStage;
  };
  return (
    <Container>
      <Box display="flex" justifyContent="end" className="py-3">
        <Button
          variant="outlined"
          onClick={(e) => {
            navigate("/new-order");
          }}
        >
          New Order
        </Button>
      </Box>
      {/* Pizza stage section */}
      <Box>
        <table className="table table-bordered border-dark text-center">
          <tbody>
            <tr>
              <td>
                <Box className="py-3">Order Placed</Box>
                <Box display="flex" flexDirection="column" gap={2}>
                  {getOrderByStage(orderStage.ORDER_PLACED)?.map((order) => (
                    <OrderCard
                      key={order.orderId}
                      order={order}
                      bgColor={
                        order.timer[orderStage.ORDER_PLACED] / 60 >= 3
                          ? "red"
                          : "white"
                      }
                      textColor={
                        order.timer[orderStage.ORDER_PLACED] / 60 >= 3
                          ? "white"
                          : "black"
                      }
                    />
                  ))}
                </Box>
              </td>
              <td>
                <Box className="py-3">Order in making</Box>
                <Box display="flex" flexDirection="column" gap={2}>
                  {getOrderByStage(orderStage.ORDER_IN_MAKING)?.map((order) => (
                    <OrderCard
                      key={order.orderId}
                      order={order}
                      bgColor={
                        order.timer[orderStage.ORDER_IN_MAKING] / 60 >= order.approxMakingTime
                          ? "red"
                          : "white"
                      }
                      textColor={
                        order.timer[orderStage.ORDER_IN_MAKING] / 60 >= order.approxMakingTime
                          ? "white"
                          : "black"
                      }
                    />
                  ))}
                </Box>
              </td>
              <td>
                <Box className="py-3">Order Ready</Box>
                <Box display="flex" flexDirection="column" gap={2}>
                  {getOrderByStage(orderStage.ORDER_READY)?.map((order) => (
                    <OrderCard key={order.orderId} order={order} bgColor={
                      order.timer[orderStage.ORDER_READY] / 60 >= 3
                        ? "red"
                        : "white"
                    }
                    textColor={
                      order.timer[orderStage.ORDER_READY] / 60 >= 3
                        ? "white"
                        : "black"
                    }/>
                  ))}
                </Box>
              </td>
              <td>
                <Box className="py-3">Order Picked</Box>
                <Box display="flex" flexDirection="column" gap={2}>
                  {getOrderByStage(orderStage.ORDER_PICKED)?.map((order) => (
                    <OrderCard key={order.orderId} order={order} />
                  ))}
                </Box>
              </td>
            </tr>
          </tbody>
        </table>
      </Box>
      {/* Main Section */}
      <Box>
        <table className="table table-bordered border-dark text-start">
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Stage</th>
              <th>Total time spent (time from order placed)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allOrders?.map((order) => (
              <tr key={order.orderId}>
                <td>{`Order Id: ${order.orderId}`}</td>
                <td>{order.stage}</td>
                <td>
                  {getTimeString(
                    order.timer[orderStage.ORDER_PLACED] +
                      order.timer[orderStage.ORDER_IN_MAKING] +
                      order.timer[orderStage.ORDER_READY]
                  )}
                </td>
                <td>
                  {[
                    orderStage.ORDER_PLACED,
                    orderStage.ORDER_IN_MAKING,
                  ].includes(order.stage) && (
                    <button
                    className="btn border-dark text-dark bg-white"
                      onClick={(e) =>
                        dispatch(cancelOrder({ orderId: order.orderId }))
                      }
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-success fw-bold">
              <td>Total order delivered</td>
              <td colSpan={2}>{totalOrderDelivered.toString().padStart(3, "0")}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </Box>
    </Container>
  );
};

export default OrderInfo;
