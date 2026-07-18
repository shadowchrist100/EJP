import React from 'react';
import { BergerDimitri } from '../assets';
import { BergerSamuel } from '../assets';
import FadeIn from './common/FadeIn';

// P6: panels defined OUTSIDE the component to prevent recreation on every render.
// Note: JSX inside the array is stable because it contains no closures over props/state.
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
        eyebrow: '',
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
        role: "Berger de l'EJP Porto Novo",
    },
];

/**
 * VisionSection — two full-height editorial panels.
 */
const VisionSection = () => {
    return (
        <section style={{ background: 'var(--color-primary)', position: 'relative', overflow: 'visible' }}>
            <div className="section-container">
                {panels.map((panel, pIdx) => (
                    <div
                        className="md:pt-5"
                        key={panel.name}
                        style={{
                            minHeight: '70vh',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                        }}
                    >
                        {/* Subtle gradient */}
                        <div
                            style={{
                                position: 'absolute', inset: 0,
                                background: pIdx === 0
                                    ? 'linear-gradient(to bottom, rgba(217,119,6,0.04), transparent, rgba(0,0,0,1))'
                                    : 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(217,119,6,0.04), rgba(0,0,0,1))',
                                pointerEvents: 'none',
                            }}
                            aria-hidden="true"
                        />

                        <div style={{ maxWidth: '800px', width: '100%', textAlign: 'center', position: 'relative', zIndex: 10 }}>
                            {/* Eyebrow */}
                            {panel.eyebrow && (
                                <FadeIn stagger={0} direction="up">
                                    <p className="t-eyebrow" style={{ color: 'var(--color-amber)', opacity: 0.7, marginBottom: 'var(--space-xl)', letterSpacing: '3px' }}>
                                        {panel.eyebrow}
                                    </p>
                                </FadeIn>
                            )}

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
                                    <div style={{ width: '48px', height: '2px', background: 'var(--color-amber)', marginBottom: 'var(--space-xl)' }} aria-hidden="true" />

                                    <div style={{ position: 'relative', marginBottom: 'var(--space-lg)' }}>
                                        {/* A3: Hover effect via CSS class .vision-avatar — no inline handlers */}
                                        <div className="vision-avatar-wrapper" style={{
                                            width: '128px',
                                            height: '128px',
                                            borderRadius: '50%',
                                            overflow: 'hidden',
                                            border: '2px solid rgba(217,119,6,0.3)',
                                            transition: 'border-color 0.3s',
                                        }}>
                                            <img
                                                src={panel.photo}
                                                alt={`Photo de ${panel.name}`}
                                                width={128}
                                                height={128}
                                                loading="lazy"
                                                decoding="async"
                                                className="vision-avatar"
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    objectPosition: 'top',
                                                    filter: 'grayscale(30%)',
                                                    transition: 'filter 0.5s',
                                                }}
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