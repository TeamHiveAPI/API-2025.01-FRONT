import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import "./styles.scss";
import styles_select from "./styles_select";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import InputMelhor from "../../components/InputMelhor/InputMelhor";
import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";
import { IconPlus } from "@tabler/icons-react";
import BarraCima from "../../components/BarraCima/BarraCima";

interface Sensor {
  value: string;
  label: string;
}

export default function CriarEditarEstacao() {
  const location = useLocation();
  const dadosRecebidos = location.state || null;

  const [modoEdicao, setModoEdicao] = useState(false);
  const [mensagem, setMensagem] = useState<string>("");

  const [dadosEstacao, setDadosEstacao] = useState({
    nome: "",
    latitude: "",
    longitude: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    cep: "",
    status: true,
    sensores: [] as Sensor[],
  });

  const sensoresEstaticos = [
    { value: "01", label: "Temperatura - ID 01" },
    { value: "02", label: "Vento - ID 02" },
    { value: "03", label: "Vento - ID 03" },
    { value: "04", label: "Umidade - ID 04" },
    { value: "05", label: "Umidade - ID 05" },
  ];

  useEffect(() => {
    if (dadosRecebidos) {
      setModoEdicao(true);
      const enderecoParts = dadosRecebidos.endereco.split(",");
      const rua = enderecoParts[0]?.trim() || "";
      const numeroBairro = enderecoParts[1]?.split(" - ") || ["", ""];
      const numero = numeroBairro[0]?.trim() || "";
      const bairroCidadeCep = enderecoParts[2]?.split(" - ") || ["", ""];
      const bairro = numeroBairro[1]?.trim() || "";
      const cidade = bairroCidadeCep[0]?.trim() || "";
      const cep = bairroCidadeCep[1]?.trim() || "";

      setDadosEstacao({
        nome: dadosRecebidos.titulo,
        latitude: dadosRecebidos.latitude,
        longitude: dadosRecebidos.longitude,
        rua,
        numero,
        bairro,
        cidade,
        cep,
        status: dadosRecebidos.ativo,
        sensores: dadosRecebidos.sensores.map((sensor: any, index: any) => ({
          value: `0${index + 1}`,
          label: sensor,
        })),
      });
    }
  }, [dadosRecebidos]);

  const [errors, setErrors] = useState({
    nome: false,
    latitude: false,
    longitude: false,
    rua: false,
    numero: false,
    bairro: false,
    cidade: false,
    cep: false,
  });

  const handleInputChange = (tag: string, value: string) => {
    if (tag === "cep") {
      value = formatCep(value);
    } else if (tag === "numero") {
      value = value.replace(/\D/g, "");
    } else if (tag === "latitude" || tag === "longitude") {
      value = value.replace(/[^0-9.-]/g, "");
    }

    setDadosEstacao((prev) => ({
      ...prev,
      [tag]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [tag]: false,
    }));
  };

  const formatCep = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{5})(\d{0,3})/, "$1-$2")
      .replace(/-$/, "");
  };

  const handleStatusChange = (status: boolean) => {
    setDadosEstacao((prev) => ({
      ...prev,
      status,
    }));
  };

  const handleSensoresChange = (selectedOptions: any) => {
    setDadosEstacao((prev) => ({
      ...prev,
      sensores: selectedOptions || [],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem("");

    let newErrors = {
      nome: !dadosEstacao.nome,
      latitude: !dadosEstacao.latitude || isNaN(parseFloat(dadosEstacao.latitude)),
      longitude: !dadosEstacao.longitude || isNaN(parseFloat(dadosEstacao.longitude)),
      rua: !dadosEstacao.rua,
      numero: !dadosEstacao.numero,
      bairro: !dadosEstacao.bairro,
      cidade: !dadosEstacao.cidade,
      cep: !dadosEstacao.cep,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      setMensagem("Por favor, preencha todos os campos corretamente.");
      return;
    }

    const dadosParaEnviar = {
      nome: dadosEstacao.nome,
      cep: dadosEstacao.cep,
      rua: dadosEstacao.rua,
      bairro: dadosEstacao.bairro,
      cidade: dadosEstacao.cidade,
      numero: dadosEstacao.numero,
      latitude: parseFloat(dadosEstacao.latitude),
      longitude: parseFloat(dadosEstacao.longitude),
      data_instalacao: new Date().toISOString().split("T")[0],
      status: dadosEstacao.status ? "ativa" : "inativa",
    };

    try {
      let response;
      if (modoEdicao) {
        if (!dadosRecebidos?.id) {
          setMensagem("Erro: ID da estação não encontrado no modo de edição.");
          return;
        }
        response = await fetch(`http://127.0.0.1:8000/estacoes/${dadosRecebidos.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dadosParaEnviar),
        });
      } else {
        response = await fetch("http://127.0.0.1:8000/estacoes/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dadosParaEnviar),
        });
      }

      if (response.ok) {
        const data = await response.json();
        setMensagem(modoEdicao ? "Estação atualizada com sucesso!" : "Estação cadastrada com sucesso!");
        if (!modoEdicao) {
          setDadosEstacao({
            nome: "",
            latitude: "",
            longitude: "",
            rua: "",
            numero: "",
            bairro: "",
            cidade: "",
            cep: "",
            status: true,
            sensores: [],
          });
        }
      } else {
        setMensagem(`Erro ao salvar estação: ${response.statusText}`);
      }
    } catch (error) {
      setMensagem("Erro ao conectar com o servidor. Verifique se o backend está rodando.");
    }
  };

  return (
    <div className="pagina_wrapper">
      <Sidebar />
      <div>
        <div className="pagina_container">
          <BarraCima nome={modoEdicao ? "Editar Estação" : "Criar Estação"} tipo={"voltar"} entidade={modoEdicao ? "Estação" : undefined} />
          {mensagem && <p style={{ color: mensagem.includes("Erro") ? "red" : "green" }}>{mensagem}</p>}
          <form onSubmit={handleSubmit}>
            <div className="cees_cima">
              <InputMelhor
                label="Nome"
                tag="nome"
                width={50}
                value={dadosEstacao.nome}
                onChange={(e) => handleInputChange("nome", e.target.value)}
                mostrarErro={errors.nome}
              />
              <div className="cees_cima_dir">
                <h4>Estado Inicial</h4>
                <div className="cees_cima_inputs">
                  <div className={`cees_input_radius ${dadosEstacao.status ? "escolhido" : ""}`} onClick={() => handleStatusChange(true)}>
                    <p>Ativa</p>
                  </div>
                  <div className={`cees_input_radius ${!dadosEstacao.status ? "escolhido" : ""}`} onClick={() => handleStatusChange(false)}>
                    <p>Inativa</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="subtitulo">Endereço</p>
            <div className="secao_input cima">
              <InputMelhor label="Rua" tag="rua" width={33} value={dadosEstacao.rua} onChange={(e) => handleInputChange("rua", e.target.value)} mostrarErro={errors.rua} />
              <InputMelhor label="Bairro" tag="bairro" width={33} value={dadosEstacao.bairro} onChange={(e) => handleInputChange("bairro", e.target.value)} mostrarErro={errors.bairro} />
              <InputMelhor label="Cidade" tag="cidade" width={33} value={dadosEstacao.cidade} onChange={(e) => handleInputChange("cidade", e.target.value)} mostrarErro={errors.cidade} />
            </div>
            <div className="secao_input cima">
              <InputMelhor label="CEP" tag="cep" width={25} value={dadosEstacao.cep} onChange={(e) => handleInputChange("cep", e.target.value)} maxLength={9} mostrarErro={errors.cep} />
              <InputMelhor label="Número" tag="numero" width={25} value={dadosEstacao.numero} onChange={(e) => handleInputChange("numero", e.target.value)} mostrarErro={errors.numero} />
              <InputMelhor label="Latitude" tag="latitude" width={33} value={dadosEstacao.latitude} onChange={(e) => handleInputChange("latitude", e.target.value)} mostrarErro={errors.latitude} />
              <InputMelhor label="Longitude" tag="longitude" width={33} value={dadosEstacao.longitude} onChange={(e) => handleInputChange("longitude", e.target.value)} mostrarErro={errors.longitude} />
            </div>
            <div className="cees_card_endereco">
              <h4>Endereço Formatado:</h4>
              <p>
                {dadosEstacao.rua && dadosEstacao.numero && dadosEstacao.bairro && dadosEstacao.cidade && dadosEstacao.cep
                  ? `${dadosEstacao.rua}, ${dadosEstacao.numero} - ${dadosEstacao.bairro}, ${dadosEstacao.cidade} - ${dadosEstacao.cep}`
                  : "Preencha todos os campos de endereço para gerar a formatação."}
              </p>
            </div>
            <div className="cees_escolher_sensores cima">
              <p className="subtitulo baixo">Sensores</p>
              <Select
                options={sensoresEstaticos}
                isMulti
                placeholder="Selecione os sensores"
                value={dadosEstacao.sensores}
                onChange={handleSensoresChange}
                styles={styles_select}
              />
            </div>
            <div className="cima80">
              <BotaoCTA
                aparencia="primario"
                cor="cor_primario"
                escrito={modoEdicao ? "Atualizar Estação" : "Cadastrar Estação"}
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