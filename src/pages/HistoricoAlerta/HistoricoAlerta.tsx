import { useEffect, useState } from "react";
import "./styles.scss";

import BarraCima from "../../components/BarraCima/BarraCima";
import CardAlertaAtivo from "../../components/CardAlertaAtivo/CardAlertaAtivo";
import { FormatarDataHora } from "../../utils/FormatarDataHora";
import PaginaWrapper from "../../components/PaginaWrapper/PaginaWrapper";

interface CardAlertaAtivoProps {
  id: string;
  alertaAtivo: boolean;
  titulo: string;
  tempoAtivo: string;
  descricaoAlerta: string;
  estacao: string;
  coordenadas: [number, number];
  expandido?: boolean;
  dataInicio: string;
  dataFim: string | null; 
}

export default function Home() {
  const [alertasAtivos, setAlertasAtivos] = useState<CardAlertaAtivoProps[]>([]);
  const [alertasPassados, setAlertasPassados] = useState<CardAlertaAtivoProps[]>([]);

  // Busca alertas
  const fetchAlertas = async () => {
    try {
      const res = await fetch("http://localhost:8000/alertas");
      const data = await res.json();

      const alertasFormatados: CardAlertaAtivoProps[] = data.map((alerta: any) => {
        const inicio = new Date(alerta.data_hora);
        const fim = alerta.tempoFim ? new Date(alerta.tempoFim) : new Date();
      
        const diffMs = fim.getTime() - inicio.getTime();
        const horas = Math.floor(diffMs / (1000 * 60 * 60));
        const minutos = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const tempoAtivo = `${horas}h${minutos.toString().padStart(2, "0")}min`;
      
        const coords: [number, number] = Array.isArray(alerta.coordenadas)
          ? alerta.coordenadas
          : (() => {
              const [lat, lon] = (alerta.coordenadas as string)
                .replace(/[\[\]\s]/g, "")
                .split(",");
              return [parseFloat(lat), parseFloat(lon)];
            })();
      
        return {
          id: alerta.id.toString(),
          alertaAtivo: alerta.alertaAtivo,
          titulo: alerta.titulo,
          tempoAtivo,
          descricaoAlerta: alerta.descricaoAlerta,
          estacao: alerta.estacao,
          coordenadas: coords,
          expandido: alerta.expandido,
          dataInicio: FormatarDataHora(new Date(alerta.data_hora)),
          dataFim: alerta.tempoFim ? FormatarDataHora(new Date(alerta.tempoFim)) : "Em Andamento",
          
        };
      });      

      setAlertasAtivos(
        alertasFormatados
          .filter((a) => a.alertaAtivo)
          .sort((a, b) => new Date(b.dataInicio).getTime() - new Date(a.dataInicio).getTime())
      );
      
      setAlertasPassados(
        alertasFormatados
          .filter((a) => !a.alertaAtivo)
          .sort((a, b) => new Date(b.dataInicio).getTime() - new Date(a.dataInicio).getTime())
      );
      
    } catch (err) {
      console.error("Erro ao carregar alertas:", err);
    }
  };

  useEffect(() => {
    fetchAlertas();
  }, []);

  return (
    <PaginaWrapper>
      <BarraCima nome="Histórico" tipo="home" />
  
      <h4 className="hial_subtitulo">Alertas Ativos</h4>
      {alertasAtivos.length > 0 ? (
        alertasAtivos.map(alerta => (
          <CardAlertaAtivo key={alerta.id} {...alerta} />
        ))
      ) : (
        <p className="hial_sem_alerta">Não há alertas ativos.</p>
      )}
  
      <h4 className="hial_subtitulo baixo">Alertas Passados</h4>
      {alertasPassados.length > 0 ? (
        alertasPassados.map(alerta => (
          <CardAlertaAtivo key={alerta.id} {...alerta} />
        ))
      ) : (
        <p className="hial_sem_alerta">Não há alertas passados.</p>
      )}
    </PaginaWrapper>
  );
}