import "./styles.scss";

interface InputDataHoraProps {
  label: string;
  tagData: string;
  tagHora: string;
  width: 25 | 33 | 50 | 66;
  valueData?: string;
  valueHora?: string;
  onChangeData?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeHora?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  mostrarErro?: boolean;
}

export default function InputDataHora({
  label,
  tagData,
  tagHora,
  width,
  valueData,
  valueHora,
  onChangeData,
  onChangeHora,
  mostrarErro,
}: InputDataHoraProps) {
  return (
    <div className={`input_container width_${width}`}>
      <label htmlFor={tagData}>{label}</label>
      <div className="input_data_hora">
        <input
          id={tagData}
          name={tagData}
          type="date"
          value={valueData || ""}
          onChange={onChangeData}
        />
        <input
          id={tagHora}
          name={tagHora}
          type="time"
          value={valueHora || ""}
          onChange={onChangeHora}
        />
      </div>
      {mostrarErro && <p className="input_erro">Preencha este campo.</p>}
    </div>
  );
}