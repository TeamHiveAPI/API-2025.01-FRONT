import "./styles.scss";

import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import BarraCima from "../../components/BarraCima/BarraCima";
import CardUsuario from "../../components/CardUsuario/CardUsuario";

export default function Usuarios() {
  return (
    <div className="pagina_wrapper">
      <Sidebar />
        <div>
          <div className="pagina_container">

          <BarraCima nome="Usuários" tipo="usuario"/>

          <h4 className="num_cadastros">02 usuários cadastrados</h4>

          <div className="usu_lista">
            <CardUsuario id="1" admin={true} nome="Branquinho Diogo" email="diogobranquinho@tecsus.com.br" senha="branquinho123" data_criacao="18/03/2025" />
            <CardUsuario id="2" admin={false} nome="Maria da Silva" email="mariazinha@gmail.com" senha="maria123" data_criacao="18/03/2025" />
          </div>

          </div>
          <Footer />
        </div>
    </div>
  );
}