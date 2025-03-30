import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";

import Estacoes from "./pages/Estacoes/Estacoes";
import CriarEditarEstacao from "./pages/CriarEditarEstacao/CriarEditarEstacao";

import Sensores from "./pages/Sensor/Sensores";
import CriarEditarSensor from "./pages/CriarEditarSensor/CriarEditarSensor";
import CriarEditarTipoSensor from "./pages/CriarEditarTipoSensor/CriarEditarTipoSensor";

import Usuarios from "./pages/Usuários/Usuarios";
import CriarEditarUsuario from "./pages/CriarEditarUsuario/CriarEditarUsuario";

import Alertas from "./pages/Alertas/Alertas";
import CriarEditarAlerta from "./pages/CriarEditarAlerta/CriarEditarAlerta";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Rotas para Estações */}
        <Route path="/estacoes" element={<Estacoes />} />
        <Route path="/estacoes/criar" element={<CriarEditarEstacao />} />
        <Route path="/estacoes/editar/:id" element={<CriarEditarEstacao />} />

        {/* Rotas para Sensores */}
        <Route path="/sensores" element={<Sensores />} />
        <Route path="/sensores/criar" element={<CriarEditarSensor />} />
        <Route path="/sensores/editar/:id" element={<CriarEditarSensor />} />

        {/* Rotas para Tipo de Sensores */}
        <Route path="/tipo-sensores/criar" element={<CriarEditarTipoSensor />} />
        <Route path="/tipo-sensores/editar/:id" element={<CriarEditarTipoSensor />} />

        {/* Rotas para Usuários */}
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/usuarios/criar" element={<CriarEditarUsuario />} />
        <Route path="/usuarios/editar/:id" element={<CriarEditarUsuario />} />

        {/* Rotas para Alertas */}
        <Route path="/alertas" element={<Alertas />} />
        <Route path="/alertas/criar" element={<CriarEditarAlerta />} />
        <Route path="/alertas/editar/:id" element={<CriarEditarAlerta />} />
      </Routes>
    </Router>
  );
}
