"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";

/*
 * Cinematic Dog Encounter Component (Refined Phase 6b)
 * Features:
 * - Custom double-pointed SVG speech bubble.
 * - Dogs shifted towards the center and slightly upwards.
 * - Calibrated layout to frame the "Let the paws do the talking" message while keeping background icons visible.
 */

export default function CinematicDogs({
  active,
  onSequenceComplete,
  blurStyle,
  scale = 1,
}: {
  active: boolean;
  onSequenceComplete?: () => void;
  blurStyle?: CSSProperties;
  scale?: number;
}) {
  const [show, setShow] = useState(false);
  const text = "Let the paws do the talking";

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (active) {
      // Start 2 seconds after the diagonal sequence begins
      timer = setTimeout(() => setShow(true), 2000);
    } else {
      setShow(false);
    }
    return () => clearTimeout(timer);
  }, [active]);

  useEffect(() => {
    if (!active || !onSequenceComplete) return;

    // Total time from activation until the entrance sequence is done:
    // 2000ms (initial delay) + 2200ms (bubble pop completes; dogs finish earlier at 1800ms).
    const timer = setTimeout(() => onSequenceComplete(), 4200);
    return () => clearTimeout(timer);
  }, [active, onSequenceComplete]);

  if (!active || !show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[180] overflow-hidden" style={blurStyle}>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes dog0In {
          0% { transform: translate(-80%, 100%) rotate(-10deg); opacity: 0; }
          100% { transform: translate(0, 0) rotate(5deg); opacity: 1; }
        }
        @keyframes dog1In {
          0% { transform: translate(80%, 100%) rotate(10deg); opacity: 0; }
          100% { transform: translate(0, 0) rotate(-5deg); opacity: 1; }
        }
        @keyframes bubblePop {
          0% { transform: translateY(20px) scale(0.8); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes textWave {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-dog0 {
          animation: dog0In 1800ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .animate-dog1 {
          animation: dog1In 1800ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .animate-bubblePop {
          animation: bubblePop 800ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 1400ms forwards;
        }
        .animate-textWave {
          display: inline-block;
          animation: textWave 2.5s ease-in-out infinite;
        }
      `}} />

      {/* Dog 0 (Left-Center) - shifted more inward and up to reveal cat icon */}
      <div
        className="absolute left-[18%] bottom-[12%] w-[450px] h-[450px]"
        style={{ transform: `scale(${scale})`, transformOrigin: "center" }}
      >
        <div className="w-full h-full animate-dog0">
          <img src="/dog0.svg" alt="" className="w-full h-full object-contain" />
        </div>
      </div>

      {/* Dog 1 (Right-Center) - shifted more inward and up to reveal rabbit icon */}
      <div
        className="absolute right-[18%] bottom-[12%] w-[450px] h-[450px]"
        style={{ transform: `scale(${scale})`, transformOrigin: "center" }}
      >
        <div className="w-full h-full animate-dog1">
          <img src="/dog1.svg" alt="" className="w-full h-full object-contain" />
        </div>
      </div>

      {/* Speech Bubble and Text - Offset position and split text into two lines */}
      <div
        className="absolute inset-x-0 bottom-[55%] flex justify-center ml-[-40px] mb-[20px]"
        style={{ transform: `scale(${scale})`, transformOrigin: "center" }}
      >
        <div className="opacity-0 animate-bubblePop">
          <div className="relative w-[600px] h-[180px]">
            <img
              src="/bubble.svg"
              alt=""
              className="w-full h-full object-fill drop-shadow-2xl"
            />
            <div className="absolute inset-0 flex items-center justify-center pt-12 pb-16 px-12">
              <div className="flex flex-col items-center">
                <h3 className="text-2xl md:text-3xl font-black text-green-900 text-center tracking-tight leading-none">
                  {"Let the paws".split("").map((char, i) => (
                    <span
                      key={`l1-${i}`}
                      className="animate-textWave"
                      style={{ animationDelay: `${char === " " ? "0s" : `${i * 0.04}s`}` }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </h3>
                <h3 className="text-2xl md:text-3xl font-black text-green-900 text-center tracking-tight leading-none mt-2">
                  {"do the talking".split("").map((char, i) => (
                    <span
                      key={`l2-${i}`}
                      className="animate-textWave"
                      style={{ animationDelay: `${char === " " ? "0s" : `${(i + 13) * 0.04}s`}` }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
