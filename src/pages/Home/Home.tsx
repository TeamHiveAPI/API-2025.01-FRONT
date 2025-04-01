import Sidebar from "../../components/Sidebar/Sidebar";

import "./styles.scss";

import Footer from "../../components/Footer/Footer";
import BarraCima from "../../components/BarraCima/BarraCima";

export default function Home() {
  return (
    <div className="pagina_wrapper">
      <Sidebar />
        <div>
          <div className="pagina_container home">

           <BarraCima nome="Dashboard" tipo="home"/>

          <div className="mensagem">
            <img src="../mensagem.png" />
          </div>

          </div>
          <Footer />
        </div>
    </div>
  );
}