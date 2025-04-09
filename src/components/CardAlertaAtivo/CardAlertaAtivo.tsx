import { useEffect } from "react";
import { IconClock } from "@tabler/icons-react";
import L from "leaflet";
import "./styles.scss";
import MapPinRoxo from "../../../public/map_pin_roxo.svg";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

// Interface das props
interface CardAlertaAtivoProps {
    alertaAtivo: boolean;
    titulo: string;
    tempoAtivo: string;
    descricaoAlerta: string;
    estacao: string;
    coordenadas: [number, number]; // [latitude, longitude]
}

export default function CardAlertaAtivo({
    alertaAtivo,
    titulo,
    tempoAtivo,
    descricaoAlerta,
    estacao,
    coordenadas,
}: CardAlertaAtivoProps) {

    useEffect(() => {
        const createRipple = () => {
            const rippleContainer = document.querySelector(".ripple_effect");

            if (!rippleContainer || !(rippleContainer instanceof HTMLElement)) return;

            const centerX = rippleContainer.offsetWidth / 2;
            const centerY = rippleContainer.offsetHeight / 2;

            const circleSize = 35;

            const ripple = document.createElement("div");
            ripple.classList.add("ripple");
            ripple.style.position = "absolute";
            ripple.style.background = "#5751D560";
            ripple.style.borderRadius = "50%";
            ripple.style.transform = "scale(0)";
            ripple.style.animation = "ripple-animation 4s ease-out";

            ripple.style.width = `${circleSize}px`;
            ripple.style.height = `${circleSize}px`;
            ripple.style.left = `${centerX - circleSize / 2}px`;
            ripple.style.top = `${centerY - circleSize / 2}px`;

            rippleContainer.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 4000);
        };

        const interval = setInterval(createRipple, 1250);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        // Ícone e sombra do pin permanecem fixos
        const Pin = new L.Icon({
            iconUrl: MapPinRoxo,
            shadowUrl: markerShadowPng,
            iconSize: [25, 42],
            iconAnchor: [12, 42],
            popupAnchor: [1, -34],
            shadowSize: [25, 25],
        });

        const map = L.map("map", {
            center: coordenadas,
            zoom: 12,
            zoomControl: false,
            attributionControl: false,
            scrollWheelZoom: false,
            dragging: false,
            touchZoom: false,
            doubleClickZoom: false,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {}).addTo(map);

        L.marker(coordenadas, { icon: Pin }).addTo(map);

        // Limpar o mapa quando o componente for desmontado
        return () => {
            map.remove();
        };
    }, [coordenadas]);

    return (
        <div className="caes_wrapper caal">
            <div className="caal_esq">
                <div>
                    <div className="caal_cima">
                        <div className={alertaAtivo ? "caal_ativo" : "caal_inativo"}>
                        </div>
                        <h5 className="caal_titulo">{titulo}</h5>
                        <div className="caal_tempo">
                            <IconClock width={16} stroke={1.5} color="#808080" />
                            <p>{tempoAtivo}</p>
                        </div>
                    </div>
                    <div className="caal_meio">
                        <p>{descricaoAlerta}</p>
                    </div>
                </div>
                <div className="caal_info">
                    <p>ESTAÇÃO</p>
                    <p>{estacao}</p>
                </div>
            </div>
            <div className="caal_dir">
                <div className="ripple_effect"></div>
                <div id="map" className="caal_mapa"></div>
            </div>
        </div>
    );
}