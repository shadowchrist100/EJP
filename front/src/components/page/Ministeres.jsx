import React, { useState, useEffect } from 'react';
import Nav from '../common/Nav';
import Footer from '../common/Footer';
import { ArrowRight } from 'lucide-react';

/* ─── Global styles ─────────────────────────────────────────────────── */
const GlobalStyles = () => (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,700;1,300&display=swap');

        .font-display { font-family: 'Bebas Neue', sans-serif; }
        .font-body    { font-family: 'DM Sans', sans-serif; }

        @keyframes float-up {
            from { opacity: 0; transform: translateY(45px); }
            to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes line-grow {
            from { transform: scaleX(0); }
            to   { transform: scaleX(1); }
        }
        @keyframes shimmer-sweep {
            0%   { background-position: -200% center; }
            100% { background-position:  200% center; }
        }
        @keyframes fade-in {
            from { opacity: 0; }
            to   { opacity: 1; }
        }

        .anim-up   { animation: float-up 0.9s cubic-bezier(0.16,1,0.3,1) forwards; }
        .anim-fade { animation: fade-in 1s ease forwards; }
        .anim-line { animation: line-grow 1.2s ease forwards; transform-origin: left; }

        .d-100 { animation-delay: 100ms; }
        .d-200 { animation-delay: 200ms; }
        .d-300 { animation-delay: 300ms; }
        .d-500 { animation-delay: 500ms; }
        .d-700 { animation-delay: 700ms; }

        .shimmer-gold {
            background: linear-gradient(90deg, #d97706 0%, #fef3c7 40%, #d97706 80%);
            background-size: 200% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shimmer-sweep 4s linear infinite;
        }

        .grain-overlay::after {
            content: '';
            position: absolute; inset: 0;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
            pointer-events: none; z-index: 5;
        }

        .star-letter {
            display: inline-block;
            transition: color 0.2s ease, transform 0.2s ease;
        }
        .star-word:hover .star-letter { transform: translateY(-3px); }

        .ministry-img {
            transition: transform 1.2s cubic-bezier(0.16,1,0.3,1), filter 0.8s ease;
        }
        .ministry-card:hover .ministry-img {
            transform: scale(1.08);
            filter: grayscale(0%) brightness(1);
        }

        .field-line {
            position: absolute;
            bottom: 0; left: 0;
            height: 1px;
            width: 0;
            background: linear-gradient(90deg, #d97706, #fbbf24);
            transition: width 0.4s ease;
        }
        .field-wrap:focus-within .field-line { width: 100%; }

        select option { background: #111; color: white; }
    `}</style>
);

/* ─── Hero Banner ────────────────────────────────────────────────────── */
const Banner = () => (
    <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Tag */}
        <div className="mb-8 opacity-0 anim-up d-100">
            <span className="inline-flex items-center gap-3 text-amber-400/80 tracking-[0.5em] text-[9px] uppercase font-bold">
                <span className="w-8 h-px bg-amber-500/60 inline-block anim-line" />
                Engagement & Service
                <span className="w-8 h-px bg-amber-500/60 inline-block" />
            </span>
        </div>

        {/* Title */}
        <div className="mb-6 opacity-0 anim-up d-200">
            <h1 className="font-display leading-none tracking-wide uppercase">
                <span className="block text-[clamp(2.5rem,9vw,7rem)] text-white">Deviens un(e)</span>
                <span className="block text-[clamp(3rem,12vw,9rem)] shimmer-gold star-word">
                    {'S.T.A.R.'.split('').map((c, i) => (
                        <span key={i} className="star-letter" style={{ transitionDelay: `${i * 40}ms` }}>{c}</span>
                    ))}
                </span>
            </h1>
        </div>

        {/* Acronym definition */}
        <div className="mb-12 opacity-0 anim-up d-300">
            <div className="inline-block border-l-2 border-amber-500/60 pl-6 text-left">
                <p className="text-white/70 text-base md:text-lg font-light italic leading-relaxed">
                    "<span className="font-black text-amber-400 not-italic">S</span>erviteur
                    <span className="font-black text-amber-400 not-italic"> T</span>ravaillant
                    <span className="font-black text-amber-400 not-italic"> A</span>ctivement pour le
                    <span className="font-black text-amber-400 not-italic"> R</span>oyaume"
                </p>
            </div>
        </div>

        {/* CTA */}
        <div className="opacity-0 anim-up d-500">
            <a
                href="#ministries-list"
                className="group inline-flex items-center gap-4 bg-amber-600 hover:bg-amber-500 text-black px-10 py-4 font-black text-[10px] uppercase tracking-[0.25em] transition-all duration-300 shadow-lg shadow-amber-900/30 overflow-hidden relative"
            >
                <span className="relative z-10">Trouve ton Ministère</span>
                <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
            </a>
        </div>
    </div>
);

/* ─── Ministry Card ──────────────────────────────────────────────────── */
const MinistryCard = ({ ministry, reversed, index }) => (
    <div
        className={`ministry-card group relative bg-zinc-900 border border-white/[0.06] hover:border-amber-500/25 overflow-hidden flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} transition-all duration-700`}
        style={{ opacity: 0, animation: `float-up 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 80}ms forwards` }}
    >
        {/* Image */}
        <div className="w-full lg:w-[58%] relative overflow-hidden" style={{ minHeight: '320px' }}>
            {ministry.image ? (
                <>
                    <img
                        src={ministry.image}
                        alt={ministry.title}
                        className="ministry-img absolute inset-0 w-full h-full object-cover grayscale brightness-75"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-${reversed ? 'l' : 'r'} from-zinc-900 via-zinc-900/30 to-transparent z-10`} />
                </>
            ) : (
                <div className="absolute inset-0 bg-zinc-950 flex items-center justify-center">
                    <span className="font-display text-8xl text-amber-500/10">{ministry.title[0]}</span>
                </div>
            )}

            {/* Category badge */}
            <div className="absolute top-6 left-6 z-20">
                <span className="bg-black/60 border border-amber-500/30 text-amber-500 text-[8px] font-black tracking-[0.4em] uppercase px-3 py-1.5 backdrop-blur-sm">
                    {ministry.category}
                </span>
            </div>
        </div>

        {/* Content */}
        <div className="w-full lg:w-[42%] p-8 lg:p-12 flex flex-col justify-between relative z-10">
            {/* Index number */}
            <span className="font-display text-6xl text-white/[0.04] absolute top-6 right-8 leading-none select-none">
                {String(index + 1).padStart(2, '0')}
            </span>

            <div>
                <div className="w-8 h-px bg-amber-500 mb-6 anim-line" />
                <h3 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-white leading-none tracking-wide uppercase mb-5 group-hover:text-amber-400 transition-colors duration-500">
                    {ministry.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed font-light">
                    {ministry.description}
                </p>
            </div>

            <div className="mt-8">
                <button className="group/btn relative inline-flex items-center gap-3 border border-amber-500/40 hover:border-amber-500 text-amber-500 hover:text-black text-[9px] font-black uppercase tracking-[0.3em] px-8 py-3 transition-all duration-400 overflow-hidden">
                    <span className="absolute inset-0 bg-amber-500 scale-x-0 group-hover/btn:scale-x-100 origin-left transition-transform duration-400" />
                    <span className="relative">Rejoindre</span>
                    <ArrowRight size={12} className="relative group-hover/btn:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>

        {/* Hover glow line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/0 to-transparent group-hover:via-amber-500/50 transition-all duration-700" />
    </div>
);

/* ─── Ministries Section ─────────────────────────────────────────────── */
const MinistriesSection = () => {
    const [visibleCount, setVisibleCount] = useState(3);

    const ministries = [
        { category: 'Communication', title: 'Communication', description: "Partage la vision S.T.A.R. à travers les mots et les images. Manage les réseaux sociaux et crée du contenu impactant pour inspirer notre communauté.", image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop' },
        { category: 'Musique', title: 'Chorale', description: "Lève-toi et chante ! Exprime ton amour à travers la musique et conduis les autres à la louange sincère. Aucune expérience requise, juste une passion.", image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop' },
        { category: 'Tech', title: 'Audio Visuel', description: "Maîtrise la technologie pour créer une expérience spirituelle immersive. Son, lumière, vidéo — tous les éléments au service de la vision S.T.A.R.", image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop' },
        { category: 'Logistique', title: 'Secrétariat', description: "Sois l'organisateur invisible qui fait fonctionner la machine. Gère les documents, archives et coordonne les événements avec précision.", image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop' },
        { category: 'Maintenance', title: 'Entretiens', description: "Maintiens nos espaces en excellence et propreté. Un environnement bien organisé et accueillant reflète l'ordre et la grâce de Dieu.", image: 'https://images.unsplash.com/photo-1503387762519-52582dea4e4e?w=800&h=600&fit=crop' },
        { category: 'Leadership', title: 'Protocole', description: "Accueille avec excellence nos visiteurs et membres. Sois la représentation du service raffiné et de l'amour du Christ dans chaque interaction.", image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop' },
        { category: 'Créativité', title: 'Art et Expression', description: "Exprime ta créativité pour glorifier l'Éternel. Danse, théâtre, peinture, design — tous les arts sont bienvenus pour une expression complète.", image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800&h=600&fit=crop' },
    ];

    return (
        <section className="py-28 px-4 md:px-8 relative" id="ministries-list">
            {/* Subtle ambient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-600/4 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto relative z-10">
                {/* Section header */}
                <div className="mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-8 h-px bg-amber-600/50" />
                            <span className="text-amber-500/70 text-[9px] font-black uppercase tracking-[0.5em]">Nos équipes</span>
                        </div>
                        <h2 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] text-white leading-none tracking-wide uppercase">
                            Explore nos<br />
                            <span className="shimmer-gold">Ministères</span>
                        </h2>
                    </div>
                    <p className="text-gray-600 text-base font-light max-w-xs leading-relaxed lg:text-right italic">
                        Chaque don est unique — trouve ta place dans l'équipe S.T.A.R.
                    </p>
                </div>

                {/* Cards */}
                <div className="space-y-1">
                    {ministries.slice(0, visibleCount).map((ministry, index) => (
                        <MinistryCard key={index} ministry={ministry} reversed={index % 2 !== 0} index={index} />
                    ))}
                </div>

                {/* Load more */}
                {visibleCount < ministries.length && (
                    <div className="flex justify-center pt-16">
                        <button
                            onClick={() => setVisibleCount(p => Math.min(p + 3, ministries.length))}
                            className="group flex items-center gap-5 text-gray-600 hover:text-amber-400 transition-all duration-300"
                        >
                            <span className="w-16 h-px bg-white/10 group-hover:w-24 group-hover:bg-amber-500/50 transition-all duration-500" />
                            <span className="text-[9px] font-black uppercase tracking-[0.5em] whitespace-nowrap">Découvrir plus</span>
                            <span className="w-16 h-px bg-white/10 group-hover:w-24 group-hover:bg-amber-500/50 transition-all duration-500" />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

/* ─── Contact Form ───────────────────────────────────────────────────── */
const ContactForm = () => {
    const [form, setForm] = useState({ fullName: '', email: '', ministry: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setForm({ fullName: '', email: '', ministry: '', message: '' });
        setTimeout(() => setSubmitted(false), 4000);
    };

    const ministryOptions = ['Communication', 'Chorale', 'Audio Visuel', 'Secrétariat', 'Entretiens', 'Protocole', 'Art et Expression'];

    const Field = ({ label, children }) => (
        <div>
            <label className="block text-gray-600 text-[9px] font-black tracking-[0.4em] uppercase mb-2">{label}</label>
            <div className="field-wrap relative">
                {children}
                <div className="field-line" />
            </div>
        </div>
    );

    const inputCls = "w-full bg-transparent border-b border-white/10 py-3 text-white placeholder-zinc-700 text-sm font-light outline-none transition-colors duration-300 focus:border-amber-500/0";

    return (
        <section className="relative py-28 px-4 bg-zinc-950 border-t border-white/[0.04] overflow-hidden">
            {/* Ambient */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-600/3 rounded-full blur-[80px] pointer-events-none" />

            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                <span className="font-display text-[20vw] text-white/[0.012] leading-none uppercase">SERVIR</span>
            </div>

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-start">

                    {/* Left column */}
                    <div className="w-full lg:w-[35%] lg:sticky lg:top-32">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-8 h-px bg-amber-600/50" />
                            <span className="text-amber-500/70 text-[9px] font-black uppercase tracking-[0.5em]">Rejoins-nous</span>
                        </div>
                        <h2 className="font-display text-[clamp(3rem,6vw,5rem)] text-white leading-none tracking-wide uppercase mb-8">
                            Prêt à <br />
                            <span className="shimmer-gold">Servir ?</span>
                        </h2>
                        <p className="text-gray-600 font-light text-sm leading-relaxed mb-10">
                            Rejoins l'aventure S.T.A.R. et mets tes talents au service d'une vision plus grande. Ton engagement change les vies.
                        </p>
                        <div className="space-y-4 border-l border-white/[0.06] pl-6">
                            {['Croissance personnelle', 'Impact communautaire', 'Connexions spirituelles'].map((item) => (
                                <div key={item} className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 bg-amber-500 rotate-45 shrink-0" />
                                    <span className="text-gray-500 text-sm font-light">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="w-full lg:w-[65%] space-y-8">
                        {submitted && (
                            <div className="border border-amber-500/30 bg-amber-500/10 px-6 py-4 text-amber-300 text-sm font-bold flex items-center gap-3">
                                <div className="w-1.5 h-1.5 bg-amber-500 rotate-45 shrink-0" />
                                Merci ! Nous avons reçu ta demande. À très bientôt.
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Field label="Nom complet">
                                <input name="fullName" value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })}
                                    className={inputCls} placeholder="Jean d'Impact" />
                            </Field>
                            <Field label="Email">
                                <input name="email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                                    className={inputCls} placeholder="vous@email.com" />
                            </Field>
                        </div>

                        <Field label="Ministère d'intérêt">
                            <select name="ministry" value={form.ministry} onChange={e => setForm({ ...form, ministry: e.target.value })}
                                className={`${inputCls} appearance-none cursor-pointer`}>
                                <option value="">Sélectionne un ministère...</option>
                                {ministryOptions.map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                            <ArrowRight size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-amber-500/50 pointer-events-none rotate-90" />
                        </Field>

                        <Field label="Message">
                            <textarea name="message" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                                className={`${inputCls} resize-none`} style={{ height: '100px' }}
                                placeholder="Parle-nous de toi et de tes motivations..." />
                        </Field>

                        <button
                            type="submit"
                            className="group relative inline-flex items-center gap-4 bg-amber-600 hover:bg-amber-500 text-black px-12 py-4 font-black text-[10px] uppercase tracking-[0.3em] transition-all duration-300 overflow-hidden"
                        >
                            <span className="relative z-10">Envoyer ma demande</span>
                            <ArrowRight size={14} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                            <div className="absolute inset-0 bg-white/15 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

/* ─── Page ───────────────────────────────────────────────────────────── */
const MinistriesPage = () => (
    <div className="relative flex min-h-screen flex-col bg-black text-gray-400 overflow-x-hidden font-body">
        <GlobalStyles />

        <header className="fixed top-0 right-0 left-0 z-50">
            <Nav />
        </header>

        <main className="grow">
            {/* Hero */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden grain-overlay">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('/src/assets/fij3.jpeg')`,
                        filter: 'brightness(0.35) contrast(1.1)',
                    }}
                />
                {/* Layered gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60 z-[1]" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 z-[1]" />

                {/* Geometric accents */}
                <div className="absolute inset-0 z-[2] pointer-events-none">
                    <div className="absolute left-12 top-1/3 w-px h-28 bg-gradient-to-b from-transparent via-amber-500/30 to-transparent" />
                    <div className="absolute right-12 top-1/3 w-px h-28 bg-gradient-to-b from-transparent via-amber-500/30 to-transparent" />
                    <div className="absolute bottom-24 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-amber-500/15 to-transparent" />
                </div>

                <div className="relative z-[3] w-full">
                    <Banner />
                </div>

                {/* Scroll hint */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2 opacity-35">
                    <span className="text-[9px] text-white/60 tracking-[0.3em] uppercase">Scroll</span>
                    <div className="w-px h-10 bg-gradient-to-b from-white/60 to-transparent" />
                </div>
            </section>

            {/* Content */}
            <div className="bg-black relative z-10">
                <MinistriesSection />
                <ContactForm />
            </div>
        </main>

        <footer className="bg-black border-t border-white/[0.04]">
            <Footer />
        </footer>
    </div>
);

export default MinistriesPage;