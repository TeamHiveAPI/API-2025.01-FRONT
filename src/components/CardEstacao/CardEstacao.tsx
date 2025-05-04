import { useNavigate } from "react-router-dom";
import "animate.css";
import "./styles.scss";
import { IconBroadcast, IconCircle, IconPencil, IconMapPin, IconBorderCorners } from "@tabler/icons-react";
import Swal from "sweetalert2";
import BotaoCTA from "../BotaoCTA/BotaoCTA";

interface Sensor {
  id: number;
  nome: string;
  unidade: string;
}

interface CardEstacaoProps {
  id: string;
  uid: string;
  titulo: string;
  ativo: boolean;
  endereco: string;
  latitude: string;
  longitude: string;
  sensores: Sensor[];
}

export default function CardEstacao({
  id,
  uid,
  titulo,
  ativo,
  endereco,
  latitude,
  longitude,
  sensores
}: CardEstacaoProps) {
  const navigate = useNavigate();

  const mostrarSensores = () => {
    Swal.fire({
      showClass: { popup: "animate__animated animate__fadeInUp swal_rapido" },
      hideClass: { popup: "animate__animated animate__fadeOutDown swal_rapido" },
      imageUrl: "/public/swal_sensor.png",
      imageWidth: 100,
      imageHeight: 100,
      title: "Sensores da Estação",
      html: `<ul style="text-align: left;">${sensores.map((sensor) => `<li>${sensor.nome} (${sensor.unidade})</li>`).join("")}</ul>`,
      confirmButtonText: "Fechar",
      confirmButtonColor: "#5751D5",
      customClass: { title: "swal_titulo" },
    });
  };
  

  return (
    <div className="caes_wrapper">
      <div>
        <div className="caes_cima">
          <div className="caes_cima_esq">
            <div className="caes_badge">
              <IconBroadcast color="#FFFFFF" stroke="1.5" width={32} height={32} />
              <p>{id}</p>
            </div>
            <h4 className="max_linha_2">{titulo} </h4>
          </div>
          <div className="caes_cima_dir">
            <div className="caes_status">
              <IconCircle fill={ativo ? "#13811E" : "#808080"} stroke="0" width={16} height={16} />
              <p className={ativo ? "" : "cinza"}>{ativo ? "Ativo" : "Desativado"}</p>
            </div>
            <BotaoCTA
              cor="cor_primario"
              aparencia="secundario"
              img={<IconPencil stroke="1.5" width={28} height={28} />}
              onClick={() =>
                navigate(`/estacoes/editar/${id}`, {
                  state: { id, uid,  titulo, ativo, endereco, latitude, longitude, sensores },
                })
              }
            />
          </div>
        </div>
        <div className="caes_endereco">
          <div>
            <IconMapPin color="#5751D5" stroke="1.5" width={32} height={32} />
          </div>
          <p>{endereco}</p>
        </div>
        <div className="caes_endereco uid">
          <div>
            <IconMapPin color="#5751D5" stroke="1.5" width={32} height={32} />
          </div>
          <p>{uid}</p>
        </div>
        
      </div>
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
        <BotaoCTA
          cor="cor_primario"
          escrito={sensores?.length > 0 ? `Ver Sensores (${String(sensores.length).padStart(2, '0')})` : "Sem Sensores"}
          aparencia="secundario"
          pequeno={true}
          img={<IconBorderCorners stroke="2" width={28} height={28} />}
          onClick={sensores?.length > 0 ? mostrarSensores : undefined}
          desativado={!sensores || sensores.length === 0}
        />
      </div>
    </div>
  );
}
