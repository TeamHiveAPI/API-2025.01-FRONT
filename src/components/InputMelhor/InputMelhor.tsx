import { useEffect, useState } from "react";
import "./styles.scss";
import { Spinner } from "../Spinner/Spinner";
import { IconCheck, IconX } from "@tabler/icons-react";

interface InputMelhorProps {
  label?: string;
  tag: string;
  width: 25 | 33 | 50 | 66 | 100;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  mostrarErro?: boolean;
  placeholder?: string;
  onChecar?: (valor: string) => boolean | Promise<boolean>; // <-- nova prop opcional
}

export default function InputMelhor({
  label,
  tag,
  width,
  value = "",
  onChange,
  maxLength,
  mostrarErro,
  placeholder,
  onChecar,
}: InputMelhorProps) {
  const [loading, setLoading] = useState(false);
  const [resultadoChecagem, setResultadoChecagem] = useState<null | boolean>(null);
  const [valorAnterior, setValorAnterior] = useState("");

  useEffect(() => {
    if (!onChecar || value === valorAnterior || !value.trim()) return;

    setLoading(true);
    setResultadoChecagem(null);
    setValorAnterior(value);

    const checar = async () => {
      const [resultado] = await Promise.all([
        Promise.resolve(onChecar(value)),
        new Promise((res) => setTimeout(res, 250)), // atraso visual
      ]);
      setResultadoChecagem(resultado);
      setLoading(false);
    };

    checar();
  }, [value, onChecar]);

  const containerClass = label
    ? `input_container width_${width}`
    : `input_container_no_label width_${width}`;

  const renderIcon = () => {
    if (loading) return <Spinner tamanho={20} />;
    if (resultadoChecagem === true) return <IconCheck size={18} color="#17801E" />;
    if (resultadoChecagem === false) return <IconX size={18} color="#ED3C5C" />;
    return null;
  };

  return (
    <div className={containerClass}>
      {label && <label htmlFor={tag}>{label}</label>}
        <input
          id={tag}
          name={tag}
          placeholder={placeholder || "Digite aqui..."}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
        />
        {onChecar &&
        <div className="input_checar_icon">
          {renderIcon()}
        </div>
        }
      {mostrarErro && <p className="input_erro">Preencha este campo.</p>}
    </div>
  );
}