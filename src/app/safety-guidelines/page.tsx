import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";

export default function SafetyGuidelines() {
    return (
        <>
            <Navbar />

            <header className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-b border-primary/20 sticky top-20 z-10 md:hidden">
                <div className="p-4 flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-primary/10 rounded-full transition-colors flex-shrink-0">
                        <span className="material-symbols-outlined block">arrow_back</span>
                    </Link>
                    <h1 className="text-xl font-bold text-slate-900 dark:text-white truncate">Safety Guidelines</h1>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-6 py-12 md:py-20">
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 dark:border-slate-700">
                    <div className="mb-10 text-center">
                        <div className="w-16 h-16 bg-primary/20 text-sage rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <span className="material-symbols-outlined text-4xl">verified_user</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
                            Community Guidelines
                        </h1>
                        <p className="text-slate-500 text-lg">
                            Keeping PawMatch safe, fun, and respectful for all pets and their humans.
                        </p>
                    </div>

                    <div className="space-y-8 text-slate-700 dark:text-slate-300">
                        {/* Section 1 */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-slate-900 dark:text-white">
                                <span className="material-symbols-outlined text-terracotta text-2xl">pets</span>
                                <h3 className="text-xl font-bold">1. Pet Behavior &amp; Control</h3>
                            </div>
                            <ul className="list-disc pl-11 space-y-2 text-slate-600 dark:text-slate-400">
                                <li>All pets must be properly leashed or contained unless in a designated off-leash area.</li>
                                <li>Owners are strictly responsible for the behavior of their pets at all times.</li>
                                <li>Aggressive behavior towards other animals or humans will not be tolerated.</li>
                                <li>Please clean up after your pet immediately. Waste bags are often provided but not guaranteed.</li>
                            </ul>
                        </section>

                        {/* Section 2 */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-slate-900 dark:text-white">
                                <span className="material-symbols-outlined text-sage text-2xl">medical_services</span>
                                <h3 className="text-xl font-bold">2. Health &amp; Vaccinations</h3>
                            </div>
                            <ul className="list-disc pl-11 space-y-2 text-slate-600 dark:text-slate-400">
                                <li>All attending pets must be up-to-date on core vaccinations (Rabies, Distemper, Parvo).</li>
                                <li>Do not bring your pet if they have been sick or coughing within the last 14 days.</li>
                                <li>Flea and tick prevention is highly recommended before attending outdoor events.</li>
                            </ul>
                        </section>

                        {/* Section 3 */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-slate-900 dark:text-white">
                                <span className="material-symbols-outlined text-primary text-2xl text-slate-800">handshake</span>
                                <h3 className="text-xl font-bold">3. Human Interaction</h3>
                            </div>
                            <ul className="list-disc pl-11 space-y-2 text-slate-600 dark:text-slate-400">
                                <li>Always ask the owner before approaching, petting, or feeding a pet.</li>
                                <li>Respect the personal space of other attendees and their animals.</li>
                                <li>Children must be closely supervised and instructed on how to properly interact with animals.</li>
                            </ul>
                        </section>

                        {/* Section 4 */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-slate-900 dark:text-white">
                                <span className="material-symbols-outlined text-peach text-2xl">warning</span>
                                <h3 className="text-xl font-bold">4. Liability Waiver</h3>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                <p>
                                    By attending a PawMatch event, you acknowledge that you are voluntarily participating with full
                                    knowledge of the inherent risks associated with animal interactions. You agree to assume all
                                    responsibility for any injury, property damage, or loss that may occur to you or your pet.
                                </p>
                                <p className="mt-3">
                                    PawMatch, its organizers, and venue partners are not liable for any incidents resulting from pet
                                    behavior or interactions during the event.
                                </p>
                            </div>
                        </section>
                    </div>

                    <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-700 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-start gap-3 text-sm text-slate-500">
                            <span className="material-symbols-outlined text-primary mt-0.5">info</span>
                            <p>By continuing to use PawMatch, you agree to these guidelines.</p>
                        </div>
                        <Link
                            href="/"
                            className="w-full md:w-auto bg-slate-900 hover:bg-slate-800 dark:bg-primary dark:hover:bg-sage text-white dark:text-slate-900 font-bold px-8 py-4 rounded-xl transition-colors text-center shadow-lg"
                        >
                            I Accept the Terms
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
