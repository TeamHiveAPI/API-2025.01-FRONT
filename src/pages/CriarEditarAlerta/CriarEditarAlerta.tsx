import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./styles.scss";

import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import InputMelhor from "../../components/InputMelhor/InputMelhor";
import InputDataHora from "../../components/InputDataHora/InputDataHora"; // Importando o novo componente
import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";
import { IconPlus } from "@tabler/icons-react";
import BarraCima from "../../components/BarraCima/BarraCima";

export default function CriarEditarAlerta() {
  const location = useLocation();
  const dadosRecebidos = location.state || null; 

  const [modoEdicao, setModoEdicao] = useState(false);

  const [dadosAlerta, setDadosAlerta] = useState({
    estacao_id: "",
    sensor_id: "",
    condicao: "",
    mensagem: "",
    data: "", 
    hora: "", 
    status: "ativo", 
  });

  useEffect(() => {
    console.log("Dados recebidos:", dadosRecebidos); // Depuração
    if (dadosRecebidos) {
      setModoEdicao(true);
      setDadosAlerta({
        estacao_id: dadosRecebidos.estacao_id,
        sensor_id: dadosRecebidos.sensor_id,
        condicao: dadosRecebidos.condicao,
        mensagem: dadosRecebidos.mensagem,
        data: dadosRecebidos.data || "", 
        hora: dadosRecebidos.hora || "", 
        status: dadosRecebidos.status,
      });
    }
  }, [dadosRecebidos]);

  const [errors, setErrors] = useState({
    estacao_id: false,
    sensor_id: false,
    condicao: false,
    mensagem: false,
    data: false, // Erro para data
    hora: false, // Erro para hora
  });

  const handleInputChange = (tag: string, value: string) => {
    setDadosAlerta((prev) => ({
      ...prev,
      [tag]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [tag]: false, // Remove erro ao digitar
    }));
  };

  const handleStatusChange = (status: string) => {
    setDadosAlerta((prev) => ({
      ...prev,
      status,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let newErrors = {
      estacao_id: !dadosAlerta.estacao_id,
      sensor_id: !dadosAlerta.sensor_id,
      condicao: !dadosAlerta.condicao,
      mensagem: !dadosAlerta.mensagem,
      data: !dadosAlerta.data, 
      hora: !dadosAlerta.hora, 
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) return;

    // Combina data e hora no formato ISO
    const dataHoraISO = `${dadosAlerta.data}T${dadosAlerta.hora}`;

    const jsonFinal = {
      estacao_id: dadosAlerta.estacao_id,
      sensor_id: dadosAlerta.sensor_id,
      condicao: dadosAlerta.condicao,
      mensagem: dadosAlerta.mensagem,
      data_hora: dataHoraISO, // Envia data e hora combinadas
      status: dadosAlerta.status,
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
            tipo={"voltar"}
            entidade={modoEdicao ? "Alerta" : undefined}
          />

          <form onSubmit={handleSubmit}>
            <div className="cees_cima">
              <InputMelhor
                label="Estação ID"
                tag="estacao_id"
                width={25}
                value={dadosAlerta.estacao_id}
                onChange={(e) => handleInputChange("estacao_id", e.target.value)}
                mostrarErro={errors.estacao_id}
              />
              <InputMelhor
                label="Sensor ID"
                tag="sensor_id"
                width={25}
                value={dadosAlerta.sensor_id}
                onChange={(e) => handleInputChange("sensor_id", e.target.value)}
                mostrarErro={errors.sensor_id}
              />
              <div className="cees_cima_dir">
                <h4>Status do Alerta</h4>
                <div className="cees_cima_inputs">
                  <div
                    className={`cees_input_radius ${dadosAlerta.status === "ativo" ? "escolhido" : ""}`}
                    onClick={() => handleStatusChange("ativo")}
                  >
                    <p>Ativo</p>
                  </div>
                  <div
                    className={`cees_input_radius ${dadosAlerta.status === "resolvido" ? "escolhido" : ""}`}
                    onClick={() => handleStatusChange("resolvido")}
                  >
                    <p>Resolvido</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="subtitulo">Detalhes do Alerta</p>

            <div className="AC_secao_input cima">
              <div className="AC_linha_superior">
                <InputMelhor
                  label="Condição"
                  tag="condicao"
                  width={25} 
                  value={dadosAlerta.condicao}
                  onChange={(e) => handleInputChange("condicao", e.target.value)}
                  mostrarErro={errors.condicao}
                />
                <InputMelhor
                  label="Mensagem"
                  tag="mensagem"
                  width={66} 
                  value={dadosAlerta.mensagem}
                  onChange={(e) => handleInputChange("mensagem", e.target.value)}
                  mostrarErro={errors.mensagem}
                />
              </div>
              <div className="AC_linha_inferior">
                <InputDataHora
                  label="Data e Hora"
                  tagData="data"
                  tagHora="hora"
                  width={25} 
                  valueData={dadosAlerta.data}
                  valueHora={dadosAlerta.hora}
                  onChangeData={(e) => handleInputChange("data", e.target.value)}
                  onChangeHora={(e) => handleInputChange("hora", e.target.value)}
                  mostrarErro={errors.data || errors.hora}
                />
              </div>
            </div>

            <div className="cima80">
              <BotaoCTA
                aparencia={"primario"}
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