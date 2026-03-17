"use client";

import { useEffect, useState } from "react";

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
      setActiveCol(null);
      setShowCanvas(false);
      setEmail("");
      setEmailError(false);
    }
  }, [visible]);

  useEffect(() => {
    if (activeCol !== null) {
      const timer = setTimeout(() => setShowCanvas(true), 300);
      return () => clearTimeout(timer);
    } else {
      setShowCanvas(false);
    }
  }, [activeCol]);

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

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[160]"
      style={{ opacity, transition: "opacity 400ms ease-in-out", willChange: "opacity" }}
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
            borderLeft: "2px solid rgba(96, 165, 250, 0.7)",
            borderRight: "2px solid rgba(251, 146, 60, 0.8)",
          }}
        >
          {/* 4-Column Accordion */}
          <div className="flex w-full h-full gap-6 pointer-events-auto">
            {pillars.map((pillar, idx) => {
              const isHovered = hoveredIndex === idx;
              const isOtherHovered = hoveredIndex !== null && hoveredIndex !== idx;
              const isDetailActive = activeCol !== null;

              return (
                <div
                  key={idx}
                  onMouseEnter={() => !isDetailActive && setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setActiveCol(idx)}
                  className={`relative flex flex-col items-center justify-center cursor-pointer transition-all duration-[300ms]
                    ${isDetailActive ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'}
                  `}
                  style={{
                    flex: isHovered ? 1.6 : (isOtherHovered ? 0.8 : 1),
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                    background: "rgba(255, 255, 255, 0.08)",
                    backdropFilter: "blur(24px) saturate(120%)",
                    WebkitBackdropFilter: "blur(24px) saturate(120%)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: "40px",
                    boxShadow: isHovered ? "0 20px 40px rgba(0,0,0,0.3)" : "0 10px 20px rgba(0,0,0,0.1)",
                  }}
                >
                  <div className={`transition-all duration-500 flex flex-col items-center ${isHovered ? 'scale-110' : 'scale-100'}`}>
                    <span className="material-symbols-outlined text-6xl text-white mb-4 opacity-80" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {pillar.icon}
                    </span>
                    <h3 className="text-3xl font-black text-white uppercase tracking-wider mb-2 drop-shadow-lg text-center whitespace-pre-line leading-tight">
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
          className={`absolute inset-0 flex flex-col items-center justify-center p-12 pointer-events-auto transition-all duration-[300ms] ease-in-out
              ${showCanvas ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}
            `}
            style={{
              // Used for back button alignment across the canvas
              "--back-offset": "24px",
              "--back-size": "56px",
              background: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(40px) saturate(150%)",
              WebkitBackdropFilter: "blur(40px) saturate(150%)",
              borderRadius: "40px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            {activeCol !== null && (
              <>
                <button
                  onClick={() => setActiveCol(null)}
                  className="absolute flex items-center justify-center w-14 h-14 rounded-full text-white/50 hover:text-white bg-white/5 hover:bg-white/10 transition-all group lg:w-14 lg:h-14"
                  style={{
                    top: "var(--back-offset)",
                    left: "var(--back-offset)",
                  }}
                >
                  <span className="material-symbols-outlined text-3xl font-black group-hover:-translate-x-1 transition-transform">arrow_back</span>
                </button>
                {getPillarContent(activeCol, email, setEmail, emailError, handleNewsletterSubmit)}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function getPillarContent(
  idx: number,
  email: string,
  setEmail: (val: string) => void,
  emailError: boolean,
  handleNewsletterSubmit: () => void
) {
  switch (idx) {
    case 0: // About the Founder
      return (
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="inline-block p-1 rounded-full bg-white/10 mb-4 scale-110">
            <div className="w-28 h-28 rounded-full bg-white/20 overflow-hidden lg:w-36 lg:h-36">
              <img src="/AboutTheFounder.png" alt="Founder" className="w-full h-full object-cover grayscale opacity-80" />
            </div>
          </div>
          <p className="text-3xl font-medium text-white/90 leading-[1.3] text-balance italic px-12 lg:text-4xl">
            "PawMatch started as a simple idea: that our pets shouldn't just be our best friends, they should be the bridge that connects us all."
          </p>
          <div className="flex flex-col items-center gap-6">
            <span className="text-base font-black uppercase tracking-[0.6em] text-white/40">Founder & Pack Leader</span>
            <div className="w-16 h-1 bg-white/20 rounded-full" />
          </div>
        </div>
      );
    case 1: // Events
      return (
        <div className="flex w-full h-full items-center justify-around">
          {/* 70% Left: Events */}
          <div className="h-[350px] flex flex-col justify-between space-y-10 border-2 border-red-500">
            <h4 className="text-4xl font-black text-white uppercase tracking-tighter mb-10 lg:text-5xl">Next Meetups</h4>
            <div className="grid grid-cols-2 gap-8">
              {[
                { title: "Winter Paws", date: "Dec 20", location: "Leisure Valley" },
                { title: "Doggy Brunch", date: "Jan 12", location: "Sarabha Nagar" }
              ].map((ev, i) => (
                <div key={i} className="bg-white/5 p-10 rounded-[3rem] border border-white/10 hover:bg-white/10 transition-colors group">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-base font-black uppercase tracking-[0.2em] text-white/50">{ev.date}</span>
                    <span className="material-symbols-outlined text-2xl text-white/20 group-hover:text-white transition-colors lg:text-3xl">arrow_forward</span>
                  </div>
                  <h5 className="text-2xl font-black text-white uppercase mb-2 lg:text-3xl">{ev.title}</h5>
                  <p className="text-base text-white/40 uppercase tracking-[0.1em] font-bold lg:text-lg">{ev.location}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Vertical Separator */}
          <div className="w-px h-[350px] bg-white/10" />

          {/* 30% Right: Newsletter */}
          <div className="h-[350px] flex flex-col justify-between space-y-12 pr-6 border-2 border-red-500">
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
                className="w-full bg-white text-black font-black uppercase text-base tracking-[0.2em] py-3 rounded-full hover:bg-[#a8d5ba] hover:text-white transition-all shadow-xl flex items-center justify-center mt-4"
              >
                Join the Club
              </button>
            </div>
            <p className="text-base text-white/40 uppercase tracking-[0.2em] font-black leading-relaxed">No spam. Just wagging tails and weekend plans.</p>
          </div>
        </div>
      );
    case 2: // Paw Booth
      return (
        <div
          className="flex w-full h-full items-center justify-start"
          style={{ paddingLeft: 32, paddingRight: 32, gap: 32 }}
        >
          {/* Left: Gallery Archive */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-between h-[540px] w-full max-w-[760px] mx-auto border-2 border-red-500">
              <h4 className="text-4xl font-black text-white uppercase tracking-tighter text-center lg:text-5xl">PawBooth Archive</h4>
              <div className="grid grid-cols-3 gap-8 h-80 w-full px-4">
                <div className="bg-white/5 rounded-[2.5rem] border border-white/10 overflow-hidden relative group">
                  <span className="absolute inset-0 flex items-center justify-center text-white/20 text-sm font-black uppercase tracking-widest">Gallery Preview</span>
                </div>
                <div className="bg-white/5 rounded-[2.5rem] border border-white/10 overflow-hidden" />
                <div className="bg-white/10 rounded-[2.5rem] border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
                  <span className="material-symbols-outlined text-white/40 text-5xl lg:text-6xl">add_to_photos</span>
                </div>
              </div>
              <p className="text-xl text-white/50 leading-relaxed max-w-[800px] text-center lg:text-2xl">
                Highlights or memories of our journey so far. Thousands of high-res tails from every PawMatch session since 2023.
              </p>
            </div>
          </div>

          {/* Vertical Separator */}
          <div className="w-px h-[500px] bg-white/10 shrink-0" />

          {/* Right: Submit */}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex flex-col items-center justify-between h-[540px] w-full max-w-[420px] mx-auto border-2 border-red-500">
              <div className="w-40 h-40 rounded-full bg-[#e5989b]/20 flex items-center justify-center shadow-inner shrink-0">
                <span className="material-symbols-outlined text-[#e5989b] text-7xl">add_photo_alternate</span>
              </div>
              
              <h4 className="text-3xl font-black text-white uppercase tracking-widest leading-tight whitespace-nowrap lg:text-4xl">
                Share the Love
              </h4>

              <p className="text-lg font-bold text-white/40 uppercase tracking-[0.3em] leading-tight max-w-[440px]">
                <span className="block">Submit your best shots</span>
                <span className="block">of your furry friends.</span>
              </p>

              <button className="w-full bg-white text-black font-black uppercase text-lg tracking-widest h-14 rounded-full hover:bg-[#a8d5ba] hover:text-white transition-all flex items-center justify-center px-10 whitespace-nowrap shadow-xl">
                Submit Your Pictures
              </button>
            </div>
          </div>
        </div>
      );
    case 3: // Let's Grow Together
      return (
        <div className="flex w-full h-full items-center justify-around">
          {/* 50% Left: Community */}
          <div className="w-full max-w-[600px] h-[350px] flex flex-col justify-between space-y-12 border-2 border-red-500">
            <h4 className="text-4xl font-black text-white uppercase tracking-tighter mb-6 lg:text-5xl">The Pack</h4>
            <div className="flex-1">
              <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10 hover:border-white/40 transition-all cursor-pointer group shadow-xl h-full flex flex-col justify-start">
                <div className="flex items-center justify-between mb-6">
                  <h5 className="text-3xl font-black text-white uppercase tracking-tight lg:text-4xl">Become a Contributor</h5>
                  <span
                    className="material-symbols-outlined text-white/20 group-hover:text-white transition-colors"
                    style={{ fontSize: 96 }}
                  >
                    volunteer_activism
                  </span>
                </div>
                <p className="text-base text-white/40 leading-relaxed font-medium lg:text-lg">Help us organize and maintain our community spaces.</p>
              </div>
            </div>
          </div>

          {/* Vertical Separator */}
          <div className="w-[2px] h-[350px] bg-white/50 shrink-0" />

          {/* 50% Right: Collab */}
          <div className="w-full max-w-[500px] h-[350px] flex flex-col justify-between space-y-12 border-2 border-red-500">
            <h4 className="text-4xl font-black text-white uppercase tracking-tighter mb-6 lg:text-5xl">Strategic</h4>
            <div className="bg-white/10 p-12 rounded-[3rem] border border-white/20 relative overflow-hidden group hover:bg-white/20 transition-all cursor-pointer h-full flex flex-col justify-between shadow-2xl">
              <span className="material-symbols-outlined absolute -top-12 -right-12 text-[20rem] text-white/5 group-hover:scale-110 transition-transform">handshake</span>
              <div className="relative z-10">
                <h5 className="text-3xl font-black text-white uppercase mb-6 leading-[0.95] tracking-tighter lg:text-4xl">Partners &<br />Collaborations</h5>
                <p className="text-base text-white/60 leading-relaxed mb-8 font-medium max-w-lg lg:text-lg">
                  For brands, venues, and veterinary partners looking to support the local pet ecosystem.
                </p>
                <button className="text-sm font-black uppercase tracking-[0.4em] text-white/60 group-hover:text-white transition-colors flex items-center gap-4 border-b border-white/20 pb-2 lg:text-base">
                  Inquire Now <span className="material-symbols-outlined text-2xl">north_east</span>
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
