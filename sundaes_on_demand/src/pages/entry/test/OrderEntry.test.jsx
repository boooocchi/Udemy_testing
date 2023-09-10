import {
  render,
  screen,
  waitFor
} from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";

test("handling an error for scoops and toppings routes", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (res, req, ctx) => {
      res(ctx.status(500));
    })
  );
  server.resetHandlers(
    rest.get("http://localhost:3030/toppings", (res, req, ctx) => {
      res(ctx.status(500));
    })
  );
  render(<OrderEntry />);
  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});
