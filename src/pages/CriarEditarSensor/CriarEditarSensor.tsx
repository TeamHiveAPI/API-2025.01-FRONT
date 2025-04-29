import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import styles_select from "../CriarEditarEstacao/styles_select";
import api from "../../services/api";
 
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import InputMelhor from "../../components/InputMelhor/InputMelhor";
import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";
import BarraCima from "../../components/BarraCima/BarraCima";
import { IconPlus } from "@tabler/icons-react";
import Select from "react-select";
import Swal from "sweetalert2";
 
interface TipoSensor {
  id: number;
  nome: string;
  descricao: string;
}
 
export default function CriarEditarSensor() {
  const navigate = useNavigate();
  const location = useLocation();
  const dadosRecebidos = location.state || null;
 
  const [modoEdicao, setModoEdicao] = useState(false);
 
  const [dadosSensor, setDadosSensor] = useState({
    nome: "",
    unidade: "",
    descricao: "",
    quantidade_casas_decimais: "",
    fator_conversao: "",
    offset: "",
    tipo_sensor_id: "",
    json: "" // Adicione esta linha para incluir o campo json nos dado
  });
 
  const [sensorTypes, setSensorTypes] = useState<TipoSensor[]>([]);
 
  const [errors, setErrors] = useState({
    nome: false,
    unidade: false,
    descricao: false,
    quantidade_casas_decimais: false,
    fator_conversao: false,
    offset: false,
    tipo_sensor_id: false,
    json: false
 
  });
 
  useEffect(() => {
    api.get("/tipo_parametros/")
      .then(response => {
        const sortedData = response.data.sort((a: TipoSensor, b: TipoSensor) =>
          a.nome.localeCompare(b.nome)
        );
        setSensorTypes(sortedData);
      })
      .catch(error => console.error("Erro:", error));
  }, []);
 
  const sensorTypeOptions = sensorTypes.map(sensor => ({
    value: sensor.id.toString(),
    label: sensor.nome
  }));
 
  useEffect(() => {
    if (dadosRecebidos && sensorTypes.length > 0) {
      setModoEdicao(true);
      setDadosSensor({
        nome: dadosRecebidos.nome || "",
        unidade: dadosRecebidos.unidade || "",
        descricao: dadosRecebidos.descricao || "",
        quantidade_casas_decimais: dadosRecebidos.quantidade_casas_decimais?.toString() || "",
        fator_conversao: dadosRecebidos.fator_conversao?.toString() || "",
        offset: dadosRecebidos.offset?.toString() || "",
        tipo_sensor_id: dadosRecebidos.tipo_parametro_id?.toString() || "",
        json: dadosRecebidos.json || ""
       
      });
    }
  }, [dadosRecebidos, sensorTypes]);  
 
  const handleInputChange = (tag: string, value: string) => {
    setDadosSensor(prev => ({ ...prev, [tag]: value }));
    setErrors(prev => ({ ...prev, [tag]: false }));
  };
 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSensorTypeSelect = (selectedOption: any) => {
    handleInputChange("tipo_sensor_id", selectedOption?.value);
  };
 
  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/parametros/${id}`);
    } catch (err) {
      console.error("Erro ao excluir sensor:", err);
    }
  };
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
 
    const newErrors = {
      nome: !dadosSensor.nome,
      unidade: !dadosSensor.unidade,
      descricao: !dadosSensor.descricao,
      quantidade_casas_decimais: !dadosSensor.quantidade_casas_decimais,
      fator_conversao: !dadosSensor.fator_conversao,
      offset: !dadosSensor.offset,
      tipo_sensor_id: !dadosSensor.tipo_sensor_id,
      json:!dadosSensor.json
     
    };
 
    setErrors(newErrors);
    if (Object.values(newErrors).some(error => error)) return;
 
    const sensorData = {
      nome: dadosSensor.nome,
      unidade: dadosSensor.unidade,
      descricao: dadosSensor.descricao,
      quantidade_casas_decimais: Number(dadosSensor.quantidade_casas_decimais),
      fator_conversao: Number(dadosSensor.fator_conversao),
      offset: Number(dadosSensor.offset),
      tipo_parametro_id: Number(dadosSensor.tipo_sensor_id),
      json: dadosSensor.json
    };
 
    try {
      if (modoEdicao && dadosRecebidos?.id) {
        await api.put(`/parametros/${dadosRecebidos.id}`, sensorData);
      } else {
        await api.post("/parametros/", sensorData);
      }
 
      Swal.fire({
        icon: "success",
        title: modoEdicao ? "Sensor atualizado com sucesso!" : "Sensor cadastrado com sucesso!",
        confirmButtonColor: "#5751D5"
      }).then(() => navigate("/sensores"));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: error?.response?.data?.detail || error.message || "Erro desconhecido",
        confirmButtonColor: "#ED3C5C"
      });
    }
  };
  return (
    <div className="pagina_wrapper">
      <Sidebar />
      <div>
        <div className="pagina_container">
          <BarraCima
            nome={modoEdicao ? "Editar Sensor" : "Criar Sensor"}
            tipo="voltar"
            entidade={modoEdicao ? "Sensor" : undefined}
            onDelete={modoEdicao ? () => handleDelete(dadosRecebidos.id) : undefined}
          />
          <form onSubmit={handleSubmit}>
            <div className="secao_input cima">
              <InputMelhor
                label="Nome"
                tag="nome"
                width={50}
                value={dadosSensor.nome}
                onChange={(e) => handleInputChange("nome", e.target.value)}
                mostrarErro={errors.nome}
                placeholder="Nome do sensor"
              />
 
              <InputMelhor
                label="Unidade"
                tag="unidade"
                width={50}
                value={dadosSensor.unidade}
                onChange={(e) => handleInputChange("unidade", e.target.value)}
                mostrarErro={errors.unidade}
                placeholder="Unidade do sensor (Ex: °C, %)"
              />
            </div>
 
            <div className="secao_input cima">
              <InputMelhor
                label="Descrição"
                tag="descricao"
                width={100}
                value={dadosSensor.descricao}
                onChange={(e) => handleInputChange("descricao", e.target.value)}
                mostrarErro={errors.descricao}
                placeholder="Descrição do sensor"
              />
            </div>
 
            <div className="secao_input cima">
              <InputMelhor
                label="Quantidade de Casas Decimais"
                tag="quantidade_casas_decimais"
                width={33}
                type="number"
                value={dadosSensor.quantidade_casas_decimais}
                onChange={(e) => handleInputChange("quantidade_casas_decimais", e.target.value)}
                mostrarErro={errors.quantidade_casas_decimais}
                placeholder="Número de casas decimais"
              />
 
              <InputMelhor
                label="Fator de Conversão"
                tag="fator_conversao"
                width={33}
                type="number"
                value={dadosSensor.fator_conversao}
                onChange={(e) => handleInputChange("fator_conversao", e.target.value)}
                mostrarErro={errors.fator_conversao}
                placeholder="Fator de conversão"
              />
 
              <InputMelhor
                label="Offset"
                tag="offset"
                width={33}
                type="number"
                value={dadosSensor.offset}
                onChange={(e) => handleInputChange("offset", e.target.value)}
                mostrarErro={errors.offset}
                placeholder="Offset"
              />
 
              <InputMelhor
                label="JSON"
                tag="json"
                width={33}
                type="string"
                value={dadosSensor.json}
                onChange={(e) => handleInputChange("json", e.target.value)}
                mostrarErro={errors.json}
                placeholder="JSON"
              />
            </div>
 
            <div className="secao_input cima">
              <p className="ceal_escrito">Tipo de Sensor</p>
              <Select
                options={sensorTypeOptions}
                value={sensorTypeOptions.find(option => option.value === dadosSensor.tipo_sensor_id)}
                onChange={handleSensorTypeSelect}
                placeholder="Selecione um tipo de sensor"
                classNamePrefix="id"
                styles={styles_select}
              />
 
              <BotaoCTA
                aparencia="secundario"
                cor="cor_primario"
                escrito="Cadastrar Novo Tipo de Sensor"
                img={<IconPlus stroke="2" />}
                type="button"
                onClick={() => navigate("/tipo-sensores/criar")}
              />
            </div>
            {errors.tipo_sensor_id && <p className="input_erro">Preencha este campo.</p>}
 
            <div className="cima80">
              <BotaoCTA
                aparencia="primario"
                cor="cor_primario"
                escrito={modoEdicao ? "Atualizar Sensor" : "Cadastrar Sensor"}
                img={<IconPlus stroke="2" />}
                type="submit"
              />
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
}
 