"use client";

import Navbar from "../../components/Navbar";
import MobileBottomNav from "../../components/MobileBottomNav";
import Link from "next/link";

export default function EventDetails() {
    return (
        <>
            <Navbar />

            <header className="bg-white/60 dark:bg-background-dark/60 backdrop-blur-md border-b border-primary/20 sticky top-20 z-10 md:hidden">
                <div className="p-4 flex items-center justify-between">
                    <Link href="/events" className="p-2 hover:bg-primary/10 rounded-full transition-colors">
                        <span className="material-symbols-outlined block">arrow_back</span>
                    </Link>
                    <h1 className="text-xl font-bold tracking-tight">Event Details</h1>
                    <button className="p-2 hover:bg-primary/10 rounded-full transition-colors">
                        <span className="material-symbols-outlined block">share</span>
                    </button>
                </div>
            </header>

            <main className="max-w-md md:max-w-2xl mx-auto p-4 flex flex-col gap-6 py-10 md:py-20">
                {/* Back button for desktop */}
                <Link href="/events" className="hidden md:inline-flex items-center gap-2 text-slate-500 hover:text-sage transition-colors font-medium">
                    <span className="material-symbols-outlined">arrow_back</span> Back to Events
                </Link>

                {/* Event Card Header */}
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl overflow-hidden shadow-sm border border-primary/20">
                    <div
                        className="w-full h-48 md:h-72 bg-cover bg-center"
                        style={{
                            backgroundImage:
                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAxOoH_1zKkQvWddqMz1NDIMJp0U6ILWj3cKO56khmesBf0iJTT2V9LhaBQpZbbZk8Cn45pgElDOThf6tJr-9BM_WLlyhNECZVir-teTvw1rlL_xyTkep2gqC5MH95O5eNMYkUQFM5aM5UwzsdEnwSAGARRaw9Mg3yufHJu0pOPQw6gntvEdUlN6M4fiWt-CwdZho-mov8-9EncXDVfTAlar123mM4iOLaTb_HltyqHhlElzg5fURZ9zVyMmR17MTXhRR6U7IVbW0Q")',
                        }}
                    ></div>
                    <div className="p-5">
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="inline-block px-2 py-1 bg-primary/20 text-sage text-xs font-bold rounded mb-2">
                                    SOCIAL EVENT
                                </span>
                                <h2 className="text-xl md:text-3xl font-bold text-slate-900 dark:text-white">Paws in the Park</h2>
                                <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 mt-1 text-sm md:text-base">
                                    <span className="material-symbols-outlined text-sm md:text-base">calendar_today</span>
                                    <span>Sunday, Oct 15 • 10:00 AM</span>
                                </div>
                            </div>
                        </div>

                        {/* RSVP Accordion Form */}
                        <div className="mt-8 border-t border-slate-100 dark:border-slate-700 pt-6">
                            <details className="group" open>
                                <summary className="flex cursor-pointer items-center justify-between list-none">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-terracotta">event_available</span>
                                        <span className="text-slate-900 dark:text-white font-semibold text-lg">RSVP Now</span>
                                    </div>
                                    <span className="material-symbols-outlined transition-transform group-open:rotate-180 text-slate-400">
                                        expand_more
                                    </span>
                                </summary>
                                <div className="mt-6 space-y-6">
                                    <p className="text-sm md:text-base text-slate-500 dark:text-slate-400">
                                        Join 24 other pet parents! Fill out the form below to secure your spot.
                                    </p>

                                    {/* Form Fields */}
                                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Full Name</label>
                                            <input
                                                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-400"
                                                placeholder="Enter your full name"
                                                type="text"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
                                            <input
                                                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-400"
                                                placeholder="you@example.com"
                                                type="email"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
                                                Which pets are you bringing?
                                            </label>
                                            <textarea
                                                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-400 resize-none"
                                                placeholder="e.g. 1 golden retriever, 1 Persian cat"
                                                rows={3}
                                            ></textarea>
                                        </div>

                                        <button className="w-full py-4 bg-terracotta hover:bg-terracotta/90 text-white font-bold text-lg rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 mt-4">
                                            <span>Count Me In!</span>
                                            <span className="material-symbols-outlined text-base">pets</span>
                                        </button>

                                        <p className="text-xs text-center text-slate-500 mt-4">
                                            By RSVPing, you agree to our <Link href="/safety-guidelines" className="underline hover:text-primary">Safety Guidelines</Link>.
                                        </p>
                                    </form>
                                </div>
                            </details>
                        </div>

                        <div className="bg-primary/10 px-5 py-4 mt-8 flex items-center justify-between rounded-xl">
                            <div className="flex -space-x-2">
                                <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-300 overflow-hidden">
                                    <img
                                        data-alt="User profile avatar 1"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtCe3CwV3_YubWSyWjnClJi4zPEFD1hkS-tO809UQw_D9qvUCN0KI0hiI-tuUAvUoz8c7-O0gJAl19WnbCZfwUmoxGcuJ_0i-7AZcE6B89fCCRIEzELy3aPj9tATMIiShzPVPMsrXE2iZy_bC3cudsYflgJnNcAzYEog9E57ZkdQ7OcjoIkZ_kBm8V4GMIbpdKc-0aVdSw0ttKYj9zSIL6z5jO533WllZqaxYeDBFA3MmkfLy-OYuyv93XQ1EC35eqfJYQF5O2uxY"
                                    />
                                </div>
                                <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-300 overflow-hidden">
                                    <img
                                        data-alt="User profile avatar 2"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZl_npoXHm_qzoEjBVoCSzMrrUKjn_kiTKYESbDlI7c-JPxHGYcj9BC8KnNwN5k3Wa0z9PadR8klVI0pwtfJoumVZ1uIu-QM0DUH4_kpaCOIUFwhhRom-iL7vtTVJvK2hjYTduygVf8eXbI21xeE4vr5R7TzkYIK3h9Jp4zqo2BpVPqCRt2Os7UfWpETnWqn6KWI1wSAxU35k6wFfnS7Qh6z2E1PCw7AwdyctXX6SnwwRgQqr4Szral405rCOgqAeVekyhiz3cjnU"
                                    />
                                </div>
                                <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-300 overflow-hidden">
                                    <img
                                        data-alt="User profile avatar 3"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0g824y0AawvvzuHjCqUxUgFzZoD0pCF9hzwqzHuoa2jxfMTwUXmdYNG-vVdCPQv0n8up2Btqroe8z2zvbithhG9rKMT_qkUMU3mNGlQljvGs-KyN1yP0SjMxMsnOMf0cgv1xPXdYSN-C8gCXVxYnFKzPz_AJoFN5i5Dnbzn7M_8NWA8vkcJRqSAbSqsJEb0ohiunY603SFFUysqATCAJL9XZ35fo094u9T_lPFQnQ9yfWfeTzzCdFrBYMm2e2NDJtVh-Rd82EY_o"
                                    />
                                </div>
                                <div className="w-10 h-10 rounded-full border-2 border-white bg-primary flex items-center justify-center text-xs font-bold text-sage">
                                    +21
                                </div>
                            </div>
                            <button className="text-sage font-semibold flex items-center gap-1 hover:text-terracotta transition-colors">
                                <span className="material-symbols-outlined">map</span>
                                View Map
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <MobileBottomNav />
        </>
    );
}
