import React, { useState, useEffect, useRef } from "react";

export interface GlobePoint {
    lat: number;
    lng: number;
    label: string;
    slug: string;
    color: string;
}

interface TravelGlobeProps {
    points: GlobePoint[];
}

const PIN_SIZE = 28; // px

function hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const PIN_SVG = `<svg viewBox="-4 0 36 36" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"/>
    <circle fill="rgba(0,0,0,0.35)" cx="14" cy="13" r="6"/>
</svg>`;

// North America center, slightly zoomed in (default altitude is ~2.5)
const INITIAL_POV = { lat: 42, lng: -95, altitude: 1.8 };

export default function TravelGlobe({ points }: TravelGlobeProps) {
    const [GlobeGL, setGlobeGL] = useState<any>(null);
    const globeRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(700);

    useEffect(() => {
        import("react-globe.gl").then((mod) => {
            setGlobeGL(() => mod.default);
        });

        if (containerRef.current) {
            setWidth(containerRef.current.offsetWidth);
        }
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                width: "100%",
                marginBottom: "1rem",
                borderRadius: 12,
                overflow: "hidden",
                background: "#0a0a1a",
            }}
        >
            {GlobeGL && (
                <GlobeGL
                    ref={globeRef}
                    onGlobeReady={() => {
                        globeRef.current?.pointOfView(INITIAL_POV, 0);
                    }}
                    globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                    backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                    htmlElementsData={points}
                    htmlAltitude={0.01}
                    htmlElement={(d: GlobePoint) => {
                        const el = document.createElement("div");
                        el.style.position = "relative";
                        el.style.color = d.color;
                        el.style.width = `${PIN_SIZE}px`;
                        el.style.transition = "opacity 250ms";
                        el.style.pointerEvents = "auto";
                        el.style.cursor = "pointer";

                        const pin = document.createElement("div");
                        pin.innerHTML = PIN_SVG;
                        el.appendChild(pin);

                        const tooltip = document.createElement("div");
                        tooltip.textContent = d.label;
                        tooltip.style.cssText = `
                            position: absolute;
                            bottom: 110%;
                            left: 50%;
                            transform: translateX(-50%);
                            background: rgba(10, 10, 26, 0.92);
                            color: #fff;
                            padding: 4px 10px;
                            border-radius: 4px;
                            font-size: 12px;
                            font-family: sans-serif;
                            white-space: nowrap;
                            pointer-events: none;
                            opacity: 0;
                            transition: opacity 150ms;
                            border: 1px solid ${hexToRgba(d.color, 0.6)};
                        `;
                        el.appendChild(tooltip);

                        el.onmouseenter = () => { tooltip.style.opacity = "1"; };
                        el.onmouseleave = () => { tooltip.style.opacity = "0"; };
                        el.onclick = () => {
                            window.location.href = `/travel/${d.slug}/`;
                        };

                        return el;
                    }}
                    htmlElementVisibilityModifier={(
                        el: HTMLElement,
                        isVisible: boolean
                    ) => {
                        el.style.opacity = isVisible ? "1" : "0";
                    }}
                    ringsData={points}
                    ringLat="lat"
                    ringLng="lng"
                    ringColor={(d: GlobePoint) => (t: number) => hexToRgba(d.color, 1 - t)}
                    ringMaxRadius={5}
                    ringPropagationSpeed={3}
                    ringRepeatPeriod={800}
                    ringAltitude={0.005}
                    width={width}
                    height={450}
                />
            )}
        </div>
    );
}
