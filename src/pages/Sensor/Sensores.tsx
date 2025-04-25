import { useEffect, useState } from "react";
import api from "../../services/api";

import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import BarraCima from "../../components/BarraCima/BarraCima";
import CardSensor from "../../components/CardSensor/CardSensor";
import CardTipoSensor from "../../components/CardTipoSensor/CardTipoSensor";
import InputPesquisa from "../../components/InputPesquisa/InputPesquisa";
import { useDebounce } from "../../hooks/useDebounce";

interface Sensor {
  id: string;
  nome: string;
  unidade: string;
  titulo: string;
  unidOuSensor: string;
  estacao: string;
  estacao_id: string;
  estacao_nome: string;
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

  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearchText = useDebounce(searchText, 250);

  const sensoresFiltrados = sensores.filter((sensor) =>
    sensor.nome.toLowerCase().includes(debouncedSearchText.toLowerCase())
  );

  useEffect(() => {
    const fetchSensores = async () => {
      try {
        const response = await api.get("/parametros");
        const data: Sensor[] = response.data;
        const ordenados = data.sort((a, b) => Number(a.id) - Number(b.id));
        setSensores(ordenados);
      } catch (err) {
        console.error("Erro ao carregar sensores:", err);
      }
    };
  
    fetchSensores();
  }, []);
  
  useEffect(() => {
    const fetchTipos = async () => {
      try {
        const response = await api.get("/tipo_parametros");
        const data: TipoSensor[] = response.data;
        const ordenados = data.sort((a, b) => a.id - b.id);
        setTipos(ordenados);
      } catch (err) {
        console.error("Erro ao carregar tipos de sensores:", err);
      }
    };
  
    fetchTipos();
  }, []);  
  
  return (
    <div className="pagina_wrapper">
      <Sidebar />
      <div>
        <div className="pagina_container">
          <BarraCima nome="Sensores" tipo="sensor" />
          <h4 className="num_cadastros">{sensores.length} sensores cadastrados</h4>

          <InputPesquisa value={searchText} onChange={setSearchText} />

          <div className="lista_espaços_3">
            {sensoresFiltrados.length > 0 ? (
              sensoresFiltrados.map((sensor) => (
                <CardSensor
                  key={sensor.id}
                  id={sensor.id.toString()}
                  titulo={sensor.nome}
                  unidOuSensor={sensor.unidade}
                  estacao={sensor.estacao_nome ? sensor.estacao_nome : "Sem Estação"}
                  estacao_id={""}
                  descricao={sensor.descricao}
                  quantidade_casas_decimais={sensor.quantidade_casas_decimais}
                  fator_conversao={sensor.fator_conversao}
                  offset={sensor.offset}
                  tipo_parametro_id={sensor.tipo_parametro_id}
                />
              ))
            ) : (
              <p className="card_nenhum">Nenhum sensor encontrado.</p>
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