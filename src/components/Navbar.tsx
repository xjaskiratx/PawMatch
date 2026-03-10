"use client";

import Link from "next/link";

export default function Navbar({ show = true }: { show?: boolean }) {
    return (
        <>
            <nav
                className={`fixed top-8 left-1/2 z-[180] rounded-full overflow-hidden border border-white/20 shadow-2xl backdrop-blur-xl bg-white/10 flex items-center justify-center
                    ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                style={{
                    // Initial centering transform that keyframes will build upon
                    transform: 'translateX(-50%)',
                    // Total animation duration for the pill to form
                    animation: show ? 'navbarPillExpand 600ms cubic-bezier(0.23, 1, 0.32, 1) forwards' : 'none',
                    height: show ? '66px' : '0',
                }}
            >
                <div className={`w-full max-w-[1240px] px-[15px] flex items-center justify-between transition-opacity duration-500 delay-[500ms] ${show ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex items-center gap-2 shrink-0 ml-2">
                        <span className="material-symbols-outlined text-sage text-3xl">pets</span>
                        <span className="text-2xl font-black tracking-tight text-white drop-shadow-sm">PawMatch</span>
                    </div>

                    <div className="flex items-center gap-10">
                        <div className="hidden md:flex items-center gap-8">
                            <Link className="text-sm font-bold text-white/90 hover:text-white transition-colors" href="/">
                                Home
                            </Link>
                            <Link className="text-sm font-bold text-white/90 hover:text-white transition-colors" href="/events">
                                Events
                            </Link>
                        </div>
                        <Link
                            href="/events"
                            className="bg-white hover:bg-sage text-slate-900 px-6 py-2 rounded-full font-black text-sm transition-all shadow-lg active:scale-95 whitespace-nowrap"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes navbarPillExpand {
                    0% {
                        width: 2px;
                        height: 0;
                        transform: translate(-50%, -20px) scaleY(0);
                        opacity: 0;
                    }
                    40% {
                        width: 2px;
                        height: 66px;
                        transform: translate(-50%, 0) scaleY(1);
                        opacity: 1;
                    }
                    85% {
                        width: min(1260px, calc(100% - 28px));
                        height: 66px;
                        transform: translate(-50%, 0) scaleY(1);
                    }
                    100% {
                        width: min(1240px, calc(100% - 48px));
                        height: 66px;
                        transform: translate(-50%, 0) scaleY(1);
                        opacity: 1;
                    }
                }
            `}} />
        </>
    );
}
