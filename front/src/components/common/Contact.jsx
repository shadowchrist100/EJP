import { Quote } from 'lucide-react';
import FadeIn from './FadeIn';

/**
 * Contact — DESIGN.md form-field pattern with editorial layout.
 * Bottom-rule inputs, eyebrow + display lockup, bible quote panel.
 */
const Contact = ({ verset }) => (
    <div className="section-container" style={{ maxWidth: '1100px', position: 'relative', zIndex: 10 }}>
        {/* Header — eyebrow + display */}
        <FadeIn stagger={0} direction="up">
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-xxl)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-sm)' }}>
                    <div className="hairline-amber" style={{ width: '32px' }} />
                    <span className="t-eyebrow" style={{ color: 'var(--color-amber)', opacity: 0.7 }}>
                        Contactez-nous
                    </span>
                    <div className="hairline-amber" style={{ width: '32px' }} />
                </div>
                <h2 className="t-display" style={{ color: 'var(--color-on-primary)', fontSize: 'clamp(32px, 8vw, 56px)' }}>
                    Une <span className="shimmer-gold">Question ?</span>
                </h2>
            </div>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', gap: 'var(--space-md)' }}>
            {/* Form — form-field tokens */}
            <FadeIn stagger={1} direction="up">
                <div style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    padding: 'var(--space-xl)',
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
                        {[
                            { label: 'Nom complet', type: 'text', placeholder: 'Jean Kouassi' },
                            { label: 'Adresse email', type: 'email', placeholder: 'vous@email.com' },
                        ].map(({ label, type, placeholder }) => (
                            <div key={label}>
                                <label className="t-meta" style={{ display: 'block', color: 'var(--color-stone)', marginBottom: 'var(--space-xs)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 500 }}>
                                    {label}
                                </label>
                                <input type={type} placeholder={placeholder} className="input-field" />
                            </div>
                        ))}
                        <div>
                            <label className="t-meta" style={{ display: 'block', color: 'var(--color-stone)', marginBottom: 'var(--space-xs)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 500 }}>
                                Message
                            </label>
                            <textarea
                                placeholder="Comment pouvons-nous vous aider ?"
                                className="input-field"
                                style={{ height: '120px', resize: 'none' }}
                            />
                        </div>
                        <button className="btn-primary" style={{ width: '100%', height: '44px', marginTop: 'var(--space-xs)' }}>
                            Envoyer le message
                        </button>
                    </div>
                </div>
            </FadeIn>

            {/* Bible quote panel */}
            <FadeIn stagger={2} direction="up">
                <div style={{
                    position: 'relative',
                    background: 'rgba(0,0,0,0.5)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    padding: 'var(--space-xl)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    minHeight: '300px',
                }}>
                    {/* Ambient amber glow */}
                    <div style={{ position: 'absolute', top: 0, right: 0, width: '160px', height: '160px', background: 'rgba(217,119,6,0.06)', borderRadius: '50%', filter: 'blur(60px)' }} />

                    <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            border: '1px solid rgba(217,119,6,0.25)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto var(--space-xl)',
                        }}>
                            <Quote size={14} style={{ color: 'rgba(217,119,6,0.5)' }} />
                        </div>

                        <span className="t-eyebrow" style={{ color: 'rgba(217,119,6,0.6)', display: 'block', marginBottom: 'var(--space-lg)', fontSize: '11px', letterSpacing: '2px' }}>
                            {verset.ref}
                        </span>

                        <p className="t-heading-sm" style={{ color: 'var(--color-on-primary)', lineHeight: 1.4, marginBottom: 'var(--space-xl)' }}>
                            {verset.verset}
                        </p>

                        <div style={{ width: '40px', height: '1px', background: 'rgba(217,119,6,0.3)', margin: '0 auto var(--space-lg)' }} />

                        <p className="t-micro-caps" style={{ color: 'var(--color-mute)' }}>
                            Église Jeunes Prodiges
                        </p>
                    </div>
                </div>
            </FadeIn>
        </div>
    </div>
);

export default Contact;