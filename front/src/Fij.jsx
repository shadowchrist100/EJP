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
                        Les FIJ sont les cellules de l'Église des Jeunes d'Impact Centre Chrétien. Les membres de l'église se réunissent tous les mardis de 19h15 à 20h30 dans les maisons hôtes pour s'édifier et influencer leurs villes et leurs quartiers avec les valeurs de Christ ! (Actes 5:42)
                    </p>
                </div>
            </div>

            {/* Section Mission et Vision */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Mission - Image à gauche */}
                <div className="flex items-center justify-center">
                    <div className="relative w-full h-96 group">
                        <div className="absolute inset-0 bg-linear-gradient-to-br from-amber-500/20 to-purple-600/20 rounded-3xl transform group-hover:rotate-1 transition-transform duration-500"></div>
                        <div className="relative w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-100 transform group-hover:-translate-y-2 transition-all duration-500">
                            <div 
                                className="w-full h-full bg-center bg-cover transform group-hover:scale-105 transition-transform duration-700"
                                style={{
                                    backgroundImage: 'url("./assets/FB_IMG_1757701105299.jpg")',
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
                <div className="flex flex-col items-center justify-center p-8 bg-linear-gradient-to-br from-amber-50 to-white rounded-3xl shadow-2xl border border-amber-100 relative overflow-hidden">
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
                <div className="flex flex-col items-center justify-center p-8 bg-linear-gradient-to-br from-purple-50 to-white rounded-3xl shadow-2xl border border-purple-100 relative overflow-hidden lg:order-2">
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
                            Être une génération de jeunes transformés qui impactent le monde par l'amour de Christ et établissent son règne dans chaque sphère de la société.
                        </p>
                    </div>
                </div>

                {/* Vision - Image à droite */}
                <div className="flex items-center justify-center lg:order-1">
                    <div className="relative w-full h-96 group">
                        <div className="absolute inset-0 bg-linear-gradient-to-br from-purple-500/20 to-amber-600/20 rounded-3xl transform group-hover:-rotate-1 transition-transform duration-500"></div>
                        <div className="relative w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-purple-100 transform group-hover:-translate-y-2 transition-all duration-500">
                            <div 
                                className="w-full h-full bg-center bg-cover transform group-hover:scale-105 transition-transform duration-700"
                                style={{
                                    backgroundImage: 'url("./assets/vision-image.jpg")',
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
        {nom:"FIJ Djassin", description:"Rejoins la famille d'impact de Djassin", mapURL:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.2374295874697!2d2.6072094!3d6.491592000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b50af82c2a631%3A0xbf1590d6b3c47000!2sBd%20Tokpota%2C%20Porto-Novo!5e0!3m2!1sen!2sbj!4v1763058642929!5m2!1sen!2sbj"},
        {nom:"FIJ Tokpota", description:"Rejoins la famille d'impact de Tokpota", mapURL:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.2374295874697!2d2.6072094!3d6.491592000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b50af82c2a631%3A0xbf1590d6b3c47000!2sBd%20Tokpota%2C%20Porto-Novo!5e0!3m2!1sen!2sbj!4v1763058642929!5m2!1sen!2sbj"},
        {nom:"FIJ Attakè", description:"Rejoins la famille d'impact d'Attakè", mapURL:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.2374295874697!2d2.6072094!3d6.491592000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b50af82c2a631%3A0xbf1590d6b3c47000!2sBd%20Tokpota%2C%20Porto-Novo!5e0!3m2!1sen!2sbj!4v1763058642929!5m2!1sen!2sbj"},
        {nom:"FIJ Akpakpa", description:"Rejoins la famille d'impact d'Akpakpa", mapURL:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.2374295874697!2d2.6072094!3d6.491592000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b50af82c2a631%3A0xbf1590d6b3c47000!2sBd%20Tokpota%2C%20Porto-Novo!5e0!3m2!1sen!2sbj!4v1763058642929!5m2!1sen!2sbj"},
        {nom:"FIJ Cotonou", description:"Rejoins la famille d'impact de Cotonou", mapURL:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.2374295874697!2d2.6072094!3d6.491592000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b50af82c2a631%3A0xbf1590d6b3c47000!2sBd%20Tokpota%2C%20Porto-Novo!5e0!3m2!1sen!2sbj!4v1763058642929!5m2!1sen!2sbj"},
        {nom:"FIJ Godomey", description:"Rejoins la famille d'impact de Godomey", mapURL:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.2374295874697!2d2.6072094!3d6.491592000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b50af82c2a631%3A0xbf1590d6b3c47000!2sBd%20Tokpota%2C%20Porto-Novo!5e0!3m2!1sen!2sbj!4v1763058642929!5m2!1sen!2sbj"},
    ];

    const [flippedCards, setFlippedCards] = useState({});

    const toggleFlip = (index) => {
        setFlippedCards(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
            {fijData.map((fij, index) => {
                const isFlipped = flippedCards[index];
                
                return (
                    <div key={index} className="w-full h-80 perspective-1000">
                        <div className={`thecard relative w-full h-full transition-transform duration-700 ${isFlipped ? 'rotate-y-180' : ''}`}>
                            {/* face avant */}
                            <div className="thefront absolute bg-white w-full h-full rounded-xl flex flex-col backface-hidden shadow-xl border-2 border-gray-200 overflow-hidden">
                                <div
                                    className="w-full bg-center bg-no-repeat shrink-0 bg-cover"
                                    style={{
                                        backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB6BmPTnDw34qzZ2D9rSy1_9-T_LRSZVaSGhwIzKzLNdnaAu0M4iy--VdQHhVmp4wS99XzRDDzLDwuov3lVIB8dOJ9m6vGDWbVOX88JqdCfSFIiG4rlbLQPWKYH3ez7r1GlJiPkar_V8jG2wtRHmJkvi03K7tK42_62chA-TrHj3cYAJXtaRiVvrPC1mcxdroTlhuTmZ0veXSLE1ZKDwnaTzDtC4WGDOc-rjHDdOHsJedmy0Uj211wmY47JMAo1IM_Pv2ZhkJezOE4")',
                                        height: '200px'
                                    }}
                                />
                                <div className="p-5 grow flex flex-col justify-between bg-linear-gradient-to-b from-gray-50 to-white">
                                    <div>
                                        <p className="text-gray-900 text-xl font-bold leading-normal mb-2">{fij.nom}</p>
                                        <p className="text-gray-600 text-sm font-normal leading-relaxed">{fij.description}</p>
                                    </div>
                                    <button
                                        onClick={() => toggleFlip(index)}
                                        className="mt-4 bg-linear-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-gray-600 px-5 py-3 rounded-lg transition-all duration-300 font-semibold shadow-md hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2"
                                    >
                                        Voir la carte
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* face arriere */}
                            <div className="theback absolute w-full h-full bg-white rounded-xl overflow-hidden flex flex-col backface-hidden rotate-y-180 shadow-xl border-2 border-amber-200">
                                <iframe 
                                    src={fij.mapURL} 
                                    width="100%"
                                    height="100%"
                                    style={{border: 0, flex: 1}}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"  
                                    title={`Carte de localisation de ${fij.nom}`}
                                />
                                <button
                                    onClick={() => toggleFlip(index)}
                                    className="bg-linear-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-gray-600 px-5 py-4 transition-all duration-300 font-semibold hover:shadow-lg flex items-center justify-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Retour
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
                        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
                    </div>
                    <Banner />
                </section>

                {/* Section À Propos */}
                <section id="about" className="py-12 bg-white">
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
            </div>
        </section>
    );
};

export default Fij;