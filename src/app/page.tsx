import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MobileBottomNav from "../components/MobileBottomNav";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        {/* 2. Hero Section */}
        <section className="bg-transparent min-h-[calc(100vh-80px)] flex items-center overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            <div className="space-y-8 py-20">
              <h1 className="text-6xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
                Meet Local <br />
                <span className="text-white">Pet Lovers</span>
              </h1>
              <p className="text-xl text-slate-800 max-w-lg leading-relaxed">
                A casual club for pet owners and future pet parents to grab coffee, chat, and socialize with furry friends.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  href="/events"
                  className="bg-background-dark text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all inline-block"
                >
                  Join a Meetup
                </Link>
                <Link
                  href="/events"
                  className="bg-white/30 backdrop-blur-md border border-white/40 text-slate-900 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/50 transition-all inline-block"
                >
                  View Events
                </Link>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="perspective-card bg-white/20 backdrop-blur-xl border border-white/30 p-8 rounded-[2rem] shadow-2xl w-[480px] h-[580px] flex flex-col justify-between">
                <div
                  className="w-full h-[320px] rounded-2xl bg-cover bg-center shadow-inner"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBVLSMMU3jgLp3b1Eqle9V_YmJYmBqf9G0Hy1tHYaTIqWj9KHVAo2xDyzswqRdDZnz0xcsxJKbgNWd__80oyp9axG9fAHc16RHj2UMuuXIXrZtznlV7WwTvGukViLij7A45QCOm0eNDV0xk9HOibBgbN9iLVEmKnp3KZx2YPLgEHISKPLaibeVcsr3_y66bWRCi-yTYmkSjHlqkhMRpMx_a0uJNZ8hYh9vz0IrGv_YLkrR5KSUPjvGuASfn8zq2A_RJITTbA8OgI7k')",
                  }}
                ></div>
                <div className="space-y-4 pt-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-3xl font-black text-slate-900">Buddy</h3>
                    <span className="bg-terracotta text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Popular
                    </span>
                  </div>
                  <p className="text-slate-800 text-lg">Golden Retriever • 2 Years Old</p>
                  <div className="flex gap-2">
                    <span className="bg-white/40 px-3 py-1 rounded-lg text-sm font-medium">Friendly</span>
                    <span className="bg-white/40 px-3 py-1 rounded-lg text-sm font-medium">Vaccinated</span>
                    <span className="bg-white/40 px-3 py-1 rounded-lg text-sm font-medium">Calm</span>
                  </div>
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-peach rounded-full blur-3xl opacity-60"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary rounded-full blur-3xl opacity-60"></div>
            </div>
          </div>
        </section>

        {/* 3. Event Carousel */}
        <section className="py-24 bg-white/40 backdrop-blur-md overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-10">
            <div className="flex justify-between items-end mb-12">
              <div className="space-y-2">
                <h2 className="text-4xl font-black text-slate-900 tracking-tight">Upcoming Events</h2>
                <p className="text-slate-500 font-medium">Join our community and meet your future best friend.</p>
              </div>
              <Link href="/events" className="flex items-center gap-2 text-sage font-bold hover:gap-3 transition-all">
                View All Events <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
            <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-8">
              {/* Card 1 */}
              <div className="min-w-[280px] group bg-background-light rounded-2xl p-4 transition-transform hover:-translate-y-2">
                <div
                  className="w-full h-[200px] rounded-xl bg-cover bg-center mb-4"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDsa_M20e-drfb5xqo31Gdl0OCemib4jFQNcrA16bywyurKvNq-p-OLbfQNG14wu_vZl8KFgbjExz3IU_dVB0sVVpGgb_E9Mv9nnactvrBr-RCbEXSoOyuhBPtVERtOt1RaVu6Iixr4RJR8AyFRODMh4qYXvMVYw6VuXVJwbyJCt4LmlZq5PBsrkn4EObrF-yNnVEbighdkFVRH17Yzfdzr0wAkeCAPxsc9fuji1HfxHEaSO_1v-4Kd92iUIxRL2syE125Nswov7RQ')",
                  }}
                ></div>
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-lg text-slate-900 leading-tight">Sunday Dog Walk</h4>
                    <span className="text-[10px] font-bold bg-primary/30 text-sage px-2 py-0.5 rounded-full uppercase">
                      50/100
                    </span>
                  </div>
                  <p className="text-sm text-slate-500">Central Park South • June 12</p>
                </div>
              </div>
              {/* Card 2 */}
              <div className="min-w-[280px] group bg-background-light rounded-2xl p-4 transition-transform hover:-translate-y-2">
                <div
                  className="w-full h-[200px] rounded-xl bg-cover bg-center mb-4"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDs-cJo9o-iV2H0KfRvwgSTD5x_AuTT15LUYhkTRVSpUa9t3Fw2N_Zm8oW3W9Tl5AZ69VoWX5v7ZwwNLB80BcQPf5q34lk3wchcIPY4kl3jBn7MA0yXWo7082vwU8EjpwevmELu8B0Tjf4jPZ33jz6Znw9fhhmJ2nwWMRdbFVJGLxsEfdpy0i8MbLoysgk0-rNm4vtVzWagybf86kjpADO8M5bcyHmJIAVc2c3L-M1v2VIzdEKrBTENarEa0G6Lz5Bg9TET53X1qrQ')",
                  }}
                ></div>
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-lg text-slate-900 leading-tight">Kitten Meetup</h4>
                    <span className="text-[10px] font-bold bg-terracotta/20 text-terracotta px-2 py-0.5 rounded-full uppercase">
                      10/10 FULL
                    </span>
                  </div>
                  <p className="text-sm text-slate-500">The Purr Cafe • June 15</p>
                </div>
              </div>
              {/* Card 3 */}
              <div className="min-w-[280px] group bg-background-light rounded-2xl p-4 transition-transform hover:-translate-y-2">
                <div
                  className="w-full h-[200px] rounded-xl bg-cover bg-center mb-4"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDSmC_rpI4KjFhPm3LiD49ED0TERY1SQ1xO3J8qAMqJTyFwr4CptUrg4aHZfmBqZNWCeBfrZ2Uz9sbA5is8320YE_BOP_gNTPAiPoQogAojy76o2U0qmhDRz2mUwOhnqY22dsX7B-UEeDPBtPrwgr5HWXtKc1659_gPyMxO2JPGNcF63H3SVy4b1RwuJTIi-wSjLTdjKi-1DYMHNJ71MO7xyzEz3jyB9UZyxFvDjpI9Na6TNjhe32CrJES6B1PDLYVpRB_cITEhJqc')",
                  }}
                ></div>
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-lg text-slate-900 leading-tight">Puppy Yoga</h4>
                    <span className="text-[10px] font-bold bg-primary/30 text-sage px-2 py-0.5 rounded-full uppercase">
                      15/20
                    </span>
                  </div>
                  <p className="text-sm text-slate-500">Zen Studio • June 18</p>
                </div>
              </div>
              {/* Card 4 */}
              <div className="min-w-[280px] group bg-background-light rounded-2xl p-4 transition-transform hover:-translate-y-2">
                <div
                  className="w-full h-[200px] rounded-xl bg-cover bg-center mb-4"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDgsk2z7-Ktb72cy_a6VU6py9f_7uzEVcyB7Lx5NjAkFTK3p6_5z93xjdJZduEKGYzGBlP4rfxcseqYjGqUQdFfBhnHHUHxELfzKab2DLS0Du8m8QgZhQnL43PiLHsUw4ELNh0Kfa-wMP4m7Rw9KB5ovgcKGFCopYa5xt6AfgGR4yefRtg9BFQ6gpkawJa0ejdUWV6Vv79es49nsKUMKo3g7mMLYskrmLLzJn7OaY6fI5donrAtUW-yrvNBrzKtF1fr21IfhiOl2XY')",
                  }}
                ></div>
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-lg text-slate-900 leading-tight">Senior Dog Walk</h4>
                    <span className="text-[10px] font-bold bg-primary/30 text-sage px-2 py-0.5 rounded-full uppercase">
                      30/40
                    </span>
                  </div>
                  <p className="text-sm text-slate-500">Riverside Path • June 22</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Bento Grid & Mission */}
        <section className="py-24 bg-background-light/40 backdrop-blur-md">
          <div className="max-w-[1440px] mx-auto px-10">
            <div className="grid grid-cols-12 gap-6 auto-rows-[240px]">
              {/* Large Mission Cell */}
              <div className="col-span-12 lg:col-span-6 row-span-2 bg-primary rounded-2xl p-12 flex flex-col justify-center space-y-6">
                <h2 className="text-5xl font-black text-slate-900 leading-tight">
                  It's Just About <br /> Good Times
                </h2>
                <p className="text-xl text-slate-800 leading-relaxed font-medium">
                  At PawMatch, we believe in the joy of pets. We bring pet owners and enthusiasts together for coffee, stories, and community. No pressure, just a fun time discussing our favorite animals.
                </p>
                <div className="pt-4">
                  <button className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">
                    Read Our Story
                  </button>
                </div>
              </div>
              {/* Smaller Image Cells */}
              <div
                className="col-span-6 lg:col-span-3 row-span-1 rounded-2xl bg-cover bg-center shadow-lg"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuByd4cDXmMkEXIg-OPDIzaJhPU1wL-tG3AYxVPR62v-Tn9JHKqH8tvjVEuO_IgrdQcujwjkfwA4Z1JvySpUSAdppehBZsTpJX0qGPU8HezlgsGIxwWnZrjcFqWFod2rKYZsoLdxK71pb3ufZIW_xq9bKskDPf0PfLujE6urspNAv0mxQDwHCvNjO70JN3NqrsgooDLVh05FZ6cKqfytyDNwP8lQWsAat-j6x_gfjTb7jcdC6NGAq8xHqQg2rTr32dtUhhgxs27qN8A')",
                }}
              ></div>
              <div
                className="col-span-6 lg:col-span-3 row-span-1 rounded-2xl bg-cover bg-center shadow-lg"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA284sXdIcPSCp6JqlBukLjZ8XK-8iy8Jrcxp13T5KIDWDG5c4nyXE94jv15JgZ62AcuXEfXylO6qlkZQQziIx0cE3D9DR6fN6CS7YzRFBYzRa-B5_nT94rdCNTET2nCcqw2jcb-ix2BnJmq1rXkVjgrwvul4yTsoFlGPLdAZQQG5omIDeD0-W-0sfdEz8hoanjrKDWNEXIARnDfm9cbl4IBYM01nQg98NBirFtFSP9Sfgp0qUW8TtCbfn8CwQDGzkLPfhCuy58vUo')",
                }}
              ></div>
              <div
                className="col-span-6 lg:col-span-3 row-span-1 rounded-2xl bg-cover bg-center shadow-lg"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAcTlLZWBX3Wzee4uP8ixPLeQ55REozGCJ-zR-qUlaiwz1Uxm5npI1Ig2qlOHtR6akqA_hn3xgINyORkPASravE7USqX5sH7Ri5y_NYUxM-vO6EcGyHDtq9uopMuosXF7npfQbg_EmZhgkyH6F9IHSDCUTqu-UnJvdk3keYj90t0Z3FuqlfcG8Gcg_4pvly1FMsdjYZujg5xwzLyqJSNEfxqZiYQWa4cpk2iH7Yuhhm-B-qRV03h3qH4HdeDoEEz8JSaIfTmG7EPmE')",
                }}
              ></div>
              <div
                className="col-span-6 lg:col-span-3 row-span-1 rounded-2xl bg-cover bg-center shadow-lg"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB7ZTe8yC6t1NUMd6ZCZr4Hvka54Saj1094XVuBPGIK5UjGhUmIPIbU1o-_hLDFF1y2gLg65Lu2kvr4EKxOAloGk0PP8OlJMqlfRzkZ68u1OALuZ0t65iYZ8wYzdee_1qrwq_JrzHaTH9gTOs3iGMSaan0J9J103Xcfl72VzjzNjhH2j8O2tEd1C4BmVb6LFGCRrEuI_zvV4DS6Ap7xa1WWTB6OWjbaurFkbYIDsFwZQed_jgSaXTA5LDGhma8rfCEmzPED7Yb0bSQ')",
                }}
              ></div>
            </div>
          </div>
        </section>

        {/* 5. Benefit Blocks */}
        <section className="py-20 bg-white/40 backdrop-blur-md">
          <div className="max-w-[1440px] mx-auto px-10 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/20 text-sage rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-4xl">pets</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Casual Meetups</h3>
              <p className="text-slate-500 leading-relaxed">
                Join us at local cafes and parks for laid-back conversations and pet socializing.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-terracotta/20 text-terracotta rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-4xl">favorite</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">All Are Welcome</h3>
              <p className="text-slate-500 leading-relaxed">
                Whether you have a dog, a cat, or just wish you did, you'll find a welcoming community here.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-peach/20 text-peach rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-4xl">calendar_month</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Community First</h3>
              <p className="text-slate-500 leading-relaxed">
                Share stories, get advice from experienced owners, and make new friends who love pets as much as you do.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Rules Section */}
        <section className="py-24 bg-sage/10 backdrop-blur-md">
          <div className="max-w-[1440px] mx-auto px-10">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <h2 className="text-4xl font-black text-slate-900">Meetup Guidelines</h2>
              <p className="text-slate-500 font-medium">
                To ensure a fun and safe environment for everyone, we follow a simple 3-step process.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-10 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                <div className="text-sage">
                  <span className="material-symbols-outlined text-5xl">person_search</span>
                </div>
                <h4 className="text-2xl font-bold text-slate-900">1. RSVP</h4>
                <p className="text-slate-500 leading-relaxed">
                  Find an event that suits your schedule and secure your spot online.
                </p>
              </div>
              <div className="bg-white p-10 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                <div className="text-sage">
                  <span className="material-symbols-outlined text-5xl">handshake</span>
                </div>
                <h4 className="text-2xl font-bold text-slate-900">2. Show Up &amp; Chat</h4>
                <p className="text-slate-500 leading-relaxed">
                  Arrive at the venue, grab a coffee, and start mingling with other pet enthusiasts.
                </p>
              </div>
              <div className="bg-white p-10 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                <div className="text-sage">
                  <span className="material-symbols-outlined text-5xl">check</span>
                </div>
                <h4 className="text-2xl font-bold text-slate-900">3. Have Fun</h4>
                <p className="text-slate-500 leading-relaxed">
                  Share, learn, and enjoy the company of amazing pets and their humans.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Founder Banner */}
        <div className="bg-sage text-white py-4">
          <div className="max-w-[1440px] mx-auto px-10 flex flex-col md:flex-row justify-between items-center text-sm font-semibold tracking-wide gap-4">
            <div className="flex items-center gap-2 uppercase">
              <span className="opacity-80">Founder:</span>
              <span>Alex Rivers</span>
            </div>
            <a className="flex items-center gap-2 hover:opacity-80 transition-opacity" href="#">
              <span className="material-symbols-outlined text-lg">camera</span>
              FOLLOW @PAWMATCH ON INSTAGRAM
            </a>
            <div className="hidden md:block uppercase opacity-80">Helping 5,000+ Pets Since 2021</div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </>
  );
}
