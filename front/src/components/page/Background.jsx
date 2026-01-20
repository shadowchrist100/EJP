import React, { useState, useEffect } from 'react';

const BackgroundSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Vos images ici
    const images = [
        {
            url: '/src/assets/fij1.jpeg',
            title: 'Culte du Dimanche',
            subtitle: 'Rejoignez-nous chaque dimanche'
        },
        {
            url: '/src/assets/fij2.jpeg',
            title: 'Louange et Adoration',
            subtitle: 'Expérience transformante'
        },
        {
            url: '/src/assets/fij3.jpeg',
            title: 'Communauté Vivante',
            subtitle: 'Grandissez ensemble dans la foi'
        },
        {
            url: '/src/assets/fij4.jpeg',
            title: 'Jeunesse Engagée',
            subtitle: 'La prochaine génération pour Christ'
        }
    ];

    // Auto-play: défilement automatique toutes les 5 secondes
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Change toutes les 5 secondes

        return () => clearInterval(interval);
    }, []); // Dépendances vides pour que ça tourne en continu

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* Background Images avec transitions */}
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-[1500ms] ease-in-out ${index === currentIndex
                            ? 'opacity-100 scale-100'
                            : 'opacity-0 scale-105'
                        }`}
                >
                    {/* Image de fond avec effet Ken Burns (zoom lent) */}
                    <div
                        className={`absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] ease-out ${index === currentIndex ? 'scale-110' : 'scale-100'
                            }`}
                        style={{
                            backgroundImage: `url(${image.url})`
                        }}
                    />

                    {/* Overlay gradient sombre */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />
                </div>
            ))}

            {/* Contenu du Banner avec animation */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
                <div className="max-w-4xl">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`transition-all duration-1000 ease-out ${index === currentIndex
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-10 absolute inset-0'
                                }`}
                        >
                            <div className={`transition-all delay-200 duration-1000 ${index === currentIndex ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                                }`}>
                                <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-2xl">
                                    {image.title}
                                </h1>
                            </div>

                            <div className={`transition-all delay-400 duration-1000 ${index === currentIndex ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                                }`}>
                                <p className="text-xl md:text-2xl text-gray-200 mb-8 drop-shadow-lg">
                                    {image.subtitle}
                                </p>
                            </div>

                            <div className={`transition-all delay-600 duration-1000 ${index === currentIndex ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                                }`}>
                                <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 shadow-lg">
                                    Découvrir Plus
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Indicateur du slide actuel */}
                <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-white/50 text-sm font-medium">
                    {currentIndex + 1} / {images.length}
                </div>
            </div>

            {/* Flèches de Navigation */}
            <button
                onClick={goToPrevious}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/30 backdrop-blur-md rounded-full p-3 md:p-4 transition-all duration-300 hover:scale-110 group"
                aria-label="Image précédente"
            >
                <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button
                onClick={goToNext}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/30 backdrop-blur-md rounded-full p-3 md:p-4 transition-all duration-300 hover:scale-110 group"
                aria-label="Image suivante"
            >
                <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Indicateurs (dots) */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`transition-all duration-500 rounded-full ${index === currentIndex
                                ? 'w-12 h-3 bg-white shadow-lg shadow-white/50'
                                : 'w-3 h-3 bg-white/40 hover:bg-white/70 hover:scale-125'
                            }`}
                        aria-label={`Aller à l'image ${index + 1}`}
                    />
                ))}
            </div>

            {/* Barre de progression */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
                <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-[5000ms] ease-linear"
                    style={{
                        width: `${((currentIndex + 1) / images.length) * 100}%`
                    }}
                />
            </div>

            {/* Effet de particules */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
            </div>
        </div>
    );
};

export default BackgroundSlider;