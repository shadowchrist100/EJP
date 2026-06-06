import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import FadeIn from '../../common/FadeIn';

/**
 * DonationSection — editorial CTA band.
 * DESIGN.md pattern: eyebrow + display lockup, body italic quote,
 * button-ghost CTA, massive background watermark text.
 */
const DonationSection = () => (
    <section className="section-spacing-lg" style={{ background: 'var(--color-primary)', overflow: 'hidden', position: 'relative', padding: 'var(--space-section-lg) 0' }}>
        {/* Massive background text */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', userSelect: 'none', overflow: 'hidden' }}>
            <span className="t-display" style={{
                fontSize: '22vw',
                color: 'rgba(255,255,255,0.015)',
                lineHeight: 1,
                whiteSpace: 'nowrap',
                transform: 'rotate(-8deg)',
                letterSpacing: '-3px',
            }}>
                DONNER
            </span>
        </div>

        {/* Vertical amber hairlines */}
        <div style={{ position: 'absolute', left: '80px', top: 0, bottom: 0, width: '1px', background: 'linear-gradient(to bottom, transparent, rgba(217,119,6,0.1), transparent)' }} className="hidden lg:block" />
        <div style={{ position: 'absolute', right: '80px', top: 0, bottom: 0, width: '1px', background: 'linear-gradient(to bottom, transparent, rgba(217,119,6,0.1), transparent)' }} className="hidden lg:block" />

        <div className="section-container" style={{ textAlign: 'center', maxWidth: '800px', position: 'relative', zIndex: 10 }}>
            <FadeIn stagger={0} direction="up">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
                    <div className="hairline-amber" style={{ width: '32px' }} />
                    <span className="t-eyebrow" style={{ color: 'var(--color-amber)', opacity: 0.7 }}>
                        Soutenir la vision
                    </span>
                    <div className="hairline-amber" style={{ width: '32px' }} />
                </div>
            </FadeIn>

            <FadeIn stagger={1} direction="up">
                <h2 className="t-display" style={{ color: 'var(--color-on-primary)', fontSize: 'clamp(40px, 10vw, 80px)', marginBottom: 'var(--space-lg)' }}>
                    Faire un <span className="shimmer-gold">Don</span>
                </h2>
            </FadeIn>

            <FadeIn stagger={2} direction="up">
                <p className="t-subtitle" style={{ color: 'var(--color-mute)', fontStyle: 'italic', marginBottom: 'var(--space-xxl)', maxWidth: '440px', margin: '0 auto var(--space-xxl)', lineHeight: 1.5 }}>
                    "Dieu aime celui qui donne avec joie." (2 Cor 9:7)
                </p>
            </FadeIn>

            <FadeIn stagger={3} direction="up">
                <Link to="/dons" className="btn-ghost" style={{ padding: '12px 32px', height: '44px', gap: '12px' }}>
                    Soutenir la vision
                    <ArrowRight size={16} />
                </Link>
            </FadeIn>
        </div>
    </section>
);

export default DonationSection;
