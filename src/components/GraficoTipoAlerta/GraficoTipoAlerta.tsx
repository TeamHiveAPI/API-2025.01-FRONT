import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface TiposAlertaProps {
  dados: {
    tipo: string;
    quantidade: number;
  }[];
}

export default function GraficoTiposAlerta({ dados }: TiposAlertaProps) {
  const total = dados.reduce((acc, item) => acc + item.quantidade, 0);
  
  const chartData = {
    labels: dados.map((item) => item.tipo),
    datasets: [
      {
        label: "Tipos de Alertas",
        data: dados.map((item) => item.quantidade),
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",  // Temperatura
          "rgba(54, 162, 235, 0.7)",   // Vento
          "rgba(255, 206, 86, 0.7)",   // Umidade
          "rgba(75, 192, 192, 0.7)",   // Pressão
          "rgba(153, 102, 255, 0.7)",  // Outros
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const quantidade = tooltipItem.raw;
            const porcentagem = ((quantidade / total) * 100).toFixed(1);
            return `${tooltipItem.label}: ${porcentagem}%`;
          },
        },
      },
    },
  };
  

  return (
    <div className="grafico_wrapper" style={{ height: "270px", margin: "0 auto" }}>
      <h3>Tipos de Alertas Mais Frequentes</h3>
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
}