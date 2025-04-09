import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
      const response = await fetch(`http://127.0.0.1:8000/tipo_parametros/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        const errorText = await response.text();
  
        // Checa se veio o erro de ForeignKeyViolation
        if (errorText.includes("violates foreign key constraint") || errorText.includes("violação de chave estrangeira") || errorText.includes("violates") || errorText.includes("referenciada pela tabela")) {
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
            text: "Ocorreu um erro ao tentar excluir o tipo de sensor.",
            confirmButtonColor: "#ED3C5C",
          });
        }
  
        return;
      }
  
      Swal.fire({
        icon: "success",
        title: "Tipo de Sensor excluído com sucesso!",
        confirmButtonColor: "#5751D5",
      }).then(() => navigate(-1));
  
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Erro inesperado",
        text: err.message || "Erro desconhecido ao tentar excluir tipo de sensor.",
        confirmButtonColor: "#ED3C5C",
      });
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
  
    const jsonFinal = {
      nome: dadosTipo.nome,
      descricao: dadosTipo.descricao
    };
  
    try {
      const response = await fetch(
        modoEdicao && dadosRecebidos?.id
          ? `http://localhost:8000/tipo_parametros/${dadosRecebidos.id}`
          : "http://localhost:8000/tipo_parametros/",
        {
          method: modoEdicao ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(jsonFinal)
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Erro ao salvar o tipo de sensor.");
      }
  
      const data = await response.json();
      console.log(modoEdicao ? "Tipo atualizado:" : "Tipo criado:", data);
  
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
        text: error.message || "Erro desconhecido ao salvar tipo de sensor.",
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
