import "./styles.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import BarraCima from "../../components/BarraCima/BarraCima";
import CardSensor from "../../components/CardSensor/CardSensor";

export default function Sensores() {
  const sensores = [
    {
      id: "1",
      titulo: "Sensor de Temperatura",
      unidOuSensor: "°C",
      estacao: "FATEC",
      estacao_id: "1"
    },
    {
      id: "2",
      titulo: "Sensor de Umidade",
      unidOuSensor: "%",
      estacao: "Eugênio de Melo",
      estacao_id: "2"
    },
    {
      id: "3",
      titulo: "Sensor de Pressão",
      unidOuSensor: "hPa",
      estacao: "Parque de Inovação",
      estacao_id: "3"
    },
  ];

  return (
    <div className="pagina_wrapper">
      <Sidebar />
      <div>
        <div className="pagina_container">
          <BarraCima nome="Sensores" tipo="sensor" />

          <h4 className="num_cadastros">{sensores.length} sensores cadastrados</h4>

          <div className="sensor_lista">
            {sensores.map((sensor) => (
              <CardSensor
                key={sensor.id}
                id={sensor.id}
                titulo={sensor.titulo}
                unidOuSensor={sensor.unidOuSensor}
                estacao={sensor.estacao}
                estacao_id={sensor.estacao_id}
              />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}