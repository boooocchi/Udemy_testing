import SummaryForm from "../SummaryForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("checkbox initial condition and feature of enabling and disabling the button", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions"
  });
  const button = screen.getByRole("button", { name: "Confirm order" });
  expect(checkbox).not.toBeChecked();

  await user.click(checkbox);
  expect(button).toBeEnabled();

  await user.click(checkbox);
  expect(button).toBeDisabled();
});

test("popover responds to hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  const termsAndConditions = screen.getByText(/terms and conditions/i);

  // Hover over terms and conditions
  await user.hover(termsAndConditions);

  // Re-query for the popover element after hovering
  const popover = screen.queryByText(/no icecream will be delivered/i);
  expect(popover).toBeInTheDocument();

  // Unhover from terms and conditions
  await user.unhover(termsAndConditions);

  // Re-query for the popover element after unhovering
  const nullPopover = screen.queryByText(/no icecream will be delivered/i);
  expect(nullPopover).not.toBeInTheDocument();
});
