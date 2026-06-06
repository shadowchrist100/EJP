import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import FadeIn from '../../common/FadeIn';

/**
 * FirstStepsSection — CTA interlude for newcomers.
 * DESIGN.md pattern: cinematic atmospheric interlude with scrim bg,
 * eyebrow + display lockup, button-primary-on-dark CTA.
 */
const FirstStepsSection = () => (
    <section id="premierpas" className="section-spacing-lg" style={{ background: 'var(--color-primary)', overflow: 'hidden', position: 'relative' }}>
        {/* Background watermark */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', userSelect: 'none', overflow: 'hidden' }}>
            <span className="t-display" style={{ fontSize: '16vw', color: 'rgba(255,255,255,0.015)', lineHeight: 1, whiteSpace: 'nowrap' }}>
                PREMIERS PAS
            </span>
        </div>

        {/* Ambient glow */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '500px', height: '300px', background: 'rgba(217,119,6,0.04)', borderRadius: '50%', filter: 'blur(120px)', pointerEvents: 'none' }} />

        <div className="section-container" style={{ textAlign: 'center', position: 'relative', zIndex: 10, maxWidth: '640px' }}>
            <FadeIn stagger={0} direction="up">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
                    <div className="hairline-amber" style={{ width: '32px' }} />
                    <span className="t-eyebrow" style={{ color: 'var(--color-amber)', opacity: 0.7 }}>
                        Nouveau ici ?
                    </span>
                    <div className="hairline-amber" style={{ width: '32px' }} />
                </div>
            </FadeIn>

            <FadeIn stagger={1} direction="up">
                <h2 className="t-display" style={{ color: 'var(--color-on-primary)', fontSize: 'clamp(32px, 7vw, 56px)', marginBottom: 'var(--space-xl)' }}>
                    Mes premiers pas avec <span className="shimmer-gold">Jesus</span>
                </h2>
            </FadeIn>

            <FadeIn stagger={2} direction="up">
                <p className="t-body" style={{ color: 'var(--color-stone)', lineHeight: 1.7, marginBottom: 'var(--space-xxl)', maxWidth: '480px', margin: '0 auto var(--space-xxl)' }}>
                    Tu commences ta marche avec Jesus ? Laisse-nous t'accompagner pour bâtir des fondements solides pour ta nouvelle vie.
                </p>
            </FadeIn>

            <FadeIn stagger={3} direction="up">
                <Link to="/salvation" className="btn-primary-on-dark" style={{ padding: '12px 32px', height: '44px', gap: '12px' }}>
                    Inscris-toi maintenant
                    <ArrowRight size={16} />
                </Link>
            </FadeIn>
        </div>
    </section>
);

export default FirstStepsSection;
