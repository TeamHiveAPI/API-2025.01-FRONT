import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";
import Sidebar from "../../components/Sidebar/Sidebar";

import {IconUser} from  "@tabler/icons-react";

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

            <p>Lorem Ipsum Dolor Sit Amet Consecteur</p>

            <div className="home_teste">
                <BotaoCTA cor="cor_primario" escrito="Teste Botão" aparencia="primario" img={<IconUser stroke="2"/>} />
                <BotaoCTA cor="cor_primario" escrito="Teste Botão" aparencia="secundario" img={<IconUser stroke="2"/>} />
                <BotaoCTA cor="verde" escrito="Teste Botão" aparencia="secundario" img={<IconUser stroke="2"/>} />
                <BotaoCTA cor="vermelho" escrito="Teste Botão" aparencia="secundario" img={<IconUser stroke="2"/>} />
                <BotaoCTA cor="verde" escrito="Teste Botão" aparencia="primario" img={<IconUser stroke="2"/>} />
                <BotaoCTA cor="vermelho" escrito="Teste Botão" aparencia="primario" img={<IconUser stroke="2"/>} />
            </div>

          </div>
          <Footer />
        </div>
    </div>
  );
}