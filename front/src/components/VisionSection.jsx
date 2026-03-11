import React, { useRef, useEffect, useCallback } from 'react';
import { BergerDimitri } from '.'; 
import { BergerSamuel } from '.'; 

const VisionSection = ({ audioPath }) => {
    const audioRef = useRef(null);
    const sectionRef = useRef(null);
    const isUnlockedRef = useRef(false);
    const isVisibleRef = useRef(false);

    // ─── Utilitaire : la section est-elle actuellement dans le viewport ? ───────
    const isSectionInView = useCallback(() => {
        const el = sectionRef.current;
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        const viewH = window.innerHeight || document.documentElement.clientHeight;
        // Considère visible si au moins 30% de la section est à l'écran
        return rect.top < viewH * 0.7 && rect.bottom > viewH * 0.3;
    }, []);

    // ─── Jouer le son si toutes les conditions sont réunies ─────────────────────
    const tryPlay = useCallback(() => {
        if (!audioRef.current) { console.log('⚠️ tryPlay: pas d\'audio'); return; }
        if (!isUnlockedRef.current) { console.log('⚠️ tryPlay: audio verrouillé'); return; }

        // Priorité à isVisibleRef, fallback sur getBoundingClientRect (plus fiable)
        const visible = isVisibleRef.current || isSectionInView();
        console.log('🎯 tryPlay — visible:', visible);

        if (visible) {
            audioRef.current.play().catch(err => {
                console.error('❌ Erreur play:', err.message);
            });
        }
    }, [isSectionInView]);

    // ─── 1. Créer l'objet Audio au montage ──────────────────────────────────────
    useEffect(() => {
        if (!audioPath) return;
        console.log('🎵 Création audio:', audioPath);

        const audio = new Audio(audioPath);
        audio.loop = true;
        audio.volume = 0.3;
        audioRef.current = audio;

        return () => {
            console.log('🧹 Nettoyage audio');
            audio.pause();
            audio.src = '';
            audioRef.current = null;
        };
    }, [audioPath]);

    // ─── 2. Débloquer l'autoplay au premier geste utilisateur ───────────────────
    useEffect(() => {
        if (isUnlockedRef.current) return;

        const unlock = async () => {
            if (isUnlockedRef.current) return;
            console.log('👆 Interaction détectée — tentative déblocage audio');

            // Retirer les listeners immédiatement pour éviter les appels multiples
            document.removeEventListener('click', unlock);
            document.removeEventListener('touchstart', unlock);
            document.removeEventListener('keydown', unlock);

            try {
                // Résoudre le contexte AudioContext suspendu (obligatoire sur Safari/iOS)
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                if (AudioCtx) {
                    const ctx = new AudioCtx();
                    await ctx.resume();
                    ctx.close();
                }

                // Lecture silencieuse pour débloquer l'autoplay
                if (audioRef.current) {
                    const saved = audioRef.current.volume;
                    audioRef.current.volume = 0;
                    await audioRef.current.play();
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                    audioRef.current.volume = saved;
                }

                isUnlockedRef.current = true;
                console.log('✅ Audio débloqué');

                // Mettre à jour isVisibleRef via getBoundingClientRect
                // car l'IntersectionObserver peut avoir une valeur obsolète
                isVisibleRef.current = isSectionInView();
                console.log('👁️ Visibilité au moment du unlock:', isVisibleRef.current);

                tryPlay();

            } catch (err) {
                console.error('❌ Erreur déblocage:', err.message);
            }
        };

        document.addEventListener('click', unlock);
        document.addEventListener('touchstart', unlock, { passive: true });
        document.addEventListener('keydown', unlock);

        return () => {
            document.removeEventListener('click', unlock);
            document.removeEventListener('touchstart', unlock);
            document.removeEventListener('keydown', unlock);
        };
    }, [tryPlay, isSectionInView]);

    // ─── 3. IntersectionObserver : jouer/stopper selon la visibilité ────────────
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) { console.warn('⚠️ sectionRef est null'); return; }

        console.log('👁️ Création IntersectionObserver');

        // Initialiser isVisibleRef dès la création de l'observer
        isVisibleRef.current = isSectionInView();

        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisibleRef.current = entry.isIntersecting;
                console.log('📍 Section visible:', entry.isIntersecting);

                if (entry.isIntersecting) {
                    tryPlay();
                } else if (audioRef.current) {
                    console.log('⏸️ Pause audio');
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                }
            },
            { threshold: 0.3 } // Abaissé de 0.5 → 0.3 pour déclencher plus facilement
        );

        observer.observe(section);

        return () => {
            console.log('🧹 Observer déconnecté');
            observer.disconnect();
        };
    }, [tryPlay, isSectionInView]);

    return (
        <section ref={sectionRef} className="bg-black relative overflow-visible">
            <div className="container mx-auto px-6 w-full">
                <div className="space-y-0">

                    {/* PREMIÈRE SECTION : Fondement */}
                    <div className="min-h-screen flex items-center justify-center relative py-20">
                        <div className="absolute inset-0 bg-linear-to-b from-amber-500/5 via-transparent to-black pointer-events-none" />

                        <div className="max-w-4xl mx-auto w-full text-center relative z-10">
                            <h2 className="text-amber-500 font-black tracking-[0.4em] uppercase text-[10px] mb-8 animate-in fade-in slide-in-from-bottom-4">
                                Fondement
                            </h2>
                            <h1
                                className="text-4xl md:text-7xl font-black text-white leading-[1.05] tracking-tighter uppercase mb-12 animate-in fade-in slide-in-from-bottom-4"
                                style={{ animationDelay: '100ms' }}
                            >
                                Une église suscitée pour accomplir le{' '}
                                <span className="italic text-transparent bg-clip-text bg-linear-to-r from-amber-200 to-amber-500">
                                    rêve de Dieu
                                </span>
                            </h1>

                            <div
                                className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4"
                                style={{ animationDelay: '200ms' }}
                            >
                                <div className="w-16 h-1 bg-amber-600 mb-8" />
                                <div className="mb-8 group">
                                    <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-amber-500/50 shadow-2xl shadow-amber-600/30 hover:border-amber-400 transition-all duration-300">
                                        <img
                                            src= {BergerSamuel}
                                            alt="Samuel EBOUMBOU"
                                            className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <p className="text-white font-black tracking-[0.3em] uppercase text-[12px]">Samuel EBOUMBOU</p>
                                    <p className="text-gray-400 font-light tracking-[0.2em] uppercase text-[10px]">Berger Principal de EJP MONDE/Berger EJP CROISSY</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* DEUXIÈME SECTION : Notre Vision */}
                    <div className="min-h-screen flex items-center justify-center relative py-20">
                        <div className="absolute inset-0 bg-linear-to-b from-black via-amber-500/5 to-black pointer-events-none" />

                        <div className="max-w-4xl mx-auto w-full text-center relative z-10">
                            <h2 className="text-amber-500 font-black tracking-[0.4em] uppercase text-[10px] mb-8 animate-in fade-in slide-in-from-bottom-4">
                                Notre Vision
                            </h2>
                            <h1
                                className="text-4xl md:text-7xl font-black text-white leading-[1.05] tracking-tighter uppercase mb-12 animate-in fade-in slide-in-from-bottom-4"
                                style={{ animationDelay: '100ms' }}
                            >
                                " Nous sommes des {' '}
                                <span className="italic text-transparent bg-clip-text bg-linear-to-r from-amber-200 to-amber-500">
                                    Virus
                                </span>
                                dans le systeme appelé 
                                <span className="italic text-transparent bg-clip-text bg-linear-to-r from-amber-200 to-amber-500">
                                    Monde
                                </span>
                                pour amener la 
                                <span className="italic text-transparent bg-clip-text bg-linear-to-r from-amber-200 to-amber-500">
                                    Pensee 
                                </span>
                                et le 
                                <span className="italic text-transparent bg-clip-text bg-linear-to-r from-amber-200 to-amber-500">
                                    Reve 
                                </span>
                                de 
                                <span className="italic text-transparent bg-clip-text bg-linear-to-r from-amber-200 to-amber-500">
                                    Dieu
                                </span>
                            </h1>

                            <div
                                className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4"
                                style={{ animationDelay: '200ms' }}
                            >
                                <div className="w-16 h-1 bg-amber-600 mb-8" />
                                <div className="mb-8 group">
                                    <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-amber-500/50 shadow-2xl shadow-amber-600/30 hover:border-amber-400 transition-all duration-300">
                                        <img
                                            src= {BergerDimitri}
                                            alt="Dimitri Dumas"
                                            className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <p className="text-white font-black tracking-[0.3em] uppercase text-[12px]">Dimitri Dumas</p>
                                    <p className="text-gray-400 font-light tracking-[0.2em] uppercase text-[10px]">Berger de l'EJP Porto Novo</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default VisionSection;