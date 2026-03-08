import Link from "next/link";

export default function MobileBottomNav() {
    return (
        <>
            <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-background-dark border-t border-slate-100 dark:border-slate-800 px-6 py-3 flex justify-between items-center z-50 md:hidden">
                <Link className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors" href="/">
                    <span className="material-symbols-outlined">home</span>
                    <span className="text-[10px] font-medium">Home</span>
                </Link>
                <Link className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors" href="/events">
                    <span className="material-symbols-outlined">calendar_month</span>
                    <span className="text-[10px] font-medium">Events</span>
                </Link>
                <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">chat_bubble</span>
                    <span className="text-[10px] font-medium">Messages</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">account_circle</span>
                    <span className="text-[10px] font-medium">Profile</span>
                </button>
            </nav>
            {/* Spacer for fixed nav on mobile */}
            <div className="h-20 md:hidden"></div>
        </>
    );
}
