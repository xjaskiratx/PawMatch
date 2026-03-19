"use client";

import Navbar from "../../components/Navbar";

export default function WaiverPage() {
    return (
        <main className="min-h-screen bg-black text-white px-6 py-20">
            <Navbar />
            <div className="max-w-3xl mx-auto space-y-8 mt-12">
                <h1 className="text-4xl md:text-6xl font-black tracking-tight">Liability Waiver</h1>
                <div className="p-8 bg-white/5 border border-white/10 rounded-3xl space-y-6 text-white/60 leading-relaxed">
                    <p>
                        By participating in PawMatch events, you agree to assume all risks associated with pet interactions. PawMatch and its organizers are not liable for any injuries, losses, or damages occurring during meetups.
                    </p>
                    <p>
                        Owners are solely responsible for their pets&apos; behavior and any consequences thereof. Ensure your pet is properly socialized and vaccinated before attending.
                    </p>
                    <div className="pt-6 border-t border-white/10">
                        <p className="text-xs font-bold uppercase tracking-widest text-[#a8d5ba]">
                            Last Updated: March 2026
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
