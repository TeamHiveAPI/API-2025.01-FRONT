import Sidebar from "../../components/Sidebar/Sidebar";
import "./styles.scss";
import Footer from "../../components/Footer/Footer";
import BarraCima from "../../components/BarraCima/BarraCima";
import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";
import { IconHexagonPlus, IconBroadcast, IconClock } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate();

  const MiniCardAlerta = ({
    titulo,
    tempoAtivo,
    estacao,
    alertaAtivo,
  }: {
    titulo: string;
    tempoAtivo: string;
    estacao: string;
    alertaAtivo: boolean;
  }) => (
    <div className="caes_wrapper caal mini">
      <div className="caal_esq">
        <div>
          <div className="caal_cima sem_margem">
            <div className="caal_info_esq">
              <div className={alertaAtivo ? "caal_ativo" : "caal_inativo"}></div>
              <h5 className="caal_titulo mini">{titulo}</h5>
              <div className="caal_tempo">
                <IconClock width={16} stroke={1.5} color="#808080" />
                <p>{tempoAtivo}</p>
              </div>
            </div>
            <div className="caal_info mini">
              <IconBroadcast width={32} stroke={1.5} color="#808080" />
              <p>{estacao}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );  

  return (
    <div className="pagina_wrapper">
      <Sidebar />
      <div>
        <div className="pagina_container home">
          <BarraCima nome="Início" tipo="home" />
          <div className="home_cima_titulo">
            <h2>Alerta mais recente</h2>
          </div>
          <div className="home_cima">
            <MiniCardAlerta
              titulo="Temperatura maior ou igual a 5°C"
              tempoAtivo="2h30min"
              estacao="Nome da Estação Aqui"
              alertaAtivo={true}
            />

            <BotaoCTA
              aparencia="primario"
              cor="cor_primario"
              escrito="Ver Tudo"
              img={<IconHexagonPlus stroke="1.5" />}
              type="submit"
              onClick={() => navigate("/historico-alerta")}
            />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}