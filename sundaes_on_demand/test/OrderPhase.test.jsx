import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user";
import App from "../App";
import { rest } from "msw";
import { server } from "../../../mocks/server";

test("order phase for happy path", async () => {
  render(<App />);
  const user = userEvent.setup();

  const VanillaScoopInput = await screen.findByText("Vanilla");
  await user.clear(VanillaScoopInput);
  await user.type(VanillaScoopInput, "3");

  const MochiTopping = await screen.findByRole("checkbox", { name: /mochi/i });
  await user.click(MochiTopping);

  const orderButton = screen.getByRole("button", {
    name: /see order summary/i
  });
  await user.click(orderButton);

  const grandTotal = screen.getByText("Grand total:", { exact: false });
  expect(grandTotal).toHaveTextContent("7.50");

  const TermsAndConditonCheckbox = screen.getByText(/terms and conditions/i);
  const confirmButton = screen.getByRole("button", { name: /confirm order/i });

  await user.click(TermsAndConditonCheckbox);
  await user.click(confirmButton);

  const goBackHomeButton = screen.getByRole("button", {
    name: /go back home/i
  });
  await user.click(goBackHomeButton);

  expect(grandTotal).toHaveTextContent("0.00");
});
