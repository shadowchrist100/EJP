import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
    motion,
    AnimatePresence,
    useScroll,
    useTransform,
    useSpring,
    useMotionValue,
} from 'framer-motion';
import { Nav, Footer, Contact } from '../';
import {
    BookOpen, Palette, Film, Music, Image,
    ArrowRight, X, ChevronRight, Play, Download,
    Sparkles, BookMarkedIcon,
} from 'lucide-react';
import { art1, art2 } from '../../assets';

// ─── Particle Canvas ──────────────────────────────────────────────────────────
const ParticleField = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animId;
        const COUNT = 60;
        const particles = [];

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(canvas.parentElement);

        for (let i = 0; i < COUNT; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                r: Math.random() * 1.5 + 0.5,
                alpha: Math.random() * 0.5 + 0.1,
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(251,191,36,${p.alpha})`;
                ctx.fill();
            });
            particles.forEach((a, i) => {
                particles.slice(i + 1).forEach((b) => {
                    const dist = Math.hypot(a.x - b.x, a.y - b.y);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.strokeStyle = `rgba(251,191,36,${0.08 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });
            animId = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            cancelAnimationFrame(animId);
            ro.disconnect();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ opacity: 0.6 }}
        />
    );
};

// ─── Scroll Progress Bar ──────────────────────────────────────────────────────
const ScrollProgressBar = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left"
            style={{
                scaleX,
                background: 'linear-gradient(90deg, #f59e0b, #fbbf24, #fcd34d)',
                boxShadow: '0 0 8px rgba(251,191,36,0.6)',
            }}
        />
    );
};

// ─── Cursor Glow ──────────────────────────────────────────────────────────────
const CursorGlow = () => {
    const x = useMotionValue(-200);
    const y = useMotionValue(-200);
    const springX = useSpring(x, { stiffness: 80, damping: 20 });
    const springY = useSpring(y, { stiffness: 80, damping: 20 });

    useEffect(() => {
        const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
        window.addEventListener('mousemove', move);
        return () => window.removeEventListener('mousemove', move);
    }, [x, y]);

    return (
        <motion.div
            className="fixed pointer-events-none z-[99] mix-blend-screen"
            style={{
                left: springX, top: springY,
                x: '-50%', y: '-50%',
                width: 400, height: 400,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(251,191,36,0.06) 0%, transparent 70%)',
            }}
        />
    );
};

// ─── Animated Counter ─────────────────────────────────────────────────────────
const AnimatedCounter = ({ target, duration = 1.5 }) => {
    const [count, setCount] = useState(0);
    const fired = useRef(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !fired.current) {
                fired.current = true;
                let start = 0;
                const steps = 60;
                const increment = target / steps;
                const interval = (duration * 1000) / steps;
                const timer = setInterval(() => {
                    start += increment;
                    if (start >= target) { setCount(target); clearInterval(timer); }
                    else setCount(Math.floor(start));
                }, interval);
            }
        }, { threshold: 0.5 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target, duration]);

    return <span ref={ref}>{count}</span>;
};

// ─── Shimmer Text ─────────────────────────────────────────────────────────────
const ShimmerText = ({ children, className = '' }) => (
    <span
        className={`relative inline-block ${className}`}
        style={{
            background: 'linear-gradient(90deg,#fcd34d 0%,#fbbf24 30%,#fff8dc 50%,#fbbf24 70%,#fcd34d 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'shimmer 3s linear infinite',
        }}
    >
        {children}
        <style>{`@keyframes shimmer { to { background-position: 200% center; } }`}</style>
    </span>
);

// ─── Stagger Words ────────────────────────────────────────────────────────────
const StaggerWords = ({ text, className = '', delay = 0 }) => (
    <span className={className}>
        {text.split(' ').map((word, i) => (
            <motion.span
                key={i}
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: delay + i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ display: 'inline-block', marginRight: '0.25em' }}
            >
                {word}
            </motion.span>
        ))}
    </span>
);

// ─── Shared Variants ──────────────────────────────────────────────────────────

const floatingVariants = {
    animate: {
        y: [0, -25, 0], x: [0, 12, 0],
        transition: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
    },
};

const pulseVariants = {
    animate: {
        scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6],
        transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
    },
};

const spinVariants = {
    animate: { rotate: 360, transition: { duration: 4, repeat: Infinity, ease: 'linear' } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: {
        opacity: 1, y: 0, filter: 'blur(0px)',
        transition: { type: 'spring', stiffness: 90, damping: 16 },
    },
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const heroBadgeVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: {
        opacity: 1, scale: 1, rotate: 0,
        transition: { type: 'spring', stiffness: 220, damping: 14 },
    },
};

const heroTitleVariants = {
    hidden: { opacity: 0, y: 60, skewY: 4 },
    visible: {
        opacity: 1, y: 0, skewY: 0,
        transition: { type: 'spring', stiffness: 60, damping: 18, delay: 0.1 },
    },
};

const underlineVariants = {
    hidden: { scaleX: 0 },
    visible: {
        scaleX: 1,
        transition: { type: 'spring', stiffness: 120, damping: 20, delay: 0.4 },
    },
};

const statsVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
};

const statItemVariants = {
    hidden: { opacity: 0, y: 35, scale: 0.65 },
    visible: {
        opacity: 1, y: 0, scale: 1,
        transition: { type: 'spring', stiffness: 130, damping: 14 },
    },
    hover: {
        y: -6, scale: 1.07,
        transition: { type: 'spring', stiffness: 300, damping: 10 },
    },
};

const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 15 } },
    hover: {
        scale: 1.06,
        boxShadow: '0 20px 40px rgba(251,191,36,0.35)',
        transition: { type: 'spring', stiffness: 300, damping: 10 },
    },
    tap: { scale: 0.93 },
};

const categoryButtonVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100, damping: 14 } },
    hover: { x: 8, scale: 1.03, transition: { type: 'spring', stiffness: 350, damping: 12 } },
    tap: { scale: 0.94 },
};

// ─── FIX 1 : cardVariants sans rotateX ni blur pour éviter les reflows ─────
//   On garde une entrée propre avec juste opacity + y + scale.
//   Le blur et rotateX dans les variants originaux causaient des recalculs
//   de layout à chaque frame lors du stagger, provoquant le scintillement.
const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.92 },
    visible: {
        opacity: 1, y: 0, scale: 1,
        transition: { type: 'spring', stiffness: 80, damping: 16 },
    },
    exit: {
        opacity: 0, scale: 0.88, y: -16,
        transition: { duration: 0.2, ease: 'easeIn' },
    },
};

// ─── WorkCard ─────────────────────────────────────────────────────────────────
// FIX 2 : on retire whileInView sur la card elle-même. Le parent AnimatePresence
//   gère l'entrée/sortie ; whileInView + AnimatePresence se conflictuent quand
//   les items sont déjà dans le viewport au changement de catégorie.
const WorkCard = ({ work, idx, onExpand, hoveredCard, setHoveredCard, getYoutubeId, getYoutubeThumbnail, categories }) => {
    const isYoutube = work.type === 'youtube';
    const youtubeId = isYoutube ? getYoutubeId(work.youtubeUrl) : null;
    const thumbnailUrl = isYoutube ? getYoutubeThumbnail(youtubeId) : work.image;

    const cardRef = useRef(null);
    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);
    const springRotX = useSpring(rotateX, { stiffness: 200, damping: 20 });
    const springRotY = useSpring(rotateY, { stiffness: 200, damping: 20 });

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        rotateX.set(-py * 10);
        rotateY.set(px * 10);
    };
    const handleMouseLeave = () => { rotateX.set(0); rotateY.set(0); };

    const handleClick = () => {
        if (isYoutube) window.open(work.youtubeUrl, '_blank');
        else onExpand(work);
    };

    return (
        // FIX 2 suite : variants seront fournis par le parent motion.div
        // On utilise juste motion.div ici pour le tilt 3D, pas pour l'entrée
        <motion.div
            variants={cardVariants}
            className="group cursor-pointer"
            style={{ perspective: 800 }}
            onMouseEnter={() => setHoveredCard(work.id)}
            onMouseLeave={() => { setHoveredCard(null); handleMouseLeave(); }}
            onMouseMove={handleMouseMove}
        >
            <motion.div
                ref={cardRef}
                style={{ rotateX: springRotX, rotateY: springRotY, transformStyle: 'preserve-3d' }}
            >
                <div
                    onClick={handleClick}
                    className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-950 to-black border border-white/10 hover:border-amber-500/50 transition-colors duration-300"
                >
                    {/* Image */}
                    <div className="aspect-square overflow-hidden bg-gradient-to-br from-zinc-800 to-black relative">
                        <motion.img
                            src={thumbnailUrl}
                            alt={work.title}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.1, filter: 'brightness(1.1)' }}
                            transition={{ type: 'spring', stiffness: 180, damping: 20 }}
                        />
                        {/* Glint sweep — déclenché par index, pas par whileInView */}
                        <motion.div
                            className="absolute inset-0 pointer-events-none"
                            initial={{ x: '-100%', skewX: -20 }}
                            animate={{ x: '200%' }}
                            transition={{ duration: 0.9, delay: idx * 0.12 + 0.3, ease: 'easeOut' }}
                            style={{
                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
                                width: '60%',
                            }}
                        />
                    </div>

                    {/* Hover overlay */}
                    {isYoutube ? (
                        <motion.div
                            className="absolute inset-0 bg-black/50 flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.25 }}
                        >
                            <motion.div
                                className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-2xl shadow-red-600/60"
                                initial={{ scale: 0.5 }}
                                whileHover={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Play size={30} className="text-white fill-white ml-1" />
                            </motion.div>
                        </motion.div>
                    ) : (
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-5"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.25 }}
                        >
                            <motion.button
                                className="inline-flex items-center gap-2 text-sm font-bold text-black bg-gradient-to-r from-amber-400 to-yellow-400 px-4 py-2 rounded-xl w-fit shadow-lg"
                                initial={{ y: 12, opacity: 0 }}
                                whileHover={{ y: 0, opacity: 1 }}
                                transition={{ type: 'spring', stiffness: 200, damping: 14 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Voir plus
                                <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>
                                    <ArrowRight className="w-4 h-4" />
                                </motion.span>
                            </motion.button>
                        </motion.div>
                    )}

                    {/* Year badge */}
                    <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-amber-400 border border-amber-500/30">
                        {work.year}
                    </div>

                    {isYoutube && (
                        <div className="absolute top-3 left-3 bg-red-600 px-3 py-1 rounded-full text-xs font-bold text-white border border-red-500/50 flex items-center gap-1.5">
                            <Film size={11} />
                            YouTube
                        </div>
                    )}

                    {/* Glow ring */}
                    <motion.div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        animate={
                            hoveredCard === work.id
                                ? { boxShadow: 'inset 0 0 0 1.5px rgba(251,191,36,0.5), 0 0 40px rgba(251,191,36,0.15)' }
                                : { boxShadow: 'inset 0 0 0 0px rgba(251,191,36,0)' }
                        }
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </motion.div>

            {/* Info below card */}
            <div className="mt-4 space-y-1">
                <h3 className="font-black text-white group-hover:text-amber-400 transition-colors duration-300 text-lg">
                    {work.title}
                </h3>
                <p className="text-sm text-gray-500 font-light">{work.author}</p>
                {work.duration && <p className="text-xs text-gray-600 italic">{work.duration}</p>}
                {isYoutube && (
                    <p className="text-xs text-red-400 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                        Cliquez pour regarder
                    </p>
                )}
            </div>
        </motion.div>
    );
};

// ─── Modal ────────────────────────────────────────────────────────────────────
// FIX 3 : on remplace overflow-y-auto + my-8 sur la modale par un layout
//   centré avec padding vertical sur le backdrop. Cela garantit que la modale
//   est toujours centrée dans le viewport fixe, quel que soit le scroll de la page.
const WorkModal = ({ work, onClose, categories }) => {
    // Bloquer le scroll body pendant l'ouverture
    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = prev; };
    }, []);

    // Fermeture Escape
    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onClose]);

    return createPortal(
        // Backdrop : fixed + flex centré. PAS de overflow-y-auto ici.
        <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3 }}
            style={{ backgroundColor: 'rgba(0,0,0,0.80)' }}
            onClick={onClose}
        >
            {/*
              FIX 3 suite : la modale elle-même a overflow-y-auto + max-h
              pour que son contenu soit scrollable DANS la modale,
              sans affecter le centrage du backdrop.
            */}
            <motion.div
                className="relative w-full max-w-2xl overflow-y-auto rounded-3xl"
                style={{ maxHeight: 'calc(100vh - 4rem)' }}
                initial={{ opacity: 0, scale: 0.88, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.82, y: 30 }}
                transition={{ type: 'spring', stiffness: 280, damping: 26, mass: 0.8 }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="bg-gradient-to-br from-zinc-900 to-black border-2 border-white/10 rounded-3xl relative overflow-hidden">
                    {/* Corner glows */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-bl-[80px] blur-2xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-500/8 rounded-tr-[60px] blur-xl pointer-events-none" />

                    <div className="p-8 relative z-10">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1, type: 'spring', stiffness: 100 }}
                            >
                                <h3 className="text-3xl font-black text-white mb-2 tracking-tighter">{work.title}</h3>
                                <p className="text-gray-400 text-lg font-light">{work.author}</p>
                            </motion.div>
                            <motion.button
                                initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
                                whileHover={{ rotate: 90, scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={onClose}
                                className="p-2 hover:bg-white/10 rounded-xl transition-colors shrink-0 ml-4"
                            >
                                <X className="w-6 h-6 text-gray-400" />
                            </motion.button>
                        </div>

                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1, type: 'spring', stiffness: 90, damping: 16 }}
                            className="mb-8 rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-800 to-black border border-white/10 flex items-center justify-center p-6 min-h-64"
                        >
                            <img
                                src={work.image}
                                alt={work.title}
                                className="max-h-80 w-auto object-contain"
                            />
                        </motion.div>

                        {/* Details */}
                        <motion.div
                            className="space-y-6"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div>
                                <p className="text-xs font-black text-amber-400 uppercase tracking-widest mb-3">Description</p>
                                <p className="text-base leading-relaxed text-gray-300 font-light">{work.description}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                                <div>
                                    <p className="text-xs font-black text-amber-400 uppercase tracking-widest mb-2">Année</p>
                                    <p className="text-lg font-black text-white">{work.year}</p>
                                </div>
                                {work.duration && (
                                    <div>
                                        <p className="text-xs font-black text-amber-400 uppercase tracking-widest mb-2">Durée</p>
                                        <p className="text-lg font-black text-white">{work.duration}</p>
                                    </div>
                                )}
                                <div>
                                    <p className="text-xs font-black text-amber-400 uppercase tracking-widest mb-2">Catégorie</p>
                                    <p className="text-lg font-black text-white capitalize">
                                        {categories.find(c => c.id === work.category)?.label}
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Actions */}
                        <motion.div
                            className="mt-8 flex flex-col gap-3"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            {work.category === 'book' && work.downloadUrl && (
                                <motion.a
                                    href={work.downloadUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2"
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    <Download size={16} />
                                    <span>Télécharger le livre</span>
                                </motion.a>
                            )}
                            <motion.button
                                onClick={onClose}
                                className="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-black rounded-xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2"
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                <span>Fermer</span>
                                <X size={16} />
                            </motion.button>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </motion.div>,
        document.body
    );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const ArtProdige = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [expandedWork, setExpandedWork] = useState(null);
    const [hoveredCard, setHoveredCard] = useState(null);

    // FIX 4 : on scope useScroll sur le conteneur principal, pas window,
    //   pour éviter l'interférence avec le scroll interne de la modale.
    const mainRef = useRef(null);
    const { scrollY } = useScroll(); // window scroll pour la progress bar
    const heroRef = useRef(null);
    const { scrollYProgress: heroProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });
    const heroOpacity = useTransform(heroProgress, [0, 1], [1, 0.5]);
    const heroScale = useTransform(heroProgress, [0, 1], [1, 0.94]);
    const heroY = useTransform(heroProgress, [0, 1], [0, 120]);

    const categories = [
        { id: 'all', label: 'Toutes les œuvres', icon: Image },
        { id: 'book', label: 'Livres', icon: BookOpen },
        { id: 'art', label: 'Art Visuel', icon: Palette },
        { id: 'film', label: 'Métrage', icon: Film },
        { id: 'sound', label: 'Music', icon: Music },
        { id: 'bd', label: 'BD', icon: BookMarkedIcon },
    ];

    const getYoutubeId = (url) => {
        const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
        return match && match[2].length === 11 ? match[2] : null;
    };

    const getYoutubeThumbnail = (id) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

    const works = [
        {
            id: 1, category: 'book', title: 'Sentinelles', author: 'Charles SANDAH',
            image: '/sentinelles.png', description: '', year: 2025, type: 'image',
            downloadUrl: 'https://example.com/sentinelles.pdf',
        },
        {
            id: 2, category: 'art', title: '', author: '',
            image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 280"%3E%3Crect fill="%23fbbf24" width="280" height="280"/%3E%3Crect fill="%23f59e0b" x="20" y="20" width="100" height="100"/%3E%3Crect fill="%23d97706" x="140" y="50" width="120" height="80"/%3E%3Crect fill="%23b45309" x="30" y="160" width="220" height="100"/%3E%3C/svg%3E',
            description: '', year: 2024, type: 'image',
        },
        {
            id: 3, category: 'film', title: 'Derrière le voile', author: 'EJP Porto',
            youtubeUrl: 'https://youtu.be/lOf1ls3giIw?si=c-qyP2tH44Z1u__q',
            description: "Court métrage expérimental jouant avec les effets de lumière et d'ombre.",
            duration: '12 min', year: 2024, type: 'youtube',
        },
        {
            id: 4, category: 'sound', title: "Dieu D'abord", author: 'SKY F',
            youtubeUrl: 'https://youtu.be/NKGc2DtqsZ8?si=Xmx-sctRbZDzqg3e',
            description: 'Un hymne inspirant qui célèbre la priorité de mettre Dieu en premier.',
            duration: '3 min', year: 2025, type: 'youtube',
        },
        {
            id: 5, category: 'art', title: '', author: '',
            image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 280"%3E%3Crect fill="%23f3f4f6" width="280" height="280"/%3E%3Crect fill="%23fbbf24" x="20" y="20" width="50" height="50"/%3E%3Crect fill="%23f59e0b" x="90" y="20" width="50" height="50"/%3E%3Crect fill="%23d97706" x="160" y="20" width="50" height="50"/%3E%3C/svg%3E',
            description: '', year: 2024, type: 'image',
        },
        {
            id: 6, category: 'sound', title: 'Percer', author: 'SKY F',
            youtubeUrl: 'https://youtu.be/CU4qWeTPdGg?si=LGykxbVaeh1_3nns',
            description: 'Manuel pratique rassemblant techniques et conseils des artistes.',
            duration: '3 min', year: 2024, type: 'youtube',
        },
        { id: 7, category: 'art', title: '', author: '', image: art1, description: '', year: 2025, type: 'image' },
        { id: 8, category: 'art', title: '', author: '', image: art2, description: '', year: 2025, type: 'image' },
    ];

    const filteredWorks = selectedCategory === 'all'
        ? works
        : works.filter(w => w.category === selectedCategory);

    return (
        <div ref={mainRef} className="relative flex min-h-screen flex-col bg-black text-gray-400 overflow-x-hidden">
            <CursorGlow />
            <ScrollProgressBar />

            <div className="fixed top-0 right-0 left-0 z-50">
                <Nav />
            </div>
            <div className="h-20 lg:h-32" />

            <main className="grow">

                {/* ══════════════════════ HERO ══════════════════════ */}
                <section
                    ref={heroRef}
                    className="relative min-h-[60vh] flex items-center justify-center overflow-hidden px-4 md:px-8"
                >
                    <div className="absolute inset-0">
                        <ParticleField />
                    </div>

                    {/* Blobs */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <motion.div
                            className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-3xl"
                            variants={floatingVariants} animate="animate"
                        />
                        <motion.div
                            className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-yellow-500/8 rounded-full blur-3xl"
                            variants={floatingVariants} animate="animate"
                            transition={{ duration: 9, delay: 0.8 }}
                        />
                        <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-amber-400/5 rounded-full blur-2xl"
                            variants={pulseVariants} animate="animate"
                        />
                        {/* FIX 4 suite : on utilise heroY depuis useScroll({ target: heroRef }) */}
                        <motion.div
                            style={{ y: heroY }}
                            className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-zinc-900"
                        />
                    </div>

                    {/* FIX 4 : heroOpacity et heroScale depuis le target scopé */}
                    <motion.div
                        className="container mx-auto max-w-4xl relative z-10"
                        style={{ opacity: heroOpacity, scale: heroScale }}
                    >
                        <div className="pt-10 text-center">

                            {/* Badge */}
                            <motion.div
                                variants={heroBadgeVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.08, borderColor: 'rgba(251,191,36,0.6)' }}
                                className="inline-flex items-center gap-3 mb-8 px-5 py-2.5 bg-amber-500/10 border border-amber-500/30 rounded-full backdrop-blur-sm cursor-default"
                            >
                                <motion.div variants={spinVariants} animate="animate">
                                    <Palette className="text-amber-500" size={15} />
                                </motion.div>
                                <span className="text-amber-500 font-bold tracking-[0.3em] uppercase text-xs">
                                    Créativité Sans Limites
                                </span>
                                <motion.div
                                    className="w-1.5 h-1.5 bg-amber-400 rounded-full"
                                    variants={pulseVariants} animate="animate"
                                />
                            </motion.div>

                            {/* Title */}
                            <motion.h1
                                variants={heroTitleVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-none"
                            >
                                <StaggerWords text="Découvrez les" delay={0.05} />{' '}
                                <ShimmerText className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter">
                                    Œuvres
                                </ShimmerText>{' '}
                                <StaggerWords text="de nos Jeunes Prodiges" delay={0.25} />
                            </motion.h1>

                            {/* Subtitle */}
                            <motion.p
                                variants={itemVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="text-lg md:text-xl text-gray-300 font-light mb-10 leading-relaxed max-w-3xl mx-auto"
                            >
                                Une galerie exceptionnelle mettant en avant les talents artistiques,
                                littéraires et créatifs des Jeunes Prodiges de Porto Novo.
                            </motion.p>

                            {/* Stats */}
                            <motion.div
                                variants={statsVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="grid grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto"
                            >
                                {[
                                    { value: works.length, label: 'Œuvres' },
                                    { value: 5, label: 'Catégories' },
                                    { value: 2024, label: 'Depuis' },
                                ].map((stat, idx) => (
                                    <motion.div
                                        key={idx}
                                        variants={statItemVariants}
                                        whileHover="hover"
                                        className="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm hover:border-amber-500/40 transition-colors duration-300 relative overflow-hidden"
                                    >
                                        <motion.div
                                            className="absolute top-0 right-0 w-10 h-10 bg-amber-500/10 rounded-bl-2xl"
                                            whileHover={{ scale: 1.5, opacity: 0.8 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                        <p className="text-3xl font-black text-amber-400 mb-1">
                                            <AnimatedCounter target={stat.value} />
                                        </p>
                                        <p className="text-xs text-gray-400 uppercase tracking-widest font-light">
                                            {stat.label}
                                        </p>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Scroll hint */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.5 }}
                                className="flex flex-col items-center gap-2 mt-4"
                            >
                                <span className="text-xs text-gray-600 uppercase tracking-widest">Défiler</span>
                                <motion.div
                                    className="w-px h-10 bg-gradient-to-b from-amber-500/60 to-transparent"
                                    animate={{ scaleY: [0, 1, 0], originY: 'top' }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                </section>

                {/* ══════════════════════ INSPIRATIONAL ══════════════════════ */}
                <section className="relative py-24 px-4 md:px-8 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/8 via-yellow-500/4 to-amber-500/8 pointer-events-none" />
                    <motion.div
                        className="absolute -top-20 -right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"
                        variants={floatingVariants} animate="animate"
                    />
                    <motion.div
                        className="absolute -bottom-20 -left-20 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl"
                        variants={floatingVariants} animate="animate"
                        transition={{ duration: 9, delay: 0.5 }}
                    />

                    <motion.div
                        className="container mx-auto max-w-4xl relative z-10"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                    >
                        <div className="text-center">
                            <motion.div
                                variants={heroBadgeVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="inline-flex items-center justify-center mb-8"
                            >
                                <div className="relative">
                                    <motion.div
                                        className="absolute inset-0 bg-amber-500/30 rounded-full blur-2xl"
                                        variants={pulseVariants} animate="animate"
                                    />
                                    <div className="relative p-4 bg-gradient-to-br from-amber-500/20 to-yellow-500/10 rounded-full border border-amber-500/30">
                                        <motion.div variants={spinVariants} animate="animate">
                                            <Sparkles className="text-amber-400" size={32} />
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.h2
                                variants={heroTitleVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tighter leading-tight"
                            >
                                Remplis de l&apos;{' '}
                                <ShimmerText className="text-3xl md:text-5xl font-black">Esprit Divin</ShimmerText>
                            </motion.h2>

                            <motion.blockquote
                                variants={itemVariants}
                                className="mb-8 relative"
                                whileHover={{ x: 6 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                            >
                                <motion.div
                                    className="absolute left-0 top-0 w-1 rounded-full bg-gradient-to-b from-amber-500 to-transparent"
                                    initial={{ height: 0 }}
                                    whileInView={{ height: 48 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                />
                                <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed italic pl-6 max-w-3xl mx-auto">
                                    <span className="text-amber-400 font-bold">"</span>
                                    Je l&apos;ai rempli de l&apos;Esprit de Dieu, de sagesse, d&apos;intelligence, et de savoir pour toutes sortes d&apos;ouvrages.
                                    <span className="text-amber-400 font-bold">"</span>
                                </p>
                                <p className="text-sm text-gray-500 mt-4">Exode 35:31</p>
                            </motion.blockquote>

                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="space-y-6 max-w-3xl mx-auto"
                            >
                                {[
                                    "Chaque jeune Prodige porte en lui les dons divins : la créativité de l'Esprit, la sagesse pour guider ses œuvres, et l'intelligence pour transformer ses rêves en réalité.",
                                    "Ces œuvres d'art, de littérature et de création ne sont pas seulement des expressions personnelles — elles sont des témoignages vivants d'une génération remplie de l'Esprit.",
                                    "Nous célébrons chaque talent, chaque vision, chaque création — car tous les ouvrages entrepris avec l'Esprit de Dieu portent une puissance transformatrice.",
                                ].map((text, idx) => (
                                    <motion.p key={idx} variants={itemVariants} className="text-base md:text-lg text-gray-300 font-light leading-relaxed">
                                        {text}
                                    </motion.p>
                                ))}
                            </motion.div>

                            <motion.div variants={itemVariants} className="mt-12 pt-8 border-t border-white/10">
                                <div className="flex items-center justify-center gap-4">
                                    <motion.div
                                        className="h-px bg-gradient-to-r from-transparent to-amber-500/50"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: 48 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: 0.4 }}
                                    />
                                    <span className="text-xs text-amber-400 font-black uppercase tracking-widest">
                                        Inspirés • Créatifs • Impactants
                                    </span>
                                    <motion.div
                                        className="h-px bg-gradient-to-l from-transparent to-amber-500/50"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: 48 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: 0.55 }}
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </section>

                {/* ══════════════════════ GALLERY ══════════════════════ */}
                <section className="py-20 px-4 md:px-8 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/50 to-black pointer-events-none" />

                    <div className="container mx-auto max-w-7xl relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                            {/* Sidebar */}
                            <motion.aside
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ type: 'spring', stiffness: 80, damping: 16, delay: 0.15 }}
                                className="lg:col-span-1"
                            >
                                <div className="sticky top-40 bg-gradient-to-br from-zinc-950 to-black border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:border-amber-500/25 transition-all duration-300">
                                    <h3 className="text-xl font-black text-white mb-6 tracking-tight">Catégories</h3>
                                    <div className="space-y-2">
                                        {categories.map((cat) => {
                                            const Icon = cat.icon;
                                            const isSelected = selectedCategory === cat.id;
                                            return (
                                                <motion.button
                                                    key={cat.id}
                                                    variants={categoryButtonVariants}
                                                    whileHover="hover"
                                                    whileTap="tap"
                                                    onClick={() => setSelectedCategory(cat.id)}
                                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-left group relative overflow-hidden ${isSelected
                                                            ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold shadow-lg shadow-amber-500/25'
                                                            : 'text-gray-300 hover:bg-white/5 hover:text-amber-400 border border-transparent hover:border-amber-500/25'
                                                        }`}
                                                >
                                                    {isSelected && (
                                                        <motion.div
                                                            layoutId="activeCategory"
                                                            className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-xl -z-10"
                                                            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                                                        />
                                                    )}
                                                    <Icon className={`w-5 h-5 shrink-0 transition-transform ${!isSelected ? 'group-hover:scale-110 group-hover:rotate-6' : ''}`} />
                                                    <span className="text-sm font-bold flex-1">{cat.label}</span>
                                                    {isSelected && (
                                                        <motion.div
                                                            initial={{ opacity: 0, x: -8 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                                                        >
                                                            <ChevronRight className="w-4 h-4" />
                                                        </motion.div>
                                                    )}
                                                </motion.button>
                                            );
                                        })}
                                    </div>
                                    <div className="mt-8 pt-6 border-t border-white/10">
                                        <AnimatePresence mode="wait">
                                            <motion.p
                                                key={filteredWorks.length}
                                                initial={{ opacity: 0, y: 6 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -6 }}
                                                transition={{ duration: 0.2 }}
                                                className="text-xs text-gray-500 text-center font-light"
                                            >
                                                {filteredWorks.length} œuvre{filteredWorks.length > 1 ? 's' : ''}
                                            </motion.p>
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </motion.aside>

                            {/* Gallery Grid */}
                            <div className="lg:col-span-4">
                                {/* Section title */}
                                <div className="mb-12">
                                    <AnimatePresence mode="wait">
                                        <motion.h2
                                            key={selectedCategory}
                                            initial={{ opacity: 0, x: -20, filter: 'blur(8px)' }}
                                            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                            exit={{ opacity: 0, x: 20, filter: 'blur(8px)' }}
                                            transition={{ duration: 0.3, ease: 'easeOut' }}
                                            className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tighter"
                                        >
                                            {categories.find(c => c.id === selectedCategory)?.label}
                                        </motion.h2>
                                    </AnimatePresence>
                                    <motion.div
                                        className="h-1 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full origin-left"
                                        variants={underlineVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        style={{ width: 64 }}
                                    />
                                </div>

                                {/*
                                  FIX 1 + 2 combinés :
                                  - AnimatePresence mode="wait" (plus "popLayout") pour attendre
                                    que les anciens items sortent avant d'entrer les nouveaux.
                                  - Le motion.div parent porte les variants et staggerChildren.
                                  - Les WorkCard utilisent variants hérités (pas whileInView).
                                  - Pas de filter:blur sur l'entrée des cards pour éviter les reflows.
                                */}
                                <AnimatePresence mode="wait">
                                    {filteredWorks.length > 0 ? (
                                        <motion.div
                                            key={selectedCategory}
                                            className="grid grid-cols-1 md:grid-cols-2 gap-8"
                                            initial="hidden"
                                            animate="visible"
                                            exit={{ opacity: 0, transition: { duration: 0.15 } }}
                                            variants={{
                                                hidden: { opacity: 0 },
                                                visible: {
                                                    opacity: 1,
                                                    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
                                                },
                                            }}
                                        >
                                            {filteredWorks.map((work, idx) => (
                                                <WorkCard
                                                    key={work.id}
                                                    work={work}
                                                    idx={idx}
                                                    onExpand={setExpandedWork}
                                                    hoveredCard={hoveredCard}
                                                    setHoveredCard={setHoveredCard}
                                                    getYoutubeId={getYoutubeId}
                                                    getYoutubeThumbnail={getYoutubeThumbnail}
                                                    categories={categories}
                                                />
                                            ))}
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="empty"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className="flex flex-col items-center justify-center py-20 text-center"
                                        >
                                            <motion.div variants={spinVariants} animate="animate">
                                                <Palette className="w-16 h-16 text-gray-700 mb-4" />
                                            </motion.div>
                                            <h3 className="text-2xl font-black text-white mb-2">Aucune œuvre trouvée</h3>
                                            <p className="text-gray-500">Sélectionnez une autre catégorie</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* ══════════════════════ MODAL ══════════════════════ */}
            <AnimatePresence mode="wait">
                {expandedWork && (
                    <WorkModal
                        key={expandedWork.id}
                        work={expandedWork}
                        onClose={() => setExpandedWork(null)}
                        categories={categories}
                    />
                )}
            </AnimatePresence>

            <section id="contact" className="py-32 bg-zinc-950">
                <Contact
                    verset={{
                        verset: "toute grâce excellente et tout don parfait descendent d'en haut, du Père des lumières, chez lequel il n'y a ni changement ni ombre de variation.",
                        ref: 'Jacques 1:17',
                    }}
                />
            </section>

            <Footer />
        </div>
    );
};

export default ArtProdige;