import { useState } from "react";
import { IconAccessible, IconLockPassword, IconLogin2, IconUser } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/UseAuth";
import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";
import axios from "axios";

export default function Login() {

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [nomeFocused, setNomeFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [senhaFocused, setSenhaFocused] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/usuarios/", {
        nome,
        email,
        senha,
      });
  
      const {
        access_token,
        user_email,
        user_nivel,
        user_id,
        user_nome
      } = response.data;
  
      login({
        token: access_token,
        user_email,
        user_id,
        user_nivel,
        user_nome,
      });
  
      alert("Usuário criado com sucesso!");
      navigate("/");
    } catch (err: any) {
      console.error(err);
      alert("Erro ao cadastrar. Verifique os dados.");
    }
  };
  
  return (
      <div className="login_container">
        <div className="login_esq">
          <img src="../tecsus_logo.svg" />
          <h2>Cadastre-se</h2>

          <form className="login_form" onSubmit={handleSubmit}>
            <div className="login_input_wrapper cad">
              <label>Nome</label>
              <div className={`login_input_container ${nomeFocused ? "full" : ""}`}>
                <IconAccessible color="#808080" width={24} height={24} />
                <input
                  className={`login_input ${nomeFocused ? "full" : ""}`}
                  placeholder="Digite aqui..."
                  onFocus={() => setNomeFocused(true)}
                  onBlur={() => setNomeFocused(false)}
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>
            </div>

            <div className="login_input_wrapper cad">
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

            <div className="login_input_wrapper cad baixo">
              <label>Senha</label>
              <div className={`login_input_container ${senhaFocused ? "full" : ""}`}>
                <IconLockPassword color="#808080" width={24} height={24} />
                <input 
                  className={`login_input ${senhaFocused ? "full" : ""}`}
                  placeholder="Digite aqui..."
                  onFocus={() => setSenhaFocused(true)}
                  onBlur={() => setSenhaFocused(false)}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
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
          </form>

          <p className="login_nao_tem">Já possui uma conta?</p>
          <Link to="/login" className="login_cadastre">Faça Login</Link>
        </div>
        <div className="login_dir cadastro">
        </div>

      </div>
  );
}