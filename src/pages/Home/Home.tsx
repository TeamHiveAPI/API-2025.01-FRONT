import Sidebar from "../../components/Sidebar/Sidebar";

import "./styles.scss";

import Footer from "../../components/Footer/Footer";
import BarraCima from "../../components/BarraCima/BarraCima";
import CardAlertaAtivo from "../../components/CardAlertaAtivo/CardAlertaAtivo";
import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";
import { IconHexagonPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate();

  return (
    <div className="pagina_wrapper">
      <Sidebar />
        <div>
          <div className="pagina_container home">

          <BarraCima nome="Início" tipo="home"/>
          <div className="home_cima">
            <p>Alerta mais recente</p>
            <BotaoCTA
              aparencia="primario"
              cor="cor_primario"
              escrito="Ver Tudo"
              img={<IconHexagonPlus stroke="1.5" />}
              type="submit"
              onClick={() => navigate("/historico-alerta")}
            />
          </div>
          
          <CardAlertaAtivo
            id="1"
            alertaAtivo={true}
            titulo={"Temperatura menor que 5°C"}
            tempoAtivo="2h30min"
            descricaoAlerta="Atenção: Temperatura abaixo de 5°C. Evite a exposição ao frio intenso. Lorem Ipsum is simply dummy text
            of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            estacao="Nome da Estação Aqui"
            coordenadas={[-23.162170, -45.794907]}
          />
          </div>
          <Footer />
        </div>
    </div>
  );
}