import {
  render,
  screen,
  waitFor
} from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import userEvent from "@testing-library/user-event";

test("handling an error for scoops and toppings routes", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (res, req, ctx) => {
      return res(ctx.status(500));
    }),

    rest.get("http://localhost:3030/toppings", (res, req, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(<OrderEntry setOrderPhase={jest.fn()} />);
  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});

test("when no scoop is selected, disable order button", async () => {
  render(<OrderEntry />);
  const user = userEvent.setup();

  const orderButton = screen.getByRole("button", {
    name: /see order summary/i
  });
  expect(orderButton).toBeDisabled();

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate"
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "3");

  expect(orderButton).toBeEnabled();
});
