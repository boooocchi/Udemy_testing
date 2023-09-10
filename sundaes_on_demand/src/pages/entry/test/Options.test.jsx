import { render, screen } from "../../../test-utils/testing-library-utils";
import Options from "../Options";

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
