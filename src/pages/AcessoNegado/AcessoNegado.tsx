import { Link, useNavigate } from "react-router-dom";
import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";
import "./styles.scss";
import { IconArrowBackUp } from "@tabler/icons-react";

export default function AcessoNegado() {

const navigate = useNavigate();

  return (
    <div className="aces_wrapper">
        <div className="aces_container">
            <div className="aces_esq">
                <img src="./ilustracao_403.png" />
            </div>

            <div className="aces_dir">
                <div className="aces_dir_cima">
                    <h4>Oops!</h4>
                    <p>
                    Você não tem permissão para visualizar esta página.{" "}
                    <Link to="/cadastro">Crie uma conta</Link> ou{" "}
                    <Link to="/login">faça login</Link> para ter acesso total ao nosso Dashboard.
                    </p>
                </div>
                <div>
                    <BotaoCTA
                        aparencia="primario"
                        cor="cor_primario"
                        escrito="Voltar"
                        img={<IconArrowBackUp stroke="1.5" />}
                        type="submit"
                        onClick={() => navigate(-1)}
                    />
                </div>
            </div>
        </div>
    </div>
  );
}
