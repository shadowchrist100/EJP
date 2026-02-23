import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const Nav = () => (
    <nav className="bg-black/90 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6 py-5">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-black text-white tracking-tighter uppercase">
                    EJP<span className="text-amber-500">.</span>GALLERY
                </h1>
                <div className="flex gap-8">
                    {['Home', 'About', 'Contact'].map((item) => (
                        <a key={item} href={`/#${item.toLowerCase()}`}
                            className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-amber-500 transition-colors">
                            {item}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    </nav>
);

const Galerie = () => {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/data/image.json")
            .then(response => response.json())
            .then(data => {
                setImages(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const filteredImages = Array.isArray(images)
        ? (filter === 'all' ? images : images.filter(img => img.category === filter))
        : [];

    const categories = [
        { id: 'all', name: 'Tout', icon: '✨' },
        { id: 'events', name: 'Événements', icon: '🎉' },
        { id: 'worship', name: 'Louange', icon: '🎵' },
        { id: 'community', name: 'Communauté', icon: '👥' },
    ];

    const goToPrevious = () => {
        const currentIndex = filteredImages.findIndex((image) => image.id === selectedImage.id);
        const newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
        setSelectedImage(filteredImages[newIndex]);
    };

    const goToNext = () => {
        const currentIndex = filteredImages.findIndex((image) => image.id === selectedImage.id);
        const newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
        setSelectedImage(filteredImages[newIndex]);
    };

    return (
        <section className="min-h-screen bg-black text-gray-300 selection:bg-amber-500/30">
            <header className="fixed top-0 right-0 left-0 z-50">
                <Nav />
            </header>

            {/* Hero Section - Style STAR */}
            <div className="relative pt-48 pb-24 px-4 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-yellow-600/5 rounded-full blur-[100px]" />
                </div>

                <div className="container mx-auto text-center relative z-10">
                    <span className="text-amber-500 font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">
                        Archives Visuelles
                    </span>
                    <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter uppercase leading-none">
                        Notre <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-700">Galerie</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
                        Chaque image raconte une histoire de foi, d'impact et de transformation au sein de notre communauté.
                    </p>
                </div>
            </div>

            {/* Filter Tabs - Style Pills Premium */}
            <div className="container mx-auto px-4 mb-20">
                <div className="flex flex-wrap justify-center gap-3">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setFilter(cat.id)}
                            className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 border ${filter === cat.id
                                    ? 'bg-amber-600 border-amber-500 text-black shadow-lg shadow-amber-600/20 scale-105'
                                    : 'bg-zinc-900/50 border-white/5 text-gray-500 hover:border-amber-500/50 hover:text-white'
                                }`}
                        >
                            <span className="mr-2 opacity-70">{cat.icon}</span>
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Gallery Grid - Largeur Augmentée */}
            <div className="container mx-auto px-6 pb-32 max-w-[1550px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredImages.map((image) => (
                        <div
                            key={image.id}
                            className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] cursor-pointer bg-zinc-900 border border-white/5"
                            onClick={() => setSelectedImage(image)}
                        >
                            <img
                                src={image.url}
                                alt={image.title}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0"
                            />

                            {/* Overlay Style Ministère */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                            <div className="absolute inset-0 p-8 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <span className="text-amber-500 text-[9px] font-black tracking-[0.3em] uppercase mb-2">
                                    {categories.find(c => c.id === image.category)?.name}
                                </span>
                                <h3 className="text-2xl font-bold text-white tracking-tight">
                                    {image.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox - Harmonisée */}
            {selectedImage && (
                <div className="fixed inset-0 bg-black/98 z-[100] flex items-center justify-center p-6 backdrop-blur-sm" onClick={() => setSelectedImage(null)}>
                    <button className="absolute top-8 right-8 text-white/50 hover:text-amber-500 transition-colors z-[110]">
                        <X size={40} strokeWidth={1} />
                    </button>

                    <button onClick={(e) => { e.stopPropagation(); goToPrevious(); }} className="absolute left-8 top-1/2 -translate-y-1/2 text-white/20 hover:text-amber-500 transition-all hidden md:block">
                        <ChevronLeft size={60} strokeWidth={1} />
                    </button>

                    <div className="max-w-6xl w-full flex flex-col items-center" onClick={e => e.stopPropagation()}>
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-amber-900/10">
                            <img src={selectedImage.url} alt={selectedImage.title} className="max-h-[75vh] object-contain" />
                        </div>

                        <div className="mt-8 text-center">
                            <span className="text-amber-500 text-[10px] font-black tracking-[0.5em] uppercase">
                                {categories.find(c => c.id === selectedImage.category)?.name}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 tracking-tighter">{selectedImage.title}</h2>
                            <p className="text-gray-600 mt-4 text-sm font-bold tracking-widest">
                                {filteredImages.findIndex(img => img.id === selectedImage.id) + 1} / {filteredImages.length}
                            </p>
                        </div>
                    </div>

                    <button onClick={(e) => { e.stopPropagation(); goToNext(); }} className="absolute right-8 top-1/2 -translate-y-1/2 text-white/20 hover:text-amber-500 transition-all hidden md:block">
                        <ChevronRight size={60} strokeWidth={1} />
                    </button>
                </div>
            )}
        </section>
    );
};

export default Galerie;