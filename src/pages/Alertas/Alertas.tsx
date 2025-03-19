import "./styles.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import BarraCima from "../../components/BarraCima/BarraCima";
import CardAlerta from "../../components/CardAlerta/CardAlerta";

export default function Alertas() {
  const alertas = [
    {
      id: "1",
      estacao_id: "estacao_1",
      sensor_id: "sensor_1",
      condicao: "Temperatura acima de 40°C",
      mensagem: "Alerta para temperaturas acima de 40°C.",
      data: "2023-10-01",
      hora: "12:00",
      status: "ativo",
    },
    {
      id: "2",
      estacao_id: "estacao_2",
      sensor_id: "sensor_2",
      condicao: "Umidade abaixo de 20%",
      mensagem: "Alerta para umidade abaixo de 20%.",
      data: "2023-10-02",
      hora: "14:30",
      status: "ativo",
    },
    {
      id: "3",
      estacao_id: "estacao_3",
      sensor_id: "sensor_3",
      condicao: "Vento acima de 80 km/h",
      mensagem: "Alerta para ventos acima de 80 km/h.",
      data: "2023-10-03",
      hora: "10:15",
      status: "ativo",
    },
  ];

  return (
    <div className="pagina_wrapper">
      <Sidebar />
      <div>
        <div className="pagina_container">
          <BarraCima nome="Alertas" tipo="alerta" />

          <h4 className="num_cadastros">{alertas.length} alertas cadastrados</h4>

          <div className="alert_lista">
            {alertas.map((alerta) => (
              <CardAlerta
                key={alerta.id}
                id={alerta.id}
                estacao_id={alerta.estacao_id}
                sensor_id={alerta.sensor_id}
                condicao={alerta.condicao}
                mensagem={alerta.mensagem}
                data={alerta.data}
                hora={alerta.hora}
                status={alerta.status}
              />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}