import { Nav } from "./Index";
import { Contact } from "./Index";
import React, { useState } from 'react';

const Banner = () => {
    return (
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-tight drop-shadow-2xl">
                LES FAMILLES D'IMPACT JEUNES
            </h1>
            <div className="border-t-2 border-b-2 border-white/50 py-5 mb-10 backdrop-blur-sm bg-white/5 rounded-lg">
                <p className="text-lg sm:text-xl md:text-2xl text-white font-bold tracking-wide drop-shadow-lg">
                    DÉCOUVRE LES FAMILLES D'IMPACT JEUNES PRÈS DE CHEZ TOI
                </p>
            </div>
            <div className="flex justify-center items-center">
                <a
                    href="#fij-list"
                    className="group bg-white/10 backdrop-blur-md border-2 border-white text-white hover:bg-white hover:text-black px-12 py-5 text-lg font-bold transition-all duration-300 rounded-xl shadow-2xl hover:shadow-white/30 hover:scale-105 flex items-center gap-3"
                >
                    Démarrer
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </a>
            </div>
        </div>
    );
};

const Aboutfij = () => {
    return (
        <div className="container mx-auto px-4 py-12">
            {/* Section C'est quoi une FIJ */}
            <div className="flex items-center justify-center mb-16">
                <div className="max-w-4xl p-8 rounded-2xl shadow-2xl bg-linear-gradient-to-br from-white to-amber-50/30 border border-amber-100">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-center text-gray-600">
                        C'est quoi une FIJ ?
                    </h2>
                    <p className="text-lg md:text-xl text-center leading-relaxed text-gray-600 font-medium">
                        Les FIJ sont les cellules de l'Église des Jeunes d'Impact Centre Chrétien. Les jeunes de l'église se réunissent tous les mardis de 19h14 à 20h45 dans les maisons hôtes pour s'édifier et influencer leurs villes et leurs quartiers avec les valeurs de Christ ! (Actes 5:42)
                    </p>
                </div>
            </div>

            {/* Section Mission et Vision */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Mission - Image à gauche */}
                <div className="flex items-center justify-center order-1 lg:order-1 ">
                    <div className="relative w-full h-96 group">
                        <div className="absolute inset-0 bg-linear-gradient-to-br from-amber-500/20 to-purple-600/20 rounded-3xl transform group-hover:rotate-1 transition-transform duration-500"></div>
                        <div className="relative w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-100 transform group-hover:-translate-y-2 transition-all duration-500">
                            <div
                                className="w-full h-full bg-center bg-cover transform group-hover:scale-105 transition-transform duration-700"
                                style={{
                                    backgroundImage: 'url("src/assets/fij6.jpeg")',
                                }}
                            />
                            <div className="absolute inset-0 bg-linear-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-gradient-to-t from-black/80 to-transparent transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <h3 className="text-white text-xl font-bold text-center">Notre Mission</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mission - Texte à droite */}
                <div className="flex flex-col items-center justify-center p-8 bg-linear-gradient-to-br from-amber-50 to-white rounded-3xl shadow-2xl border border-amber-100 relative overflow-hidden order-2 lg:order-2">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/10 rounded-full -translate-x-16 -translate-y-16"></div>
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full translate-x-12 translate-y-12"></div>

                    <div className="relative z-10 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-gradient-to-r from-amber-500 to-amber-600 rounded-2xl shadow-lg mb-6">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black mb-6 text-gray-600">
                            Notre Mission
                        </h3>
                        <p className="text-lg md:text-xl leading-relaxed text-gray-600 font-medium">
                            Amener la jeunesse à recevoir la véritable lumière qu'est Jésus-Christ, transformer leur système de pensées et conquérir nos territoires pour Christ.
                        </p>
                    </div>
                </div>

                {/* Vision - Texte à gauche */}
                <div className="flex flex-col items-center justify-center p-8 bg-linear-gradient-to-br from-purple-50 to-white rounded-3xl shadow-2xl border border-purple-100 relative overflow-hidden order-3 lg:order-3">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full translate-x-16 -translate-y-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-500/10 rounded-full -translate-x-12 translate-y-12"></div>

                    <div className="relative z-10 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-gradient-to-r from-purple-500 to-purple-600 rounded-2xl shadow-lg mb-6">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black mb-6 text-gray-600">
                            Notre Vision
                        </h3>
                        <p className="text-lg md:text-xl leading-relaxed text-gray-600 font-medium">
                            Notre vision est de conquérir la jeunesse des extrémités de la terre pour en faire des disciples de Jésus qui dominent dans les territoires géographiques et d'influence.
                        </p>
                    </div>
                </div>

                {/* Vision - Image à droite */}
                <div className="flex items-center justify-center order-4 lg:order-4">
                    <div className="relative w-full h-96 group">
                        <div className="absolute inset-0 bg-linear-gradient-to-br from-purple-500/20 to-amber-600/20 rounded-3xl transform group-hover:-rotate-1 transition-transform duration-500"></div>
                        <div className="relative w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-purple-100 transform group-hover:-translate-y-2 transition-all duration-500">
                            <div
                                className="w-full h-full bg-center bg-cover transform group-hover:scale-105 transition-transform duration-700"
                                style={{
                                    backgroundImage: 'url("src/assets/fij3.jpeg")',
                                }}
                            />
                            <div className="absolute inset-0 bg-linear-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-gradient-to-t from-black/80 to-transparent transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <h3 className="text-white text-xl font-bold text-center">Notre Vision</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Fijgird = () => {
    const fijData = [
        { nom: "FIJ Djassin", description: "Rejoins la famille d'impact de Djassin", mapURL: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.2374295874697!2d2.6072094!3d6.491592000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b50af82c2a631%3A0xbf1590d6b3c47000!2sBd%20Tokpota%2C%20Porto-Novo!5e0!3m2!1sen!2sbj!4v1763058642929!5m2!1sen!2sbj", phone: "22912345678" },
        { nom: "FIJ Tokpota", description: "Rejoins la famille d'impact de Tokpota", mapURL: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.2374295874697!2d2.6072094!3d6.491592000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b50af82c2a631%3A0xbf1590d6b3c47000!2sBd%20Tokpota%2C%20Porto-Novo!5e0!3m2!1sen!2sbj!4v1763058642929!5m2!1sen!2sbj", phone: "22912345678" },
        { nom: "FIJ Attakè", description: "Rejoins la famille d'impact d'Attakè", mapURL: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.2374295874697!2d2.6072094!3d6.491592000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b50af82c2a631%3A0xbf1590d6b3c47000!2sBd%20Tokpota%2C%20Porto-Novo!5e0!3m2!1sen!2sbj!4v1763058642929!5m2!1sen!2sbj", phone: "22912345678" },
        { nom: "FIJ Akpakpa", description: "Rejoins la famille d'impact d'Akpakpa", mapURL: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.2374295874697!2d2.6072094!3d6.491592000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b50af82c2a631%3A0xbf1590d6b3c47000!2sBd%20Tokpota%2C%20Porto-Novo!5e0!3m2!1sen!2sbj!4v1763058642929!5m2!1sen!2sbj", phone: "22912345678" },
        { nom: "FIJ Cotonou", description: "Rejoins la famille d'impact de Cotonou", mapURL: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.2374295874697!2d2.6072094!3d6.491592000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b50af82c2a631%3A0xbf1590d6b3c47000!2sBd%20Tokpota%2C%20Porto-Novo!5e0!3m2!1sen!2sbj!4v1763058642929!5m2!1sen!2sbj", phone: "22912345678" },
        { nom: "FIJ Godomey", description: "Rejoins la famille d'impact de Godomey", mapURL: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.2374295874697!2d2.6072094!3d6.491592000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b50af82c2a631%3A0xbf1590d6b3c47000!2sBd%20Tokpota%2C%20Porto-Novo!5e0!3m2!1sen!2sbj!4v1763058642929!5m2!1sen!2sbj", phone: "22912345678" },
    ];

    const [flippedCards, setFlippedCards] = useState({});

    const toggleFlip = (index) => {
        setFlippedCards(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-6 max-w-7xl mx-auto">
            {fijData.map((fij, index) => {
                const isFlipped = flippedCards[index];

                return (
                    <div key={index} className="w-full h-96 perspective-1000">
                        <div className={`thecard relative w-full h-full transition-transform duration-700 ${isFlipped ? 'rotate-y-180' : ''}`}>
                            {/* face avant */}
                            <div className="thefront absolute w-full h-full rounded-2xl flex flex-col backface-hidden shadow-2xl border-2 border-gray-300 overflow-hidden bg-white group hover:shadow-2xl hover:border-amber-500/30 transition-all duration-300">
                                <div
                                    className="w-full h-48 bg-center bg-no-repeat shrink-0 bg-cover group-hover:scale-105 transition-transform duration-500"
                                    style={{
                                        backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB6BmPTnDw34qzZ2D9rSy1_9-T_LRSZVaSGhwIzKzLNdnaAu0M4iy--VdQHhVmp4wS99XzRDDzLDwuov3lVIB8dOJ9m6vGDWbVOX88JqdCfSFIiG4rlbLQPWKYH3ez7r1GlJiPkar_V8jG2wtRHmJkvi03K7tK42_62chA-TrHj3cYAJXtaRiVvrPC1mcxdroTlhuTmZ0veXSLE1ZKDwnaTzDtC4WGDOc-rjHDdOHsJedmy0Uj211wmY47JMAo1IM_Pv2ZhkJezOE4")',
                                    }}
                                />
                                <div className="p-6 grow flex flex-col justify-between bg-linear-gradient-to-b from-white to-gray-50">
                                    <div>
                                        <p className="text-gray-900 text-2xl font-bold leading-tight mb-3 group-hover:text-amber-700 transition-colors duration-300">{fij.nom}</p>
                                        <p className="text-gray-600 text-base font-normal leading-relaxed mb-4">{fij.description}</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => toggleFlip(index)}
                                            className="flex-1 bg-linear-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-gray-500 px-4 py-3 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
                                        >
                                            Voir la carte
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                        <a
                                            href={`https://wa.me/${fij.phone}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 bg-linear-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-gray-500 px-4 py-3 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                            </svg>
                                            Écrire au Berger
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* face arriere */}
                            <div className="theback absolute w-full h-full bg-white rounded-2xl overflow-hidden flex flex-col backface-hidden rotate-y-180 shadow-2xl border-2 border-amber-200">
                                <div className="flex-1 relative">
                                    <iframe
                                        src={fij.mapURL}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title={`Carte de localisation de ${fij.nom}`}
                                        className="absolute inset-0"
                                    />
                                </div>
                                <button
                                    onClick={() => toggleFlip(index)}
                                    className="bg-linear-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white px-5 py-4 transition-all duration-300 font-semibold hover:shadow-xl flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Retour aux détails
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};


const Fij = () => {
    return (
        <section className="bg-white">
            <div className="min-h-screen">
                {/* Header fixe */}
                <header className="fixed top-0 right-0 left-0 z-50">
                    <Nav />
                </header>

                {/* Hero Banner */}
                <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
                    <div className="absolute banner-fij inset-0 bg-cover bg-center">
                        <div className="absolute inset-0 bg-black/70 "></div>
                    </div>
                    <Banner />
                </section>

                {/* Section À Propos */}
                <section id="apropos" className="py-12 bg-white">
                    <Aboutfij />
                </section>

                {/* Séparateur stylisé */}
                <div className="w-full bg-white py-8">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center gap-4">
                            <div className="flex-1 h-px bg-linear-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
                            <div className="w-3 h-3 bg-amber-600 rounded-full"></div>
                            <div className="flex-1 h-px bg-linear-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
                        </div>
                    </div>
                </div>

                {/* Section Liste des FIJ */}
                <section id="fij-list" className="py-24 bg-linear-gradient-to-b from-white via-amber-50/30 to-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-20">
                            <div className="inline-block mb-6">
                                <div className="w-16 h-1 bg-amber-600 mx-auto mb-4"></div>
                                <h2 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 text-gray-900 tracking-tight">
                                    Rejoins une FIJ
                                </h2>
                                <div className="w-16 h-1 bg-amber-600 mx-auto"></div>
                            </div>
                            <p className="text-2xl sm:text-3xl text-gray-800 max-w-4xl mx-auto font-light leading-relaxed">
                                Rejoins la FIJ la plus proche de chez toi et fais partie d'une communauté qui impacte
                            </p>
                        </div>
                        <Fijgird />
                    </div>
                </section>

                {/* Séparateur stylisé */}
                <div className="w-full bg-white py-8">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center gap-4">
                            <div className="flex-1 h-px bg-linear-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
                            <div className="w-3 h-3 bg-amber-600 rounded-full"></div>
                            <div className="flex-1 h-px bg-linear-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
                        </div>
                    </div>
                </div>

                {/* Section Contact */}
                <section className="py-24 bg-white">
                    <Contact />
                </section>

                {/* Footer */}
                <footer className="py-8 bg-gray-900 text-white border-t border-gray-700">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Section principale */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

                        {/* Colonne 1: Logo et description */}
                        <div className="text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start mb-3">
                                <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mr-3">
                                    <img src="src/assets/logo.png" alt="Logo EJP" className="w-10 h-10 rounded-full" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">EJP</h3>
                                    <p className="text-amber-400 text-xs">Église Jeunes Prodiges</p>
                                </div>
                            </div>
                            <p className="text-gray-300 text-xs">
                                Une église suscitée pour accomplir le rêve de Dieu
                            </p>
                        </div>

                        {/* Colonne 2: Contact */}
                        <div className="text-center md:text-left">
                            <h4 className="text-base font-semibold text-white mb-3 border-b border-amber-400 pb-1 inline-block">
                                CONTACT
                            </h4>
                            <div className="space-y-2">
                                <div className="flex items-center justify-center md:justify-start text-gray-300">
                                    <svg className="w-4 h-4 mr-2 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    </svg>
                                    <div className="text-left">
                                        <p className="text-xs">21 Rue des Vieilles vignes</p>
                                        <p className="text-xs">Croissy Beaubourg, 77183</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center md:justify-start text-gray-300">
                                    <svg className="w-4 h-4 mr-2 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <p className="text-xs">contact@eglisedesjeunesprodiges.com</p>
                                </div>
                            </div>
                        </div>

                        {/* Colonne 3: Liens rapides */}
                        <div className="text-center md:text-left">
                            <h4 className="text-base font-semibold text-white mb-3 border-b border-amber-400 pb-1 inline-block">
                                LIENS RAPIDES
                            </h4>
                            <div className="grid grid-cols-2 gap-1">
                                <a href="/" className="text-gray-300 hover:text-amber-400 transition-colors text-xs block py-1 text-left">Accueil</a>
                                <a href="#apropos" className="text-gray-300 hover:text-amber-400 transition-colors text-xs block py-1 text-left">À Propos</a>
                                <a href="/evenements" className="text-gray-300 hover:text-amber-400 transition-colors text-xs block py-1 text-left">Événements</a>
                                <a href="#galerie" className="text-gray-300 hover:text-amber-400 transition-colors text-xs block py-1 text-left">Galerie</a>
                                <a href="/don" className="text-gray-300 hover:text-amber-400 transition-colors text-xs block py-1 text-left">Faire un Don</a>
                                <a href="/Fij" className="text-gray-300 hover:text-amber-400 transition-colors text-xs block py-1 text-left">Rejoindre une FIJ</a>
                            </div>
                        </div>

                        {/* Colonne 4: Réseaux sociaux */}
                        <div className="text-center md:text-left">
                            <h4 className="text-base font-semibold text-white mb-3 border-b border-amber-400 pb-1 inline-block">
                                SUIVEZ-NOUS
                            </h4>
                            <p className="text-gray-300 text-xs mb-3">
                                Rejoignez notre communauté en ligne
                            </p>
                            <div className="flex justify-center md:justify-start gap-2">
                                <a href="https://www.facebook.com/JeunesICCPortoNovo"
                                    className="bg-gray-800 hover:bg-blue-600 text-white p-2 rounded-lg transition-all duration-300 hover:scale-110"
                                    aria-label="Facebook">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </a>

                                <a href="https://www.instagram.com/ejp_portonovo"
                                    className="bg-gray-800 hover:bg-pink-600 text-white p-2 rounded-lg transition-all duration-300 hover:scale-110"
                                    aria-label="Instagram">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </a>

                                <a href="https://youtube.com/@ejp_porto-novo"
                                    className="bg-gray-800 hover:bg-red-600 text-white p-2 rounded-lg transition-all duration-300 hover:scale-110"
                                    aria-label="YouTube">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                </a>

                                <a href="https://wa.me/2290149121209"
                                    className="bg-gray-800 hover:bg-green-600 text-white p-2 rounded-lg transition-all duration-300 hover:scale-110"
                                    aria-label="WhatsApp">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Ligne de séparation */}
                    <div className="border-t border-gray-700 my-6"></div>

                    {/* Copyright */}
                    <div className="text-center">
                        <p className="text-gray-400 text-xs">
                            © 2025 Église des Jeunes Prodiges - Tous droits réservés
                        </p>
                        <div className="flex justify-center gap-4 mt-2">
                            <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors text-xs">Mentions légales</a>
                            <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors text-xs">Confidentialité</a>
                            <a href="#contact" className="text-gray-400 hover:text-amber-400 transition-colors text-xs">Contact</a>
                        </div>
                    </div>
                </div>
            </footer>
            </div>
        </section>
    );
};

export default Fij;