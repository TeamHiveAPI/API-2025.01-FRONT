import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./styles.scss";
import Footer from "../../components/Footer/Footer";
import BarraCima from "../../components/BarraCima/BarraCima";
import CardAlertaAtivo from "../../components/CardAlertaAtivo/CardAlertaAtivo";

interface CardAlertaAtivoProps {
  id: string;
  alertaAtivo: boolean;
  titulo: string;
  tempoAtivo: string;
  descricaoAlerta: string;
  estacao: string;
  coordenadas: [number, number];
  expandido?: boolean;
}

export default function Home() {
  const [alertasAtivos, setAlertasAtivos] = useState<CardAlertaAtivoProps[]>([]);
  const [alertasPassados, setAlertasPassados] = useState<CardAlertaAtivoProps[]>([]);
  const [estacoes, setEstacoes] = useState<Record<string, { nome: string; latitude: number; longitude: number }>>({});
  const [parametros, setParametros] = useState<Record<string, { nome: string; unidade: string }>>({});
  const [alertasDefinidos, setAlertasDefinidos] = useState<Record<string, any>>({});

  // Fetch stations
  const fetchEstacoes = async () => {
    try {
      const res = await fetch("http://localhost:8000/estacoes");
      const data = await res.json();
      const mapped = Object.fromEntries(
        data.map((e: any) => [
          e.id.toString(),
          { nome: e.nome, latitude: e.latitude, longitude: e.longitude },
        ])
      );
      setEstacoes(mapped);
    } catch (err) {
      console.error("Erro ao carregar estações:", err);
    }
  };

  // Fetch parameters
  const fetchParametros = async () => {
    try {
      const res = await fetch("http://localhost:8000/parametros");
      const data = await res.json();
      const mapped = Object.fromEntries(
        data.map((p: any) => [p.id.toString(), { nome: p.nome, unidade: p.unidade }])
      );
      setParametros(mapped);
    } catch (err) {
      console.error("Erro ao carregar parâmetros:", err);
    }
  };

  // Fetch alert definitions
  const fetchAlertasDefinidos = async () => {
    try {
      const res = await fetch("http://localhost:8000/alertas-definidos");
      const data = await res.json();
      const mapped = Object.fromEntries(
        data.map((ad: any) => [ad.id.toString(), ad])
      );
      setAlertasDefinidos(mapped);
    } catch (err) {
      console.error("Erro ao carregar alertas definidos:", err);
    }
  };

  // Fetch and process alerts
  const fetchAlertas = async () => {
    try {
      const res = await fetch("http://localhost:8000/alertas");
      const data = await res.json();

      const alertasFormatados: CardAlertaAtivoProps[] = data.map((alerta: any) => {
        const alertaDefinido = alertasDefinidos[alerta.alerta_definido_id] || {};
        const estacao = estacoes[alertaDefinido.estacao_id] || {
          nome: "Desconhecida",
          latitude: -23.162170,
          longitude: -45.794907,
        };
        const parametro = parametros[alertaDefinido.parametro_id] || {
          nome: "Parâmetro",
          unidade: "",
        };

        // Format title
        const condicaoTexto =
          alertaDefinido.condicao === ">=" ? "maior ou igual a" : "menor que";
        const titulo = `${parametro.nome} ${condicaoTexto} ${alertaDefinido.num_condicao}${parametro.unidade}`;

        // Calculate tempoAtivo
        const inicio = new Date(alerta.data_hora);
        const fim = alerta.data_fim ? new Date(alerta.data_fim) : new Date();
        const diffMs = fim.getTime() - inicio.getTime();
        const horas = Math.floor(diffMs / (1000 * 60 * 60));
        const minutos = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const tempoAtivo = `${horas}h${minutos.toString().padStart(2, "0")}min`;

        // Use mensagem from alerta_definido as descricaoAlerta
        const descricaoAlerta = alertaDefinido.mensagem || "Sem descrição disponível";

        return {
          id: alerta.id.toString(),
          alertaAtivo: alertaDefinido.ativo !== false, // Active only if ativo is true
          titulo,
          tempoAtivo,
          descricaoAlerta,
          estacao: estacao.nome,
          coordenadas: [estacao.latitude, estacao.longitude] as [number, number],
          expandido: false,
        };
      });

      // Separate active and past alerts
      setAlertasAtivos(alertasFormatados.filter((a) => a.alertaAtivo));
      setAlertasPassados(alertasFormatados.filter((a) => !a.alertaAtivo));
    } catch (err) {
      console.error("Erro ao carregar alertas:", err);
    }
  };

  // Load initial data
  useEffect(() => {
    fetchEstacoes();
    fetchParametros();
    fetchAlertasDefinidos();
  }, []);

  // Fetch alerts when dependencies are loaded
  useEffect(() => {
    if (Object.keys(estacoes).length && Object.keys(parametros).length && Object.keys(alertasDefinidos).length) {
      fetchAlertas();
    }
  }, [estacoes, parametros, alertasDefinidos]);

  return (
    <div className="pagina_wrapper">
      <Sidebar />
      <div>
        <div className="pagina_container">
          <BarraCima nome="Histórico" tipo="home" />
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