import { useEffect, useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.scss";
import styles_select from "../../pages/CriarEditarEstacao/styles_select";
import { registerLocale } from "react-datepicker";
import { ptBR } from "date-fns/locale/pt-BR";

interface GraficoFiltrosProps {
  estacoes: Record<string, string>;
  sensores: Record<string, { nome: string; unidade: string }>;
  onFiltroChange: (filtros: {
    estacaoId: string | null;
    sensorId: string | null;
    dataInicio: Date | null;
    dataFim: Date | null;
    medida: "tudo" | "valor_minimo" | "valor_medio" | "valor_maximo"; // <-- removido "bruto" aqui
  }) => void;
}

export default function GraficoFiltros({ estacoes, sensores, onFiltroChange }: GraficoFiltrosProps) {
  const [estacaoSelecionada, setEstacaoSelecionada] = useState<string | null>(null);
  const [sensorSelecionado, setSensorSelecionado] = useState<string | null>(null);
  const [dataInicio, setDataInicio] = useState<Date | null>(null);
  const [dataFim, setDataFim] = useState<Date | null>(null);
  const [medidaSelecionada, setMedidaSelecionada] = useState<"tudo" | "valor_minimo" | "valor_medio" | "valor_maximo">("tudo");

  registerLocale("pt-BR", ptBR);

  // Inputs com opções pré selecionadas
  
  useEffect(() => {
    const estacaoIds = Object.keys(estacoes);
    const sensorIds = Object.keys(sensores);

    if (estacaoIds.length > 0 && sensorIds.length > 0) {
      const hoje = new Date();
      const umMesAtras = new Date();
      umMesAtras.setMonth(hoje.getMonth() - 1);

      setEstacaoSelecionada(estacaoIds[0]);
      setSensorSelecionado(sensorIds[0]);
      setDataInicio(umMesAtras);
      setDataFim(hoje);
    }
  }, [estacoes, sensores]);

  // Atualizar o filtro toda vez que algum campo mudar
  useEffect(() => {
    onFiltroChange({
      estacaoId: estacaoSelecionada,
      sensorId: sensorSelecionado,
      dataInicio,
      dataFim,
      medida: medidaSelecionada,
    });
  }, [estacaoSelecionada, sensorSelecionado, dataInicio, dataFim, medidaSelecionada, onFiltroChange]);


  return (
    <div className="home_filtros">
      <div className="ceal_gap_12 home_filtro_50">
        <label className="label_separado">Estação:</label>
        <Select
          options={Object.entries(estacoes).map(([id, nome]) => ({
            value: id,
            label: `${nome} (ID ${id})`,
          }))}
          value={
            estacaoSelecionada
              ? { value: estacaoSelecionada, label: `${estacoes[estacaoSelecionada]} (ID ${estacaoSelecionada})` }
              : null
          }
          onChange={(selected) => setEstacaoSelecionada(selected?.value || null)}
          placeholder="Selecione a estação"
          styles={styles_select}
        />
      </div>

      <div className="ceal_gap_12 home_filtro_50">
        <label className="label_separado">Sensor:</label>
        <Select
          options={Object.entries(sensores).map(([id, { nome, unidade }]) => ({
            value: id,
            label: `${nome} (${unidade}) - ID ${id}`,
          }))}
          value={
            sensorSelecionado
              ? {
                  value: sensorSelecionado,
                  label: `${sensores[sensorSelecionado]?.nome} (${sensores[sensorSelecionado]?.unidade}) - ID ${sensorSelecionado}`,
                }
              : null
          }
          onChange={(selected) => setSensorSelecionado(selected?.value || null)}
          placeholder="Selecione o sensor"
          styles={styles_select}
        />
      </div>

      <div className="ceal_gap_12 home_filtro_33">
        <label className="label_separado">Data Início:</label>
        <DatePicker
          selected={dataInicio}
          onChange={(date) => setDataInicio(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Data de início"
          locale="pt-BR"
          className="input_data"
        />
      </div>

      <div className="ceal_gap_12 home_filtro_33">
        <label className="label_separado">Data Fim:</label>
        <DatePicker
          selected={dataFim}
          onChange={(date) => setDataFim(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Data de fim"
          locale="pt-BR"
          className="input_data"
        />
      </div>

      <div className="ceal_gap_12 home_filtro_33">
        <label className="label_separado">Visualização:</label>
        <Select
          options={[
            { value: "tudo", label: "Tudo" },
            { value: "valor_minimo", label: "Valor Mínimo" },
            { value: "valor_medio", label: "Valor Médio" },
            { value: "valor_maximo", label: "Valor Máximo" },
          ]}
          value={{
            value: medidaSelecionada,
            label:
              medidaSelecionada === "tudo"
                ? "Tudo"
                : medidaSelecionada === "valor_minimo"
                ? "Valor Mínimo"
                : medidaSelecionada === "valor_medio"
                ? "Valor Médio"
                : "Valor Máximo",
          }}
          onChange={(selected) => setMedidaSelecionada(selected?.value as any)}
          placeholder="Selecione a visualização"
          styles={styles_select}
        />
      </div>
    </div>
  );
}