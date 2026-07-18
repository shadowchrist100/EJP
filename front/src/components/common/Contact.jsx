import { useState, useEffect, useRef } from 'react';
import { Quote, AlertCircle, CheckCircle } from 'lucide-react';
import { apiFetch } from '../../util/api';
import FadeIn from './FadeIn';

const Contact = ({ verset }) => {
    const [form, setForm] = useState({ nom: '', email: '', message: '' });
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState('');
    // U3: Use a ref to cancel setState calls if the component unmounts before the timer fires
    const isMountedRef = useRef(true);

    useEffect(() => {
        isMountedRef.current = true;
        return () => { isMountedRef.current = false; };
    }, []);

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.nom.trim() || !form.email.trim() || !form.message.trim()) {
            setError('Tous les champs sont requis.');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            setError('Adresse email invalide.');
            return;
        }

        setStatus('loading');
        try {
            await apiFetch('/contact', {
                method: 'POST',
                body: JSON.stringify(form),
            });
            if (isMountedRef.current) {
                setStatus('success');
                setForm({ nom: '', email: '', message: '' });
                // U3: Only call setState if still mounted
                setTimeout(() => { if (isMountedRef.current) setStatus('idle'); }, 5000);
            }
        } catch (err) {
            if (isMountedRef.current) {
                setError(err.message || 'Une erreur est survenue.');
                setStatus('error');
                setTimeout(() => { if (isMountedRef.current) setStatus('idle'); }, 5000);
            }
        }
    };

    return (
        <div className="section-container" style={{ maxWidth: '1100px', position: 'relative', zIndex: 10 }}>
            <FadeIn stagger={0} direction="up">
                <div style={{ textAlign: 'center', marginBottom: 'var(--space-xxl)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-sm)' }}>
                        <div className="hairline-amber" style={{ width: '32px' }} aria-hidden="true" />
                        <span className="t-eyebrow" style={{ color: 'var(--color-amber)', opacity: 0.7 }}>
                            Contactez-nous
                        </span>
                        <div className="hairline-amber" style={{ width: '32px' }} aria-hidden="true" />
                    </div>
                    <h2 className="t-display" style={{ color: 'var(--color-on-primary)', fontSize: 'clamp(32px, 8vw, 56px)' }}>
                        Une <span className="shimmer-gold">Question ?</span>
                    </h2>
                </div>
            </FadeIn>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', gap: 'var(--space-md)' }}>
                <FadeIn stagger={1} direction="up">
                    <div style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        padding: 'var(--space-xl)',
                    }}>
                        {/* A6: aria-live region for dynamic status messages */}
                        <div
                            role="status"
                            aria-live="polite"
                            aria-atomic="true"
                        >
                            {status === 'success' && (
                                <div style={{ marginBottom: 'var(--space-lg)', padding: '12px 16px', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <CheckCircle size={18} style={{ color: '#22c55e', flexShrink: 0 }} aria-hidden="true" />
                                    <p style={{ color: '#86efac', fontSize: '14px', margin: 0 }}>Message envoyé avec succès !</p>
                                </div>
                            )}
                            {error && (
                                <div style={{ marginBottom: 'var(--space-lg)', padding: '12px 16px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <AlertCircle size={18} style={{ color: '#ef4444', flexShrink: 0 }} aria-hidden="true" />
                                    <p style={{ color: '#fca5a5', fontSize: '14px', margin: 0 }}>{error}</p>
                                </div>
                            )}
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }} noValidate>
                            {[
                                { label: 'Nom complet', name: 'nom', type: 'text', placeholder: 'Jean Kouassi', autocomplete: 'name' },
                                { label: 'Adresse email', name: 'email', type: 'email', placeholder: 'vous@email.com', autocomplete: 'email' },
                            ].map(({ label, name, type, placeholder, autocomplete }) => (
                                <div key={name}>
                                    <label
                                        htmlFor={`contact-${name}`}
                                        className="t-meta"
                                        style={{ display: 'block', color: 'var(--color-stone)', marginBottom: 'var(--space-xs)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 500 }}
                                    >
                                        {label}
                                    </label>
                                    <input
                                        id={`contact-${name}`}
                                        type={type}
                                        name={name}
                                        value={form[name]}
                                        onChange={handleChange}
                                        placeholder={placeholder}
                                        autoComplete={autocomplete}
                                        className="input-field"
                                        disabled={status === 'loading'}
                                        required
                                    />
                                </div>
                            ))}
                            <div>
                                <label
                                    htmlFor="contact-message"
                                    className="t-meta"
                                    style={{ display: 'block', color: 'var(--color-stone)', marginBottom: 'var(--space-xs)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 500 }}
                                >
                                    Message
                                </label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="Comment pouvons-nous vous aider ?"
                                    className="input-field"
                                    style={{ height: '120px', resize: 'none' }}
                                    disabled={status === 'loading'}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="btn-primary"
                                style={{ width: '100%', height: '44px', marginTop: 'var(--space-xs)' }}
                                aria-busy={status === 'loading'}
                            >
                                {status === 'loading' ? 'Envoi en cours...' : 'Envoyer le message'}
                            </button>
                        </form>
                    </div>
                </FadeIn>

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
                        <div style={{ position: 'absolute', top: 0, right: 0, width: '160px', height: '160px', background: 'rgba(217,119,6,0.06)', borderRadius: '50%', filter: 'blur(60px)' }} aria-hidden="true" />

                        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                            <div style={{
                                width: '32px',
                                height: '32px',
                                border: '1px solid rgba(217,119,6,0.25)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto var(--space-xl)',
                            }} aria-hidden="true">
                                <Quote size={14} style={{ color: 'rgba(217,119,6,0.5)' }} />
                            </div>

                            <span className="t-eyebrow" style={{ color: 'rgba(217,119,6,0.6)', display: 'block', marginBottom: 'var(--space-lg)', fontSize: '11px', letterSpacing: '2px' }}>
                                {verset.ref}
                            </span>

                            <blockquote>
                                <p className="t-heading-sm" style={{ color: 'var(--color-on-primary)', lineHeight: 1.4, marginBottom: 'var(--space-xl)' }}>
                                    {verset.verset}
                                </p>
                            </blockquote>

                            <div style={{ width: '40px', height: '1px', background: 'rgba(217,119,6,0.3)', margin: '0 auto var(--space-lg)' }} aria-hidden="true" />

                            <p className="t-micro-caps" style={{ color: 'var(--color-mute)' }}>
                                Église Jeunes Prodiges
                            </p>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </div>
    );
};

export default Contact;
