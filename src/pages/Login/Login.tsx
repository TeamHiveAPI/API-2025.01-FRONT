/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconLockPassword, IconLogin2, IconUser } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import "./styles.scss";
import { useState } from "react";
import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";
import { useAuth } from "../../hooks/UseAuth";
import api from "../../services/api";

export default function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [senhaFocused, setSenhaFocused] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Enviando dados de login:', { username: email, password: senha });
      
      const response = await api.post(
        "/auth/login",
        {
          username: email,
          password: senha
        }
      );
      
      console.log('Resposta do login:', response.data);
      console.log('Headers da resposta:', response.headers);
      console.log('Status da resposta:', response.status);

      const {
        access_token,
        user_id,
        user_email,
        user_nivel,
        user_nome,
      } = response.data;

      console.log('Dados extraídos da resposta:', {
        access_token,
        user_id,
        user_email,
        user_nivel,
        user_nome
      });

      const userData = {
        token: access_token,
        user_id,
        user_email,
        user_nivel,
        user_nome,
      };

      console.log('Chamando função login com:', userData);
      login(userData);

      // Verifica se os dados foram armazenados no localStorage
      setTimeout(() => {
        console.log('Estado do localStorage após login:', {
          token: localStorage.getItem('token'),
          user_id: localStorage.getItem('user_id'),
          user_email: localStorage.getItem('user_email'),
          user_nivel: localStorage.getItem('user_nivel'),
          user_nome: localStorage.getItem('user_nome')
        });
      }, 100);
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

        <form className="login_form" role="form" onSubmit={handleSubmit}>
          <div className="login_input_wrapper">
            <label htmlFor="login-email">E-mail</label>
            <div className={`login_input_container ${emailFocused ? "full" : ""}`}>
              <IconUser color="#808080" width={24} height={24} />
              <input
                id="login-email"
                className={`login_input ${emailFocused ? "full" : ""}`}
                placeholder="E-mail"
                type="email"
                autoComplete="username"
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="login_input_wrapper baixo">
            <div>
              <label htmlFor="login-password">Senha</label>
              <p className="login_esqueci">Esqueci minha Senha</p>
            </div>
            <div className={`login_input_container ${senhaFocused ? "full" : ""}`}>
              <IconLockPassword color="#808080" width={24} height={24} />
              <input
                id="login-password"
                className={`login_input ${senhaFocused ? "full" : ""}`}
                placeholder="Senha"
                type="password"
                autoComplete="current-password"
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