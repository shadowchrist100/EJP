import { Nav } from "../../Index";
import { Contact } from "../../Index";
import React, { useEffect, useState } from 'react';

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
                                    backgroundImage: 'url("assets/images/fij6.jpeg")',
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
                                    backgroundImage: 'url("assets/images/fij3.jpeg")',
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


const FijGrid = () => {
    const [fijData, setFijData] = useState([]);
    const [flippedCards, setFlippedCards] = useState({});

    useEffect(() => {
        fetch("/data/fij.json")
            .then(response => response.json())
            .then(data => setFijData(data))
            .catch(error => console.error("Erreur chargement FIJ:", error));
    }, []); // Important : le [] évite la boucle infinie

    const toggleFlip = (index) => {
        setFlippedCards(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 p-6 max-w-7xl mx-auto">
            {/* Ajout des styles CSS nécessaires pour le flip si non présents dans votre config tailwind */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .perspective-1000 { perspective: 1000px; }
                .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
                .rotate-y-180 { transform: rotateY(180deg); }
                .preserve-3d { transform-style: preserve-3d; }
            `}} />

            {fijData.map((fij, index) => {
                const isFlipped = flippedCards[index];

                return (
                    <div key={index} className="w-full h-[450px] perspective-1000 group">
                        <div className={`relative w-full h-full transition-transform duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>

                            {/* FACE AVANT */}
                            <div className="absolute w-full h-full bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 backface-hidden flex flex-col">
                                {/* Image avec Overlay */}
                                <div className="relative h-52 overflow-hidden shrink-0">
                                    <img
                                        src={fij.image || "/api/placeholder/400/320"}
                                        alt={fij.nom}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute bottom-4 left-4">
                                        <p className="text-white text-xs font-bold uppercase tracking-widest bg-amber-500 px-2 py-1 rounded">FIJ Secteur</p>
                                    </div>
                                </div>

                                {/* Contenu Texte */}
                                <div className="p-6 flex flex-col grow justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-800 mb-2">{fij.nom}</h3>
                                        <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                                            {fij.description}
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-3 mt-4">
                                        <button
                                            onClick={() => toggleFlip(index)}
                                            className="flex-[1.5] bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md"
                                        >
                                            📍 Voir Carte
                                        </button>
                                        <a
                                            href={`https://wa.me/${fij.phone}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl transition-all flex items-center justify-center shadow-md"
                                            title="Contacter le Berger"
                                        >
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* FACE ARRIÈRE (Carte) */}
                            <div className="absolute w-full h-full bg-gray-100 rounded-3xl overflow-hidden backface-hidden rotate-y-180 shadow-2xl flex flex-col border-2 border-amber-500">
                                <div className="grow relative bg-gray-200">
                                    <iframe
                                        src={fij.mapURL}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        title={`Map ${fij.nom}`}
                                        className="absolute inset-0"
                                    />
                                </div>
                                <button
                                    onClick={() => toggleFlip(index)}
                                    className="bg-gray-900 text-white py-4 font-bold hover:bg-black transition-colors flex items-center justify-center gap-2"
                                >
                                    ✕ Fermer la carte
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
        <section className="bg-black">
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
                <section id="apropos" className="py-12 bg-black">
                    <Aboutfij />
                </section>

                {/* Séparateur stylisé */}
                <div className="w-full bg-black py-8">
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
                        <FijGrid />
                    </div>
                </section>

                {/* Séparateur stylisé */}
                <div className="w-full bg-black py-8">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center gap-4">
                            <div className="flex-1 h-px bg-linear-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
                            <div className="w-3 h-3 bg-amber-600 rounded-full"></div>
                            <div className="flex-1 h-px bg-linear-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
                        </div>
                    </div>
                </div>

                {/* Section Contact */}
                <section className="py-24 bg-black">
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
                                        <img src="/src/assets/images/logo.jpeg" alt="Logo EJP" className="w-10 h-10 rounded-full" />
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