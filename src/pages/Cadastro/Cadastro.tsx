import { IconLockPassword, IconLogin2, IconUser } from "@tabler/icons-react";
import { Link } from "react-router-dom";

import { useState } from "react";
import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";

export default function Login() {

  const [emailFocused, setEmailFocused] = useState(false);
  const [senhaFocused, setSenhaFocused] = useState(false);

  return (
      <div className="login_container">
        <div className="login_esq">
          <img src="../tecsus_logo.svg" />
          <h2>Cadastre-se</h2>
          <p className="login_esq_subtitulo">Crie uma conta para receber acesso exclusivo ao dashboard.</p>

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
            <label>Senha</label>
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
            escrito="Criar Conta"
            img={<IconLogin2 stroke="1.5" />}
            type="submit"
          />

          <p className="login_nao_tem">Já possui uma conta?</p>
          <Link to="/login" className="login_cadastre">Faça Login</Link>
        </div>
        <div className="login_dir cadastro">
        </div>

      </div>
  );
}