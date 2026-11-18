import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, AlertCircle, ArrowRight, Check } from 'lucide-react';
import { apiFetch } from '../../util/api';
import FadeIn from './FadeIn';
import TiltCard from '../fx/TiltCard';
import SuccessBurst from '../fx/SuccessBurst';
import useShake from '../fx/useShake';

const EXPO = [0.16, 1, 0.3, 1];

const feedback = {
    initial: { opacity: 0, height: 0, y: -10 },
    animate: { opacity: 1, height: 'auto', y: 0, transition: { duration: 0.45, ease: EXPO } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.3 } },
};

const Contact = ({ verset }) => {
    const [form, setForm] = useState({ nom: '', email: '', message: '' });
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState('');
    const [formRef, shake] = useShake();
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

    const fail = (message) => {
        setError(message);
        shake();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.nom.trim() || !form.email.trim() || !form.message.trim()) {
            fail('Tous les champs sont requis.');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            fail('Adresse email invalide.');
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
                fail(err.message || 'Une erreur est survenue.');
                setStatus('error');
                setTimeout(() => { if (isMountedRef.current) setStatus('idle'); }, 5000);
            }
        }
    };

    const words = verset.verset.split(' ');

    return (
        <div className="section-container ct" style={{ maxWidth: '1100px', position: 'relative', zIndex: 10 }}>
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
                    <motion.div ref={formRef} className="ct-card glass-gold gold-border">
                        <span className="ct-glow" aria-hidden="true" />

                        {/* A6: aria-live region for dynamic status messages */}
                        <div role="status" aria-live="polite" aria-atomic="true">
                            <AnimatePresence initial={false}>
                                {status === 'success' && (
                                    <motion.div key="ok" {...feedback} className="gx-feedback gx-feedback--ok">
                                        <SuccessBurst size={44} />
                                        <p>Message envoyé avec succès !</p>
                                    </motion.div>
                                )}
                                {error && (
                                    <motion.div key="err" {...feedback} className="gx-feedback gx-feedback--err">
                                        <AlertCircle size={18} aria-hidden="true" />
                                        <p>{error}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }} noValidate>
                            {[
                                { label: 'Nom complet', name: 'nom', type: 'text', placeholder: 'Jean Kouassi', autocomplete: 'name' },
                                { label: 'Adresse email', name: 'email', type: 'email', placeholder: 'vous@email.com', autocomplete: 'email' },
                            ].map(({ label, name, type, placeholder, autocomplete }) => (
                                <div key={name} className="gx-group">
                                    <label htmlFor={`contact-${name}`} className="gx-label">
                                        {label}
                                    </label>
                                    <div className="gx-field">
                                        <input
                                            id={`contact-${name}`}
                                            type={type}
                                            name={name}
                                            value={form[name]}
                                            onChange={handleChange}
                                            placeholder={placeholder}
                                            autoComplete={autocomplete}
                                            className="gx-input"
                                            disabled={status === 'loading'}
                                            required
                                        />
                                        <Check size={16} className="gx-ok" aria-hidden="true" />
                                    </div>
                                </div>
                            ))}
                            <div className="gx-group">
                                <label htmlFor="contact-message" className="gx-label">
                                    Message
                                </label>
                                <div className="gx-field">
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder="Comment pouvons-nous vous aider ?"
                                        className="gx-input"
                                        style={{ height: '120px', resize: 'none' }}
                                        disabled={status === 'loading'}
                                        required
                                    />
                                    <Check size={16} className="gx-ok gx-ok--top" aria-hidden="true" />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className={`btn-engage gx-submit ${status === 'loading' ? 'is-loading' : ''}`}
                                aria-busy={status === 'loading'}
                            >
                                {status === 'loading' ? (
                                    <>
                                        <span className="gx-spinner" aria-hidden="true" />
                                        <span>Envoi en cours...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Envoyer le message</span>
                                        <ArrowRight size={16} className="btn-engage-arrow" />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </FadeIn>

                <FadeIn stagger={2} direction="up">
                    <TiltCard max={5} className="ct-verse glass-gold">
                        <span className="ct-verse-glow" aria-hidden="true" />

                        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                            <motion.div
                                className="ct-quote"
                                initial={{ scale: 0, rotate: -90 }}
                                whileInView={{ scale: 1, rotate: 0 }}
                                viewport={{ once: true }}
                                transition={{ type: 'spring', stiffness: 160, damping: 12, delay: 0.2 }}
                                aria-hidden="true"
                            >
                                <Quote size={14} />
                            </motion.div>

                            <span className="t-eyebrow" style={{ color: 'rgba(217,119,6,0.6)', display: 'block', marginBottom: 'var(--space-lg)', fontSize: '11px', letterSpacing: '2px' }}>
                                {verset.ref}
                            </span>

                            {/* Le verset s'illumine mot par mot */}
                            <blockquote>
                                <motion.p
                                    className="t-heading-sm"
                                    style={{ color: 'var(--color-on-primary)', lineHeight: 1.4, marginBottom: 'var(--space-xl)' }}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.4 }}
                                    variants={{ visible: { transition: { staggerChildren: 0.045, delayChildren: 0.3 } } }}
                                >
                                    {words.map((w, i) => (
                                        <motion.span
                                            key={i}
                                            className="ct-word"
                                            variants={{
                                                hidden: { opacity: 0.08, y: 14, filter: 'blur(6px)' },
                                                visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EXPO } },
                                            }}
                                        >
                                            {w}{' '}
                                        </motion.span>
                                    ))}
                                </motion.p>
                            </blockquote>

                            <motion.div
                                style={{ width: '40px', height: '1px', background: 'rgba(217,119,6,0.6)', margin: '0 auto var(--space-lg)' }}
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 1, ease: EXPO }}
                                aria-hidden="true"
                            />

                            <p className="t-micro-caps" style={{ color: 'var(--color-mute)' }}>
                                Église Jeunes Prodiges
                            </p>
                        </div>
                    </TiltCard>
                </FadeIn>
            </div>
        </div>
    );
};

export default Contact;
