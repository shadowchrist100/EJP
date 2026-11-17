import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, LayoutGroup, useScroll, useSpring, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Grid3X3, LayoutList } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { Nav, Footer } from '../';
import ContentManager from '../admin/ContentManager';
import { useContentApi } from '../../hooks/useContentApi';
import { galleryFields, galleryColumns, galleryMapper } from '../../util/contentConfigs';
import GoldParticles from '../fx/GoldParticles';
import TiltCard from '../fx/TiltCard';

gsap.registerPlugin(ScrollTrigger, SplitText);

const EXPO = [0.16, 1, 0.3, 1];
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ─── COLONNES RESPONSIVES ─────────────────────────────────────────────────── */

const columnCount = () => {
    if (window.matchMedia('(min-width: 1024px)').matches) return 3;
    if (window.matchMedia('(min-width: 640px)').matches) return 2;
    return 1;
};

const useColumnCount = () => {
    const [cols, setCols] = useState(columnCount);
    useEffect(() => {
        const queries = ['(min-width: 1024px)', '(min-width: 640px)'].map((q) => window.matchMedia(q));
        const onChange = () => setCols(columnCount());
        queries.forEach((mq) => mq.addEventListener('change', onChange));
        return () => queries.forEach((mq) => mq.removeEventListener('change', onChange));
    }, []);
    return cols;
};

/* ─── LIGHTBOX CINÉMATIQUE ─────────────────────────────────────────────────── */

const cardMedia = (id) => document.querySelector(`[data-gid="${CSS.escape(String(id))}"] .gal-media`);

/**
 * Transform + clip that make `frame` (the full, uncropped photo) sit exactly on top of the
 * cropped card thumbnail: uniform "cover" scale, centred, clipped to the card's box.
 * Returns null when the card is not visible (we then simply fade).
 */
const morphFromCard = (frame, source) => {
    if (!frame || !source) return null;
    const T = frame.getBoundingClientRect();
    const S = source.getBoundingClientRect();
    if (!T.width || !T.height || S.bottom < 0 || S.top > window.innerHeight) return null;
    const s = Math.max(S.width / T.width, S.height / T.height);
    const ih = Math.max(0, (T.width - S.width / s) / 2);
    const iv = Math.max(0, (T.height - S.height / s) / 2);
    return {
        x: S.left + S.width / 2 - (T.left + T.width / 2),
        y: S.top + S.height / 2 - (T.top + T.height / 2),
        scale: s,
        clipPath: `inset(${iv}px ${ih}px ${iv}px ${ih}px round ${24 / s}px)`,
    };
};

const FRAME_REST = { x: 0, y: 0, scale: 1, clipPath: 'inset(0px 0px 0px 0px round 16px)' };

const slide = {
    enter: (dir) => ({ x: dir === 'next' ? '35%' : '-35%', rotateY: dir === 'next' ? -18 : 18, scale: 0.9, opacity: 0, filter: 'blur(14px)' }),
    center: { x: 0, rotateY: 0, scale: 1, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.75, ease: EXPO } },
    exit: (dir) => ({ x: dir === 'next' ? '-35%' : '35%', rotateY: dir === 'next' ? 18 : -18, scale: 0.9, opacity: 0, filter: 'blur(14px)', transition: { duration: 0.4, ease: [0.7, 0, 0.84, 0] } }),
};

const Lightbox = ({ image, images, direction, onClose, onPrev, onNext, onSelect }) => {
    const currentIndex = images.findIndex(img => img.id === image.id);
    const rootRef = useRef(null);
    const frameRef = useRef(null);
    const closingRef = useRef(false);
    const openedRef = useRef(false);

    /* Ouverture : la vignette s'envole et devient la photo plein écran */
    useLayoutEffect(() => {
        const root = rootRef.current;
        const frame = frameRef.current;
        const html = document.documentElement;
        const prevOverflow = html.style.overflow;
        html.style.overflow = 'hidden';

        const img = frame.querySelector('img');
        const ready = img && !img.complete ? img.decode().catch(() => {}) : Promise.resolve();
        let tl;
        let cancelled = false; // StrictMode re-runs this effect: only the live run may animate
        gsap.set(frame, { autoAlpha: 0 });
        ready.then(() => {
            if (cancelled || closingRef.current) return;
            openedRef.current = true;
            const ui = root.querySelectorAll('.gl-ui');
            if (prefersReducedMotion()) {
                gsap.set(frame, { autoAlpha: 1 });
                gsap.set(root, { opacity: 1 });
                return;
            }
            const from = morphFromCard(frame, cardMedia(image.id));
            tl = gsap.timeline({ defaults: { ease: 'expo.inOut' } });
            tl.fromTo(root, { opacity: 0, backdropFilter: 'blur(0px)' }, { opacity: 1, backdropFilter: 'blur(28px)', duration: 0.7, ease: 'power2.out' }, 0)
                .fromTo(frame,
                    from ? { ...from, autoAlpha: 1 } : { ...FRAME_REST, scale: 0.6, y: 80, autoAlpha: 0 },
                    { ...FRAME_REST, autoAlpha: 1, duration: 1.15, clearProps: 'transform' }, 0)
                .fromTo(ui, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.06, ease: 'expo.out', clearProps: 'transform' }, 0.55);
        });

        return () => {
            cancelled = true;
            tl?.kill();
            html.style.overflow = prevOverflow;
        };
        // Runs once per opening — later navigation is handled by the slide transition.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* Fermeture : la photo retourne se poser sur sa vignette */
    const requestClose = () => {
        if (closingRef.current) return;
        closingRef.current = true;
        const root = rootRef.current;
        const frame = frameRef.current;
        if (!openedRef.current || prefersReducedMotion()) { onClose(); return; }
        gsap.killTweensOf([root, frame]);
        const to = morphFromCard(frame, cardMedia(image.id));
        gsap.timeline({ defaults: { ease: 'expo.inOut' }, onComplete: onClose })
            .to(root.querySelectorAll('.gl-ui'), { opacity: 0, duration: 0.25, ease: 'power2.in' }, 0)
            .to(frame, to ? { ...to, duration: 0.9 } : { scale: 0.7, y: 60, autoAlpha: 0, duration: 0.6 }, 0)
            .to(root, { opacity: 0, backdropFilter: 'blur(0px)', duration: 0.55, ease: 'power2.inOut' }, to ? 0.4 : 0.15);
    };

    /* Clavier */
    const closeRef = useRef(requestClose);
    closeRef.current = requestClose;
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape')     closeRef.current();
            if (e.key === 'ArrowLeft')  onPrev();
            if (e.key === 'ArrowRight') onNext();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onPrev, onNext]);

    /* Swipe tactile / glisser à la souris */
    const onDragEnd = (_, info) => {
        if (info.offset.x < -70 || info.velocity.x < -500) onNext();
        else if (info.offset.x > 70 || info.velocity.x > 500) onPrev();
    };

    const atStart = currentIndex <= 0;
    const atEnd = currentIndex >= images.length - 1;

    return createPortal(
        <div ref={rootRef} className="gl-root" onClick={requestClose} role="dialog" aria-modal="true" aria-label={image.title}>
            {/* Lumière d'ambiance : la photo courante, floutée en profondeur */}
            <AnimatePresence initial={false}>
                <motion.img
                    key={image.id}
                    src={image.url}
                    alt=""
                    aria-hidden="true"
                    className="gl-ambient"
                    initial={{ opacity: 0, scale: 1.3 }}
                    animate={{ opacity: 0.55, scale: 1.15 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: EXPO }}
                />
            </AnimatePresence>
            <div className="gl-vignette" aria-hidden="true" />

            {/* Grain overlay décoratif */}
            <div className="absolute inset-0 pointer-events-none opacity-30"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")" }}
            />

            {/* Croix */}
            <button
                type="button"
                onClick={(e) => { e.stopPropagation(); requestClose(); }}
                className="gl-ui gl-close"
                aria-label="Fermer"
            >
                <X size={28} className="sm:w-8 sm:h-8" />
            </button>

            {/* Navigation */}
            {[
                { side: 'left',  icon: <ChevronLeft size={20} />,  action: onPrev, disabled: atStart, label: 'Image précédente' },
                { side: 'right', icon: <ChevronRight size={20} />, action: onNext, disabled: atEnd, label: 'Image suivante' },
            ].map(({ side, icon, action, disabled, label }) => (
                <button
                    key={side}
                    type="button"
                    onClick={(e) => { e.stopPropagation(); action(); }}
                    disabled={disabled}
                    aria-label={label}
                    className={`gl-ui gl-nav gl-nav--${side}`}
                >
                    {icon}
                </button>
            ))}

            {/* Photo + méta */}
            <div className="gl-stage" onClick={e => e.stopPropagation()}>
                <div ref={frameRef} className="gl-frame">
                    <AnimatePresence initial={false} mode="wait" custom={direction}>
                        <motion.img
                            key={image.id}
                            src={image.url}
                            alt={image.title}
                            className="gl-img"
                            custom={direction}
                            variants={slide}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            drag="x"
                            dragSnapToOrigin
                            dragElastic={0.5}
                            onDragEnd={onDragEnd}
                            draggable={false}
                        />
                    </AnimatePresence>
                </div>

                {/* Barre dorée qui se dessine */}
                <motion.div
                    key={`bar-${image.id}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.9, delay: 0.15, ease: EXPO }}
                    className="gl-ui gl-bar"
                />

                {/* Titre + compteur */}
                <div className="gl-ui gl-meta">
                    <div className="gl-mask">
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.h2
                                key={`t-${image.id}`}
                                initial={{ y: '110%' }}
                                animate={{ y: '0%', transition: { duration: 0.7, ease: EXPO, delay: 0.1 } }}
                                exit={{ y: '-110%', transition: { duration: 0.3 } }}
                                className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tighter"
                            >
                                {image.title}
                            </motion.h2>
                        </AnimatePresence>
                    </div>

                    {image.description && (
                        <p className="text-gray-400 text-sm font-light leading-relaxed max-w-xl mx-auto mt-3">
                            {image.description}
                        </p>
                    )}

                    {/* Dots de progression (cliquables) */}
                    <div className="flex flex-wrap items-center justify-center gap-2 mt-4 max-w-xl mx-auto">
                        {images.map((img, i) => (
                            <motion.button
                                key={img.id ?? i}
                                type="button"
                                onClick={() => onSelect(img)}
                                aria-label={`Afficher l'image ${i + 1}`}
                                aria-current={i === currentIndex}
                                animate={{
                                    width:            i === currentIndex ? 24 : 6,
                                    backgroundColor:  i === currentIndex ? '#f59e0b' : 'rgba(255,255,255,0.2)',
                                }}
                                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                className="h-1.5 rounded-full"
                            />
                        ))}
                    </div>

                    <p className="text-amber-500/60 text-[10px] font-black tracking-[0.4em] uppercase mt-3">
                        {currentIndex + 1} / {images.length}
                    </p>
                    <p className="gl-hint">← → clavier · glisser pour naviguer · Échap pour fermer</p>
                </div>
            </div>
        </div>,
        document.body
    );
};

/* ─── CARD ─────────────────────────────────────────────────────────────────── */

const Card = ({ image, index, onClick, catName, viewMode, delay = 0 }) => {
    const aspects = ['aspect-[4/5]', 'aspect-[4/6]', 'aspect-[4/5]', 'aspect-square'];
    const aspect = viewMode === 'list' ? 'aspect-[16/6]' : aspects[index % aspects.length];

    return (
        <motion.article
            data-gid={image.id}
            className="gal-card"
            initial={{ opacity: 0, y: 110, rotateX: -18, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 1.2, ease: EXPO, delay }}
            style={{ transformPerspective: 1100 }}
        >
            <TiltCard
                max={7}
                className="gal-tilt"
                onClick={() => onClick(image)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(image); } }}
                role="button"
                tabIndex={0}
                aria-label={`Agrandir : ${image.title}`}
            >
                <span className="gal-halo" aria-hidden="true" />

                <div className={`gal-media ${aspect}`}>
                    {/* Image : parallaxe interne au scroll + zoom lent au survol */}
                    <div className="gal-par">
                        <img src={image.url} alt={image.title} loading="lazy" decoding="async" className="gal-img" />
                    </div>

                    <div className="gal-shade" aria-hidden="true" />
                    <span className="gal-line" aria-hidden="true" />

                    <div className="gal-content">
                        <span className="gal-cat">{catName}</span>
                        <h3 className="gal-title">{image.title}</h3>
                        <div className="gal-see">
                            <span>Voir</span>
                            <i aria-hidden="true" />
                        </div>
                    </div>

                    <span className="gal-num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                </div>
            </TiltCard>
        </motion.article>
    );
};

/* ─── GRILLE MULTICOUCHE ───────────────────────────────────────────────────── */

// Column drift in px across the grid's scroll range: the middle column travels against
// the others, so the wall of photos breathes in several depth planes.
const COLUMN_DEPTH = { 1: [0], 2: [50, -70], 3: [60, -130, 90] };

const GalleryGrid = ({ images, viewMode, cols, onOpen }) => {
    const ref = useRef(null);
    const columnsCount = viewMode === 'list' ? 1 : cols;

    const columns = Array.from({ length: columnsCount }, () => []);
    images.forEach((image, index) => columns[index % columnsCount].push({ image, index }));

    useLayoutEffect(() => {
        const root = ref.current;
        const mm = gsap.matchMedia();
        const ctx = gsap.context(() => {
            mm.add('(prefers-reduced-motion: no-preference)', () => {
                const depth = COLUMN_DEPTH[columnsCount] || [0];
                gsap.utils.toArray('.gal-col', root).forEach((col, i) => {
                    if (!depth[i]) return;
                    gsap.fromTo(col, { y: depth[i] }, {
                        y: -depth[i], ease: 'none',
                        scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
                    });
                });
                gsap.utils.toArray('.gal-par', root).forEach((par) => {
                    gsap.fromTo(par, { yPercent: -7 }, {
                        yPercent: 7, ease: 'none',
                        scrollTrigger: { trigger: par.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
                    });
                });
            });
        }, root);
        const t = setTimeout(() => ScrollTrigger.refresh(), 700);
        return () => { clearTimeout(t); mm.revert(); ctx.revert(); };
    }, [images, columnsCount]);

    return (
        <div
            ref={ref}
            className={`gal-grid ${viewMode === 'list' ? 'gal-grid--list' : ''}`}
            style={{ '--cols': columnsCount }}
        >
            {columns.map((col, ci) => (
                <div key={ci} className="gal-col">
                    {col.map(({ image, index }, row) => (
                        <Card
                            key={image.id}
                            image={image}
                            index={index}
                            catName={image.category}
                            viewMode={viewMode}
                            onClick={onOpen}
                            delay={row < 2 ? ci * 0.12 : 0}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

/* ─── HERO PARALLAX MULTICOUCHE ────────────────────────────────────────────── */

// Photo layers: `speed` = px travelled while the hero scrolls away (more = closer to the eye).
const HERO_SLOTS = [
    { style: { left: '3%',  top: '20%',    width: '15vw' }, rotate: -8, speed: -320 },
    { style: { right: '4%', top: '16%',    width: '13vw' }, rotate: 7,  speed: -220 },
    { style: { left: '15%', bottom: '2%',  width: '10vw' }, rotate: 5,  speed: -420 },
    { style: { right: '16%', bottom: '6%', width: '11vw' }, rotate: -5, speed: -260 },
    { style: { left: '41%', top: '9%',     width: '8vw'  }, rotate: 3,  speed: -90, back: true },
];

const HeroPhoto = ({ image, slot, index, progress }) => {
    const y = useTransform(progress, [0, 1], [0, slot.speed]);
    return (
        <motion.div className={`gal-hero-photo ${slot.back ? 'is-back' : ''}`} style={{ ...slot.style, y }}>
            <motion.div
                initial={{ opacity: 0, y: 140, scale: 0.6, rotate: slot.rotate * 3, filter: 'blur(14px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, rotate: slot.rotate, filter: slot.back ? 'blur(2px)' : 'blur(0px)' }}
                transition={{ duration: 1.6, ease: EXPO, delay: 0.5 + index * 0.12 }}
                className="gal-hero-photo-in"
            >
                <img src={image.url} alt="" loading="eager" decoding="async" />
            </motion.div>
        </motion.div>
    );
};

const HeroSection = ({ images }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
    const y       = useTransform(scrollYProgress, [0, 1], [0, 160]);
    const scale   = useTransform(scrollYProgress, [0, 1], [1, 0.86]);
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    useLayoutEffect(() => {
        const mm = gsap.matchMedia();
        const ctx = gsap.context(() => {
            mm.add('(prefers-reduced-motion: no-preference)', () => {
                const a = SplitText.create('.gal-word-a', { type: 'words,chars', mask: 'chars' });
                const b = SplitText.create('.gal-word-b', { type: 'words,chars', mask: 'chars', charsClass: 'shimmer-gold' });
                gsap.timeline({ defaults: { ease: 'expo.out' } })
                    .from(a.chars, { yPercent: 120, rotate: 10, duration: 1.3, stagger: 0.05 }, 0.15)
                    .from(b.chars, { yPercent: 120, rotate: -10, duration: 1.3, stagger: 0.05 }, 0.35)
                    .fromTo('.gal-hero-sub', { opacity: 0, filter: 'blur(10px)' }, { opacity: 1, filter: 'blur(0px)', duration: 1.2, clearProps: 'filter' }, 0.7)
                    .fromTo('.gal-hero-line', { scaleX: 0 }, { scaleX: 1, duration: 1.2 }, 0.9);
            });
        }, ref);
        return () => { mm.revert(); ctx.revert(); };
    }, []);

    const photos = images.slice(0, HERO_SLOTS.length);

    return (
        <div ref={ref} className="gal-hero">
            <GoldParticles count={520} speed={1.4} />

            {/* Couches de photos — chacune défile à sa propre vitesse */}
            <div className="gal-hero-photos" aria-hidden="true">
                {photos.map((image, i) => (
                    <HeroPhoto key={image.id ?? i} image={image} slot={HERO_SLOTS[i]} index={i} progress={scrollYProgress} />
                ))}
            </div>

            <motion.div
                style={{ y, scale, opacity }}
                className="container mx-auto text-center relative z-10"
            >
                <h1 className="gal-hero-title">
                    <span className="gal-word-a">Notre</span>{' '}
                    <span className="gal-word-b">Galerie</span>
                </h1>

                <p className="gal-hero-sub text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                    Chaque image raconte une histoire de foi et d'impact.
                </p>

                <div className="gal-hero-line w-24 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-8 origin-center" />
            </motion.div>
        </div>
    );
};

/* ─── FILTRES & SWITCH VUE ─────────────────────────────────────────────────── */

const categories = [
    { id: 'all',       label: 'Tout' },
    { id: 'events',    label: 'Événements' },
    { id: 'worship',   label: 'Louange' },
    { id: 'community', label: 'Communauté' },
];

const FilterBar = ({ filter, setFilter, viewMode, setViewMode }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="container mx-auto px-6 mb-16 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10"
    >
        {/* Filtres avec sliding pill */}
        <LayoutGroup>
            <div className="flex flex-wrap justify-center gap-1 sm:gap-2 p-1 sm:p-1.5 rounded-2xl sm:rounded-full glass-gold gold-border">
                {categories.map(({ id, label }) => (
                    <motion.button
                        key={id}
                        onClick={() => setFilter(id)}
                        whileTap={{ scale: 0.95 }}
                        className={`relative px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-colors ${filter === id ? 'text-black' : 'text-gray-400 hover:text-white'}`}
                    >
                        {filter === id && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-amber-500 rounded-full shadow-[0_0_24px_rgba(245,158,11,0.55)]"
                                transition={{ type: 'spring', bounce: 0.25, duration: 0.55 }}
                            />
                        )}
                        <span className="relative z-10">{label}</span>
                    </motion.button>
                ))}
            </div>
        </LayoutGroup>

        {/* Switch vue avec morphing */}
        <div className="flex gap-2">
            {[
                { mode: 'grid', icon: <Grid3X3 size={18} />, label: 'Vue grille' },
                { mode: 'list', icon: <LayoutList size={18} />, label: 'Vue liste' },
            ].map(({ mode, icon, label }) => (
                <motion.button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    aria-label={label}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    animate={{
                        backgroundColor: viewMode === mode ? '#d97706' : '#18181b',
                        color:           viewMode === mode ? '#000000' : '#ffffff',
                    }}
                    transition={{ duration: 0.25 }}
                    className="p-3 rounded-xl"
                >
                    {icon}
                </motion.button>
            ))}
        </div>
    </motion.div>
);

/* ─── SKELETON LOADER ──────────────────────────────────────────────────────── */

const Skeleton = () => (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
        {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
                key={i}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                className="w-full aspect-[4/5] rounded-3xl bg-zinc-900 border border-white/5"
                style={{ breakInside: 'avoid' }}
            />
        ))}
    </div>
);

/* ─── GALERIE PRINCIPALE ───────────────────────────────────────────────────── */

const Galerie = () => {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [direction, setDirection] = useState('next');
    const [filter, setFilter] = useState('all');
    const [viewMode, setViewMode] = useState('grid');
    const [loading, setLoading] = useState(true);
    const cols = useColumnCount();

    // Repli : données statiques locales
    const [staticImages, setStaticImages] = useState([]);
    useEffect(() => {
        fetch('/data/image.json')
            .then(r => r.json())
            .then(data => { setStaticImages(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    // Source principale : API
    const {
        data: apiImages,
        raw: rawImages,
        refresh: refreshImages,
    } = useContentApi('/gallery', [], galleryMapper);

    useEffect(() => {
        if (apiImages.length > 0) {
            setImages(apiImages);
        } else if (staticImages.length > 0) {
            setImages(staticImages);
        }
    }, [apiImages, staticImages]);

    /* Barre de progression scroll */
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    const filteredImages = filter === 'all' ? images : images.filter(img => img.category === filter);

    const currentIndex = selectedImage ? filteredImages.findIndex(img => img.id === selectedImage.id) : -1;
    const handlePrev = () => {
        if (currentIndex > 0) { setDirection('prev'); setSelectedImage(filteredImages[currentIndex - 1]); }
    };
    const handleNext = () => {
        if (currentIndex < filteredImages.length - 1) { setDirection('next'); setSelectedImage(filteredImages[currentIndex + 1]); }
    };
    const handleSelect = (img) => {
        const i = filteredImages.findIndex(x => x.id === img.id);
        setDirection(i < currentIndex ? 'prev' : 'next');
        setSelectedImage(img);
    };

    return (
        <section className="gal-page min-h-screen bg-black text-gray-300">

            {/* Barre de progression */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600 origin-left z-[100]"
                style={{ scaleX }}
            />

            <header className="fixed top-0 w-full z-50"><Nav /></header>

            <HeroSection images={images} />

            <FilterBar
                filter={filter}       setFilter={setFilter}
                viewMode={viewMode}   setViewMode={setViewMode}
            />

            {/* Grille */}
            <div className="container mx-auto px-6 pb-48">
                {loading ? (
                    <Skeleton />
                ) : (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${filter}-${viewMode}-${cols}`}
                            initial={{ opacity: 0, scale: 1.04, filter: 'blur(12px)' }}
                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.6, ease: EXPO } }}
                            exit={{ opacity: 0, scale: 0.94, filter: 'blur(12px)', transition: { duration: 0.3, ease: 'easeIn' } }}
                        >
                            <GalleryGrid images={filteredImages} viewMode={viewMode} cols={cols} onOpen={(img) => { setDirection('next'); setSelectedImage(img); }} />
                        </motion.div>
                    </AnimatePresence>
                )}

                {/* Empty state animé */}
                <AnimatePresence>
                    {!loading && filteredImages.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="text-center py-32"
                        >
                            <motion.p
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-gray-600 text-lg font-light"
                            >
                                Aucune image dans cette catégorie.
                            </motion.p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Lightbox */}
            {selectedImage && currentIndex !== -1 && (
                <Lightbox
                    image={selectedImage}
                    images={filteredImages}
                    direction={direction}
                    onClose={() => setSelectedImage(null)}
                    onPrev={handlePrev}
                    onNext={handleNext}
                    onSelect={handleSelect}
                />
            )}

            <Footer />

            {/* Panneau d'administration de la galerie */}
            <ContentManager
                title="Galerie"
                singular="une image"
                subtitle="Ajoutez ou retirez des images avec leur titre, description et catégorie."
                items={rawImages}
                onRefresh={refreshImages}
                apiPath="/admin/gallery"
                fields={galleryFields}
                columns={galleryColumns}
            />
        </section>
    );
};

export default Galerie;
