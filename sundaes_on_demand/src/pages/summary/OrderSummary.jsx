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

  const toppingsArray = Object.keys(optionCounts.toppings);
  const toppingsList = toppingsArray.map((topping) => {
    return <li key={topping}>{topping}</li>;
  });
  const grandTotal = Number(totals.scoops) + Number(totals.toppings);

  return (
    <>
      <h1>Order Summary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopsList}</ul>
      {totals.toppings > 0 && (
        <>
          <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
          <ul>{toppingsList}</ul>
          <h1>Grand total: {formatCurrency(grandTotal)}</h1>
        </>
      )}
      <SummaryForm />
    </>
  );
}
