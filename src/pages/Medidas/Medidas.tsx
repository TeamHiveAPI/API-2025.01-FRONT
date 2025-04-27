import { useEffect, useState } from "react";
import api from "../../services/api";
import "./styles.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";

interface Medida {
  estacao_id: number;
  parametro_id: number;
  valor: number;
  data_hora: string;
  id: number;
}

interface Estacao {
  id: number;
  nome: string;
}

interface Parametro {
  id: number;
  nome: string;
}

export default function Medidas() {
  const [medidas, setMedidas] = useState<Medida[]>([]);
  const [estacoes, setEstacoes] = useState<Record<number, string>>({});
  const [parametros, setParametros] = useState<Record<number, string>>({});

  useEffect(() => {
    const fetchMedidas = async () => {
      try {
        const response = await api.get("/medidas/");
        setMedidas(response.data);
      } catch (error) {
        console.error("Erro ao buscar medidas:", error);
      }
    };

    const fetchEstacoes = async () => {
      try {
        const response = await api.get("/estacoes");
        const estacoesMap = response.data.reduce((acc: Record<number, string>, estacao: Estacao) => {
          acc[estacao.id] = estacao.nome;
          return acc;
        }, {});
        setEstacoes(estacoesMap);
      } catch (error) {
        console.error("Erro ao buscar estações:", error);
      }
    };

    const fetchParametros = async () => {
      try {
        const response = await api.get("/parametros");
        const parametrosMap = response.data.reduce((acc: Record<number, string>, parametro: Parametro) => {
          acc[parametro.id] = parametro.nome;
          return acc;
        }, {});
        setParametros(parametrosMap);
      } catch (error) {
        console.error("Erro ao buscar parâmetros:", error);
      }
    };

    fetchMedidas();
    fetchEstacoes();
    fetchParametros();
  }, []);

  return (
    <div className="pagina_wrapper">
      <Sidebar />
      <div>
        <div className="pagina_container">
          <h1>Medidas</h1>
          <div className="tabela_container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Estação</th>
                  <th>Parâmetro</th>
                  <th>Valor</th>
                  <th>Data/Hora</th>
                </tr>
              </thead>
              <tbody>
                {medidas.map((medida) => (
                  <tr key={medida.id}>
                    <td>{medida.id}</td>
                    <td>{estacoes[medida.estacao_id] || `ID ${medida.estacao_id}`}</td>
                    <td>{parametros[medida.parametro_id] || `ID ${medida.parametro_id}`}</td>
                    <td>{medida.valor}</td>
                    <td>{new Date(medida.data_hora).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}