import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOption from "./ScoopOption";
import Row from "react-bootstrap/Row";
import ToppingOption from "./TopingOption";
import AlertBanner from "../common/AlertBanner";
import { pricePerItem } from "../../constants";
import { formatCurrency } from "../../utils";
import { useOrderDetails } from "../../context/OrderDetails";

const Options = ({ optionsType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const { totals } = useOrderDetails();

  useEffect(() => {
    //create abort controller here to attach to net work request
    const controller = new AbortController();
    axios
      .get(`http://localhost:3030/${optionsType}`, {
        signal: controller.signal
      })
      .then((response) => setItems(response.data))
      .catch((error) => {
        if (error.name !== "CanceledError") setError(true);
      });

    //abort axious call on component unmount
    return () => {
      controller.abort();
    };
  }, [optionsType]);
  if (error) {
    return <AlertBanner></AlertBanner>;
  }

  const ItemComponent = optionsType === "scoops" ? ScoopOption : ToppingOption;
  const optionItems = items.map((item) => {
    return (
      <ItemComponent
        key={item.name}
        name={item.name}
        imagePath={item.imagePath}
      />
    );
  });

  const title =
    optionsType[0].toUpperCase() + optionsType.slice(1).toLowerCase();

  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerItem[optionsType])} each</p>
      <p>
        {title} total: {formatCurrency(totals[optionsType])}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
};

export default Options;
