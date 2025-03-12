import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";
import Sidebar from "../../components/Sidebar/Sidebar";

import {IconUser} from  "@tabler/icons-react";

import "./styles.scss";

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
            <CardEstacao id="4" titulo="Lorem Ipsum Dolor" ativo={true} endereco={"Rua das Flores, Jardim da Floricultura, 123"} latitude={"12.500"} longitude={"12.500"} qtd_sensor="4" />
            <CardEstacao id="4" titulo="Lorem Ipsum Dolor" ativo={true} endereco={"Rua das Flores, Jardim da Floricultura, 123"} latitude={"12.500"} longitude={"12.500"} qtd_sensor="4" />
            <CardEstacao id="4" titulo="Lorem Ipsum Dolor" ativo={true} endereco={"Rua das Flores, Jardim da Floricultura, 123"} latitude={"12.500"} longitude={"12.500"} qtd_sensor="4" />
            <CardEstacao id="4" titulo="Lorem Ipsum Dolor" ativo={true} endereco={"Rua das Flores, Jardim da Floricultura, 123"} latitude={"12.500"} longitude={"12.500"} qtd_sensor="4" />
          </div>

          </div>
          <Footer />
        </div>
    </div>
  );
}