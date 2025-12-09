import React, { useState } from 'react';
import { User, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react'


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
    const [selectedImage, setSelectedImage] = useState(null);
    const [filter, setFilter] = useState('all');

    const images = [
        { id: 1, category: 'events', title: 'Culte du Dimanche', url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=400&fit=crop' },
        { id: 2, category: 'events', title: 'Conférence Jeunesse', url: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&h=400&fit=crop' },
        { id: 3, category: 'worship', title: 'Louange', url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop' },
        { id: 4, category: 'community', title: 'Réunion FIJ', url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop' },
        { id: 5, category: 'events', title: 'Baptême', url: 'https://images.unsplash.com/photo-1464047736614-af63643285bf?w=600&h=400&fit=crop' },
        { id: 6, category: 'worship', title: 'Prière', url: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?w=600&h=400&fit=crop' },
        { id: 7, category: 'community', title: 'Rencontre', url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop' },
        { id: 8, category: 'events', title: 'Camp Jeunesse', url: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=600&h=400&fit=crop' },
        { id: 9, category: 'worship', title: 'Concert', url: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=400&fit=crop' },
    ];

    const filteredImages = filter === 'all'
        ? images
        : images.filter(img => img.category === filter);

    const categories = [
        { id: 'all', name: 'Tout', icon: '🌟' },
        { id: 'events', name: 'Événements', icon: '🎉' },
        { id: 'worship', name: 'Louange', icon: '🎵' },
        { id: 'community', name: 'Communauté', icon: '👥' },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        const current_index= filteredImages.findIndex((image)=> image.id === selectedImage.id) ;
        let newindex;

        if (currentIndex >0) {
            newindex= current_index -1;
        }
        else{
            newindex= filteredImages.length -1;
        }
        setCurrentIndex(newindex);
        setSelectedImage(filteredImages[newindex]);
    };

    const goToNext = () => {
        const current_index= filteredImages.findIndex((image)=> image.id === selectedImage.id) ;
        let newindex;
        if (currentIndex < filteredImages.length -1) {
            newindex= current_index + 1;
        }
        else{
            newindex= 0;
        }

        setCurrentIndex(newindex) ;
        setSelectedImage(filteredImages[newindex]);
    };

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
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                <div className="container mx-auto text-center relative z-10">
                    <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
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
                            onClick={() => {setSelectedImage(image); setFilter(image.category)} }
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
                            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
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
                    className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fadeIn"
                    onClick={() => {setSelectedImage(null); se}}
                >
                    <button
                        className="absolute top-4 right-4 text-white text-4xl hover:text-purple-400 transition-colors"
                        onClick={(e) => {setSelectedImage(null); e.stopPropagation()} }
                    >
                        ×
                    </button>
                    <div className="max-w-5xl w-full animate-scaleIn">
                        <button
                            onClick={(e) => {
                                goToPrevious(); e.stopPropagation()
                            }}
                            className="absolute left-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white hover:bg-gray-100 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
                            aria-label="Témoignage précédent"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-700" />
                        </button>
                        <img
                            src={selectedImage.url}
                            alt={selectedImage.title}
                            className="w-full h-auto rounded-2xl shadow-2xl"
                        />
                        <div className="text-center mt-6">
                            <h2 className="text-3xl font-bold text-white mb-2">{selectedImage.title}</h2>
                            <p className="text-gray-400">
                                {categories.find(c => c.id === selectedImage.category)?.name}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={(e) =>{
                            goToNext(); e.stopPropagation();
                        }}
                        className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white hover:bg-gray-100 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
                        aria-label="Témoignage suivant"
                    >
                        <ChevronRight className="w-6 h-6 text-gray-700" />
                    </button>
                </div>
            )}
        </section>
    );
};

export default Galerie;