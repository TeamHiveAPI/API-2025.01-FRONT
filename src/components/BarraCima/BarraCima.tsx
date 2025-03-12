import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconSearch } from "@tabler/icons-react";
import "./styles.scss";

interface BarraCimaProps {
  nome: string;
}

export default function BarraCima({ nome }: BarraCimaProps) {
  const [pesquisa, setPesquisa] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && pesquisa.trim() !== "") {
      navigate(`/pesquisa/${encodeURIComponent(pesquisa)}`);
    }
  };

  return (
    <div className="baci_container">
      <h1>{nome}</h1>
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
    </div>
  );
}
