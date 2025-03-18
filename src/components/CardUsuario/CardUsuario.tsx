import "animate.css";
import "./styles.scss";
import {IconPencil} from "@tabler/icons-react";

import BotaoCTA from "../BotaoCTA/BotaoCTA";


interface CardUsuarioProps {
    id: string;
    admin: boolean;
    nome: string;
    email: string;
    senha: string;
    data_criacao: string;
}

export default function CardUsuario({admin, nome, email, data_criacao}: CardUsuarioProps) {

    return (
        <div className="caes_wrapper usu">
            <div className="caus_esq">
            <img src={admin ? "../../foto_admin.png" : "../../foto_publico.png"} alt="Perfil" />
                <div className="caus_info">
                    <h4>{nome}</h4>
                    <p>{admin ? "ADMINISTRADOR" : "PÚBLICO"}</p>
                </div>
            </div>
            <div className="caus_info meio">
                <p className="caus_info_texto">{email}</p>
                <p className="caus_info_texto">{data_criacao}</p>
            </div>
            <BotaoCTA cor="cor_primario" aparencia="secundario" img={<IconPencil stroke="1.5" width={28} height={28} />} />
        </div>
    );
}
