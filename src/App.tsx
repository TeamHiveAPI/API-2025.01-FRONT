import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Estacoes from "./pages/Estacoes/Estacoes";
import CriarEditarEstacao from "./pages/CriarEditarEstacao/CriarEditarEstacao";
import Usuarios from "./pages/Usuários/Usuarios";
import Alertas from "./pages/Alertas/Alertas";
import CriarEditarAlerta from "./pages/CriarEditarAlerta/CriarEditarAlerta";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/estacoes" element={<Estacoes />} />
        <Route path="/estacoes/criar" element={<CriarEditarEstacao />} />
        <Route path="/estacoes/editar/:id" element={<CriarEditarEstacao />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/alertas" element={<Alertas />} />
        <Route path="/alertas/criar" element={<CriarEditarAlerta />} />
        <Route path="/alertas/editar/:id" element={<CriarEditarAlerta />} />
      </Routes>
    </Router>
  );
}