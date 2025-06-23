/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconLockPassword, IconLogin2, IconUser } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import "./styles.scss";
import { useState } from "react";
import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";
import axios from "axios";
import { useAuth } from "../../hooks/UseAuth";

export default function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [senhaFocused, setSenhaFocused] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/login",
        new URLSearchParams({
          username: email,
          password: senha,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const {
        access_token,
        user_id,
        user_email,
        user_nivel,
        user_nome,
      } = response.data;

      login({
        token: access_token,
        user_id,
        user_email,
        user_nivel,
        user_nome,
      });
    } catch (err: any) {
      console.error(err);
      alert("Login falhou. Verifique suas credenciais.");
    }
  };

  return (
    <div className="login_container">
      <div className="login_esq">
        <img src="../tecsus_logo.svg" />
        <h2>Login</h2>
        <p className="login_esq_subtitulo">Entre para receber acesso exclusivo ao dashboard.</p>

        <form className="login_form" onSubmit={handleSubmit}>
          <div className="login_input_wrapper">
            <label>E-mail</label>
            <div className={`login_input_container ${emailFocused ? "full" : ""}`}>
              <IconUser color="#808080" width={24} height={24} />
              <input
                className={`login_input ${emailFocused ? "full" : ""}`}
                placeholder="Digite aqui..."
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="login_input_wrapper baixo">
            <div>
              <label>Senha</label>
              <p className="login_esqueci">Esqueci minha Senha</p>
            </div>
            <div className={`login_input_container ${senhaFocused ? "full" : ""}`}>
              <IconLockPassword color="#808080" width={24} height={24} />
              <input
                className={`login_input ${senhaFocused ? "full" : ""}`}
                placeholder="Digite aqui..."
                type="password"
                onFocus={() => setSenhaFocused(true)}
                onBlur={() => setSenhaFocused(false)}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
          </div>

          <BotaoCTA
            aparencia="primario"
            cor="cor_primario"
            escrito="Entrar"
            img={<IconLogin2 stroke="1.5" />}
            type="submit"
          />
        </form>

        <p className="login_nao_tem">Não tem uma conta?</p>
        <Link to="/cadastro" className="login_cadastre">Cadastre-se</Link>
      </div>

      <div className="login_dir"></div>
    </div>
  );
}