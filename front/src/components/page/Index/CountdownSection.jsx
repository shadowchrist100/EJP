import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FadeIn from '../../common/FadeIn';

const CountdownSection = () => {
    const getTarget = () => {
        const now = new Date();
        const next = new Date();
        const day = now.getDay();
        const daysUntilSun = day === 0 ? 7 : 7 - day;
        next.setDate(now.getDate() + daysUntilSun);
        next.setHours(15, 29, 0, 0);
        return next;
    };

    const calc = () => {
        const diff = getTarget() - new Date();
        if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        return {
            days: Math.floor(diff / 86400000),
            hours: Math.floor((diff / 3600000) % 24),
            minutes: Math.floor((diff / 60000) % 60),
            seconds: Math.floor((diff / 1000) % 60),
        };
    };

    const [time, setTime] = useState(calc());
    const fmt = (n) => String(n).padStart(2, '0');

    useEffect(() => {
        const id = setInterval(() => setTime(calc()), 1000);
        return () => clearInterval(id);
    }, []);

    const units = [
        { label: 'Jours', value: time.days },
        { label: 'Heures', value: time.hours },
        { label: 'Minutes', value: time.minutes },
        { label: 'Secondes', value: time.seconds },
    ];

    return (
        <section className="section-spacing-lg" style={{ background: 'var(--color-primary)', overflow: 'hidden', position: 'relative' }}>
            {/* Subtle ambient glow */}
            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '500px', height: '250px', background: 'rgba(217,119,6,0.04)', borderRadius: '50%', filter: 'blur(120px)', pointerEvents: 'none' }} />

            <div className="section-container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                {/* Editorial eyebrow + display lockup */}
                <FadeIn stagger={0} direction="up">
                    <p className="t-eyebrow" style={{ color: 'var(--color-amber)', opacity: 0.7, marginBottom: 'var(--space-sm)', letterSpacing: '2px' }}>
                        Rendez-vous
                    </p>
                </FadeIn>

                <FadeIn stagger={1} direction="up">
                    <h2 className="t-display" style={{ color: 'var(--color-on-primary)', fontSize: 'clamp(32px, 5vw, 49px)', marginBottom: 'var(--space-xs)' }}>
                        Prochain Culte
                    </h2>
                </FadeIn>

                <FadeIn stagger={2} direction="up">
                    <p className="t-meta" style={{ color: 'var(--color-stone)', marginBottom: 'var(--space-xxl)' }}>
                        Vivez l'impact en présentiel et en ligne
                    </p>
                </FadeIn>

                {/* Timer grid — flat, hairline dividers, no shadow */}
                <FadeIn stagger={3} direction="up">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        maxWidth: '700px',
                        margin: '0 auto',
                        border: '1px solid rgba(255,255,255,0.06)',
                    }}>
                        {units.map(({ label, value }, i) => (
                            <div
                                key={label}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    padding: 'var(--space-xl) var(--space-md)',
                                    borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                                }}
                            >
                                <div style={{ height: 'clamp(40px, 6vw, 72px)', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                                    <motion.span
                                        key={value}
                                        initial={{ y: 12, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
                                        className="t-display"
                                        style={{
                                            color: 'var(--color-on-primary)',
                                            fontSize: 'clamp(32px, 6vw, 56px)',
                                            fontWeight: 300,
                                            fontVariantNumeric: 'tabular-nums',
                                        }}
                                    >
                                        {fmt(value)}
                                    </motion.span>
                                </div>
                                <span className="t-micro-caps" style={{ color: 'var(--color-amber)', opacity: 0.6, marginTop: 'var(--space-sm)' }}>
                                    {label}
                                </span>
                            </div>
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