import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import 'highcharts/highcharts-more';
import 'highcharts/modules/exporting';
import 'highcharts/modules/offline-exporting';
import 'highcharts/modules/export-data';
import 'highcharts/modules/full-screen';

interface HorasAlertaPorEstacaoProps {
  dados: {
    estacao: string;
    horasAlerta: number;
    qtdAlertas: number;
  }[];
}

export default function GraficoHorasAlerta({ dados }: HorasAlertaPorEstacaoProps) {
  const dadosOrdenados = [...dados].sort((a, b) => b.horasAlerta - a.horasAlerta);

  const chartOptions: Highcharts.Options = {
    chart: {
      type: 'bar',
      height: 500,
      backgroundColor: 'transparent',
      spacingTop: 128,
      events: {
        ...( {
          afterFullscreenOpen: function () {
            this.update({
              chart: {
                backgroundColor: "#ffffff"
              }
            });
          },
          afterFullscreenClose: function () {
            this.update({
              chart: {
                backgroundColor: "transparent"
              }
            });
          }
        } as any )
      }
    },
    title: { text: '' },
    xAxis: {
      categories: dadosOrdenados.map((item) => item.estacao),
      title: { text: null },
    },
    yAxis: {
      min: 0,
      title: { text: 'Horas em Alerta' },
      labels: {
        formatter: function () {
          const horas = Math.floor(Number(this.value));
          return `${horas}h`;
        },
      },
      tickInterval: 6
    },
    tooltip: {
      formatter: function () {
        const valor = this.y as number;
        const horas = Math.floor(valor);
        const minutos = Math.round((valor - horas) * 60);
        return `${this.key}: <b>${horas}h ${minutos}min</b>`;
      },
    },
    series: [
      {
        name: 'Horas em Alerta',
        type: 'bar',
        data: dadosOrdenados.map((item) => ({
          y: Number(item.horasAlerta.toFixed(2)),
          color: "#5751D5"
        })),
      },
    ],
    exporting: {
      enabled: true,
      fallbackToExportServer: false,
      libURL: "https://code.highcharts.com/modules/",
      sourceWidth: 800,
      sourceHeight: 400,
      buttons: {
        contextButton: {
          align: "right",
          verticalAlign: "top",
          x: 0,
          y: -96
        }
      }
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    }
  };

  return (
    <div className="grafico_wrapper">
      <h3>Horas em Alerta por Estação</h3>
      <p className="grafico_wrapper_data">Todo o Período</p>
      {dados.length > 0 ? (
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
          containerProps={{ className: "custom-highchart-container" }}
        />
      ) : (
        <p className="grafico_wrapper_nenhum">Nenhum dado de alerta disponível</p>
      )}
    </div>
  );
}