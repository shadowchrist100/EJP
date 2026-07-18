import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import FadeIn from '../../common/FadeIn';

// P5: Target date calculation pulled into a stable ref — computed once, not on every tick
const getNextSundayTarget = () => {
    const now = new Date();
    const next = new Date();
    const day = now.getDay();
    const daysUntilSun = day === 0 ? 7 : 7 - day;
    next.setDate(now.getDate() + daysUntilSun);
    next.setHours(15, 29, 0, 0);
    return next;
};

const calcTimeLeft = (target) => {
    const diff = target - new Date();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
    };
};

const fmt = (n) => String(n).padStart(2, '0');

const CountdownSection = () => {
    // P5: Target computed once and stored in a ref — stable across renders
    const targetRef = useRef(getNextSundayTarget());
    const [time, setTime] = useState(() => calcTimeLeft(targetRef.current));

    useEffect(() => {
        const id = setInterval(() => setTime(calcTimeLeft(targetRef.current)), 1000);
        return () => clearInterval(id);
    }, []);

    // P4: No JS isMobile state — responsive styles are handled via CSS custom properties
    // and inline style fallbacks. Use clamp() for fluid sizing instead.
    const units = useMemo(() => [
        { label: 'Jours', value: time.days },
        { label: 'Heures', value: time.hours },
        { label: 'Minutes', value: time.minutes },
        { label: 'Secondes', value: time.seconds },
    ], [time.days, time.hours, time.minutes, time.seconds]);

    return (
        <section
            className="section-spacing-lg"
            style={{ background: 'var(--color-primary)', overflow: 'hidden', position: 'relative' }}
            aria-labelledby="countdown-heading"
        >
            {/* Subtle ambient glow */}
            <div
                style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '500px', height: '250px', background: 'rgba(217,119,6,0.04)', borderRadius: '50%', filter: 'blur(120px)', pointerEvents: 'none' }}
                aria-hidden="true"
            />

            <div className="section-container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                {/* Editorial eyebrow + display lockup */}
                <FadeIn stagger={0} direction="up">
                    <p className="t-eyebrow" style={{ color: 'var(--color-amber)', opacity: 0.7, marginBottom: 'var(--space-sm)', letterSpacing: '2px' }}>
                        Rendez-vous
                    </p>
                </FadeIn>

                <FadeIn stagger={1} direction="up">
                    <h2
                        id="countdown-heading"
                        className="t-display"
                        style={{ color: 'var(--color-on-primary)', fontSize: 'clamp(32px, 5vw, 49px)', marginBottom: 'var(--space-xs)' }}
                    >
                        Prochain Culte
                    </h2>
                </FadeIn>

                <FadeIn stagger={2} direction="up">
                    <p className="t-meta" style={{ color: 'var(--color-stone)', marginBottom: 'var(--space-xxl)' }}>
                        Vivez l'impact en présentiel et en ligne
                    </p>
                </FadeIn>

                {/* P4: Timer grid uses clamp() + CSS for responsive sizing — no JS isMobile state */}
                <FadeIn stagger={3} direction="up">
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            gap: 'clamp(0.5rem, 2vw, 1.5rem)',
                            maxWidth: '900px',
                            margin: '0 auto',
                            padding: '0 clamp(0.5rem, 2vw, 1rem)',
                        }}
                        role="timer"
                        aria-label="Compte à rebours avant le prochain culte"
                        aria-live="off"
                    >
                        {units.map(({ label, value }) => (
                            <motion.div
                                key={label}
                                whileHover={{
                                    y: -8,
                                    scale: 1.02,
                                    borderColor: '#F59E0B',
                                    boxShadow: '0 20px 40px -15px rgba(0,0,0,0.5)',
                                }}
                                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                style={{
                                    position: 'relative',
                                    padding: 'clamp(1.2rem, 3vw, 2.5rem) clamp(0.2rem, 1vw, 1rem) clamp(0.8rem, 2vw, 2rem)',
                                    borderRadius: 'clamp(8px, 1vw, 12px)',
                                    background: '#0d0d0d',
                                    border: '1px solid rgba(255,255,255,.15)',
                                    overflow: 'hidden',
                                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                                }}
                            >
                                {/* Accent top bar */}
                                <div
                                    style={{
                                        position: 'absolute', top: 0, left: 0, right: 0,
                                        height: '3px',
                                        background: '#F59E0B',
                                    }}
                                    aria-hidden="true"
                                />

                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'clamp(45px, 8vw, 90px)', position: 'relative' }}>
                                    <motion.span
                                        key={value}
                                        initial={{ scale: 0.4, opacity: 0, y: 35 }}
                                        animate={{ scale: 1, opacity: 1, y: 0 }}
                                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                                        style={{
                                            fontFamily: '"Arial Narrow", "Bebas Neue", sans-serif',
                                            fontSize: 'clamp(32px, 8vw, 110px)',
                                            color: '#fff',
                                            letterSpacing: '1px',
                                            lineHeight: 0.9,
                                            fontVariantNumeric: 'tabular-nums',
                                        }}
                                        aria-label={`${value} ${label}`}
                                    >
                                        {fmt(value)}
                                    </motion.span>
                                </div>

                                <div style={{ textAlign: 'center', marginTop: 'clamp(0.4rem, 1vw, 1rem)' }}>
                                    <span
                                        style={{
                                            color: '#a3a3a3',
                                            textTransform: 'uppercase',
                                            letterSpacing: 'clamp(1px, 0.5vw, 4px)',
                                            fontWeight: 800,
                                            fontSize: 'clamp(0.55rem, 1vw, 0.75rem)',
                                            display: 'block',
                                        }}
                                        aria-hidden="true"
                                    >
                                        {label}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </FadeIn>

                <FadeIn stagger={4} direction="none">
                    <p className="t-meta" style={{ color: 'var(--color-mute)', marginTop: 'var(--space-xl)', letterSpacing: '1px' }}>
                        Dimanche · 15h29 · Porto-Novo, Bénin
                    </p>
                </FadeIn>
            </div>
        </section>
    );
};

export default CountdownSection;