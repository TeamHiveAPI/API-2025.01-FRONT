import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from "react-leaflet";
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import markerIconAtivo from "../../../public/map_pin.svg"
import markerIconInativo from "../../../public/map_pin_inativo.svg";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";
import FitBounds from "../../hooks/FitBounds";
import { useEffect } from "react";

interface Sensor {
  id: number;
  nome: string;
  unidade: string;
}

interface Estacao {
  id: number;
  nome: string;
  cep: string;
  rua: string;
  bairro: string;
  cidade: string;
  numero: string;
  latitude: number;
  longitude: number;
  data_instalacao: string;
  sensores: Sensor[];
  status: "ativa" | "inativa";
}

interface MapaProps {
  estacoes: Estacao[];
}

const MapaEstacoes: React.FC<MapaProps> = ({ estacoes }) => {

    const customIconAtivo = new L.Icon({
        iconUrl: markerIconAtivo,
        shadowUrl: markerShadowPng,
        iconSize: [38, 62],
        iconAnchor: [18, 62],
        popupAnchor: [1, -44],
        shadowSize: [52, 52],
      });

    const customIconInativo = new L.Icon({
      iconUrl: markerIconInativo,
      shadowUrl: markerShadowPng,
      iconSize: [38, 62],
      iconAnchor: [18, 62],
      popupAnchor: [1, -44],
      shadowSize: [52, 52],
    });

    const EnableScrollOnShift = () => {
      const map = useMap();
    
      useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
          if (e.shiftKey) {
            map.scrollWheelZoom.enable();
          } else {
            map.scrollWheelZoom.disable();
          }
        };
    
        map.getContainer().addEventListener("wheel", handleWheel);
    
        return () => {
          map.getContainer().removeEventListener("wheel", handleWheel);
        };
      }, [map]);
    
      return null;
    };
      

  return (
    <MapContainer zoom={5} center={[-14.2350, -51.9253]} scrollWheelZoom={false} zoomControl={false} attributionControl={false} style={{ height: "300px", width: "100%", borderRadius: "12px", marginBottom: "-80px" }}>
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FitBounds estacoes={estacoes} />

      <ZoomControl position="bottomright" />

      <EnableScrollOnShift />

      {estacoes.map((estacao) => (
        <Marker
          key={estacao.id}
          position={[estacao.latitude, estacao.longitude]}
          icon={estacao.status === "ativa" ? customIconAtivo : customIconInativo}
        >
          <Popup>
            <strong>{estacao.nome}</strong><br />
            {estacao.rua}, {estacao.numero}<br />
            {estacao.bairro} - {estacao.cidade}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapaEstacoes;