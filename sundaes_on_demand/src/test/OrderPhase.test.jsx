import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("order phase for happy path", async () => {
  const { unmount } = render(<App />);
  const user = userEvent.setup();

  const VanillaScoopInput = await screen.findByRole("spinbutton", {
    name: "Vanilla"
  });
  await user.clear(VanillaScoopInput);
  await user.type(VanillaScoopInput, "3");

  const MochiTopping = await screen.findByRole("checkbox", {
    name: /Hot fudge/i
  });
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

  // const loading = screen.getByText(/loading.../i);
  // expect(loading).toBeInTheDocument();

  const orderNumber = await screen.findByText(/Your Order Number: 123456789/i);
  expect(orderNumber).toBeInTheDocument();
  const notLoading = screen.queryByText(/loading.../i);
  expect(notLoading).not.toBeInTheDocument();

  const goBackHomeButton = screen.getByRole("button", {
    name: /go back home/i
  });
  await user.click(goBackHomeButton);

  const grandTotal1 = screen.getByText("Grand total:", { exact: false });
  expect(grandTotal1).toHaveTextContent("0.00");
  unmount();
});

test("topping header is not on summary page if no toppings ordered", async () => {
  render(<App />);
  const user = userEvent.setup();
  const vanillaScoop = await screen.findByRole("spinbutton", {
    name: "Vanilla"
  });
  await user.clear(vanillaScoop);
  await user.type(vanillaScoop, "2");

  await user.click(screen.getByRole("button", { name: /see order summary/i }));
  const toppingHeader = screen.queryByText(/toppings/i);
  expect(toppingHeader).not.toBeInTheDocument();
});
