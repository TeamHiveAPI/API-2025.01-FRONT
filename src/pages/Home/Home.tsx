import "./styles.scss";

import Navbar from "../../components/Navbar/Navbar";
import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { SensorCard, sensores } from "./SensorCard";
import { IconArrowBigRightLines, IconCube } from "@tabler/icons-react";
import tabelaItens from './tabela.json';
import { impactosAlertas, ImportanciaCard } from "./ImportanciaCard";

export default function Home() {

  const navigate = useNavigate();

  return (
    <>
    <Navbar />

    <div className="banner">
      <video autoPlay muted loop playsInline className="video_fundo">
        <source src="./fundo_banner.mp4" type="video/mp4" />
        Seu navegador não suporta vídeos.
      </video>

      <div className="conteudo_banner">
        <h1>Gestão Meteorológica por um mundo mais seguro</h1>
        <img src="./decoracao_banner.svg" />
        <p>Acompanhe temperatura, chuva, vento e riscos ambientais em tempo real.</p>
        <div>
          <BotaoCTA
            cor="cor_primario"
            escrito="Acesse nosso Dashboard"
            aparencia="primario"
            img={<IconCube stroke="2" />}
            onClick={() => navigate("/dashboard")}
          />
        </div>
      </div>
    </div>

    <div className="apr_wrapper">

      <div className="secao_duo_container">
        <div className="secao_duo_esq">
          <h3>Introdução</h3>
          <p>
            Compreender os dados climáticos é essencial para antecipar riscos e agir com segurança.
            Nesta página, você aprenderá como funcionam os principais sensores das nossas estações e 
            o que cada medida pode indicar sobre o clima.
          </p>
        </div>
        <div className="secao_duo_dir introducao">
        </div>
      </div>

      <div className="secao_meio">

        <div className="secao_duo_container estacao">
          <div className="secao_duo_esq estacao">
            <h3>O que é uma estação meteorológica?</h3>
            <p>
              As estações meteorológicas são estruturas fundamentais para monitorar o clima e entender as mudanças do tempo. 
              Elas utilizam sensores para coletar informações como temperatura, umidade, pressão atmosférica, vento e volume
              de chuva. Com base nesses dados, podemos tomar decisões mais seguras e planejar melhor nossas atividades cotidianas.
            </p>
            <p className="apr_margem">              
              Em nosso sistema, é possível cadastrar sensores, configurar alertas e acompanhar em tempo real o comportamento do clima. 
              Quando um sensor registra um valor que ultrapassa um limite considerado crítico — como uma temperatura muito alta ou 
              chuva excessiva — um alerta é automaticamente criado.
            </p>
          </div>
          <div className="secao_duo_dir estacao">
          </div>
        </div>

        <div className="secao_duo_container estacao baixo">
          <div className="secao_duo_dir alertas baixo">
          </div>
          <div className="secao_duo_esq estacao baixo">
            <h3>Qual a função dos alertas?</h3>
            <p>
              Esses alertas são fundamentais para informar a população e prevenir situações de risco,
              como enchentes, deslizamentos, ondas de calor ou tempestades.

            </p>
            <p className="apr_margem">              
              Nosso objetivo é tornar a meteorologia mais acessível e útil para todos — oferecendo dados confiáveis, 
              interpretáveis e voltados à segurança e à educação climática.
            </p>
          </div>
        </div>
      </div>

      <div className="apr_tipos_sensores_wrapper">
        <h3>Tipos de Medidas</h3>
        <h5>Veja abaixo as medidas que os nossos sensores fornecem ao nosso sistema.</h5>
        <div className="apr_tipos_sensores_container">
          {sensores.map((sensor, index) => (
            <SensorCard
              key={index}
              cor={sensor.cor}
              Icone={sensor.Icone}
              titulo={sensor.titulo}
              descricao={sensor.descricao}
            />
          ))}
        </div>
      </div>

      <div className="apr_alertas_definidos_wrapper">
        <div className="apr_alertas_definidos_container">
          <h3>Configurações de Alerta</h3>
          <h5>Os Alertas Definidos são regras configuradas no sistema para identificar situações climáticas ou geológicas críticas
          com base nos dados dos sensores. Cada alerta é criado a partir de uma condição específica: quando essa condição é atendida 
          por uma medida captada por um sensor, o sistema cria automaticamente um alerta real. Veja exemplos abaixo:</h5>

          <div className="tabela_alertas_wrapper">
            <table className="tabela_alertas">
              <thead>
                <tr>
                  <th>Sensor</th>
                  <th>Valor / Condição</th>
                  <th>Alerta</th>
                  <th>Significado / Risco</th>
                </tr>
              </thead>
            <tbody>
              {tabelaItens.map((item, index) => (
                <tr key={index}>
                  <td>{item.sensor}</td>
                  <td>{item.condicao}</td>
                  <td>{item.alerta}</td>
                  <td>{item.risco}</td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>

        </div>
      </div>

      <div className="apr_tipos_sensores_wrapper">
        <h3>Importância dos Alertas</h3>
        <h5>Veja como os alertas do nosso sistema podem contribuir na segurança de diferentes áreas da sociedade.</h5>
        <div className="apr_tipos_sensores_container">
          {impactosAlertas.map((item, index) => (
            <ImportanciaCard
              key={index}
              cor={item.cor}
              Icone={item.icone}
              titulo={item.titulo}
              descricao={item.descricao}
              lista={item.lista}
            />
          ))}
        </div>
      </div>

      <div className="secao_meio saiba">
        <div className="secao_duo_container estacao saiba">
          <div className="secao_duo_esq estacao saiba">
            <h3>SAIBA MAIS</h3>
            <h5>A SUSTENTABILIDADE ESTÁ NO NOSSO DNA</h5>
            <p className="apr_margem">
              A Tecsus é uma Startup que desenvolve dispositivos, aplicativos e sistemas para a transmissão e recepção de dados, 
              controle de equipamentos remotos e gestão de faturas, aplicados nos setores de abastecimento de água, distribuição
              de eletricidade e gás natural.
            </p>
            <div className="apr_botao">
              <BotaoCTA
                cor="cor_primario"
                escrito="Conheça-nos melhor"
                aparencia="primario"
                img={<IconArrowBigRightLines stroke="2" />}
                link="https://www.tecsus.com.br"
              />
            </div>
          </div>
          <div className="secao_duo_dir saiba">
          </div>
        </div>
      </div>

        

    </div>

    <Footer autenticado={false} margem={true}/>
    </>

  );
}