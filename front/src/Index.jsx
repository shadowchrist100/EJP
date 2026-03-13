import React, { useState, useEffect } from 'react';
import { ArrowRight, Quote } from 'lucide-react';
import { Nav, Footer, Contact, logo, VisionSection } from './components';
import { fij1, fij2, fij3, fij4 } from './components';
import song from "./assets/song.mp3";
import './index.css'

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
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-black/70 z-10" />
                <div className="absolute inset-0 bg-linear-to-r from-black/50 via-transparent to-black/50 z-10" />
            </div>

            {/* Geometric accents */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="absolute top-1/3 left-12 w-px h-32 bg-linear-to-b from-transparent via-amber-500/40 to-transparent" />
                <div className="absolute top-1/3 right-12 w-px h-32 bg-linear-to-b from-transparent via-amber-500/40 to-transparent" />
                <div className="absolute bottom-32 left-1/4 right-1/4 h-px bg-linear-to-r from-transparent via-amber-500/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-20 text-center px-6 max-w-5xl  mx-auto pt-2 md:pt-1 ">
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
                            <div className="w-24 md:w-36 h-px bg-linear-to-r from-transparent via-amber-500/70 to-transparent mb-2" />
                            <p className="text-amber-500 font-bold tracking-[0.4em] text-[9px] md:text-[11px] uppercase font-body">
                                Par les jeunes <span className="mx-2 text-white/20">|</span> Pour les jeunes
                            </p>
                            <div className="w-24 md:w-36 h-px bg-linear-to-r from-transparent via-amber-500/70 to-transparent mt-3" />
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
                        <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-500 skew-x-12" />
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
                            className="h-0.5 transition-all duration-500"
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
                <div className="w-px h-10 bg-linear-to-b from-white/60 to-transparent" />
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
        <section className="relative bg-zinc-950 py-20 overflow-hidden border-t border-white/4">
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
                <div className="inline-flex items-end gap-0 border border-white/6 bg-black/40">
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
                    className="font-display text-[20vw] text-white/1.5 leading-none uppercase whitespace-nowrap"
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
                <div className="relative border border-white/6 bg-zinc-900/50 p-12 md:p-16 overflow-hidden">
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
                            className="h-0.5 transition-all duration-500"
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
            <div className="flex-1 h-px bg-linear-to-r from-transparent to-amber-600/30" />
            <div className="w-1.5 h-1.5 bg-amber-600 rotate-45" />
            <div className="w-1 h-1 bg-amber-600/40 rotate-45" />
            <div className="w-1.5 h-1.5 bg-amber-600 rotate-45" />
            <div className="flex-1 h-px bg-linear-to-l from-transparent to-amber-600/30" />
        </div>
    </div>
);

/* ─── Index ──────────────────────────────────────────────────────────── */
const Index = () => {
    return (
        <div className="bg-black min-h-screen text-gray-400 font-body selection:bg-amber-500/30">
            {/* Fixed Navigation - z-50 pour rester au-dessus */}
            <div className='fixed top-0 right-0 left-0 z-50'>
                <Nav />
            </div>

            {/* Spacer pour compenser la hauteur de la Nav fixe (desktop: h-32, mobile: h-20) */}
            <div className="h-20 lg:h-32" />

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
                            href="/salvation"
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
                        className="font-display text-[25vw] text-white/1.5 leading-none uppercase"
                        style={{ transform: 'rotate(-8deg)', letterSpacing: '-0.02em' }}
                    >
                        DONNER
                    </span>
                </div>

                {/* Vertical amber lines */}
                <div className="absolute left-20 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-amber-600/15 to-transparent hidden lg:block" />
                <div className="absolute right-20 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-amber-600/15 to-transparent hidden lg:block" />

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
            <footer className="bg-black border-t border-white/4">
                <Footer />
            </footer>
        </div>
    );
};

export default Index;
export { Contact };