import "./styles.scss";

type SpinnerProps = {
  color?: "roxo" | "verde" | "vermelho";
  tamanho?: number;
};

export function Spinner({
  color = "roxo",
  tamanho = 20,
}: SpinnerProps) {
  const colorMap: Record<typeof color, string> = {
    roxo: "#5751D5",
    verde: "#17801E",
    vermelho: "#ED3C5C",
  };

  return (
    <div
      className="spinner"
      style={{
        width: tamanho,
        height: tamanho,
        borderColor: `${colorMap[color]} transparent transparent transparent`,
      }}
    />
  );
}