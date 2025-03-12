import "./styles.scss";

interface InputProps {
  label: string;
  tag: string;
  width: 25 | 33 | 50 | 66;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ label, tag, width, value, onChange }: InputProps) {
  return (
    <div className={`input_container width_${width}`}>
      <label htmlFor={tag}>{label}</label>
      <input
        id={tag}
        name={tag}
        placeholder="Digite aqui..."
        value={value || ""}
        onChange={onChange}
      />
    </div>
  );
}
