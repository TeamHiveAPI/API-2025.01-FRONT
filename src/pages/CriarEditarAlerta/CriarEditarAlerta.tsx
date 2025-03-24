import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./styles.scss";

import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import InputMelhor from "../../components/InputMelhor/InputMelhor";
import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";
import { IconPlus } from "@tabler/icons-react";
import BarraCima from "../../components/BarraCima/BarraCima";
import Select from "react-select";

export default function CriarEditarAlerta() {
  const location = useLocation();
  const dadosRecebidos = location.state || null;

  const [modoEdicao, setModoEdicao] = useState(false);

  const [sensorValidadoID, setSensorValidadoID] = useState<string | null>(null);
  const [, setEstacaoValidadaID] = useState<string | null>(null);

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

  const estacoes = {
    "1": "FATEC",
    "2": "Eugenio de Melo",
    "3": "Parque de Inovacao",
  };

  const sensores = {
    "1": { nome: "Umidade", unidade: "%" },
    "2": { nome: "Temperatura", unidade: "°C" },
    "3": { nome: "Pressão", unidade: "hPa" },
  };

  const sensorSelecionado = sensorValidadoID
    ? sensores[sensorValidadoID as keyof typeof sensores]
    : null;

  const textoSensor = sensorSelecionado
    ? `${sensorSelecionado.nome} (${sensorSelecionado.unidade})`
    : "Selecione um Sensor";

  const options = [
    { value: "maior_igual", label: "Maior ou igual a" },
    { value: "menor", label: "Menor que" },
  ];

  const selectedCondicao =
    options.find((opt) => opt.value === dadosAlerta.condicao) || null;

  useEffect(() => {
    if (dadosRecebidos) {
      setModoEdicao(true);
      setDadosAlerta({
        estacao_id: String(dadosRecebidos.estacao_id || ""),
        sensor_id: String(dadosRecebidos.sensor_id || ""),
        condicao: dadosRecebidos.condicao || "",
        num_condicao: String(dadosRecebidos.num_condicao || ""),
        mensagem: dadosRecebidos.mensagem || "",
      });
    }
  }, [dadosRecebidos]);

  const handleInputChange = (tag: string, value: string) => {
    setDadosAlerta((prev) => ({
      ...prev,
      [tag]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [tag]: false,
    }));
  };

  const handleCondicaoChange = (selectedOption: any) => {
    setDadosAlerta((prev) => ({
      ...prev,
      condicao: selectedOption ? selectedOption.value : "",
    }));

    setErrors((prev) => ({
      ...prev,
      condicao: false,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      estacao_id: !dadosAlerta.estacao_id,
      sensor_id: !dadosAlerta.sensor_id,
      condicao: !dadosAlerta.condicao,
      num_condicao: !dadosAlerta.num_condicao,
      mensagem: !dadosAlerta.mensagem,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) return;

    const jsonFinal = {
      estacao_id: dadosAlerta.estacao_id,
      sensor_id: dadosAlerta.sensor_id,
      condicao: dadosAlerta.condicao,
      mensagem: dadosAlerta.mensagem,
      num_condicao: dadosAlerta.num_condicao
    };

    console.log("JSON do Alerta a ser enviado:", jsonFinal);
  };

  return (
    <div className="pagina_wrapper">
      <Sidebar />
      <div>
        <div className="pagina_container">
          <BarraCima
            nome={modoEdicao ? "Editar Alerta" : "Criar Alerta"}
            tipo="voltar"
            entidade={modoEdicao ? "Alerta" : undefined}
          />

          <form onSubmit={handleSubmit}>
            <div className="secao_input bottom">
              <InputMelhor
                label="Estação ID"
                tag="estacao_id"
                width={25}
                value={dadosAlerta.estacao_id}
                onChange={(e) =>
                  handleInputChange("estacao_id", e.target.value)
                }
                mostrarErro={errors.estacao_id}
                onChecar={(valor) => {
                  const existe = Object.keys(estacoes).includes(valor);
                  setEstacaoValidadaID(existe ? valor : null);
                  return existe;
                }}
              />

              <InputMelhor
                label="Sensor ID"
                tag="sensor_id"
                width={25}
                value={dadosAlerta.sensor_id}
                onChange={(e) =>
                  handleInputChange("sensor_id", e.target.value)
                }
                mostrarErro={errors.sensor_id}
                onChecar={(valor) => {
                  const existe = Object.keys(sensores).includes(valor);
                  setSensorValidadoID(existe ? valor : null);
                  return existe;
                }}
              />
            </div>

            <p className="subtitulo">Configurações de Condição</p>

            <div className="secao_input cima ceal">
              <p className="ceal_escrito">Sensor mediu:</p>
              <p className="ceal_escrito">{textoSensor}</p>
              <Select
                options={options}
                value={selectedCondicao}
                onChange={handleCondicaoChange}
                placeholder="Selecione a condição"
                classNamePrefix="ceal"
              />
              <div className="ceal_input_num_condicao">
                <InputMelhor
                  tag="num_condicao"
                  width={50}
                  value={dadosAlerta.num_condicao}
                  onChange={(e) =>
                    handleInputChange("num_condicao", e.target.value)
                  }
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
                onChange={(e) =>
                  handleInputChange("mensagem", e.target.value)
                }
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
        </div>
        <Footer />
      </div>
    </div>
  );
}