import React, { useState, useEffect } from 'react';
import logo from "./assets/images/ejp_logo.jpg";
import { ArrowRight, Quote } from 'lucide-react';
import VisionSection from './components/VisionSection';
import Nav from './components/common/Nav';
import Footer from './components/common/Footer';
import fij1 from "./assets/images/image.jpg";
import fij2 from "./assets/images/image1.jpg";
import fij3 from "./assets/images/image2.jpg";
import fij4 from "./assets/images/image3.jpg";
import song from "./assets/song.mp3";

/* ─── Global styles ─────────────────────────────────────────────────── */
const GlobalStyles = () => (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,700;1,300&display=swap');

        .font-display { font-family: 'Bebas Neue', sans-serif; }
        .font-body    { font-family: 'DM Sans', sans-serif; }

        @keyframes slide-in-up {
            from { opacity: 0; transform: translateY(50px); }
            to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
            from { opacity: 0; }
            to   { opacity: 1; }
        }
        @keyframes shimmer-sweep {
            0%   { background-position: -200% center; }
            100% { background-position:  200% center; }
        }
        @keyframes tick-in {
            from { opacity: 0; transform: translateY(-12px); }
            to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes line-grow {
            from { transform: scaleX(0); }
            to   { transform: scaleX(1); }
        }
        @keyframes glow-pulse {
            0%, 100% { opacity: 0.4; }
            50%       { opacity: 0.8; }
        }

        .anim-slide-up { animation: slide-in-up 0.9s cubic-bezier(0.16,1,0.3,1) forwards; }
        .anim-fade-in  { animation: fade-in 1s ease forwards; }
        .anim-line     { animation: line-grow 1.2s ease forwards; transform-origin: left; }

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

        .digit-swap {
            animation: tick-in 0.25s cubic-bezier(0.34,1.56,0.64,1);
        }

        .input-field {
            width: 100%;
            background: rgba(0,0,0,0.8);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 0;
            padding: 14px 18px;
            color: white;
            font-family: 'DM Sans', sans-serif;
            font-size: 14px;
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
            outline: none;
        }
        .input-field::placeholder { color: rgba(255,255,255,0.2); }
        .input-field:focus {
            border-color: rgba(217,119,6,0.7);
            box-shadow: 0 0 0 1px rgba(217,119,6,0.2);
        }
    `}</style>
);

/* ─── Banner ─────────────────────────────────────────────────────────── */
const Banner = () => {
    const [current, setCurrent] = useState(0);
    const images = [fij1, fij2, fij3, fij4];

    useEffect(() => {
        const id = setInterval(() => setCurrent(p => (p + 1) % images.length), 5000);
        return () => clearInterval(id);
    }, [images.length]);

    return (
        <section className="relative h-screen flex items-start justify-center overflow-hidden bg-black grain-overlay">
            {/* Slideshow */}
            <div className="absolute inset-0 z-0">
                {images.map((img, i) => (
                    <div
                        key={i}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${img})`,
                            opacity: i === current ? 1 : 0,
                            transform: i === current ? 'scale(1)' : 'scale(1.06)',
                            transition: 'opacity 1.5s ease, transform 6s ease',
                            filter: 'brightness(0.45) contrast(1.1)',
                        }}
                    />
                ))}
                {/* Layered gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/70 z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 z-10" />
            </div>

            {/* Geometric accents */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="absolute top-1/3 left-12 w-px h-32 bg-gradient-to-b from-transparent via-amber-500/40 to-transparent" />
                <div className="absolute top-1/3 right-12 w-px h-32 bg-gradient-to-b from-transparent via-amber-500/40 to-transparent" />
                <div className="absolute bottom-32 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-20 text-center px-6 max-w-5xl  mx-auto pt-5 md:pt-3 ">
                {/* Logo */}
                <div className="mb-1 flex justify-center opacity-0 anim-fade-in">
                    <div className="relative">
                        <div className="absolute inset-0 bg-amber-500/25 blur-3xl rounded-full scale-150" style={{ animation: 'glow-pulse 3s ease-in-out infinite' }} />
                        <img
                            src={logo}
                            alt="EJP Logo"
                            className="relative w-14 h-14 md:w-20 md:h-20 rounded-full border border-amber-500/40 shadow-2xl object-cover"
                        />
                    </div>
                </div>

                {/* Location tag */}
                <div className="mb-4 opacity-0 anim-slide-up d-100">
                    <span className="text-amber-500/80 font-black tracking-[0.5em] uppercase text-[9px]">
                        Porto-Novo · Bénin
                    </span>
                </div>

                {/* Main title — disposition de l'ancien banner */}
                <div className="opacity-0 anim-slide-up d-200">
                    <h1 className="font-display leading-none tracking-wide uppercase">
                        {/* Ligne 1 */}
                        <span className="block text-[clamp(3rem,8vw,8.5rem)] text-white">
                            Église Jeunes
                        </span>

                        {/* Bloc tagline encadré — entre deux barres */}
                        <div className="flex flex-col items-center my-3 md:my-4">
                            <div className="w-24 md:w-36 h-px bg-gradient-to-r from-transparent via-amber-500/70 to-transparent mb-2" />
                            <p className="text-amber-500 font-bold tracking-[0.4em] text-[9px] md:text-[11px] uppercase font-body">
                                Par les jeunes <span className="mx-2 text-white/20">|</span> Pour les jeunes
                            </p>
                            <div className="w-24 md:w-36 h-px bg-gradient-to-r from-transparent via-amber-500/70 to-transparent mt-3" />
                        </div>

                        {/* Ligne 3 — shimmer italique */}
                        <span className="block text-[clamp(3rem,8vw,8.5rem)] shimmer-gold" style={{ fontStyle: 'italic' }}>
                            Prodiges
                        </span>
                    </h1>
                </div>

                {/* Thin separator */}
                <div className="w-10 h-px bg-amber-500/40 mx-auto mt-2 mb-8 opacity-0 anim-fade-in d-300" />

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0 anim-slide-up d-500">
                    <a
                        href="/register"
                        className="group relative bg-amber-600 hover:bg-amber-500 text-black px-10 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-lg shadow-amber-900/30 overflow-hidden"
                    >
                        <span className="relative z-10">Rejoins-nous</span>
                        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
                    </a>
                    <a
                        href="/dons"
                        className="border border-white/20 hover:border-amber-500/60 text-white/80 hover:text-white px-10 py-4 text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-sm transition-all duration-300"
                    >
                        Faire un don
                    </a>
                </div>

                {/* Slide indicators */}
                <div className="flex justify-center gap-2 mt-12 opacity-0 anim-fade-in d-700">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className="h-[2px] transition-all duration-500"
                            style={{
                                width: i === current ? '2.5rem' : '0.625rem',
                                background: i === current ? '#d97706' : 'rgba(255,255,255,0.25)',
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-40">
                <div className="w-px h-10 bg-gradient-to-b from-white/60 to-transparent" />
            </div>
        </section>
    );
};

/* ─── Countdown ──────────────────────────────────────────────────────── */
const CountdownSection = () => {
    const getTarget = () => {
        const now = new Date();
        const next = new Date();
        const day = now.getDay(); // 0=Sun
        const daysUntilSun = day === 0 ? 7 : 7 - day;
        next.setDate(now.getDate() + daysUntilSun);
        next.setHours(15, 29, 0, 0);
        return next;
    };

    const calc = () => {
        const diff = getTarget() - new Date();
        if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        return {
            days: Math.floor(diff / 86400000),
            hours: Math.floor((diff / 3600000) % 24),
            minutes: Math.floor((diff / 60000) % 60),
            seconds: Math.floor((diff / 1000) % 60),
        };
    };

    const [time, setTime] = useState(calc);
    const fmt = (n) => String(n).padStart(2, '0');

    useEffect(() => {
        const id = setInterval(() => setTime(calc()), 1000);
        return () => clearInterval(id);
    }, []);

    const units = [
        { label: 'Jours', value: time.days },
        { label: 'Heures', value: time.hours },
        { label: 'Minutes', value: time.minutes },
        { label: 'Secondes', value: time.seconds },
    ];

    return (
        <section className="relative bg-zinc-950 py-20 overflow-hidden border-t border-white/[0.04]">
            {/* Ambient */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-600/5 rounded-full blur-[100px]" />
                <div className="absolute inset-0 opacity-[0.015]"
                    style={{ backgroundImage: 'repeating-linear-gradient(0deg, #d97706 0, #d97706 1px, transparent 0, transparent 40px)' }} />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="w-8 h-px bg-amber-600/50" />
                        <span className="text-amber-500/70 text-[9px] font-black uppercase tracking-[0.5em]">Prochain culte</span>
                        <div className="w-8 h-px bg-amber-600/50" />
                    </div>
                    <h2 className="font-display text-[clamp(2rem,6vw,4.5rem)] text-white leading-none tracking-wide uppercase">
                        EJP Porto-Novo
                    </h2>
                    <p className="text-gray-600 text-xs tracking-[0.3em] uppercase mt-2 font-bold">
                        Église des Jeunes Prodiges
                    </p>
                </div>

                {/* Timer */}
                <div className="inline-flex items-end gap-0 border border-white/[0.06] bg-black/40">
                    {units.map(({ label, value }, i) => (
                        <React.Fragment key={label}>
                            <div className="flex flex-col items-center px-6 py-8 md:px-10 md:py-10 group">
                                <span
                                    key={value}
                                    className="font-display text-[clamp(2.5rem,7vw,5.5rem)] text-white leading-none digit-swap"
                                >
                                    {fmt(value)}
                                </span>
                                <span className="text-amber-600/60 text-[9px] font-black uppercase tracking-[0.35em] mt-3">
                                    {label}
                                </span>
                            </div>
                            {i < units.length - 1 && (
                                <div className="self-center pb-6 text-amber-600/30 font-display text-4xl md:text-5xl select-none">:</div>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Bottom note */}
                <p className="mt-8 text-gray-700 text-[10px] tracking-[0.4em] uppercase font-bold">
                    Dimanche · 15h29 · Porto-Novo
                </p>
            </div>
        </section>
    );
};

/* ─── Contact ────────────────────────────────────────────────────────── */
const Contact = () => (
    <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-8 h-px bg-amber-600/50" />
                <span className="text-amber-500/70 text-[9px] font-black uppercase tracking-[0.5em]">Contactez-nous</span>
                <div className="w-8 h-px bg-amber-600/50" />
            </div>
            <h2 className="font-display text-[clamp(2.5rem,8vw,6rem)] text-white leading-none tracking-wide uppercase">
                Une <span className="shimmer-gold">Question ?</span>
            </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-1">
            {/* Form */}
            <div className="bg-zinc-900/60 border border-white/[0.06] p-10">
                <div className="space-y-5">
                    {[
                        { label: 'Nom complet', type: 'text', placeholder: 'Jean Kouassi' },
                        { label: 'Adresse email', type: 'email', placeholder: 'vous@email.com' },
                    ].map(({ label, type, placeholder }) => (
                        <div key={label}>
                            <label className="block text-gray-600 text-[9px] font-black tracking-[0.35em] uppercase mb-2">{label}</label>
                            <input type={type} placeholder={placeholder} className="input-field" />
                        </div>
                    ))}
                    <div>
                        <label className="block text-gray-600 text-[9px] font-black tracking-[0.35em] uppercase mb-2">Message</label>
                        <textarea
                            placeholder="Comment pouvons-nous vous aider ?"
                            className="input-field resize-none"
                            style={{ height: '120px' }}
                        />
                    </div>
                    <button className="w-full bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-black font-black py-4 text-[10px] tracking-[0.3em] uppercase transition-all duration-300 mt-2">
                        Envoyer le message
                    </button>
                </div>
            </div>

            {/* Bible quote */}
            <div className="relative bg-zinc-950 border border-white/[0.06] p-10 flex flex-col justify-center overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-amber-600/8 rounded-full blur-[60px]" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-600/5 rounded-full blur-[40px]" />
                <div className="relative z-10 text-center">
                    <div className="w-8 h-8 border border-amber-500/30 flex items-center justify-center mx-auto mb-8">
                        <Quote size={14} className="text-amber-500/60" />
                    </div>
                    <span className="text-amber-500/60 text-[9px] font-black tracking-[0.5em] uppercase block mb-6">Luc 14:23</span>
                    <p className="font-display text-[clamp(1.4rem,3vw,2rem)] text-white leading-tight tracking-wide uppercase mb-8">
                        Va dans les chemins et le long des haies, et ceux que tu trouveras, contrains-les d'entrer
                    </p>
                    <div className="w-10 h-px bg-amber-600/40 mx-auto mb-6" />
                    <p className="text-gray-600 text-[9px] font-black tracking-[0.4em] uppercase">Église Jeunes Prodiges</p>
                </div>
            </div>
        </div>
    </div>
);

/* ─── Testimonials ───────────────────────────────────────────────────── */
const TestimonialSection = () => {
    const testimonials = [
        { name: "Audrey", title: "L'Église de mes rêves", text: "Je n'aurais pas pu rêver d'une meilleure église. Moi qui me sentais seule, je me sens tellement mieux maintenant à l'EJP !" },
        { name: "Owen", title: "J'aime mon église !", text: "Depuis que je suis à l'EJP, j'attends dimanche après dimanche avec impatience. Merci Seigneur pour Ta grâce." },
        { name: "Grace", title: "Transformée", text: "L'EJP a changé ma façon de voir la vie. Une communauté qui aime, qui prie, qui avance ensemble. Je ne l'échangerais contre rien." },
    ];

    const [idx, setIdx] = useState(0);
    const [fading, setFading] = useState(false);

    const goTo = (next) => {
        setFading(true);
        setTimeout(() => { setIdx(next); setFading(false); }, 350);
    };

    useEffect(() => {
        const id = setInterval(() => goTo((idx + 1) % testimonials.length), 6000);
        return () => clearInterval(id);
    }, [idx]);

    const t = testimonials[idx];

    return (
        <section className="relative py-32 bg-black overflow-hidden">
            {/* Background text watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                <span
                    className="font-display text-[20vw] text-white/[0.015] leading-none uppercase whitespace-nowrap"
                    style={{ letterSpacing: '-0.02em' }}
                >
                    TÉMOIGNAGES
                </span>
            </div>

            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="w-8 h-px bg-amber-600/50" />
                        <span className="text-amber-500/70 text-[9px] font-black uppercase tracking-[0.5em]">Paroles de Prodiges</span>
                        <div className="w-8 h-px bg-amber-600/50" />
                    </div>
                    <h2 className="font-display text-[clamp(2.5rem,7vw,5rem)] text-white leading-none tracking-wide uppercase">
                        Ils témoignent
                    </h2>
                </div>

                {/* Testimonial card */}
                <div className="relative border border-white/[0.06] bg-zinc-900/50 p-12 md:p-16 overflow-hidden">
                    {/* Amber corner accent */}
                    <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-amber-500/40" />
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-amber-500/40" />
                    <div className="absolute top-0 right-0 w-48 h-48 bg-amber-600/5 rounded-full blur-[60px]" />

                    <div
                        className="relative z-10 text-center transition-all duration-350"
                        style={{ opacity: fading ? 0 : 1, transform: fading ? 'translateY(10px)' : 'translateY(0)' }}
                    >
                        <Quote className="mx-auto text-amber-500/20 mb-8" size={48} />
                        <h3 className="font-display text-[clamp(1.8rem,4vw,3rem)] text-white leading-none tracking-wide uppercase mb-6">
                            "{t.title}"
                        </h3>
                        <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-2xl mx-auto italic">
                            {t.text}
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <div className="w-6 h-px bg-amber-600/60" />
                            <span className="text-amber-500 font-black text-[10px] tracking-[0.4em] uppercase">{t.name}</span>
                            <div className="w-6 h-px bg-amber-600/60" />
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-center gap-4 mt-8">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            className="h-[2px] transition-all duration-500"
                            style={{
                                width: i === idx ? '2.5rem' : '0.75rem',
                                background: i === idx ? '#d97706' : 'rgba(255,255,255,0.15)',
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

/* ─── Divider ────────────────────────────────────────────────────────── */
const Divider = () => (
    <div className="w-full py-4">
        <div className="container mx-auto flex items-center gap-4 px-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-amber-600/30" />
            <div className="w-1.5 h-1.5 bg-amber-600 rotate-45" />
            <div className="w-1 h-1 bg-amber-600/40 rotate-45" />
            <div className="w-1.5 h-1.5 bg-amber-600 rotate-45" />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-amber-600/30" />
        </div>
    </div>
);

/* ─── Index ──────────────────────────────────────────────────────────── */
const Index = () => (
    <div className="bg-black min-h-screen text-gray-400 font-body selection:bg-amber-500/30">
        <GlobalStyles />
        <Nav />

        {/* 1. Hero */}
        <Banner />

        {/* 2. Countdown */}
        <CountdownSection />

        <Divider />

        {/* 3. Vision + audio */}
        <VisionSection audioPath={song} />

        <Divider />

        {/* 4. Testimonials */}
        <TestimonialSection />

        <Divider />

        {/* 5. Premiers pas */}
        <section id="premierpas" className="relative py-32 bg-zinc-950 overflow-hidden">
            {/* Background watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                <span className="font-display text-[18vw] text-white/[0.018] leading-none uppercase">PREMIERS PAS</span>
            </div>
            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-amber-600/5 rounded-full blur-[120px]" />

            <div className="container mx-auto px-6 text-center relative z-10">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="w-8 h-px bg-amber-600/50" />
                        <span className="text-amber-500/70 text-[9px] font-black uppercase tracking-[0.5em]">Nouveau ici ?</span>
                        <div className="w-8 h-px bg-amber-600/50" />
                    </div>
                    <h2 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] text-white leading-none tracking-wide uppercase mb-8">
                        Mes premiers pas avec <span className="shimmer-gold">Jésus</span>
                    </h2>
                    <p className="text-gray-500 text-base font-light leading-relaxed mb-12 max-w-lg mx-auto">
                        Tu commences ta marche avec Jésus ? Laisse-nous t'accompagner pour bâtir des fondements solides pour ta nouvelle vie.
                    </p>
                    <a
                        href="/register"
                        className="group inline-flex items-center gap-4 bg-white text-black px-12 py-5 text-[10px] font-black uppercase tracking-[0.25em] hover:bg-amber-500 transition-all duration-300 shadow-xl"
                    >
                        Inscris-toi maintenant
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>
        </section>

        <Divider />

        {/* 6. Don */}
        <section className="relative py-40 bg-black overflow-hidden">
            {/* Massive background text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                <span
                    className="font-display text-[25vw] text-white/[0.015] leading-none uppercase"
                    style={{ transform: 'rotate(-8deg)', letterSpacing: '-0.02em' }}
                >
                    DONNER
                </span>
            </div>

            {/* Vertical amber lines */}
            <div className="absolute left-20 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-600/15 to-transparent hidden lg:block" />
            <div className="absolute right-20 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-600/15 to-transparent hidden lg:block" />

            <div className="container mx-auto px-6 text-center max-w-4xl relative z-10">
                <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="w-8 h-px bg-amber-600/50" />
                    <span className="text-amber-500/70 text-[9px] font-black uppercase tracking-[0.5em]">Soutenir la vision</span>
                    <div className="w-8 h-px bg-amber-600/50" />
                </div>
                <h2 className="font-display text-[clamp(3rem,10vw,8rem)] text-white leading-none tracking-wide uppercase mb-6">
                    Faire un <span className="shimmer-gold">Don</span>
                </h2>
                <p className="text-gray-600 text-lg font-light italic mb-12 max-w-md mx-auto">
                    "Dieu aime celui qui donne avec joie." (2 Cor 9:7)
                </p>
                <a
                    href="/dons"
                    className="group inline-flex items-center gap-5 border border-white/20 hover:border-amber-500/60 text-white/80 hover:text-white px-12 py-5 text-[10px] font-black uppercase tracking-[0.25em] transition-all duration-300"
                >
                    Soutenir la vision
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </a>
            </div>
        </section>

        <Divider />

        {/* 7. Contact */}
        <section id="contact" className="py-32 bg-zinc-950">
            <Contact />
        </section>

        {/* 8. Footer */}
        <footer className="bg-black border-t border-white/[0.04]">
            <Footer />
        </footer>
    </div>
);

export default Index;
export { Contact };