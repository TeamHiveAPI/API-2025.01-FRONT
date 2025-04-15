import { useEffect, useRef, useState } from "react";
import { IconBroadcast, IconChevronDown, IconClock, IconX } from "@tabler/icons-react";
import L from "leaflet";
import "./styles.scss";
import MapPinRoxo from "../../../public/map_pin_roxo.svg";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

interface CardAlertaAtivoProps {
    id: string;
    alertaAtivo: boolean;
    titulo: string;
    tempoAtivo: string;
    descricaoAlerta: string;
    estacao: string;
    coordenadas: [number, number];
    mini?: boolean;
}

export default function CardAlertaAtivo({
    alertaAtivo,
    titulo,
    tempoAtivo,
    descricaoAlerta,
    estacao,
    coordenadas,
    id,
}: CardAlertaAtivoProps) {

    const rippleContainerRef = useRef<HTMLDivElement | null>(null);
    const [Expandir, setExpandir] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);


    useEffect(() => {
        if (!Expandir) return;

        const createRipple = () => {
            if (!rippleContainerRef.current) return;

            const rippleContainer = rippleContainerRef.current;
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

        return () => clearInterval(interval);
    }, [Expandir]);

    useEffect(() => {
        if (!Expandir || mostrarModal) return;
      
        const Pin = new L.Icon({
          iconUrl: MapPinRoxo,
          shadowUrl: markerShadowPng,
          iconSize: [25, 42],
          iconAnchor: [12, 42],
          popupAnchor: [1, -34],
          shadowSize: [25, 25],
        });
      
        const map = L.map(id, {
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
      
        return () => {
          map.remove();
        };
        
      }, [coordenadas, id, Expandir, mostrarModal]);

      useEffect(() => {
        if (!mostrarModal) return;
    
        const Pin = new L.Icon({
            iconUrl: MapPinRoxo,
            shadowUrl: markerShadowPng,
            iconSize: [25, 42],
            iconAnchor: [12, 42],
            popupAnchor: [1, -34],
            shadowSize: [25, 25],
        });
    
        const modalMap = L.map(`modal-${id}`, {
            center: coordenadas,
            zoom: 12,
            zoomControl: true,
            attributionControl: false,
            scrollWheelZoom: true,
            dragging: true,
            doubleClickZoom: true,
        });
    
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {}).addTo(modalMap);
        L.marker(coordenadas, { icon: Pin }).addTo(modalMap);

        setTimeout(() => {
            modalMap.invalidateSize();
            modalMap.setView(coordenadas, 12);
        }, 100);
    
        return () => {
            modalMap.remove();
        };

    }, [mostrarModal, coordenadas, id]);    

    return (
        <>
        <div className="caes_wrapper caal">
            <div className="caal_esq">
                <div>
                    <div className={`caal_cima ${!Expandir ? 'sem_margem' : ''}`}>
                        <div className="caal_info_esq">
                            <div className={alertaAtivo ? "caal_ativo" : "caal_inativo"}></div>
                            <h5 className="caal_titulo">{titulo}</h5>
                            <div className="caal_tempo">
                                <IconClock width={16} stroke={1.5} color="#808080" />
                                <p>{tempoAtivo}</p>
                            </div>
                        </div>
                        {!Expandir && (
                            <>
                                <div className="caal_info mini">
                                    <IconBroadcast width={32} stroke={1.5} color="#808080" />
                                    <p>{estacao}</p>
                                </div>
                            </>
                        )}
                    </div>

                    {Expandir && (
                        <div className="caal_meio">
                            <p>{descricaoAlerta}</p>
                        </div>
                    )}
                </div>

                {Expandir && (
                    <div className="caal_info">
                        <p>ESTAÇÃO</p>
                        <p>{estacao}</p>
                    </div>
                )}
            </div>

            <div className="caal_dir">
                {Expandir && !mostrarModal && (
                <>
                    <div ref={rippleContainerRef} className="ripple_effect" />
                    <div id={id} className="caal_mapa" onClick={() => setMostrarModal(true)} />
                </>
                )}

                <div className={`caal_expandir ${Expandir ? 'aberto' : ''}`} onClick={() => setExpandir((prev) => !prev)}>
                    <IconChevronDown
                        width={48}
                        height={48}
                        stroke={1.5}
                        color="#808080"
                    />
                </div>
            </div>
        </div>

        {mostrarModal && (
            <>
            <div className="modal_mapa">
                <div className="modal_overlay" onClick={() => setMostrarModal(false)} />
                <div className="modal_content">
                    <div className="modal_mapa_cima">
                        <p>Mapa Expandido</p>
                        <IconX width={32} height={32} color={"#404040"} onClick={() => setMostrarModal(false)} />
                    </div>
                    <div id={`modal-${id}`} className="caal_mapa_modal" />
                </div>
            </div>
==          </>
        )}
        </>
    );
}