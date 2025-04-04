import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

interface FitBoundsProps {
  estacoes: { latitude: number; longitude: number }[];
}

const FitBounds = ({ estacoes }: FitBoundsProps) => {
  const map = useMap();

  useEffect(() => {
    if (estacoes.length === 0) return;

    const bounds = L.latLngBounds(
      estacoes.map((e) => [e.latitude, e.longitude] as [number, number])
    );

    map.fitBounds(bounds, { padding: [30, 30] });
  }, [estacoes, map]);

  return null;
};

export default FitBounds;