"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import DiagonalEncounter from "@/components/DiagonalEncounter";
import CinematicDogs from "@/components/CinematicDogs";
import PostSecondScrollBentoGrid from "@/components/PostSecondScrollBentoGrid";

const SCROLL_SCALE = 5 / 3;
const HERO_BLUR_START = 200 * SCROLL_SCALE;
const HERO_BLUR_SPEED = 20 * SCROLL_SCALE;
const HERO_MID_START = 300 * SCROLL_SCALE;
const HERO_MID_DURATION = 416 * SCROLL_SCALE;
const HERO_FINAL_START = 550 * SCROLL_SCALE;
const HERO_FINAL_DURATION = 125 * SCROLL_SCALE;
const DIAGONAL_TRIGGER = 600 * SCROLL_SCALE;
const PHASE_1_SCROLL_LENGTH = 1600;
const PHASE_2_SCROLL_LENGTH = 1200;
const PHASE_2_SQUISH_START = 400;
const PHASE_2_START = PHASE_1_SCROLL_LENGTH;
const TOTAL_SCROLL_HEIGHT = PHASE_2_START + PHASE_2_SCROLL_LENGTH;
const HERO_FINAL_RANGE = DIAGONAL_TRIGGER - HERO_FINAL_START;
const HERO_VERTICAL_MULTIPLIER = 500 / HERO_FINAL_RANGE;
const HERO_HORIZONTAL_MULTIPLIER = 1000 / HERO_FINAL_RANGE;

const getHeroOpacity = (scrollY: number) => {
  if (scrollY > HERO_FINAL_START) {
    return Math.max(0.4 - (scrollY - HERO_FINAL_START) / HERO_FINAL_DURATION, 0);
  }
  if (scrollY > HERO_MID_START) {
    return Math.max(1 - (scrollY - HERO_MID_START) / HERO_MID_DURATION, 0.4);
  }
  return 1;
};

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
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">

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
function PawCursor({ trailingPos, showTan }: { trailingPos: { x: number, y: number }, showTan: boolean }) {
  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[200] transition-colors duration-500"
      style={{
        transform: `translate(${trailingPos.x}px, ${trailingPos.y}px)`,
        color: showTan ? '#C29B6D' : '#410202',
        opacity: 1
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
    const safePlay = (video: HTMLVideoElement | null) => {
      if (!video) return;
      video.play().catch(() => {
        // Ignore power-saving/autoplay aborts to avoid noisy console errors.
      });
    };
    safePlay(vid1Ref.current);
  }, []);

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    const current = video.currentTime;
    const duration = video.duration || 1;

    // Disable loop updates if we've clicked (to prevent text reset mid-transition)
    // Disable loop updates if we've clicked (to prevent text reset mid-transition)
    if (duration > 1.5 && duration - current <= 1.5) {
      if (activeVid === 1 && vid2Ref.current && vid2Ref.current.paused) {
        setActiveVid(2);
        vid2Ref.current.currentTime = 0;
        vid2Ref.current.play().catch(() => { });
        onLoopComplete();
      } else if (activeVid === 2 && vid1Ref.current && vid1Ref.current.paused) {
        setActiveVid(1);
        vid1Ref.current.currentTime = 0;
        vid1Ref.current.play().catch(() => { });
        onLoopComplete();
      }
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-black -z-50 overflow-hidden pointer-events-none">
      <video
        ref={vid1Ref}
        src="/Loop0.mp4"
        className={`absolute inset-0 w-full h-full object-cover ${activeVid === 1
          ? "opacity-100 z-0 transition-none filter-none"
          : "opacity-0 z-10 transition-opacity duration-1000 ease-in-out"
          }`}
        autoPlay muted playsInline preload="auto"
        onTimeUpdate={activeVid === 1 ? handleTimeUpdate : undefined}
      />
      <video
        ref={vid2Ref}
        src="/Loop0.mp4"
        className={`absolute inset-0 w-full h-full object-cover ${activeVid === 2
          ? "opacity-100 z-0 transition-none filter-none"
          : "opacity-0 z-10 transition-opacity duration-1000 ease-in-out"
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
  const [isClicked, setIsClicked] = useState(false);
  const [clickPos, setClickPos] = useState({ x: 0, y: 0 });
  const [unmountIntro, setUnmountIntro] = useState(false);
  const [showExpansion, setShowExpansion] = useState(false);
  const [showTan, setShowTan] = useState(false);
  const [showPetGrid, setShowPetGrid] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [showSecondaryText, setShowSecondaryText] = useState(false);
  const [showSecondaryExit, setShowSecondaryExit] = useState(false);
  const [showHero, setShowHero] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(false);
  const [startBobbing, setStartBobbing] = useState(false);
  const [showFinalPetGrid, setShowFinalPetGrid] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const scrollContainerRef = useRef<HTMLElement>(null);

  // Scroll Tracking
  useEffect(() => {
    if (!showHero) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    let frame = 0;
    let lastScrollTop = -1;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const next = container.scrollTop;
        if (next !== lastScrollTop) {
          lastScrollTop = next;
          setScrollY(next);
        }
      });
    };

    onScroll();
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [showHero]);

  // Lifted Cursor State
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const mousePosRef = { x: -100, y: -100 };
    let isMounted = true;
    let frame: number;
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.x = e.clientX;
      mousePosRef.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animateTrailing = () => {
      setTrailingPos((prev) => {
        const next = {
          x: prev.x + (mousePosRef.x - prev.x) * 0.15,
          y: prev.y + (mousePosRef.y - prev.y) * 0.15,
        };
        return next;
      });
      if (isMounted) {
        frame = requestAnimationFrame(animateTrailing);
      }
    };
    frame = requestAnimationFrame(animateTrailing);

    return () => {
      isMounted = false;
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (isClicked) {
      setShowExpansion(true);
      const tanTimer = setTimeout(() => setShowTan(true), 1000);

      // Start Navbar animation at 1120ms to finish at 1720ms (600ms duration)
      // This is 100ms before the PetGrid starts appearing at 1820ms.
      const navTimer = setTimeout(() => setShowNavbar(true), 1120);

      // Start Secondary Text at 1120ms (600ms duration) to align with Navbar
      const secondaryTimer = setTimeout(() => setShowSecondaryText(true), 1120);

      // Transition to Hero: Exit Secondary Text and Fade In Hero at 2720ms (1000ms after completion)
      const exitTimer = setTimeout(() => setShowSecondaryExit(true), 2720);
      const heroTimer = setTimeout(() => setShowHero(true), 2720);

      // Endless Word Loop starting shortly after Hero fade-in
      let wordInterval: NodeJS.Timeout;
      const startLoopTimer = setTimeout(() => {
        wordInterval = setInterval(() => {
          setActiveWordIndex(prev => (prev + 1) % 3);
        }, 2000); // Slowed down for better readability
      }, 3020);

      // Start PetGrid morph at 1820ms to finish at 2820ms (1000ms duration)
      const gridTimer = setTimeout(() => setShowPetGrid(true), 1820);

      // Swipe Up Hint: 3s after hero entry (5720ms)
      const swipeTimer = setTimeout(() => {
        console.log("Showing Swipe Hint at 5720ms");
        setShowSwipeHint(true);
      }, 5720);
      const bobTimer = setTimeout(() => {
        console.log("Starting Bobbing at 6520ms");
        setStartBobbing(true);
      }, 6520); // Starts after 800ms slide-up completes

      // Unmount ripples exactly after they finish expansion (320ms stagger + 2400ms duration)
      const rippleTimer = setTimeout(() => setShowExpansion(false), 2800);

      const unmountTimer = setTimeout(() => {
        console.log("Unmounting Intro at 4000ms");
        setUnmountIntro(true);
      }, 4000); // Reduced to 4s: as soon as ripples finish and forest green is solid

      return () => {
        clearTimeout(tanTimer);
        clearTimeout(navTimer);
        clearTimeout(secondaryTimer);
        clearTimeout(exitTimer);
        clearTimeout(heroTimer);
        clearTimeout(startLoopTimer);
        if (wordInterval) clearInterval(wordInterval);
        clearTimeout(gridTimer);
        clearTimeout(swipeTimer);
        clearTimeout(bobTimer);
        clearTimeout(rippleTimer);
        clearTimeout(unmountTimer);
      };
    }
  }, [isClicked]);

  const handleLoopComplete = () => {
    setBlast(true);
    // Adjusted timeout to match the new 2000ms slow crossfade
    setTimeout(() => {
      setBlast(false);
      setLoopIndex(prev => prev + 1);
    }, 2000);
  };

  const heroBlurValue = scrollY > HERO_BLUR_START ? Math.min((scrollY - HERO_BLUR_START) / HERO_BLUR_SPEED, 10) : 0;
  const heroFinalDelta = Math.max(scrollY - HERO_FINAL_START, 0);
  const heroOpacityValue = showHero ? getHeroOpacity(scrollY) : 0;

  const earlySwipeHintOpacity = (showSwipeHint && scrollY < 1200)
    ? Math.max(1 - scrollY / 100, 0)
    : 0;
  const showEarlySwipeHint = earlySwipeHintOpacity > 0;
  const secondSwipeHintOpacity = (() => {
    const start = 1200;
    const end = PHASE_1_SCROLL_LENGTH;
    const fade = 120;
    if (scrollY < start || scrollY > end) return 0;
    const fadeIn = Math.min((scrollY - start) / fade, 1);
    const fadeOut = Math.min((end - scrollY) / fade, 1);
    return Math.min(fadeIn, fadeOut);
  })();
  const showSecondSwipeHint = secondSwipeHintOpacity > 0;

  const phase2ScrollY = Math.min(Math.max(scrollY - PHASE_2_START, 0), PHASE_2_SCROLL_LENGTH);
  const phase2T = PHASE_2_SCROLL_LENGTH > 0 ? phase2ScrollY / PHASE_2_SCROLL_LENGTH : 0;
  const phase2SquishT = phase2ScrollY <= PHASE_2_SQUISH_START
    ? 0
    : Math.min((phase2ScrollY - PHASE_2_SQUISH_START) / (PHASE_2_SCROLL_LENGTH - PHASE_2_SQUISH_START), 1);
  const phase2Scale = 1 - phase2SquishT;
  const phase2BlurPx = Math.min(phase2T * 22, 22);
  const phase2ExitOpacity = Math.min(Math.max(1 - (phase2ScrollY - 600) / 200, 0), 1);
  const phase2BlurStyle = phase2ScrollY > 0
    ? {
      filter: `blur(${phase2BlurPx}px)`,
      willChange: "filter, opacity" as const,
      opacity: phase2ExitOpacity,
    }
    : undefined;

  const gridProgress = Math.min(Math.max((phase2ScrollY - 800) / 400, 0), 1);
  const finalPetGridOpacity = Math.pow(gridProgress, 6);

  const handleGlobalClick = (e: React.MouseEvent) => {
    if (isClicked) return;
    setIsClicked(true);
    // Use trailingPos for visual lock with paw, not raw mouse e.clientX
    setClickPos({ x: trailingPos.x, y: trailingPos.y });
  };

  return (
    <main
      ref={scrollContainerRef}
      onClick={handleGlobalClick}
      className={`relative h-screen w-full overflow-y-auto overflow-x-hidden cursor-none z-0 ${showHero ? 'home-scroll-snap' : ''}`}
      style={{
        backgroundColor: isClicked ? '#022009' : 'black',
        transition: isClicked ? 'background-color 2400ms ease-in-out 320ms' : 'none',
      }}
    >
      {/* Scroll-snap sentinels: forces one phase at a time even on fast momentum scroll. */}
      {showHero && (
        <div aria-hidden className="absolute inset-x-0 top-0 pointer-events-none opacity-0">
          <div className="snap-stop h-px" />
          <div style={{ height: PHASE_1_SCROLL_LENGTH }} />
          <div className="snap-stop h-px" />
          <div style={{ height: PHASE_2_SCROLL_LENGTH }} />
          <div className="snap-stop h-px" />
          <div className="h-screen" /> {/* Spacer to allow the last snap point to reach the top */}
        </div>
      )}

      {/* Persistent Global Animation Definitions */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes rippleExpand {
          0% {
            transform: translate(-50%, -50%) scale(0.1);
            background-color: var(--ripple-start-color, #FFFFFF);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(150);
            background-color: #022009;
            opacity: 1;
          }
        }
        @keyframes secondaryFade {
          0% { opacity: 0; transform: translate3d(0, 0, 0); }
          75% { opacity: 0.1; transform: translate3d(0, 0, 0); }
          100% { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        @keyframes secondaryGlideShift {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(0, -180px, 0); }
        }
        @keyframes swipeBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-swipeBob {
          animation: swipeBob 3000ms ease-in-out infinite;
        }

        .home-scroll-snap {
          scroll-snap-type: y mandatory;
        }
        .snap-stop {
          scroll-snap-align: start;
          scroll-snap-stop: always;
        }
      `}} />

      <Navbar show={showNavbar} />
      <PawCursor trailingPos={trailingPos} showTan={showTan} />
      <div
        className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none z-[170]"
        style={{
          opacity: heroOpacityValue,
          animation: showSecondaryExit
            ? 'secondaryGlideShift 800ms cubic-bezier(0.4, 0, 0.2, 1) forwards'
            : (showSecondaryText ? 'secondaryFade 600ms ease-out forwards' : 'none'),
          willChange: 'opacity, filter, transform',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          filter: `blur(${heroBlurValue}px)`,
          transition: scrollY === 0 ? 'opacity 800ms ease-out, filter 800ms ease-out' : 'none',
          transform: `translateY(${-heroFinalDelta * HERO_VERTICAL_MULTIPLIER}px)`
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-4xl md:text-6xl font-black text-white text-center drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)] tracking-tight">
            Coffee for you,
          </h2>
          <h2 className="text-4xl md:text-6xl font-black text-white text-center drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)] tracking-tight">
            Tea for your pet
          </h2>
        </div>
      </div>

      {/* Main Hero Paragraph and Word Loop */}
      <div
        className={`fixed inset-0 flex items-center justify-center pointer-events-none z-[170] px-6 ${showHero ? 'opacity-100' : 'opacity-0'}`}
        style={{
          transform: `translateY(${80 - heroFinalDelta * HERO_VERTICAL_MULTIPLIER}px)`,
          filter: `blur(${heroBlurValue}px)`,
          opacity: heroOpacityValue,
          willChange: 'opacity, filter, transform',
          transition: scrollY === 0 ? 'opacity 1200ms ease-out 200ms, filter 1200ms ease-out' : 'none'
        }}
      >
        <div className="max-w-4xl text-center flex flex-col gap-4">
          {/* Part 1: Rockets Left */}
          <p
            className="text-2xl md:text-3xl font-bold text-white leading-relaxed drop-shadow-lg"
            style={{
              transform: `translateX(${-heroFinalDelta * HERO_HORIZONTAL_MULTIPLIER}px)`,
              opacity: heroOpacityValue
            }}
          >
            PawMatch is a friendly meetup club where pets and{" "}
            <br className="hidden md:block" />
            their humans come together to{" "}
            <span className="inline-block relative h-[1.1em] w-[4.6em] top-[0.19em] overflow-hidden ml-0.7">
              {[
                { word: 'relax', color: '#39FF14' },
                { word: 'socialize', color: '#00BFFF' },
                { word: 'enjoy', color: '#FF007F' }
              ].map((item, i) => (
                <span
                  key={item.word}
                  className="absolute left-0 w-full h-full flex items-center justify-start transition-all duration-1000 ease-in-out"
                  style={{
                    color: item.color,
                    transform: `translateY(${(i - activeWordIndex) * 100}%)`,
                    opacity: i === activeWordIndex ? 1 : 0
                  }}
                >
                  {item.word}.
                </span>
              ))}
            </span>
          </p>

          {/* Part 2: Rockets Right */}
          <p
            className="text-2xl md:text-3xl font-bold text-white leading-relaxed drop-shadow-lg"
            style={{
              transform: `translateX(${heroFinalDelta * HERO_HORIZONTAL_MULTIPLIER}px)`,
              opacity: heroOpacityValue
            }}
          >
            Bring your companion and connect with fellow{" "}
            <br className="hidden md:block" />
            pet lovers overs coffee, easy chats and wagging tails.
          </p>
        </div>
      </div>

      {/* Swipe Up Hint - Isolated bobbing from centering to avoid transform conflicts */}
      <div className="fixed bottom-[72px] left-1/2 -translate-x-1/2 pointer-events-none z-[170]">
        <div
          className={`transition-all duration-[800ms] ease-out ${showEarlySwipeHint ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'
            }`}
          style={{ opacity: earlySwipeHintOpacity }}
        >
          <div className={startBobbing ? 'animate-swipeBob' : ''}>
            <div className="flex flex-col items-center gap-1">
              <span className="text-white/60 text-sm font-bold tracking-widest uppercase mb-1 drop-shadow-md">
                Swipe up for more
              </span>
              <span className="material-symbols-outlined text-white/40 text-2xl">
                keyboard_double_arrow_up
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Swipe Up Hint (Phase 1 Late) - fades in at 1200px and fades out at 1600px */}
      <div className="fixed bottom-[72px] left-1/2 -translate-x-1/2 pointer-events-none z-[170]">
        <div
          className={`transition-all duration-[800ms] ease-out ${showSecondSwipeHint ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'
            }`}
          style={{ opacity: secondSwipeHintOpacity }}
        >
          <div className={showSecondSwipeHint ? 'animate-swipeBob' : ''}>
            <div className="flex flex-col items-center gap-1">
              <span className="text-white/60 text-sm font-bold tracking-widest uppercase mb-1 drop-shadow-md">
                Swipe up for more
              </span>
              <span className="material-symbols-outlined text-white/40 text-2xl">
                keyboard_double_arrow_up
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* PetGrid Reveal - Promoted to z-[160] so it fades in OVER the ripples/morph */}
      <div
        className={`fixed inset-0 transition-opacity duration-[1000ms] ease-in-out pointer-events-none z-[160] ${showPetGrid ? 'opacity-100' : 'opacity-0'}`}
        style={{
          backgroundImage: `url('/PetGrid4.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: `blur(${scrollY > 50 ? Math.min((scrollY - 50) / 40, 10) : 0}px)`,
          opacity: showPetGrid ? (scrollY >= DIAGONAL_TRIGGER ? 0 : Math.max(1 - scrollY / DIAGONAL_TRIGGER, 0)) : 0
        }}
      />

      {/* Post-Second Scroll Bento Grid */}
      <PostSecondScrollBentoGrid opacity={finalPetGridOpacity} visible={finalPetGridOpacity >= 1} />

      {/* Diagonal Pet Encounter — triggered after rocket split */}
      <DiagonalEncounter active={scrollY >= DIAGONAL_TRIGGER} blurStyle={phase2BlurStyle} scale={phase2Scale} />

      {/* Cinematic Dog Encounter — triggered 2s after sequence start */}
      <CinematicDogs
        active={scrollY >= DIAGONAL_TRIGGER}
        blurStyle={phase2BlurStyle}
        scale={phase2Scale}
      />

      {/* Ripple Expansion Overlay */}
      {showExpansion && (
        <div
          className="fixed pointer-events-none z-[150] flex items-center justify-center transform-gpu"
          style={{
            left: clickPos.x,
            top: clickPos.y,
            width: 0,
            height: 0,
          }}
        >
          {[
            { delay: 0, color: '#FFFFFF' },
            { delay: 80, color: '#C0C7C2' },
            { delay: 160, color: '#818F84' },
            { delay: 240, color: '#415846' },
            { delay: 320, color: '#022009' }
          ].map((ripple, i) => (
            <div
              key={`ripple-${i}`}
              className="absolute rounded-full"
              style={{
                width: '120px',
                height: '120px',
                animation: `rippleExpand 2.4s cubic-bezier(0.7, 0, 0.3, 1) ${ripple.delay}ms forwards`,
                willChange: 'transform, background-color, opacity',
                transformOrigin: 'center',
                ['--ripple-start-color' as any]: ripple.color,
              }}
            />
          ))}
        </div>
      )}

      {!unmountIntro && (
        <>
          <SeamlessLoop onLoopComplete={handleLoopComplete} />
          <AnimatedText key={loopIndex} blast={blast} />
        </>
      )}
    </main>
  );
}
