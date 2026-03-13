"use client";

import { useState, useEffect, useRef } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────
const W = 1920;
const H = 1080;

// ─── Cell Definitions ─────────────────────────────────────────────────────────
// Mapping cells to grid-areas. Layout is 3 rows x 5 columns.
const CELLS = [
    {
        id: "founder",
        label: "About the Founder",
        area: "founder",
        icon: "/roentgen_dog.svg",
        frame: "/TopLeft.svg",
        delay: 200,
    },
    {
        id: "events",
        label: "Events",
        area: "events",
        icon: "/cat0.svg",
        frame: "/TopMid.svg",
        delay: 100,
    },
    {
        id: "newsletter",
        label: "Newsletter",
        area: "newsletter",
        icon: "/love0.svg",
        frame: "/Union.svg",
        delay: 300,
    },
    {
        id: "waiver",
        label: "Waiver & Liability",
        area: "waiver",
        icon: "/dog0.svg",
        frame: undefined,
        delay: 250,
    },
    {
        id: "howworks",
        label: "How This Works",
        area: "howworks",
        icon: "/bird0.svg",
        frame: "/Rectangle 301.svg",
        delay: 80,
    },
    {
        id: "contact",
        label: "Contact",
        area: "contact",
        icon: "/love1.svg",
        frame: "/Rectangle 291.svg",
        delay: 0, // Blooms first
    },
    {
        id: "stories",
        label: "Member Stories",
        area: "stories",
        icon: "/bird1.svg",
        frame: "/Rectangle 292.svg",
        delay: 150,
    },
    {
        id: "photobooth",
        label: "Photo Booth",
        area: "photobooth",
        icon: "/cat1.svg",
        frame: "/Rectangle 297.svg",
        delay: 120,
    },
    {
        id: "contributor",
        label: "Become a Contributor",
        area: "contributor",
        icon: "/rabbit0.svg",
        frame: "/Rectangle 290.svg",
        delay: 280,
    },
] as const;

type CellId = (typeof CELLS)[number]["id"];

export default function BentoGrid({ visible }: { visible: boolean }) {
    const [bloomed, setBloomed] = useState(false);
    const [selected, setSelected] = useState<CellId | null>(null);
    const [scale, setScale] = useState(1);
    const prevVisible = useRef(false);

    // Scaling to fit viewport
    useEffect(() => {
        const compute = () => setScale(Math.min(window.innerWidth / W, window.innerHeight / H));
        compute();
        window.addEventListener("resize", compute);
        return () => window.removeEventListener("resize", compute);
    }, []);

    // Bloom trigger
    useEffect(() => {
        if (visible && !prevVisible.current) {
            const t = setTimeout(() => setBloomed(true), 100);
            return () => clearTimeout(t);
        }
        if (!visible) {
            setBloomed(false);
            setSelected(null);
        }
        prevVisible.current = visible;
    }, [visible]);

    return (
        <div
            className="fixed inset-0 flex items-center justify-center"
            style={{
                zIndex: 200,
                opacity: visible ? 1 : 0,
                transition: "opacity 400ms ease-out",
                pointerEvents: visible ? "auto" : "none",
            }}
        >
            <style>{`
                @keyframes bentoBloom {
                    0%   { transform: scale(0.4); opacity: 0; }
                    60%  { transform: scale(1.05); opacity: 1; }
                    85%  { transform: scale(0.98); }
                    100% { transform: scale(1); opacity: 1; }
                }

                @keyframes shimmerSweep {
                    0%   { transform: translateX(-150%) skewX(-20deg); opacity: 0.6; }
                    100% { transform: translateX(250%) skewX(-20deg); opacity: 0; }
                }

                .bento-cell {
                    position: relative;
                    border-radius: 34px;
                    transition: border-color 200ms ease-out, opacity 300ms ease-out, transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
                    cursor: pointer;
                    overflow: hidden;
                    will-change: transform, opacity;
                }

                .bento-cell::after {
                    content: '';
                    position: absolute; inset: 0;
                    background: linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.2) 50%, transparent 75%);
                    transform: translateX(-150%) skewX(-20deg);
                    pointer-events: none;
                    opacity: 0;
                    z-index: 10;
                }

                .bento-cell:hover::after {
                    animation: shimmerSweep 600ms ease-out forwards;
                    opacity: 1;
                }

                .bento-cell.dimmed {
                    opacity: 0.15;
                    pointer-events: none;
                }

                .bento-cell.selected {
                    z-index: 50;
                    box-shadow: 0 0 0 2px rgba(255,255,255,0.2);
                }
            `}</style>

            <div
                style={{
                    width: 1550,
                    height: 872,
                    display: "grid",
                    gap: "28px",
                    transform: `scale(${scale})`,
                    transformOrigin: "center center",
                    gridTemplateAreas: `
                        "founder   founder   events    events    newsletter"
                        "waiver    howworks  contact   contact   newsletter"
                        "waiver    stories   photobooth photobooth contributor"
                    `,
                    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
                    gridTemplateRows: "1fr 1fr 1fr",
                }}
            >
                {CELLS.map((cell) => {
                    const isSelected = selected === cell.id;
                    const isDimmed = selected !== null && !isSelected;

                    return (
                        <div
                            key={cell.id}
                            className={`bento-cell ${isSelected ? "selected" : ""} ${isDimmed ? "dimmed" : ""}`}
                            style={{
                                gridArea: cell.area,
                                animation: bloomed ? `bentoBloom 700ms cubic-bezier(0.34, 1.56, 0.64, 1) ${cell.delay}ms both` : "none",
                                opacity: bloomed ? 1 : 0,
                                background: cell.frame ? "transparent" : "rgba(217, 217, 217, 0.25)",
                                border: cell.frame ? "none" : "1px solid rgba(255,255,255,0.1)",
                                boxShadow: cell.frame ? "none" : "0px 4px 12px 6px #00000040",
                            }}
                            onClick={() => setSelected((p) => (p === cell.id ? null : cell.id))}
                        >
                            {/* Frame SVG */}
                            {cell.frame && (
                                <img
                                    src={cell.frame}
                                    alt=""
                                    className="absolute inset-0 w-full h-full object-fill pointer-events-none"
                                    style={{
                                        // Slight scale to account for SVG shadows potentially bleeding out
                                        transform: "scale(1.05)",
                                    }}
                                />
                            )}

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 gap-3 z-20">
                                <img
                                    src={cell.icon}
                                    alt=""
                                    className="w-12 h-12 object-contain drop-shadow-md"
                                />
                                <span className="text-white font-semibold text-center leading-tight tracking-tight px-2" style={{ fontSize: "clamp(12px, 1vw, 16px)" }}>
                                    {cell.label}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
