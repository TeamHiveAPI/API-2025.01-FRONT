import { useNavigate } from "react-router-dom";
import "animate.css";
import "./styles.scss";
import { IconCircle, IconPencil, IconBorderCorners } from "@tabler/icons-react";
import Swal from "sweetalert2";
import BotaoCTA from "../BotaoCTA/BotaoCTA";

interface CardAlertaProps {
  id: string;
  estacao_id: string;
  sensor_id: string;
  condicao: string;
  mensagem: string;
  data: string;
  hora: string;
  status: string;
}

export default function CardAlerta({
  id,
  estacao_id,
  sensor_id,
  condicao,
  mensagem,
  data,
  hora,
  status,
}: CardAlertaProps) {
  const navigate = useNavigate();

  const mostrarDetalhes = () => {
    Swal.fire({
      showClass: {
        popup: "animate__animated animate__fadeInUp swal_rapido", // Efeito de entrada
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutDown swal_rapido", // Efeito de saída
      },
      html: `
        <div style="text-align: center;">
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#5751D5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-hexagon-plus">
            <path d="M19.875 6.27c.7 .398 1.13 1.143 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z"></path>
            <path d="M9 12h6"></path>
            <path d="M12 9v6"></path>
          </svg>
          <p><strong>ID:</strong> ${id}</p>
          <p><strong>Estação ID:</strong> ${estacao_id}</p>
          <p><strong>Sensor ID:</strong> ${sensor_id}</p>
          <p><strong>Condição:</strong> ${condicao}</p>
          <p><strong>Mensagem:</strong> ${mensagem}</p>
          <p><strong>Data:</strong> ${data}</p>
          <p><strong>Hora:</strong> ${hora}</p>
          <p><strong>Status:</strong> ${status}</p>
        </div>
      `,
      confirmButtonText: "Fechar",
      confirmButtonColor: "#5751D5",
      customClass: {
        title: "swal_titulo",
      },
    });
  };

  const handleEditar = () => {
    const dadosAlerta = {
      estacao_id,
      sensor_id,
      condicao,
      mensagem,
      data,
      hora,
      status,
    };
  
    navigate(`/alertas/editar/${id}`, { state: dadosAlerta });
  };

  return (
    <div className="caal_wrapper">
      <div>
        <div className="caal_cima">
          <div className="caal_cima_esq">
            <div className="caal_badge">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-hexagon-plus">
                <path d="M19.875 6.27c.7 .398 1.13 1.143 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z"></path>
                <path d="M9 12h6"></path>
                <path d="M12 9v6"></path>
              </svg>
              <p>{id}</p>
            </div>
            <h4>{condicao}</h4>
          </div>
          <div className="caal_cima_dir">
            <div className="caal_status">
              <IconCircle fill={status === "ativo" ? "#13811E" : "#808080"} stroke="0" width={16} height={16} />
              <p className={status === "ativo" ? "" : "cinza"}>{status === "ativo" ? "Ativo" : "Resolvido"}</p>    
            </div>
            <BotaoCTA
              cor="cor_primario"
              aparencia="secundario"
              img={<IconPencil stroke="1.5" width={28} height={28} onClick={handleEditar} />}
            />
          </div>
        </div>
        <div className="caal_mensagem">
          <p className="caal_mensagem_titulo">MENSAGEM</p>
          <p className="caal_mensagem_texto">{mensagem}</p>
        </div>
      </div>
      <div className="caal_baixo">
        <div className="caal_info_wrapper">
          <div className="caal_info">
            <p className="caal_info_titulo">SENSOR</p>
            <p className="caal_info_texto">{sensor_id}</p>
          </div>
          <div className="caal_info">
            <p className="caal_info_titulo">ESTAÇÃO</p>
            <p className="caal_info_texto">{estacao_id}</p>
          </div>
        </div>
    
      </div>
    </div>
  );
}