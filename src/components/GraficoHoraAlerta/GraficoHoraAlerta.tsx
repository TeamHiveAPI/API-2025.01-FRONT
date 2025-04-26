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
  }[];
}

export default function GraficoHorasAlerta({ dados }: HorasAlertaPorEstacaoProps) {
  const dadosOrdenados = [...dados].sort((a, b) => b.horasAlerta - a.horasAlerta);

  const chartData = {
    labels: dadosOrdenados.map((item) => item.estacao),
    datasets: [
      {
        label: "Horas em Alerta",
        data: dadosOrdenados.map((item) => item.horasAlerta),
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
          label: (tooltipItem: any) => `${tooltipItem.raw} horas em alerta`,
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
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}