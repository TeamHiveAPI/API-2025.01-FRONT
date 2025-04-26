import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../services/api";

import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import InputMelhor from "../../components/InputMelhor/InputMelhor";
import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";
import { IconPlus } from "@tabler/icons-react";
import BarraCima from "../../components/BarraCima/BarraCima";
import Swal from "sweetalert2";

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

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/tipo_parametros/${id}`);
  
      Swal.fire({
        icon: "success",
        title: "Tipo de Sensor excluído com sucesso!",
        confirmButtonColor: "#5751D5",
      }).then(() => navigate(-1));
    } catch (err: any) {
      const errorText = err?.response?.data?.detail || err.message;
  
      if (
        errorText.includes("violates foreign key constraint") ||
        errorText.includes("violação de chave estrangeira") ||
        errorText.includes("violates") ||
        errorText.includes("referenciada pela tabela")
      ) {
        Swal.fire({
          icon: "error",
          title: "Não é possível excluir",
          text: "Este tipo de sensor está vinculado a um ou mais sensores. Desvincule os sensores antes de tentar excluir.",
          confirmButtonColor: "#ED3C5C",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Erro ao excluir",
          text: errorText || "Ocorreu um erro ao tentar excluir o tipo de sensor.",
          confirmButtonColor: "#ED3C5C",
        });
      }
    }
  };
    

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const newErrors = {
      nome: !dadosTipo.nome,
      descricao: !dadosTipo.descricao
    };
  
    setErrors(newErrors);
    if (Object.values(newErrors).some(error => error)) return;
  
    try {
      if (modoEdicao && dadosRecebidos?.id) {
        await api.put(`/tipo_parametros/${dadosRecebidos.id}`, {
          nome: dadosTipo.nome,
          descricao: dadosTipo.descricao
        });
      } else {
        await api.post("/tipo_parametros/", {
          nome: dadosTipo.nome,
          descricao: dadosTipo.descricao
        });
      }
    
      Swal.fire({
        icon: "success",
        title: modoEdicao
          ? "Tipo de Sensor atualizado com sucesso!"
          : "Tipo de Sensor cadastrado com sucesso!",
        confirmButtonColor: "#5751D5"
      }).then(() => navigate(-1));
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: error?.response?.data?.detail || error.message || "Erro desconhecido ao salvar tipo de sensor.",
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
            nome={modoEdicao ? "Editar Tipo Sensor" : "Criar Tipo Sensor"}
            tipo="voltar"
            entidade={modoEdicao ? "Tipo Sensor" : undefined}
            onDelete={() => handleDelete(dadosRecebidos.id)}
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
