import React from "react";
import { useOrderDetails } from "../../context/OrderDetails";
import axios from "axios";
import AlertBanner from "../common/AlertBanner";
import { response } from "msw";
const Complete = () => {
  const { setOrderState, resetOrder } = useOrderDetails();
  const [orderNumber, setOrderNumber] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  React.useEffect(() => {
    async function fetchNumber() {
      axios
        .post("http://localhost:3030/order")
        .then((response) => {
          setOrderNumber(response.data.orderNumber);
        })
        .catch((error) => {
          setError(true);
        });

      setLoading(false);
    }
    fetchNumber();
  }, []);
  const goBackHome = (e) => {
    e.preventDefault();
    resetOrder();
    setOrderState("entry");
  };

  return (
    <>
      {loading && !error && <div>loading...</div>}
      {!loading && !error && (
        <div>
          <h2>Order placed!!</h2>
          <p>Your Order Number: {orderNumber}</p>
          <button type="submit" onClick={goBackHome}>
            ←Go back home
          </button>
        </div>
      )}
      {error && !loading && (
        <>
          <AlertBanner message={null} variant={null} />
          <button type="submit" onClick={goBackHome}>
            ←Go back home
          </button>
        </>
      )}
    </>
  );
};

export default Complete;
