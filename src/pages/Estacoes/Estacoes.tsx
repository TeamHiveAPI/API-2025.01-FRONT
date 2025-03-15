import "./styles.scss";

import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import BarraCima from "../../components/BarraCima/BarraCima";
import CardEstacao from "../../components/CardEstacao/CardEstacao";

export default function Estacoes() {
  return (
    <div className="pagina_wrapper">
      <Sidebar />
        <div>
          <div className="pagina_container">

          <BarraCima nome="Estações" tipo="estacao"/>

          <h4 className="num_cadastros">04 estações cadastradas</h4>

          <div className="esta_lista">
            <CardEstacao id="1" titulo="Fatec SJC Chuva" ativo={true} endereco={"Rua das Flores , 500 - Jardim Botânico, Cidade Floral - 12510-000"} latitude={"12.500"} longitude={"15.200"} sensores={["Umidade - ID 5", "Temperatura - ID 2", "Vento - ID 1"]} />
            <CardEstacao id="2" titulo="Taubaté Vento" ativo={false} endereco={"Rua das Flores , 500 - Jardim Botânico, Cidade Floral - 12510-000"} latitude={"12.500"} longitude={"5.200"} sensores={[]} />
            <CardEstacao id="3" titulo="JD Oriente Umidade" ativo={true} endereco={"Rua das Flores , 500 - Jardim Botânico, Cidade Floral - 12510-000"} latitude={"12.500"} longitude={"5.200"} sensores={["Umidade - ID 5", "Temperatura - ID 2"]} />
            <CardEstacao id="4" titulo="São Paulo Temperatura" ativo={true} endereco={"Rua das Flores , 500 - Jardim Botânico, Cidade Floral - 12510-000"} latitude={"12.500"} longitude={"5.200"} sensores={["Umidade - ID 5", "Temperatura - ID 2"]} />
          </div>

          </div>
          <Footer />
        </div>
    </div>
  );
}