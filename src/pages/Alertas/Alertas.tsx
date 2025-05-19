import { useEffect, useState } from "react";
import "./styles.scss";
import api from "../../services/api";

import BarraCima from "../../components/BarraCima/BarraCima";
import CardAlerta from "../../components/CardAlerta/CardAlerta";
import InputPesquisa from "../../components/InputPesquisa/InputPesquisa";
import { useDebounce } from "../../hooks/useDebounce";
import PaginaWrapper from "../../components/PaginaWrapper/PaginaWrapper";

export default function Alertas() {
  const [alertas, setAlertas] = useState<any[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearchText = useDebounce(searchText, 250);

  const alertasFiltrados = alertas.filter((alerta) => {
    const titulo = `${alerta.sensor} ${alerta.condicao === "maior_igual" ? "maior ou igual a" : "menor que"} ${alerta.num_condicao}${alerta.unidade}`;
    return (
      titulo.toLowerCase().includes(debouncedSearchText.toLowerCase()) ||
      alerta.mensagem.toLowerCase().includes(debouncedSearchText.toLowerCase())
    );
  });

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const [alertasRes, estacoesRes, sensoresRes] = await Promise.all([
          api.get("/alertas-definidos"),
          api.get("/estacoes"),
          api.get("/parametros"),
        ]);

        const alertasData = alertasRes.data;
        const estacoesData = estacoesRes.data;
        const sensoresData = sensoresRes.data;

        const estacoesMap: Record<number, string> = {};
        estacoesData.forEach((e: any) => {
          estacoesMap[e.id] = e.nome;
        });

        const sensoresMap: Record<number, { nome: string; unidade: string }> = {};
        sensoresData.forEach((s: any) => {
          sensoresMap[s.id] = { nome: s.nome, unidade: s.unidade };
        });

        const alertasCompletos = alertasData.map((alerta: any) => {
          const sensor = sensoresMap[alerta.parametro_id];
          const estacao = estacoesMap[alerta.estacao_id];

          return {
            id: alerta.id.toString(),
            estacao,
            estacao_id: alerta.estacao_id,
            sensor: sensor?.nome || "Desconhecido",
            sensor_id: alerta.parametro_id,
            unidade: sensor?.unidade || "",
            condicao: alerta.condicao,
            num_condicao: alerta.num_condicao,
            mensagem: alerta.mensagem,
          };
        });

        setAlertas(alertasCompletos);
      } catch (err) {
        console.error("Erro ao carregar alertas:", err);
      }
    };

    fetchDados();
  }, []);

  return (
    <PaginaWrapper>
      <BarraCima nome="Alertas" tipo="alerta" />
  
      <h4 className="num_cadastros">{alertas.length} alertas cadastrados</h4>
  
      <InputPesquisa value={searchText} onChange={setSearchText}/>
  
      <div className="lista_espaços_3">
        {alertasFiltrados.length > 0 ? (
          alertasFiltrados.map((alerta) => (
            <CardAlerta
              key={alerta.id}
              id={alerta.id}
              titulo={`${alerta.sensor} ${
                alerta.condicao === "maior_igual" ? "maior ou igual a" : "menor que"
              } ${alerta.num_condicao}${alerta.unidade}`}
              mensagem={alerta.mensagem}
              sensor={alerta.sensor}
              sensor_id={alerta.sensor_id}
              estacao={alerta.estacao}
              estacao_id={alerta.estacao_id}
              condicao={alerta.condicao}
              num_condicao={alerta.num_condicao}
            />
          ))
        ) : (
          <p className="card_nenhum">Nenhum alerta encontrado.</p>
        )}
      </div>
    </PaginaWrapper>
  );
}