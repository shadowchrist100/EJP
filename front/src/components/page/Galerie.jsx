import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Grid3X3, LayoutList } from 'lucide-react';
import { Nav, Footer, Contact } from '../';

/* ─── VARIANTS D'ANIMATION ─────────────────────────────────────────────────── */

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: 'spring', stiffness: 100, damping: 15 }
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
};

const lightboxVariants = {
    overlay: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
};

/* ─── COMPONENTS ANIMÉS ────────────────────────────────────────────────────── */

const Lightbox = ({ image, images, onClose, onPrev, onNext }) => {
    const currentIndex = images.findIndex(img => img.id === image.id);

    return createPortal(
        <motion.div
            variants={lightboxVariants}
            initial="overlay"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-9999 flex items-center justify-center bg-black/95 backdrop-blur-xl"
            onClick={onClose}
        >
            {/* Bouton Fermer avec rotation */}
            <motion.button
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                onClick={onClose}
                className="absolute top-8 right-8 z-110 text-white/50 hover:text-amber-500 transition-colors"
            >
                <X size={32} />
            </motion.button>

            {/* Navigation Buttons */}
            <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                <motion.button
                    whileHover={{ scale: 1.1, x: -5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => { e.stopPropagation(); onPrev(); }}
                    className="p-4 rounded-full bg-white/5 border border-white/10 text-white pointer-events-auto"
                >
                    <ChevronLeft size={24} />
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.1, x: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => { e.stopPropagation(); onNext(); }}
                    className="p-4 rounded-full bg-white/5 border border-white/10 text-white pointer-events-auto"
                >
                    <ChevronRight size={24} />
                </motion.button>
            </div>

            {/* Content Container */}
            <div className="max-w-5xl w-full px-6 flex flex-col items-center" onClick={e => e.stopPropagation()}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={image.id}
                        initial={{ opacity: 0, x: 20, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -20, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="relative"
                    >
                        <img
                            src={image.url}
                            alt={image.title}
                            className="max-h-[65vh] rounded-2xl shadow-2xl border border-white/10"
                        />
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            className="absolute -bottom-4 left-0 h-1 bg-amber-500"
                        />
                    </motion.div>
                </AnimatePresence>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-12 text-center"
                >
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">{image.title}</h2>
                    <p className="text-amber-500 text-[10px] font-black tracking-[0.4em] uppercase mt-2">
                        {currentIndex + 1} / {images.length}
                    </p>
                </motion.div>
            </div>
        </motion.div>,
        document.body
    );
};

const Card = ({ image, index, onClick, catName }) => {
    const aspects = ['aspect-[4/5]', 'aspect-[4/6]', 'aspect-[4/5]', 'aspect-square'];
    const aspect = aspects[index % aspects.length];

    return (
        <motion.div
            layout // Magie Framer Motion : anime la position automatiquement
            variants={cardVariants}
            whileHover={{ y: -10 }}
            onClick={() => onClick(image)}
            className={`group relative ${aspect} overflow-hidden rounded-3xl cursor-pointer bg-zinc-900 border border-white/5 shadow-xl`}
        >
            <motion.img
                layoutId={`img-${image.id}`}
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
            />

            {/* Overlay Progressif */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="text-amber-500 text-[9px] font-black tracking-widest uppercase mb-2"
                >
                    {catName}
                </motion.span>
                <h3 className="text-xl font-black text-white uppercase leading-none transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {image.title}
                </h3>
            </div>
        </motion.div>
    );
};

/* ─── MAIN GALERIE ─────────────────────────────────────────────────────────── */

const Galerie = () => {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [filter, setFilter] = useState('all');
    const [viewMode, setViewMode] = useState('grid');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulation de fetch
        fetch('/data/image.json')
            .then(r => r.json())
            .then(data => { setImages(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const filteredImages = filter === 'all' ? images : images.filter(img => img.category === filter);

    return (
        <section className="min-h-screen bg-black text-gray-300">
            <header className="fixed top-0 w-full z-50"><Nav /></header>

            {/* Hero Section Animée */}
            <div className="relative pt-48 pb-20 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="container mx-auto text-center relative z-10"
                >
                    <motion.h1
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                        className="text-7xl md:text-[10rem] font-black text-white tracking-tighter uppercase leading-none mb-6"
                    >
                        Notre <span className="text-amber-600 italic">Galerie</span>
                    </motion.h1>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                        Chaque image raconte une histoire de foi et d'impact.
                    </p>
                </motion.div>
            </div>

            {/* Navigation & Filtres */}
            <div className="container mx-auto px-6 mb-12 flex flex-col md:flex-row justify-between items-center gap-8">
                <LayoutGroup>
                    <div className="flex gap-2 bg-zinc-900/50 p-1.5 rounded-full border border-white/5">
                        {['all', 'events', 'worship', 'community'].map((catId) => (
                            <button
                                key={catId}
                                onClick={() => setFilter(catId)}
                                className={`relative px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors ${filter === catId ? 'text-black' : 'text-gray-500 hover:text-white'}`}
                            >
                                {filter === catId && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-amber-500 rounded-full"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">
                                    {catId === 'all' ? 'Tout' : catId}
                                </span>
                            </button>
                        ))}
                    </div>
                </LayoutGroup>

                <div className="flex gap-2">
                    <button onClick={() => setViewMode('grid')} className={`p-3 rounded-xl ${viewMode === 'grid' ? 'bg-amber-500 text-black' : 'bg-zinc-900 text-white'}`}>
                        <Grid3X3 size={18} />
                    </button>
                    <button onClick={() => setViewMode('list')} className={`p-3 rounded-xl ${viewMode === 'list' ? 'bg-amber-500 text-black' : 'bg-zinc-900 text-white'}`}>
                        <LayoutList size={18} />
                    </button>
                </div>
            </div>

            {/* Grille Principale */}
            <div className="container mx-auto px-6 pb-32">
                <motion.div
                    layout
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className={viewMode === 'grid'
                        ? "columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8"
                        : "flex flex-col gap-4 max-w-4xl mx-auto"
                    }
                >
                    <AnimatePresence>
                        {filteredImages.map((image, index) => (
                            <Card
                                key={image.id}
                                image={image}
                                index={index}
                                catName={image.category}
                                onClick={setSelectedImage}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Lightbox Animée */}
            <AnimatePresence>
                {selectedImage && (
                    <Lightbox
                        image={selectedImage}
                        images={filteredImages}
                        onClose={() => setSelectedImage(null)}
                        onPrev={() => {/* logic */ }}
                        onNext={() => {/* logic */ }}
                    />
                )}
            </AnimatePresence>

            {/* <Contact /> */}
            <Footer />
        </section>
    );
};

export default Galerie;