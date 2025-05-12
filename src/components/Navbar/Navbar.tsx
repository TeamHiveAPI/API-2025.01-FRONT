import { Link, useLocation, useNavigate } from "react-router-dom";
import BotaoCTA from "../BotaoCTA/BotaoCTA";
import "./styles.scss";
import { IconLogin2 } from "@tabler/icons-react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { path: "/", label: "Aprendizado" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/historico-alerta", label: "Histórico" },
    { path: "/estacoes", label: "Estações" },
    { path: "/sensores", label: "Sensores" },
    { path: "/alertas", label: "Alertas" },
  ];

  return (
    <div className="nav_wrapper">
      <div className="nav_container">
        <div className="nav_esq">
          <img src="../tecsus_logo.svg" alt="Logo" />
        </div>

        <div className="nav_meio">
          {links.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={location.pathname === path ? "nav_ativo" : ""}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="nav_login">
          <BotaoCTA
            cor="cor_primario"
            escrito="Login"
            aparencia="secundario"
            img={<IconLogin2 stroke="2" />}
            onClick={() => navigate("/login")}
          />
        </div>
      </div>
    </div>
  );
}