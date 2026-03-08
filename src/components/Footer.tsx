import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-footer-dark text-slate-100 pt-12 pb-6 px-6 md:px-12 lg:px-20 mt-auto">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Col 1: Brand & Tagline */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <div className="bg-primary p-2 rounded-lg">
                                <span className="material-symbols-outlined text-footer-dark text-3xl">pets</span>
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-white">PawMatch</span>
                        </div>
                        <p className="text-slate-400 max-w-xs leading-relaxed">
                            Ludhiana's pet meetup club. Bringing furry friends and their humans together since 2024.
                        </p>
                    </div>
                    {/* Col 2: Quick Links */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-primary font-semibold text-lg uppercase tracking-wider">Quick Links</h4>
                        <nav className="flex flex-col gap-3">
                            <Link className="text-slate-400 hover:text-primary transition-colors duration-200" href="/">Home</Link>
                            <Link className="text-slate-400 hover:text-primary transition-colors duration-200" href="/events">Events</Link>
                        </nav>
                    </div>
                    {/* Col 3: Contact & Social */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-primary font-semibold text-lg uppercase tracking-wider">Connect</h4>
                        <div className="flex flex-col gap-4">
                            <a className="flex items-center gap-3 text-slate-400 hover:text-primary transition-colors duration-200" href="https://instagram.com/xjaskiratx">
                                <span className="material-symbols-outlined">alternate_email</span>
                                <span>@xjaskiratx</span>
                            </a>
                            <a className="flex items-center gap-3 text-slate-400 hover:text-primary transition-colors duration-200" href="mailto:hello@pawmatch.com">
                                <span className="material-symbols-outlined">mail</span>
                                <span>hello@pawmatch.com</span>
                            </a>
                        </div>
                    </div>
                </div>
                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-800 flex flex-col items-center gap-4">
                    <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500">
                        <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
                        <span className="hidden md:inline">|</span>
                        <Link className="hover:text-primary transition-colors" href="/safety-guidelines">Liability Waiver</Link>
                    </div>
                    <p className="text-xs text-slate-600 font-medium">
                        © 2026 PawMatch. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
