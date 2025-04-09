import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles.scss";

import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import InputMelhor from "../../components/InputMelhor/InputMelhor";
import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";
import { IconPlus } from "@tabler/icons-react";
import BarraCima from "../../components/BarraCima/BarraCima";
import Swal from "sweetalert2";

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
    setDadosUsuario((prev) => ({
      ...prev,
      [tag]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [tag]: false,
    }));

    if (tag === "senha" || tag === "confirmarSenha") {
      const senha = tag === "senha" ? value : dadosUsuario.senha;
      const confirmacao = tag === "confirmarSenha" ? value : dadosUsuario.confirmarSenha;
      setSenhasIguais(senha === confirmacao);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://127.0.0.1:8000/usuarios/${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error("Erro ao excluir sensor:", err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      nome: !dadosUsuario.nome,
      email: !dadosUsuario.email,
      senha: modoEdicao ? false : !dadosUsuario.senha,
      confirmarSenha: modoEdicao ? false : !dadosUsuario.confirmarSenha,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error) || (!modoEdicao && !senhasIguais)) {
      return;
    }

    const jsonFinal = {
      nome: dadosUsuario.nome,
      email: dadosUsuario.email,
      senha: dadosUsuario.senha || undefined,
    };

    const url = modoEdicao
      ? `http://127.0.0.1:8000/usuarios/${dadosRecebidos.id}`
      : "http://127.0.0.1:8000/usuarios/";

    const method = modoEdicao ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonFinal),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(modoEdicao ? "Erro ao atualizar usuário" : "Erro ao criar usuário");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Usuário salvo:", data);

        Swal.fire({
          icon: "success",
          title: modoEdicao ? "Usuário atualizado com sucesso!" : "Usuário criado com sucesso!",
          confirmButtonColor: "#5751D5",
        }).then(() => {
          navigate("/usuarios", {
            state: {
              sucesso: true,
              tipo: modoEdicao ? "editado" : "criado",
            },
          });
        });
      })
      .catch((error) => {
        console.error("Erro:", error);
        Swal.fire({
          icon: "error",
          title: modoEdicao ? "Erro ao atualizar usuário" : "Erro ao criar usuário",
          text: "Verifique os dados e tente novamente.",
          confirmButtonColor: "#ED3C5C",
        });
      });
  };

  return (
    <div className="pagina_wrapper">
      <Sidebar />
      <div>
        <div className="pagina_container">
          <BarraCima
            nome={modoEdicao ? "Editar Usuário" : "Criar Usuário"}
            tipo="voltar"
            entidade={modoEdicao ? "Usuário" : undefined}
            onDelete={() => handleDelete(dadosRecebidos.id)}
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
                width={100}
                value={dadosUsuario.senha}
                onChange={(e) => handleInputChange("senha", e.target.value)}
                mostrarErro={errors.senha}
              />
            </div>

            <div className="secao_input bottom ceus_senha_spacing">
              <InputMelhor
                label="Confirmar Senha"
                tag="confirmarSenha"
                width={100}
                value={dadosUsuario.confirmarSenha}
                onChange={(e) => handleInputChange("confirmarSenha", e.target.value)}
                mostrarErro={errors.confirmarSenha || !senhasIguais}
                mensagemErro={
                  errors.confirmarSenha
                    ? "Preencha este campo"
                    : !senhasIguais
                    ? "As senhas precisam ser iguais"
                    : undefined
                }
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
        </div>
        <Footer />
      </div>
    </div>
  );
}