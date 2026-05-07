import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, LayoutGroup, useScroll, useSpring, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Grid3X3, LayoutList } from 'lucide-react';
import { Nav, Footer, Contact } from '../';

/* ─── VARIANTS ─────────────────────────────────────────────────────────────── */

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07 } }
};

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.93, filter: 'blur(6px)' },
    visible: {
        opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
        transition: { type: 'spring', stiffness: 90, damping: 14 }
    },
    exit: { opacity: 0, scale: 0.88, filter: 'blur(4px)', transition: { duration: 0.25 } }
};

/* ─── LIGHTBOX ─────────────────────────────────────────────────────────────── */

const Lightbox = ({ image, images, onClose, onPrev, onNext }) => {
    const currentIndex = images.findIndex(img => img.id === image.id);

    /* Keyboard navigation */
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape')     onClose();
            if (e.key === 'ArrowLeft')  onPrev();
            if (e.key === 'ArrowRight') onNext();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onClose, onPrev, onNext]);

    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-xl"
            onClick={onClose}
        >
            {/* Grain overlay décoratif */}
            <div className="absolute inset-0 pointer-events-none opacity-30"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")" }}
            />

            {/* Croix avec rotation spring */}
            <motion.button
                initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.15 }}
                whileHover={{ rotate: 90, scale: 1.1, color: '#f59e0b' }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-4 right-4 sm:top-8 sm:right-8 z-[10000] text-white/50 transition-colors"
            >
                <X size={28} className="sm:w-8 sm:h-8" />
            </motion.button>

            {/* Boutons nav — glissent depuis les côtés */}
            {[
                { side: 'left',  icon: <ChevronLeft size={20} />,  action: onPrev, hover: { x: -5 } },
                { side: 'right', icon: <ChevronRight size={20} />, action: onNext, hover: { x:  5 } },
            ].map(({ side, icon, action, hover }) => (
                <motion.button
                    key={side}
                    initial={{ opacity: 0, x: side === 'left' ? -30 : 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    whileHover={{ scale: 1.15, ...hover, backgroundColor: 'rgba(245,158,11,0.15)', borderColor: 'rgba(245,158,11,0.4)' }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => { e.stopPropagation(); action(); }}
                    className={`absolute top-1/2 -translate-y-1/2 ${side === 'left' ? 'left-2 sm:left-8' : 'right-2 sm:right-8'} p-3 sm:p-4 rounded-full bg-white/5 border border-white/10 text-white transition-colors z-20`}
                >
                    {icon}
                </motion.button>
            ))}

            {/* Image + barre + meta */}
            <div className="max-w-5xl w-full px-4 sm:px-12 md:px-24 flex flex-col items-center" onClick={e => e.stopPropagation()}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={image.id}
                        initial={{ opacity: 0, x: 40, scale: 0.94, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, x: 0, scale: 1,    filter: 'blur(0px)' }}
                        exit={{    opacity: 0, x: -40, scale: 0.94, filter: 'blur(8px)' }}
                        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                        className="relative"
                    >
                        <img
                            src={image.url}
                            alt={image.title}
                            className="max-h-[65vh] rounded-2xl shadow-2xl border border-white/10"
                        />
                        {/* Barre dorée qui se dessine */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                            className="absolute -bottom-4 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600 origin-left"
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Titre + compteur */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="mt-12 text-center"
                >
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">{image.title}</h2>

                    {/* Dots de progression */}
                    <div className="flex items-center justify-center gap-2 mt-4">
                        {images.map((_, i) => (
                            <motion.div
                                key={i}
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
                </motion.div>
            </div>
        </motion.div>,
        document.body
    );
};

/* ─── CARD ─────────────────────────────────────────────────────────────────── */

const Card = ({ image, index, onClick, catName, viewMode }) => {
    const aspects = ['aspect-[4/5]', 'aspect-[4/6]', 'aspect-[4/5]', 'aspect-square'];
    const aspect = viewMode === 'list' ? 'aspect-[16/6]' : aspects[index % aspects.length];
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            layout
            variants={cardVariants}
            whileHover={{ y: viewMode === 'grid' ? -10 : -4 }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            onClick={() => onClick(image)}
            className={`group relative ${aspect} overflow-hidden rounded-3xl cursor-pointer bg-zinc-900 border border-white/5 shadow-xl`}
            style={{ breakInside: 'avoid' }}
        >
            {/* Image avec zoom fluide au hover */}
            <motion.img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover"
                animate={{ scale: hovered ? 1.08 : 1, filter: hovered ? 'brightness(1.1)' : 'brightness(0.85)' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Overlay qui s'intensifie */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"
                animate={{ opacity: hovered ? 0.85 : 0.55 }}
                transition={{ duration: 0.4 }}
            />

            {/* Ligne ambrée du bas — draw on hover */}
            <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-amber-500 to-yellow-400 origin-left"
                animate={{ scaleX: hovered ? 1 : 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
            />

            {/* Contenu */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                {/* Badge catégorie — glisse depuis la gauche */}
                <motion.span
                    animate={{ x: hovered ? 0 : -8, opacity: hovered ? 1 : 0.7 }}
                    transition={{ duration: 0.35 }}
                    className="text-amber-500 text-[9px] font-black tracking-widest uppercase mb-2"
                >
                    {catName}
                </motion.span>

                {/* Titre — remonte au hover */}
                <motion.h3
                    animate={{ y: hovered ? 0 : 12, opacity: hovered ? 1 : 0.8 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="text-xl font-black text-white uppercase leading-none"
                >
                    {image.title}
                </motion.h3>

                {/* "Voir" — apparaît seulement au hover */}
                <motion.div
                    animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
                    transition={{ duration: 0.3, delay: hovered ? 0.05 : 0 }}
                    className="flex items-center gap-2 mt-3"
                >
                    <span className="text-amber-400 text-[9px] font-black tracking-[0.3em] uppercase">Voir</span>
                    <motion.div
                        animate={{ x: hovered ? 4 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-4 h-px bg-amber-400"
                    />
                </motion.div>
            </div>

            {/* Numéro décoratif — tourne à 45° */}
            <motion.span
                animate={{ rotate: hovered ? 45 : 0, opacity: hovered ? 0.15 : 0.05 }}
                transition={{ duration: 0.5 }}
                className="absolute top-4 right-4 font-black text-5xl text-white leading-none select-none"
            >
                {String(index + 1).padStart(2, '0')}
            </motion.span>
        </motion.div>
    );
};

/* ─── HERO PARALLAX ────────────────────────────────────────────────────────── */

const HeroSection = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
    const y       = useTransform(scrollYProgress, [0, 1], [0, 120]);
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    const words = ['Notre', 'Galerie'];

    return (
        <div ref={ref} className="relative pt-48 pb-20 px-4 overflow-hidden">
            {/* Orbes flottants */}
            {[
                { top: '-10%', right: '-5%', size: 400, color: 'bg-amber-500/10', delay: 0 },
                { top: '30%',  left: '-8%',  size: 300, color: 'bg-yellow-500/6', delay: 1.5 },
            ].map(({ top, right, left, size, color, delay }, i) => (
                <motion.div
                    key={i}
                    animate={{ y: [0, -25, 0], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 7 + i * 2, repeat: Infinity, ease: 'easeInOut', delay }}
                    className={`absolute ${color} rounded-full blur-3xl pointer-events-none`}
                    style={{ top, right, left, width: size, height: size }}
                />
            ))}

            <motion.div
                style={{ y, opacity }}
                className="container mx-auto text-center relative z-10"
            >
                {/* Titre mot par mot */}
                <div className="overflow-hidden mb-6">
                    {words.map((word, wi) => (
                        <motion.span
                            key={word}
                            initial={{ y: 120, rotateX: -45, opacity: 0 }}
                            animate={{ y: 0, rotateX: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: wi * 0.18, ease: [0.16, 1, 0.3, 1] }}
                            style={{ perspective: 800, display: 'inline-block', marginRight: '0.3em' }}
                            className={`text-5xl sm:text-7xl md:text-[10rem] font-black tracking-tighter uppercase leading-none ${wi === 1 ? 'text-amber-600 italic' : 'text-white'}`}
                        >
                            {word}
                        </motion.span>
                    ))}
                </div>

                {/* Sous-titre blur reveal */}
                <motion.p
                    initial={{ opacity: 0, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 1.2, delay: 0.5 }}
                    className="text-gray-500 max-w-2xl mx-auto text-lg font-light leading-relaxed"
                >
                    Chaque image raconte une histoire de foi et d'impact.
                </motion.p>

                {/* Ligne décorative animée */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
                    className="w-24 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-8 origin-center"
                />
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
        className="container mx-auto px-6 mb-12 flex flex-col md:flex-row justify-between items-center gap-8"
    >
        {/* Filtres avec sliding pill */}
        <LayoutGroup>
            <div className="flex flex-wrap justify-center gap-1 sm:gap-2 bg-zinc-900/60 p-1 sm:p-1.5 rounded-2xl sm:rounded-full border border-white/5 backdrop-blur-sm">
                {categories.map(({ id, label }) => (
                    <motion.button
                        key={id}
                        onClick={() => setFilter(id)}
                        whileTap={{ scale: 0.95 }}
                        className={`relative px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-colors ${filter === id ? 'text-black' : 'text-gray-500 hover:text-white'}`}
                    >
                        {filter === id && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-amber-500 rounded-full"
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
                { mode: 'grid', icon: <Grid3X3 size={18} /> },
                { mode: 'list', icon: <LayoutList size={18} /> },
            ].map(({ mode, icon }) => (
                <motion.button
                    key={mode}
                    onClick={() => setViewMode(mode)}
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
    const [filter, setFilter] = useState('all');
    const [viewMode, setViewMode] = useState('grid');
    const [loading, setLoading] = useState(true);

    /* Barre de progression scroll */
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    useEffect(() => {
        fetch('/data/image.json')
            .then(r => r.json())
            .then(data => { setImages(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const filteredImages = filter === 'all' ? images : images.filter(img => img.category === filter);

    const currentIndex = selectedImage ? filteredImages.findIndex(img => img.id === selectedImage.id) : -1;
    const handlePrev = () => {
        if (currentIndex > 0) setSelectedImage(filteredImages[currentIndex - 1]);
    };
    const handleNext = () => {
        if (currentIndex < filteredImages.length - 1) setSelectedImage(filteredImages[currentIndex + 1]);
    };

    return (
        <section className="min-h-screen bg-black text-gray-300 overflow-x-hidden">

            {/* Barre de progression */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600 origin-left z-[100]"
                style={{ scaleX }}
            />

            <header className="fixed top-0 w-full z-50"><Nav /></header>

            <HeroSection />

            <FilterBar
                filter={filter}       setFilter={setFilter}
                viewMode={viewMode}   setViewMode={setViewMode}
            />

            {/* Grille */}
            <div className="container mx-auto px-6 pb-32">
                {loading ? (
                    <Skeleton />
                ) : (
                    <motion.div
                        layout
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className={viewMode === 'grid'
                            ? 'columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8'
                            : 'flex flex-col gap-4 max-w-4xl mx-auto'
                        }
                    >
                        <AnimatePresence>
                            {filteredImages.map((image, index) => (
                                <Card
                                    key={image.id}
                                    image={image}
                                    index={index}
                                    catName={image.category}
                                    viewMode={viewMode}
                                    onClick={setSelectedImage}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>
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
            <AnimatePresence>
                {selectedImage && (
                    <Lightbox
                        image={selectedImage}
                        images={filteredImages}
                        onClose={() => setSelectedImage(null)}
                        onPrev={handlePrev}
                        onNext={handleNext}
                    />
                )}
            </AnimatePresence>

            <Footer />
        </section>
    );
};

export default Galerie;