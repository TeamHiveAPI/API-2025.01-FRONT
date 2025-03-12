import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Estacoes from "./pages/Estacoes/Estacoes";
import CriarEditarEstacao from "./pages/CriarEditarEstacao/CriarEditarEstacao";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/estacoes" element={<Estacoes />} />
        <Route path="/estacoes/criar" element={<CriarEditarEstacao />} />
      </Routes>
    </Router>
  );
}