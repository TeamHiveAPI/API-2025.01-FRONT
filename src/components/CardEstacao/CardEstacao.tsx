import BotaoCTA from "../BotaoCTA/BotaoCTA";
import "./styles.scss";
import { IconBroadcast, IconCircle, IconPencil, IconMapPin, IconBorderCorners } from "@tabler/icons-react";

interface CardEstacaoProps {
    id: string;
    titulo: string;
    ativo: boolean;
    endereco: string;
    latitude: string;
    longitude: string;
    qtd_sensor: string;
}

export default function CardEstacao({id, titulo, ativo, endereco, latitude, longitude, qtd_sensor }: CardEstacaoProps) {
    return (
        <div className="caes_wrapper">
            <div> {/* Agrupando parte de cima e parte endereço para o space-between funcionar melhor */}
            <div className="caes_cima">
                <div className="caes_cima_esq">
                    <div className="caes_badge">
                        <IconBroadcast color="#FFFFFF" stroke="1.5" width={32} height={32} />
                        <p>{id}</p>
                    </div>
                    <h4>{titulo}</h4>
                </div>
                <div className="caes_cima_dir">
                    <div className="caes_status">
                        <IconCircle fill={ativo ? "#13811E" : "#808080"} stroke="0" width={16} height={16} />
                        <p className={ativo ? "" : "cinza"}>{ativo ? "Ativo" : "Desativado"}</p>    
                    </div>
                    <BotaoCTA cor="cor_primario" aparencia="secundario" img={<IconPencil stroke="1.5" width={28} height={28} />} />
                </div>
            </div>
            <div className="caes_endereco">
                <div>
                    <IconMapPin color="#5751D5" stroke="1.5" width={32} height={32} />
                </div>
                <p>{endereco}</p>
            </div>
            </div> {/* Fim do agrupamento */}
            <div className="caes_baixo">
                <div className="caes_baixo_esq">
                    <div className="caes_info">
                        <p>LAT</p>
                        <p>{latitude}</p>
                    </div>
                    <div className="caes_info">
                        <p>LONG</p>
                        <p>{longitude}</p>
                    </div>
                </div>
                <BotaoCTA cor="cor_primario" escrito={`Ver Sensores (${qtd_sensor})`} aparencia="secundario" pequeno={true} img={<IconBorderCorners stroke="2" width={28} height={28} />} />
            </div>
        </div>
    );
}