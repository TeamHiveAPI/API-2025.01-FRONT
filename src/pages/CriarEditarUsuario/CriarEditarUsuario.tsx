import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles.scss";

import InputMelhor from "../../components/InputMelhor/InputMelhor";
import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";
import { IconPlus } from "@tabler/icons-react";
import BarraCima from "../../components/BarraCima/BarraCima";
import Swal from "sweetalert2";
import api from "../../services/api";
import PaginaWrapper from "../../components/PaginaWrapper/PaginaWrapper";

export default function CriarEditarUsuario() {
  const location = useLocation();
  const navigate = useNavigate();
  const dadosRecebidos = location.state || null;

  const [modoEdicao, setModoEdicao] = useState(false);
  const [senhasIguais, setSenhasIguais] = useState(true);

  const [dadosUsuario, setDadosUsuario] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const [errors, setErrors] = useState({
    nome: false,
    email: false,
    senha: false,
    confirmarSenha: false,
  });

  useEffect(() => {
    if (dadosRecebidos) {
      setModoEdicao(true);
      setDadosUsuario({
        nome: dadosRecebidos.nome || "",
        email: dadosRecebidos.email || "",
        senha: "",
        confirmarSenha: "",
      });
      setSenhasIguais(true);
    }
  }, [dadosRecebidos]);

  const handleInputChange = (tag: string, value: string) => {
    setDadosUsuario((prev) => ({ ...prev, [tag]: value }));
    setErrors((prev) => ({ ...prev, [tag]: false }));

    if (tag === "senha" || tag === "confirmarSenha") {
      const senha = tag === "senha" ? value : dadosUsuario.senha;
      const confirmacao = tag === "confirmarSenha" ? value : dadosUsuario.confirmarSenha;
      setSenhasIguais(senha === confirmacao);
    }
  };

const handleDelete = async (id: number) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/usuarios/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.detail === "Você não pode se excluir.") {
        Swal.fire({
          title: "Você não está sozinho",
          text: "Não tente excluir a si mesmo. Nós valorizamos sua vida. Caso precise de apoio emocional, o CVV está disponível 24h pelo número 188.",
          confirmButtonColor: "#74DB23",
          imageUrl: "../../public/valorizacao_vida.svg",
          imageWidth: 250
        });
        return;
      }
      throw new Error(errorData.detail || "Erro ao excluir usuário.");
    }

    Swal.fire({
      icon: "success",
      title: "Usuário excluído com sucesso!",
      confirmButtonColor: "#5751D5",
    }).then(() => {
      navigate("/usuarios")
    });

  } catch (error: any) {
    Swal.fire({
      icon: "error",
      title: "Erro ao excluir usuário",
      text: error.message || "Erro desconhecido.",
      confirmButtonColor: "#ED3C5C",
    });
  }
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const newErrors = {
    nome: !dadosUsuario.nome,
    email: !dadosUsuario.email,
    senha: !dadosUsuario.senha,
    confirmarSenha: !dadosUsuario.confirmarSenha,
  };

  setErrors(newErrors);

  if (Object.values(newErrors).some((error) => error)) {
    return;
  }

  // Verifica se as senhas estão diferentes, mesmo no modo edição
  if (!senhasIguais) {
    Swal.fire({
      icon: "error",
      title: "Senhas diferentes",
      text: "As senhas digitadas não coincidem. Por favor, verifique.",
      confirmButtonColor: "#ED3C5C",
    });
    return;
  }

  const jsonFinal = {
    nome: dadosUsuario.nome,
    email: dadosUsuario.email,
    senha: dadosUsuario.senha || undefined,
  };

  try {
    if (modoEdicao) {
      await api.put(`/usuarios/${dadosRecebidos.id}`, jsonFinal);

      const userIdLogado = localStorage.getItem("user_id");
      if (dadosRecebidos.id?.toString() === userIdLogado) {
        localStorage.setItem("user_nome", dadosUsuario.nome);
      }
    } else {
      await api.post("/usuarios/", jsonFinal);
    }

    Swal.fire({
      icon: "success",
      title: modoEdicao ? "Usuário atualizado com sucesso!" : "Usuário criado com sucesso!",
      confirmButtonColor: "#5751D5",
    }).then(() => {
      const usuarioLogadoId = localStorage.getItem("user_id");
      const usuarioEditadoId = dadosRecebidos?.id?.toString();

      navigate("/usuarios", {
        state: {
          sucesso: true,
          tipo: modoEdicao ? "editado" : "criado",
        },
      });

      if (modoEdicao && usuarioLogadoId === usuarioEditadoId) {
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
    });
  } catch (error) {
    console.error("Erro:", error);
    Swal.fire({
      icon: "error",
      title: modoEdicao ? "Erro ao atualizar usuário" : "Erro ao criar usuário",
      text: "Verifique os dados e tente novamente.",
      confirmButtonColor: "#ED3C5C",
    });
  }
};

  return (
    <PaginaWrapper>
      <BarraCima
        nome={modoEdicao ? "Editar Usuário" : "Criar Usuário"}
        tipo="voltar"
        entidade={modoEdicao ? "Usuário" : undefined}
        onDelete={modoEdicao ? () => handleDelete(dadosRecebidos.id) : undefined}
      />

      <form onSubmit={handleSubmit}>
        <div className="secao_input bottom">
          <InputMelhor
            label="Nome Completo"
            tag="nome"
            width={50}
            value={dadosUsuario.nome}
            onChange={(e) => handleInputChange("nome", e.target.value)}
            mostrarErro={errors.nome}
          />
          <InputMelhor
            label="Email"
            tag="email"
            width={50}
            value={dadosUsuario.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            mostrarErro={errors.email}
            type="email"
          />
        </div>

        <p className="subtitulo ceus_titulo_senha">
          {modoEdicao ? "Digite nova senha:" : "Digite a senha:"}
        </p>
        <div className="secao_input bottom">
          <InputMelhor
            label="Senha"
            tag="senha"
            width={50}
            value={dadosUsuario.senha}
            onChange={(e) => handleInputChange("senha", e.target.value)}
            mostrarErro={errors.senha}
          />

          <InputMelhor
            label="Confirmar Senha"
            tag="confirmarSenha"
            width={50}
            value={dadosUsuario.confirmarSenha}
            onChange={(e) => handleInputChange("confirmarSenha", e.target.value)}
            mostrarErro={errors.senha}
          />
        </div>

        <div className="cima80">
          <BotaoCTA
            aparencia="primario"
            cor="cor_primario"
            escrito={modoEdicao ? "Atualizar Usuário" : "Cadastrar Usuário"}
            img={<IconPlus stroke="2" />}
            type="submit"
          />
        </div>
      </form>
    </PaginaWrapper>
  );
}