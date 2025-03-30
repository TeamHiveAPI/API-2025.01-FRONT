import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import BarraCima from "../../components/BarraCima/BarraCima";
import CardSensor from "../../components/CardSensor/CardSensor";

interface Sensor {
  id: number;
  nome: string;
  unidade: string;
  // Caso o backend retorne outros campos, adicione-os aqui, por exemplo:
  // estacao?: string;
  // tipo_parametro_id?: number;
}

export default function Sensores() {
  const [sensores, setSensores] = useState<Sensor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/parametros")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao carregar sensores");
        }
        return response.json();
      })
      .then((data: Sensor[]) => {
        setSensores(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Erro desconhecido");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="pagina_wrapper">
        <Sidebar />
        <div className="pagina_container">
          <BarraCima nome="Sensores" tipo="sensor" />
          <p>Carregando sensores...</p>
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
          <BarraCima nome="Sensores" tipo="sensor" />
          <p>{error}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="pagina_wrapper">
      <Sidebar />
      <div>
        <div className="pagina_container">
          <BarraCima nome="Sensores" tipo="sensor" />
          <h4 className="num_cadastros">{sensores.length} sensores cadastrados</h4>
          <div className="sensor_lista">
            {sensores.map((sensor) => (
              <CardSensor
                key={sensor.id}
                id={sensor.id.toString()}
                titulo={sensor.nome}
                unidOuSensor={sensor.unidade}
                // Caso a resposta da API contenha informações sobre estação,
                // você pode utilizar: estacao={sensor.estacao}
                estacao={"Sem estação"}
                // Se existir um campo para identificar o tipo ou estação, ajuste conforme necessário:
                estacao_id={""}
              />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
