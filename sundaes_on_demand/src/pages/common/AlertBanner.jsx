import Alert from "react-bootstrap/Alert";

const AlertBanner = ({ message, variant }) => {
  const alertMessage =
    message || "unexpected error occured. pls try again later.";
  const alertVariant = variant || "danger";

  return (
    <Alert variant={alertVariant} style={{ backgroundColor: "red" }}>
      {alertMessage}
    </Alert>
  );
};

export default AlertBanner