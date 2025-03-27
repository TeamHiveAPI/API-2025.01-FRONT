import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconChevronLeft, IconPlus, IconSearch, IconTrash } from "@tabler/icons-react";
import "./styles.scss";
import BotaoCTA from "../BotaoCTA/BotaoCTA";
import Swal from "sweetalert2";

interface BarraCimaProps {
  nome: string;
  tipo: "home" | "voltar" | "estacao" | "sensor" | "alerta" | "usuario";
  entidade?: "Estação" | "Sensor" | "Alerta" | "Usuário"; // Nova prop opcional
  onDelete?: () => void; // Função de exclusão passada como prop
}

export default function BarraCima({ nome, tipo, entidade, onDelete }: BarraCimaProps) {
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

  const handleExcluir = () => {
    if (!entidade) return;

    Swal.fire({
      showClass: {
        popup: "animate__animated animate__fadeInUp swal_rapido", // Efeito de entrada
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutDown swal_rapido", // Efeito de saída
      },
      imageUrl: "/public/swal_alerta_exclusao.png",
      imageWidth: 100,
      imageHeight: 100,
      title: `Excluir ${entidade.toLowerCase()}?`,
      text: `Tem certeza que deseja excluir ${entidade.toLowerCase() === "estação" ? "esta" : "este"} ${entidade.toLowerCase()}? Esta ação não pode ser desfeita.`,
      showCancelButton: true,
      confirmButtonColor: "#ED3C5C",
      cancelButtonColor: "#E2E1F8",
      confirmButtonText: `Excluir ${entidade.toLowerCase()}`,
      cancelButtonText: "Cancelar",
      customClass: {
        title: "swal_titulo",
        cancelButton: "swal_botao_cancelar_texto_cor",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Chama a função onDelete se ela foi passada como prop
        if (onDelete) {
          onDelete(); // Executa a exclusão
        }

        // Exibe mensagem de sucesso
        Swal.fire({
          icon: "success",
          title: "Excluído!",
          text: `${entidade.toLowerCase() === "estação" ? "A" : "O"} ${entidade.toLowerCase()} foi ${
            entidade.toLowerCase() === "estação" ? "removida" : "removido"
          } com sucesso.`,
          confirmButtonColor: "#ED3C5C",
        });
      }
    });
  };

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

          {/* Botão de excluir aparece apenas se a prop "entidade" estiver definida */}
          {entidade && (
            <BotaoCTA
              cor="vermelho"
              escrito={`Excluir ${entidade}`}
              aparencia="secundario"
              img={<IconTrash stroke="2" />}
              onClick={handleExcluir}
            />
          )}
        </div>
      )}
    </div>
  );
}