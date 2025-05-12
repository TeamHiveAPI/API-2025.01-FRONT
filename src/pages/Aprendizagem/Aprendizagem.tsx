import "./styles.scss";

import Navbar from "../../components/Navbar/Navbar";
import { IconCube } from "@tabler/icons-react";
import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";
import { useNavigate } from "react-router-dom";

export default function Aprendizagem() {

  const navigate = useNavigate();

  return (
    <>
    <Navbar />

    <div className="banner">
      <video autoPlay muted loop playsInline className="video_fundo">
        <source src="./fundo_banner.mp4" type="video/mp4" />
        Seu navegador não suporta vídeos.
      </video>

      <div className="conteudo_banner">
        <h1>Gestão Meteorológica por um mundo mais seguro</h1>
        <img src="./decoracao_banner.svg" />
        <p>Acompanhe temperatura, chuva, vento e riscos ambientais em tempo real.</p>
        <div>
          <BotaoCTA
            cor="cor_primario"
            escrito="Acesse nosso Dashboard"
            aparencia="primario"
            img={<IconCube stroke="2" />}
            onClick={() => navigate("/dashboard")}
          />
        </div>
      </div>
    </div>

    <div className="apr_wrapper">
      <div className="apr_container">
      </div>
    </div>
    </>

  );
}