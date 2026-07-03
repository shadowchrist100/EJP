import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FadeIn from '../../common/FadeIn';

const CountdownSection = () => {
    // Détection du mode mobile pour adapter les styles inline
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const media = window.matchMedia("(max-width: 768px)");
        setIsMobile(media.matches);

        const listener = (e) => setIsMobile(e.matches);
        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, []);

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

                {/* Timer grid — Gère le mode horizontal strict (4 colonnes fixes) partout */}
                <FadeIn stagger={3} direction="up">
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(4, 1fr)", // Force l'alignement horizontal
                            gap: isMobile ? "0.5rem" : "1.5rem", // Plus serré sur mobile pour que ça rentre
                            maxWidth: "900px",
                            margin: "0 auto",
                            padding: isMobile ? "0 0.5rem" : "0 1rem",
                        }}
                    >
                        {units.map(({ label, value }) => (
                            <motion.div
                                key={label}
                                whileHover={{
                                    y: -8,
                                    scale: 1.02,
                                    borderColor: "#F59E0B",
                                    boxShadow: "0 20px 40px -15px rgba(0,0,0,0.5)",
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 25,
                                }}
                                style={{
                                    position: "relative",
                                    padding: isMobile ? "1.2rem 0.2rem 0.8rem 0.2rem" : "2.5rem 1rem 2rem 1rem", // Moins de padding sur mobile
                                    borderRadius: isMobile ? "8px" : "12px",
                                    background: "#0d0d0d",
                                    border: "1px solid rgba(255,255,255,.15)",
                                    overflow: "hidden",
                                    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                                }}
                            >
                                {/* Ligne d'accent supérieure */}
                                <div
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: isMobile ? "3px" : "4px",
                                        background: "#F59E0B",
                                    }}
                                />

                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        minHeight: isMobile ? "45px" : "90px", // Hauteur réduite sur mobile
                                        position: "relative",
                                    }}
                                >
                                    <motion.span
                                        key={value}
                                        initial={{
                                            scale: 0.4,
                                            opacity: 0,
                                            y: 35,
                                        }}
                                        animate={{
                                            scale: 1,
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 200,
                                            damping: 15,
                                        }}
                                        style={{
                                            fontFamily: '"Arial Narrow", "Bebas Neue", sans-serif',
                                            fontSize: isMobile ? "clamp(32px, 8vw, 48px)" : "clamp(75px, 10vw, 110px)", // Taille drastiquement réduite sur mobile
                                            color: "#fff",
                                            letterSpacing: "1px",
                                            lineHeight: 0.9,
                                            fontVariantNumeric: "tabular-nums",
                                        }}
                                    >
                                        {fmt(value)}
                                    </motion.span>
                                </div>

                                <div
                                    style={{
                                        textAlign: "center",
                                        marginTop: isMobile ? "0.4rem" : "1rem",
                                    }}
                                >
                                    <span
                                        style={{
                                            color: "#a3a3a3",
                                            textTransform: "uppercase",
                                            letterSpacing: isMobile ? "1px" : "4px", // Moins d'espacement des lettres sur mobile
                                            fontWeight: 800,
                                            fontSize: isMobile ? "0.55rem" : "0.75rem", // Plus petit sur mobile
                                            display: "block",
                                        }}
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