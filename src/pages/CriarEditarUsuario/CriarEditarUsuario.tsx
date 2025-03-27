import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles.scss";

import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import InputMelhor from "../../components/InputMelhor/InputMelhor";
import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";
import { IconPlus } from "@tabler/icons-react";
import BarraCima from "../../components/BarraCima/BarraCima";

export default function CriarEditarUsuario() {
  const location = useLocation();
  const navigate = useNavigate();
  const dadosRecebidos = location.state || null;

  const [modoEdicao, setModoEdicao] = useState(false);
  const [senhasIguais, setSenhasIguais] = useState(true);

  // Estado inicial dos dados do usuário
  const [dadosUsuario, setDadosUsuario] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  // Estado para erros de validação
  const [errors, setErrors] = useState({
    nome: false,
    email: false,
    senha: false,
    confirmarSenha: false,
  });

  const handleDelete = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/usuarios/1", {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir usuário");
      }

      console.log("Usuário excluído com sucesso");
      navigate("/usuarios"); // Redireciona para a lista de usuários
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao excluir usuário. Por favor, tente novamente.");
    }
  };

  // Carregar dados recebidos para edição
  useEffect(() => {
    if (dadosRecebidos) {
      setModoEdicao(true);
      setDadosUsuario({
        nome: dadosRecebidos.nome || "",
        email: dadosRecebidos.email || "",
        senha: "", // Senha começa vazia na edição
        confirmarSenha: "",
      });
      setSenhasIguais(true);
    }
  }, [dadosRecebidos]);

  // Função para lidar com mudanças nos inputs
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

  // Função para lidar com o envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar campos
    const newErrors = {
      nome: !dadosUsuario.nome,
      email: !dadosUsuario.email,
      senha: modoEdicao ? false : !dadosUsuario.senha, // Senha é opcional na edição
      confirmarSenha: modoEdicao ? false : !dadosUsuario.confirmarSenha,
    };

    setErrors(newErrors);

    if (
      Object.values(newErrors).some((error) => error) ||
      (!modoEdicao && !senhasIguais)
    ) {
      return;
    }

    // Criar o objeto JSON final
    const jsonFinal = {
      nome: dadosUsuario.nome,
      email: dadosUsuario.email,
      senha: dadosUsuario.senha || undefined, // Enviar senha apenas se preenchida
    };

    console.log("JSON do Usuário a ser enviado:", jsonFinal);

    // URL da API
    const url = modoEdicao
      ? `http://127.0.0.1:8000/usuarios/${dadosRecebidos.id}`
      : "http://127.0.0.1:8000/usuarios/";

    // Método HTTP
    const method = modoEdicao ? "PUT" : "POST";

    // Fazer a chamada à API
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
        console.log(modoEdicao ? "Usuário atualizado com sucesso:" : "Usuário criado com sucesso:", data);
        alert(modoEdicao ? "Usuário atualizado com sucesso!" : "Usuário criado com sucesso!");
        navigate("/usuarios"); // Redirecionar para a lista de usuários
      })
      .catch((error) => {
        console.error("Erro:", error);
        alert(modoEdicao ? "Erro ao atualizar usuário. Por favor, tente novamente." : "Erro ao criar usuário. Por favor, tente novamente.");
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
            onDelete={handleDelete}
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
                // type="password" removido para exibir caracteres
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
                // type="password" removido para exibir caracteres
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