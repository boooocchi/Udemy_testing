import { render, screen, waitFor } from "@testing-library/react";
import { server } from "../../../mocks/server";
import { rest } from "msw";
import Complete from "../Complete";
import { OrderDetailsProvider } from "../../../context/OrderDetails";

test("error response when order didnt get through", async () => {
  server.resetHandlers(
    rest.post("http://localhost:3030/order", (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(<Complete />, { wrapper: OrderDetailsProvider });

  const errorMessage = await screen.findByRole("alert");

  expect(errorMessage).toHaveTextContent(
    "unexpected error occured. pls try again later."
  );
});
