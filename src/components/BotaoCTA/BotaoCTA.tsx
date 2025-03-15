import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

interface BotaoProps {
  link?: string;
  escrito?: string;
  aparencia: "primario" | "secundario";
  cor?: "cor_primario" | "verde" | "vermelho" | "cinza";
  type?: "button" | "submit";
  img?: string | ReactNode;
  pequeno?: boolean;
  onClick?: () => void;
  desativado?: boolean;
}

const BotaoCTA: React.FC<BotaoProps> = ({ link, escrito, aparencia, cor, type = "button", img, pequeno, onClick, desativado }) => {
  
  const aparenciaEscolhida = aparencia === "primario" ? "botao_cta_primario" : "botao_cta_secundario";
  const corEscolhida = cor ? `botao_cta_${cor}` : "";
  const semEscrito = !escrito ? "botao_cta_sem_escrito" : "";
  const isPequeno = pequeno ? "botao_cta_pequeno" : "";
  const isDesativado = desativado ? "botao_cta_desativado" : "";

  // Gera a lista de classes dinamicamente
  const className = `${aparenciaEscolhida} ${corEscolhida} ${semEscrito} ${isPequeno} ${isDesativado}`.trim();

  return link ? (
    <Link to={link} className={className}>
      {typeof img === "string" ? <img src={img} alt="Ícone" /> : img}
      {escrito && <span>{escrito}</span>}
    </Link>
  ) : (
    <button type={type} className={className} onClick={onClick} disabled={desativado}>
      {typeof img === "string" ? <img src={img} alt="Ícone" /> : img}
      {escrito && <span>{escrito}</span>}
    </button>
  );
};

export default BotaoCTA;