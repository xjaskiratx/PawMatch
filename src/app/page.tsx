"use client";

import { useEffect, useState, useRef } from "react";

// The animated text component
function AnimatedText({ blast }: { blast: boolean }) {
  const [show, setShow] = useState(false);
  const base1 = "Click to say Hi".split("");
  const extra = "iiiii".split("");
  const base2 = ["!"];

  const totalChars = base1.length + extra.length + base2.length;
  const getGradientStyle = (index: number) => ({
    backgroundImage: "linear-gradient(to right, #FF7A18, #FFD84D)",
    backgroundSize: `${totalChars * 100}% 100%`,
    backgroundPosition: `${(index / (Math.max(1, totalChars - 1))) * 100}% 0`,
    WebkitTextFillColor: "transparent",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
  });

  useEffect(() => {
    // Show after 2 seconds
    const timer = setTimeout(() => setShow(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">

      {/* The Text */}
      <h1
        className="text-5xl md:text-7xl font-black tracking-tight flex whitespace-pre relative items-center justify-center"
        style={{
          filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.7))",
          perspective: "1000px",
          WebkitFontSmoothing: "antialiased",
          backfaceVisibility: "hidden",
        }}
      >
        {base1.map((char, i) => {
          const maxDelay = 600;
          // Scale delay across original 16 characters
          const delay = (maxDelay / 16) * i;
          return (
            <span key={`b1-${i}`} className="overflow-hidden inline-block leading-tight pt-2 pb-2">
              <span
                className="inline-block opacity-0"
                style={blast ? {
                  opacity: 1,
                  transform: "translate3d(0, 0, 0)",
                  animation: `slideUpExit 800ms cubic-bezier(0.6, -0.4, 0.735, 0.045) ${delay * 0.5}ms forwards`,
                  willChange: "transform",
                  backfaceVisibility: "hidden",
                  ...getGradientStyle(i)
                } : {
                  animation: `slideUpReveal 600ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms forwards`,
                  willChange: "transform",
                  backfaceVisibility: "hidden",
                  transform: "translate3d(0, 0, 0)",
                  ...getGradientStyle(i)
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            </span>
          );
        })}

        {/* Extra 'i's Expander */}
        <span
          className="inline-flex overflow-hidden relative"
          style={blast ? { width: "1.315em" } : {
            width: 0,
            animation: "extraWidthExpand 800ms ease-in-out 1200ms forwards"
          }}
        >
          {extra.map((char, i) => {
            const delay = 1200 + (400 / 5) * i;
            // For exit, we stagger based on total sequence
            const exitDelay = 300 + (250 / 5) * i;
            return (
              <span key={`ex-${i}`} className="overflow-hidden inline-block leading-tight pt-2 pb-2">
                <span
                  className="inline-block opacity-0"
                  style={blast ? {
                    opacity: 1,
                    transform: "translate3d(0, 0, 0)",
                    animation: `slideUpExit 800ms cubic-bezier(0.6, -0.4, 0.735, 0.045) ${exitDelay}ms forwards`,
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                    ...getGradientStyle(base1.length + i)
                  } : {
                    animation: `slideUpReveal 600ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms forwards`,
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                    transform: "translate3d(0, 0, 0)",
                    ...getGradientStyle(base1.length + i)
                  }}
                >
                  {char}
                </span>
              </span>
            );
          })}
        </span>

        {base2.map((char, i) => {
          // Exclamation point is index 15 in the original "Click to say Hi!"
          const delay = (600 / 16) * 15;
          const exitDelay = 550;
          return (
            <span key={`b2-${i}`} className="overflow-hidden inline-block leading-tight pt-2 pb-2">
              <span
                className="inline-block opacity-0"
                style={blast ? {
                  opacity: 1,
                  transform: "translate3d(0, 0, 0)",
                  animation: `slideUpExit 800ms cubic-bezier(0.6, -0.4, 0.735, 0.045) ${exitDelay}ms forwards`,
                  willChange: "transform",
                  backfaceVisibility: "hidden",
                  ...getGradientStyle(base1.length + extra.length + i)
                } : {
                  animation: `slideUpReveal 600ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms forwards`,
                  willChange: "transform",
                  backfaceVisibility: "hidden",
                  transform: "translate3d(0, 0, 0)",
                  ...getGradientStyle(base1.length + extra.length + i)
                }}
              >
                {char}
              </span>
            </span>
          );
        })}
      </h1>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes slideUpReveal {
          0% { transform: translate3d(0, 100%, 0); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translate3d(0, 0, 0); opacity: 1; }
        }

        @keyframes softFade {
          0% { opacity: 1; filter: blur(0px); }
          100% { opacity: 0; filter: blur(4px); transform: scale(0.98); }
        }

        @keyframes slideUpExit {
          0% { transform: translate3d(0, 0, 0); opacity: 1; }
          60% { opacity: 1; }
          100% { transform: translate3d(0, -150%, 0); opacity: 0; }
        }

        @keyframes extraWidthExpand {
          0% { width: 0; }
          100% { width: 1.315em; }
        }
      `}} />
    </div>
  );
}

// Custom Paw Cursor
function PawCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    let frame: number;
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animateTrailing = () => {
      setTrailingPos(prev => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        // smooth follow easing (0.15 is the speed)
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });
      frame = requestAnimationFrame(animateTrailing);
    };

    frame = requestAnimationFrame(animateTrailing);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frame);
    };
  }, [position]);

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[100]"
      style={{
        transform: `translate(${trailingPos.x}px, ${trailingPos.y}px)`,
        color: '#410202'
      }}
    >
      {/* Offset slightly so the mouse cursor is at the center of the paw */}
      <span className="material-symbols-outlined text-[50px] -ml-[25px] -mt-[25px]" style={{ textShadow: "0 0 10px rgba(0,0,0,0.3)" }}>pets</span>
    </div>
  );
}

// Global Seamless Video Loop
function SeamlessLoop({ onLoopComplete }: { onLoopComplete: () => void }) {
  const vid1Ref = useRef<HTMLVideoElement>(null);
  const vid2Ref = useRef<HTMLVideoElement>(null);
  const [activeVid, setActiveVid] = useState<1 | 2>(1);

  useEffect(() => {
    if (vid1Ref.current) vid1Ref.current.play().catch(e => console.error(e));
  }, []);

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    const current = video.currentTime;
    const duration = video.duration || 1;

    // Start crossfading exactly 1000ms (1.0s) before to match the new transition
    if (duration > 1 && duration - current <= 1.0) {
      if (activeVid === 1 && vid2Ref.current && vid2Ref.current.paused) {
        setActiveVid(2);
        vid2Ref.current.currentTime = 0;
        vid2Ref.current.play().catch(err => console.error(err));
        onLoopComplete();
      } else if (activeVid === 2 && vid1Ref.current && vid1Ref.current.paused) {
        setActiveVid(1);
        vid1Ref.current.currentTime = 0;
        vid1Ref.current.play().catch(err => console.error(err));
        onLoopComplete();
      }
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-black -z-50 overflow-hidden">
      {/* 
        To prevent the screen from dimming during the crossfade, we ALWAYS keep the 
        incoming video fully opaque at the bottom, and only fade out the outgoing 
        video on top of it.
      */}
      <video
        ref={vid1Ref}
        src="/Loop0.mp4"
        className={`absolute inset-0 w-full h-full object-cover ${activeVid === 1
          ? 'opacity-100 z-0 transition-none filter-none'
          : 'opacity-0 z-10 transition-opacity duration-1000 ease-in-out'
          }`}
        muted playsInline preload="auto"
        onTimeUpdate={activeVid === 1 ? handleTimeUpdate : undefined}
      />
      <video
        ref={vid2Ref}
        src="/Loop0.mp4"
        className={`absolute inset-0 w-full h-full object-cover ${activeVid === 2
          ? 'opacity-100 z-0 transition-none filter-none'
          : 'opacity-0 z-10 transition-opacity duration-1000 ease-in-out'
          }`}
        muted playsInline preload="auto"
        onTimeUpdate={activeVid === 2 ? handleTimeUpdate : undefined}
      />
      <div className="absolute inset-0 bg-black/10 pointer-events-none z-20" />
    </div>
  );
}

export default function Home() {
  const [blast, setBlast] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);

  const handleLoopComplete = () => {
    setBlast(true);
    // Adjusted timeout to match the new 2000ms slow crossfade
    setTimeout(() => {
      setBlast(false);
      setLoopIndex(prev => prev + 1);
    }, 2000);
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden flex items-center justify-center cursor-none">
      <PawCursor />
      <SeamlessLoop onLoopComplete={handleLoopComplete} />
      <AnimatedText key={loopIndex} blast={blast} />
    </main>
  );
}
