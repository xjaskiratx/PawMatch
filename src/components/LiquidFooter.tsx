"use client";

import { useState, useEffect, useRef } from "react";

export default function LiquidFooter({ scrollY, visible }: { scrollY: number, visible: boolean }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const startScrollYRef = useRef(scrollY);

    // Sync startScrollY only when we expand
    useEffect(() => {
        if (isExpanded) {
            startScrollYRef.current = scrollY;
        }
    }, [isExpanded]);

    // Track scroll delta when expanded
    useEffect(() => {
        if (!isExpanded) return;

        const delta = Math.abs(scrollY - startScrollYRef.current);
        // Sensitive 30px threshold for cinematic collapse
        if (delta > 30) {
            setIsExpanded(false);
        }
    }, [isExpanded, scrollY]);

    // Click outside logic
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsExpanded(false);
            }
        };

        if (isExpanded) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isExpanded]);

    return (
        <div
            ref={containerRef}
            onClick={() => !isExpanded && setIsExpanded(true)}
            className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[1100] transform-gpu transition-all duration-1000 
                ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                overflow-hidden rounded-[42px] border border-white/20 backdrop-blur-3xl bg-white/10 
                shadow-[0_40px_80px_-15px_rgba(0,0,0,0.6)] cursor-pointer tracking-tight`}
            style={{
                width: isExpanded ? "min(1200px, calc(100% - 40px))" : "160px",
                height: isExpanded ? "340px" : "40px",
                transition: `width 0.6s ${isExpanded ? 'cubic-bezier(0.1, 1.05, 0.05, 1)' : 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'}, 
                           height 0.6s ${isExpanded ? 'cubic-bezier(0.1, 1.05, 0.05, 1)' : 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'}, 
                           opacity 0.8s ease-out, 
                           transform 0.6s ${isExpanded ? 'cubic-bezier(0.1, 1.05, 0.05, 1)' : 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'}`,
                willChange: "transform, width, height, opacity",
                WebkitBackfaceVisibility: "hidden",
                padding: isExpanded ? "48px" : "0px",
                cursor: isExpanded ? "default" : "pointer",
                isolation: "isolate"
            }}
        >
            {/* Pill Content (Minimized) - Centered perfectly */}
            <div className={`absolute inset-0 flex items-center justify-center gap-3 transition-all ${isExpanded ? 'opacity-0 scale-90 blur-xl pointer-events-none duration-300' : 'opacity-100 scale-100 blur-0 duration-500 delay-300'}`}
                 style={{ transitionTimingFunction: isExpanded ? 'ease-out' : 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
                <div className="w-1 h-1 rounded-full bg-[#a8d5ba] shadow-[0_0_8px_rgba(168,213,186,0.8)] animate-pulse" />
                <span className="text-white font-black text-[7px] tracking-[0.25em] uppercase opacity-70">Club Info</span>
            </div>

            {/* Footer Content (Expanded) */}
            <div className={`w-full h-full transition-all duration-450 ${isExpanded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-[0.98] blur-2xl pointer-events-none'}`}
                style={{ transitionTimingFunction: isExpanded ? 'cubic-bezier(0.1, 1.05, 0.05, 1)' : 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-white h-full relative">
                    {/* Club Identity */}
                    <div className={`space-y-6 transition-all duration-500 delay-50 ${isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                        <div className="flex items-center gap-4 group">
                            <span className="material-symbols-outlined text-[#a8d5ba] text-3xl group-hover:rotate-[360deg] transition-transform duration-1000 ease-in-out">pets</span>
                            <span className="text-3xl font-black tracking-tighter italic">PawMatch</span>
                        </div>
                        <p className="text-white/40 text-[13px] leading-relaxed font-semibold max-w-[200px]">
                            Ludhiana's favorite casual meetup club for pet owners and enthusiasts.
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div className={`space-y-6 transition-all duration-500 delay-100 ${isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#a8d5ba] opacity-60">Connect</h4>
                        <div className="space-y-3 text-base font-bold">
                            <p className="hover:text-[#a8d5ba] transition-all cursor-pointer hover:translate-x-1">hello@pawmatch.in</p>
                            <p className="hover:text-[#a8d5ba] transition-all cursor-pointer hover:translate-x-1">+91 98765 43210</p>
                            <p className="text-white/20 text-xs font-medium">Model Town, Ludhiana</p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className={`space-y-6 transition-all duration-500 delay-150 ${isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#a8d5ba] opacity-60">Experience</h4>
                        <div className="flex flex-col gap-3 text-base font-bold text-white/50">
                            <a href="/events" className="hover:text-white hover:translate-x-1 transition-all">Events Calendar</a>
                            <a href="/safety-guidelines" className="hover:text-white hover:translate-x-1 transition-all">Safety Guidelines</a>
                            <a href="#" className="hover:text-white hover:translate-x-1 transition-all">Waiver Form</a>
                            <a href="#" className="hover:text-white hover:translate-x-1 transition-all">PawBooth Gallery</a>
                        </div>
                    </div>

                    {/* Social & Legal */}
                    <div className={`space-y-6 transition-all duration-500 delay-200 ${isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#a8d5ba] opacity-60">Newsletter</h4>
                        <div className="relative group/input">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                suppressHydrationWarning
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#a8d5ba]/40 transition-all group-hover/input:bg-white/10"
                            />
                            <button className="absolute right-1.5 top-1.5 bg-white text-black text-[9px] font-black uppercase px-4 py-2 rounded-lg hover:bg-[#a8d5ba] hover:text-white transition-all transform active:scale-90">
                                Join
                            </button>
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsExpanded(false);
                            }}
                            className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-white transition-all group mt-4 font-semibold"
                        >
                            <span className="material-symbols-outlined text-xs group-hover:rotate-180 transition-transform duration-500">expand_more</span>
                            Collapse
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
