import React from "react";
import Col from "react-bootstrap/Col";
import { useOrderDetails } from "../../context/OrderDetails";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
const ScoopOption = ({ name, imagePath }) => {
  const [isValid, setIsValid] = React.useState(true);

  const { updateItemCount } = useOrderDetails();
  const handleChange = (event) => {
    const currentValue = event.target.value;
    const currentValueFloat = parseFloat(currentValue);
    const valueIsValid =
      0 <= currentValueFloat &&
      currentValueFloat <= 10 &&
      Math.floor(currentValueFloat) === currentValueFloat;

    // validate
    setIsValid(valueIsValid);
    const newValue = valueIsValid ? currentValueFloat : "0";
    // only update context if the value is valid
    updateItemCount(name, newValue, "scoops");
  };
  return (
    <Col
      xs={12}
      sm={6}
      md={4}
      lg={3}
      style={{ textAlign: "center" }}
      key={name}
    >
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={handleChange}
            isInvalid={!isValid}
          ></Form.Control>
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ScoopOption;
