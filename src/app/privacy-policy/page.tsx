"use client";

import Navbar from "../../components/Navbar";

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-black text-white px-6 py-20">
            <Navbar />
            <div className="max-w-3xl mx-auto space-y-8 mt-12">
                <h1 className="text-4xl md:text-6xl font-black tracking-tight">Privacy Policy</h1>
                <div className="p-8 bg-white/5 border border-white/10 rounded-3xl space-y-6 text-white/60 leading-relaxed">
                    <p>
                        Your privacy is important to us. PawMatch collects minimal data required to provide meetup services and community updates.
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>We do not sell your personal information to third parties.</li>
                        <li>Data collected via forms is used exclusively for event coordination and newsletters.</li>
                        <li>Cookies are used only for essential site functionality.</li>
                    </ul>
                    <div className="pt-6 border-t border-white/10">
                        <p className="text-xs font-bold uppercase tracking-widest text-[#a8d5ba]">
                            Effective Date: March 2026
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
