import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.scss";

import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import InputMelhor from "../../components/InputMelhor/InputMelhor";
import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";
import BarraCima from "../../components/BarraCima/BarraCima";
import { IconPlus } from "@tabler/icons-react";

interface TipoSensor {
  id: number;
  nome: string;
  descricao: string;
}

export default function CriarEditarSensor() {
  const navigate = useNavigate();

  // Estado para os dados do sensor
  const [dadosSensor, setDadosSensor] = useState({
    nome: "",
    unidade: "",
    descricao: "",
    quantidade_casas_decimais: "",
    fator_conversao: "",
    offset: "",
    tipo_sensor_id: ""
  });

  // Estado para os tipos de sensor (usados no select)
  const [sensorTypes, setSensorTypes] = useState<TipoSensor[]>([]);

  // Estado para os erros dos campos do formulário
  const [errors, setErrors] = useState({
    nome: false,
    unidade: false,
    descricao: false,
    quantidade_casas_decimais: false,
    fator_conversao: false,
    offset: false,
    tipo_sensor_id: false
  });

  // Busca os tipos de sensor do backend e ordena alfabeticamente
  useEffect(() => {
    fetch("http://localhost:8000/tipo_parametros/")
      .then(response => {
        if (!response.ok) {
          throw new Error("Erro ao carregar os tipos de sensores");
        }
        return response.json();
      })
      .then((data: TipoSensor[]) => {
        const sortedData = data.sort((a, b) => a.nome.localeCompare(b.nome));
        setSensorTypes(sortedData);
      })
      .catch(error => console.error("Erro:", error));
  }, []);

  // Atualiza o estado conforme o input
  const handleInputChange = (tag: string, value: string) => {
    setDadosSensor(prev => ({ ...prev, [tag]: value }));
    setErrors(prev => ({ ...prev, [tag]: false }));
  };

  // Trata a mudança do select
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "adicionar_novo") {
      // Redireciona para a página de criação de um novo tipo de sensor
      navigate("/tipo-sensor");
    } else {
      handleInputChange("tipo_sensor_id", value);
    }
  };

  // Submete os dados para criar o sensor
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      nome: !dadosSensor.nome,
      unidade: !dadosSensor.unidade,
      descricao: !dadosSensor.descricao,
      quantidade_casas_decimais: !dadosSensor.quantidade_casas_decimais,
      fator_conversao: !dadosSensor.fator_conversao,
      offset: !dadosSensor.offset,
      tipo_sensor_id: !dadosSensor.tipo_sensor_id
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some(error => error)) return;

    // Cria o objeto com os dados, convertendo para os tipos necessários
    const sensorData = {
      nome: dadosSensor.nome,
      unidade: dadosSensor.unidade,
      descricao: dadosSensor.descricao,
      quantidade_casas_decimais: Number(dadosSensor.quantidade_casas_decimais),
      fator_conversao: Number(dadosSensor.fator_conversao),
      offset: Number(dadosSensor.offset),
      tipo_parametro_id: Number(dadosSensor.tipo_sensor_id)
    };

    try {
      const response = await fetch("http://localhost:8000/parametros/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sensorData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Erro ao criar sensor");
      }

      const data = await response.json();
      console.log("Sensor criado com ID:", data);
      navigate("/sensores");
    } catch (error: any) {
      console.error("Erro:", error.message);
      // Opcional: exiba uma mensagem de erro para o usuário
    }
  };

  return (
    <div className="pagina_wrapper">
      <Sidebar />
      <div>
        <div className="pagina_container">
          <BarraCima nome="Criar Sensor" tipo="voltar" entidade="Sensor" />
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
            </div>
            <div className="secao_input cima">
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
                width={30}
                type="number"
                value={dadosSensor.quantidade_casas_decimais}
                onChange={(e) => handleInputChange("quantidade_casas_decimais", e.target.value)}
                mostrarErro={errors.quantidade_casas_decimais}
                placeholder="Número de casas decimais"
              />
            </div>
            <div className="secao_input cima">
              <InputMelhor
                label="Fator de Conversão"
                tag="fator_conversao"
                width={30}
                type="number"
                value={dadosSensor.fator_conversao}
                onChange={(e) => handleInputChange("fator_conversao", e.target.value)}
                mostrarErro={errors.fator_conversao}
                placeholder="Fator de conversão"
              />
            </div>
            <div className="secao_input cima">
              <InputMelhor
                label="Offset"
                tag="offset"
                width={30}
                type="number"
                value={dadosSensor.offset}
                onChange={(e) => handleInputChange("offset", e.target.value)}
                mostrarErro={errors.offset}
                placeholder="Offset"
              />
            </div>
            <div className="secao_input cima">
              <label>Tipo Sensor</label>
              <select value={dadosSensor.tipo_sensor_id} onChange={handleSelectChange}>
                <option value="">Selecione um tipo de sensor</option>
                <option value="adicionar_novo">Adicionar novo tipo de sensor</option>
                {sensorTypes.map(tipo => (
                  <option key={tipo.id} value={tipo.id}>{tipo.nome}</option>
                ))}
              </select>
              {errors.tipo_sensor_id && <p className="erro">Selecione um tipo de sensor</p>}
            </div>
            <div className="cima80">
              <BotaoCTA
                aparencia="primario"
                cor="cor_primario"
                escrito="Cadastrar Sensor"
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
