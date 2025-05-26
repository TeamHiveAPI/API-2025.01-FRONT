import { IconArrowRightToArc, IconArrowsMaximize, IconCloud, IconDroplet, IconThermometer, IconWaveSine } from "@tabler/icons-react";
import { useState } from "react";

    type SensorCardProps = {
        cor: string;
        Icone: React.ElementType;
        titulo: string;
        descricao: string;
    };

    function darkenColor(hex: string, percent: number): string {
        const amount = Math.floor(255 * (percent / 100));
        const num = parseInt(hex.replace("#", ""), 16);

        const r = Math.max(0, (num >> 16) - amount);
        const g = Math.max(0, ((num >> 8) & 0x00ff) - amount);
        const b = Math.max(0, (num & 0x0000ff) - amount);

        return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, "0")}`;
    }

    export function SensorCard({ cor, Icone, titulo, descricao }: SensorCardProps) {
    const [hover, setHover] = useState(false);
    const corEscura = darkenColor(cor, 33);
    const classNames = `apr_card_sensor ${hover ? "hovered" : ""}`;

    return (
        <div
        className={classNames}
        style={{
            borderTop: `2px solid ${hover ? corEscura : cor}`,
            borderLeft: `2px solid ${hover ? corEscura : cor}`,
            borderRight: `2px solid ${hover ? corEscura : cor}`,
            borderBottom: `8px solid ${hover ? corEscura : cor}`,
            ...( { "--sensor-gradient": `linear-gradient(to bottom right, ${cor}, ${corEscura})` } as React.CSSProperties )
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        >
          <div className="sensor-gradient"></div>
          <Icone color={hover ? "#fff" : cor} stroke={1.5} width={48} height={48} />
          <h4 style={{ color: hover ? "#fff" : cor }}>{titulo}</h4>
          <p style={{ color: hover ? "#fff" : "#606060" }}>{descricao}</p>
        </div>
    );
    }


 export const sensores = [
    {
      cor: "#eb429f",
      Icone: IconThermometer,
      titulo: "Temperatura",
      descricao: "Mede o calor do ar ambiente. Ajuda a identificar ondas de calor ou frio extremo."
    },
    {
      cor: "#4282eb",
      Icone: IconDroplet,
      titulo: "Umidade Relativa",
      descricao: "Indica a quantidade de vapor de água no ar. Valores muito baixos apontam ar seco, que pode prejudicar a saúde."
    },
    {
      cor: "#ebb342",
      Icone: IconArrowsMaximize,
      titulo: "Pressão Atmosférica",
      descricao: "Capta a pressão exercida pelo ar. Quedas abruptas podem indicar a chegada de tempestades."
    },
    {
      cor: "#8642eb",
      Icone: IconCloud,
      titulo: "Pluviosidade",
      descricao: "Mede o volume de chuva acumulada em milímetros. É essencial para detectar chuvas intensas e risco de enchentes."
    },
    {
      cor: "#1adb7e",
      Icone: IconArrowRightToArc,
      titulo: "Velocidade do Vento",
      descricao: "Registra a força dos ventos. Ventos muito fortes representam risco para estruturas, árvores e pessoas."
    },
    {
      cor: "#eb7242",
      Icone: IconWaveSine,
      titulo: "Sismômetro",
      descricao: "Detecta vibrações no solo causadas por atividade sísmica, como terremotos, ajudando a identificar áreas de risco."
    }
  ];
