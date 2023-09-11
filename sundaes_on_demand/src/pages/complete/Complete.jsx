import React from "react";
import { useOrderDetails } from "../../context/OrderDetails";
import axios from "axios";
const Complete = () => {
  const { setOrderState, resetOrder } = useOrderDetails();
  const [orderNumber, setOrderNumber] = React.useState(null);
  React.useEffect(() => {
    async function fetchNumber() {
      const response = await axios.post("http://localhost:3030/order");

      setOrderNumber(response.data.orderNumber);
      console.log(response.data.orderNumber);
    }
    fetchNumber();
  }, []);
  const goBackHome = () => {
    resetOrder();
    setOrderState("entry");
  };
  return (
    <div>
      <h2>Order placed!!</h2>
      <p>Your Order Number: {orderNumber}</p>
      <button onClick={goBackHome}>←Go back home</button>
    </div>
  );
};

export default Complete;
