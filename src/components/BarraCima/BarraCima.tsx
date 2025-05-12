import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconChevronLeft, IconPlus, IconSearch, IconTrash } from "@tabler/icons-react";
import Swal from "sweetalert2";
import BotaoCTA from "../BotaoCTA/BotaoCTA";
import "./styles.scss";
import { AuthContext } from "../../context/AuthContext";

interface BarraCimaProps {
  nome: string;
  tipo: "home" | "voltar" | "estacao" | "sensor" | "alerta" | "usuario";
  entidade?: "Estação" | "Sensor" | "Alerta" | "Usuário" | "Tipo Sensor";
  onDelete?: () => void;
}

export default function BarraCima({ nome, tipo, entidade, onDelete }: BarraCimaProps) {
  const [pesquisa, setPesquisa] = useState("");
  const [mostrarPesquisaInterna, setMostrarPesquisaInterna] = useState(false);
  const [animarBotaoPesquisa, setAnimarBotaoPesquisa] = useState(false);
  const [animarPesquisaInterna, setAnimarPesquisaInterna] = useState(false);

  const auth = useContext(AuthContext);
  const isAuthenticated = auth?.isAuthenticated ?? false;

  const navigate = useNavigate();

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && pesquisa.trim() !== "") {
      navigate(`/pesquisa/${encodeURIComponent(pesquisa)}`);
    }
  };

  const handleClickBotaoPesquisa = () => {
    setAnimarBotaoPesquisa(true);
    setTimeout(() => {
      setMostrarPesquisaInterna(true);
      setAnimarPesquisaInterna(true);
    }, 300);
  };

  const handleExcluir = () => {
    if (!entidade) return;

    Swal.fire({
      showClass: {
        popup: "animate__animated animate__fadeInUp swal_rapido",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutDown swal_rapido",
      },
      imageUrl: "/public/swal_alerta_exclusao.png",
      imageWidth: 100,
      imageHeight: 100,
      title: `Excluir ${entidade.toLowerCase()}?`,
      text: `Tem certeza que deseja excluir ${entidade.toLowerCase() === "estação" ? "esta" : "este"} ${entidade.toLowerCase()}? Esta ação não pode ser desfeita.`,
      showCancelButton: true,
      confirmButtonColor: "#ED3C5C",
      cancelButtonColor: "#5751D5",
      confirmButtonText: `Excluir ${entidade.toLowerCase()}`,
      cancelButtonText: "Cancelar",
      customClass: {
        title: "swal_titulo",
        cancelButton: "swal_botao_cancelar_texto_cor",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        if (onDelete) {
          onDelete();
        }

        Swal.fire({
          icon: "success",
          title: "Excluído!",
          text: `${entidade.toLowerCase() === "estação" ? "A" : "O"} ${entidade.toLowerCase()} foi ${
            entidade.toLowerCase() === "estação" ? "removida" : "removido"
          } com sucesso.`,
          confirmButtonColor: "#5751D5",
        }).then(() => {
          navigate(-1);
        });
      }
    });
  };

  const tipoMap: Record<string, { texto: string; link: string }> = {
    estacao: { texto: "Estação", link: "/estacoes/criar" },
    sensor: { texto: "Sensor", link: "/sensores/criar" },
    alerta: { texto: "Alerta", link: "/alertas/criar" },
    usuario: { texto: "Usuário", link: "/usuarios/criar" },
    tipo_sensor: { texto: "Tipo Sensor", link: "/tipo-sensores/criar" },
  };

  const { texto, link } = tipoMap[tipo] || { texto: "item", link: "/" };

  return (
    <div className="baci_container">
      <h1>{nome}</h1>

      {tipo === "home" && (
        <div className={isAuthenticated ? "baci_pesquisa" : "baci_pesquisa interno_ativo"}>
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

      {(tipo !== "home" && tipo !== "voltar") && (mostrarPesquisaInterna || !isAuthenticated) && (
        <div className={`baci_pesquisa interno_ativo ${animarPesquisaInterna ? 'descer' : ''}`}>
          <IconSearch width={32} stroke={1.5} color="#606060" />
          <input
            type="text"
            placeholder="Pesquise por informações"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
          />
        </div>
      )}

      {tipo !== "home" && tipo !== "voltar" && isAuthenticated && (
        <div className="baci_dir">
          
          <div className="botaoCTA_width_fixo">
          <BotaoCTA
            cor="cor_primario"
            escrito={`Adicionar ${texto}`}
            aparencia="primario"
            img={<IconPlus stroke="2" />}
            onClick={() => navigate(link)}
          />
          </div>

          {!mostrarPesquisaInterna && (
            <div
              className={`baci_pesquisa interno botao ${animarBotaoPesquisa ? 'subir' : ''}`}
              onClick={handleClickBotaoPesquisa}
            >
              <IconSearch width={32} stroke={1.5} color="#606060" />
            </div>
          )}
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