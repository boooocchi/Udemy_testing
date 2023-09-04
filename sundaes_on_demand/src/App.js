import "./App.css";
import Options from "./pages/entry/Options";
import SummaryForm from "./pages/summary/SummaryForm";
function App() {
  return (
    <>
      <Options optionsType="scoops"></Options>
      <SummaryForm></SummaryForm>
    </>
  );
}

export default App;
