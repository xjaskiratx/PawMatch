"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function PostSecondScrollBentoGrid({
  opacity = 1,
  visible = false,
}: {
  opacity?: number;
  visible?: boolean;
}) {
  const [scale, setScale] = useState(1);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeCol, setActiveCol] = useState<number | null>(null);
  const [showCanvas, setShowCanvas] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<{ title: string; date: string; location: string } | null>(null);
  const [showGallery, setShowGallery] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submitError, setSubmitError] = useState(false);
  const [showCollabForm, setShowCollabForm] = useState(false);
  const [showContributorForm, setShowContributorForm] = useState(false);
  const [collabType, setCollabType] = useState("Brands");
  const [collabSubject, setCollabSubject] = useState("");
  const [collabMessage, setCollabMessage] = useState("");
  const [collabError, setCollabError] = useState(false);

  const [contributorType, setContributorType] = useState("General Help");
  const [contributorSubject, setContributorSubject] = useState("");
  const [contributorMessage, setContributorMessage] = useState("");
  const [contributorError, setContributorError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const navbarBottomOffset = 98;
  const footerTopOffset = 120; // Estimated height/offset of footer pill area

  const pillars = [
    { title: "About \nthe Founder", icon: "person", subtitle: "Our Story • Vision" },
    { title: "Events", icon: "event", subtitle: "Meetups • Join Us" },
    { title: "Paw Booth", icon: "photo_library", subtitle: "Archive • Submit" },
    { title: "Let's Grow \nTogether", icon: "diversity_1", subtitle: "Join • Contribute" },
  ];

  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        setActiveCol(null);
        setShowCanvas(false);
        setEmail("");
        setEmailError(false);
        setSelectedEvent(null);
        setShowGallery(false);
        setSelectedFile(null);
        setSubmitError(false);
        setShowCollabForm(false);
        setShowContributorForm(false);
        setCollabType("Brands");
        setCollabSubject("");
        setCollabMessage("");
        setCollabError(false);
        setContributorType("General Help");
        setContributorSubject("");
        setContributorMessage("");
        setContributorError(false);
      }, 0);
    }
  }, [visible]);

  useEffect(() => {
    if (activeCol !== null) {
      // Bloom in snappily after col transition is underway
      const timer = setTimeout(() => setShowCanvas(true), 200);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => setShowCanvas(false), 0);
    }
  }, [activeCol]);

  const handleCloseCanvas = () => {
    setShowCanvas(false);
    // Grid return staggering for a layered effect (faster 400ms delay)
    setTimeout(() => {
      setActiveCol(null);
    }, 400);
  };

  useEffect(() => {
    const updateScale = () => {
      const nextScale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
      setScale(Number.isFinite(nextScale) && nextScale > 0 ? nextScale : 1);
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const handleNewsletterSubmit = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
      // Logic for successful signup
      alert("Welcome to the club!");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setSubmitError(false);
      alert(`Photo "${file.name}" selected! Ready to submit.`);
    }
  };

  const handleSubmitPhoto = () => {
    if (!selectedFile) {
      setSubmitError(true);
      setTimeout(() => setSubmitError(false), 500);
    } else {
      alert(`Success! "${selectedFile.name}" has been submitted to the Paw Booth.`);
      // Clear after successful "submission"
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div
      className="fixed inset-0 pointer-events-none z-160"
      style={{
        opacity,
        transition: "opacity 600ms cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "opacity"
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/PetGrid4.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Centered Wrapper between Navbar and Footer */}
      <div
        className="absolute left-0 right-0 overflow-hidden"
        style={{
          top: `${navbarBottomOffset}px`,
          bottom: `${footerTopOffset}px`
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "1600px",
            height: "700px",
            transform: `translate(-50%, -50%) scale(${scale})`,
            transformOrigin: "center",
          }}
        >
          {/* 4-Column Accordion */}
          <div
            className="flex w-full h-full gap-6 pointer-events-auto"
            style={{ willChange: "flex" }}
            onMouseLeave={() => !activeCol && setHoveredIndex(null)}
          >
            {pillars.map((pillar, idx) => {
              const isHovered = hoveredIndex === idx;
              const isOtherHovered = hoveredIndex !== null && hoveredIndex !== idx;
              const isDetailActive = activeCol !== null;

              return (
                <div
                  key={idx}
                  onMouseEnter={() => !isDetailActive && setHoveredIndex(idx)}
                  onClick={() => setActiveCol(idx)}
                  className={`relative flex flex-col items-center justify-center cursor-pointer
                    bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[40px] isolate transform-gpu
                    ${isDetailActive ? 'opacity-0 pointer-events-none' : 'opacity-100 scale-100'}
                  `}
                  style={{
                    // Lock flex ratios during transition to prevent snap/jitter
                    flex: isDetailActive
                      ? (activeCol === idx ? 1.6 : 0.8)
                      : (isHovered ? 1.6 : (isOtherHovered ? 0.8 : 1)),
                    // Return transition is 1000ms "Soft Settle" for buttery effect
                    transition: isDetailActive
                      ? "flex 600ms cubic-bezier(0.16, 1, 0.3, 1), opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 600ms cubic-bezier(0.16, 1, 0.3, 1)"
                      : "flex 1000ms cubic-bezier(0.3, 1, 0.4, 1), opacity 800ms cubic-bezier(0.16, 1, 0.3, 1), transform 800ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 800ms cubic-bezier(0.16, 1, 0.3, 1)",
                    willChange: "flex, transform, opacity, box-shadow",
                    boxShadow: isHovered ? "0 20px 40px rgba(0,0,0,0.3)" : "0 10px 20px rgba(0,0,0,0.1)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <div
                    className="transition-all duration-500 flex flex-col items-center pointer-events-none"
                    style={{
                      transform: (isHovered && !isDetailActive) ? 'scale(1.1)' : 'scale(1)',
                      willChange: 'transform',
                    }}
                  >
                    <span className="material-symbols-outlined text-6xl text-white mb-4 opacity-80" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {pillar.icon}
                    </span>
                    <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-2 drop-shadow-lg text-center whitespace-pre-line leading-tight">
                      {pillar.title}
                    </h3>
                    <p className={`text-white/40 uppercase tracking-[0.3em] text-[10px] font-bold transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                      {pillar.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detail Canvas */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center p-12 pointer-events-auto transition-[opacity,transform] duration-600
              bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[40px] isolate transform-gpu
              ${showCanvas ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-0 pointer-events-none'}
            `}
            style={{
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              willChange: "transform, opacity",
              // Used for back button alignment across the canvas
              "--back-offset": "24px",
              "--back-size": "56px",
            } as React.CSSProperties}
          >
            {activeCol !== null && (
              <>
                <button
                  onClick={() => {
                    if (selectedEvent) {
                      setSelectedEvent(null);
                    } else if (showGallery) {
                      setShowGallery(false);
                    } else if (showCollabForm) {
                      setShowCollabForm(false);
                    } else if (showContributorForm) {
                      setShowContributorForm(false);
                    } else {
                      handleCloseCanvas();
                    }
                  }}
                  className="absolute flex items-center justify-center w-14 h-14 rounded-full text-white/50 hover:text-white bg-white/5 hover:bg-white/10 transition-all group lg:w-14 lg:h-14"
                  style={{
                    top: "var(--back-offset)",
                    left: "var(--back-offset)",
                    zIndex: 100, // Ensure it's above the blooming content
                  }}
                >
                  <span className="material-symbols-outlined text-3xl font-black group-hover:-translate-x-1 transition-transform">arrow_back</span>
                </button>
                <style>{`
                  @keyframes shake {
                    0%, 100% { transform: translateX(0) translate3d(0,0,0); }
                    20% { transform: translateX(-10px) translate3d(0,0,0); }
                    40% { transform: translateX(10px) translate3d(0,0,0); }
                    60% { transform: translateX(-10px) translate3d(0,0,0); }
                    80% { transform: translateX(10px) translate3d(0,0,0); }
                  }
                  .animate-shake {
                    animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
                  }
                `}</style>
                {/* Passing props correctly as a component to avoid ref access during render issues */}
                <PillarContent
                  idx={activeCol}
                  email={email}
                  setEmail={setEmail}
                  emailError={emailError}
                  handleNewsletterSubmit={handleNewsletterSubmit}
                  selectedEvent={selectedEvent}
                  setSelectedEvent={setSelectedEvent}
                  fileInputRef={fileInputRef}
                  showGallery={showGallery}
                  setShowGallery={setShowGallery}
                  submitError={submitError}
                  handleSubmitPhoto={handleSubmitPhoto}
                  showCollabForm={showCollabForm}
                  setShowCollabForm={setShowCollabForm}
                  collabType={collabType}
                  setCollabType={setCollabType}
                  collabSubject={collabSubject}
                  setCollabSubject={setCollabSubject}
                  collabMessage={collabMessage}
                  setCollabMessage={setCollabMessage}
                  collabError={collabError}
                  setCollabError={setCollabError}
                  showContributorForm={showContributorForm}
                  setShowContributorForm={setShowContributorForm}
                  contributorType={contributorType}
                  setContributorType={setContributorType}
                  contributorSubject={contributorSubject}
                  setContributorSubject={setContributorSubject}
                  contributorMessage={contributorMessage}
                  setContributorMessage={setContributorMessage}
                  contributorError={contributorError}
                  setContributorError={setContributorError}
                />
              </>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}

interface PillarContentProps {
  idx: number | null;
  email: string;
  setEmail: (val: string) => void;
  emailError: boolean;
  handleNewsletterSubmit: () => void;
  selectedEvent: { title: string; date: string; location: string } | null;
  setSelectedEvent: (ev: { title: string; date: string; location: string } | null) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  showGallery: boolean;
  setShowGallery: (val: boolean) => void;
  submitError: boolean;
  handleSubmitPhoto: () => void;
  showCollabForm: boolean;
  setShowCollabForm: (val: boolean) => void;
  collabType: string;
  setCollabType: (val: string) => void;
  collabSubject: string;
  setCollabSubject: (val: string) => void;
  collabMessage: string;
  setCollabMessage: (val: string) => void;
  collabError: boolean;
  setCollabError: (val: boolean) => void;
  showContributorForm: boolean;
  setShowContributorForm: (val: boolean) => void;
  contributorType: string;
  setContributorType: (val: string) => void;
  contributorSubject: string;
  setContributorSubject: (val: string) => void;
  contributorMessage: string;
  setContributorMessage: (val: string) => void;
  contributorError: boolean;
  setContributorError: (val: boolean) => void;
}

function PillarContent({
  idx,
  email,
  setEmail,
  emailError,
  handleNewsletterSubmit,
  selectedEvent,
  setSelectedEvent,
  fileInputRef,
  showGallery,
  submitError,
  handleSubmitPhoto,
  showCollabForm,
  setShowCollabForm,
  collabType,
  setCollabType,
  collabSubject,
  setCollabSubject,
  collabMessage,
  setCollabMessage,
  collabError,
  setCollabError,
  showContributorForm,
  setShowContributorForm,
  contributorType,
  setContributorType,
  contributorSubject,
  setContributorSubject,
  contributorMessage,
  setContributorMessage,
  contributorError,
  setContributorError
}: PillarContentProps) {
  switch (idx) {
    case 0: // About the Founder
      return (
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="inline-block p-1 rounded-full bg-white/10 mb-4 scale-110">
            <div className="w-28 h-28 rounded-full bg-white/20 overflow-hidden lg:w-36 lg:h-36">
              <Image src="/AboutTheFounder.png" alt="Founder" width={144} height={144} className="w-full h-full object-cover grayscale opacity-80" />
            </div>
          </div>
          <p className="text-3xl font-medium text-white/90 leading-[1.3] text-balance italic px-12 lg:text-4xl">
            &quot;PawMatch started as a simple idea: that our pets shouldn&apos;t just be our best friends, they should be the bridge that connects us all.&quot;
          </p>
          <div className="flex flex-col items-center gap-6">
            <span className="text-base font-black uppercase tracking-[0.6em] text-white/40">Founder & Pack Leader</span>
            <div className="w-16 h-1 bg-white/20 rounded-full" />
          </div>
        </div>
      );
    case 1: // Events
      return (
        <div className="relative w-full h-full overflow-hidden">
          {/* List View: Events + Newsletter */}
          <div
            className={`absolute inset-0 flex items-center justify-around transition-[opacity,transform] duration-600 px-8
              ${selectedEvent ? 'opacity-0 pointer-events-none' : 'opacity-100'}
            `}
            style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            {/* 70% Left: Events */}
            <div className="h-87.5 flex flex-col justify-between space-y-10 border-2 border-transparent">
              <h4 className="text-4xl font-black text-white uppercase tracking-tight mb-10 lg:text-5xl">Next Meetups</h4>
              <div className="grid grid-cols-2 gap-8">
                {[
                  { title: "Winter Paws", date: "Dec 20", location: "Leisure Valley" },
                  { title: "Doggy Brunch", date: "Jan 12", location: "Sarabha Nagar" }
                ].map((ev, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedEvent(ev)}
                    className="bg-white/5 p-10 rounded-[3rem] border border-white/10 hover:bg-white/10 transition-colors group cursor-pointer shadow-md isolate transform-gpu"
                    style={{
                      willChange: "background-color, border-color",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <div className="flex justify-between items-start mb-6 pointer-events-none">
                      <span className="text-base font-black uppercase tracking-[0.2em] text-white/50">{ev.date}</span>
                      <span className="material-symbols-outlined text-2xl text-white/20 group-hover:text-white transition-colors lg:text-3xl">arrow_forward</span>
                    </div>
                    <div className="pointer-events-none">
                      <h5 className="text-2xl font-black text-white uppercase tracking-tight mb-2 lg:text-3xl">{ev.title}</h5>
                      <p className="text-base text-white/40 uppercase tracking-widest font-bold lg:text-lg">{ev.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vertical Separator */}
            <div className="w-px h-87.5 bg-white/10 mx-4" />

            {/* 30% Right: Newsletter */}
            <div className="h-87.5 flex flex-col justify-between space-y-12 pr-6 border-2 border-transparent">
              <div className="space-y-3">
                <span className="text-lg font-black uppercase tracking-[0.4em] text-white/50">Weekly Paws</span>
                <h4 className="text-3xl font-black text-white uppercase leading-none tracking-tight whitespace-nowrap lg:text-4xl">Stay in the Loop</h4>
              </div>
              <div className="space-y-6">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="YOUR@EMAIL.COM"
                    className={`w-full bg-white/5 border rounded-full px-8 py-3 text-base font-black tracking-widest uppercase placeholder:text-white/60 focus:outline-none transition-colors caret-white text-white
                      ${emailError ? 'border-red-500/50 focus:border-red-500' : 'border-white/20 focus:border-white/40'}
                    `}
                  />
                  {emailError && (
                    <p className="absolute -bottom-6 left-6 text-[10px] font-black uppercase tracking-widest text-red-500">Invalid Email Address</p>
                  )}
                </div>
                <button
                  onClick={handleNewsletterSubmit}
                  className="w-full bg-white text-black font-black uppercase text-base tracking-[0.2em] py-3 rounded-full hover:bg-primary hover:text-white transition-all shadow-xl flex items-center justify-center mt-4"
                >
                  Join the Club
                </button>
              </div>
              <p className="text-base text-white/40 uppercase tracking-[0.2em] font-black leading-relaxed">No spam. Just wagging tails and weekend plans.</p>
            </div>
          </div>

          {/* Details View: Event Details */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center transition-[opacity,transform] duration-600 delay-100
              ${selectedEvent ? 'opacity-100' : 'opacity-0 pointer-events-none'}
            `}
            style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            {selectedEvent && (
              <div className="text-center space-y-10 max-w-3xl px-6">
                <div className="space-y-4">
                  <span className="text-xl font-black uppercase tracking-[0.4em] text-white/40">
                    {selectedEvent.date} • {selectedEvent.location}
                  </span>
                  <h4 className="text-6xl font-black text-white uppercase tracking-tight lg:text-8xl drop-shadow-2xl leading-none">
                    {selectedEvent.title}
                  </h4>
                </div>

                <div className="w-24 h-1.5 bg-white/10 mx-auto rounded-full" />

                <div className="space-y-6">
                  <div className="flex flex-col items-center gap-4">
                    <a
                      href="https://ig.me/m/pawmatch.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl font-black text-primary uppercase tracking-widest leading-relaxed hover:text-white transition-colors lg:text-3xl underline decoration-2 underline-offset-8"
                    >
                      DM to register for the event.
                    </a>
                    <span className="text-lg font-black text-white/30 uppercase tracking-[0.4em]">
                      Limited spots only!
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    case 2: // Paw Booth
      return (
        <div className="relative w-full h-full overflow-hidden">
          {/* Main Paw Booth View */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-[opacity,transform] duration-600
              ${showGallery ? 'opacity-0 pointer-events-none' : 'opacity-100'}
            `}
            style={{
              paddingLeft: 32,
              paddingRight: 32,
              gap: 64,
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)"
            }}
          >
            {/* Left: Gallery Archive */}
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-col items-center justify-between h-135 w-full max-w-190 mx-auto border-2 border-transparent">
                <h4 className="text-4xl font-black text-white uppercase tracking-tight text-center lg:text-5xl">PawBooth Archive</h4>
                <div className="grid grid-cols-3 gap-8 h-80 w-full px-4">
                  <div className="col-span-3 bg-white/5 rounded-[2.5rem] border border-white/10 flex items-center justify-center">
                    <span className="text-white/30 text-2xl font-black uppercase tracking-[0.3em]">No photos yet</span>
                  </div>
                </div>
                <p className="text-xl text-white/50 leading-relaxed max-w-200 text-center lg:text-2xl">
                  Highlights or memories of our journey so far. Thousands of high-res tails from every PawMatch session since 2023.
                </p>
              </div>
            </div>

            {/* Vertical Separator */}
            <div className="w-px h-125 bg-white/10 shrink-0 mx-4" />

            {/* Right: Submit */}
            <div className="flex flex-col items-center justify-center text-center">
              <div className="flex flex-col items-center justify-between h-135 w-full max-w-105 mx-auto border-2 border-transparent">
                <button
                  type="button"
                  className="group relative w-40 h-40 rounded-full bg-[#e5989b]/20 flex items-center justify-center shadow-inner shrink-0 cursor-pointer overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    transform: "translate3d(0, 0, 0)",
                    isolation: "isolate"
                  }}
                >
                  <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none" />
                  <span className="material-symbols-outlined text-[#e5989b] text-7xl pointer-events-none">add_photo_alternate</span>
                </button>

                <h4 className="text-3xl font-black text-white uppercase tracking-tight leading-tight whitespace-nowrap lg:text-4xl">
                  Share the Love
                </h4>

                <p className="text-lg font-bold text-white/40 uppercase tracking-[0.3em] leading-tight max-w-110">
                  <span className="block">Submit your best shots</span>
                  <span className="block">of your furry friends.</span>
                </p>

                <button
                  onClick={handleSubmitPhoto}
                  className={`w-full font-black uppercase text-lg tracking-widest h-14 rounded-full transition-colors flex items-center justify-center px-10 whitespace-nowrap shadow-xl
                    ${submitError ? 'bg-red-500 text-white animate-shake' : 'bg-white text-black hover:bg-primary hover:text-white'}
                  `}
                  style={{
                    transform: "translate3d(0, 0, 0)",
                    isolation: "isolate",
                    willChange: "background-color, color",
                  }}
                >
                  Submit Your Pictures
                </button>
              </div>
            </div>
          </div>

          {/* Wall of Photos View: 4x2 Grid */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center transition-[opacity,transform] duration-600 delay-100 transform px-24 py-16 isolate transform-gpu
              ${showGallery ? 'opacity-100' : 'opacity-0 pointer-events-none'}
            `}
            style={{
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)"
            }}
          >
            <div className="w-full max-w-7xl h-full flex flex-col">
              <h4 className="text-4xl font-black text-white uppercase tracking-tight mb-8 lg:text-5xl text-center">Archive Gallery</h4>
              <div className="grid grid-cols-4 grid-rows-2 gap-6 flex-1">
                <div className="col-span-4 row-span-2 bg-white/5 rounded-[2.5rem] border border-white/10 flex items-center justify-center">
                  <span className="text-white/30 text-3xl font-black uppercase tracking-[0.3em]">No photos yet</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    case 3: // Let's Grow Together
      return (
        <div className="relative w-full h-full overflow-hidden">
          {/* Main Community & Collab View */}
          <div 
            className={`absolute inset-0 flex items-center justify-around transition-[opacity,transform] duration-600
              ${(showCollabForm || showContributorForm) ? 'opacity-0 pointer-events-none' : 'opacity-100'}
            `}
            style={{
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)"
            }}
          >
            {/* 50% Left: Community */}
            <div className="w-full max-w-145 h-87.5 flex flex-col justify-between space-y-12 border-2 border-transparent">
              <h4 className="text-4xl font-black text-white uppercase tracking-tight mb-6 lg:text-5xl">The Pack</h4>
              <div className="flex-1">
                <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10 hover:border-white/40 transition-all cursor-pointer group shadow-xl h-full flex flex-col justify-start">
                  <div className="flex items-center justify-between mb-6">
                    <h5 className="text-3xl font-black text-white uppercase tracking-tight lg:text-4xl">Become a Contributor</h5>
                    <span
                      className="material-symbols-outlined text-white/20 group-hover:text-white transition-colors text-8xl lg:text-9xl"
                    >
                      volunteer_activism
                    </span>
                  </div>
                  <p className="text-base text-white/40 leading-relaxed font-medium lg:text-lg">
                    PawMatch is built by the community.{" "}
                    <button 
                      onClick={() => setShowContributorForm(true)}
                      className="text-primary hover:text-white transition-colors underline decoration-1 underline-offset-4"
                    >
                      Help us
                    </button>
                    {" "}host better meetups, spread the word, or offer specialized skills.
                  </p>
                </div>
              </div>
            </div>

            {/* Vertical Separator */}
            <div className="w-0.5 h-87.5 bg-white/50 shrink-0" />

            {/* 50% Right: Collab */}
            <div className="w-full max-w-137.5 h-87.5 flex flex-col justify-between space-y-12 border-2 border-transparent">
              <h4 className="text-4xl font-black text-white uppercase tracking-tight mb-6 lg:text-5xl">Strategic</h4>
              <div className="flex-1">
                <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10 hover:border-white/40 transition-all cursor-pointer group shadow-xl h-full flex flex-col justify-start">
                  <div className="flex items-center justify-between mb-6">
                    <h5 className="text-3xl font-black text-white uppercase tracking-tight lg:text-4xl">Partners &<br />Collaborations</h5>
                    <span
                      className="material-symbols-outlined text-white/20 group-hover:text-white transition-colors text-8xl lg:text-9xl"
                    >
                      handshake
                    </span>
                  </div>
                  <p className="text-base text-white/40 leading-relaxed font-medium lg:text-lg">
                    For brands, clubs, venues, and vet partners looking to support the club.{" "}
                    <button 
                      onClick={() => setShowCollabForm(true)}
                      className="text-primary hover:text-white transition-colors underline decoration-1 underline-offset-4"
                    >
                      Inquire Now
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Collaboration Form View */}
          <div 
            className={`absolute inset-0 flex flex-col items-center justify-center transition-[opacity,transform] duration-600
              ${showCollabForm ? 'opacity-100' : 'opacity-0 pointer-events-none'}
            `}
            style={{
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)"
            }}
          >
            <div className="w-full max-w-4xl bg-white/5 p-12 rounded-[4rem] border border-white/10 shadow-2xl relative overflow-y-auto max-h-[90vh] hide-scrollbar">
              <h4 className="text-4xl font-black text-white uppercase tracking-tight mb-12 text-center lg:text-5xl">Let&apos;s Partner Up</h4>

              <div className="space-y-10">
                {/* Type Selector */}
                <div className="space-y-4 text-center">
                  <label className="text-base uppercase tracking-[0.3em] font-bold text-white/40 block">Inquiry Type</label>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {["Fellow Club", "Vet", "Venue", "Brands", "Other"].map((type) => (
                      <button
                        key={type}
                        onClick={() => setCollabType(type)}
                        className={`px-8 py-3 rounded-full text-lg font-black uppercase tracking-widest transition-all duration-300 border
                          ${collabType === type 
                            ? 'bg-white text-black border-white' 
                            : 'bg-white/5 text-white/40 border-white/10 hover:bg-primary hover:text-white hover:border-primary'
                          }
                        `}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subject & Message */}
                <div className="grid grid-cols-1 gap-8">
                  <div className="space-y-4">
                    <label className="text-base uppercase tracking-[0.3em] font-bold text-white/40 block ml-4">Subject</label>
                    <input 
                      type="text"
                      value={collabSubject}
                      onChange={(e) => setCollabSubject(e.target.value)}
                      placeholder="e.g. Strategic Partnership Inquiry"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-2xl placeholder:text-white/20 placeholder:text-2xl focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-base uppercase tracking-[0.3em] font-bold text-white/40 block ml-4">Message</label>
                    <textarea 
                      value={collabMessage}
                      onChange={(e) => setCollabMessage(e.target.value)}
                      placeholder="Tell us about your proposal..."
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-4xl px-6 py-5 text-white text-2xl placeholder:text-white/20 placeholder:text-2xl focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Submit */}
                <button 
                  onClick={() => {
                    const cleanSubject = collabSubject.trim();
                    const cleanMessage = collabMessage.trim();

                    if (!cleanSubject || !cleanMessage) {
                      setCollabError(true);
                      setTimeout(() => setCollabError(false), 400);
                      return;
                    }

                    const subject = encodeURIComponent(`${collabType} Collaboration: ${cleanSubject}`);
                    const body = encodeURIComponent(cleanMessage);
                    window.location.href = `mailto:hello@pawmatch.in?subject=${subject}&body=${body}`;
                  }}
                  className={`w-full font-black uppercase tracking-widest py-5 rounded-full text-lg shadow-xl transition-all
                    ${collabError ? 'bg-red-500 text-white animate-shake' : 'bg-white text-black hover:bg-primary hover:text-white'}
                  `}
                >
                  Send Inquiry
                </button>
              </div>
            </div>
          </div>

          {/* Contributor Form View */}
          <div 
            className={`absolute inset-0 flex flex-col items-center justify-center transition-[opacity,transform] duration-600
              ${showContributorForm ? 'opacity-100' : 'opacity-0 pointer-events-none'}
            `}
            style={{
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)"
            }}
          >
            <div className="w-full max-w-4xl bg-white/5 backdrop-blur-3xl p-12 rounded-[4rem] border border-white/10 shadow-2xl relative overflow-y-auto max-h-[90vh] hide-scrollbar isolate transform-gpu">
              <h4 className="text-4xl font-black text-white uppercase tracking-tight mb-12 text-center lg:text-5xl">Join the Mission</h4>

              <div className="space-y-10">
                {/* Type Selector */}
                <div className="space-y-4 text-center">
                  <label className="text-sm uppercase tracking-[0.3em] font-bold text-white/40 block">I can help with...</label>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {["Host Meetups", "Spread the Word", "Specialized Skills", "Other"].map((type) => (
                      <button
                        key={type}
                        onClick={() => setContributorType(type)}
                        className={`px-8 py-3 rounded-full text-base font-black uppercase tracking-widest transition-all duration-300 border
                          ${contributorType === type 
                            ? 'bg-white text-black border-white' 
                            : 'bg-white/5 text-white/40 border-white/10 hover:bg-primary hover:text-white hover:border-primary'
                          }
                        `}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subject & Message */}
                <div className="grid grid-cols-1 gap-8">
                  <div className="space-y-4">
                    <label className="text-sm uppercase tracking-[0.3em] font-bold text-white/40 block ml-4">How you&apos;d like to help</label>
                    <input 
                      type="text"
                      value={contributorSubject}
                      onChange={(e) => setContributorSubject(e.target.value)}
                      placeholder="e.g. Host a monthly meetup in Pune"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-xl placeholder:text-white/20 focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-sm uppercase tracking-[0.3em] font-bold text-white/40 block ml-4">Details</label>
                    <textarea 
                      value={contributorMessage}
                      onChange={(e) => setContributorMessage(e.target.value)}
                      placeholder="Share timing, city, audience size, and any relevant links."
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-4xl px-6 py-5 text-white text-xl placeholder:text-white/20 focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Submit */}
                <button 
                  onClick={() => {
                    const cleanSubject = contributorSubject.trim();
                    const cleanMessage = contributorMessage.trim();

                    if (!cleanSubject || !cleanMessage) {
                      setContributorError(true);
                      setTimeout(() => setContributorError(false), 400);
                      return;
                    }

                    const subject = encodeURIComponent(`Contributor Inquiry (${contributorType}): ${cleanSubject}`);
                    const body = encodeURIComponent(cleanMessage);
                    window.location.href = `mailto:hello@pawmatch.in?subject=${subject}&body=${body}`;
                  }}
                  className={`w-full font-black uppercase tracking-widest py-5 rounded-full text-lg shadow-xl transition-all
                    ${contributorError ? 'bg-red-500 text-white animate-shake' : 'bg-white text-black hover:bg-primary hover:text-white'}
                  `}
                >
                  Submit Proposal
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
}

