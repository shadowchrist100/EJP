import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import FadeIn from '../../common/FadeIn';
import { logo, fij1, fij2, fij3, fij4 } from '../../../assets';

// I3: All images defined outside to avoid recreation, but only fij1 loads eagerly.
// fij2-4 will be loaded lazily by the browser once fij1 is decoded.
const IMAGES = [fij1, fij2, fij3, fij4];

const Banner = () => {
    const [current, setCurrent] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => setCurrent(p => (p + 1) % IMAGES.length), 5000);
        return () => clearInterval(intervalRef.current);
    }, []);

    return (
        <section
            className="md:pt-22 relative grain-overlay"
            style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'var(--color-scrim)' }}
            aria-label="Bannière principale"
        >
            {/* Slideshow — I2: Use <img> instead of background-image for LCP optimization */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }} aria-hidden="true">
                {IMAGES.map((img, i) => (
                    <img
                        key={i}
                        src={img}
                        // I3: Only the first image loads eagerly; others are lazy-loaded
                        loading={i === 0 ? 'eager' : 'lazy'}
                        // I2: fetchpriority="high" on the LCP image
                        fetchPriority={i === 0 ? 'high' : 'low'}
                        decoding={i === 0 ? 'sync' : 'async'}
                        alt=""
                        // I5: width/height let browser reserve space (aspect ratio hint)
                        width={1920}
                        height={1080}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                            opacity: i === current ? 1 : 0,
                            transform: i === current ? 'scale(1)' : 'scale(1.05)',
                            transition: 'opacity 1.5s ease, transform 6s ease',
                            filter: 'brightness(0.4) contrast(1.1)',
                        }}
                    />
                ))}
                {/* Gradient overlay */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.5) 100%)', zIndex: 1 }} />
            </div>

            {/* Content */}
            <div className="section-container" style={{ position: 'relative', zIndex: 20, textAlign: 'center', maxWidth: '860px' }}>
                {/* Atmospheric Orb */}
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', zIndex: -1 }} aria-hidden="true">
                    <div className="gradient-orb-amber" style={{ width: '100%', height: '100%' }} />
                </div>

                {/* Logo */}
                <FadeIn stagger={0} direction="none" style={{ marginBottom: 'var(--space-lg)' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-md)' }}>
                        <img
                            src={logo}
                            alt="Logo EJP Porto-Novo"
                            width={70}
                            height={70}
                            loading="eager"
                            style={{
                                width: '70px',
                                height: '70px',
                                borderRadius: '50%',
                                border: '1px solid rgba(217,119,6,0.3)',
                                objectFit: 'cover',
                            }}
                        />
                    </div>
                </FadeIn>

                {/* Eyebrow */}
                <FadeIn stagger={1} direction="up">
                    <p className="t-eyebrow" style={{ color: 'var(--color-amber)', opacity: 0.7, marginBottom: 'var(--space-lg)', letterSpacing: '3px' }}>
                        Porto-Novo · Bénin
                    </p>
                </FadeIn>

                {/* Display headline — h1, the main LCP text */}
                <FadeIn stagger={2} direction="up">
                    <h1 style={{ margin: 0, fontFamily: 'var(--font-family-banner)', fontWeight: 900, lineHeight: 1, letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                        <span style={{ display: 'block', color: 'var(--color-on-primary)', fontSize: 'clamp(2.8rem, 9vw, 7rem)', fontWeight: 900 }}>
                            Église Jeunes
                        </span>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '16px 0 20px', gap: '12px' }}>
                            <p style={{
                                color: 'var(--color-amber)',
                                fontFamily: 'var(--font-family)',
                                fontWeight: 700,
                                letterSpacing: '0.35em',
                                fontSize: 'clamp(8px, 1.1vw, 10px)',
                                textTransform: 'uppercase',
                                margin: '0',
                                whiteSpace: 'nowrap',
                            }}>
                                Par les jeunes <span style={{ color: 'rgba(255,255,255,0.2)', margin: '0 6px' }} aria-hidden="true">|</span> Pour les jeunes
                            </p>
                        </div>
                        <span className="shimmer-gold" style={{ display: 'block', fontSize: 'clamp(2.8rem, 9vw, 7rem)', fontStyle: 'italic', fontWeight: 900, letterSpacing: '0.02em' }}>
                            Prodiges
                        </span>
                    </h1>
                </FadeIn>

                {/* Thin separator */}
                <FadeIn stagger={3} direction="up">
                    <div style={{ width: '40px', height: '1px', background: 'rgba(217,119,6,0.4)', margin: 'var(--space-lg) auto var(--space-xl)' }} aria-hidden="true" />
                </FadeIn>

                {/* CTAs */}
                <FadeIn stagger={4} direction="up">
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-md)', justifyContent: 'center', alignItems: 'center' }}>
                        <Link to="/register" className="btn-primary" style={{ padding: '12px 32px', height: '44px' }}>
                            Rejoins-nous
                        </Link>
                        <Link to="/dons" className="btn-ghost">
                            Faire un don
                        </Link>
                    </div>
                </FadeIn>

                {/* A1: Slide indicators with accessible labels */}
                <FadeIn stagger={5} direction="none">
                    <div
                        style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: 'var(--space-xxl)' }}
                        role="tablist"
                        aria-label="Diaporama de photos"
                    >
                        {IMAGES.map((_, i) => (
                            <button
                                key={i}
                                role="tab"
                                aria-selected={i === current}
                                aria-label={`Photo ${i + 1} sur ${IMAGES.length}`}
                                onClick={() => setCurrent(i)}
                                style={{
                                    height: '2px',
                                    width: i === current ? '40px' : '10px',
                                    background: i === current ? 'var(--color-amber)' : 'rgba(255,255,255,0.2)',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'all 0.5s ease',
                                    borderRadius: '1px',
                                    padding: 0,
                                }}
                            />
                        ))}
                    </div>
                </FadeIn>
            </div>

            {/* Scroll indicator */}
            <div
                style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 20, opacity: 0.3 }}
                aria-hidden="true"
            >
                <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)' }} />
            </div>
        </section>
    );
};

export default Banner;
