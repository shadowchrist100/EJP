import { Nav, Footer, Contact } from '../'
import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
    motion,
    AnimatePresence,
    useScroll,
    useAnimation,
    useInView,
    useSpring,
} from 'framer-motion';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GoldParticles from '../fx/GoldParticles';
import TiltCard from '../fx/TiltCard';
import ScrollMarquee from '../fx/ScrollMarquee';
import useScrollReveal from '../fx/useScrollReveal';
import fijHero1 from '../../assets/images/fij1.jpeg';
import fijHero2 from '../../assets/images/fij2.jpeg';
import fijHero3 from '../../assets/images/fij3.jpeg';
import fijHero4 from '../../assets/images/fij4.jpeg';
import fijHero5 from '../../assets/images/fij5.jpeg';
import { useNearestFij } from '../../hooks/useNearestFij';
import { useContentApi } from '../../hooks/useContentApi';
import ContentManager from '../admin/ContentManager';
import { fijFields, fijColumns } from '../../util/contentConfigs';

gsap.registerPlugin(SplitText, ScrollTrigger);

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

        /* Blink animation for "Ma position" button */
        @keyframes blink-pulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.5); }
            50% { box-shadow: 0 0 0 8px rgba(245, 158, 11, 0); }
        }
        .btn-blink {
            animation: blink-pulse 1.5s ease-in-out infinite;
        }

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

/* ─── Barre de progression scroll ──────────────────────────────────── */

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 30, restDelta: 0.001 });
    return <motion.div className="scroll-progress" style={{ scaleX }} />;
};

/* ─── Hero : typographie cinétique + particules accélérées ──────────── */

// Photos du diaporama d'origine de la bannière FIJ (fij1 → fij5), restaurées.
const HERO_PHOTOS = [fijHero1, fijHero2, fijHero3, fijHero4, fijHero5];
const HERO_SLIDE_MS = 5000;

const FijHero = () => {
    const ref = useRef(null);
    const [slide, setSlide] = useState(0);
    const compact = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;

    useEffect(() => {
        const id = setInterval(() => setSlide((s) => (s + 1) % HERO_PHOTOS.length), HERO_SLIDE_MS);
        return () => clearInterval(id);
    }, []);

    useLayoutEffect(() => {
        const root = ref.current;
        const mm = gsap.matchMedia();
        const ctx = gsap.context(() => {
            mm.add('(prefers-reduced-motion: no-preference)', () => {
                const lines = gsap.utils.toArray('.fij-line');
                const splits = lines.map((l) => SplitText.create(l, { type: 'chars', mask: 'chars' }));

                const tl = gsap.timeline({ delay: 0.25, defaults: { ease: 'expo.out' } });
                tl.fromTo('.fij-hero-photos', { scale: 1.35, opacity: 0 }, { scale: 1, opacity: 1, duration: 2.4, ease: 'power3.out' }, 0)
                    .fromTo('.fij-tag-line', { scaleX: 0 }, { scaleX: 1, duration: 1.2 }, 0.2)
                    .fromTo('.fij-tag-text', { opacity: 0, letterSpacing: '1.1em' }, { opacity: 1, letterSpacing: '0.3em', duration: 1.6 }, 0.2);
                splits.forEach((s, i) => {
                    tl.from(s.chars, {
                        yPercent: i === 1 ? -130 : 130,
                        rotateX: i === 1 ? 100 : -100,
                        scale: 1.6,
                        duration: 1.3,
                        stagger: { each: 0.04, from: i === 1 ? 'center' : 'start' },
                    }, 0.35 + i * 0.22);
                });
                tl.fromTo('.fij-sub', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, clearProps: 'transform,opacity' }, 1.1)
                    .fromTo('.fij-ctas', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, clearProps: 'transform,opacity' }, 1.25)
                    .fromTo('.fij-scroll', { opacity: 0 }, { opacity: 0.7, duration: 1 }, 1.8);

                // Scroll: the three lines slide apart in opposite directions (kinetic type)
                gsap.timeline({ scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 0.5 } })
                    .to(lines[0], { xPercent: -24, ease: 'none' }, 0)
                    .to(lines[1], { xPercent: 26, ease: 'none' }, 0)
                    .to(lines[2], { xPercent: -14, scale: 1.12, ease: 'none' }, 0)
                    .to('.fij-hero-bg', { yPercent: 16, scale: 1.12, ease: 'none' }, 0)
                    .to('.fij-sub, .fij-ctas', { y: -60, opacity: 0, ease: 'none' }, 0);

                // Cursor: each line floats at its own depth
                const movers = lines.map((el, i) => ({
                    d: [1, -1.6, 2.2][i],
                    x: gsap.quickTo(el, 'x', { duration: 1, ease: 'power3.out' }),
                    y: gsap.quickTo(el, 'y', { duration: 1, ease: 'power3.out' }),
                }));
                const onMove = (e) => {
                    const nx = (e.clientX / window.innerWidth) * 2 - 1;
                    const ny = (e.clientY / window.innerHeight) * 2 - 1;
                    movers.forEach((m) => { m.x(nx * 18 * m.d); m.y(ny * 8 * m.d); });
                };
                window.addEventListener('pointermove', onMove, { passive: true });
                return () => window.removeEventListener('pointermove', onMove);
            });
        }, root);
        return () => { mm.revert(); ctx.revert(); };
    }, []);

    return (
        <section ref={ref} className="fij-hero hero-grain">
            <div className="fij-hero-bg" aria-hidden="true">
                <div className="fij-hero-photos">
                    {HERO_PHOTOS.map((src, i) => (
                        <img
                            key={src}
                            src={src}
                            alt=""
                            className={`fij-hero-photo ${i === slide ? 'is-active' : ''}`}
                            loading={i === 0 ? 'eager' : 'lazy'}
                            decoding="async"
                        />
                    ))}
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
            </div>

            <GoldParticles count={compact ? 600 : 1600} variant="rise" speed={2.8} />
            <span className="fij-hero-flare" aria-hidden="true" />

            {/* Ligne verticale gauche */}
            <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute left-4 lg:left-8 top-24 bottom-24 w-px bg-gradient-to-b from-transparent via-amber-600/30 to-transparent origin-top"
            />

            <OrbitalShapes />

            <div className="relative z-10 w-full max-w-6xl mx-auto px-6 font-body">
                <div className="mb-8 flex items-center gap-3">
                    <span className="fij-tag-line w-8 h-px bg-amber-500 origin-left inline-block" />
                    <span className="fij-tag-text text-amber-400 tracking-[0.3em] text-xs uppercase font-bold">
                        Église des Jeunes Prodiges
                    </span>
                    <span className="fij-tag-line w-8 h-px bg-amber-500 origin-right inline-block" />
                </div>

                <h1 className="fij-title mb-6" aria-label="Les Familles d'Impact Jeunes">
                    <span className="fij-line font-display text-white" aria-hidden="true">LES FAMILLES</span>
                    <span className="fij-line font-display text-stroke" aria-hidden="true">D'IMPACT</span>
                    <span className="fij-line font-display text-amber-400" aria-hidden="true">JEUNES</span>
                </h1>

                <p className="fij-sub text-gray-300 text-lg leading-relaxed font-light mb-12 max-w-xl">
                    Découvre les cellules vivantes de l'EJP — des communautés de jeunes qui transforment
                    leurs quartiers et leurs villes pour Christ.
                </p>

                <div className="fij-ctas flex items-center gap-6">
                    <motion.a
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        href="#fij-list"
                        className="group relative overflow-hidden bg-amber-500 text-black px-10 py-4 font-bold text-sm tracking-[0.15em] uppercase btn-glow"
                    >
                        <motion.span
                            className="absolute inset-0 bg-amber-400 -translate-x-full skew-x-[-15deg]"
                            whileHover={{ translateX: '0%' }}
                            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
                        />
                        <span className="relative z-10 flex items-center gap-3">
                            Trouver ma FIJ
                            <svg className="w-4 h-4 btn-arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                </div>
            </div>

            {/* Indicateur scroll animé */}
            <div className="fij-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
                <span className="text-gray-500 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
                <div className="w-px h-12 overflow-hidden">
                    <motion.div
                        className="w-full bg-gradient-to-b from-gray-500 to-transparent"
                        animate={{ height: ['0%', '100%', '0%'], y: ['0%', '0%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        style={{ height: '100%' }}
                    />
                </div>
            </div>
        </section>
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
            <h2 data-reveal="chars" className="font-display text-[clamp(2.5rem,7vw,5rem)] text-white leading-none mb-8">
                C'EST QUOI UNE FIJ ?
            </h2>
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
            <div
                data-reveal="mask"
                className="fij-about-media relative h-[480px] overflow-hidden group bg-black"
            >
                <div className="absolute inset-0" data-reveal-media>
                    <div className="absolute -inset-y-[12%] inset-x-0" data-parallax="8">
                        <div className="absolute inset-0 bg-center bg-cover transition-transform duration-700 group-hover:scale-105"
                            style={{ backgroundImage: 'url("/images/fij6.jpeg")' }} />
                    </div>
                </div>
                <div className="fij-about-glow" aria-hidden="true" />
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
            </div>

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
            <div
                data-reveal="mask"
                className="fij-about-media relative h-[480px] overflow-hidden group bg-black order-1 lg:order-none"
            >
                <div className="absolute inset-0" data-reveal-media>
                    <div className="absolute -inset-y-[12%] inset-x-0" data-parallax="8">
                        <div className="absolute inset-0 bg-center bg-cover transition-transform duration-700 group-hover:scale-105"
                            style={{ backgroundImage: 'url("/images/fij3.jpeg")' }} />
                    </div>
                </div>
                <div className="fij-about-glow" aria-hidden="true" />
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
            </div>
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

const MapModal = ({ fij, origin, onClose }) => {
    // L'ouverture part du bouton cliqué : cercle de lumière qui s'étend (clip-path).
    const at = `${origin?.x ?? window.innerWidth / 2}px ${origin?.y ?? window.innerHeight / 2}px`;

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
            initial={{ clipPath: `circle(0px at ${at})` }}
            animate={{ clipPath: `circle(150vmax at ${at})`, transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] } }}
            exit={{ clipPath: `circle(0px at ${at})`, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.1 } }}
            className="fij-modal-backdrop fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 60, rotateX: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0, transition: { type: 'spring', stiffness: 220, damping: 24, mass: 0.9, delay: 0.25 } }}
                exit={{ opacity: 0, scale: 0.92, y: 20, transition: { duration: 0.25 } }}
                className="relative w-full max-w-3xl glass-gold gold-border fij-modal-panel overflow-hidden flex flex-col"
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
                    {fij.mapURL ? (
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
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 gap-4">
                            <svg className="w-12 h-12 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                            <p className="text-sm text-zinc-600">Carte non disponible pour cette FIJ</p>
                            <p className="text-xs text-zinc-700">Contacte le berger pour plus d'informations</p>
                        </div>
                    )}
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
                            href={`https://wa.me/229${fij.phone.split('/')[0].replace(/\s+/g, '').replace(/^0+/, '')}`}
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

/* ─── Card FIJ — verre dépoli, tilt 3D, description dépliable fluide ─── */

const FijCard = ({ fij, index, onMapClick }) => {
    const [expanded, setExpanded] = useState(false);

    /* Mesure la description : 3 lignes repliée, hauteur réelle dépliée (transition fluide) */
    const descRef = useRef(null);
    const [heights, setHeights] = useState({ collapsed: 0, full: 0 });
    useLayoutEffect(() => {
        const el = descRef.current;
        if (!el) return undefined;
        const measure = () => {
            const lh = parseFloat(getComputedStyle(el).lineHeight) || 22;
            setHeights({ collapsed: Math.round(lh * 3), full: el.scrollHeight });
        };
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(el);
        return () => ro.disconnect();
    }, [fij.description]);
    const isTruncated = heights.full > heights.collapsed + 2;
    const descHeight = !heights.full ? 'auto' : (expanded || !isTruncated ? heights.full : heights.collapsed);

    return (
        <TiltCard
            max={7}
            variants={{
                hidden: { opacity: 0, y: 60 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.7, type: 'spring', stiffness: 80, damping: 18 }
                }
            }}
            className="card-root fij-card glass-gold gold-border w-full flex flex-col overflow-hidden"
        >
            {/* Couche de lumière mouse-tracking */}
            <div className="card-shine-layer" />

            {/* Image */}
            <div className="relative h-56 overflow-hidden shrink-0">
                <img
                    src={fij.image || '/api/placeholder/400/320'}
                    alt={fij.nom}
                    loading="lazy"
                    decoding="async"
                    className="fij-card-img w-full h-full object-cover"
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
                        className="fij-desc-wrap"
                        initial={false}
                        animate={{ height: descHeight }}
                        transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
                        data-collapsed={isTruncated && !expanded}
                    >
                        <p
                            ref={descRef}
                            className="text-gray-400 text-sm leading-relaxed font-light"
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

                {/* Infos rapides — lieu / berger */}
                {(fij.lieu || fij.Bergers) && (
                    <div className="mt-4 pt-4 border-t border-zinc-800/60 space-y-2">
                        {fij.lieu && (
                            <div className="flex items-center gap-2">
                                <svg className="w-3.5 h-3.5 text-amber-500/70 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="text-gray-500 text-xs">{fij.lieu}</span>
                            </div>
                        )}
                        {fij.Bergers && fij.Bergers.length > 0 && (
                            <div className="flex items-center gap-2">
                                <svg className="w-3.5 h-3.5 text-amber-500/70 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span className="text-gray-500 text-xs">{fij.Bergers.join(', ')}</span>
                            </div>
                        )}
                        {fij.distance !== undefined && fij.distance !== Infinity && (
                            <div className="flex items-center gap-2">
                                <svg className="w-3.5 h-3.5 text-amber-500/70 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                                <span className="text-amber-400 font-bold text-xs">À {fij.distance.toFixed(1)} km</span>
                            </div>
                        )}
                    </div>
                )}

                {/* Spacer pour pousser les boutons en bas */}
                <div className="grow" />

                {/* ── Boutons d'action — toujours visibles et cliquables ── */}
                <div className="flex gap-3 mt-6 pt-4 border-t border-zinc-800">
                    <motion.button
                        whileHover={fij.mapURL ? { scale: 1.02, backgroundColor: '#fbbf24' } : {}}
                        whileTap={fij.mapURL ? { scale: 0.95 } : {}}
                        onClick={(e) => fij.mapURL && onMapClick(fij, e)}
                        disabled={!fij.mapURL}
                        className={`flex-1 text-xs font-black py-3 tracking-[0.15em] uppercase transition-colors flex items-center justify-center gap-2 ${
                            fij.mapURL
                                ? 'bg-amber-500 text-black hover:bg-amber-400 cursor-pointer'
                                : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                        }`}
                    >
                        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {fij.mapURL ? 'Voir la carte' : 'Non disponible'}
                    </motion.button>

                    {fij.phone && (
                        <motion.a
                            whileHover={{ scale: 1.05, backgroundColor: '#16a34a', borderColor: '#16a34a' }}
                            whileTap={{ scale: 0.95 }}
                            href={`https://wa.me/229${fij.phone.split('/')[0].replace(/\s+/g, '').replace(/^0+/, '')}`}
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
        </TiltCard>
    );
};

/* ─── Grille FIJ ─────────────────────────────────────────────────────── */

const FijGrid = () => {
    const [fijData, setFijData] = useState([]);
    const [activeMap, setActiveMap] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Repli : données statiques locales
    const [staticFij, setStaticFij] = useState([]);
    useEffect(() => {
        fetch('/data/fij.json')
            .then(r => r.json())
            .then(d => setStaticFij(d))
            .catch(e => console.error('Erreur chargement FIJ:', e));
    }, []);

    // Source principale : API (si elle contient des données)
    const {
        data: apiFij,
        raw: rawFij,
        refresh: refreshFij,
    } = useContentApi('/fijs', [], (items) => items);

    useEffect(() => {
        if (apiFij.length > 0) {
            setFijData(apiFij);
        } else if (staticFij.length > 0) {
            setFijData(staticFij);
        }
    }, [apiFij, staticFij]);

    const { sortedFijs, isLocating, locationError, findNearest, resetFijs } = useNearestFij(fijData);

    const normalize = (str) => {
        if (!str) return '';
        return String(str).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
    };

    const filteredFijs = sortedFijs.filter(fij => {
        const trimmed = searchQuery.trim();
        if (!trimmed) return true;
        const queryTokens = normalize(trimmed).split(' ').filter(Boolean);
        
        return queryTokens.every(query => {
            const nomMatch = fij.nom && normalize(fij.nom).includes(query);
            const lieuMatch = fij.lieu && normalize(fij.lieu).includes(query);
            const quartierMatch = fij.quartier_proches && fij.quartier_proches.some(q => normalize(q).includes(query));
            return nomMatch || lieuMatch || quartierMatch;
        });
    });

    const dataLoaded = fijData.length > 0;
    const hasDistances = sortedFijs.length > 0 && sortedFijs[0].distance !== undefined;
    const isFiltered = searchQuery.trim() !== '' || hasDistances;

    // Mémorise le point de clic pour l'ouverture cinématique de la carte
    const openMap = (fij, e) => {
        const fromKeyboard = !e || (e.clientX === 0 && e.clientY === 0);
        setActiveMap({ fij, x: fromKeyboard ? undefined : e.clientX, y: fromKeyboard ? undefined : e.clientY });
    };

    const handleReset = () => {
        setSearchQuery('');
        resetFijs();
    };

    return (
        <>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8 font-body max-w-4xl mx-auto">
                <div className="relative w-full md:w-1/2">
                    <input 
                        type="text" 
                        placeholder="Rechercher par quartier proche (ex: Tokpota, Ouando...)" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="fij-search w-full text-white px-4 py-3 focus:outline-none text-sm"
                    />
                    {searchQuery && (
                        <button 
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-3 text-gray-500 hover:text-white transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                    {!searchQuery && (
                        <svg className="w-5 h-5 absolute right-3 top-3 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    )}
                </div>
                
                <span className="text-gray-500 uppercase text-xs font-bold tracking-widest hidden md:inline">OU</span>

                <motion.button
                    whileHover={!dataLoaded ? {} : { scale: 1.02 }}
                    whileTap={!dataLoaded ? {} : { scale: 0.98 }}
                    onClick={findNearest}
                    disabled={isLocating || !dataLoaded}
                    className={`flex items-center justify-center gap-2 px-6 py-3 font-bold tracking-widest text-xs uppercase border transition-colors w-full md:w-auto ${
                        isLocating || !dataLoaded
                            ? 'bg-zinc-800 text-gray-400 border-zinc-700 cursor-not-allowed' 
                            : 'bg-amber-500/10 text-amber-500 border-amber-500/30 hover:bg-amber-500 hover:text-black btn-blink'
                    }`}
                >
                    <svg className={`w-4 h-4 shrink-0 ${isLocating ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {isLocating ? 'Recherche en cours...' : 'Ma position'}
                </motion.button>
            </div>
            
            {isFiltered && (
                <div className="flex justify-center mb-12">
                    <button 
                        onClick={handleReset}
                        className="text-amber-500 hover:text-white text-xs tracking-widest uppercase font-bold transition-colors flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Réinitialiser les filtres
                    </button>
                </div>
            )}
            
            {locationError && (
                <div className="flex justify-center mb-8">
                    <p className="text-red-400 text-xs tracking-wide uppercase font-body">{locationError}</p>
                </div>
            )}

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
                {filteredFijs.length > 0 ? (
                    filteredFijs.map((fij, index) => (
                        <FijCard
                            key={index}
                            fij={fij}
                            index={index}
                            onMapClick={openMap}
                        />
                    ))
                ) : (
                    <div className="col-span-1 sm:col-span-2 xl:col-span-3 text-center py-12">
                        <p className="text-gray-400 text-sm font-light">Aucune FIJ ne correspond à votre recherche.</p>
                    </div>
                )}
            </motion.div>

            <AnimatePresence mode="wait">
                {activeMap && (
                    <MapModal fij={activeMap.fij} origin={activeMap} onClose={() => setActiveMap(null)} />
                )}
            </AnimatePresence>

            {/* Panneau d'administration des FIJ */}
            <ContentManager
                title="FIJ"
                singular="une FIJ"
                subtitle="Modifiez les informations d'une FIJ ou ajoutez-en une nouvelle."
                items={rawFij}
                onRefresh={refreshFij}
                apiPath="/admin/fijs"
                fields={fijFields}
                columns={fijColumns}
            />
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

const Fij = () => {
    const pageRef = useRef(null);
    useScrollReveal(pageRef);

    return (
    <section ref={pageRef} className="fij-page bg-black font-body">
        <GlobalStyles />
        <ScrollProgress />

        <PageTransition>
            <div className="min-h-screen">
                {/* Navigation fixe */}
                <div className="fixed top-0 right-0 left-0 z-50">
                    <Nav />
                </div>

                {/* Hero */}
                <FijHero />

                {/* À propos */}
                <section id="apropos" className="bg-black">
                    <Aboutfij />
                </section>

                <Divider />

                {/* Liste FIJ */}
                <section id="fij-list" className="relative py-24 bg-zinc-950 overflow-hidden">
                    <ScrollMarquee text="Familles d'Impact" from="0%" to="-40%" style={{ top: '2rem' }} />
                    <div className="container mx-auto px-4 relative z-10">
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
                                <h2 data-reveal="chars" className="font-display text-[clamp(2.5rem,8vw,6rem)] text-white leading-none">
                                    REJOINS<br />UNE FIJ
                                </h2>
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
};

export default Fij;