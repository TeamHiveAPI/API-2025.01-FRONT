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
import "./styles.scss"
import GraficoHorasAlerta from "../../components/GraficoHoraAlerta/GraficoHoraAlerta";
import GraficoTiposAlerta from "../../components/GraficoTipoAlerta/GraficoTipoAlerta";

export default function Home() {
  const navigate = useNavigate();

  const [estacoes, setEstacoes] = useState<Record<string, string>>({});
  const [sensores, setSensores] = useState<Record<string, { nome: string; unidade: string }>>({});
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

  const handleVisualizacao = (tipo: "pequeno" | "grande") => {
    setVisualizacao(tipo);
  };

  useEffect(() => {
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

    fetchEstacoes();
    fetchSensores();
  }, []);

  const dadosBrutos: { data: string; valor_bruto: number }[] = [];

  const inicio = new Date("2025-04-01T00:00:00");
  const fim = new Date("2025-04-07T23:30:00");
  
  let temperaturaAtual = 22 + Math.random() * 4; // começa entre 22°C e 26°C
  
  for (let d = new Date(inicio); d <= fim; d.setMinutes(d.getMinutes() + 30)) {
    const variacao = (Math.random() - 0.5) * 1.5; // varia entre -0.75°C e +0.75°C
    temperaturaAtual += variacao;
    temperaturaAtual = Math.min(Math.max(temperaturaAtual, 15), 30);
  
    dadosBrutos.push({
      data: d.toISOString(),
      valor_bruto: parseFloat(temperaturaAtual.toFixed(1)),
    });
  }

  // Função para calcular os valores de mínimo, médio e máximo
  const calcularValores = (dados: { data: string; valor_bruto: number }[]) => {
    const agrupados = dados.reduce((acc, curr) => {
      const dia = curr.data.split('T')[0]; // Agrupando por data
      if (!acc[dia]) acc[dia] = [];
      acc[dia].push(curr.valor_bruto);
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

  const dadosAgregados = calcularValores(dadosBrutos);

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
      inicio: filtros.dataInicio ? filtros.dataInicio.toISOString().split('T')[0] : "",
      fim: filtros.dataFim ? filtros.dataFim.toISOString().split('T')[0] : "",
    },
    dados: dadosAgregados,
    dadosBrutos: dadosBrutos
  };

  const dadosAlertaPorEstacao = [
    { estacao: "São José dos Campos", horasAlerta: 5 },
    { estacao: "Campinas", horasAlerta: 2 },
    { estacao: "Rio de Janeiro", horasAlerta: 9 },
    { estacao: "São Paulo", horasAlerta: 4 },
    { estacao: "Brasília", horasAlerta: 7 },
    { estacao: "Manaus", horasAlerta: 9 },
    { estacao: "Curitiba", horasAlerta: 4 },
    { estacao: "Salvador", horasAlerta: 7 },
    { estacao: "Fortaleza", horasAlerta: 9 },
    { estacao: "Ceará", horasAlerta: 4 },
  ];

  const dadosTiposAlertas = [
    { tipo: "Temperatura", quantidade: 15 },
    { tipo: "Vento", quantidade: 8 },
    { tipo: "Umidade", quantidade: 12 },
    { tipo: "Pressão", quantidade: 5 },
    { tipo: "Outros", quantidade: 3 },
  ];

  const todosFiltrosPreenchidos = filtros.estacaoId && filtros.sensorId && filtros.dataInicio && filtros.dataFim;

  const dataInvalida = filtros.dataInicio && filtros.dataFim && filtros.dataInicio > filtros.dataFim;

  const MiniCardAlerta = ({
    titulo,
    tempoAtivo,
    estacao,
    alertaAtivo,
  }: {
    titulo: string;
    tempoAtivo: string;
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
                <p>{tempoAtivo}</p>
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

  const dashboardCards = [
    {
      icon: <IconBroadcast width={32} height={32} stroke="1.5" color="#606060" />,
      titulo: "Estações",
      valor: 5,
    },
    {
      icon: <IconBorderCorners width={32} height={32} stroke="1.5" color="#606060" />,
      titulo: "Sensores",
      valor: 12,
    },
    {
      icon: <IconHexagonPlus width={32} height={32} stroke="1.5" color="#606060" />,
      titulo: "Alertas",
      valor: 8,
    },
    {
      icon: <IconUsers width={32} height={32} stroke="1.5" color="#606060" />,
      valor: 208,
      titulo: "Usuários",
    },
  ];

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
            <MiniCardAlerta
              titulo="Temperatura maior ou igual a 5°C"
              tempoAtivo="2h30min"
              estacao="Nome da Estação Aqui"
              alertaAtivo={true}
            />

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
              <div className={`dashboard_grafico_unidade ${visualizacao === "grande" ? "visu_grande" : ""}`}>
                <GraficoHorasAlerta dados={dadosAlertaPorEstacao} />
              </div>

              <div className={`dashboard_grafico_unidade ${visualizacao === "grande" ? "visu_grande" : ""}`}>
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