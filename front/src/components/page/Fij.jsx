import { Nav, Footer, Contact } from '../'
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
    motion,
    AnimatePresence,
    useScroll,
    useTransform,
    useAnimation,
    useInView,
    useSpring,
    useMotionValue,
} from 'framer-motion';

/* ─── Styles globaux ────────────────────────────────────────────────── */

const GlobalStyles = () => (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;700&display=swap');

        .font-display { font-family: 'Bebas Neue', sans-serif; }
        .font-body    { font-family: 'DM Sans', sans-serif; }

        .text-stroke {
            -webkit-text-stroke: 2px rgba(245,158,11,0.4);
            color: transparent;
        }

        /* Shine shimmer sur les cards */
        .card-shine-layer {
            position: absolute;
            inset: 0;
            pointer-events: none;
            z-index: 2;
            background: radial-gradient(
                circle 150px at var(--mx, 50%) var(--my, 50%),
                rgba(245,158,11,0.08),
                transparent 70%
            );
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .card-root:hover .card-shine-layer { opacity: 1; }

        /* Description expandable */
        .desc-expanded { display: -webkit-box; -webkit-line-clamp: unset; -webkit-box-orient: vertical; overflow: visible; }
        .desc-collapsed { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }

        /* Grain hero */
        .hero-grain::after {
            content: '';
            position: absolute; inset: 0;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
            pointer-events: none; z-index: 1;
        }

        /* Barre de progression scroll */
        .scroll-progress {
            position: fixed;
            top: 0; left: 0;
            height: 2px;
            background: linear-gradient(to right, #d97706, #f59e0b, #fbbf24);
            transform-origin: left;
            z-index: 9999;
        }

        /* Reveal clip pour les titres */
        .overflow-clip { overflow: hidden; }

        /* Hover btn arrow */
        .btn-arrow-icon { transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1); }
        .group:hover .btn-arrow-icon { transform: translateX(6px); }

        /* Slide-in underline on secondary link */
        .link-underline {
            position: relative;
            display: inline-block;
        }
        .link-underline::after {
            content: '';
            position: absolute;
            bottom: -2px; left: 0;
            width: 0; height: 1px;
            background: #fff;
            transition: width 0.3s ease;
        }
        .link-underline:hover::after { width: 100%; }
    `}</style>
);

/* ─── Variants Framer Motion ────────────────────────────────────────── */

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12 }
    }
};

const lineGrow = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] } }
};

/* ─── Titre animé lettre par lettre ────────────────────────────────── */

const AnimatedWord = ({ text, className, delay = 0, style = {} }) => {
    const chars = Array.from(text);
    return (
        <div className="overflow-clip" style={style}>
            <motion.span
                className={className}
                style={{ display: 'inline-block' }}
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.032, delayChildren: delay } }
                }}
                aria-label={text}
            >
                {chars.map((char, i) => (
                    <motion.span
                        key={i}
                        style={{ display: 'inline-block' }}
                        variants={{
                            hidden: { y: '110%', opacity: 0 },
                            visible: {
                                y: 0,
                                opacity: 1,
                                transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
                            }
                        }}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                ))}
            </motion.span>
        </div>
    );
};

/* ─── Barre de progression scroll ──────────────────────────────────── */

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 30, restDelta: 0.001 });
    return <motion.div className="scroll-progress" style={{ scaleX }} />;
};

/* ─── Banner avec parallax ──────────────────────────────────────────── */

const Banner = () => {
    const ref = useRef(null);
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 600], [0, 90]);
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);

    return (
        <motion.div
            ref={ref}
            style={{ y, opacity }}
            className="relative z-10 w-full max-w-6xl mx-auto px-6 font-body"
        >
            {/* Tag avec lignes qui s'étirent */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="mb-8 flex items-center gap-3"
            >
                <motion.span
                    variants={lineGrow}
                    className="w-8 h-px bg-amber-500 origin-left inline-block"
                />
                <motion.span
                    variants={fadeInUp}
                    className="text-amber-400 tracking-[0.3em] text-xs uppercase font-bold"
                >
                    Église des Jeunes Prodiges
                </motion.span>
                <motion.span
                    variants={lineGrow}
                    className="w-8 h-px bg-amber-500 origin-right inline-block"
                />
            </motion.div>

            {/* Titres — lettre par lettre */}
            <div className="mb-4 leading-none">
                <AnimatedWord
                    text="LES FAMILLES"
                    className="font-display text-[clamp(2rem,10vw,10rem)] sm:text-[clamp(3.5rem,12vw,10rem)] leading-none tracking-wide text-white"
                    delay={0.2}
                />
                <AnimatedWord
                    text="D'IMPACT"
                    className="font-display text-[clamp(2rem,10vw,10rem)] sm:text-[clamp(3.5rem,12vw,10rem)] leading-none tracking-wide text-stroke"
                    delay={0.45}
                />
                <AnimatedWord
                    text="JEUNES"
                    className="font-display text-[clamp(2rem,10vw,10rem)] sm:text-[clamp(3.5rem,12vw,10rem)] leading-none tracking-wide text-amber-400"
                    delay={0.68}
                />
            </div>

            {/* Sous-titre */}
            <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-gray-300 text-lg leading-relaxed font-light mb-12 max-w-xl"
            >
                Découvre les cellules vivantes de l'EJP — des communautés de jeunes qui transforment
                leurs quartiers et leurs villes pour Christ.
            </motion.p>

            {/* CTAs */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex items-center gap-6"
            >
                <motion.a
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    href="#fij-list"
                    className="group relative overflow-hidden bg-amber-500 text-black px-10 py-4 font-bold text-sm tracking-[0.15em] uppercase"
                >
                    {/* Shimmer au hover */}
                    <motion.span
                        className="absolute inset-0 bg-amber-400 -translate-x-full skew-x-[-15deg]"
                        whileHover={{ translateX: '0%' }}
                        transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
                    />
                    <span className="relative z-10 flex items-center gap-3">
                        Trouver ma FIJ
                        <svg
                            className="w-4 h-4 btn-arrow-icon"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </span>
                </motion.a>
                <a
                    href="#apropos"
                    className="text-gray-400 hover:text-white transition-colors text-sm tracking-widest uppercase font-medium link-underline"
                >
                    En savoir plus
                </a>
            </motion.div>

            {/* Indicateur scroll animé */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-gray-500 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
                <div className="w-px h-12 overflow-hidden">
                    <motion.div
                        className="w-full bg-gradient-to-b from-gray-500 to-transparent"
                        animate={{ height: ['0%', '100%', '0%'], y: ['0%', '0%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        style={{ height: '100%' }}
                    />
                </div>
            </motion.div>
        </motion.div>
    );
};

/* ─── À propos ───────────────────────────────────────────────────────── */

const Aboutfij = () => (
    <div className="container mx-auto px-4 py-16 font-body">
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto mb-24 text-center"
        >
            <motion.p variants={fadeInUp} className="text-amber-500 tracking-[0.3em] text-xs uppercase font-bold mb-6">
                Comprendre les FIJ
            </motion.p>
            <div className="overflow-clip">
                <motion.h2
                    variants={{
                        hidden: { y: '100%', opacity: 0 },
                        visible: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }
                    }}
                    className="font-display text-[clamp(2.5rem,7vw,5rem)] text-white leading-none mb-8"
                >
                    C'EST QUOI UNE FIJ ?
                </motion.h2>
            </div>
            <motion.div variants={lineGrow} className="w-16 h-px bg-amber-600 mx-auto mb-8 origin-center" />
            <motion.p variants={fadeInUp} className="text-gray-300 text-lg leading-relaxed font-light">
                Les FIJ sont les cellules de l'Église des Jeunes Prodiges. Les jeunes se réunissent{' '}
                <span className="text-amber-400 font-semibold">tous les mardis de 19h14 à 20h45</span>{' '}
                dans les maisons hôtes pour s'édifier et influencer leurs villes et quartiers avec les valeurs de Christ.{' '}
                <span className="text-gray-500 italic">(Actes 5:42)</span>
            </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-gray-800">
            {/* Box 1 – image */}
            <motion.div
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative h-[480px] overflow-hidden group bg-black"
            >
                <div className="absolute inset-0 bg-center bg-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: 'url("/images/fij6.jpeg")' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-10">
                    <span className="text-amber-500 text-xs tracking-[0.3em] uppercase font-bold mb-3 block">01</span>
                    <div className="overflow-clip">
                        <motion.h3
                            initial={{ y: '100%' }}
                            whileInView={{ y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
                            className="font-display text-5xl text-white leading-none"
                        >
                            NOTRE<br />MISSION
                        </motion.h3>
                    </div>
                </div>
            </motion.div>

            {/* Box 1 – texte */}
            <motion.div
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="bg-zinc-900 p-12 flex flex-col justify-center"
            >
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: 40 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="h-px bg-amber-500 mb-8"
                />
                <p className="text-gray-200 text-xl leading-relaxed font-light mb-8">
                    Amener la jeunesse à recevoir la véritable lumière qu'est Jésus-Christ, transformer
                    leur système de pensées et conquérir nos territoires pour Christ.
                </p>
                <div className="flex items-center gap-4 mt-auto">
                    <motion.div
                        whileHover={{ rotate: 90 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                        className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 flex items-center justify-center"
                    >
                        <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </motion.div>
                    <span className="text-gray-500 text-sm tracking-widest uppercase">Transformation</span>
                </div>
            </motion.div>

            {/* Box 2 – texte */}
            <motion.div
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="bg-zinc-900 p-12 flex flex-col justify-center order-2 lg:order-none"
            >
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: 40 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="h-px bg-amber-500 mb-8"
                />
                <p className="text-gray-200 text-xl leading-relaxed font-light mb-8">
                    Conquérir la jeunesse des extrémités de la terre pour en faire des disciples de Jésus
                    qui dominent dans les territoires géographiques et d'influence.
                </p>
                <div className="flex items-center gap-4 mt-auto">
                    <motion.div
                        whileHover={{ rotate: 90 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                        className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 flex items-center justify-center"
                    >
                        <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                        </svg>
                    </motion.div>
                    <span className="text-gray-500 text-sm tracking-widest uppercase">Expansion</span>
                </div>
            </motion.div>

            {/* Box 2 – image */}
            <motion.div
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative h-[480px] overflow-hidden group bg-black order-1 lg:order-none"
            >
                <div className="absolute inset-0 bg-center bg-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: 'url("/images/fij3.jpeg")' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-10">
                    <span className="text-amber-500 text-xs tracking-[0.3em] uppercase font-bold mb-3 block">02</span>
                    <div className="overflow-clip">
                        <motion.h3
                            initial={{ y: '100%' }}
                            whileInView={{ y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
                            className="font-display text-5xl text-white leading-none"
                        >
                            NOTRE<br />VISION
                        </motion.h3>
                    </div>
                </div>
            </motion.div>
        </div>
    </div>
);

/* ─── Séparateur doré orchestré ─────────────────────────────────────── */

const Divider = () => {
    const ref = useRef(null);
    const controls = useAnimation();
    const inView = useInView(ref, { once: true, margin: '-50px' });

    useEffect(() => {
        if (inView) controls.start('visible');
    }, [inView, controls]);

    const diamonds = [
        { size: 'w-2 h-2', delay: 0.4 },
        { size: 'w-1 h-1', delay: 0.5, opacity: 50 },
        { size: 'w-2 h-2', delay: 0.6 },
    ];

    return (
        <div ref={ref} className="w-full bg-black py-6 px-4">
            <div className="container mx-auto flex items-center gap-4">
                <motion.div
                    animate={controls}
                    initial={{ scaleX: 0 }}
                    variants={{ visible: { scaleX: 1, transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 } } }}
                    className="flex-1 h-px bg-gradient-to-r from-transparent to-amber-600/50 origin-right"
                />
                {diamonds.map((d, i) => (
                    <motion.div
                        key={i}
                        animate={controls}
                        initial={{ rotate: 0, scale: 0 }}
                        variants={{
                            visible: {
                                rotate: 45,
                                scale: 1,
                                transition: { type: 'spring', stiffness: 260, damping: 20, delay: d.delay }
                            }
                        }}
                        className={`${d.size} bg-amber-600${d.opacity ? `/${d.opacity}` : ''}`}
                    />
                ))}
                <motion.div
                    animate={controls}
                    initial={{ scaleX: 0 }}
                    variants={{ visible: { scaleX: 1, transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 } } }}
                    className="flex-1 h-px bg-gradient-to-l from-transparent to-amber-600/50 origin-left"
                />
            </div>
        </div>
    );
};

/* ─── Modale Carte ───────────────────────────────────────────────────── */

const MapModal = ({ fij, onClose }) => {
    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = prev; };
    }, []);

    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [onClose]);

    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10"
            style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(8px)' }}
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.88, y: 32 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ type: 'spring', stiffness: 340, damping: 28, mass: 0.8 }}
                className="relative w-full max-w-3xl bg-zinc-900 border border-amber-500/30 shadow-[0_0_80px_rgba(217,119,6,0.15)] overflow-hidden flex flex-col"
                style={{ height: 'min(580px, 88vh)' }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="shrink-0 bg-zinc-950 px-5 py-3.5 flex items-center justify-between border-b border-zinc-800">
                    <div className="flex items-center gap-3">
                        <motion.div
                            animate={{ rotate: [45, 90, 45] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            className="w-2 h-2 bg-amber-500 shrink-0"
                            style={{ rotate: 45 }}
                        />
                        <div>
                            <p className="text-white text-sm font-black tracking-wider uppercase font-display">{fij.nom}</p>
                            <p className="text-gray-600 text-[10px] tracking-[0.25em] uppercase mt-0.5">Localisation · FIJ</p>
                        </div>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-zinc-700 text-gray-500 hover:text-white hover:border-amber-500/50 transition-colors"
                        aria-label="Fermer"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </motion.button>
                </div>

                {/* Accent line animée */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="h-[2px] shrink-0 bg-gradient-to-r from-transparent via-amber-500/60 to-transparent origin-left"
                />

                {/* Map */}
                <div className="grow relative bg-zinc-950 min-h-0">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="absolute inset-0"
                    >
                        <iframe
                            src={fij.mapURL}
                            width="100%"
                            height="100%"
                            style={{ border: 0, position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                            allowFullScreen=""
                            loading="lazy"
                            title={`Carte ${fij.nom}`}
                        />
                    </motion.div>
                </div>

                {/* Footer */}
                <div className="shrink-0 bg-zinc-950 px-5 py-3 border-t border-zinc-800 flex items-center justify-between">
                    <span className="text-gray-600 text-[10px] tracking-widest uppercase font-bold">
                        Mardi · 19h14 → 20h45
                    </span>
                    {fij.phone && (
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={`https://wa.me/${fij.phone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-green-500 hover:text-green-400 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                            Contacter le Berger
                        </motion.a>
                    )}
                </div>
            </motion.div>
        </motion.div>,
        document.body
    );
};

/* ─── Card FIJ — description expandable + boutons toujours accessibles ── */

const FijCard = ({ fij, index, onMapClick }) => {
    const cardRef = useRef(null);
    const [expanded, setExpanded] = useState(false);

    const handleMouseMove = useCallback((e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
        const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
        cardRef.current.style.setProperty('--mx', `${x}%`);
        cardRef.current.style.setProperty('--my', `${y}%`);
    }, []);

    /* Détecte si la description dépasse 3 lignes pour afficher le bouton "Lire plus" */
    const descRef = useRef(null);
    const [isTruncated, setIsTruncated] = useState(false);
    useEffect(() => {
        const el = descRef.current;
        if (!el) return;
        /* scrollHeight > clientHeight quand le texte est tronqué */
        setIsTruncated(el.scrollHeight > el.clientHeight + 2);
    }, [fij.description]);

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            variants={{
                hidden: { opacity: 0, y: 60 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.7, type: 'spring', stiffness: 80, damping: 18 }
                }
            }}
            className="card-root w-full bg-zinc-900 border border-zinc-800 hover:border-amber-500/30 transition-colors duration-300 flex flex-col overflow-hidden relative"
        >
            {/* Couche de lumière mouse-tracking */}
            <div className="card-shine-layer" />

            {/* Image */}
            <div className="relative h-56 overflow-hidden shrink-0">
                <img
                    src={fij.image || '/api/placeholder/400/320'}
                    alt={fij.nom}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent" />
                <div className="absolute top-4 left-4">
                    <span className="bg-amber-500 text-black text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1">FIJ</span>
                </div>
                <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                    className="absolute top-4 right-4 font-display text-4xl text-white/10 leading-none"
                >
                    {String(index + 1).padStart(2, '0')}
                </motion.div>
            </div>

            {/* Corps */}
            <div className="p-6 flex flex-col grow">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: 32 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.08 + 0.2 }}
                    className="h-px bg-amber-500 mb-4"
                />
                <h3 className="font-display text-3xl text-white leading-none mb-3 tracking-wide">{fij.nom}</h3>

                {/* Description avec expand/collapse animé */}
                <div className="relative mb-1">
                    <motion.div
                        animate={{ height: expanded ? 'auto' : undefined }}
                        className="overflow-hidden"
                    >
                        <p
                            ref={descRef}
                            className={`text-gray-400 text-sm leading-relaxed font-light transition-all duration-300 ${expanded ? '' : 'line-clamp-3'}`}
                        >
                            {fij.description}
                        </p>
                    </motion.div>

                    {/* Bouton lire plus / moins — visible seulement si texte tronqué */}
                    {(isTruncated || expanded) && (
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onClick={() => setExpanded(v => !v)}
                            className="mt-2 flex items-center gap-1.5 text-amber-500 hover:text-amber-400 text-[11px] font-bold tracking-[0.15em] uppercase transition-colors"
                        >
                            <motion.svg
                                animate={{ rotate: expanded ? 180 : 0 }}
                                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                                className="w-3.5 h-3.5"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                            </motion.svg>
                            {expanded ? 'Réduire' : 'Lire tout'}
                        </motion.button>
                    )}
                </div>

                {/* Infos rapides — quartier / berger */}
                {(fij.quartier || fij.berger) && (
                    <div className="mt-4 pt-4 border-t border-zinc-800/60 space-y-2">
                        {fij.quartier && (
                            <div className="flex items-center gap-2">
                                <svg className="w-3.5 h-3.5 text-amber-500/70 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="text-gray-500 text-xs">{fij.quartier}</span>
                            </div>
                        )}
                        {fij.berger && (
                            <div className="flex items-center gap-2">
                                <svg className="w-3.5 h-3.5 text-amber-500/70 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span className="text-gray-500 text-xs">{fij.berger}</span>
                            </div>
                        )}
                    </div>
                )}

                {/* Spacer pour pousser les boutons en bas */}
                <div className="grow" />

                {/* ── Boutons d'action — toujours visibles et cliquables ── */}
                <div className="flex gap-3 mt-6 pt-4 border-t border-zinc-800">
                    <motion.button
                        whileHover={{ scale: 1.02, backgroundColor: '#fbbf24' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onMapClick(fij)}
                        className="flex-1 bg-amber-500 text-black text-xs font-black py-3 tracking-[0.15em] uppercase transition-colors flex items-center justify-center gap-2"
                    >
                        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Voir la carte
                    </motion.button>

                    {fij.phone && (
                        <motion.a
                            whileHover={{ scale: 1.05, backgroundColor: '#16a34a', borderColor: '#16a34a' }}
                            whileTap={{ scale: 0.95 }}
                            href={`https://wa.me/${fij.phone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Contacter le Berger"
                            className="bg-zinc-800 border border-zinc-700 text-white px-4 py-3 transition-colors flex items-center justify-center gap-2 text-xs font-bold tracking-wide whitespace-nowrap"
                        >
                            <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                            <span className="hidden sm:inline">Berger</span>
                        </motion.a>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

/* ─── Grille FIJ ─────────────────────────────────────────────────────── */

const FijGrid = () => {
    const [fijData, setFijData] = useState([]);
    const [activeMap, setActiveMap] = useState(null);

    useEffect(() => {
        fetch('/data/fij.json')
            .then(r => r.json())
            .then(d => setFijData(d))
            .catch(e => console.error('Erreur chargement FIJ:', e));
    }, []);

    return (
        <>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.12 } }
                }}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 p-4 max-w-7xl mx-auto font-body"
            >
                {fijData.map((fij, index) => (
                    <FijCard
                        key={index}
                        fij={fij}
                        index={index}
                        onMapClick={setActiveMap}
                    />
                ))}
            </motion.div>

            <AnimatePresence mode="wait">
                {activeMap && (
                    <MapModal fij={activeMap} onClose={() => setActiveMap(null)} />
                )}
            </AnimatePresence>
        </>
    );
};

/* ─── Transition de page ─────────────────────────────────────────────── */

const PageTransition = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
        {children}
    </motion.div>
);

/* ─── Formes décoratives orbitales ──────────────────────────────────── */

const OrbitalShapes = () => (
    <div className="absolute right-0 top-0 h-full w-1/3 pointer-events-none hidden lg:block">
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/4 right-16 w-48 h-48 border border-amber-500/10"
        />
        <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/3 right-24 w-32 h-32 border border-amber-500/10"
        />
        {/* Ligne horizontale pulsée */}
        <motion.div
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 right-8 w-64 h-px bg-gradient-to-l from-transparent to-amber-500/30"
        />
        {/* Point orbital */}
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{ top: '25%', right: '4rem', width: '12rem', height: '12rem', position: 'absolute' }}
        >
            <motion.div
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-1 left-1/2 w-2 h-2 bg-amber-500/40 rounded-full"
            />
        </motion.div>
    </div>
);

/* ─── Page principale ────────────────────────────────────────────────── */

const Fij = () => (
    <section className="bg-black font-body">
        <GlobalStyles />
        <ScrollProgress />

        <PageTransition>
            <div className="min-h-screen">
                {/* Navigation fixe */}
                <div className="fixed top-0 right-0 left-0 z-50">
                    <Nav />
                </div>

                {/* Spacer nav */}
                <div className="h-10 lg:h-32" />

                {/* Hero */}
                <section className="relative min-h-screen flex items-center overflow-hidden hero-grain">
                    <div className="absolute banner-fij inset-0 bg-cover bg-center">
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
                    </div>

                    {/* Ligne verticale gauche */}
                    <motion.div
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="absolute left-4 lg:left-8 top-24 bottom-24 w-px bg-gradient-to-b from-transparent via-amber-600/30 to-transparent origin-top"
                    />

                    {/* Formes orbitales */}
                    <OrbitalShapes />

                    <div className="relative z-10 w-full">
                        <Banner />
                    </div>
                </section>

                {/* À propos */}
                <section id="apropos" className="bg-black">
                    <Aboutfij />
                </section>

                <Divider />

                {/* Liste FIJ */}
                <section id="fij-list" className="py-24 bg-zinc-950">
                    <div className="container mx-auto px-4">
                        <div className="mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 max-w-7xl mx-auto px-4">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: '-50px' }}
                                variants={staggerContainer}
                            >
                                <motion.p
                                    variants={fadeInUp}
                                    className="text-amber-500 tracking-[0.3em] text-xs uppercase font-bold mb-4"
                                >
                                    Communautés locales
                                </motion.p>
                                <div className="overflow-clip">
                                    <motion.h2
                                        variants={{
                                            hidden: { y: '100%', opacity: 0 },
                                            visible: {
                                                y: 0,
                                                opacity: 1,
                                                transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] }
                                            }
                                        }}
                                        className="font-display text-[clamp(2.5rem,8vw,6rem)] text-white leading-none"
                                    >
                                        REJOINS<br />UNE FIJ
                                    </motion.h2>
                                </div>
                            </motion.div>
                            <motion.p
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                                className="text-gray-400 text-lg font-light max-w-sm leading-relaxed lg:text-right"
                            >
                                Trouve la communauté la plus proche de chez toi et rejoins un mouvement qui transforme la jeunesse.
                            </motion.p>
                        </div>
                        <FijGrid />
                    </div>
                </section>

                <Divider />

                {/* Contact */}
                <section id="contact" className="py-32 bg-zinc-950">
                    <Contact verset={{
                        verset: 'Voici, oh ! qu\'il est agréable, qu\'il est doux pour des frères de demeurer ensemble !',
                        ref: 'Psaume 133:1'
                    }} />
                </section>

                <Footer />
            </div>
        </PageTransition>
    </section>
);

export default Fij;