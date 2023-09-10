import React from "react";
import Options from "./Options";
import { formatCurrency } from "../../utils/index";
import { useOrderDetails } from "../../context/OrderDetails";
const OrderEntry = () => {
  const { totals } = useOrderDetails();

  console.log(totals);

  const grandTotal = Number(totals.scoops) + Number(totals.toppings);
  return (
    <>
      <Options optionsType="scoops"></Options>
      <Options optionsType="toppings"></Options>
      <h2>Grand total: {formatCurrency(grandTotal)}</h2>
    </>
  );
};

export default OrderEntry;
