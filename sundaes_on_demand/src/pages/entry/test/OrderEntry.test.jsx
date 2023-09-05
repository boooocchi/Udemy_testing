import { render, screen, waitFor } from "@testing-library/react";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";

test("handling an error for scoops and toppings routes", async () => {
  server.resetHandlers("http://localhost:3030/scoops", (res, req, ctx) => {
    res(ctx.status(500));
  });
  server.resetHandlers("http://localhost:3030/toppings", (res, req, ctx) => {
    res(ctx.status(500));
  });
  render(<OrderEntry />);
  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert", {
      name: "unexpected error occured. pls try again later."
    });
    expect(alerts).toHaveLength(2);
  });
});
