// import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";

export const replaceCamelWithSpaces = (colorName) => {
  return colorName.replace(/\B([A-Z])\B/g, " $1");
};

function App() {
  const [buttonColor, setButtonColor] = useState("red");
  const [checkboxState, setCheckboxState] = useState(false);
  const newButtonColor = buttonColor === "red" ? "blue" : "red";

  const onButtonClicked = () => {
    setButtonColor(newButtonColor);
  };

  const onCheckboxClicked = () => {
    setCheckboxState((prev) => !prev);
  };
  return (
    <div className="App">
      <button
        onClick={onButtonClicked}
        disabled={checkboxState}
        style={{ backgroundColor: checkboxState ? "gray" : buttonColor }}
      >
        Change to {newButtonColor}
      </button>
      <input
        id="disable-button-checkbox"
        type="checkbox"
        defaultChecked={checkboxState}
        onClick={onCheckboxClicked}
      />
      <label htmlFor="disable-button-checkbox">Disable button</label>
    </div>
  );
}

export default App;
