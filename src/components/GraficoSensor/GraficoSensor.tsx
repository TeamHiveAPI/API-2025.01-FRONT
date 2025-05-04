import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "highcharts/highcharts-more";
import "highcharts/modules/exporting";
import "highcharts/modules/offline-exporting";
import "highcharts/modules/export-data";
import "highcharts/modules/full-screen";

import { format } from "date-fns";
import "./styles.scss";

interface GraficoProps {
  estacaoId: string;
  sensorId: string;
  estacaoNome: string;
  sensorNome: string;
  unidade: string;
  dataInicio: Date;
  dataFim: Date;
  detalhado: boolean;
}

interface Medida {
  estacao_id: number;
  parametro_id: number;
  valor: number;
  data_hora: number;
  id: number;
}

export default function GraficoSensor({
  estacaoId,
  sensorId,
  estacaoNome,
  sensorNome,
  unidade,
  dataInicio,
  dataFim,
  detalhado,
}: GraficoProps) {
  
  const [seriesData, setSeriesData] = useState<[number, number][]>([]);
  const [agregadoData, setAgregadoData] = useState<
    { data: number; min: number; max: number; media: number }[]
  >([]);

  const [, setLoading] = useState(false);

  useEffect(() => {
    const fetchMedidas = async () => {
      try {
        const res = await fetch("http://localhost:8000/medidas");
        const data: Medida[] = await res.json();

        const fimCorrigido = new Date(dataFim);
        fimCorrigido.setHours(23, 59, 59, 999);

        const filtradas = data.filter((m) => {
          const dataMedida = new Date(m.data_hora * 1000);
          return (
            m.estacao_id.toString() === estacaoId &&
            m.parametro_id.toString() === sensorId &&
            dataMedida >= dataInicio &&
            dataMedida <= fimCorrigido
          );
        });

        if (detalhado) {
          const pontos: [number, number][] = filtradas.map((m) => [
            m.data_hora * 1000,
            parseFloat(m.valor.toFixed(2))
          ]);
          setSeriesData(pontos);
        } else {
          const agrupados: Record<string, number[]> = {};
          filtradas.forEach((m) => {
            const dataStr = new Date(m.data_hora * 1000).toISOString().split("T")[0];
            if (!agrupados[dataStr]) agrupados[dataStr] = [];
            agrupados[dataStr].push(m.valor);
          });

          const agregados = Object.entries(agrupados).map(([dia, valores]) => {
            const date = new Date(dia + "T00:00:00").getTime();
            const min = parseFloat(Math.min(...valores).toFixed(2));
            const max = parseFloat(Math.max(...valores).toFixed(2));
            const media = parseFloat((valores.reduce((a, b) => a + b, 0) / valores.length).toFixed(2));
            return { data: date, min, max, media };
          });
          

          setAgregadoData(agregados);
        }
      } catch (err) {
        console.error("Erro ao buscar medidas:", err);
      }
    };

    setSeriesData([]);
    setLoading(true);
  
    fetchMedidas().then(() => {
      setLoading(false);
    });

    fetchMedidas();
  }, [estacaoId, sensorId, dataInicio, dataFim, detalhado]);
  

  const options: Highcharts.Options = {
    chart: {
      backgroundColor: "transparent",
      spacingTop: 128,
      height: 500,
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
      text: ""
    },
    subtitle: {
      text: ""
    },
    xAxis: {
      type: "datetime",
      title: { text: detalhado ? "Data e Hora" : "Data" },
      dateTimeLabelFormats: {
        day: "%d/%m",
        hour: "%d/%m %Hh",
        minute: "%H:%M",
      },
    },
    yAxis: {
      title: { text: unidade },
    },
    tooltip: {
      xDateFormat: detalhado ? "%d/%m %H:%M" : "%d/%m",
      valueSuffix: ` ${unidade}`,
    },
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
          y: -96,
        }
      }
    },
    series: detalhado
      ? [
          {
            type: "line",
            name: "Valor Bruto",
            data: seriesData,
            marker: { enabled: false },
            color: "#5751D5"
          },
        ]
      : [
          {
            type: "arearange",
            name: "Mínimo-Máximo",
            data: agregadoData.map((d) => ({
              x: d.data,
              low: d.min,
              high: d.max,
            })),
            color: "#8D87FB",
            fillOpacity: 0.3,
            marker: { enabled: false },
          },
          {
            type: "line",
            name: "Valor Médio",
            data: agregadoData.map((d) => [d.data, d.media]),
            zIndex: 1,
            marker: {
              enabled: true,
              symbol: "circle",
            },
            color: "#5751D5"
          },
        ],
    credits: {
      enabled: false,
    },
  };

  if (dataInicio > dataFim) {
    return (
      <div className="grafico_wrapper">
        <h3>Variação de {sensorNome} - {estacaoNome}</h3>
        <p>Período: {format(dataInicio, "dd/MM/yyyy")} até {format(dataFim, "dd/MM/yyyy")}</p>
        <p className="sem_medidas">A data de início não pode ser maior que a data de fim.</p>
      </div>
    );
  }

  if (
    (detalhado && seriesData.length === 0) ||
    (!detalhado && agregadoData.length === 0)
  ) {
    return (
      <div className="grafico_wrapper">
        <h3>Variação de {sensorNome} - {estacaoNome}</h3>
        <p>Período: {format(dataInicio, "dd/MM/yyyy")} até {format(dataFim, "dd/MM/yyyy")}</p>
        <p className="sem_medidas">Nenhuma medida encontrada para este período.</p>
      </div>
    );
  }
  

  return (
    <div className="grafico_wrapper">
      <h3>Variação de {sensorNome} - {estacaoNome}</h3>
      <p>Período: {format(dataInicio, "dd/MM/yyyy")} até {format(dataFim, "dd/MM/yyyy")}</p>

      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  );
}