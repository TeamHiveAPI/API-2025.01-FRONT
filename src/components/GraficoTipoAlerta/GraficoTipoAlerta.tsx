import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "highcharts/highcharts-more";
import "highcharts/modules/exporting";
import "highcharts/modules/offline-exporting";
import "highcharts/modules/export-data";
import "highcharts/modules/full-screen";

interface TiposAlertaProps {
  dados: {
    tipo: string;
    quantidade: number;
  }[];
}

export default function GraficoTiposAlerta({ dados }: TiposAlertaProps) {
  const total = dados.reduce((acc, item) => acc + item.quantidade, 0);

  const chartOptions: Highcharts.Options = {
    chart: {
      type: "pie",
      height: 400,
      backgroundColor: "transparent",
      spacingTop: 100,
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
    title: {
      text: "",
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        center: ["50%", "95%"],
        size: "175%",
        innerSize: "60%",
        dataLabels: {
          enabled: true,
          distance: -45,
          style: {
            fontWeight: "bold",
            color: "white"
          },
          formatter: function () {
            const point = this as any;
            const y = point.y;
            const name = point.point.name;
            const total = point.series.data.reduce((acc: number, p: any) => acc + (p.y || 0), 0);
            const perc = ((y / total) * 100).toFixed(1);
            return `${name}: ${perc}%`;
          }          
        }
      }
    },
    tooltip: {
      formatter: function () {
        const y = this.y as number;
        const perc = ((y / total) * 100).toFixed(1);
        return `<b>${this.key}</b>: ${perc}%`;
      },
    },
    series: [
      {
        type: "pie",
        name: "Tipos de Alertas",
        data: dados.map((item, index) => ({
          name: item.tipo,
          y: item.quantidade,
          color: [
            "rgba(255, 99, 132, 0.7)",
            "rgba(54, 162, 235, 0.7)",
            "rgba(255, 206, 86, 0.7)",
            "rgba(75, 192, 192, 0.7)",
            "rgba(153, 102, 255, 0.7)"
          ][index % 5]
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
          y: -70
        }
      }
    },
    legend: {
      enabled: true,
      align: "center",
      verticalAlign: "top"
    },
    credits: {
      enabled: false,
    },
  };

  return (
    <div className="grafico_wrapper">
      <h3>Tipos de Alertas Mais Frequentes</h3>
      <p>Todo o Período</p>
      {dados.length > 0 ? (
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
        />
      ) : (
        <p>Nenhum dado disponível</p>
      )}
    </div>
  );
}