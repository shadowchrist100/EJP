import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X, Grid3X3, LayoutList } from 'lucide-react';
import Nav from '../common/Nav';
import Footer from '../common/Footer';
/* ─── SKELETON ──────────────────────────────────────────────────────────────── */
const Skeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
            <div
                key={i}
                className="rounded-2xl overflow-hidden bg-zinc-900"
                style={{ aspectRatio: i % 3 === 1 ? '4/6' : '4/5' }}
            >
                <div className="w-full h-full bg-linear-to-r from-zinc-900 via-zinc-800 to-zinc-900 animate-pulse" />
            </div>
        ))}
    </div>
);

/* ─── CATEGORIES ────────────────────────────────────────────────────────────── */
const categories = [
    { id: 'all',       name: 'Tout',        icon: '✦' },
    { id: 'events',    name: 'Événements',  icon: '◈' },
    { id: 'worship',   name: 'Louange',     icon: '♪' },
    { id: 'community', name: 'Communauté',  icon: '◎' },
];

/* ─── LIGHTBOX ──────────────────────────────────────────────────────────────── */
const Lightbox = ({ image, images, onClose, onPrev, onNext }) => {
    const currentIndex = images.findIndex(img => img.id === image.id);
    const touchStartX  = useRef(null);

    // Lock body scroll while lightbox is open
    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = prev; };
    }, []);

    // Keyboard navigation
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'ArrowLeft')  onPrev();
            if (e.key === 'ArrowRight') onNext();
            if (e.key === 'Escape')     onClose();
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [onPrev, onNext, onClose]);

    // Swipe touch
    const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
    const onTouchEnd   = (e) => {
        if (touchStartX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(delta) > 50) { delta < 0 ? onNext() : onPrev(); }
        touchStartX.current = null;
    };

    return createPortal(
        <div
            className="fixed inset-0 z-9999 flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.97)', top: 0, left: 0, right: 0, bottom: 0 }}
            onClick={onClose}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        >
            {/* Close */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 z-110 w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white/40 hover:text-amber-500 hover:border-amber-500/50 transition-all duration-300"
            >
                <X size={18} strokeWidth={1.5} />
            </button>

            {/* Prev */}
            <button
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-110 w-12 h-12 hidden md:flex items-center justify-center rounded-full border border-white/10 text-white/30 hover:text-amber-500 hover:border-amber-500/50 hover:-translate-x-1 transition-all duration-300 group"
                style={{ transform: 'translateY(-50%)' }}
            >
                <ChevronLeft size={22} strokeWidth={1.5} />
            </button>

            {/* Content */}
            <div
                className="max-w-5xl w-full px-6 flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Image */}
                <div className="relative rounded-2xl overflow-hidden border border-white/[0.07] shadow-[0_0_80px_rgba(217,119,6,0.08)]">
                    <img
                        src={image.url}
                        alt={image.title}
                        className="max-h-[70vh] w-auto object-contain block"
                        style={{ maxWidth: '100%' }}
                    />
                    {/* Subtle amber line at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-amber-500/60 to-transparent" />
                </div>

                {/* Meta */}
                <div className="mt-8 text-center">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <div className="w-6 h-px bg-amber-600/60" />
                        <span className="text-amber-500/80 text-[9px] font-black tracking-[0.5em] uppercase">
                            {categories.find(c => c.id === image.category)?.name}
                        </span>
                        <div className="w-6 h-px bg-amber-600/60" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase">
                        {image.title}
                    </h2>
                    {image.description && (
                        <p className="text-gray-500 mt-3 text-sm font-light max-w-md mx-auto leading-relaxed">
                            {image.description}
                        </p>
                    )}
                    <p className="text-zinc-700 mt-5 text-[10px] font-black tracking-[0.4em] uppercase">
                        {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
                    </p>
                </div>

                {/* Mobile nav dots */}
                <div className="flex gap-1.5 mt-6 md:hidden">
                    {images.map((_, i) => (
                        <div
                            key={i}
                            className={`w-1 h-1 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-amber-500 w-4' : 'bg-white/20'}`}
                        />
                    ))}
                </div>
            </div>

            {/* Next */}
            <button
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-[110] w-12 h-12 hidden md:flex items-center justify-center rounded-full border border-white/10 text-white/30 hover:text-amber-500 hover:border-amber-500/50 hover:translate-x-1 transition-all duration-300"
                style={{ transform: 'translateY(-50%)' }}
            >
                <ChevronRight size={22} strokeWidth={1.5} />
            </button>
        </div>,
        document.body
    );
};

/* ─── CARD ──────────────────────────────────────────────────────────────────── */
const Card = ({ image, index, onClick, catName }) => {
    // Alternate aspect ratios for visual rhythm
    const aspects = ['aspect-[4/5]', 'aspect-[4/6]', 'aspect-[4/5]', 'aspect-square', 'aspect-[4/5]', 'aspect-[4/6]'];
    const aspect  = aspects[index % aspects.length];

    return (
        <div
            className={`group relative ${aspect} overflow-hidden rounded-2xl cursor-pointer bg-zinc-900/80 border border-white/[0.04] hover:border-amber-500/20 transition-all duration-700`}
            style={{
                animationDelay: `${index * 60}ms`,
                animation: 'fadeSlideUp 0.6s ease forwards',
                opacity: 0,
            }}
            onClick={() => onClick(image)}
        >
            {/* Image */}
            <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-1200 group-hover:scale-105 grayscale-[0.4] group-hover:grayscale-0"
                loading="lazy"
            />

            {/* Hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ boxShadow: 'inset 0 0 60px rgba(217,119,6,0.06)' }} />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/10 to-transparent opacity-70 group-hover:opacity-95 transition-opacity duration-500" />

            {/* Top accent line on hover */}
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-amber-500/0 to-transparent group-hover:via-amber-500/70 transition-all duration-700" />

            {/* Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-amber-500/80 text-[8px] font-black tracking-[0.4em] uppercase mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {catName}
                </span>
                <h3 className="text-lg font-black text-white tracking-tight uppercase leading-tight">
                    {image.title}
                </h3>
                {image.date && (
                    <p className="text-gray-600 text-[9px] tracking-widest mt-1.5 font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ transitionDelay: '50ms' }}>
                        {image.date}
                    </p>
                )}
            </div>

            {/* Index marker */}
            <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-black/60 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[8px] text-amber-500 font-black">
                    {String(index + 1).padStart(2, '0')}
                </span>
            </div>
        </div>
    );
};

/* ─── GALERIE ───────────────────────────────────────────────────────────────── */
const Galerie = () => {
    const [images, setImages]           = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [filter, setFilter]           = useState('all');
    const [loading, setLoading]         = useState(true);
    const [viewMode, setViewMode]       = useState('grid'); // grid | list

    useEffect(() => {
        fetch('/data/image.json')
            .then(r => r.json())
            .then(data => { setImages(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const filteredImages = Array.isArray(images)
        ? (filter === 'all' ? images : images.filter(img => img.category === filter))
        : [];

    const goToPrevious = useCallback(() => {
        const idx = filteredImages.findIndex(img => img.id === selectedImage.id);
        setSelectedImage(filteredImages[idx > 0 ? idx - 1 : filteredImages.length - 1]);
    }, [filteredImages, selectedImage]);

    const goToNext = useCallback(() => {
        const idx = filteredImages.findIndex(img => img.id === selectedImage.id);
        setSelectedImage(filteredImages[idx < filteredImages.length - 1 ? idx + 1 : 0]);
    }, [filteredImages, selectedImage]);

    const counts = categories.reduce((acc, cat) => {
        acc[cat.id] = cat.id === 'all'
            ? images.length
            : images.filter(img => img.category === cat.id).length;
        return acc;
    }, {});

    return (
        <>
            <style>{`
                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes shimmer {
                    0%   { background-position: -200% center; }
                    100% { background-position:  200% center; }
                }
                .shimmer-text {
                    background: linear-gradient(90deg, #d97706 0%, #fef3c7 40%, #d97706 80%);
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: shimmer 4s linear infinite;
                }
            `}</style>

            <section className="min-h-screen bg-black text-gray-300 selection:bg-amber-500/30">

                {/* ── Fixed Nav ─────────────────────────────────────────────── */}
                <header className="fixed top-0 right-0 left-0 z-50">
                    <Nav />
                </header>

                {/* ── Hero ──────────────────────────────────────────────────── */}
                <div className="relative pt-48 pb-28 px-4 overflow-hidden">
                    {/* Ambient glows */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-600/8 rounded-full blur-[140px] animate-pulse" />
                        <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-yellow-700/5 rounded-full blur-[100px]" />
                        {/* Diagonal grain line */}
                        <div className="absolute inset-0 opacity-[0.02]"
                            style={{ backgroundImage: 'repeating-linear-gradient(45deg, #d97706 0, #d97706 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
                    </div>

                    <div className="container mx-auto text-center relative z-10">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <div className="w-12 h-px bg-amber-600/40" />
                            <span className="text-amber-500/70 font-black tracking-[0.5em] uppercase text-[9px]">Archives Visuelles</span>
                            <div className="w-12 h-px bg-amber-600/40" />
                        </div>

                        <h1 className="text-6xl md:text-9xl font-black text-white mb-6 tracking-tighter uppercase leading-none">
                            Notre{' '}
                            <span className="shimmer-text">Galerie</span>
                        </h1>

                        <p className="text-base md:text-lg text-gray-600 max-w-xl mx-auto font-light leading-relaxed">
                            Chaque image raconte une histoire de foi, d'impact et de transformation au sein de notre communauté.
                        </p>

                        {/* Stats row */}
                        <div className="flex items-center justify-center gap-8 mt-12">
                            {[
                                { label: 'Photos',     value: images.length },
                                { label: 'Catégories', value: categories.length - 1 },
                                { label: 'Années',     value: '3+' },
                            ].map(({ label, value }) => (
                                <div key={label} className="text-center">
                                    <p className="text-2xl font-black text-white tracking-tighter">{value}</p>
                                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-600 mt-0.5">{label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Filters + View Toggle ──────────────────────────────────── */}
                <div className="container mx-auto px-6 mb-16">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        {/* Category pills */}
                        <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setFilter(cat.id)}
                                    className={`
                                        group relative px-6 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest
                                        transition-all duration-400 border overflow-hidden
                                        ${filter === cat.id
                                            ? 'bg-amber-600 border-amber-500 text-black shadow-lg shadow-amber-600/20'
                                            : 'bg-zinc-900/60 border-white/[0.06] text-gray-500 hover:border-amber-500/30 hover:text-gray-300'
                                        }
                                    `}
                                >
                                    <span className="mr-1.5 opacity-60">{cat.icon}</span>
                                    {cat.name}
                                    {counts[cat.id] > 0 && (
                                        <span className={`ml-2 text-[8px] ${filter === cat.id ? 'text-black/60' : 'text-amber-600/60'}`}>
                                            {counts[cat.id]}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* View mode toggle */}
                        <div className="flex items-center gap-1 bg-zinc-900/60 border border-white/[0.06] rounded-full p-1">
                            {[
                                { mode: 'grid', Icon: Grid3X3 },
                                { mode: 'list', Icon: LayoutList },
                            ].map(({ mode, Icon }) => (
                                <button
                                    key={mode}
                                    onClick={() => setViewMode(mode)}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${viewMode === mode ? 'bg-amber-600 text-black' : 'text-gray-600 hover:text-gray-300'}`}
                                >
                                    <Icon size={13} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Results count */}
                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-700 mt-5">
                        {filteredImages.length} résultat{filteredImages.length !== 1 ? 's' : ''} — {categories.find(c => c.id === filter)?.name}
                    </p>
                </div>

                {/* ── Gallery Grid ───────────────────────────────────────────── */}
                <div className="container mx-auto px-6 pb-32 max-w-[1600px]">
                    {loading ? (
                        <Skeleton />
                    ) : filteredImages.length === 0 ? (
                        <div className="text-center py-32">
                            <p className="text-6xl mb-4 opacity-20">◎</p>
                            <p className="text-gray-700 font-bold uppercase tracking-widest text-xs">Aucune image</p>
                        </div>
                    ) : viewMode === 'grid' ? (
                        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                            {console.log(filteredImages)
                            }
                            {filteredImages.map((image, index) => (
                                <div key={image.id} className="break-inside-avoid">
                                    {console.log(image)}
                                    <Card
                                        image={image}
                                        index={index}
                                        onClick={setSelectedImage}
                                        catName={categories.find(c => c.id === image.category)?.name}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* List view */
                        <div className="flex flex-col gap-3 max-w-3xl mx-auto">
                            {filteredImages.map((image, index) => (
                                <div
                                    key={image.id}
                                    className="group flex items-center gap-5 p-4 rounded-xl border border-white/5 hover:border-amber-500/20 bg-zinc-900/30 hover:bg-zinc-900/60 cursor-pointer transition-all duration-300"
                                    style={{ animation: 'fadeSlideUp 0.4s ease forwards', animationDelay: `${index * 40}ms`, opacity: 0 }}
                                    onClick={() => setSelectedImage(image)}
                                >
                                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/6">
                                        <img src={image.url} alt={image.title} className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-500" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-amber-500/70 text-[8px] font-black tracking-[0.4em] uppercase mb-1">
                                            {categories.find(c => c.id === image.category)?.name}
                                        </p>
                                        <h3 className="text-white font-black uppercase tracking-tight text-sm truncate">{image.title}</h3>
                                        {image.date && <p className="text-gray-700 text-[9px] mt-1 tracking-widest font-bold uppercase">{image.date}</p>}
                                    </div>
                                    <span className="text-[9px] font-black text-zinc-700 group-hover:text-amber-600 transition-colors tracking-widest">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* ── Lightbox ───────────────────────────────────────────────── */}
                {selectedImage && (
                    <Lightbox
                        image={selectedImage}
                        images={filteredImages}
                        onClose={() => setSelectedImage(null)}
                        onPrev={goToPrevious}
                        onNext={goToNext}
                    />
                )}
            <Footer/>

            </section>
        </>
    );
};

export default Galerie;