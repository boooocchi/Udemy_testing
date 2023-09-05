import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOption from "./ScoopOption";
import Row from "react-bootstrap/Row";
import ToppingOption from "./TopingOption";
import AlertBanner from "../common/alertBanner";

const Options = ({ optionsType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionsType}`)
      .then((response) => setItems(response.data))
      .catch((error) => setError(true));
  }, [optionsType]);
  if (error) {
    return <AlertBanner></AlertBanner>;
  }

  const ItemComponent = optionsType === "scoops" ? ScoopOption : ToppingOption;
  console.log(items);
  const optionItems = items.map((item) => {
    return (
      <ItemComponent
        key={item.name}
        name={item.name}
        imagePath={item.imagePath}
      />
    );
  });
  return <Row>{optionItems}</Row>;
};

export default Options;
