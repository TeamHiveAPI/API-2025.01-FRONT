import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./styles.scss";

import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import InputMelhor from "../../components/InputMelhor/InputMelhor";
import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";
import { IconPlus } from "@tabler/icons-react";
import BarraCima from "../../components/BarraCima/BarraCima";

export default function CriarEditarUsuario() {
  const location = useLocation();
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
        senha: "senha123",
        confirmarSenha: "senha123",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      nome: !dadosUsuario.nome,
      email: !dadosUsuario.email,
      senha: !dadosUsuario.senha,
      confirmarSenha: !dadosUsuario.confirmarSenha,
    };

    setErrors(newErrors);

    if (
      Object.values(newErrors).some((error) => error) ||
      !senhasIguais
    ) {
      return;
    }

    const jsonFinal = {
      nome: dadosUsuario.nome,
      email: dadosUsuario.email,
      senha: dadosUsuario.senha,
    };

    console.log("JSON do Usuário a ser enviado:", jsonFinal);
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