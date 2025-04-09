import { useNavigate } from "react-router-dom";
import BotaoCTA from "../BotaoCTA/BotaoCTA";
import "./styles.scss";
import { IconHexagonPlus, IconPencil } from "@tabler/icons-react";

interface CardAlertaProps {
  id: string;
  titulo: string;
  mensagem: string;
  sensor: string;
  sensor_id: number;
  estacao: string;
  estacao_id: number;
  condicao: string;
  num_condicao: number;
}

export default function CardAlerta({
  id,
  titulo,
  mensagem,
  sensor,
  sensor_id,
  estacao,
  estacao_id,
  condicao,
  num_condicao,
}: CardAlertaProps) {
  const navigate = useNavigate();

  const handleEditar = () => {
    navigate(`/alertas/editar/${id}`, {
      state: {
        id,
        parametro_id: sensor_id,
        estacao_id,
        condicao,
        num_condicao,
        mensagem
      },
    });
  };

  return (
    <div className="casa_wrapper">
      <div>
        <div className="caes_cima">
          <div className="caes_cima_esq">
            <div className="caes_badge">
              <IconHexagonPlus color="#FFFFFF" stroke="1.5" width={32} height={32} />
              <p>{id}</p>
            </div>
            <h4 className="casa_titulo max_linha_2">{titulo}</h4>
          </div>
          <div className="caes_cima_dir">
            <BotaoCTA
              cor="cor_primario"
              aparencia="secundario"
              img={<IconPencil stroke="1.5" width={28} height={28} />}
              onClick={handleEditar}
            />
          </div>
        </div>

        <div className="casa_meio">
          <h4 className="casa_margem">MENSAGEM</h4>
          <p>{mensagem}</p>
        </div>
      </div>

      <div className="casa_baixo">
        <div>
          <h4 className="casa_margem">SENSOR</h4>
          <p className="max_linha_1">{sensor}</p>
        </div>
        <div>
          <h4>ESTAÇÃO</h4>
          <p className="max_linha_1">{estacao}</p>
        </div>
      </div>
    </div>
  );
}