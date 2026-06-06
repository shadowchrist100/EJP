import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';
import FadeIn from '../../common/FadeIn';

/**
 * TestimonialSection — editorial testimonial carousel.
 * Follows DESIGN.md: eyebrow + display lockup, flat card with
 * hairline border, no shadow, amber accent reserved for name badge.
 */
const TestimonialSection = () => {
    const testimonials = [
        { name: "Audrey", title: "L'Église de mes rêves", text: "Je n'aurais pas pu rêver d'une meilleure église. Moi qui me sentais seule, je me sens tellement mieux maintenant à l'EJP !" },
        { name: "Owen", title: "J'aime mon église !", text: "Depuis que je suis à l'EJP, j'attends dimanche après dimanche avec impatience. Merci Seigneur pour Ta grâce." },
        { name: "Grace", title: "Transformée", text: "L'EJP a changé ma façon de voir la vie. Une communauté qui aime, qui prie, qui avance ensemble. Je ne l'échangerais contre rien." },
    ];

    const [idx, setIdx] = useState(0);
    const [fading, setFading] = useState(false);

    const goTo = (next) => {
        setFading(true);
        setTimeout(() => { setIdx(next); setFading(false); }, 350);
    };

    useEffect(() => {
        const id = setInterval(() => goTo((idx + 1) % testimonials.length), 6000);
        return () => clearInterval(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idx]);

    const t = testimonials[idx];

    return (
        <section className="section-spacing-lg" style={{ background: 'var(--color-primary)', overflow: 'hidden', position: 'relative' }}>
            {/* Background watermark */}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', userSelect: 'none', overflow: 'hidden' }}>
                <span className="t-display" style={{ fontSize: '18vw', color: 'rgba(255,255,255,0.015)', lineHeight: 1, whiteSpace: 'nowrap', letterSpacing: '-2px' }}>
                    TÉMOIGNAGES
                </span>
            </div>

            <div className="section-container" style={{ maxWidth: '800px', position: 'relative', zIndex: 10 }}>
                {/* Eyebrow + display lockup */}
                <FadeIn stagger={0} direction="up">
                    <div style={{ textAlign: 'center', marginBottom: 'var(--space-xxl)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-sm)' }}>
                            <div className="hairline-amber" style={{ width: '32px' }} />
                            <span className="t-eyebrow" style={{ color: 'var(--color-amber)', opacity: 0.7 }}>
                                Paroles de Prodiges
                            </span>
                            <div className="hairline-amber" style={{ width: '32px' }} />
                        </div>
                        <h2 className="t-display" style={{ color: 'var(--color-on-primary)', fontSize: 'clamp(32px, 7vw, 49px)' }}>
                            Ils témoignent
                        </h2>
                    </div>
                </FadeIn>

                {/* Testimonial card — flat, hairline border, no shadow */}
                <FadeIn stagger={1} direction="up">
                    <div style={{
                        position: 'relative',
                        border: '1px solid rgba(255,255,255,0.06)',
                        padding: 'var(--space-xxl) var(--space-xl)',
                        overflow: 'hidden',
                    }}>
                        {/* Amber corner accent (decorative, per DESIGN.md's "no badge, just tonal cue" pattern) */}
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '48px', height: '48px', borderTop: '2px solid rgba(217,119,6,0.3)', borderLeft: '2px solid rgba(217,119,6,0.3)' }} />
                        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '48px', height: '48px', borderBottom: '2px solid rgba(217,119,6,0.3)', borderRight: '2px solid rgba(217,119,6,0.3)' }} />

                        <div
                            style={{
                                position: 'relative',
                                zIndex: 10,
                                textAlign: 'center',
                                transition: 'opacity 0.35s ease, transform 0.35s ease',
                                opacity: fading ? 0 : 1,
                                transform: fading ? 'translateY(8px)' : 'translateY(0)',
                            }}
                        >
                            <Quote style={{ margin: '0 auto var(--space-xl)', color: 'rgba(217,119,6,0.2)' }} size={40} />

                            <h3 className="t-heading-md" style={{ color: 'var(--color-on-primary)', marginBottom: 'var(--space-lg)', fontSize: 'clamp(24px, 4vw, 36px)' }}>
                                "{t.title}"
                            </h3>

                            <p className="t-subtitle" style={{ color: 'var(--color-stone)', fontStyle: 'italic', lineHeight: 1.6, marginBottom: 'var(--space-xl)', maxWidth: '560px', margin: '0 auto var(--space-xl)' }}>
                                {t.text}
                            </p>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-sm)' }}>
                                <div className="hairline-amber" style={{ width: '24px' }} />
                                <span className="t-eyebrow" style={{ color: 'var(--color-amber)', fontSize: '12px', letterSpacing: '2px' }}>
                                    {t.name}
                                </span>
                                <div className="hairline-amber" style={{ width: '24px' }} />
                            </div>
                        </div>
                    </div>
                </FadeIn>

                {/* Navigation dots */}
                <FadeIn stagger={2} direction="none">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-md)', marginTop: 'var(--space-xl)' }}>
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                style={{
                                    height: '2px',
                                    width: i === idx ? '40px' : '12px',
                                    background: i === idx ? 'var(--color-amber)' : 'rgba(255,255,255,0.15)',
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
        </section>
    );
};

export default TestimonialSection;
