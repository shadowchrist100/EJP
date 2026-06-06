import React, { useRef, useEffect, useCallback } from 'react';
import { BergerDimitri } from '../assets';
import { BergerSamuel } from '../assets';
import FadeIn from './common/FadeIn';

/**
 * VisionSection — two full-height editorial panels.
 * DESIGN.md pattern: cinematic atmospheric interlude, eyebrow + display lockup,
 * contained avatar with rounded-full, body text in graphite.
 * Audio auto-plays when visible (intersection observer).
 */
const VisionSection = ({ audioPath }) => {
    const audioRef = useRef(null);
    const sectionRef = useRef(null);
    const isUnlockedRef = useRef(false);
    const isVisibleRef = useRef(false);

    const isSectionInView = useCallback(() => {
        const el = sectionRef.current;
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        const viewH = window.innerHeight || document.documentElement.clientHeight;
        return rect.top < viewH * 0.7 && rect.bottom > viewH * 0.3;
    }, []);

    const tryPlay = useCallback(() => {
        if (!audioRef.current) return;
        if (!isUnlockedRef.current) return;
        const visible = isVisibleRef.current || isSectionInView();
        if (visible) {
            audioRef.current.play().catch(() => {});
        }
    }, [isSectionInView]);

    useEffect(() => {
        if (!audioPath) return;
        const audio = new Audio(audioPath);
        audio.loop = true;
        audio.volume = 0.3;
        audioRef.current = audio;
        return () => { audio.pause(); audio.src = ''; audioRef.current = null; };
    }, [audioPath]);

    useEffect(() => {
        if (isUnlockedRef.current) return;
        const unlock = async () => {
            if (isUnlockedRef.current) return;
            document.removeEventListener('click', unlock);
            document.removeEventListener('touchstart', unlock);
            document.removeEventListener('keydown', unlock);
            try {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                if (AudioCtx) { const ctx = new AudioCtx(); await ctx.resume(); ctx.close(); }
                if (audioRef.current) {
                    const saved = audioRef.current.volume;
                    audioRef.current.volume = 0;
                    await audioRef.current.play();
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                    audioRef.current.volume = saved;
                }
                isUnlockedRef.current = true;
                isVisibleRef.current = isSectionInView();
                tryPlay();
            // eslint-disable-next-line no-unused-vars
            } catch (err) {}
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

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        isVisibleRef.current = isSectionInView();
        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisibleRef.current = entry.isIntersecting;
                if (entry.isIntersecting) { tryPlay(); }
                else if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; }
            },
            { threshold: 0.3 }
        );
        observer.observe(section);
        return () => observer.disconnect();
    }, [tryPlay, isSectionInView]);

    /* Panel data */
    const panels = [
        {
            eyebrow: 'Fondement',
            headline: (
                <>
                    Une église suscitée pour accomplir le{' '}
                    <span className="shimmer-gold" style={{ fontStyle: 'italic' }}>rêve de Dieu</span>
                </>
            ),
            photo: BergerSamuel,
            name: 'Samuel EBOUMBOU',
            role: 'Berger Principal de EJP MONDE / Berger EJP CROISSY',
        },
        {
            eyebrow: 'Notre Vision',
            headline: (
                <>
                    "Nous sommes des{' '}
                    <span className="shimmer-gold" style={{ fontStyle: 'italic' }}>Virus</span>{' '}
                    dans le système appelé{' '}
                    <span className="shimmer-gold" style={{ fontStyle: 'italic' }}>Monde</span>{' '}
                    pour amener la{' '}
                    <span className="shimmer-gold" style={{ fontStyle: 'italic' }}>Pensée</span>{' '}
                    et le{' '}
                    <span className="shimmer-gold" style={{ fontStyle: 'italic' }}>Rêve</span>{' '}
                    de{' '}
                    <span className="shimmer-gold" style={{ fontStyle: 'italic' }}>Dieu</span>"
                </>
            ),
            photo: BergerDimitri,
            name: 'Dimitri Dumas',
            role: 'Berger de l\'EJP Porto Novo',
        },
    ];

    return (
        <section ref={sectionRef} style={{ background: 'var(--color-primary)', position: 'relative', overflow: 'visible' }}>
            <div className="section-container">
                {panels.map((panel, pIdx) => (
                    <div
                        key={pIdx}
                        style={{
                            minHeight: '100vh',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            padding: 'var(--space-section) 0',
                        }}
                    >
                        {/* Subtle gradient */}
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: pIdx === 0
                                ? 'linear-gradient(to bottom, rgba(217,119,6,0.04), transparent, rgba(0,0,0,1))'
                                : 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(217,119,6,0.04), rgba(0,0,0,1))',
                            pointerEvents: 'none',
                        }} />

                        <div style={{ maxWidth: '800px', width: '100%', textAlign: 'center', position: 'relative', zIndex: 10 }}>
                            {/* Eyebrow */}
                            <FadeIn stagger={0} direction="up">
                                <p className="t-eyebrow" style={{ color: 'var(--color-amber)', opacity: 0.7, marginBottom: 'var(--space-xl)', letterSpacing: '3px' }}>
                                    {panel.eyebrow}
                                </p>
                            </FadeIn>

                            {/* Display headline */}
                            <FadeIn stagger={1} direction="up">
                                <h2 className="t-display" style={{
                                    color: 'var(--color-on-primary)',
                                    fontSize: 'clamp(28px, 5vw, 56px)',
                                    marginBottom: 'var(--space-xxl)',
                                    lineHeight: 1.1,
                                }}>
                                    {panel.headline}
                                </h2>
                            </FadeIn>

                            {/* Hairline + Avatar */}
                            <FadeIn stagger={2} direction="up">
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div style={{ width: '48px', height: '2px', background: 'var(--color-amber)', marginBottom: 'var(--space-xl)' }} />

                                    <div style={{ position: 'relative', marginBottom: 'var(--space-lg)' }}>
                                        <div style={{
                                            width: '128px',
                                            height: '128px',
                                            borderRadius: '50%',
                                            overflow: 'hidden',
                                            border: '2px solid rgba(217,119,6,0.3)',
                                            transition: 'border-color 0.3s',
                                        }}>
                                            <img
                                                src={panel.photo}
                                                alt={panel.name}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    objectPosition: 'top',
                                                    filter: 'grayscale(30%)',
                                                    transition: 'filter 0.5s',
                                                }}
                                                onMouseEnter={(e) => e.target.style.filter = 'grayscale(0%)'}
                                                onMouseLeave={(e) => e.target.style.filter = 'grayscale(30%)'}
                                            />
                                        </div>
                                    </div>

                                    <p className="t-eyebrow" style={{ color: 'var(--color-on-primary)', fontSize: '12px', letterSpacing: '2px', marginBottom: 'var(--space-xs)' }}>
                                        {panel.name}
                                    </p>
                                    <p className="t-meta" style={{ color: 'var(--color-stone)' }}>
                                        {panel.role}
                                    </p>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default VisionSection;