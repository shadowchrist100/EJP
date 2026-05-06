import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FadeIn from '../../common/FadeIn';
import { logo, fij1, fij2, fij3, fij4 } from '../../../assets';

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
            <div className="relative z-20 text-center px-6 max-w-5xl mx-auto pt-2 md:pt-1">
                {/* Logo */}
                <FadeIn delay={0.1} direction="none" className="mb-1 flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-amber-500/25 blur-3xl rounded-full scale-150" style={{ animation: 'glow-pulse 3s ease-in-out infinite' }} />
                        <img
                            src={logo}
                            alt="EJP Logo"
                            className="relative w-14 h-14 md:w-20 md:h-20 rounded-full border border-amber-500/40 shadow-2xl object-cover"
                        />
                    </div>
                </FadeIn>

                {/* Location tag */}
                <FadeIn delay={0.2} direction="up" className="mb-4">
                    <span className="text-amber-500/80 font-black tracking-[0.5em] uppercase text-[9px]">
                        Porto-Novo · Bénin
                    </span>
                </FadeIn>

                {/* Main title */}
                <FadeIn delay={0.3} direction="up">
                    <h1 className="font-display leading-none tracking-wide uppercase">
                        {/* Ligne 1 */}
                        <span className="block text-[clamp(3rem,8vw,8.5rem)] text-white">
                            Église Jeunes
                        </span>

                        {/* Bloc tagline encadré */}
                        <div className="flex flex-col items-center my-3 md:my-4">
                            <div className="w-24 md:w-36 h-px bg-linear-to-r from-transparent via-amber-500/70 to-transparent mb-2" />
                            <p className="text-amber-500 font-bold tracking-[0.4em] text-[9px] md:text-[11px] uppercase font-body">
                                Par les jeunes <span className="mx-2 text-white/20">|</span> Pour les jeunes
                            </p>
                            <div className="w-24 md:w-36 h-px bg-linear-to-r from-transparent via-amber-500/70 to-transparent mt-3" />
                        </div>

                        {/* Ligne 3 */}
                        <span className="block text-[clamp(3rem,8vw,8.5rem)] shimmer-gold" style={{ fontStyle: 'italic' }}>
                            Prodiges
                        </span>
                    </h1>
                </FadeIn>

                {/* Thin separator */}
                <FadeIn delay={0.4} direction="up">
                    <div className="w-10 h-px bg-amber-500/40 mx-auto mt-2 mb-8" />
                </FadeIn>

                {/* CTAs */}
                <FadeIn delay={0.5} direction="up" className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        to="/register"
                        className="group relative bg-amber-600 hover:bg-amber-500 text-black px-10 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-lg shadow-amber-900/30 overflow-hidden"
                    >
                        <span className="relative z-10">Rejoins-nous</span>
                        <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-500 skew-x-12" />
                    </Link>
                    <Link
                        to="/dons"
                        className="border border-white/20 hover:border-amber-500/60 text-white/80 hover:text-white px-10 py-4 text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-sm transition-all duration-300"
                    >
                        Faire un don
                    </Link>
                </FadeIn>

                {/* Slide indicators */}
                <FadeIn delay={0.6} direction="none" className="flex justify-center gap-2 mt-12">
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
                </FadeIn>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-40">
                <div className="w-px h-10 bg-linear-to-b from-white/60 to-transparent" />
            </div>
        </section>
    );
};

export default Banner;
