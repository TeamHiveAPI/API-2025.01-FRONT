import "animate.css";
import "./styles.scss";
import { IconPencil } from "@tabler/icons-react";

import BotaoCTA from "../BotaoCTA/BotaoCTA";

interface CardUsuarioProps {
  id: string;
  admin: boolean;
  nome: string;
  email: string;
  senha: string;
  data_criacao: string;
  onEdit: () => void; // Nova prop para lidar com o clique de edição
}

export default function CardUsuario({
  admin,
  nome,
  email,
  data_criacao,
  onEdit,
}: CardUsuarioProps) {
  return (
    <div className="caes_wrapper usu">
      <div className="caus_esq">
        <img
          src={admin ? "../../foto_admin.svg" : "../../foto_publico.svg"}
          alt="Perfil"
        />
        <div className="caus_info">
          <h4>{nome}</h4>
          <p>{admin ? "ADMINISTRADOR" : "PÚBLICO"}</p>
        </div>
      </div>
      <div className="caus_info meio">
        <p className="caus_info_texto">{email}</p>
        <p className="caus_info_texto">{data_criacao}</p>
      </div>
      <BotaoCTA
        cor="cor_primario"
        aparencia="secundario"
        img={<IconPencil stroke="1.5" width={28} height={28} />}
        onClick={onEdit} // Adiciona o evento de clique
      />
    </div>
  );
}