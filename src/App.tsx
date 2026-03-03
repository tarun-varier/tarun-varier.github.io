import "./index.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Hellos from "./pages/Hellos";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hellos" element={<Hellos />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
