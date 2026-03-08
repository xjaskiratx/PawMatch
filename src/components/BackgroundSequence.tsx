"use client";

import { useState, useRef, useEffect } from "react";

export default function BackgroundSequence() {
    const [stage, setStage] = useState<1 | 2 | 3>(1);
    const vid1Ref = useRef<HTMLVideoElement>(null);
    const vid2Ref = useRef<HTMLVideoElement>(null);

    const [vid2Started, setVid2Started] = useState(false);

    useEffect(() => {
        // Play the first video when component mounts
        if (vid1Ref.current) {
            vid1Ref.current.play().catch(e => console.error("Error playing video 1:", e));
        }
    }, []);

    const handleVid1TimeUpdate = () => {
        const vid1 = vid1Ref.current;
        if (!vid1) return;

        // If we are within 0.8 seconds of the end, start the transition
        if (!vid2Started && vid1.duration > 0 && vid1.duration - vid1.currentTime <= 0.8) {
            setVid2Started(true);
            setStage(2);
            if (vid2Ref.current) {
                vid2Ref.current.play().catch(e => console.error("Error playing video 2:", e));
            }
        }
    };

    const handleVid1Ended = () => {
        // Fallback in case timeupdate didn't catch it
        if (!vid2Started) {
            setVid2Started(true);
            setStage(2);
            if (vid2Ref.current) {
                vid2Ref.current.play().catch(e => console.error("Error playing video 2:", e));
            }
        }
    };

    const handleVid2Ended = () => {
        setStage(3);
    };

    return (
        <div className="fixed inset-0 -z-50 w-full h-full overflow-hidden bg-black">
            {/* Final Image (Always at bottom, ready to be revealed) */}
            <div className="absolute inset-0">
                <img
                    src="/SkinBackground.png"
                    alt="Background"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Video 2 (Covers the image until it ends) */}
            <div
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${stage <= 2 ? 'opacity-100' : 'opacity-0'}`}
            >
                <video
                    ref={vid2Ref}
                    src="/SkinToBackground.mp4"
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                    onEnded={handleVid2Ended}
                    preload="auto"
                />
            </div>

            {/* Video 1 (Covers Video 2 until it ends) */}
            {/* We fade it out fast when stage switches to 2 */}
            <div
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${stage === 1 ? 'opacity-100' : 'opacity-0'}`}
            >
                <video
                    ref={vid1Ref}
                    src="/DogToSkin.mp4"
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                    onTimeUpdate={handleVid1TimeUpdate}
                    onEnded={handleVid1Ended}
                    preload="auto"
                />
            </div>

            {/* Overlay to ensure text readability against the dynamic background */}
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        </div>
    );
}
