import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Nav = () => (
    <nav className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    EJP Gallery
                </h1>
                <div className="flex gap-6">
                    <a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a>
                    <a href="/#apropos" className="text-gray-300 hover:text-white transition-colors">About</a>
                    <a href="/#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
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
        fetch("/data/image.json") // Assure-toi que le fichier est dans 'public/data/image.json'
            .then(response => response.json())
            .then(data => {
                setImages(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Erreur de chargement:", error);
                setLoading(false);
            });
    }, []);

    const filteredImages = Array.isArray(images)
        ? (filter === 'all' ? images : images.filter(img => img.category === filter))
        : [];

    const categories = [
        { id: 'all', name: 'Tout', icon: '🌟' },
        { id: 'events', name: 'Événements', icon: '🎉' },
        { id: 'worship', name: 'Louange', icon: '🎵' },
        { id: 'community', name: 'Communauté', icon: '👥' },
    ];

    const goToPrevious = () => {
        if (!selectedImage) return;

        const currentIndex = filteredImages.findIndex((image) => image.id === selectedImage.id);
        const newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;

        setSelectedImage(filteredImages[newIndex]);
    };

    const goToNext = () => {
        if (!selectedImage) return;

        const currentIndex = filteredImages.findIndex((image) => image.id === selectedImage.id);
        const newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;

        setSelectedImage(filteredImages[newIndex]);
    };

    // Raccourcis clavier
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!selectedImage) return;

            if (e.key === 'ArrowLeft') {
                goToPrevious();
            } else if (e.key === 'ArrowRight') {
                goToNext();
            } else if (e.key === 'Escape') {
                setSelectedImage(null);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImage, filteredImages]);

    if (loading) return <div className="text-white text-center mt-20">Chargement...</div>;

    return (
        <section className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950">
            <header className="fixed top-0 right-0 left-0 z-50">
                <Nav />
            </header>

            {/* Hero Section */}
            <div className="relative pt-32 pb-20 px-4 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 rounded-full blur-3xl animate-pulse"></div>
                </div>

                <div className="container mx-auto text-center relative z-10">
                    <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                        Notre Galerie
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Découvrez les moments forts de notre communauté à travers ces images inspirantes
                    </p>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="container mx-auto px-4 mb-12">
                <div className="flex flex-wrap justify-center gap-4">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setFilter(cat.id)}
                            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${filter === cat.id
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50 scale-105'
                                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-800 hover:scale-105'
                                }`}
                        >
                            <span className="mr-2">{cat.icon}</span>
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Gallery Grid */}
            <div className="container mx-auto px-4 pb-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredImages.map((image, index) => (
                        <div
                            key={image.id}
                            className="group relative overflow-hidden rounded-2xl cursor-pointer transform transition-all duration-500 hover:scale-105 hover:rotate-1"
                            style={{
                                animationDelay: `${index * 100}ms`,
                                animation: 'fadeInUp 0.6s ease-out forwards',
                                opacity: 0
                            }}
                            onClick={() => setSelectedImage(image)}
                        >
                            {/* Image Container */}
                            <div className="aspect-video overflow-hidden bg-gray-800">
                                <img
                                    src={image.url}
                                    alt={image.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            {/* Text Overlay */}
                            <div className="absolute bottom-3 left-0 right-0 p-6 translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                                <h3 className="text-white text-xl font-bold mb-2">{image.title}</h3>
                                <div className="flex items-center gap-2">
                                    <span className="px-3 py-1 bg-purple-500/80 backdrop-blur-sm rounded-full text-xs text-white font-semibold">
                                        {categories.find(c => c.id === image.category)?.name}
                                    </span>
                                </div>
                            </div>

                            {/* Corner Accent */}
                            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tr-lg"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 md:p-8"
                    onClick={() => setSelectedImage(null)}
                >
                    {/* Bouton Fermer - Utilisation d'une icône pour plus de style */}
                    <button
                        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 p-2"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(null);
                        }}
                    >
                        <span className="text-4xl font-light">×</span>
                    </button>

                    {/* Navigation - Masquée sur mobile pour éviter l'encombrement, ou centrée verticalement */}
                    <button
                        onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-gray-800/50 hover:bg-white text-white hover:text-gray-900 rounded-full p-3 transition-all duration-300 hidden md:block"
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); goToNext(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-gray-800/50 hover:bg-white text-white hover:text-gray-900 rounded-full p-3 transition-all duration-300 hidden md:block"
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>

                    {/* Conteneur Principal */}
                    <div
                        className="relative max-w-5xl w-full max-h-full flex flex-col items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Wrapper de l'image : l'astuce est le 'min-h-0' et 'overflow-hidden' */}
                        <div className="relative min-h-0 flex-shrink-1 overflow-hidden rounded-xl shadow-2xl border border-white/10">
                            <img
                                src={selectedImage.url}
                                alt={selectedImage.title}
                                className="max-w-full max-h-[70vh] object-contain block mx-auto"
                            />
                        </div>

                        {/* Infos en bas : Toujours visibles car elles ne sont pas dans le bloc de l'image */}
                        <div className="w-full text-center mt-6 px-4">
                            <div className="inline-block px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-semibold mb-3 tracking-wider uppercase">
                                {categories.find(c => c.id === selectedImage.category)?.name}
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                                {selectedImage.title}
                            </h2>
                            <div className="flex items-center justify-center gap-4 mt-4 text-gray-400 text-sm">
                                <span className="bg-gray-800 px-3 py-1 rounded-md">
                                    {filteredImages.findIndex(img => img.id === selectedImage.id) + 1} / {filteredImages.length}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Galerie;