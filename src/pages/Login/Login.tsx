import { IconLockPassword, IconLogin2, IconUser } from "@tabler/icons-react";
import { Link } from "react-router-dom";

import "./styles.scss";
import { useState } from "react";
import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";

export default function Login() {

  const [emailFocused, setEmailFocused] = useState(false);
  const [senhaFocused, setSenhaFocused] = useState(false);

  return (
      <div className="login_container">
        <div className="login_esq">
          <img src="../tecsus_logo.svg" />
          <h2>Login</h2>
          <p className="login_esq_subtitulo">Entre para receber acesso exclusivo ao dashboard.</p>

          <div className="login_input_wrapper">
            <label>E-mail</label>
            <div className={`login_input_container ${emailFocused ? "full" : ""}`}>
              <IconUser color="#808080" width={24} height={24} />
              <input
                className={`login_input ${emailFocused ? "full" : ""}`}
                placeholder="Digite aqui..."
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
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
                onFocus={() => setSenhaFocused(true)}
                onBlur={() => setSenhaFocused(false)}
                type="password"
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

          <p className="login_nao_tem">Não tem uma conta?</p>
          <Link to="/cadastro" className="login_cadastre">Cadastre-se</Link>
        </div>
        <div className="login_dir">
        </div>

      </div>
  );
}