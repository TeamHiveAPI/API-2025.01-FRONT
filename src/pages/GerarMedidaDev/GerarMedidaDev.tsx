import { useState, useEffect } from "react";
import api from "../../services/api";
import InputMelhor from "../../components/InputMelhor/InputMelhor";

import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";
import { IconPlus } from "@tabler/icons-react";
import "./styles.scss"
import PaginaWrapper from "../../components/PaginaWrapper/PaginaWrapper";

interface Medida {
  id: number;
  estacao_id: number;
  parametro_id: number;
  valor: number;
  data_hora: string;
}

interface Estacao {
  id: number;
  nome: string;
}

interface Parametro {
  id: number;
  nome: string;
}

export default function PaginaMedidasCRUD() {
  const [medidas, setMedidas] = useState<Medida[]>([]);
  const [estacoes, setEstacoes] = useState<Record<number, string>>({});
  const [parametros, setParametros] = useState<Record<number, string>>({});

  const [estacaoId, setEstacaoId] = useState("");
  const [parametroId, setParametroId] = useState("");
  const [valor, setValor] = useState("");
  const [dataHora, setDataHora] = useState("");

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

  useEffect(() => {
    fetchMedidas();
    fetchEstacoes();
    fetchParametros();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const novaMedida = {
      estacao_id: Number(estacaoId),
      parametro_id: Number(parametroId),
      valor: Number(valor),
      data_hora: dataHora,
    };

    try {
      await api.post("/medidas/", novaMedida);
      setEstacaoId("");
      setParametroId("");
      setValor("");
      setDataHora("");
      fetchMedidas();
    } catch (error) {
      console.error("Erro ao criar medida:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/medidas/${id}`);
      fetchMedidas();
    } catch (error) {
      console.error("Erro ao deletar medida:", error);
    }
  };

  return (
    <PaginaWrapper>
      <div className="medidas_cima">
        <h1>Medidas</h1>
        <p>DEV</p>
      </div>
        <form onSubmit={handleSubmit}>
          <div className="secao_input bottom">
            <InputMelhor
              label="ID Estação"
              tag="estacao_id"
              width={25}
              value={estacaoId}
              onChange={(e) => setEstacaoId(e.target.value)}
              type="number"
            />
            <InputMelhor
              label="ID Parâmetro"
              tag="parametro_id"
              width={25}
              value={parametroId}
              onChange={(e) => setParametroId(e.target.value)}
              type="number"
            />
            <InputMelhor
              label="Valor"
              tag="valor"
              width={25}
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              type="number"
            />
            <InputMelhor
              label="Data e Hora"
              tag="data_hora"
              width={25}
              value={dataHora}
              onChange={(e) => setDataHora(e.target.value)}
              placeholder="YYYY-MM-DDTHH:MM:SS"
              type="datetime-local"
            />
          </div>

          <div className="cima80">
            <BotaoCTA
              aparencia="primario"
              cor="cor_primario"
              escrito="Cadastrar Medida"
              img={<IconPlus stroke="2" />}
              type="submit"
            />
          </div>
        </form>

        <h4 className="num_cadastros">{medidas.length} medidas cadastradas</h4>

        <div className="tabela_container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Estação</th>
                <th>Parâmetro</th>
                <th>Valor</th>
                <th>Data/Hora</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {medidas.length > 0 ? (
                medidas.map((medida) => (
                  <tr className="tabela_container" key={medida.id}>
                    <td>{medida.id}</td>
                    <td>{estacoes[medida.estacao_id] || `ID ${medida.estacao_id}`}</td>
                    <td>{parametros[medida.parametro_id] || `ID ${medida.parametro_id}`}</td>
                    <td>{medida.valor}</td>
                    <td>{new Date(Number(medida.data_hora) * 1000).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(medida.id)}
                        className="botao_deletar"
                      >
                        Deletar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="card_nenhum">Nenhuma medida cadastrada.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </PaginaWrapper>
  );
}