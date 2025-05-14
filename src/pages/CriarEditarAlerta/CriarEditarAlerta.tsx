import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./styles.scss";

import InputMelhor from "../../components/InputMelhor/InputMelhor";
import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";
import { IconPlus } from "@tabler/icons-react";
import BarraCima from "../../components/BarraCima/BarraCima";
import Select from "react-select";
import Swal from "sweetalert2";
import styles_select from "../CriarEditarEstacao/styles_select";
import PaginaWrapper from "../../components/PaginaWrapper/PaginaWrapper";

export default function CriarEditarAlerta() {
  const location = useLocation();
  const navigate = useNavigate();
  const dadosRecebidos = location.state || null;

  const [modoEdicao, setModoEdicao] = useState(false);
  const [sensorValidadoID, setSensorValidadoID] = useState<string | null>(null);
  const [, setEstacaoValidadaID] = useState<string | null>(null);

  const [estacoes, setEstacoes] = useState<Record<string, string>>({});
  const [sensores, setSensores] = useState<Record<string, { nome: string; unidade: string }>>({});

  const [dadosAlerta, setDadosAlerta] = useState({
    estacao_id: "",
    sensor_id: "",
    condicao: "",
    num_condicao: "",
    mensagem: "",
  });

  const [errors, setErrors] = useState({
    estacao_id: false,
    sensor_id: false,
    condicao: false,
    num_condicao: false,
    mensagem: false,
  });

  const options = [
    { value: "maior_igual", label: "Maior ou igual a" },
    { value: "menor", label: "Menor que" },
  ];

  const selectedCondicao = options.find(opt => opt.value === dadosAlerta.condicao) || null;

  useEffect(() => {
    if (dadosRecebidos) {
      setModoEdicao(true);
      setDadosAlerta({
        estacao_id: String(dadosRecebidos.estacao_id || ""),
        sensor_id: String(dadosRecebidos.parametro_id || ""),
        condicao: dadosRecebidos.condicao || "",
        num_condicao: String(dadosRecebidos.num_condicao || ""),
        mensagem: dadosRecebidos.mensagem || "",
      });
    }
  }, [dadosRecebidos]);

  useEffect(() => {
    if (dadosAlerta.sensor_id && Object.keys(sensores).length > 0) {
      const existe = Object.keys(sensores).includes(dadosAlerta.sensor_id);
      setSensorValidadoID(existe ? dadosAlerta.sensor_id : null);
    }
  }, [dadosAlerta.sensor_id, sensores]);

  useEffect(() => {
    if (dadosAlerta.estacao_id && Object.keys(estacoes).length > 0) {
      const existe = Object.keys(estacoes).includes(dadosAlerta.estacao_id);
      setEstacaoValidadaID(existe ? dadosAlerta.estacao_id : null);
    }
  }, [dadosAlerta.estacao_id, estacoes]);  

  useEffect(() => {
    const fetchEstacoes = async () => {
      try {
        const res = await api.get("/estacoes");
        const data = res.data;        
        const mapped = Object.fromEntries(data.map((e: any) => [e.id.toString(), e.nome]));
        setEstacoes(mapped);
      } catch (err) {
        console.error("Erro ao carregar estações:", err);
      }
    };

    const fetchSensores = async () => {
      try {
        const res = await api.get("/parametros");
        const data = res.data;
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

  const sensorSelecionado = sensorValidadoID
    ? sensores[sensorValidadoID as keyof typeof sensores]
    : null;

  const textoSensor = sensorSelecionado
    ? `${sensorSelecionado.nome} (${sensorSelecionado.unidade})`
    : "Selecione um Sensor";

  const handleInputChange = (tag: string, value: string) => {
    setDadosAlerta(prev => ({ ...prev, [tag]: value }));
    setErrors(prev => ({ ...prev, [tag]: false }));
  };

  const handleCondicaoChange = (selectedOption: any) => {
    setDadosAlerta(prev => ({ ...prev, condicao: selectedOption?.value || "" }));
    setErrors(prev => ({ ...prev, condicao: false }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      estacao_id: !dadosAlerta.estacao_id,
      sensor_id: !dadosAlerta.sensor_id,
      condicao: !dadosAlerta.condicao,
      num_condicao: !dadosAlerta.num_condicao,
      mensagem: !dadosAlerta.mensagem,
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some(e => e)) return;

    const jsonFinal = {
      estacao_id: parseInt(dadosAlerta.estacao_id),
      parametro_id: parseInt(dadosAlerta.sensor_id),
      condicao: dadosAlerta.condicao,
      num_condicao: parseFloat(dadosAlerta.num_condicao),
      mensagem: dadosAlerta.mensagem,
      ativo: true
    };

    const estacaoExiste = Object.keys(estacoes).includes(dadosAlerta.estacao_id);
    const sensorExiste = Object.keys(sensores).includes(dadosAlerta.sensor_id);

    if (!estacaoExiste || !sensorExiste) {
      Swal.fire({
        icon: "error",
        title: "ID inválido",
        text: !estacaoExiste
          ? `Estação com ID ${dadosAlerta.estacao_id} não existe.`
          : `Sensor com ID ${dadosAlerta.sensor_id} não existe.`,
        confirmButtonColor: "#ED3C5C",
      });
      return;
    }

    try {

      if (modoEdicao && dadosRecebidos?.id) {
        await api.put(`/alertas-definidos/${dadosRecebidos.id}`, jsonFinal);
      } else {
        console.log("Enviando:", jsonFinal);
        await api.post("/alertas-definidos/", jsonFinal);
      }

      Swal.fire({
        icon: "success",
        title: modoEdicao ? "Alerta atualizado com sucesso!" : "Alerta cadastrado com sucesso!",
        confirmButtonColor: "#5751D5",
      }).then(() => navigate(-1));
    } catch (error: any) {
      const backendMsg = error?.response?.data?.detail;
    
      if (backendMsg === "Sensor não vinculado à estação informada") {
        Swal.fire({
          icon: "error",
          title: "Sensor não vinculado",
          text: "É necessário vinculor o sensor selecionado à estação selecionada.",
          confirmButtonColor: "#ED3C5C",
        });
        return;
      }
    
      Swal.fire({
        icon: "error",
        title: "Erro ao salvar alerta",
        text: backendMsg || error.message || "Erro desconhecido",
        confirmButtonColor: "#ED3C5C",
      });
    }
    
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/alertas-definidos/${id}`);
    } catch (err) {
      console.error("Erro ao excluir alerta:", err);
    }
  };

  return (
    <PaginaWrapper>
      <BarraCima
        nome={modoEdicao ? "Editar Alerta" : "Criar Alerta"}
        tipo="voltar"
        entidade={modoEdicao ? "Alerta" : undefined}
        onDelete={modoEdicao ? () => handleDelete(dadosRecebidos.id) : undefined}
      />

      <form onSubmit={handleSubmit}>
        <div className="secao_input bottom">
          <div className="ceal_gap_12">
            <label className="label_separado" htmlFor="estacao_id">Estação</label>
            <Select
              id="estacao_id"
              options={Object.entries(estacoes).map(([id, nome]) => ({
                value: id,
                label: `${nome} (ID ${id})`,
              }))}
              value={
                dadosAlerta.estacao_id
                  ? {
                      value: dadosAlerta.estacao_id,
                      label: `${estacoes[dadosAlerta.estacao_id]} (ID ${dadosAlerta.estacao_id})`,
                    }
                  : null
              }
              onChange={(selected) =>
                handleInputChange("estacao_id", selected?.value || "")
              }
              placeholder="Selecione a estação"
              classNamePrefix="ceal id"
              styles={styles_select}
            />
            {errors.estacao_id && <p className="input_erro">Preencha este campo.</p>}
          </div>

          <div className="ceal_gap_12">
            <label className="label_separado" htmlFor="sensor_id">Sensor</label>
            <Select
              id="sensor_id"
              options={Object.entries(sensores).map(([id, { nome, unidade }]) => ({
                value: id,
                label: `${nome} (${unidade}) - ID ${id}`,
              }))}
              value={
                dadosAlerta.sensor_id
                  ? {
                      value: dadosAlerta.sensor_id,
                      label: `${sensores[dadosAlerta.sensor_id]?.nome} (${sensores[dadosAlerta.sensor_id]?.unidade}) - ID ${dadosAlerta.sensor_id}`,
                    }
                  : null
              }
              onChange={(selected) =>
                handleInputChange("sensor_id", selected?.value || "")
              }
              placeholder="Selecione o sensor"
              classNamePrefix="ceal id"
              styles={styles_select}
            />
            {errors.sensor_id && <p className="input_erro">Preencha este campo.</p>}
          </div>
        </div>

        <p className="subtitulo">Configurações de Condição</p>

        <div className="secao_input cima ceal">
          <p className="ceal_escrito">Sensor mediu:</p>
          <p className="ceal_escrito">{textoSensor}</p>
          <div>
            <Select
              options={options}
              value={selectedCondicao}
              onChange={handleCondicaoChange}
              placeholder="Selecione a condição"
              classNamePrefix="ceal"
              styles={styles_select}
            />
            {errors.condicao && (
              <p className="input_erro">Preencha este campo.</p>
            )}
          </div>
          <div className="ceal_input_num_condicao">
            <InputMelhor
              tag="num_condicao"
              width={50}
              value={dadosAlerta.num_condicao}
              onChange={(e) => handleInputChange("num_condicao", e.target.value)}
              mostrarErro={errors.num_condicao}
              placeholder="Número"
            />
          </div>
        </div>

        <div className="secao_input cima">
          <InputMelhor
            label="Mensagem"
            tag="mensagem"
            width={100}
            value={dadosAlerta.mensagem}
            onChange={(e) => handleInputChange("mensagem", e.target.value)}
            mostrarErro={errors.mensagem}
          />
        </div>

        <div className="cima80">
          <BotaoCTA
            aparencia="primario"
            cor="cor_primario"
            escrito={modoEdicao ? "Atualizar Alerta" : "Cadastrar Alerta"}
            img={<IconPlus stroke="2" />}
            type="submit"
          />
        </div>
      </form>
    </PaginaWrapper>
  );
}