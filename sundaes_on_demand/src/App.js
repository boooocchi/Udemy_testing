import "./App.css";
import Container from "react-bootstrap/Container";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailsProvider, useOrderDetails } from "./context/OrderDetails";
import OrderSummary from "./pages/summary/OrderSummary";
import React from "react";
import Complete from "./pages/complete/Complete";

function App() {
  return (
    <OrderDetailsProvider>
      <Container>
        <Content />
      </Container>
    </OrderDetailsProvider>
  );
}

function Content() {
  const { orderState } = useOrderDetails();
  let componentToRender;

  switch (orderState) {
    case "entry":
      componentToRender = <OrderEntry />;
      break;
    case "summary":
      componentToRender = <OrderSummary />;
      break;
    case "complete":
      componentToRender = <Complete />;
      break;
    default:
      break;
  }

  return componentToRender;
}

export default App;
