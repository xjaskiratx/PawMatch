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
    }, [isExpanded, scrollY]);

    // Track scroll delta when expanded
    useEffect(() => {
        if (!isExpanded) return;

        const delta = Math.abs(scrollY - startScrollYRef.current);
        // Sensitive 30px threshold for cinematic collapse
        if (isExpanded && delta > 30) {
            setTimeout(() => setIsExpanded(false), 0);
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
            className={`fixed left-1/2 -translate-x-1/2 z-[1100] transform-gpu 
                ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                overflow-hidden rounded-[42px] border border-white/20 backdrop-blur-3xl bg-white/10 
                shadow-[0_40px_80px_-15px_rgba(0,0,0,0.6)] cursor-pointer tracking-tight`}
            style={{
                bottom: isExpanded ? "50px" : "40px",
                width: isExpanded ? "min(1200px, calc(100% - 40px))" : "160px",
                height: isExpanded ? "340px" : "40px",
                transition: `width ${isExpanded ? '0.6s' : '0.8s'} ${isExpanded ? 'cubic-bezier(0.1, 1.05, 0.05, 1)' : 'cubic-bezier(0.15, 1.3, 0.1, 1)'}, 
                           height ${isExpanded ? '0.6s' : '0.8s'} ${isExpanded ? 'cubic-bezier(0.1, 1.05, 0.05, 1)' : 'cubic-bezier(0.15, 1.3, 0.1, 1)'}, 
                           bottom ${isExpanded ? '0.6s' : '0.8s'} ${isExpanded ? 'cubic-bezier(0.1, 1.05, 0.05, 1)' : 'cubic-bezier(0.15, 1.3, 0.1, 1)'}, 
                           opacity 0.8s ease-out, 
                           transform ${isExpanded ? '0.6s' : '0.8s'} ${isExpanded ? 'cubic-bezier(0.1, 1.05, 0.05, 1)' : 'cubic-bezier(0.15, 1.3, 0.1, 1)'}`,
                willChange: "transform, width, height, opacity, bottom",
                WebkitBackfaceVisibility: "hidden",
                padding: isExpanded ? "48px" : "0px",
                cursor: isExpanded ? "default" : "pointer",
                isolation: "isolate"
            }}
        >

            {/* Pill Content (Minimized) - Centered perfectly */}
            <div className={`absolute inset-0 flex items-center justify-center gap-3 transition-all ${isExpanded ? 'opacity-0 scale-90 blur-xl pointer-events-none duration-300' : 'opacity-100 scale-100 blur-0 duration-500 delay-100'}`}
                 style={{ transitionTimingFunction: isExpanded ? 'ease-out' : 'cubic-bezier(0.15, 1.3, 0.1, 1)' }}>
                <div className="w-1 h-1 rounded-full bg-[#a8d5ba] shadow-[0_0_8px_rgba(168,213,186,0.8)] animate-pulse" />
                <span className="text-white font-black text-[10px] tracking-[0.25em] uppercase opacity-70">Club Info</span>
            </div>

            {/* Footer Content (Expanded) */}
            <div className={`w-full h-full transition-all duration-450 ${isExpanded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-[0.98] blur-2xl pointer-events-none'}`}
                style={{ transitionTimingFunction: isExpanded ? 'cubic-bezier(0.1, 1.05, 0.05, 1)' : 'cubic-bezier(0.15, 1.3, 0.1, 1)' }}>
                <div className="flex flex-col h-full">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-white flex-grow relative">
                        {/* Club Identity */}
                        <div className={`space-y-6 transition-all duration-500 delay-50 ${isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                            <div className="flex items-center gap-2 group">
                                <span className="material-symbols-outlined text-[#a8d5ba] text-3xl">pets</span>
                                <span className="text-2xl font-black tracking-tight text-white drop-shadow-sm">PawMatch</span>
                            </div>
                            <p className="text-white/40 text-[13px] leading-relaxed font-semibold max-w-[200px]">
                                Ludhiana&apos;s favorite casual meetup club for pet owners and enthusiasts.
                            </p>
                        </div>

                        {/* Contact Info */}
                        <div className={`space-y-6 transition-all duration-500 delay-100 ${isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#a8d5ba] opacity-60">Connect</h4>
                            <div className="space-y-3 text-base font-bold">
                                <a href="mailto:hello@pawmatch.in" className="block hover:text-[#a8d5ba] transition-all cursor-pointer hover:translate-x-1">hello@pawmatch.in</a>
                                <p className="text-white/20 text-xs font-medium">Ludhiana, Punjab</p>
                            </div>
                        </div>

                        {/* Legal & Feedback */}
                        <div className={`space-y-6 transition-all duration-500 delay-150 ${isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#a8d5ba] opacity-60">Resources</h4>
                            <div className="flex flex-col gap-3 text-base font-bold text-white/50">
                                <a href="/privacy-policy" className="hover:text-white hover:translate-x-1 transition-all">Privacy Policy</a>
                                <a href="/feedback" className="hover:text-white hover:translate-x-1 transition-all">Feedback</a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className={`space-y-6 transition-all duration-500 delay-200 ${isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#a8d5ba] opacity-60">Experience</h4>
                            <div className="flex flex-col gap-3 text-base font-bold text-white/50">
                                <a href="/events" className="hover:text-white hover:translate-x-1 transition-all">Events Calendar</a>
                                <a href="/events#safety-guidelines" className="hover:text-white hover:translate-x-1 transition-all">Safety Guidelines</a>
                                <a href="/events#newsletter" className="hover:text-white hover:translate-x-1 transition-all">Newsletter</a>
                                <a href="/waiver" target="_blank" className="hover:text-white hover:translate-x-1 transition-all">Waiver Form</a>
                            </div>
                        </div>
                    </div>

                    {/* Footer Bottom Bar */}
                    <div className={`mt-auto pt-4 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-700 delay-300 ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20 text-left">
                            © 2026 PawMatch. All rights reserved.
                        </div>

                        <div className="flex items-center gap-6 justify-center">
                            <a href="https://wa.me/91XXXXXXXXXX" target="_blank" className="text-white/40 hover:text-[#25D366] transition-colors flex items-center">
                                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                </svg>
                            </a>
                            <a href="https://instagram.com/pawmatch.in" target="_blank" className="text-white/40 hover:text-[#E4405F] transition-colors flex items-center">
                                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.984 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.261 2.913-.558.788-.306 1.459-.717 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.261-2.149-.558-2.913-.306-.789-.717-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.584.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.584-.071 4.85c-.055 1.17-.249 1.805-.415 2.227-.217.562-.477.96-.896 1.382-.42.419-.819.679-1.381.896-.422.164-1.056.36-2.227.413-1.266.057-1.646.07-4.85.07s-3.584-.015-4.85-.071c-1.17-.055-1.805-.249-2.227-.415-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.819-.896-1.381-.164-.422-.36-1.057-.413-2.227-.057-1.266-.07-1.646-.07-4.85s.015-3.584.072-4.85c.054-1.17.248-1.805.415-2.227.217-.562.477-.96.896-1.382.42-.419.819-.679 1.381-.896.422-.164 1.056-.36 2.227-.413 1.266-.057 1.646-.07 4.85-.07zM12 5.837a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.882 0 1.441 1.441 0 012.882 0z"/>
                                </svg>
                            </a>
                        </div>

                        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20 text-right">
                            Designed & Developed by <span className="text-white/40">JSX W&D</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
