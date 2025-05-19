import { IconSearch } from "@tabler/icons-react";

interface InputPesquisaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}


export default function InputPesquisa({ value, onChange, placeholder = "Pesquisar" }: InputPesquisaProps) {
  return (
    <div className="baci_pesquisa interno normal">
      <IconSearch width={32} stroke={1.5} color="#606060" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}