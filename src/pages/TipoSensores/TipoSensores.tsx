import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import BarraCima from "../../components/BarraCima/BarraCima";
import CardTipoSensor from "../../components/CardSensor/CardSensor";
import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";
import { IconPlus } from "@tabler/icons-react";

interface TipoSensor {
  id: number;
  nome: string;
  descricao: string;
}

export default function TipoSensores() {
  const [tipos, setTipos] = useState<TipoSensor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/tipo_parametros")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao carregar os tipos de sensores");
        }
        return response.json();
      })
      .then((data: TipoSensor[]) => {
        setTipos(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Erro desconhecido");
        setLoading(false);
      });
  }, []);

  const handleAdicionarClick = () => {
    navigate("/tipo-sensor");
  };

  if (loading) {
    return (
      <div className="pagina_wrapper">
        <Sidebar />
        <div className="pagina_container">
          <BarraCima nome="Tipos de Sensores" tipo="sensor" />
          <p>Carregando tipos de sensores...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="pagina_wrapper">
        <Sidebar />
        <div className="pagina_container">
          <BarraCima nome="Tipos de Sensores" tipo="sensor" />
          <p>{error}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="pagina_wrapper">
      <Sidebar />
      <div className="pagina_container">
        <BarraCima nome="Tipos de Sensores" tipo="sensor" />
        
        <div className="acoes">
          <BotaoCTA
            aparencia="primario"
            cor="cor_primario"
            escrito="Adicionar Tipo Sensor"
            img={<IconPlus stroke="2" />}
            onClick={handleAdicionarClick}
          />
        </div>
        
        <h4 className="num_cadastros">{tipos.length} tipos cadastrados</h4>
        <div className="tipo_sensor_lista">
          {tipos.map((tipo) => (
            <CardTipoSensor
              key={tipo.id}
              id={tipo.id.toString()}
              nome={tipo.nome}
              descricao={tipo.descricao}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}