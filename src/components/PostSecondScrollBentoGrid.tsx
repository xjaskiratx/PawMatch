"use client";

import { useEffect, useMemo, useState } from "react";

const CELLS = [
  { id: "top-left", label: "About the Founder", icon: "/AboutTheFounder.png", w: 413, h: 249, x: 960 - 413 / 2 - 553.5, y: 540 - 249 / 2 - 285.5 },
  { id: "top-mid", label: "Newsletter", icon: "/MailPaw0.png", w: 413, h: 249, x: 960 - 413 / 2 - 112.5, y: 540 - 249 / 2 - 285.5 },
  { id: "top-right", label: "Waiver & Liability", icon: "/WaiverAndLiability.png", w: 627, h: 249, x: 1082, y: 130 },
  { id: "mid-left", label: "Events", icon: "/calendar.png", w: 413, h: 249, x: 960 - 413 / 2 - 553.5, y: 540 - 249 / 2 - 3.5 },
  { id: "mid-center", label: "How This Works", icon: "/HowItWorks.png", w: 617, h: 249, x: 646, y: 412 },
  { id: "mid-right", label: "Contact", icon: "/Contact.png", w: 413, h: 249, x: 960 - 413 / 2 + 542.5, y: 540 - 249 / 2 - 3.5 },
  { id: "bottom-left", label: "PawBooth", icon: "/PawBooth.png", w: 627, h: 249, x: 200, y: 689 },
  { id: "bottom-mid", label: "Member Stories", icon: "/MemberStories.png", w: 413, h: 249, x: 960 - 413 / 2 + 101.5, y: 540 - 249 / 2 + 273.5 },
  { id: "bottom-right", label: "Become a Contributor", icon: "/Contributor.png", w: 413, h: 249, x: 960 - 413 / 2 + 542.5, y: 540 - 249 / 2 + 273.5 },
];

export default function PostSecondScrollBentoGrid({
  opacity = 1,
  visible = false,
}: {
  opacity?: number;
  visible?: boolean;
}) {
  const [scale, setScale] = useState(1);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [cellsVisible, setCellsVisible] = useState(false);
  const navbarBottomOffset = 98;
  const cellBaseStyle = {
    background:
      "linear-gradient(140deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.08) 45%, rgba(255, 255, 255, 0.14) 100%)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    boxShadow:
      "0px 18px 36px rgba(0, 0, 0, 0.35), inset 0px 1px 0px rgba(255, 255, 255, 0.35)",
    backdropFilter: "blur(18px) saturate(130%)",
    WebkitBackdropFilter: "blur(18px) saturate(130%)",
  };

  const [islandBounds, setIslandBounds] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const [islandVisible, setIslandVisible] = useState(false);
  const newsletterCell = useMemo(() => CELLS.find((cell) => cell.label === "Newsletter") ?? null, []);
  const waiverCell = useMemo(() => CELLS.find((cell) => cell.label === "Waiver & Liability") ?? null, []);
  const howItWorksCell = useMemo(() => CELLS.find((cell) => cell.label === "How This Works") ?? null, []);
  const memberStoriesCell = useMemo(() => CELLS.find((cell) => cell.label === "Member Stories") ?? null, []);
  const photoBoothCell = useMemo(() => CELLS.find((cell) => cell.label === "PawBooth") ?? null, []);
  const contributorCell = useMemo(() => CELLS.find((cell) => cell.label === "Become a Contributor") ?? null, []);
  const contactCell = useMemo(() => CELLS.find((cell) => cell.label === "Contact") ?? null, []);
  const founderCell = useMemo(() => CELLS.find((cell) => cell.label === "About the Founder") ?? null, []);
  const eventsCell = useMemo(() => CELLS.find((cell) => cell.label === "Events") ?? null, []);

  useEffect(() => {
    if (!visible) {
      setCellsVisible(false);
      setActiveId(null);
      return;
    }

    setActiveId(null);
    const timer = window.setTimeout(() => setCellsVisible(true), 150);
    return () => window.clearTimeout(timer);
  }, [visible]);

  const getIsland = (activeIdValue: string | null) => {
    if (!activeIdValue) return null;
    const active = CELLS.find((cell) => cell.id === activeIdValue);
    if (!active) return null;
    const others = CELLS.filter((cell) => cell.id !== activeIdValue);
    const minX = Math.min(...others.map((cell) => cell.x));
    const minY = Math.min(...others.map((cell) => cell.y));
    const maxX = Math.max(...others.map((cell) => cell.x + cell.w));
    const maxY = Math.max(...others.map((cell) => cell.y + cell.h));
    return { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
  };

  const island = useMemo(() => getIsland(activeId), [activeId]);

  useEffect(() => {
    if (island) {
      setIslandBounds(island);
      setIslandVisible(true);
      return;
    }

    if (islandBounds) {
      setIslandVisible(false);
      const timer = window.setTimeout(() => {
        setIslandBounds(null);
      }, 800);
      return () => window.clearTimeout(timer);
    }
  }, [island, islandBounds]);

  useEffect(() => {
    const updateScale = () => {
      const nextScale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
      setScale(Number.isFinite(nextScale) && nextScale > 0 ? nextScale : 1);
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[160]"
      style={{ opacity, willChange: "opacity" }}
    >
      <style>{`
        .bento-cell {
          pointer-events: auto;
          position: relative;
          overflow: hidden;
        }
        .bento-cell::after {
          content: "";
          position: absolute;
          inset: -40% -60%;
          background: linear-gradient(120deg, transparent 20%, rgba(255, 255, 255, 0.25) 45%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0.2) 55%, transparent 80%);
          transform: translateX(-120%) rotate(8deg);
          opacity: 0;
          transition: opacity 150ms ease-out;
          pointer-events: none;
        }
        .bento-cell:hover::after {
          opacity: 1;
          animation: bentoShimmer 900ms ease-out;
        }
        @keyframes bentoShimmer {
          from { transform: translateX(-120%) rotate(8deg); }
          to { transform: translateX(120%) rotate(8deg); }
        }
        .bento-island {
          transition: opacity 800ms ease;
        }
        .bento-label {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          width: 100%;
          font-family: var(--font-display), system-ui, sans-serif;
          font-weight: 700;
          font-size: 22px;
          letter-spacing: 0.02em;
          color: rgba(255, 255, 255, 0.72);
          text-align: center;
          padding: 0 24px;
          position: relative;
          z-index: 1;
        }
        .newsletter-inline {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          height: 100%;
          padding: 0 28px;
          font-family: var(--font-bayon), var(--font-display), system-ui, sans-serif;
          font-size: 20px;
          letter-spacing: 0.03em;
          color: rgba(255, 255, 255, 0.78);
          text-transform: uppercase;
        }
        .newsletter-inline span {
          max-width: 44%;
        }
        .newsletter-inline .right {
          text-align: right;
          font-size: 14px;
          text-transform: none;
          letter-spacing: 0.01em;
          color: rgba(255, 255, 255, 0.68);
        }
        .newsletter-canvas {
          position: absolute;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
          color: rgba(255, 255, 255, 0.78);
        }
        .newsletter-canvas p {
          font-size: 17px;
          line-height: 1.5;
          letter-spacing: 0.01em;
          margin: 0;
          text-transform: none;
          font-family: var(--font-display), system-ui, sans-serif;
        }
        .newsletter-canvas ul {
          list-style: disc;
          padding-left: 20px;
          margin: 0;
          font-family: var(--font-display), system-ui, sans-serif;
          font-size: 17px;
          line-height: 1.5;
        }
        .events-scene {
          position: absolute;
          inset: 0;
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .events-scene img {
          width: 180px;
          height: auto;
          opacity: 0.6;
          filter: drop-shadow(0 6px 18px rgba(0, 0, 0, 0.25));
        }
        .events-bob {
          animation: eventsBob 3.4s ease-in-out infinite;
        }
        .events-bob-delay {
          animation: eventsBob 3.4s ease-in-out infinite;
          animation-delay: 0.6s;
        }
        @keyframes eventsBob {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/PetGrid.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        className="absolute left-0 right-0 bottom-0"
        style={{ top: `${navbarBottomOffset}px` }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "1920px",
            height: "1080px",
            transform: `translate(-50%, -50%) scale(${scale})`,
            transformOrigin: "center",
          }}
          onClick={() => setActiveId(null)}
        >
          <div
            style={{
              position: "absolute",
              left: `${(islandBounds?.x ?? 0)}px`,
              top: `${(islandBounds?.y ?? 0)}px`,
              width: `${Math.max(islandBounds?.w ?? 0, 0)}px`,
              height: `${Math.max(islandBounds?.h ?? 0, 0)}px`,
              borderRadius: "42px",
              ...cellBaseStyle,
              opacity: islandVisible ? 1 : 0,
              transition: "opacity 800ms ease",
              zIndex: 0,
            }}
            className="bento-island"
          />

          {CELLS.map((cell) => {
            const isActive = cell.id === activeId;
            const shouldCollapse = activeId !== null && !isActive;
            return (
              <div
                key={cell.id}
                style={{
                  position: "absolute",
                  width: `${cell.w}px`,
                  height: `${cell.h}px`,
                  left: `${cell.x}px`,
                  top: `${cell.y}px`,
                  ...cellBaseStyle,
                  borderRadius: "34px",
                  opacity: shouldCollapse ? 0 : (cellsVisible ? 1 : 0),
                  transition: cellsVisible
                    ? "opacity 800ms ease, transform 800ms ease"
                    : "opacity 500ms ease, transform 500ms ease",
                  transformOrigin: "center",
                  transform: shouldCollapse ? "scale(0)" : (cellsVisible ? "scale(1)" : "scale(0.9)"),
                  zIndex: 1,
                }}
                className="bento-cell group"
                onClick={(event) => {
                  event.stopPropagation();
                  setActiveId((prev) => (prev === cell.id ? null : cell.id));
                }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 gap-5">
                  {(cell as any).icon && (
                    <img 
                      src={(cell as any).icon} 
                      alt="" 
                      className={`w-28 h-28 object-contain drop-shadow-2xl transition-all duration-500 group-hover:scale-110 ${cell.label === "PawBooth" ? "rounded-3xl" : ""}`} 
                    />
                  )}
                  <span className="bento-label">{cell.label}</span>
                </div>
              </div>
            );
          })}
          {newsletterCell && activeId === newsletterCell.id && islandBounds && (
            <div
              className="newsletter-canvas"
              style={{
                left: `${islandBounds.x}px`,
                top: `${islandBounds.y}px`,
                width: `${islandBounds.w}px`,
                height: `${islandBounds.h}px`,
                opacity: islandVisible ? 1 : 0,
                transition: "opacity 500ms ease",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: `${48}px`,
                  top: `${48}px`,
                  width: `${Math.min(islandBounds.w - 96, 980)}px`,
                  maxHeight: `${Math.max(islandBounds.h - 96, 0)}px`,
                  overflow: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <p style={{ fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", fontSize: "42px" }}>
                  Stay in the Loop. No spam.
                </p>
                <p style={{ fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", fontSize: "42px" }}>Just paws, people, and good news.</p>
                <p style={{ fontWeight: 700, fontSize: "22px", textAlign: "justify" }}>
                  Be the first to hear about upcoming meetups, seasonal gatherings, and special community moments. Our
                  newsletter brings you event announcements, member highlights, and helpful tips for enjoying life with
                  your pet.
                </p>
                <p style={{ fontWeight: 700, fontSize: "32px" }}>Subscribe to receive:</p>
                <ul style={{ fontWeight: 600, fontSize: "22px" }}>
                  <li>Upcoming PawMatch events</li>
                  <li>Featured member stories</li>
                  <li>Pet-friendly activity ideas</li>
                  <li>Community updates</li>
                </ul>
                <p style={{ fontWeight: 600, fontSize: "22px", color: "rgba(255,255,255,0.7)", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "16px", marginTop: "16px" }}>
                  Join the list and never miss a chance to connect.
                </p>
              </div>
            </div>
          )}
          {waiverCell && activeId === waiverCell.id && islandBounds && (
            <div
              className="newsletter-canvas"
              style={{
                left: `${islandBounds.x}px`,
                top: `${islandBounds.y}px`,
                width: `${islandBounds.w}px`,
                height: `${islandBounds.h}px`,
                opacity: islandVisible ? 1 : 0,
                transition: "opacity 500ms ease",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: `${48}px`,
                  top: `${48}px`,
                  width: `${Math.min(islandBounds.w - 96, 980)}px`,
                  maxHeight: `${Math.max(islandBounds.h - 96, 0)}px`,
                  overflow: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <p style={{ fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", fontSize: "42px", lineHeight: "1.1" }}>
                  Community Safety <br /> & Liability Notice
                </p>
                <p style={{ fontWeight: 700, fontSize: "22px", textAlign: "justify", color: "rgba(255,255,255,0.9)" }}>
                  PawMatch is a friendly meetup space designed for pets and their humans<br></br>
                  to socialize in a relaxed environment. By participating in PawMatch <br></br>
                  gatherings, members acknowledge that they are responsible for the <br></br>
                  behavior and well-being of their pets.
                </p>
                <p style={{ fontWeight: 700, fontSize: "32px", color: "#FFFFFF", marginTop: "12px" }}>Please ensure that your pet:</p>
                <ul style={{ fontWeight: 600, fontSize: "22px", listStyle: "disc", paddingLeft: "24px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <li>Is healthy and comfortable around other animals</li>
                  <li>Is supervised at all times</li>
                  <li>Is up to date with required vaccinations where applicable</li>
                </ul>
                <p style={{ fontWeight: 600, fontSize: "20px", color: "rgba(255,255,255,0.7)", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "16px", marginTop: "16px" }}>
                  All participants join activities at their own discretion. PawMatch encourages a respectful and
                  mindful environment so everyone — humans and animals alike — can enjoy the experience safely.
                </p>
              </div>
            </div>
          )}
          {howItWorksCell && activeId === howItWorksCell.id && islandBounds && (
            <div
              className="newsletter-canvas"
              style={{
                left: `${islandBounds.x}px`,
                top: `${islandBounds.y}px`,
                width: `${islandBounds.w}px`,
                height: `${islandBounds.h}px`,
                opacity: islandVisible ? 1 : 0,
                transition: "opacity 500ms ease",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: `${48}px`,
                  top: `${48}px`,
                  width: `${Math.min(islandBounds.w - 96, 980)}px`,
                  maxHeight: `${Math.max(islandBounds.h - 96, 0)}px`,
                  overflow: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                }}
              >
                <p style={{ fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", fontSize: "42px", lineHeight: "1.1" }}>
                  Simple. Friendly. <br /> Tail-Wag Approved.
                </p>
                <p style={{ fontWeight: 700, fontSize: "22px", textAlign: "justify", color: "rgba(255,255,255,0.9)" }}>
                  PawMatch is built around relaxed meetups where pets naturally bring people together.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "12px" }}>
                  <p style={{ fontWeight: 700, fontSize: "32px", color: "#FFFFFF" }}>Bring Your Companion</p>
                  <p style={{ fontWeight: 600, fontSize: "20px", color: "rgba(255,255,255,0.8)" }}>
                    Arrive with your pet and step into a <br></br>
                    welcoming community of animal lovers.
                  </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "12px" }}>
                  <p style={{ fontWeight: 700, fontSize: "32px", color: "#FFFFFF" }}>Meet & Mingle</p>
                  <p style={{ fontWeight: 600, fontSize: "20px", color: "rgba(255,255,255,0.8)" }}>
                    Pets explore and play while their <br></br>humans connect and share stories.
                  </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "12px" }}>
                  <p style={{ fontWeight: 700, fontSize: "32px", color: "#FFFFFF" }}>Enjoy the Moment</p>
                  <p style={{ fontWeight: 600, fontSize: "20px", color: "rgba(255,255,255,0.8)" }}>
                    Relax and socialize. Enjoy a space where pets create the conversation.
                  </p>
                </div>

                <p style={{ fontWeight: 600, fontSize: "22px", fontStyle: "italic", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "16px", marginTop: "16px", color: "rgba(255,255,255,0.7)" }}>
                  Every meetup is designed to feel casual, welcoming, and community-driven.
                </p>
              </div>
            </div>
          )}
          {memberStoriesCell && activeId === memberStoriesCell.id && islandBounds && (
            <div
              className="newsletter-canvas"
              style={{
                left: `${islandBounds.x}px`,
                top: `${islandBounds.y}px`,
                width: `${islandBounds.w}px`,
                height: `${islandBounds.h}px`,
                opacity: islandVisible ? 1 : 0,
                transition: "opacity 500ms ease",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: `${48}px`,
                  top: `${48}px`,
                  width: `${Math.min(islandBounds.w - 96, 980)}px`,
                  maxHeight: `${Math.max(islandBounds.h - 96, 0)}px`,
                  overflow: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <p style={{ fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", fontSize: "42px" }}>
                  Real Moments from the Community
                </p>
                <p style={{ fontWeight: 700, fontSize: "22px", textAlign: "justify" }}>
                  PawMatch is full of small moments that turn into lasting memories. From shy puppies making their
                  first friends to seasoned companions happily greeting familiar faces, every gathering brings new
                  stories.
                </p>
                <p style={{ fontWeight: 700, fontSize: "32px" }}>Members often share moments like:</p>
                <ul style={{ fontWeight: 600, fontSize: "22px" }}>
                  <li>First friendships between pets</li>
                  <li>Unexpected conversations with fellow pet lovers</li>
                  <li>Funny encounters and playful chaos</li>
                  <li>Quiet afternoons watching pets explore</li>
                </ul>
                <p style={{ fontWeight: 600, fontSize: "22px", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "16px", marginTop: "16px", color: "rgba(255,255,255,0.7)" }}>
                  These stories remind us why bringing animals together creates such a special kind of community.
                </p>
              </div>
            </div>
          )}
          {photoBoothCell && activeId === photoBoothCell.id && islandBounds && (
            <div
              className="newsletter-canvas"
              style={{
                left: `${islandBounds.x}px`,
                top: `${islandBounds.y}px`,
                width: `${islandBounds.w}px`,
                height: `${islandBounds.h}px`,
                opacity: islandVisible ? 1 : 0,
                transition: "opacity 500ms ease",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: `${48}px`,
                  top: `${48}px`,
                  width: `${Math.min(islandBounds.w - 96, 980)}px`,
                  maxHeight: `${Math.max(islandBounds.h - 96, 0)}px`,
                  overflow: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <p style={{ fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", fontSize: "42px" }}>
                  Capture the Joy
                </p>
                <p style={{ fontWeight: 700, fontSize: "22px", textAlign: "justify" }}>
                  Some moments deserve to be remembered. The Paw Moments photo booth is where playful expressions,
                  wagging tails, and curious noses get captured forever. Whether it's a proud pose, a goofy grin, or a
                  spontaneous cuddle, every snapshot reflects the spirit of the community.
                </p>
                <p style={{ fontWeight: 700, fontSize: "32px" }}>Expect to see:</p>
                <ul style={{ fontWeight: 600, fontSize: "22px" }}>
                  <li>playful pet portraits</li>
                  <li>candid meetup moments</li>
                  <li>happy humans and their companions</li>
                  <li>spontaneous photobombs from curious pets</li>
                </ul>
                <p style={{ fontWeight: 600, fontSize: "22px", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "16px", marginTop: "16px", color: "rgba(255,255,255,0.7)" }}>
                  Because the best photos are the ones where nobody is trying too hard.
                </p>
              </div>
            </div>
          )}
          {contributorCell && activeId === contributorCell.id && islandBounds && (
            <div
              className="newsletter-canvas"
              style={{
                left: `${islandBounds.x}px`,
                top: `${islandBounds.y}px`,
                width: `${islandBounds.w}px`,
                height: `${islandBounds.h}px`,
                opacity: islandVisible ? 1 : 0,
                transition: "opacity 500ms ease",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: `${48}px`,
                  top: `${48}px`,
                  width: `${Math.min(islandBounds.w - 96, 980)}px`,
                  maxHeight: `${Math.max(islandBounds.h - 96, 0)}px`,
                  overflow: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <p style={{ fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", fontSize: "42px" }}>
                  Help Grow the Community
                </p>
                <p style={{ fontWeight: 700, fontSize: "22px", textAlign: "justify" }}>
                  PawMatch thrives because members bring their ideas, creativity, and energy. If you enjoy the
                  community and want to help shape it, there are many ways to contribute.
                </p>
                <p style={{ fontWeight: 700, fontSize: "32px" }}>You can help by:</p>
                <ul style={{ fontWeight: 600, fontSize: "22px" }}>
                  <li>sharing stories or photos from meetups</li>
                  <li>suggesting fun activities or event ideas</li>
                  <li>helping organize community moments</li>
                  <li>welcoming new members</li>
                </ul>
                <p style={{ fontWeight: 600, fontSize: "22px", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "16px", marginTop: "16px", color: "rgba(255,255,255,0.7)" }}>
                  Small contributions make a big difference in keeping the community vibrant and welcoming.
                </p>
              </div>
            </div>
          )}
          {contactCell && activeId === contactCell.id && islandBounds && (
            <div
              className="newsletter-canvas"
              style={{
                left: `${islandBounds.x}px`,
                top: `${islandBounds.y}px`,
                width: `${islandBounds.w}px`,
                height: `${islandBounds.h}px`,
                opacity: islandVisible ? 1 : 0,
                transition: "opacity 500ms ease",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: `${48}px`,
                  top: `${48}px`,
                  width: `${Math.min(islandBounds.w - 96, 980)}px`,
                  maxHeight: `${Math.max(islandBounds.h - 96, 0)}px`,
                  overflow: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <p style={{ fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", fontSize: "42px" }}>
                  Get in Touch
                </p>
                <p style={{ fontWeight: 700, fontSize: "22px", textAlign: "justify" }}>
                  Questions, ideas, or just want to say hello? We'd love to hear from you.
                </p>
                <p style={{ fontWeight: 700, fontSize: "22px", textAlign: "justify" }}>
                  Whether you're curious about joining a meetup, collaborating with the community, or simply learning
                  more about PawMatch, feel free to reach out.
                </p>
                <p style={{ fontWeight: 700, fontSize: "22px", textAlign: "justify" }}>
                  PawMatch is built around open conversation, so don't hesitate to connect.
                </p>
                <p style={{ fontWeight: 600, fontSize: "22px", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "16px", marginTop: "16px", color: "rgba(255,255,255,0.7)" }}>
                  We're always happy to hear from fellow animal lovers.
                </p>
              </div>
            </div>
          )}
          {founderCell && activeId === founderCell.id && islandBounds && (
            <div
              className="newsletter-canvas"
              style={{
                left: `${islandBounds.x}px`,
                top: `${islandBounds.y}px`,
                width: `${islandBounds.w}px`,
                height: `${islandBounds.h}px`,
                opacity: islandVisible ? 1 : 0,
                transition: "opacity 500ms ease",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: `${48}px`,
                  top: `${48}px`,
                  width: `${Math.min(islandBounds.w - 96, 980)}px`,
                  maxHeight: `${Math.max(islandBounds.h - 96, 0)}px`,
                  overflow: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <p style={{ fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", fontSize: "42px", lineHeight: "1.1" }}>
                  The Furry Vision <br /> Behind PawMatch
                </p>
                <p style={{ fontWeight: 700, fontSize: "22px", textAlign: "justify", color: "rgba(255,255,255,0.9)" }}>
                  PawMatch was born from a simple observation: pets are the world's best icebreakers. Our founder
                  believed that by creating spaces where animals feel at home, we'd naturally create spaces where
                  people feel at home too.
                </p>
                <p style={{ fontWeight: 600, fontSize: "22px", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "16px", marginTop: "16px", color: "rgba(255,255,255,0.7)" }}>
                  Building a community where every tail wag tells a story.
                </p>
              </div>
            </div>
          )}
          {eventsCell && activeId === eventsCell.id && islandBounds && (
            <div
              className="newsletter-canvas"
              style={{
                left: `${islandBounds.x}px`,
                top: `${islandBounds.y}px`,
                width: `${islandBounds.w}px`,
                height: `${islandBounds.h}px`,
                opacity: islandVisible ? 1 : 0,
                transition: "opacity 500ms ease",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: `${48}px`,
                  top: `${48}px`,
                  width: `${Math.min(islandBounds.w - 96, 980)}px`,
                  maxHeight: `${Math.max(islandBounds.h - 96, 0)}px`,
                  overflow: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <p style={{ fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", fontSize: "42px", lineHeight: "1.1" }}>
                  Join Our Next <br /> Local Meetup
                </p>
                <p style={{ fontWeight: 700, fontSize: "22px", textAlign: "justify", color: "rgba(255,255,255,0.9)" }}>
                  From weekend garden strolls to cozy cafe chats, our events are designed for maximum relaxation. No
                  pressure, just good vibes and fluffy companions.
                </p>
                <p style={{ fontWeight: 600, fontSize: "22px", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "16px", marginTop: "16px", color: "rgba(255,255,255,0.7)" }}>
                  Find a gathering near you and start your PawMatch journey.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
