import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import BarraCima from "../../components/BarraCima/BarraCima";
import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";
import GraficoSensor from "../../components/GraficoSensor/GraficoSensor";
import { IconHexagonPlus, IconBroadcast, IconClock, IconBorderCorners, IconUsers } from "@tabler/icons-react";
import GraficoFiltros from "../../components/GraficoFiltros/GraficoFiltros";
import { JSX } from "react";
import "./styles.scss";
import GraficoHorasAlerta from "../../components/GraficoHoraAlerta/GraficoHoraAlerta";
import GraficoTiposAlerta from "../../components/GraficoTipoAlerta/GraficoTipoAlerta";

export default function Home() {
  const navigate = useNavigate();

  const [estacoes, setEstacoes] = useState<Record<string, string>>({});
  const [sensores, setSensores] = useState<Record<string, { nome: string; unidade: string }>>({});
  const [tipoParametros, setTipoParametros] = useState<Record<string, string>>({});
  const [filtros, setFiltros] = useState<{
    estacaoId: string | null;
    sensorId: string | null;
    dataInicio: Date | null;
    dataFim: Date | null;
    medida: "tudo" | "valor_minimo" | "valor_medio" | "valor_maximo" | "bruto";
  }>({
    estacaoId: null,
    sensorId: null,
    dataInicio: null,
    dataFim: null,
    medida: "tudo",
  });

  const [visualizacao, setVisualizacao] = useState<"pequeno" | "grande">("pequeno");
  const [dashboardData, setDashboardData] = useState<{
    numEstacoes: number;
    numSensores: number;
    numAlertas: number;
    numUsuarios: number;
  } | null>(null);
  const [medidas, setMedidas] = useState<any[]>([]);
  const [dadosAgregados, setDadosAgregados] = useState<any[]>([]);
  const [dadosAlerta, setDadosAlerta] = useState<Array<{
    estacao: string;
    horasAlerta: number;
    qtdAlertas: number;
  }>>([]);
  const [dadosTiposAlertas, setDadosTiposAlertas] = useState<{ tipo: string; quantidade: number }[]>([]);

  const handleVisualizacao = (tipo: "pequeno" | "grande") => {
    setVisualizacao(tipo);
  };

  // Função para buscar dados do dashboard
  const fetchDashboardData = async () => {
    try {
      const res = await fetch("http://localhost:8000/dashboard/contagem-entidades");
      const data = await res.json();
      setDashboardData(data);
    } catch (err) {
      console.error("Erro ao carregar dados do dashboard:", err);
    }
  };

  // Função para buscar estações
  const fetchEstacoes = async () => {
    try {
      const res = await fetch("http://localhost:8000/estacoes");
      const data = await res.json();
      const mapped = Object.fromEntries(data.map((e: any) => [e.id.toString(), e.nome]));
      setEstacoes(mapped);
    } catch (err) {
      console.error("Erro ao carregar estações:", err);
    }
  };

  // Função para buscar sensores
  const fetchSensores = async () => {
    try {
      const res = await fetch("http://localhost:8000/parametros");
      const data = await res.json();
      const mapped = Object.fromEntries(
        data.map((s: any) => [s.id.toString(), { nome: s.nome, unidade: s.unidade }])
      );
      setSensores(mapped);
    } catch (err) {
      console.error("Erro ao carregar sensores:", err);
    }
  };

  // Função para buscar tipos de parâmetros
  const fetchTipoParametros = async () => {
    try {
      const res = await fetch("http://localhost:8000/tipo_parametros");
      const data = await res.json();
      const mapped = Object.fromEntries(data.map((t: any) => [t.id.toString(), t.nome]));
      setTipoParametros(mapped);
    } catch (err) {
      console.error("Erro ao carregar tipos de parâmetros:", err);
    }
  };

  // Função para buscar medidas com base nos filtros
  const fetchMedidas = async () => {
    if (!filtros.estacaoId || !filtros.sensorId || !filtros.dataInicio || !filtros.dataFim) return;
  
    try {
      const res = await fetch("http://localhost:8000/medidas");
      const data = await res.json();
  
      const dataFimCorrigido = new Date(filtros.dataFim!);
      dataFimCorrigido.setHours(23, 59, 59, 999);
  
      const filteredData = data.filter((m: any) => {
        const dataHora = new Date(m.data_hora * 1000);
        return (
          m.estacao_id.toString() === filtros.estacaoId &&
          m.parametro_id.toString() === filtros.sensorId &&
          dataHora >= filtros.dataInicio! &&
          dataHora <= dataFimCorrigido
        );
      });
            
      setMedidas(filteredData);
  
      const aggregated = calcularValores(filteredData);
      setDadosAgregados(aggregated);
    } catch (err) {
      console.error("Erro ao carregar medidas:", err);
    }
  };
  

  // Função para buscar alertas e processar para gráficos e último alerta
  const fetchAlertas = async () => {
    try {
      // Buscar dados de horas em alerta por estação
      const resHorasAlerta = await fetch("http://localhost:8000/tempo-em-alerta-por-estacao");
      const dadosHorasAlerta = await resHorasAlerta.json();
  
      // Formatar dados para o gráfico de horas em alerta
      const dadosFormatados = dadosHorasAlerta.map((item: any) => ({
        estacao: item.estacao,
        horasAlerta: Number(item.horasAlerta.toFixed(2)),
        qtdAlertas: item.qtdAlertas
      }));
      setDadosAlerta(dadosFormatados);
  
      // Buscar todos os alertas para processamento adicional
      const resAlertas = await fetch("http://localhost:8000/alertas");
      const data = await resAlertas.json();
   
      // Adicionar console.log para debug
      console.log('Tipos de Parâmetros:', tipoParametros);
      console.log('Alertas:', data);
  
      // Processar dados para o gráfico de tipos de alerta
      const contagemPorTipo = data.reduce((acc: Record<string, number>, alerta: any) => {
        // Buscar o tipo do parâmetro diretamente do alerta
        const tipoNome = sensores[alerta.parametro_id]?.nome || "Outros";
        acc[tipoNome] = (acc[tipoNome] || 0) + 1;
        return acc;
      }, {});
  
      console.log('Contagem por Tipo:', contagemPorTipo);
  
      const dadosTipos = Object.entries(contagemPorTipo)
        .map(([tipo, quantidade]) => ({
          tipo,
          quantidade: Number(quantidade)
        }))
        .filter(item => item.tipo !== "Desconhecido" && item.tipo !== "undefined");
  
      setDadosTiposAlertas(dadosTipos);
  
    } catch (err) {
      console.error("Erro ao carregar alertas:", err);
    }
  };

  // Função para calcular valores agregados
  const calcularValores = (dados: { data_hora: number; valor: number }[]) => {
    const agrupados = dados.reduce((acc, curr) => {
      const dataHora = new Date(curr.data_hora * 1000); // Converter timestamp para Date
      const dia = dataHora.toISOString().split("T")[0];
      if (!acc[dia]) acc[dia] = [];
      acc[dia].push(curr.valor);
      return acc;
    }, {} as Record<string, number[]>);

    const dadosAgregados = Object.keys(agrupados).map((dia) => {
      const valores = agrupados[dia];
      const valorMinimo = Math.min(...valores);
      const valorMaximo = Math.max(...valores);
      const valorMedio = valores.reduce((a, b) => a + b, 0) / valores.length;

      return {
        data: dia,
        valor_minimo: parseFloat(valorMinimo.toFixed(1)),
        valor_medio: parseFloat(valorMedio.toFixed(1)),
        valor_maximo: parseFloat(valorMaximo.toFixed(1)),
      };
    });

    return dadosAgregados;
  };

  const [miniAlerta, setMiniAlerta] = useState<{
    titulo: string;
    horario: string;
    estacao: string;
    alertaAtivo: boolean;
  } | null>(null);

  // Fetch apenas para o mini card (alerta de maior ID)
  const fetchMiniAlerta = async () => {
    try {
      const res = await fetch("http://localhost:8000/alertas");
      const data = await res.json();
      if (data.length > 0) {
        // Ordena por ID decrescente e pega o primeiro
        const ultimo = data.sort((a: any, b: any) => b.id - a.id)[0];
        setMiniAlerta({
          titulo: ultimo.titulo,
          horario: new Date(ultimo.data_hora).toLocaleString(),
          estacao: ultimo.estacao,
          alertaAtivo: ultimo.tempoFim === null,
        });
      }
    } catch (err) {
      console.error("Erro ao buscar mini alerta:", err);
    }
  };

  // Carregar dados iniciais
  useEffect(() => {
    fetchDashboardData();
    fetchEstacoes();
    fetchSensores();
    fetchTipoParametros();
    fetchAlertas();
    fetchMiniAlerta();
  }, []);

  // Atualizar medidas e alertas quando filtros ou estações/tipos mudarem
  useEffect(() => {
    fetchMedidas();
    fetchAlertas();
  }, [filtros, estacoes, tipoParametros]);

  // Dados para GraficoSensor
  const dadosTeste = {
    estacao: {
      id: Number(filtros.estacaoId),
      nome: filtros.estacaoId ? estacoes[filtros.estacaoId] : "Estação",
    },
    sensor: {
      id: Number(filtros.sensorId),
      nome: filtros.sensorId ? sensores[filtros.sensorId]?.nome : "Sensor",
      unidade: filtros.sensorId ? sensores[filtros.sensorId]?.unidade : "°C",
    },
    periodo: {
      inicio: filtros.dataInicio ? filtros.dataInicio.toISOString().split("T")[0] : "",
      fim: filtros.dataFim ? filtros.dataFim.toISOString().split("T")[0] : "",
    },
    dados: dadosAgregados,
    dadosBrutos: medidas.map((m) => ({
      data: new Date(m.data_hora * 1000).toISOString(),
      valor_bruto: m.valor,
    })),
  };

  const todosFiltrosPreenchidos = filtros.estacaoId && filtros.sensorId && filtros.dataInicio && filtros.dataFim;
  const dataInvalida = filtros.dataInicio && filtros.dataFim && filtros.dataInicio > filtros.dataFim;

  const MiniCardAlerta = ({
    titulo,
    horario,
    estacao,
    alertaAtivo,
  }: {
    titulo: string;
    horario: string;
    estacao: string;
    alertaAtivo: boolean;
  }) => (
    <div className="caes_wrapper caal mini">
      <div className="caal_esq">
        <div>
          <div className="caal_cima sem_margem">
            <div className="caal_info_esq">
              <div className={alertaAtivo ? "caal_ativo" : "caal_inativo"}></div>
              <h5 className="caal_titulo mini">{titulo}</h5>
              <div className="caal_tempo">
                <IconClock width={16} stroke={1.5} color="#808080" />
                <p>{horario}</p>
              </div>
            </div>
            <div className="caal_info mini">
              <IconBroadcast width={24} stroke={1.5} color="#808080" />
              <p className="caal_estacao_mini">{estacao}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const DashboardCard = ({
    icon,
    titulo,
    valor,
  }: {
    icon: JSX.Element;
    titulo: string;
    valor: number | string;
  }) => (
    <div className="dashboard_card">
      <div className="dashboard_card_cima">
        {icon}
        <p>{titulo}</p>
      </div>
      <p className="dashboard_numero">{valor.toString().padStart(2, "0")}</p>
    </div>
  );

  // Cards dinâmicos
  const dashboardCards = dashboardData
    ? [
        {
          icon: <IconBroadcast width={32} height={32} stroke="1.5" color="#606060" />,
          titulo: "Estações",
          valor: dashboardData.numEstacoes,
        },
        {
          icon: <IconBorderCorners width={32} height={32} stroke="1.5" color="#606060" />,
          titulo: "Sensores",
          valor: dashboardData.numSensores,
        },
        {
          icon: <IconHexagonPlus width={32} height={32} stroke="1.5" color="#606060" />,
          titulo: "Alertas",
          valor: dashboardData.numAlertas,
        },
        {
          icon: <IconUsers width={32} height={32} stroke="1.5" color="#606060" />,
          titulo: "Usuários",
          valor: dashboardData.numUsuarios,
        },
      ]
    : [];

  return (
    <div className="pagina_wrapper">
      <Sidebar />
      <div>
        <div className="pagina_container home">
          <BarraCima nome="Dashboard" tipo="home" />

          <div className="home_cima_titulo">
            <h2>Alerta mais recente</h2>
          </div>

          <div className="home_cima">
            {miniAlerta ? (
              <MiniCardAlerta
                titulo={miniAlerta.titulo}
                horario={miniAlerta.horario}
                estacao={miniAlerta.estacao}
                alertaAtivo={miniAlerta.alertaAtivo}
              />
            ) : (
              <p className="home_alerta_nenhum">Nenhum alerta disponível</p>
            )}

            <BotaoCTA
              aparencia="primario"
              cor="cor_primario"
              escrito="Ver Tudo"
              img={<IconHexagonPlus stroke="1.5" />}
              type="submit"
              onClick={() => navigate("/historico-alerta")}
            />
          </div>

          <div className="dashboard_cima">
            {dashboardCards.map((card, index) => (
              <DashboardCard
                key={index}
                icon={card.icon}
                titulo={card.titulo}
                valor={card.valor}
              />
            ))}
          </div>

          <div className="dashboard_grafico">
            <div className="dashboard_grafico_cima filtros">
              <div className="dashboard_filtros_cima">
                <p className="dashboard_filtros_titulo">Filtros</p>
                <div className="dashboard_filtros_dir">
                  <p>VISUALIZAÇÃO</p>
                  <div className="dashboard_filtros_icones">
                    <img
                      src="./visu_pequeno.svg"
                      onClick={() => handleVisualizacao("pequeno")}
                      className={visualizacao === "grande" ? "visu_desativado" : ""}
                      style={{ cursor: "pointer" }}
                    />
                    <img
                      src="./visu_grande.svg"
                      onClick={() => handleVisualizacao("grande")}
                      className={visualizacao === "pequeno" ? "visu_desativado" : ""}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
              </div>
              <GraficoFiltros
                estacoes={estacoes}
                sensores={sensores}
                onFiltroChange={setFiltros}
              />
            </div>

            <div className={`dashboard_grafico_baixo ${visualizacao === "grande" ? "visu_grande" : "visu_pequeno"}`}>
              <div className={`dashboard_grafico_unidade ${visualizacao === "grande" ? "visu_grande" : ""}`}>
                {todosFiltrosPreenchidos && (
                  dataInvalida ? (
                    <p className="erro_datas">A data de início não pode ser depois da data de fim. Corrija para gerar o gráfico!</p>
                  ) : (
                    <GraficoSensor
                      estacao={dadosTeste.estacao}
                      sensor={dadosTeste.sensor}
                      periodo={dadosTeste.periodo}
                      dados={dadosTeste.dados}
                      dadosBrutos={dadosTeste.dadosBrutos}
                      medidaSelecionada={filtros.medida}
                    />
                  )
                )}
              </div>
              <div className={`dashboard_grafico_unidade ${visualizacao === "grande" ? "visu_grande" : ""}`}>
                {todosFiltrosPreenchidos && (
                  dataInvalida ? (
                    <p className="erro_datas">A data de início não pode ser depois da data de fim. Corrija para gerar o gráfico!</p>
                  ) : (
                    <GraficoSensor
                      estacao={dadosTeste.estacao}
                      sensor={dadosTeste.sensor}
                      periodo={dadosTeste.periodo}
                      dados={dadosTeste.dados}
                      dadosBrutos={dadosTeste.dadosBrutos}
                      medidaSelecionada={filtros.medida}
                      bruto={true}
                    />
                  )
                )}
              </div>
            </div>

            <div className={`dashboard_grafico_baixo ${visualizacao === "grande" ? "visu_grande" : "visu_pequeno"}`}>
            <div className={`dashboard_grafico_unidade grande_temp ${visualizacao === "grande" ? "visu_grande" : ""}`}>
              <GraficoHorasAlerta dados={dadosAlerta} />
            </div>

              <div className={`dashboard_grafico_unidade escondido_temp ${visualizacao === "grande" ? "visu_grande" : ""}`}>
                <GraficoTiposAlerta dados={dadosTiposAlertas} />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}