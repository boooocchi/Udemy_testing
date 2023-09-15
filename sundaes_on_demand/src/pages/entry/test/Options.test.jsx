import { render, screen } from "../../../test-utils/testing-library-utils";
import Options from "../Options";
import userEvent from "@testing-library/user-event";

test("Display image from each scoop option from the server", async () => {
  render(<Options optionsType="scoops" />);
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i }); //$ sign indicate scoop is at the end of the name
  expect(scoopImages).toHaveLength(2); //getAllByRole returns array

  //confirm alt text of imgaes
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("Display image from each topping option from the server", async () => {
  render(<Options optionsType="toppings" />);
  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i
  });

  expect(toppingImages).toHaveLength(3);

  const altText = toppingImages.map((element) => element.alt);
  expect(altText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping"
  ]);
});
test("when scoop value is invalid, box turns red", async () => {
  render(<Options optionsType="scoops" />);
  const user = userEvent.setup();
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla"
  });

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "-1");
  expect(vanillaInput).toHaveClass("is-invalid");
  await user.clear(vanillaInput);

  await user.type(vanillaInput, "2.5");
  expect(vanillaInput).toHaveClass("is-invalid");
  await user.clear(vanillaInput);

  await user.type(vanillaInput, "11");
  expect(vanillaInput).toHaveClass("is-invalid");

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "3");
  expect(vanillaInput).not.toHaveClass("is-invalid");
});

test("scoop input doesnt go below 0", async () => {
  render(<Options optionsType="scoops" />);
  const user = userEvent.setup();

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: /chocolate/i
  });
  const scoopsSubtotal = screen.getByText(/scoops total/i);
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "3.5");

  expect(chocolateInput).toHaveClass("is-invalid");
  expect(scoopsSubtotal).toHaveTextContent("0");
});
