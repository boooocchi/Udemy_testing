import React from "react";
import Options from "./Options";
import { formatCurrency } from "../../utils/index";
import { useOrderDetails } from "../../context/OrderDetails";
const OrderEntry = () => {
  const { totals, setOrderState } = useOrderDetails();

  const goToSummaryPage = () => {
    setOrderState("summary");
  };
  const grandTotal = Number(totals.scoops) + Number(totals.toppings);
  return (
    <>
      <Options optionsType="scoops"></Options>
      <Options optionsType="toppings"></Options>
      <h2>Grand total: {formatCurrency(grandTotal)}</h2>
      <button onClick={goToSummaryPage}>See Order Summary</button>
    </>
  );
};

export default OrderEntry;
