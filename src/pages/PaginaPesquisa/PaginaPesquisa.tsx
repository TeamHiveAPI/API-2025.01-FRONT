import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.scss";

import BarraCima from "../../components/BarraCima/BarraCima";
import PaginaWrapper from "../../components/PaginaWrapper/PaginaWrapper";
import CardEstacao from "../../components/CardEstacao/CardEstacao";
import CardSensor from "../../components/CardSensor/CardSensor";
import CardTipoSensor from "../../components/CardTipoSensor/CardTipoSensor";
import CardUsuario from "../../components/CardUsuario/CardUsuario";
import CardAlerta from "../../components/CardAlerta/CardAlerta";

import { Usuario } from "../Usuários/Usuarios";
import api from "../../services/api";

export default function PaginaPesquisa() {
  const { query } = useParams();
  const [, setTipo] = useState<string | null>(null);
  const [resultados, setResultados] = useState<Record<string, any[]>>({});
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const res = await api.get(`/pesquisa?query=${query}`);
        setTipo(res.data.tipo);

        // Se veio resultado simples (ex: só estacao), adapta para formato multiplo
        if (res.data.tipo !== "multiplo") {
          setResultados({ [res.data.tipo]: res.data.resultados });
        } else {
          setResultados(res.data.resultados);
        }
      } catch (err) {
        console.error("Erro ao buscar dados de pesquisa:", err);
      } finally {
        setCarregando(false);
      }
    };

    if (query) buscarDados();
  }, [query]);

    const contarResultados = () =>
        Object.values(resultados).reduce((acc, lista) => acc + (lista?.length || 0), 0);

    const navigate = useNavigate();

    const handleEditUsuario = (usuario: Usuario) => {
        navigate(`/usuarios/editar/${usuario.id}`, { state: usuario });
  };

  return (
    <PaginaWrapper>
      <BarraCima nome="Pesquisa" tipo="home" />
      <h4 className="num_cadastros">
        {carregando
          ? "Carregando..."
          : `${contarResultados()} resultado${
              contarResultados() === 1 ? "" : "s"
            } encontrado${contarResultados() === 1 ? "" : "s"}`}
      </h4>

      {/* Estações */}
      <div className="pape_secao_entidade">
        <h5>Estações</h5>
        <div className="esta_lista">
          {resultados.estacao?.length > 0 ? (
            resultados.estacao.map((estacao) => (
              <CardEstacao
                key={estacao.id}
                id={estacao.id.toString()}
                uid={estacao.uid}
                titulo={estacao.nome}
                ativo={estacao.status === "ativa"}
                endereco={`${estacao.rua}, ${estacao.numero} - ${estacao.bairro}, ${estacao.cidade} - ${estacao.cep}`}
                latitude={estacao.latitude.toString()}
                longitude={estacao.longitude.toString()}
                sensores={estacao.sensores || []}
              />
            ))
          ) : (
            <p className="card_nenhum">Nenhum resultado encontrado.</p>
          )}
        </div>
      </div>

      {/* Sensores */}
      <div className="pape_secao_entidade">
        <h5>Sensores</h5>
        <div className="lista_espaços_3">
          {resultados.sensor?.length > 0 ? (
            resultados.sensor.map((sensor) => (
              <CardSensor
                key={sensor.id}
                id={sensor.id.toString()}
                titulo={sensor.nome}
                unidOuSensor={sensor.unidade}
                estacao={sensor.estacao_nome || "Sem Estação"}
                estacao_id={""}
                descricao={sensor.descricao}
                quantidade_casas_decimais={sensor.quantidade_casas_decimais}
                fator_conversao={sensor.fator_conversao}
                offset={sensor.offset}
                tipo_parametro_id={sensor.tipo_parametro_id}
                json={sensor.json}
              />
            ))
          ) : (
            <p className="card_nenhum">Nenhum resultado encontrado.</p>
          )}
        </div>
      </div>

      {/* Tipos de Sensores */}
      <div className="pape_secao_entidade">
        <h5>Tipos de Sensores</h5>
        <div className="lista_espaços_3">
          {resultados.tipo_sensor?.length > 0 ? (
            resultados.tipo_sensor.map((tipo) => (
              <CardTipoSensor
                key={tipo.id}
                id={tipo.id.toString()}
                nome={tipo.nome}
                descricao={tipo.descricao}
              />
            ))
          ) : (
            <p className="card_nenhum">Nenhum resultado encontrado.</p>
          )}
        </div>
      </div>

      {/* Alertas */}
      <div className="pape_secao_entidade">
        <h5>Alertas</h5>
        <div className="lista_espaços_3">
          {resultados.alerta_definido?.length > 0 ? (
            resultados.alerta_definido.map((alerta) => (
              <CardAlerta
                key={alerta.id}
                id={alerta.id}
                titulo={`${alerta.sensor} ${
                  alerta.condicao === "maior_igual" ? "maior ou igual a" : "menor que"
                } ${alerta.num_condicao}${alerta.unidade}`}
                mensagem={alerta.descricao || alerta.mensagem}
                sensor={alerta.sensor}
                sensor_id={alerta.sensor_id}
                estacao={alerta.estacao}
                estacao_id={alerta.estacao_id}
                condicao={alerta.condicao}
                num_condicao={alerta.num_condicao}
              />
            ))
          ) : (
            <p className="card_nenhum">Nenhum resultado encontrado.</p>
          )}
        </div>
      </div>

      {/* Usuários */}
      <div className="pape_secao_entidade">
        <h5>Usuários</h5>
        <div className="usu_lista">
          {resultados.usuario?.length > 0 ? (
            resultados.usuario.map((usuario) => (
              <CardUsuario
                key={usuario.id}
                id={usuario.id}
                admin={usuario.nivel_acesso === "ADMINISTRADOR"}
                nome={usuario.nome}
                email={usuario.email}
                senha={usuario.senha}
                data_criacao={new Date(usuario.data_criacao).toLocaleDateString()}
                onEdit={() => handleEditUsuario(usuario)}
              />
            ))
          ) : (
            <p className="card_nenhum">Nenhum resultado encontrado.</p>
          )}
        </div>
      </div>

    </PaginaWrapper>
  );
}