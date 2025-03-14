import "./styles.scss";

interface InputMelhorProps {
  label: string;
  tag: string;
  width: 25 | 33 | 50 | 66;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  mostrarErro?: boolean;
}

export default function InputMelhor({ label, tag, width, value, onChange, maxLength, mostrarErro }: InputMelhorProps) {
  return (
    <div className={`input_container width_${width}`}>
      <label htmlFor={tag}>{label}</label>
      <input
        id={tag}
        name={tag}
        placeholder="Digite aqui..."
        value={value || ""}
        onChange={onChange}
        maxLength={maxLength}
      />
      {mostrarErro && <p className="input_erro">Preencha este campo.</p>}
    </div>
  );
}