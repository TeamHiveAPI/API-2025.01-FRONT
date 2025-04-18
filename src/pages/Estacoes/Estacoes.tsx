import { useEffect, useState } from "react";
import "./styles.scss";

import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import BarraCima from "../../components/BarraCima/BarraCima";
import CardEstacao from "../../components/CardEstacao/CardEstacao";
import MapaEstacoes from "../../components/MapaEstacoes/MapaEstacoes";

interface Sensor {
  id: number;
  nome: string;
  unidade: string;
}

interface Estacao {
  id: number;
  nome: string;
  cep: string;
  rua: string;
  bairro: string;
  cidade: string;
  numero: string;
  latitude: number;
  longitude: number;
  data_instalacao: string;
  sensores: Sensor[];
  status: "ativa" | "inativa";
}

export default function Estacoes() {
  const [estacoes, setEstacoes] = useState<Estacao[]>([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEstacoes = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/estacoes/");
        if (!response.ok) {
          throw new Error("Falha ao buscar estações");
        }
        const data = await response.json();
    
        data.sort((a: Estacao, b: Estacao) => a.id - b.id);
    
        setEstacoes(data);
      } catch (err) {
        setError("Erro ao carregar estações");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEstacoes();
  }, []);

  return (
    <div className="pagina_wrapper">
      <Sidebar />
      <div>
        <div className="pagina_container">
          <BarraCima nome="Estações" tipo="estacao" />
          <MapaEstacoes estacoes={estacoes} />
          <h4 className="num_cadastros">{estacoes.length} estações cadastradas</h4>
          <div className="esta_lista">
            {estacoes.length > 0 ? (
              estacoes.map((estacao) => (
                <CardEstacao
                  key={estacao.id}
                  id={estacao.id.toString()}
                  titulo={estacao.nome}
                  ativo={estacao.status === "ativa"}
                  endereco={`${estacao.rua}, ${estacao.numero} - ${estacao.bairro}, ${estacao.cidade} - ${estacao.cep}`}
                  latitude={estacao.latitude.toString()}
                  longitude={estacao.longitude.toString()}
                  sensores={estacao.sensores}
                />
              ))
            ) : (
              <p className="card_nenhum">Nenhuma estação cadastrada.</p>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}