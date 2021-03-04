import "./App.css";
import Attente from "./Components/Attente";
import Create from "./Components/Create";
import Pauses from "./Components/Pauses";
import Reset from "./Components/Reset";
import Terminer from "./Components/Terminer";

function App() {
  return (
    <div className="App">
      <Create />
      <Attente />
      <Pauses />
      <Terminer />
      <Reset/>
    </div>
  );
}

export default App;
