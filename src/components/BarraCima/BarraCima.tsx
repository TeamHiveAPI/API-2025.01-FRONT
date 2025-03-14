import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconChevronLeft, IconPlus, IconSearch } from "@tabler/icons-react";
import "./styles.scss";
import BotaoCTA from "../BotaoCTA/BotaoCTA";

interface BarraCimaProps {
  nome: string;
  tipo: "home" | "voltar" | "estacao" | "sensor" | "alerta" | "usuario";
}

export default function BarraCima({ nome, tipo }: BarraCimaProps) {
  const [pesquisa, setPesquisa] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && pesquisa.trim() !== "") {
      navigate(`/pesquisa/${encodeURIComponent(pesquisa)}`);
    }
  };

  // Mapeamento de tipo para texto e link
  const tipoMap: Record<string, { texto: string; link: string }> = {
    estacao: { texto: "estação", link: "/estacoes/criar" },
    sensor: { texto: "sensor", link: "/sensores/criar" },
    alerta: { texto: "alerta", link: "/alertas/criar" },
    usuario: { texto: "usuário", link: "/usuarios/criar" },
  };

  const { texto, link } = tipoMap[tipo] || { texto: "item", link: "/" };

  return (
    <div className="baci_container">
      <h1>{nome}</h1>

      {tipo === "home" && (
        <div className="baci_pesquisa">
          <IconSearch width={32} stroke={1.5} color="#606060" />
          <input
            type="text"
            placeholder="Pesquise por informações"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
      )}

      {tipo !== "home" && tipo !== "voltar" && (
        <div className="baci_pesquisa interno">
          <IconSearch width={32} stroke={1.5} color="#606060" />
          <input
            type="text"
            placeholder="Pesquisar"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
          />
        </div>
      )}

      {tipo !== "home" && tipo !== "voltar" && (
        <div className="baci_dir">
          <BotaoCTA
            cor="cor_primario"
            escrito={`Adicionar ${texto}`}
            aparencia="primario"
            img={<IconPlus stroke="2" />}
            onClick={() => navigate(link)}
          />
        </div>
      )}

      {tipo === "voltar" && (
        <div className="baci_dir">
          <BotaoCTA
            cor="cor_primario"
            escrito="Voltar"
            aparencia="secundario"
            img={<IconChevronLeft stroke="2" />}
            onClick={() => navigate(-1)}
          />
        </div>
      )}
    </div>
  );
}