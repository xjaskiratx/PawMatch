"use client";

import { useEffect, useState, useRef } from "react";

/*
 * 5 diagonal lines across the viewport, each with 2 SVG icons.
 * Icons travel from opposite edges toward a meeting point along sine/cosine wave paths.
 * Icons are tilted along their travel direction for a more natural approach.
 * After arriving, they bob up and down.
 *
 * Triggered when scrollY > 600 (after the rocket-split phase).
 */

interface DiagonalLine {
    // Start & end points as % of viewport
    startX: number; startY: number;
    endX: number; endY: number;
    // Meeting point as % along the line (0-1)
    meetAt: number;
    // Icon pair
    icon0: string;
    icon1: string;
    // Wave properties
    waveAmplitude: number;
    waveFrequency: number;
}

const LINES: DiagonalLine[] = [
    // Line 1: Upper-left — from left edge to top edge
    { startX: 0, startY: 24, endX: 28, endY: 4, meetAt: 0.35, icon0: "/love0.svg", icon1: "/love1.svg", waveAmplitude: 12, waveFrequency: 3 },
    // Line 2: Upper-right — from top edge to right edge
    { startX: 25, startY: 4, endX: 100, endY: 26, meetAt: 0.55, icon0: "/bird0.svg", icon1: "/bird1.svg", waveAmplitude: 10, waveFrequency: 4 },
    // Line 3: Lower-left — from upper-left crossing down to lower-center
    { startX: 0, startY: 42, endX: 45, endY: 78, meetAt: 0.25, icon0: "/cat0.svg", icon1: "/cat1.svg", waveAmplitude: 14, waveFrequency: 3.5 },
    // Line 4: Bottom-center — nearly vertical from top-center to bottom-center
    { startX: 48, startY: 0, endX: 48, endY: 100, meetAt: 0.88, icon0: "/coffee0.svg", icon1: "/coffee1.svg", waveAmplitude: 10, waveFrequency: 3 },
    // Line 5: Right side — from upper-right to lower-right
    { startX: 65, startY: 20, endX: 100, endY: 72, meetAt: 0.7, icon0: "/rabbit0.svg", icon1: "/rabbit1.svg", waveAmplitude: 11, waveFrequency: 4.5 },
];

const ICON_SIZE = 40;
const GAP = 60; // Distance between icons at meeting point

// Animation duration in ms (was 2000, now slower)
const TRAVEL_DURATION = 4000;

export default function DiagonalEncounter({ active }: { active: boolean }) {
    const [progress, setProgress] = useState(0); // 0 to 1
    const [bobbing, setBobbing] = useState(false);
    const [mounted, setMounted] = useState(false);
    const startTimeRef = useRef<number | null>(null);
    const frameRef = useRef<number>(0);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!active) {
            // Reset when not active
            startTimeRef.current = null;
            setProgress(0);
            setBobbing(false);
            return;
        }

        const animate = (timestamp: number) => {
            if (startTimeRef.current === null) {
                startTimeRef.current = timestamp;
            }

            const elapsed = timestamp - startTimeRef.current;
            const t = Math.min(elapsed / TRAVEL_DURATION, 1);

            // Ease-out cubic for smooth deceleration
            const eased = 1 - Math.pow(1 - t, 3);
            setProgress(eased);

            if (t < 1) {
                frameRef.current = requestAnimationFrame(animate);
            } else {
                setBobbing(true);
            }
        };

        frameRef.current = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(frameRef.current);
    }, [active]);


    // Calculate position of an icon along a diagonal line
    const getIconPosition = (
        line: DiagonalLine,
        fromStart: boolean, // true = icon comes from start edge, false = from end edge
        t: number // 0 = at edge, 1 = at meeting point
    ) => {
        // Meeting point in viewport %
        const meetX = line.startX + (line.endX - line.startX) * line.meetAt;
        const meetY = line.startY + (line.endY - line.startY) * line.meetAt;

        // Determine the starting position (edge of viewport)
        const edgeX = fromStart ? line.startX : line.endX;
        const edgeY = fromStart ? line.startY : line.endY;

        // Target position: slightly offset from meeting point (GAP/2 along the line direction)
        const dx = line.endX - line.startX;
        const dy = line.endY - line.startY;
        const lineLen = Math.sqrt(dx * dx + dy * dy);
        const normDx = dx / lineLen;
        const normDy = dy / lineLen;

        // Offset from meeting point in viewport % units (GAP is in px, convert roughly)
        const vw = typeof window !== 'undefined' ? window.innerWidth : 1920;
        const vh = typeof window !== 'undefined' ? window.innerHeight : 1080;
        const gapPercent = (GAP / 2 / vw) * 100;
        const targetX = fromStart
            ? meetX - normDx * gapPercent
            : meetX + normDx * gapPercent;
        const targetY = fromStart
            ? meetY - normDy * gapPercent
            : meetY + normDy * gapPercent;

        // Interpolate position
        const x = edgeX + (targetX - edgeX) * t;
        const y = edgeY + (targetY - edgeY) * t;

        // Add sine/cosine wave perpendicular to the line direction
        const perpDx = -normDy; // perpendicular
        const perpDy = normDx;

        // Wave diminishes as icon approaches meeting point
        const waveDecay = 1 - t;
        const waveOffset = Math.sin(t * Math.PI * 2 * line.waveFrequency) * line.waveAmplitude * waveDecay;

        const finalX = x + perpDx * (waveOffset / vw) * 100;
        const finalY = y + perpDy * (waveOffset / vh) * 100;

        return { x: finalX, y: finalY };
    };

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[175]">
            {/* Bobbing keyframes */}
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes iconBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}} />

            {LINES.map((line, lineIdx) => {
                const pos0 = getIconPosition(line, true, progress);
                const pos1 = getIconPosition(line, false, progress);

                return (
                    <div key={lineIdx}>
                        {/* Icon 0: Outer container handles positioning and centering */}
                        <div
                            style={{
                                position: "absolute",
                                left: `${pos0.x}%`,
                                top: `${pos0.y}%`,
                                width: `${ICON_SIZE}px`,
                                height: `${ICON_SIZE}px`,
                                transform: "translate(-50%, -50%)",
                                opacity: active ? (progress > 0.05 ? 1 : progress / 0.05) : 0,
                                transition: active ? "none" : "opacity 300ms ease-out",
                                willChange: "left, top, opacity",
                            }}
                        >
                            {/* Inner container handles the bobbing animation */}
                            <div
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    animation: bobbing ? "iconBob 2s ease-in-out infinite" : "none",
                                }}
                            >
                                <img
                                    src={line.icon0}
                                    alt=""
                                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                />
                            </div>
                        </div>

                        {/* Icon 1: Outer container handles positioning and centering */}
                        <div
                            style={{
                                position: "absolute",
                                left: `${pos1.x}%`,
                                top: `${pos1.y}%`,
                                width: `${ICON_SIZE}px`,
                                height: `${ICON_SIZE}px`,
                                transform: "translate(-50%, -50%)",
                                opacity: active ? (progress > 0.05 ? 1 : progress / 0.05) : 0,
                                transition: active ? "none" : "opacity 300ms ease-out",
                                willChange: "left, top, opacity",
                            }}
                        >
                            {/* Inner container handles the bobbing animation */}
                            <div
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    animation: bobbing ? "iconBob 2s ease-in-out infinite 0.5s" : "none",
                                }}
                            >
                                <img
                                    src={line.icon1}
                                    alt=""
                                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
