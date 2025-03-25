import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./styles.scss";

import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import InputMelhor from "../../components/InputMelhor/InputMelhor";
import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";
import { IconPlus } from "@tabler/icons-react";
import BarraCima from "../../components/BarraCima/BarraCima";

export default function CriarEditarSensor() {
  const location = useLocation();
  const dadosRecebidos = location.state || null;

  const [modoEdicao, setModoEdicao] = useState(false);
  const [estacaoValidadaID, setEstacaoValidadaID] = useState<string | null>(null);


  const estacoes = {
    "1": "FATEC",
    "2": "Eugenio de Melo", 
    "3": "Parque de Inovacao",
  };

  const [dadosSensor, setDadosSensor] = useState({
    estacao_id: "",
    tipo: "",
    unidade: ""
  });


  const textoEstacao = estacaoValidadaID
    ? estacoes[estacaoValidadaID as keyof typeof estacoes]
    : "Selecione uma Estação";

    useEffect(() => {
        if (dadosRecebidos) {
          setModoEdicao(true);
          setDadosSensor({
            estacao_id: String(dadosRecebidos.estacao_id || ""),
            tipo: dadosRecebidos.tipo || "",
            unidade: dadosRecebidos.unidade || ""
          });
          
          if (dadosRecebidos.estacao_id) {
            setEstacaoValidadaID(String(dadosRecebidos.estacao_id));
          }
        }
      }, [dadosRecebidos]);

  const [errors, setErrors] = useState({
    estacao_id: false,
    tipo: false,
    unidade: false,
  });

  const handleInputChange = (tag: string, value: string) => {
    setDadosSensor(prev => ({ ...prev, [tag]: value }));
    setErrors(prev => ({ ...prev, [tag]: false }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      estacao_id: !dadosSensor.estacao_id,
      tipo: !dadosSensor.tipo,
      unidade: !dadosSensor.unidade,
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some(error => error)) return;

    const jsonFinal = {
      estacao_id: dadosSensor.estacao_id,
      tipo: dadosSensor.tipo,
      unidade: dadosSensor.unidade
    };

    console.log("Dados do Sensor:", jsonFinal);
    // Aqui você faria a requisição para API
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
          />

          <form onSubmit={handleSubmit}>
            <div className="secao_input cima">
              <InputMelhor
                label="Tipo"
                tag="tipo"
                width={50}
                value={dadosSensor.tipo}
                onChange={(e) => handleInputChange("tipo", e.target.value)}
                mostrarErro={errors.tipo}
                placeholder="Ex: Temperatura, Umidade, Pressão"
              />
              
              <InputMelhor
                label="Estação ID"
                tag="estacao_id"
                width={25}
                value={dadosSensor.estacao_id}
                onChange={(e) => handleInputChange("estacao_id", e.target.value)}
                mostrarErro={errors.estacao_id}
                onChecar={(valor) => {
                  const existe = Object.keys(estacoes).includes(valor);
                  setEstacaoValidadaID(existe ? valor : null);
                  return existe;
                }}
              />
            </div>

           

            <div className="secao_input cima">
              <InputMelhor
                label="Unidade de Medida"
                tag="unidade"
                width={50}
                value={dadosSensor.unidade}
                onChange={(e) => handleInputChange("unidade", e.target.value)}
                mostrarErro={errors.unidade}
                placeholder="Ex: °C, %, hPa"
              />
            </div>

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