import Navbar from "../../components/Navbar";
import MobileBottomNav from "../../components/MobileBottomNav";
import Link from "next/link";

export default function Events() {
    return (
        <>
            <Navbar />

            <header className="bg-white/60 dark:bg-background-dark/60 backdrop-blur-md border-b border-primary/20 sticky top-20 z-10">
                <div className="p-4 flex items-center justify-between">
                    <Link href="/" className="p-2 hover:bg-primary/10 rounded-full transition-colors inline-block">
                        <span className="material-symbols-outlined block">arrow_back</span>
                    </Link>
                    <h1 className="text-xl font-bold tracking-tight">Upcoming Events</h1>
                    <button className="p-2 hover:bg-primary/10 rounded-full transition-colors">
                        <span className="material-symbols-outlined block">search</span>
                    </button>
                </div>
                <div className="px-4 pb-4">
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                        Find and join local pet meetups, coffee chats, and community park walks near you.
                    </p>
                </div>
            </header>

            {/* Date Chip Row */}
            <div className="py-6 overflow-x-auto hide-scrollbar flex gap-3 px-4 items-center">
                {/* Past Date */}
                <div className="flex-shrink-0 bg-slate-200 rounded-full px-4 py-2 flex flex-col items-center min-w-[70px]">
                    <span className="text-[10px] uppercase font-bold text-slate-500">Oct</span>
                    <span className="text-lg font-bold text-slate-500 line-through">20</span>
                </div>
                <div className="flex-shrink-0 bg-slate-200 rounded-full px-4 py-2 flex flex-col items-center min-w-[70px]">
                    <span className="text-[10px] uppercase font-bold text-slate-500">Oct</span>
                    <span className="text-lg font-bold text-slate-500 line-through">21</span>
                </div>
                {/* Selected Date */}
                <div className="flex-shrink-0 bg-terracotta scale-105 shadow-lg rounded-full px-5 py-3 flex flex-col items-center min-w-[80px] ring-2 ring-terracotta/20 cursor-pointer">
                    <span className="text-[10px] uppercase font-bold text-white/90">Oct</span>
                    <span className="text-xl font-bold text-white">22</span>
                </div>
                {/* Upcoming Date */}
                <div className="flex-shrink-0 bg-primary rounded-full px-4 py-2 flex flex-col items-center min-w-[70px] cursor-pointer">
                    <span className="text-[10px] uppercase font-bold text-slate-800/70">Oct</span>
                    <span className="text-lg font-bold text-slate-900">23</span>
                </div>
                <div className="flex-shrink-0 bg-primary rounded-full px-4 py-2 flex flex-col items-center min-w-[70px] cursor-pointer">
                    <span className="text-[10px] uppercase font-bold text-slate-800/70">Oct</span>
                    <span className="text-lg font-bold text-slate-900">24</span>
                </div>
            </div>

            <main className="px-4 space-y-6 max-w-2xl mx-auto">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Events for Oct 22</h3>

                {/* Expanded Event Card */}
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="h-48 w-full bg-slate-200 relative">
                        <img
                            alt="Dogs playing in a park"
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2D7t1bdslHaXMRJzLtkx5e-e98fLOFg8zwynErIXTy8R_UlKnZtf7WaKNGgspt5plFeK-J7VuEapL8jKJc130i9F58kGLVLQzp0UVDqk2VG9gWtmjG1rqTyIV4TYr1JLEomqLz5I5FCKbyGcJJBquVZJr6oZj9U7MvSmKMEdhoHlPbjlckDabuS5s6nE50A_ZkcWPbLlKm06g7k5adc7LSEe5ovfAkdldHeiWlg16a0VvZq4FLxuqg6rNqw6xNP18AxaGyDoH2NY"
                        />
                        <div className="absolute top-3 right-3 bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full border border-green-200">
                            8/20 spots
                        </div>
                    </div>
                    <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                            <h2 className="text-2xl font-bold leading-tight">Golden Retriever Sunday Social</h2>
                        </div>
                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                                <span className="material-symbols-outlined text-primary text-xl">schedule</span>
                                <span className="text-sm font-medium">Sunday, Oct 22 • 4:00 PM - 6:00 PM</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                                <span className="material-symbols-outlined text-primary text-xl">location_on</span>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold">The Bark Park • Sarabha Nagar</span>
                                    <span className="text-xs text-slate-500">Block C, Leisure Valley Road, Ludhiana, 141001</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-8">
                            <span className="bg-primary/20 text-slate-800 dark:text-slate-200 text-xs font-semibold px-3 py-1 rounded-lg">
                                Dogs Only
                            </span>
                            <span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs font-semibold px-3 py-1 rounded-lg">
                                Large Breeds
                            </span>
                        </div>
                        <Link
                            href="/event-details"
                            className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-secondary/20 transition-all flex items-center justify-center gap-2 inline-flex"
                        >
                            <span className="material-symbols-outlined">how_to_reg</span>
                            RSVP Now
                        </Link>
                    </div>
                </div>

                {/* Another Event Preview */}
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700 flex gap-4">
                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                            alt="Cat cafe meetup"
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD14Aba_YLSG214DQC-7RiGj5b3JHhLxPlViZKYl5AKcGfrNlzuQArkihiub2NZz1dkLLCXZjPa-eufb3aEitsfMnF_pxJR-mR6oecECT85iZNFiUHA6FAoNoPsEE3eWF4z_q1kcl-s5ZGgzzpmrYc9jXmfy7Izb5SoMoBq1rhjJQm5xAU1_-DwY18dFmYdScztIhd5s3lyZs0FgREJMtNfrJ8DgNIT-DsaXunOVdy6khlyjoltIYpcwEpXH7Dl9IWunIqyHj846KQ"
                        />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <h4 className="font-bold text-slate-900 dark:text-white">Kitty Cuddle Fest</h4>
                            <span className="text-[10px] bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-bold">12/15</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">Sarabha Nagar Community Center</p>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="bg-primary/20 text-slate-700 dark:text-slate-300 text-[10px] px-2 py-0.5 rounded">
                                Cats Only
                            </span>
                            <Link href="/event-details" className="text-xs font-bold text-secondary ml-auto underline">
                                Details
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <button className="fixed bottom-24 right-6 bg-slate-900 dark:bg-primary text-white dark:text-slate-900 px-4 py-2 rounded-full shadow-xl flex items-center gap-2 font-bold text-sm z-10 md:hidden">
                <span className="material-symbols-outlined text-lg">map</span>
                Map View
            </button>

            <MobileBottomNav />
        </>
    );
}
