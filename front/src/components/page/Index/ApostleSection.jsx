import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import FadeIn from '../../common/FadeIn';
import { PP } from '../../../assets';

/**
 * ApostleSection — editorial two-column layout following DESIGN.md's
 * research-card pattern (5/7 split), eyebrow + display lockup, and
 * cinematic photography treatment.
 */
const ApostleSection = () => (
    <section className="section-spacing-lg" style={{ background: 'var(--color-primary)', overflow: 'hidden', position: 'relative' }}>
        {/* Subtle ambient glow */}
        <div
            style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '600px', height: '300px', background: 'rgba(217,119,6,0.03)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none' }}
            aria-hidden="true"
        />

        <div className="section-container" style={{ position: 'relative', zIndex: 10 }}>
            <div style={{ gap: 'var(--space-section)', alignItems: 'center' }} className="grid grid-cols-1 md:grid-cols-2">
                {/* Left — text column */}
                <div style={{ position: 'relative', zIndex: 10 }}>
                    {/* Eyebrow */}
                    <FadeIn stagger={0} direction="left">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
                            <div className="hairline-amber" style={{ width: '32px' }} aria-hidden="true" />
                            <span className="t-eyebrow" style={{ color: 'var(--color-amber)', opacity: 0.7 }}>
                                Notre Papa
                            </span>
                        </div>
                    </FadeIn>

                    {/* Display headline */}
                    <FadeIn stagger={1} direction="left">
                        <h2 style={{ margin: '0 0 var(--space-xl)' }}>
                            <span className="t-display" style={{ display: 'block', color: 'var(--color-on-primary)', fontSize: 'clamp(36px, 6vw, 56px)' }}>
                                Apôtre
                            </span>
                            <span className="shimmer-gold" style={{ display: 'block', fontSize: 'clamp(36px, 6vw, 56px)', fontWeight: 400, lineHeight: 1, letterSpacing: '-1.2px' }}>
                                Yvan Castanou
                            </span>
                        </h2>
                    </FadeIn>

                    {/* Hairline */}
                    <FadeIn stagger={2} direction="left">
                        <div style={{ width: '32px', height: '1px', background: 'var(--color-amber)', margin: '0 0 var(--space-xl)' }} aria-hidden="true" />
                    </FadeIn>

                    {/* Quote */}
                    <FadeIn stagger={3} direction="left">
                        <blockquote style={{
                            borderLeft: '2px solid rgba(217,119,6,0.3)',
                            paddingLeft: 'var(--space-lg)',
                            margin: '0 0 var(--space-xl)',
                        }}>
                            <p className="t-subtitle" style={{ color: 'rgba(255,255,255,0.7)', fontStyle: 'italic', lineHeight: 1.5 }}>
                                "La jeunesse n'est pas un problème à gérer,
                                c'est une puissance à libérer."
                            </p>
                        </blockquote>
                    </FadeIn>

                    {/* Body copy */}
                    <FadeIn stagger={4} direction="left">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
                            <p className="t-body" style={{ color: 'var(--color-stone)', lineHeight: 1.7 }}>
                                Apôtre Yvan Castanou est le fondateur et superviseur général de l'Église
                                des Jeunes Prodiges (EJP), un mouvement né de la conviction profonde que
                                Dieu appelle la jeunesse à une destinée extraordinaire.
                            </p>
                            <p className="t-body" style={{ color: 'var(--color-stone)', lineHeight: 1.7 }}>
                                Visionnaire, orateur, homme de foi et passionné de Dieu, il porte depuis plus de deux
                                décennies un message de transformation, d'excellence et de consécration
                                au service du Royaume de Dieu.
                            </p>
                            <p className="t-body" style={{ color: 'var(--color-stone)', lineHeight: 1.7 }}>
                                À travers l'EJP, il incarne une vision claire : former une
                                génération de jeunes disciples enflammés, capables d'impacter leur
                                génération pour la gloire de Dieu.
                            </p>
                        </div>
                    </FadeIn>

                    {/* CTA */}
                    <FadeIn stagger={5} direction="left">
                        <Link
                            to="/apropos"
                            className="t-link-sm apostle-cta"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.2s' }}
                        >
                            En savoir plus <ArrowRight size={14} aria-hidden="true" />
                        </Link>
                    </FadeIn>
                </div>

                {/* Right — photo (desktop only) */}
                {/* A3: Hover effect moved to CSS class .apostle-photo — no inline onMouseEnter/Leave */}
                <FadeIn stagger={2} direction="right" className="hidden md:block">
                    <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--rounded-lg)' }} className="apostle-photo-wrapper">
                        <img
                            src={PP}
                            alt="Portrait de l'Apôtre Yvan Castanou"
                            width={600}
                            height={600}
                            loading="lazy"
                            decoding="async"
                            className="apostle-photo"
                            style={{
                                width: '100%',
                                height: '600px',
                                objectFit: 'cover',
                                objectPosition: 'top',
                                filter: 'grayscale(15%) brightness(0.85) contrast(1.1)',
                                transition: 'transform 1.2s cubic-bezier(0.16,1,0.3,1)',
                            }}
                        />
                        {/* Gradient fades */}
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.6), transparent 30%)' }} aria-hidden="true" />
                        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '120px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} aria-hidden="true" />

                        {/* Badge */}
                        <div style={{ position: 'absolute', bottom: 'var(--space-lg)', left: 'var(--space-lg)', zIndex: 20, display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '6px', height: '6px', background: 'var(--color-amber)', transform: 'rotate(45deg)' }} aria-hidden="true" />
                            <span className="t-micro-caps" style={{ color: 'rgba(255,255,255,0.5)' }}>
                                EJP Porto-Novo · Bénin
                            </span>
                        </div>
                    </div>
                </FadeIn>
            </div>

            {/* Mobile photo (background, low opacity) */}
            <div className="md:hidden" style={{ position: 'absolute', inset: 0, opacity: 0.15, zIndex: 0, overflow: 'hidden' }} aria-hidden="true">
                <img
                    src={PP}
                    alt=""
                    width={600}
                    height={600}
                    loading="lazy"
                    decoding="async"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'top',
                        filter: 'grayscale(30%) brightness(0.6)',
                    }}
                />
            </div>
        </div>
    </section>
);

export default ApostleSection;
