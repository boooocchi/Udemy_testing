import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";
import { OrderDetailsProvider } from "../../../context/OrderDetails";
test("update scoop subtotal", async () => {
  const user = userEvent.setup();
  render(<Options optionsType="scoops" />, { wrapper: OrderDetailsProvider });

  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla"
  });

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  expect(scoopsSubtotal).toHaveTextContent("2.00");

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate"
  });

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");

  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update topping subtotal", async () => {
  const user = userEvent.setup();
  render(<Options optionsType="toppings" />, { wrapper: OrderDetailsProvider });

  const toppingSubtotal = screen.getByText("Toppings total: $", {
    exact: false
  });
  expect(toppingSubtotal).toHaveTextContent("0.00");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries"
  });

  await user.click(cherriesCheckbox);

  expect(toppingSubtotal).toHaveTextContent("1.50");

  const mmCheckbox = screen.getByRole("checkbox", { name: "M&Ms" });

  await user.click(mmCheckbox);

  expect(toppingSubtotal).toHaveTextContent("3.00");

  await user.click(mmCheckbox);
  expect(toppingSubtotal).not.toBeChecked();

  expect(toppingSubtotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  test("grand total starts at 0.00", async () => {
    const { unmount } = render(<OrderEntry />, {
      wrapper: OrderDetailsProvider
    });
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i
    });
    expect(grandTotal).toHaveTextContent("0.00");
    unmount();
  });

  test("grand total updates properly afer scoop is added first", async () => {
    render(<OrderEntry />, {
      wrapper: OrderDetailsProvider
    });
    const user = userEvent.setup();

    const grandTotal = await screen.findByRole("heading", {
      name: /grand total: \$/i
    });
    const scoopInput = await screen.findByRole("spinbutton", {
      name: "Vanilla"
    });
    const toppingCheckbox = await screen.findByRole("checkbox", {
      name: "M&Ms"
    });

    await user.clear(scoopInput);
    await user.type(scoopInput, "1");
    await user.click(toppingCheckbox);

    expect(grandTotal).toHaveTextContent("3.50");
  });
  test("grand total updates properly afer topping is added first", async () => {
    render(<OrderEntry />, {
      wrapper: OrderDetailsProvider
    });
    const user = userEvent.setup();

    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i
    });
    const toppingCheckbox = await screen.findByRole("checkbox", {
      name: "M&Ms"
    });
    const scoopInput = await screen.findByRole("spinbutton", {
      name: "Vanilla"
    });

    await user.click(toppingCheckbox);
    await user.clear(scoopInput);
    await user.type(scoopInput, "2");

    expect(grandTotal).toHaveTextContent("5.50");
  });
  test("grand total updates properly after item is removed", () => {});
});
