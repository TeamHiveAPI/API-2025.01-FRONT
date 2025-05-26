import { useEffect, useState } from "react";
import "./styles.scss";
import api from "../../services/api";

import BarraCima from "../../components/BarraCima/BarraCima";
import CardEstacao from "../../components/CardEstacao/CardEstacao";
import MapaEstacoes from "../../components/MapaEstacoes/MapaEstacoes";
import InputPesquisa from "../../components/InputPesquisa/InputPesquisa";
import { useDebounce } from "../../hooks/useDebounce";
import PaginaWrapper from "../../components/PaginaWrapper/PaginaWrapper";

interface Sensor {
  id: number;
  nome: string;
  unidade: string;
}

interface Estacao {
  id: number;
  uid: string;
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

  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearchText = useDebounce(searchText, 250);

  const estacoesFiltradas = estacoes.filter((estacao) =>
    estacao.nome.toLowerCase().includes(debouncedSearchText.toLowerCase())
  );
  

  useEffect(() => {
    const fetchEstacoes = async () => {
      try {
        const response = await api.get("/estacoes/");
        const data = response.data;
  
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
    <PaginaWrapper>
      <BarraCima nome="Estações" tipo="estacao" />
      <MapaEstacoes estacoes={estacoes} />
      <h4 className="num_cadastros">{estacoes.length} estações cadastradas</h4>
  
      <InputPesquisa value={searchText} onChange={setSearchText} />
  
      <div className="esta_lista">
        {estacoesFiltradas.length > 0 ? (
          estacoesFiltradas.map((estacao) => (
            <CardEstacao
              key={estacao.id}
              id={estacao.id.toString()}
              uid={estacao.uid}
              titulo={estacao.nome}
              ativo={estacao.status === "ativa"}
              endereco={`${estacao.rua}, ${estacao.numero} - ${estacao.bairro}, ${estacao.cidade} - ${estacao.cep}`}
              latitude={estacao.latitude.toString()}
              longitude={estacao.longitude.toString()}
              sensores={estacao.sensores}
            />
          ))
        ) : (
          <p className="card_nenhum">Nenhuma estação encontrada.</p>
        )}
      </div>
    </PaginaWrapper>
  );
}