import { Box, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { moveToNextStage, orderStage } from "../features/OrderSlice";
import { getTimeString } from "../utils/utils";

const OrderCard = ({ order, bgColor, textColor }) => {
  const dispatch = useDispatch();
  const handleOrderStage = (e) => {
    dispatch(moveToNextStage({ orderId: order.orderId }));
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={1}
      textAlign="center"
      padding={2}
      className="border border-2 border-dark rounded-3 mx-auto"
      sx={{
        width: "10rem",
      }}
      bgcolor={bgColor}
      color={textColor}
    >
      <Typography>{order?.orderId}</Typography>
      {order.stage === orderStage.ORDER_PICKED ? (
        <Typography>picked</Typography>
      ) : (
        <>
          <Typography>{getTimeString(order.timer[order.stage])}</Typography>
          <button className="btn border-dark text-dark bg-white" onClick={handleOrderStage}>
            Next
          </button>
        </>
      )}
    </Box>
  );
};

export default OrderCard;
