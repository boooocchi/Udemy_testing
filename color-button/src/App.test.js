import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
// import { logRoles } from "@testing-library/react";
import { replaceCamelWithSpaces } from "./App";
test("button has correct initial color and update when clicked", () => {
  render(<App />);
  // const { container } = render(<App />);
  // logRoles(container); /// console.log the roles of elements
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  expect(colorButton).toHaveStyle({ backgroundColor: "red" });

  //click button
  fireEvent.click(colorButton);

  //expect the button to be blue color
  expect(colorButton).toHaveStyle({ backgroundColor: "blue" });
  expect(colorButton).toHaveTextContent("Change to red");
});
test("initial conditions", () => {
  render(<App />);
  //check that the button starts out enabled
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  expect(colorButton).toBeEnabled();
  //check that the checkbox starts out unchecked
  const checkbox = screen.getByRole("checkbox", {
    name: "Disable button"
  });
  expect(checkbox).not.toBeChecked();
  fireEvent.click(checkbox);
  expect(colorButton).toBeDisabled();

  //when button is disabled, bg color will be gray
});

test("check the button background color after tick off the checkbox", () => {
  render(<App />);
  const colorButton = screen.getByRole("button");
  const checkbox = screen.getByRole("checkbox");

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: "red" });
});

describe("spaces before camel-case capital letters", () => {
  test("works for no inner capital letters", () => {
    expect(replaceCamelWithSpaces("Red")).toBe("Red");
  });
  test("works for one inner capital letters", () => {
    expect(replaceCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });
  test("works for multiple inner capital letters", () => {
    expect(replaceCamelWithSpaces("MidiumVioletRed")).toBe("Midium Violet Red");
  });
});
