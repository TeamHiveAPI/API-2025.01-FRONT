import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import InputMelhor from "../../components/InputMelhor/InputMelhor";
import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";
import { IconPlus } from "@tabler/icons-react";
import BarraCima from "../../components/BarraCima/BarraCima";

export default function CriarEditarTipoSensor() {
  const location = useLocation();
  const navigate = useNavigate();
  const dadosRecebidos = location.state || null;

  const [modoEdicao, setModoEdicao] = useState(false);
  const [dadosTipo, setDadosTipo] = useState({
    nome: "",
    descricao: ""
  });

  useEffect(() => {
    if (dadosRecebidos) {
      setModoEdicao(true);
      setDadosTipo({
        nome: dadosRecebidos.nome || "",
        descricao: dadosRecebidos.descricao || ""
      });
    }
  }, [dadosRecebidos]);

  const [errors, setErrors] = useState({
    nome: false,
    descricao: false
  });

  const handleInputChange = (tag: string, value: string) => {
    setDadosTipo(prev => ({ ...prev, [tag]: value }));
    setErrors(prev => ({ ...prev, [tag]: false }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      nome: !dadosTipo.nome,
      descricao: !dadosTipo.descricao
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some(error => error)) return;

    const jsonFinal = {
      nome: dadosTipo.nome,
      descricao: dadosTipo.descricao
    };

    try {
      const response = await fetch("http://localhost:8000/tipo_parametros/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonFinal)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Erro ao criar o tipo de sensor.");
      }

      const data = await response.json();
      console.log("Tipo de sensor criado com ID:", data);
      // Redireciona de volta para a listagem ou exibe uma mensagem de sucesso
      navigate("/tipo-sensores");
    } catch (error: any) {
      console.error("Erro:", error.message);
      // Você pode implementar uma forma de exibir o erro para o usuário, se desejar
    }
  };

  return (
    <div className="pagina_wrapper">
      <Sidebar />
      <div>
        <div className="pagina_container">
          <BarraCima 
            nome={modoEdicao ? "Editar Tipo Sensor" : "Criar Tipo Sensor"} 
            tipo="voltar" 
            entidade={modoEdicao ? "Tipo Sensor" : undefined} 
          />

          <form onSubmit={handleSubmit}>
            <div className="secao_input cima">
              <InputMelhor
                label="Nome"
                tag="nome"
                width={50}
                value={dadosTipo.nome}
                onChange={(e) => handleInputChange("nome", e.target.value)}
                mostrarErro={errors.nome}
                placeholder="Ex: Temperatura, Umidade"
              />
            </div>

            <div className="secao_input cima">
              <InputMelhor
                label="Descrição"
                tag="descricao"
                width={100}
                value={dadosTipo.descricao}
                onChange={(e) => handleInputChange("descricao", e.target.value)}
                mostrarErro={errors.descricao}
                placeholder="Descrição do tipo sensor"
              />
            </div>

            <div className="cima80">
              <BotaoCTA
                aparencia="primario"
                cor="cor_primario"
                escrito={modoEdicao ? "Atualizar Tipo Sensor" : "Cadastrar Tipo Sensor"}
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
