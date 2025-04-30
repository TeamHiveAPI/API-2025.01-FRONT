import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface HorasAlertaPorEstacaoProps {
  dados: {
    estacao: string;
    horasAlerta: number;
    qtdAlertas: number;
  }[];
}

export default function GraficoHorasAlerta({ dados }: HorasAlertaPorEstacaoProps) {
  // Ordena os dados por horas em alerta (do maior para o menor)
  const dadosOrdenados = [...dados].sort((a, b) => b.horasAlerta - a.horasAlerta);

  const chartData = {
    // Mostra o nome da estação e quantidade de alertas entre parênteses
    labels: dadosOrdenados.map((item) => `${item.estacao}`),
    datasets: [
      {
        label: "Horas em Alerta",
        // Arredonda as horas para 2 casas decimais
        data: dadosOrdenados.map((item) => Number(item.horasAlerta.toFixed(2))),
        // Muda a cor baseado no tempo em alerta (rosa se > 6 horas, azul se <= 6 horas)
        backgroundColor: dadosOrdenados.map((item) =>
          item.horasAlerta > 6 ? "rgba(232, 132, 180, 0.8)" : "rgba(54, 162, 235, 0.8)"
        ),
        borderColor: dadosOrdenados.map((item) =>
          item.horasAlerta > 6 ? "rgba(232, 132, 180, 1)" : "rgba(54, 162, 235, 1)"
        ),
        borderWidth: 1
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    indexAxis: "y" as const,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          // Formata o tooltip para mostrar horas e minutos
          label: (tooltipItem: any) => {
            const horas = Math.floor(tooltipItem.raw);
            const minutos = Math.round((tooltipItem.raw - horas) * 60);
            return `${horas}h ${minutos}min em alerta`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Horas em Alerta",
        },
        beginAtZero: true,
      },
      y: {
        title: {
          display: false
        },
      },
    },
  };

  return (
    <div className="grafico_wrapper">
      <h3>Horas em Alerta por Estação</h3>
      {dados && dados.length > 0 ? (
        <Bar data={chartData} options={chartOptions} />
      ) : (
        <p>Nenhum dado de alerta disponível</p>
      )}
    </div>
  );
}