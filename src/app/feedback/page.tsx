"use client";

import { useState } from "react";

export default function FeedbackPage() {
    const [category, setCategory] = useState("review");
    const [message, setMessage] = useState("");

    return (
        <main className="min-h-screen bg-black text-white px-6 py-16">
            <div className="mx-auto w-full max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-black tracking-tight">Share your thoughts</h1>
                <p className="text-white/60 mt-3">
                    Choose the type and drop your notes below.
                </p>

                <form className="mt-10 space-y-6">
                    <label className="block text-sm font-bold uppercase tracking-[0.2em] text-white/50">
                        Type
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="mt-3 w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/30"
                        >
                            <option value="review">Review</option>
                            <option value="suggestion">Suggestion</option>
                            <option value="feedback">Feedback</option>
                        </select>
                    </label>

                    <label className="block text-sm font-bold uppercase tracking-[0.2em] text-white/50">
                        Your message
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Write here..."
                            rows={8}
                            className="mt-3 w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/30"
                        />
                    </label>

                    <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-full bg-white text-black px-8 py-3 text-sm font-black uppercase tracking-[0.2em] hover:bg-[#a8d5ba] hover:text-white transition-all"
                    >
                        Send
                    </button>
                </form>
            </div>
        </main>
    );
}
