import logo from "./logo.svg";
import "./App.css";
import Routers from "./Router/Routers";
import { ThemeProvider } from "./config/ThemeContent";

function App() {
  return (
    <div className="">
      <ThemeProvider>
        <Routers />
      </ThemeProvider>
    </div>
  );
}

export default App;
