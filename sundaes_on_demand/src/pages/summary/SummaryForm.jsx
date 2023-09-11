import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { useOrderDetails } from "../../context/OrderDetails";

export default function SummaryForm() {
  const [tcChecked, setTcChecked] = useState(false);

  const { setOrderState } = useOrderDetails();
  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>No icecream will be delivered</Popover.Body>
    </Popover>
  );
  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: "blue" }}> Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  const goToCompletePage = () => {
    setOrderState("complete");
  };
  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={tcChecked}
          onChange={(e) => setTcChecked(e.target.checked)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        disabled={!tcChecked}
        onClick={goToCompletePage}
      >
        Confirm order
      </Button>
    </Form>
  );
}
