import { useNavigate } from "react-router-dom";
import BotaoCTA from "../BotaoCTA/BotaoCTA";
import { IconBorderCorners, IconPencil } from "@tabler/icons-react";
import "../CardAlerta/styles.scss"

interface CardSensorProps {
    id: string;
    nome: string;
    descricao: string;
}

export default function CardSensor({
  id,
  nome,
  descricao
}: CardSensorProps) {
  const navigate = useNavigate();

  const handleEditar = () => {
    navigate(`/tipo-sensores/editar/${id}`, {
      state: {
        id,
        nome: nome,
        descricao: descricao
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
            <h4 className="casa_titulo">{nome}</h4>
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
        <div className="caes_info column">
        <p>DESCRIÇÃO</p>
        <p>{descricao}</p>
        </div>
      </div>
    </div>
  );
}