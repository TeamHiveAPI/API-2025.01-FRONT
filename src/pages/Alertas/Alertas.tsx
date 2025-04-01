import { useEffect, useState } from "react";
import "./styles.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import BarraCima from "../../components/BarraCima/BarraCima";
import CardAlerta from "../../components/CardAlerta/CardAlerta";

export default function Alertas() {
  const [alertas, setAlertas] = useState<any[]>([]);
  const [, setEstacoes] = useState<Record<number, string>>({});
  const [, setSensores] = useState<Record<number, { nome: string; unidade: string }>>({});

  // Buscar dados
  useEffect(() => {
    const fetchDados = async () => {
      try {
        const [alertasRes, estacoesRes, sensoresRes] = await Promise.all([
          fetch("http://localhost:8000/alertas-definidos"),
          fetch("http://localhost:8000/estacoes"),
          fetch("http://localhost:8000/parametros"),
        ]);

        const [alertasData, estacoesData, sensoresData] = await Promise.all([
          alertasRes.json(),
          estacoesRes.json(),
          sensoresRes.json(),
        ]);

        // Mapear para acesso rápido
        const estacoesMap: Record<number, string> = {};
        estacoesData.forEach((e: any) => {
          estacoesMap[e.id] = e.nome;
        });

        const sensoresMap: Record<number, { nome: string; unidade: string }> = {};
        sensoresData.forEach((s: any) => {
          sensoresMap[s.id] = { nome: s.nome, unidade: s.unidade };
        });

        // Enriquecer dados dos alertas
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

        setEstacoes(estacoesMap);
        setSensores(sensoresMap);
        setAlertas(alertasCompletos);
      } catch (err) {
        console.error("Erro ao carregar alertas:", err);
      }
    };

    fetchDados();
  }, []);

  return (
    <div className="pagina_wrapper">
      <Sidebar />
      <div>
        <div className="pagina_container">
          <BarraCima nome="Alertas" tipo="alerta" />

          <h4 className="num_cadastros">{alertas.length} alertas cadastrados</h4>

          <div className="lista_espaços_3">
            {alertas.length > 0 ? (
              alertas.map((alerta) => (
                <CardAlerta
                  key={alerta.id}
                  id={alerta.id}
                  titulo={`${alerta.sensor} ${alerta.condicao === "maior_igual" ? "maior ou igual a" : "menor que"} ${alerta.num_condicao}${alerta.unidade}`}
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
              <p className="card_nenhum">Nenhum alerta cadastrado.</p>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}