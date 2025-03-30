import { useNavigate } from "react-router-dom";
import BotaoCTA from "../components/BotaoCTA/BotaoCTA";
import { IconPencil } from "@tabler/icons-react";
import "./styles.scss";

interface CardTipoSensorProps {
  id: string;
  nome: string;
  descricao: string;
}

export default function CardTipoSensor({
  id,
  nome,
  descricao,
}: CardTipoSensorProps) {
  const navigate = useNavigate();

  const handleEditar = () => {
    navigate(`/tipo-sensor/editar/${id}`, {
      state: {
        id,
        nome,
        descricao,
      },
    });
  };

  return (
    <div className="card_tipo_sensor">
      <div className="card_top">
        <h4 className="card_titulo">{nome}</h4>
        <BotaoCTA
          cor="cor_primario"
          aparencia="secundario"
          img={<IconPencil stroke="1.5" width={28} height={28} />}
          onClick={handleEditar}
        />
      </div>
      <p className="card_descricao">{descricao}</p>
    </div>
  );
}
