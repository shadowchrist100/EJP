import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import HeroCanvas from '../../fx/HeroCanvas';
import { logo, fij1, fij2, fij3, fij4 } from '../../../assets';

// All existing hero photos kept. fij1 is the LCP image (eager); the WebGL scene takes over once ready.
const IMAGES = [fij1, fij2, fij3, fij4];
const SLIDE_MS = 7000;
const EASE = [0.16, 1, 0.3, 1];
const fmt = (n) => String(n).padStart(2, '0');

// Floating 3D photo cards around the title (desktop). depth = parallax strength.
const CARDS = [
    { src: fij2, x: '6%',  y: '18%', w: 190, rot: -8, depth: 1.6, label: 'Louange' },
    { src: fij3, x: '78%', y: '14%', w: 220, rot: 7,  depth: 1.1, label: 'Jeunesse' },
    { src: fij4, x: '72%', y: '62%', w: 170, rot: -5, depth: 2.0, label: 'Famille' },
    { src: fij1, x: '9%',  y: '64%', w: 150, rot: 9,  depth: 1.3, label: 'Culte' },
];

const RIBBON = 'Église Jeunes Prodiges · Porto-Novo · Par les jeunes, pour les jeunes · Dimanche 15h29 · ';

/* ── Letter-by-letter kinetic title ─────────────────────────────── */
const KineticWord = ({ text, delay = 0, className = '', letterClass = '' }) => (
    <span className={`kinetic ${className}`} aria-hidden="true">
        {[...text].map((ch, i) => (
            <motion.span
                key={i}
                className={`kinetic-letter ${letterClass}`}
                initial={{ opacity: 0, y: 120, rotateX: -90, scale: 0.6, filter: 'blur(14px)' }}
                animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.1, ease: EASE, delay: delay + i * 0.06 }}
            >
                {ch === ' ' ? ' ' : ch}
            </motion.span>
        ))}
    </span>
);

/* ── Intro curtain ──────────────────────────────────────────────── */
const Curtain = ({ onDone }) => (
    <motion.div className="hero-curtain" initial="closed" animate="open" aria-hidden="true" onAnimationComplete={onDone}>
        <motion.div className="hero-curtain-half top" variants={{ closed: { y: '0%' }, open: { y: '-100%' } }} transition={{ duration: 1.1, ease: EASE, delay: 1.1 }} />
        <motion.div className="hero-curtain-half bottom" variants={{ closed: { y: '0%' }, open: { y: '100%' } }} transition={{ duration: 1.1, ease: EASE, delay: 1.1 }} />
        <motion.div className="hero-curtain-line" initial={{ scaleX: 0 }} animate={{ scaleX: [0, 1, 1], opacity: [1, 1, 0] }} transition={{ duration: 1.5, times: [0, 0.6, 1], ease: 'easeInOut' }} />
        <motion.span className="hero-curtain-word" initial={{ opacity: 0, letterSpacing: '0.6em' }} animate={{ opacity: [0, 1, 1, 0], letterSpacing: ['0.6em', '0.3em', '0.3em', '0.1em'] }} transition={{ duration: 1.4, times: [0, 0.3, 0.7, 1] }}>
            EJP · PORTO-NOVO
        </motion.span>
    </motion.div>
);

const Banner = () => {
    const [current, setCurrent] = useState(0);
    const [introDone, setIntroDone] = useState(false);
    const sectionRef = useRef(null);
    const reduce = useReducedMotion();

    useEffect(() => {
        const id = setTimeout(() => setCurrent(p => (p + 1) % IMAGES.length), SLIDE_MS);
        return () => clearTimeout(id);
    }, [current]);

    // Cursor → parallax values (-1..1), springy
    const mx = useSpring(0, { stiffness: 50, damping: 18 });
    const my = useSpring(0, { stiffness: 50, damping: 18 });
    const [spot, setSpot] = useState({ x: 50, y: 50 });
    useEffect(() => {
        if (reduce) return undefined;
        const onMove = (e) => {
            if (e.pointerType !== 'mouse') return;
            mx.set((e.clientX / window.innerWidth) * 2 - 1);
            my.set((e.clientY / window.innerHeight) * 2 - 1);
            setSpot({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 });
        };
        window.addEventListener('pointermove', onMove, { passive: true });
        return () => window.removeEventListener('pointermove', onMove);
    }, [mx, my, reduce]);

    // Scroll-out: title lifts, splits and fades; cards drift away
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
    const titleY = useTransform(scrollYProgress, [0, 1], [0, -220]);
    const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
    const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
    const cardsY = useTransform(scrollYProgress, [0, 1], [0, 320]);
    const titleRotateX = useTransform(my, [-1, 1], [6, -6]);
    const titleRotateY = useTransform(mx, [-1, 1], [-8, 8]);

    const t0 = reduce ? 0 : 2.0; // text starts after the curtain opens

    return (
        <section
            ref={sectionRef}
            className="hero relative grain-overlay"
            aria-label="Bannière principale"
        >
            {/* LCP / no-WebGL fallback photo */}
            <img src={IMAGES[0]} alt="" width={1920} height={1080} loading="eager" fetchPriority="high" decoding="sync" className="hero-fallback" aria-hidden="true" />

            {/* WebGL: liquid photo + burn transitions + gold dust */}
            <HeroCanvas images={IMAGES} current={current} scrollProgress={scrollYProgress} />

            {/* Cursor spotlight (screen blend) + bottom fade */}
            {!reduce && <div className="hero-spot" style={{ '--sx': `${spot.x}%`, '--sy': `${spot.y}%` }} aria-hidden="true" />}
            <div className="hero-fade" aria-hidden="true" />

            {/* Floating 3D photo cards (desktop) */}
            <motion.div className="hero-cards hidden lg:block" style={{ y: cardsY }} aria-hidden="true">
                {CARDS.map((c, i) => (
                    <FloatingCard key={i} card={c} index={i} mx={mx} my={my} delay={t0 + 0.9 + i * 0.15} active={introDone} />
                ))}
            </motion.div>

            {/* Content */}
            <motion.div className="hero-content" style={{ y: titleY, scale: titleScale, opacity: titleOpacity }}>
                <motion.div
                    className="hero-logo-wrap"
                    initial={{ opacity: 0, scale: 0.4, rotate: -40 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1.2, ease: EASE, delay: t0 }}
                >
                    <span className="halo-ring" aria-hidden="true" />
                    <span className="halo-ring halo-ring--2" aria-hidden="true" />
                    <img src={logo} alt="Logo EJP Porto-Novo" width={84} height={84} loading="eager" className="hero-logo" />
                </motion.div>

                <motion.p className="t-eyebrow hero-eyebrow" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: t0 + 0.3 }}>
                    <span className="hero-eyebrow-line" aria-hidden="true" />
                    Porto-Novo · Bénin
                    <span className="hero-eyebrow-line" aria-hidden="true" />
                </motion.p>

                <motion.h1 className="hero-title" style={{ rotateX: titleRotateX, rotateY: titleRotateY, transformPerspective: 1200 }}>
                    <span className="sr-only">Église Jeunes Prodiges — Par les jeunes, pour les jeunes</span>
                    <span className="hero-title-line">
                        <KineticWord text="Église" delay={t0 + 0.35} />
                        <span className="hero-title-gap" aria-hidden="true"> </span>
                        <KineticWord text="Jeunes" delay={t0 + 0.7} />
                    </span>
                    <motion.span className="hero-tagline" initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.9, ease: EASE, delay: t0 + 1.3 }} aria-hidden="true">
                        Par les jeunes <span className="hero-tagline-sep">|</span> Pour les jeunes
                    </motion.span>
                    <span className="hero-title-line hero-title-gold">
                        <KineticWord text="Prodiges" delay={t0 + 1.1} letterClass="shimmer-gold" />
                        <motion.span className="hero-title-burst" initial={{ opacity: 0, scale: 0.2 }} animate={{ opacity: [0, 1, 0], scale: [0.2, 1.6, 2.2] }} transition={{ duration: 1.6, delay: t0 + 1.5, ease: 'easeOut' }} aria-hidden="true" />
                    </span>
                </motion.h1>

                <motion.div className="hero-ctas" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: t0 + 1.8 }}>
                    <Link to="/register" className="btn-primary btn-glow btn-magnetic">
                        <span>Rejoins-nous</span>
                    </Link>
                    <Link to="/dons" className="btn-ghost btn-glass btn-magnetic">
                        <span>Faire un don</span>
                    </Link>
                </motion.div>
            </motion.div>

            {/* Slide counter + indicators (accessible tabs) */}
            <motion.div className="hero-slider-ui" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: t0 + 2.2 }}>
                <span className="hero-counter" aria-hidden="true">
                    <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span key={current} initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }} transition={{ duration: 0.4 }} style={{ display: 'inline-block', color: 'var(--color-amber-light)' }}>
                            {fmt(current + 1)}
                        </motion.span>
                    </AnimatePresence>
                    <span> / {fmt(IMAGES.length)}</span>
                </span>
                <div style={{ display: 'flex', gap: '8px' }} role="tablist" aria-label="Diaporama de photos">
                    {IMAGES.map((_, i) => (
                        <button key={i} role="tab" aria-selected={i === current} aria-label={`Photo ${i + 1} sur ${IMAGES.length}`} onClick={() => setCurrent(i)} className="hero-dot" style={{ width: i === current ? '48px' : '14px' }}>
                            {i === current && <span key={current} className="hero-dot-fill" style={{ animationDuration: `${SLIDE_MS}ms` }} />}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Scroll cue */}
            <motion.div className="hero-scroll-cue" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: t0 + 2.2 }} aria-hidden="true">
                <span>Défiler</span>
                <div className="scroll-cue-line" />
            </motion.div>

            {/* Infinite ribbon */}
            <motion.div className="hero-ribbon" initial={{ y: 60 }} animate={{ y: 0 }} transition={{ duration: 1, ease: EASE, delay: t0 + 2 }} aria-hidden="true">
                <div className="hero-ribbon-track">
                    <span>{RIBBON}{RIBBON}</span>
                    <span>{RIBBON}{RIBBON}</span>
                </div>
            </motion.div>

            {/* Intro curtain */}
            {!reduce && !introDone && <Curtain onDone={() => setIntroDone(true)} />}
        </section>
    );
};

const FloatingCard = ({ card, index, mx, my, delay, active }) => {
    const x = useTransform(mx, [-1, 1], [-30 * card.depth, 30 * card.depth]);
    const y = useTransform(my, [-1, 1], [-20 * card.depth, 20 * card.depth]);
    const rotateY = useTransform(mx, [-1, 1], [-12, 12]);
    const rotateX = useTransform(my, [-1, 1], [10, -10]);
    return (
        <motion.div
            className="hero-card-anchor"
            style={{ left: card.x, top: card.y, x, y }}
            initial={{ opacity: 0, scale: 0.4, y: 140, rotate: card.rot * 3 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: card.rot }}
            transition={{ duration: 1.4, ease: EASE, delay }}
        >
            <motion.div
                className="hero-card gold-border"
                style={{ width: card.w, rotateX, rotateY, transformPerspective: 900 }}
                animate={active ? { y: [0, -14, 0] } : {}}
                transition={{ duration: 5 + index, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.12, zIndex: 5 }}
            >
                <img src={card.src} alt="" loading="lazy" decoding="async" />
                <span className="hero-card-label">{card.label}</span>
                <span className="hero-card-shine" />
            </motion.div>
        </motion.div>
    );
};

export default Banner;
