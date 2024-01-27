import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import AllRoutes from "./routes/Routes";
import { useEffect } from "react";
import { startTimer } from "./features/OrderSlice";

function App() {
  const { allOrders } = useSelector((state) => state.Order);
  const dispatch = useDispatch();
  useEffect(() => {
    const timerInterval = setInterval(() => {
      allOrders.forEach((order) => {
        dispatch(startTimer({ orderId: order.orderId }));
      });
    }, 1000);
    return () => clearInterval(timerInterval);
  }, [dispatch, allOrders]);
  return (
    <div>
      <AllRoutes />
    </div>
  );
}

export default App;
