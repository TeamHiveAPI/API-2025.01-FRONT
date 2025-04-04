import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import BarraCima from "../../components/BarraCima/BarraCima";
import CardSensor from "../../components/CardSensor/CardSensor";
import CardTipoSensor from "../../components/CardTipoSensor/CardTipoSensor";

interface Sensor {
  id: string;
  nome: string;
  unidade: string;
  titulo: string;
  unidOuSensor: string;
  estacao: string;
  estacao_id: string;
  descricao: string;
  quantidade_casas_decimais: number;
  fator_conversao: number;
  offset: number;
  tipo_parametro_id: number;
}

interface TipoSensor {
  id: number;
  nome: string;
  descricao: string;
}

export default function Sensores() {
  const [sensores, setSensores] = useState<Sensor[]>([]);
  const [tipos, setTipos] = useState<TipoSensor[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/parametros")
      .then((response) => {
        if (!response.ok) throw new Error("Erro ao carregar sensores");
        return response.json();
      })
      .then((data: Sensor[]) => {
        const ordenados = data.sort((a, b) => Number(a.id) - Number(b.id));
        setSensores(ordenados);
      })
      .catch((err) => console.error(err));
  }, []);
  
  useEffect(() => {
    fetch("http://localhost:8000/tipo_parametros")
      .then((response) => {
        if (!response.ok) throw new Error("Erro ao carregar tipos de sensores");
        return response.json();
      })
      .then((data: TipoSensor[]) => {
        const ordenados = data.sort((a, b) => a.id - b.id);
        setTipos(ordenados);
      })
      .catch((err) => console.error(err));
  }, []);
  

  return (
    <div className="pagina_wrapper">
      <Sidebar />
      <div>
        <div className="pagina_container">
          <BarraCima nome="Sensores" tipo="sensor" />
          <h4 className="num_cadastros">{sensores.length} sensores cadastrados</h4>

          <div className="lista_espaços_3">
            {sensores.length > 0 ? (
              sensores.map((sensor) => (
                <CardSensor
                  key={sensor.id}
                  id={sensor.id.toString()}
                  titulo={sensor.nome}
                  unidOuSensor={sensor.unidade}
                  estacao={"Sem Estação"}
                  estacao_id={""}
                  descricao={sensor.descricao}
                  quantidade_casas_decimais={sensor.quantidade_casas_decimais}
                  fator_conversao={sensor.fator_conversao}
                  offset={sensor.offset}
                  tipo_parametro_id={sensor.tipo_parametro_id}
                />
              ))
            ) : (
              <p className="card_nenhum">Nenhum sensor cadastrado.</p>
            )}
          </div>

          <h4 className="num_cadastros menor">{tipos.length} Tipos de Sensores cadastrados</h4>
          <div className="lista_espaços_3">
            {tipos.length > 0 ? (
              tipos.map((tipo) => (
                <CardTipoSensor
                  key={tipo.id}
                  id={tipo.id.toString()}
                  nome={tipo.nome}
                  descricao={tipo.descricao}
                />
              ))
            ) : (
              <p className="card_nenhum">Nenhum tipo de sensor cadastrado.</p>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}