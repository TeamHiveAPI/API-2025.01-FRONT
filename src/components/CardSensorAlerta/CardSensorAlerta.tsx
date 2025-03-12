import BotaoCTA from "../BotaoCTA/BotaoCTA";
import "./styles.scss";
import { IconBorderCorners, IconHexagonPlus, IconPencil } from "@tabler/icons-react";

interface CardSensorAlertaProps {
    sensor: boolean;
    id: string,
    titulo: string;
    escrito: string;
    unidOuSensor: string;
    estacao: string;
}

export default function CardSensorAlerta({ sensor, id, titulo, escrito, unidOuSensor, estacao }: CardSensorAlertaProps) {

    return (
        <div className="casa_wrapper">
            <div> {/* Agrupando parte de cima e parte do meio para o space-between funcionar melhor */}
            <div className="caes_cima">
                <div className="caes_cima_esq">
                    <div className="caes_badge">
                    {sensor ? (
                            <IconBorderCorners color="#FFFFFF" stroke="1.5" width={32} height={32} />
                        ) : (
                            <IconHexagonPlus color="#FFFFFF" stroke="1.5" width={32} height={32} />
                        )}
                        <p>{id}</p>
                    </div>
                    <h4 className="casa_titulo">{titulo}</h4>
                </div>
                <div className="caes_cima_dir">
                    <BotaoCTA cor="cor_primario" aparencia="secundario" img={<IconPencil stroke="1.5" width={28} height={28} />} />
                </div>
            </div>
            <div className="casa_meio">
                <h4 className="casa_margem">{sensor ? "DESCRIÇÃO" : "MENSAGEM"}</h4>
                <p>{escrito}</p>
            </div>
            </div> {/* Fim do agrupamento */}
            <div className="casa_baixo">
                <div>
                    <h4 className="casa_margem">{sensor ? "UNID" : "SENSOR"}</h4>
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