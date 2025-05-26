import { useAuth } from "../../hooks/UseAuth";
import { Link, useLocation } from "react-router-dom";
import { IconCube, IconBroadcast, IconVersions, IconHexagonPlus, IconUser, IconLogout } from "@tabler/icons-react";
import "./styles.scss";

function formatarNome(nome: string) {
  const partes = nome.trim().split(" ");
  if (partes.length > 1) {
    return `${partes[0]} ${partes[1][0]}.`;
  }
  return partes[0];
}

export default function Sidebar() {
  const { logout, user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const nomeUsuario = user?.user_nome || "Usuário";

  return (
    <div className="side_wrapper">
      <div className="side_cima">
        <img src="../../tecsus_logo.svg" />

        <Link to="/dashboard" className={`side_botao ${location.pathname === "/dashboard" ? "ativo" : ""}`}>
          <IconCube size={32} color="#404040" stroke={1.5} /> <span>Dashboard</span>
        </Link>

        <Link to="/estacoes" className={`side_botao ${location.pathname === "/estacoes" ? "ativo" : ""}`}>
          <IconBroadcast size={32} color="#404040" stroke={1.5} /> <span>Estações</span>
        </Link>

        <Link to="/sensores" className={`side_botao ${location.pathname === "/sensores" ? "ativo" : ""}`}>
          <IconVersions size={32} color="#404040" stroke={1.5} /> <span>Sensores</span>
        </Link>

        <Link to="/alertas" className={`side_botao ${location.pathname === "/alertas" ? "ativo" : ""}`}>
          <IconHexagonPlus size={32} color="#404040" stroke={1.5} /> <span>Alertas</span>
        </Link>

        <Link to="/usuarios" className={`side_botao ${location.pathname === "/usuarios" ? "ativo" : ""}`}>
          <IconUser size={32} color="#404040" stroke={1.5} /> <span>Usuários</span>
        </Link>
      </div>

      <div className="side_usuario">
        <div>
          <img src="../../foto_admin.svg" />
          <h4>{formatarNome(nomeUsuario)}</h4>
        </div>
        <button onClick={logout} className="side_botao_logout">
          <IconLogout size={32} color="#FFFFFF" stroke={1.5} /> <span>Logout</span>
        </button>
      </div>
    </div>
  );
}