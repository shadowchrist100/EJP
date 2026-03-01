import Nav from "../common/Nav";
import Footer from "../common/Footer";
import { Contact } from "../../Index";
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

/* ─── Styles globaux ────────────────────────────────────────────────── */
const GlobalStyles = () => (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;700&display=swap');

        .font-display { font-family: 'Bebas Neue', sans-serif; }
        .font-body    { font-family: 'DM Sans', sans-serif; }

        @keyframes float-up {
            from { opacity: 0; transform: translateY(40px); }
            to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes line-grow {
            from { transform: scaleX(0); }
            to   { transform: scaleX(1); }
        }
        @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 20px rgba(245,158,11,0.3); }
            50%       { box-shadow: 0 0 40px rgba(245,158,11,0.6); }
        }
        @keyframes modal-in {
            from { opacity: 0; transform: scale(0.95) translateY(16px); }
            to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        .animate-float-up   { animation: float-up 0.8s ease forwards; }
        .animate-line-grow  { animation: line-grow 1s ease forwards; transform-origin: left; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .animate-modal-in   { animation: modal-in 0.28s cubic-bezier(0.34,1.4,0.64,1) forwards; }

        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-500 { animation-delay: 500ms; }

        .card-shine { position: relative; overflow: hidden; }
        .card-shine::before {
            content: '';
            position: absolute;
            top: -50%; left: -60%;
            width: 40%; height: 200%;
            background: linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent);
            transform: skewX(-20deg);
            transition: left 0.7s ease;
            z-index: 10;
        }
        .card-shine:hover::before { left: 130%; }

        .hero-grain::after {
            content: '';
            position: absolute; inset: 0;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
            pointer-events: none; z-index: 1;
        }
        .text-stroke {
            -webkit-text-stroke: 2px rgba(245,158,11,0.4);
            color: transparent;
        }
    `}</style>
);

/* ─── Banner ────────────────────────────────────────────────────────── */
const Banner = () => (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-6 font-body">
        <div className="mb-8 opacity-0 animate-float-up delay-100">
            <span className="inline-flex items-center gap-3 text-amber-400 tracking-[0.3em] text-xs uppercase font-bold">
                <span className="w-8 h-px bg-amber-500 inline-block animate-line-grow" />
                Église des Jeunes d'Impact
                <span className="w-8 h-px bg-amber-500 inline-block" />
            </span>
        </div>
        <div className="mb-4 opacity-0 animate-float-up delay-200">
            <h1 className="font-display text-[clamp(3.5rem,12vw,10rem)] leading-none tracking-wide text-white">LES FAMILLES</h1>
            <h1 className="font-display text-[clamp(3.5rem,12vw,10rem)] leading-none tracking-wide text-stroke">D'IMPACT</h1>
            <h1 className="font-display text-[clamp(3.5rem,12vw,10rem)] leading-none tracking-wide text-amber-400">JEUNES</h1>
        </div>
        <div className="mb-12 opacity-0 animate-float-up delay-300 max-w-xl">
            <p className="text-gray-300 text-lg leading-relaxed font-light">
                Découvre les cellules vivantes de l'EJP — des communautés de jeunes qui transforment leurs quartiers et leurs villes pour Christ.
            </p>
        </div>
        <div className="flex items-center gap-6 opacity-0 animate-float-up delay-500">
            <a href="#fij-list" className="group relative overflow-hidden bg-amber-500 text-black px-10 py-4 font-bold text-sm tracking-[0.15em] uppercase transition-all duration-300 hover:bg-amber-400">
                <span className="relative z-10 flex items-center gap-3">
                    Trouver ma FIJ
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </span>
            </a>
            <a href="#apropos" className="text-gray-400 hover:text-white transition-colors text-sm tracking-widest uppercase font-medium border-b border-gray-600 hover:border-white pb-1">
                En savoir plus
            </a>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
            <span className="text-gray-500 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-gray-500 to-transparent" />
        </div>
    </div>
);

/* ─── À propos ───────────────────────────────────────────────────────── */
const Aboutfij = () => (
    <div className="container mx-auto px-4 py-16 font-body">
        <div className="max-w-3xl mx-auto mb-24 text-center">
            <p className="text-amber-500 tracking-[0.3em] text-xs uppercase font-bold mb-6">Comprendre les FIJ</p>
            <h2 className="font-display text-[clamp(2.5rem,7vw,5rem)] text-white leading-none mb-8">C'EST QUOI UNE FIJ ?</h2>
            <div className="w-16 h-px bg-amber-600 mx-auto mb-8" />
            <p className="text-gray-300 text-lg leading-relaxed font-light">
                Les FIJ sont les cellules de l'Église des Jeunes d'Impact Centre Chrétien. Les jeunes se réunissent{' '}
                <span className="text-amber-400 font-semibold">tous les mardis de 19h14 à 20h45</span>{' '}
                dans les maisons hôtes pour s'édifier et influencer leurs villes et quartiers avec les valeurs de Christ.{' '}
                <span className="text-gray-500 italic">(Actes 5:42)</span>
            </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-gray-800">
            <div className="relative h-[480px] overflow-hidden group bg-black">
                <div className="absolute inset-0 bg-center bg-cover transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: 'url("assets/images/fij6.jpeg")' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-10">
                    <span className="text-amber-500 text-xs tracking-[0.3em] uppercase font-bold mb-3 block">01</span>
                    <h3 className="font-display text-5xl text-white leading-none">NOTRE<br />MISSION</h3>
                </div>
            </div>
            <div className="bg-zinc-900 p-12 flex flex-col justify-center">
                <div className="w-10 h-px bg-amber-500 mb-8" />
                <p className="text-gray-200 text-xl leading-relaxed font-light mb-8">
                    Amener la jeunesse à recevoir la véritable lumière qu'est Jésus-Christ, transformer leur système de pensées et conquérir nos territoires pour Christ.
                </p>
                <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                        <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <span className="text-gray-500 text-sm tracking-widest uppercase">Transformation</span>
                </div>
            </div>
            <div className="bg-zinc-900 p-12 flex flex-col justify-center order-2 lg:order-none">
                <div className="w-10 h-px bg-amber-500 mb-8" />
                <p className="text-gray-200 text-xl leading-relaxed font-light mb-8">
                    Conquérir la jeunesse des extrémités de la terre pour en faire des disciples de Jésus qui dominent dans les territoires géographiques et d'influence.
                </p>
                <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                        <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                        </svg>
                    </div>
                    <span className="text-gray-500 text-sm tracking-widest uppercase">Expansion</span>
                </div>
            </div>
            <div className="relative h-[480px] overflow-hidden group bg-black order-1 lg:order-none">
                <div className="absolute inset-0 bg-center bg-cover transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: 'url("assets/images/fij3.jpeg")' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-10">
                    <span className="text-amber-500 text-xs tracking-[0.3em] uppercase font-bold mb-3 block">02</span>
                    <h3 className="font-display text-5xl text-white leading-none">NOTRE<br />VISION</h3>
                </div>
            </div>
        </div>
    </div>
);

/* ─── Séparateur doré ────────────────────────────────────────────────── */
const Divider = () => (
    <div className="w-full bg-black py-6 px-4">
        <div className="container mx-auto flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-amber-600/50" />
            <div className="w-2 h-2 bg-amber-600 rotate-45" />
            <div className="w-1 h-1 bg-amber-600/50 rotate-45" />
            <div className="w-2 h-2 bg-amber-600 rotate-45" />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-amber-600/50" />
        </div>
    </div>
);

/* ─── Modale Carte ───────────────────────────────────────────────────── */
const MapModal = ({ fij, onClose }) => {
    // Bloquer le scroll du body
    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = prev; };
    }, []);

    // Fermer avec Escape
    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [onClose]);

    return createPortal(
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10"
            style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)' }}
            onClick={onClose}
        >
            <div
                className="animate-modal-in relative w-full max-w-3xl bg-zinc-900 border border-amber-500/30 shadow-[0_0_80px_rgba(217,119,6,0.15)] overflow-hidden flex flex-col"
                style={{ height: 'min(580px, 88vh)' }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="shrink-0 bg-zinc-950 px-5 py-3.5 flex items-center justify-between border-b border-zinc-800">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-amber-500 rotate-45 shrink-0" />
                        <div>
                            <p className="text-white text-sm font-black tracking-wider uppercase font-display">{fij.nom}</p>
                            <p className="text-gray-600 text-[10px] tracking-[0.25em] uppercase mt-0.5">Localisation · FIJ</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-zinc-700 text-gray-500 hover:text-white hover:border-amber-500/50 transition-all duration-200"
                        aria-label="Fermer"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Accent line */}
                <div className="h-[2px] shrink-0 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

                {/* Map */}
                <div className="grow relative bg-zinc-950 min-h-0">
                    <iframe
                        src={fij.mapURL}
                        width="100%"
                        height="100%"
                        style={{ border: 0, position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                        allowFullScreen=""
                        loading="lazy"
                        title={`Carte ${fij.nom}`}
                    />
                </div>

                {/* Footer */}
                <div className="shrink-0 bg-zinc-950 px-5 py-3 border-t border-zinc-800 flex items-center justify-between">
                    <span className="text-gray-600 text-[10px] tracking-widest uppercase font-bold">
                        Mardis · 19h14 → 20h45
                    </span>
                    {fij.phone && (
                        <a
                            href={`https://wa.me/${fij.phone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-green-500 hover:text-green-400 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                            Contacter le Berger
                        </a>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
};

/* ─── Grille FIJ ─────────────────────────────────────────────────────── */
const FijGrid = () => {
    const [fijData, setFijData] = useState([]);
    const [activeMap, setActiveMap] = useState(null);

    useEffect(() => {
        fetch("/data/fij.json")
            .then(r => r.json())
            .then(d => setFijData(d))
            .catch(e => console.error("Erreur chargement FIJ:", e));
    }, []);

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 p-4 max-w-7xl mx-auto font-body">
                {fijData.map((fij, index) => (
                    <div
                        key={index}
                        className="w-full bg-zinc-900 border border-zinc-800 hover:border-amber-500/30 transition-colors duration-300 card-shine flex flex-col overflow-hidden"
                    >
                        {/* Image */}
                        <div className="relative h-56 overflow-hidden shrink-0">
                            <img
                                src={fij.image || "/api/placeholder/400/320"}
                                alt={fij.nom}
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent" />
                            <div className="absolute top-4 left-4">
                                <span className="bg-amber-500 text-black text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1">FIJ</span>
                            </div>
                            <div className="absolute top-4 right-4">
                                <span className="font-display text-4xl text-white/10 leading-none">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                            </div>
                        </div>

                        {/* Contenu */}
                        <div className="p-6 flex flex-col grow">
                            <div className="w-8 h-px bg-amber-500 mb-4" />
                            <h3 className="font-display text-3xl text-white leading-none mb-3 tracking-wide">{fij.nom}</h3>
                            <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed font-light grow">{fij.description}</p>

                            {/* Actions */}
                            <div className="flex gap-3 mt-6 pt-4 border-t border-zinc-800">
                                <button
                                    onClick={() => setActiveMap(fij)}
                                    className="flex-1 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-black text-xs font-black py-3 tracking-[0.15em] uppercase transition-all flex items-center justify-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Voir la carte
                                </button>
                                <a
                                    href={`https://wa.me/${fij.phone}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-zinc-800 hover:bg-green-600 border border-zinc-700 hover:border-green-600 text-white px-4 py-3 transition-all flex items-center justify-center"
                                    title="Contacter le Berger"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modale carte — rendue dans document.body, toujours centrée */}
            {activeMap && (
                <MapModal fij={activeMap} onClose={() => setActiveMap(null)} />
            )}
        </>
    );
};

/* ─── Page principale ────────────────────────────────────────────────── */
const Fij = () => (
    <section className="bg-black font-body">
        <GlobalStyles />
        <div className="min-h-screen">
            <header className="fixed top-0 right-0 left-0 z-50">
                <Nav />
            </header>

            <section className="relative min-h-screen flex items-center overflow-hidden hero-grain">
                <div className="absolute banner-fij inset-0 bg-cover bg-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
                </div>
                <div className="absolute right-0 top-0 h-full w-1/3 pointer-events-none hidden lg:block">
                    <div className="absolute top-1/4 right-16 w-48 h-48 border border-amber-500/10 rotate-45" />
                    <div className="absolute top-1/3 right-24 w-32 h-32 border border-amber-500/10 rotate-12" />
                    <div className="absolute top-1/2 right-8 w-64 h-px bg-gradient-to-l from-transparent to-amber-500/20" />
                </div>
                <div className="absolute left-4 lg:left-8 top-24 bottom-24 w-px bg-gradient-to-b from-transparent via-amber-600/30 to-transparent" />
                <div className="relative z-10 w-full pt-20">
                    <Banner />
                </div>
            </section>

            <section id="apropos" className="bg-black">
                <Aboutfij />
            </section>

            <Divider />

            <section id="fij-list" className="py-24 bg-zinc-950">
                <div className="container mx-auto px-4">
                    <div className="mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 max-w-7xl mx-auto px-4">
                        <div>
                            <p className="text-amber-500 tracking-[0.3em] text-xs uppercase font-bold mb-4">Communautés locales</p>
                            <h2 className="font-display text-[clamp(2.5rem,8vw,6rem)] text-white leading-none">REJOINS<br />UNE FIJ</h2>
                        </div>
                        <p className="text-gray-400 text-lg font-light max-w-sm leading-relaxed lg:text-right">
                            Trouve la communauté la plus proche de chez toi et rejoins un mouvement qui transforme la jeunesse.
                        </p>
                    </div>
                    <FijGrid />
                </div>
            </section>

            <Divider />

            <section className="py-24 bg-black">
                <Contact />
            </section>

            <Footer />
        </div>
    </section>
);

export default Fij;