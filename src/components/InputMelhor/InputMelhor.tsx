import "./styles.scss";

interface InputMelhorProps {
  label?: string;
  tag: string;
  width: 25 | 33 | 50 | 66 | 100;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  mostrarErro?: boolean;
  mensagemErro?: string; 
  placeholder?: string;
  type?: string; 
}

export default function InputMelhor({
  label,
  tag,
  width,
  value = "",
  onChange,
  maxLength,
  mostrarErro,
  mensagemErro,
  placeholder,
  type
}: InputMelhorProps) {

  const containerClass = label
    ? `input_container width_${width}`
    : `input_container_no_label width_${width}`;

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
        type={type}
      />
      {mostrarErro && (
        <p className="input_erro">
          {mensagemErro || "Preencha este campo."}
        </p>
      )}
    </div>
  );
}