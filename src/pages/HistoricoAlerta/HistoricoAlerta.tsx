import Sidebar from "../../components/Sidebar/Sidebar";

import "./styles.scss";

import Footer from "../../components/Footer/Footer";
import BarraCima from "../../components/BarraCima/BarraCima";
import CardAlertaAtivo from "../../components/CardAlertaAtivo/CardAlertaAtivo";

export default function Home() {

  const alertasAtivos = [
    {
      id: "1",
      alertaAtivo: true,
      titulo: "Temperatura menor que 5°C",
      tempoAtivo: "2h30min",
      descricaoAlerta: "Atenção: Temperatura abaixo de 5°C. Evite a exposição ao frio intenso. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      estacao: "Nome da Estação Aqui",
      coordenadas: [-23.162170, -45.794907] as [number, number],
      expandido: true,
    },
    {
      id: "2",
      alertaAtivo: true,
      titulo: "Temperatura menor que 5°C",
      tempoAtivo: "2h30min",
      descricaoAlerta: "Atenção: Temperatura abaixo de 5°C. Evite a exposição ao frio intenso. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      estacao: "Nome da Estação Aqui",
      coordenadas: [-23.162170, -45.794907] as [number, number],
    },
  ];
  
  const alertasPassados = [
    {
      id: "3",
      alertaAtivo: false,
      titulo: "Temperatura menor que 5°C",
      tempoAtivo: "2h30min",
      descricaoAlerta: "Atenção: Temperatura abaixo de 5°C. Evite a exposição ao frio intenso. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      estacao: "Nome da Estação Aqui",
      coordenadas: [-23.162170, -45.794907] as [number, number],
    },
    {
      id: "4",
      alertaAtivo: false,
      titulo: "Temperatura menor que 5°C",
      tempoAtivo: "2h30min",
      descricaoAlerta: "Atenção: Temperatura abaixo de 5°C. Evite a exposição ao frio intenso. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      estacao: "Nome da Estação Aqui",
      coordenadas: [-23.162170, -45.794907] as [number, number],
    },
    {
      id: "5",
      alertaAtivo: false,
      titulo: "Temperatura menor que 5°C",
      tempoAtivo: "2h30min",
      descricaoAlerta: "Atenção: Temperatura abaixo de 5°C. Evite a exposição ao frio intenso. Lorem Ipsum",
      estacao: "Nome da Estação Aqui",
      coordenadas: [-23.162170, -45.794907] as [number, number],
    },
  ];
  

  return (
    <div className="pagina_wrapper">
      <Sidebar />
        <div>
            <div className="pagina_container">

            <BarraCima nome="Histórico" tipo="home"/>

            <h4 className="hial_subtitulo">Alertas Ativos</h4>
          
            {alertasAtivos.map((alerta) => (
              <CardAlertaAtivo key={alerta.id} {...alerta} />
            ))}

          <h4 className="hial_subtitulo baixo">Alertas Passados</h4>

          {alertasPassados.map((alerta) => (
            <CardAlertaAtivo key={alerta.id} {...alerta} />
          ))}

          </div>
          <Footer />
        </div>
    </div>
  );
}