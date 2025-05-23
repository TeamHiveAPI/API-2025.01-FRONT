import { useNavigate } from "react-router-dom";
import BotaoCTA from "../BotaoCTA/BotaoCTA";
import { IconBorderCorners, IconPencil } from "@tabler/icons-react";
import "../CardAlerta/styles.scss"

interface CardSensorProps {
  id: string;
  titulo: string;
  unidOuSensor: string;
  estacao: string;
  estacao_id: string;
  descricao: string;
  quantidade_casas_decimais: number;
  fator_conversao: number;
  offset: number;
  tipo_parametro_id: number;
  json: string;
}

export default function CardSensor({
  id,
  titulo,
  unidOuSensor,
  estacao,
  descricao,
  quantidade_casas_decimais,
  fator_conversao,
  offset,
  tipo_parametro_id,
  json

}: CardSensorProps) {
  const navigate = useNavigate();

  const handleEditar = () => {
    navigate(`/sensores/editar/${id}`, {
      state: {
        id,
        nome: titulo,
        unidade: unidOuSensor,
        descricao,
        quantidade_casas_decimais,
        fator_conversao,
        offset,
        tipo_parametro_id,
        json
      },
    });
  };

  return (
    <div className="casa_wrapper">
      <div>
        <div className="caes_cima">
          <div className="caes_cima_esq">
            <div className="caes_badge">
              <IconBorderCorners color="#FFFFFF" stroke="1.5" width={32} height={32} />
              <p>{id}</p>
            </div>
            <h4 className="casa_titulo">{titulo}</h4>
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
      </div>

      <div className="casa_baixo">
        <div>
          <h4 className="casa_margem">UNID</h4>
          <p>{unidOuSensor}</p>
        </div>
        <div>
          <h4>ESTAÇÃO</h4>
          <p>{estacao}</p>
        </div>
      </div>
    </div>
  );
}