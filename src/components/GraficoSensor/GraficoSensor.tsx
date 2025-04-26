import { Line } from "react-chartjs-2";
import { format } from 'date-fns';
import "./styles.scss"
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

interface GraficoProps {
  estacao: {
    id: number;
    nome: string;
  };
  sensor: {
    id: number;
    nome: string;
    unidade: string;
  };
  periodo: {
    inicio: string;
    fim: string;
  };
  dados: {
    data: string;
    valor_minimo: number;
    valor_medio: number;
    valor_maximo: number;
  }[];
  dadosBrutos?: {
    data: string;
    valor_bruto: number;
  }[];
  medidaSelecionada: "tudo" | "valor_minimo" | "valor_medio" | "valor_maximo" | "bruto";
  bruto?: boolean;
}

export default function GraficoSensor({
  estacao,
  sensor,
  periodo,
  dados,
  dadosBrutos,
  medidaSelecionada,
  bruto = false,
}: GraficoProps) {

  const dataInicioFormatada = format(new Date(periodo.inicio), 'dd/MM/yy');
  const dataFimFormatada = format(new Date(periodo.fim), 'dd/MM/yy');

  const geraDatasets = () => {
    if (bruto && dadosBrutos) {
      return [
        {
          label: "Temperatura Bruta",
          data: dadosBrutos.map((item) => item.valor_bruto),
          borderColor: "rgba(255, 165, 0, 1)",
          backgroundColor: "rgba(255, 165, 0, 0.2)",
          fill: false,
          tension: 0.5,
          showLine: true,
          pointRadius: 0,
          pointHoverRadius: 4,
        },
      ];
    }
  
    if (medidaSelecionada === "bruto" && dadosBrutos) {
      return [
        {
          label: "Temperatura Bruta",
          data: dadosBrutos.map((item) => item.valor_bruto),
          borderColor: "rgba(255, 165, 0, 1)",
          backgroundColor: "rgba(255, 165, 0, 0.2)",
          fill: false,
          tension: 0.5,
          pointRadius: 2,
          pointHoverRadius: 5,
        },
      ];
    }
    
    if (medidaSelecionada === "tudo") {
      return [
        {
          label: "Valor Mínimo",
          data: dados.map((item) => item.valor_minimo),
          borderColor: "rgba(0, 191, 255, 1)",
          backgroundColor: "rgba(0, 191, 255, 0.2)",
          fill: false,
          tension: 0.5,
        },
        {
          label: "Valor Médio",
          data: dados.map((item) => item.valor_medio),
          borderColor: "rgba(0, 255, 0, 1)",
          backgroundColor: "rgba(0, 255, 0, 0.2)",
          fill: false,
          tension: 0.5,
        },
        {
          label: "Valor Máximo",
          data: dados.map((item) => item.valor_maximo),
          borderColor: "rgba(255, 0, 0, 1)",
          backgroundColor: "rgba(255, 0, 0, 0.2)",
          fill: false,
          tension: 0.5,
        },
      ];
    }
  
    const cores = {
      valor_minimo: "rgba(0, 191, 255, 1)",
      valor_medio: "rgba(0, 255, 0, 1)",
      valor_maximo: "rgba(255, 0, 0, 1)",
    };
  
    const nomes = {
      valor_minimo: "Valor Mínimo",
      valor_medio: "Valor Médio",
      valor_maximo: "Valor Máximo",
    };
  
    if (medidaSelecionada === "valor_minimo" || medidaSelecionada === "valor_medio" || medidaSelecionada === "valor_maximo") {
      return [
        {
          label: nomes[medidaSelecionada],
          data: dados.map((item) => item[medidaSelecionada]),
          borderColor: cores[medidaSelecionada],
          backgroundColor: cores[medidaSelecionada],
          fill: false,
          tension: 0.5,
        },
      ];
    }
  
    return [];
  };
  
  const chartData = {
    labels: bruto
      ? dadosBrutos?.map((item) => format(new Date(item.data), 'dd/MM')) || []
      : medidaSelecionada === "bruto"
      ? dadosBrutos?.map((item) => format(new Date(item.data), 'dd/MM')) || []
      : dados.map((item) => format(new Date(item.data), 'dd/MM')),
    datasets: geraDatasets(),
  };  

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: sensor.unidade,
        },
        grid: {
          color: 'rgba(0,0,0,0.05)', // linhas do grid mais leves (opcional)
        },
      },
      x: {
        title: {
          display: true,
          text: "Data",
        },
        ticks: bruto ? {
          autoSkip: true,
          maxTicksLimit: 10,
        } : {},
        grid: {
          color: 'rgba(0,0,0,0.05)',
        },
      },
    },
  };
  

  return (
    <div className="grafico_wrapper">
      <h3>
        Variação de {sensor.nome} - {estacao.nome}
      </h3>
      <p>
        Período: {dataInicioFormatada} até {dataFimFormatada}
      </p>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}