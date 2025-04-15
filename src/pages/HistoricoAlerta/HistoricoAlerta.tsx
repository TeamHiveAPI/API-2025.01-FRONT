import Sidebar from "../../components/Sidebar/Sidebar";

import "./styles.scss";

import Footer from "../../components/Footer/Footer";
import BarraCima from "../../components/BarraCima/BarraCima";
import CardAlertaAtivo from "../../components/CardAlertaAtivo/CardAlertaAtivo";

export default function Home() {

  return (
    <div className="pagina_wrapper">
      <Sidebar />
        <div>
            <div className="pagina_container">

            <BarraCima nome="Histórico" tipo="home"/>

            <h4 className="hial_subtitulo">Alertas Ativos</h4>
          
            <CardAlertaAtivo
                id="1"
                alertaAtivo={true}
                titulo={"Temperatura menor que 5°C"}
                tempoAtivo="2h30min"
                descricaoAlerta="Atenção: Temperatura abaixo de 5°C. Evite a exposição ao frio intenso. Lorem Ipsum is simply dummy text
                of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                estacao="Nome da Estação Aqui"
                coordenadas={[-23.162170, -45.794907]}
            />

            <CardAlertaAtivo
                id="2"
                alertaAtivo={true}
                titulo={"Temperatura menor que 5°C"}
                tempoAtivo="2h30min"
                descricaoAlerta="Atenção: Temperatura abaixo de 5°C. Evite a exposição ao frio intenso. Lorem Ipsum is simply dummy text
                of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                estacao="Nome da Estação Aqui"
                coordenadas={[-23.162170, -45.794907]}
            />

          </div>
          <Footer />
        </div>
    </div>
  );
}