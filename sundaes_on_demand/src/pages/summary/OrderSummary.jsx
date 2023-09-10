import React from "react";
import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../context/OrderDetails";
import { formatCurrency } from "../../utils";
export default function OrderSummary() {
  const { totals, optionCounts } = useOrderDetails();

  const scoopsArray = Object.entries(optionCounts.scoops);
  const scoopsList = scoopsArray.map(([key, value]) => {
    return (
      <li key={key}>
        {value} {key}
      </li>
    );
  });

  const toppingsArray = Object.key(optionCounts.toppings);
  const toppingsList = toppingsArray.map((topping) => {
    return <li key={topping}>{topping}</li>;
  });
  return (
    <>
      <h1>Order Summary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopsList}</ul>
      <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
      <ul>{toppingsList}</ul>
      <SummaryForm />
    </>
  );
}
