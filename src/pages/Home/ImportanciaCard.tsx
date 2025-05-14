import { IconAlertTriangle, IconBuildingCommunity, IconLeaf, IconHeartRateMonitor } from "@tabler/icons-react";

type ImportanciaCardProps = {
    cor: string;
    Icone: React.ElementType;
    titulo: string;
    descricao: string;
    lista: string[];
};

export function ImportanciaCard({ cor, Icone, titulo, descricao, lista }: ImportanciaCardProps) {
  return (
    <div
      className="apr_card_importancia"
      style={{
        borderTop: `2px solid ${cor}`,
        borderLeft: `2px solid ${cor}`,
        borderRight: `2px solid ${cor}`,
        borderBottom: `8px solid ${cor}`,
        borderRadius: "16px",
        padding: "24px",
        backgroundColor: "#fff"
      }}
    >
        <Icone color={cor} stroke={1.5} width={48} height={48} />
        <h4 style={{ color: cor }}>{titulo}</h4>
        <p>{descricao}</p>
            {lista.map((item, i) => (
            <p className="apr_lista" key={i}>{item}</p>
        ))}
    </div>
  );
}


export const impactosAlertas = [
  {
    icone: IconAlertTriangle,
    cor: "#ebb342",
    titulo: "Prevenção de Desastres Naturais",
    descricao:
      "Alertas antecipam condições críticas, como enchentes, deslizamentos, ondas de calor, etc. Com essas informações, é possível:",
    lista: [
      "Evacuar áreas de risco",
      "Interromper atividades ao ar livre ou em zonas vulneráveis",
      "Acionar planos de emergência com agilidade"
    ]
  },
  {
    icone: IconBuildingCommunity,
    cor: "#4282eb",
    titulo: "Planejamento e Gestão Urbana",
    descricao:
      "Cidades e regiões podem usar dados históricos e alertas em tempo real para:",
    lista: [
      "Planejar drenagem urbana e sistemas de escoamento",
      "Regular construções em áreas de risco",
      "Preparar abrigos e rotas de fuga em caso de desastres"
    ]
  },
  {
    icone: IconLeaf,
    cor: "#1adb7e",
    titulo: "Agricultura e Meio Ambiente",
    descricao:
      "Para agricultores e ambientalistas, os alertas ajudam a:",
    lista: [
      "Proteger plantações contra eventos extremos (geadas, seca, chuvas fortes)",
      "Planejar irrigação com base na umidade e na previsão de chuva",
      "Identificar riscos de incêndios florestais em períodos de ar seco"
    ]
  },
  {
    icone: IconHeartRateMonitor,
    cor: "#eb429f",
    titulo: "Proteção à Saúde e Bem-estar",
    descricao:
      "Alertas sobre ondas de calor, frio extremo ou ar seco são essenciais para:",
    lista: [
      "Cuidar de crianças, idosos e pessoas com doenças crônicas",
      "Orientar o uso de protetor solar, hidratação e ventilação",
      "Reduzir o número de internações e atendimentos médicos"
    ]
  }
];
