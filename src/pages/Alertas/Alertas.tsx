import "./styles.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import BarraCima from "../../components/BarraCima/BarraCima";
import CardAlerta from "../../components/CardAlerta/CardAlerta";

export default function Alertas() {
  const alertas = [
    {
      id: "1",
      estacao: "FATEC",
      estacao_id: 1,
      sensor: "Temperatura",
      sensor_id: 2,
      unidade: "°C",
      condicao: "maior_igual",
      num_condicao: 40,
      mensagem: "Foi detectado altas temperaturas ná area da FATEC de São José dos Campos. É recomendável ficar na sombra e se hidratar bem.",
    },
    {
      id: "2",
      estacao: "Eugênio de Melo",
      estacao_id: 2,
      sensor: "Umidade",
      sensor_id: 1,
      unidade: "%",
      condicao: "menor",
      num_condicao: 20,
      mensagem: "Foi detectado umidade relativa do ar muito baixa na região de Eugênio de Melo. Mantenha-se hidratado e evite atividades físicas intensas."
    },
    {
      id: "3",
      estacao: "Parque de Inovação",
      estacao_id: 3,
      sensor: "Pressão",
      sensor_id: 3,
      unidade: "hPa",
      condicao: "maior_igual",
      num_condicao: 250,
      mensagem: "Pressão atmosférica mais baixa que o normal foi registrada no Parque de Inovação. Verifique o funcionamento de equipamentos sensíveis à pressão."
    },
  ];

  return (
    <div className="pagina_wrapper">
      <Sidebar />
      <div>
        <div className="pagina_container">
          <BarraCima nome="Alertas" tipo="alerta" />

          <h4 className="num_cadastros">{alertas.length} alertas cadastrados</h4>

          <div className="alerta_lista">
            {alertas.map((alerta) => (
              <CardAlerta
                key={alerta.id}
                id={alerta.id}
                titulo={`${alerta.sensor} ${alerta.condicao === "maior_igual" ? "maior ou igual a" : "menor que"} ${alerta.num_condicao}${alerta.unidade}`}
                mensagem={alerta.mensagem}
                sensor={alerta.sensor}
                sensor_id={alerta.sensor_id}
                estacao={alerta.estacao}
                estacao_id={alerta.estacao_id}
                condicao={alerta.condicao}
                num_condicao={alerta.num_condicao}
            />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}