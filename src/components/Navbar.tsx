import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
            <div className="max-w-[1440px] mx-auto px-10 h-20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sage text-3xl">pets</span>
                    <span className="text-2xl font-black tracking-tight text-slate-900">PawMatch</span>
                </div>
                <div className="flex items-center gap-10">
                    <div className="hidden md:flex items-center gap-8">
                        <Link className="text-sm font-semibold text-slate-700 hover:text-sage transition-colors" href="/">
                            Home
                        </Link>
                        <Link className="text-sm font-semibold text-slate-700 hover:text-sage transition-colors" href="/events">
                            Events
                        </Link>
                    </div>
                    <Link
                        href="/events"
                        className="bg-primary hover:bg-sage text-slate-900 px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-sm"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </nav>
    );
}
