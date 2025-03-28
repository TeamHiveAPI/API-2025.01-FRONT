import { useEffect, useState } from "react";
import "./styles.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import BarraCima from "../../components/BarraCima/BarraCima";
import CardEstacao from "../../components/CardEstacao/CardEstacao";

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
  status: "ativa" | "inativa";
}

export default function Estacoes() {
  const [estacoes, setEstacoes] = useState<Estacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEstacoes = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/estacoes/");
        if (!response.ok) {
          throw new Error("Falha ao buscar estações");
        }
        const data = await response.json();
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

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta estação?")) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/estacoes/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Falha ao excluir estação");
        setEstacoes(estacoes.filter((estacao) => estacao.id !== id));
      } catch (err) {
        console.error("Erro ao excluir estação:", err);
      }
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="pagina_wrapper">
      <Sidebar />
      <div>
        <div className="pagina_container">
          <BarraCima nome="Estações" tipo="estacao" />
          <h4 className="num_cadastros">{estacoes.length} estações cadastradas</h4>
          <div className="esta_lista">
            {estacoes.map((estacao) => (
              <CardEstacao
                key={estacao.id}
                id={estacao.id.toString()}
                titulo={estacao.nome}
                ativo={estacao.status === "ativa"}
                endereco={`${estacao.rua}, ${estacao.numero} - ${estacao.bairro}, ${estacao.cidade} - ${estacao.cep}`}
                latitude={estacao.latitude.toString()}
                longitude={estacao.longitude.toString()}
                sensores={[]}
                onDelete={() => handleDelete(estacao.id)}
              />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}