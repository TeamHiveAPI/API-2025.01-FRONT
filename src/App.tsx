import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Dashboard from "./pages/Dashboard/Dashboard";
import Estacoes from "./pages/Estacoes/Estacoes";
import CriarEditarEstacao from "./pages/CriarEditarEstacao/CriarEditarEstacao";

import Sensores from "./pages/Sensor/Sensores";
import CriarEditarSensor from "./pages/CriarEditarSensor/CriarEditarSensor";
import CriarEditarTipoSensor from "./pages/CriarEditarTipoSensor/CriarEditarTipoSensor";

import Usuarios from "./pages/Usuários/Usuarios";
import CriarEditarUsuario from "./pages/CriarEditarUsuario/CriarEditarUsuario";

import Alertas from "./pages/Alertas/Alertas";
import CriarEditarAlerta from "./pages/CriarEditarAlerta/CriarEditarAlerta";
import HistoricoAlerta from "./pages/HistoricoAlerta/HistoricoAlerta";

import Login from "./pages/Login/Login";
import Cadastro from "./pages/Cadastro/Cadastro";

import GerarMedidasDev from "./pages/GerarMedidaDev/GerarMedidaDev";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import Aprendizagem from "./pages/Home/Home";
import PaginaPesquisa from "./pages/PaginaPesquisa/PaginaPesquisa";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Públicas */}
          <Route path="/" element={<Aprendizagem />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/historico-alerta" element={<HistoricoAlerta />} />
          <Route path="/estacoes" element={<Estacoes />} />
          <Route path="/sensores" element={<Sensores />} />
          <Route path="/alertas" element={<Alertas />} />
          <Route path="/pesquisa/:query" element={<PaginaPesquisa />} />

          {/* Estações protegidas */}
          <Route path="/estacoes/criar" element={<PrivateRoute><CriarEditarEstacao /></PrivateRoute>} />
          <Route path="/estacoes/editar/:id" element={<PrivateRoute><CriarEditarEstacao /></PrivateRoute>} />

          {/* Sensores protegidos */}
          <Route path="/sensores/criar" element={<PrivateRoute><CriarEditarSensor /></PrivateRoute>} />
          <Route path="/sensores/editar/:id" element={<PrivateRoute><CriarEditarSensor /></PrivateRoute>} />

          {/* Tipo Sensor protegido */}
          <Route path="/tipo-sensores/criar" element={<PrivateRoute><CriarEditarTipoSensor /></PrivateRoute>} />
          <Route path="/tipo-sensores/editar/:id" element={<PrivateRoute><CriarEditarTipoSensor /></PrivateRoute>} />

          {/* Usuários protegidos */}
          <Route path="/usuarios" element={<PrivateRoute><Usuarios /></PrivateRoute>} />
          <Route path="/usuarios/criar" element={<PrivateRoute><CriarEditarUsuario /></PrivateRoute>} />
          <Route path="/usuarios/editar/:id" element={<PrivateRoute><CriarEditarUsuario /></PrivateRoute>} />

          {/* Rotas para Alertas */}
          <Route path="/alertas/criar" element={<PrivateRoute><CriarEditarAlerta /></PrivateRoute>} />
          <Route path="/alertas/editar/:id" element={<PrivateRoute><CriarEditarAlerta /></PrivateRoute>} />

          {/* Página dev */}
          <Route path="/medidas" element={<GerarMedidasDev />} />

          {/* Alertas protegidos */}
          <Route path="/alertas" element={<PrivateRoute><Alertas /></PrivateRoute>} />
          <Route path="/alertas/criar" element={<PrivateRoute><CriarEditarAlerta /></PrivateRoute>} />
          <Route path="/alertas/editar/:id" element={<PrivateRoute><CriarEditarAlerta /></PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}



