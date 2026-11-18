import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Nav, Footer, Contact } from '../'
import { Heart, ArrowRight, Mail, User, Phone, Lock, Check, AlertCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { apiFetch } from '../../util/api';
import GoldParticles from '../fx/GoldParticles';
import TiltCard from '../fx/TiltCard';
import SuccessBurst from '../fx/SuccessBurst';
import useScrollReveal from '../fx/useScrollReveal';
import useShake from '../fx/useShake';

gsap.registerPlugin(ScrollTrigger, SplitText);

const EXPO = [0.16, 1, 0.3, 1];

/* ─── Animation Variants ─────────────────────────────────────────────── */

const stepTransition = {
    initial: { opacity: 0, y: 60, scale: 0.97, filter: 'blur(10px)' },
    animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: EXPO } },
    exit: { opacity: 0, y: -40, scale: 0.97, filter: 'blur(10px)', transition: { duration: 0.35, ease: 'easeIn' } }
};

const feedback = {
    initial: { opacity: 0, height: 0, y: -10 },
    animate: { opacity: 1, height: 'auto', y: 0, transition: { duration: 0.45, ease: EXPO } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.3 } },
};

/* ─── Hero Banner ─────────────────────────────────────────────────────── */
const HeroBanner = () => {
    const ref = useRef(null);

    useLayoutEffect(() => {
        const mm = gsap.matchMedia();
        const ctx = gsap.context(() => {
            mm.add('(prefers-reduced-motion: no-preference)', () => {
                const a = SplitText.create('.sv-title-a', { type: 'words,chars', mask: 'chars' });
                const b = SplitText.create('.sv-title-b', { type: 'words,chars', mask: 'chars', charsClass: 'shimmer-gold' });
                const lead = SplitText.create('.sv-lead', { type: 'words' });
                gsap.timeline({ defaults: { ease: 'expo.out' } })
                    .fromTo('.sv-beam', { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, duration: 2.2, ease: 'expo.inOut' }, 0)
                    .fromTo('.sv-badge', { y: 30, opacity: 0, scale: 0.8 }, { y: 0, opacity: 1, scale: 1, duration: 1, clearProps: 'transform' }, 0.5)
                    .from(a.chars, { yPercent: 120, duration: 1.2, stagger: 0.04 }, 0.65)
                    .from(b.chars, { yPercent: 120, rotate: 8, duration: 1.3, stagger: 0.035 }, 0.8)
                    .from(lead.words, { opacity: 0, y: 18, filter: 'blur(8px)', duration: 0.9, stagger: 0.025 }, 1.2)
                    .fromTo('.sv-cta', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, clearProps: 'transform,opacity' }, 1.6);

                // Scroll: the content rises into the light while the beam opens wide.
                gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true } })
                    .to('.sv-hero-copy', { yPercent: -30, opacity: 0, ease: 'none' }, 0)
                    .to('.sv-beam', { scaleX: 3.2, opacity: 0.5, ease: 'none' }, 0);
            });
        }, ref);
        return () => { mm.revert(); ctx.revert(); };
    }, []);

    return (
        <section ref={ref} className="sv-hero">
            <GoldParticles variant="rise" count={700} speed={1.5} />
            <span className="sv-beam" aria-hidden="true" />
            <span className="sv-halo" aria-hidden="true" />

            <div className="container mx-auto max-w-4xl relative z-10 sv-hero-copy">
                <div className="text-center">
                    {/* Badge */}
                    <div className="sv-badge inline-flex items-center gap-3 mb-8 px-4 py-2 glass-gold rounded-full">
                        <motion.div
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <Heart className="text-amber-500" size={16} />
                        </motion.div>
                        <span className="text-amber-500 font-bold tracking-[0.3em] uppercase text-xs">
                            Un Nouveau Commencement
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="sv-title text-5xl sm:text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
                        <span className="sv-title-a">La</span>{' '}
                        <span className="sv-title-b">Prière du Salut</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="sv-lead text-lg md:text-xl text-gray-300 font-light mb-12 leading-relaxed max-w-3xl mx-auto">
                        Accepte Jésus-Christ comme ton Seigneur et Sauveur personnel. C'est le moment de transformer ta vie et de commencer un nouveau voyage spirituel.
                    </p>

                    {/* CTA */}
                    <div className="sv-cta">
                        <a href="#prayer" className="btn-engage">
                            <Heart size={18} />
                            <span>Faire la prière</span>
                        </a>
                    </div>
                </div>
            </div>

            <span className="sv-scroll" aria-hidden="true"><i /></span>
        </section>
    );
};

/* ─── Prayer Points ───────────────────────────────────────────────────── */
const prayerPoints = [
    { title: "Reconnaître", description: "Reconnais que tu es un pécheur et que tu as besoin de Jésus", icon: "👁️" },
    { title: "Croire", description: "Crois que Jésus est mort et ressuscité pour tes péchés", icon: "✝️" },
    { title: "Confesse", description: "Confesse Jésus comme ton Seigneur et Sauveur personnel", icon: "💬" },
    { title: "Transformer", description: "Laisse-toi transformer par la puissance du Saint Esprit", icon: "🔥" }
];

const PrayerCard = ({ point, idx }) => (
    <div className={`sv-step ${idx % 2 ? 'is-right' : 'is-left'}`}>
        <span className="sv-node" aria-hidden="true">{String(idx + 1).padStart(2, '0')}</span>
        <TiltCard max={6} className="sv-step-card glass-gold">
            <span className="sv-step-num" aria-hidden="true">{String(idx + 1).padStart(2, '0')}</span>
            <div className="sv-step-icon">{point.icon}</div>
            <h3 className="text-2xl font-black text-white mb-3 tracking-tight">
                {point.title}
            </h3>
            <p className="text-gray-400 font-light leading-relaxed">{point.description}</p>
        </TiltCard>
    </div>
);

/* ─── Step 1 ──────────────────────────────────────────────────────────── */
const StepPrayer = ({ onNext }) => {
    const ref = useRef(null);
    useScrollReveal(ref);

    const faqs = [
        { q: "Qu'est-ce que la prière du salut?", a: "C'est une prière personnelle d'acceptation de Jésus-Christ comme Seigneur et Sauveur. C'est le début de ta relation avec Dieu." },
        { q: "Que se passe-t-il après la prière?", a: "Tu es sauvé et deviens enfant de Dieu. Il est important de te connecter à une communauté chrétienne et de commencer à apprendre la Bible." },
        { q: "Dois-je faire quelque chose de spécial?", a: "Après la prière, nous te recommandons de trouver une église, de lire la Bible et de partager ta décision avec d'autres." }
    ];

    /* Narration au scroll : le chemin doré se dessine, chaque étape s'allume à son passage,
       puis la prière s'illumine mot à mot. */
    useLayoutEffect(() => {
        const root = ref.current;
        const mm = gsap.matchMedia();
        const ctx = gsap.context(() => {
            mm.add('(prefers-reduced-motion: no-preference)', () => {
                gsap.fromTo('.sv-path-fill', { scaleY: 0 }, {
                    scaleY: 1, ease: 'none',
                    scrollTrigger: { trigger: '.sv-path', start: 'top 70%', end: 'bottom 60%', scrub: 0.6 },
                });

                gsap.utils.toArray('.sv-step', root).forEach((step) => {
                    const fromX = step.classList.contains('is-right') ? 110 : -110;
                    gsap.timeline({ scrollTrigger: { trigger: step, start: 'top 72%', once: true } })
                        .add(() => step.classList.add('is-lit'), 0)
                        .fromTo(step.querySelector('.sv-node'), { scale: 0 }, { scale: 1, duration: 0.8, ease: 'back.out(2.5)', clearProps: 'transform' }, 0)
                        .fromTo(step.querySelector('.sv-step-card'),
                            { x: fromX, opacity: 0, rotateY: fromX > 0 ? -25 : 25 },
                            { x: 0, opacity: 1, rotateY: 0, duration: 1.3, ease: 'expo.out', clearProps: 'transform,opacity' }, 0.1);
                });

                const words = SplitText.create('.sv-prayer-text', { type: 'words' }).words;
                gsap.fromTo(words, { opacity: 0.1, filter: 'blur(3px)' }, {
                    opacity: 1, filter: 'blur(0px)', stagger: 0.12, ease: 'none',
                    scrollTrigger: { trigger: '.sv-prayer', start: 'top 65%', end: 'bottom 75%', scrub: 0.5 },
                });
                gsap.fromTo('.sv-prayer-halo', { scale: 0.4, opacity: 0 }, {
                    scale: 1.1, opacity: 1, ease: 'none',
                    scrollTrigger: { trigger: '.sv-prayer', start: 'top 80%', end: 'center center', scrub: true },
                });
            });
        }, root);
        return () => { mm.revert(); ctx.revert(); };
    }, []);

    return (
        <motion.div ref={ref} {...stepTransition}>
            {/* Prayer Points */}
            <div className="mb-24">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter text-center" data-reveal="chars">
                    Les 4 étapes du <span className="text-amber-500">Salut</span>
                </h2>
                <div className="w-16 h-1 bg-linear-to-r from-amber-500 to-yellow-500 rounded-full mb-16 mx-auto" data-reveal="up" />

                <div className="sv-path">
                    <span className="sv-path-line" aria-hidden="true"><span className="sv-path-fill" /></span>
                    {prayerPoints.map((point, idx) => (
                        <PrayerCard key={idx} point={point} idx={idx} />
                    ))}
                </div>
            </div>

            {/* Prayer Text Box */}
            <div id="prayer" className="sv-prayer glass-gold gold-border">
                <span className="sv-prayer-halo" aria-hidden="true" />
                <h3 className="text-3xl md:text-4xl font-black text-white mb-10 tracking-tight text-center" data-reveal="chars">
                    Récite cette Prière
                </h3>

                <div className="text-gray-200 font-light max-w-3xl mx-auto mb-12 text-xl md:text-2xl leading-relaxed text-center">
                    <p className="sv-prayer-text">
                        <span className="text-amber-400 font-bold">"Seigneur Jésus,</span> je reconnais que je suis un pécheur. Je crois que Tu es mort et ressuscité pour mes péchés. Je T'accepte maintenant comme mon Seigneur et Sauveur personnel. Pardonne-moi et transforms ma vie. Je veux Te suivre et vivre pour Toi. Amen."
                    </p>
                </div>

                <div className="text-center relative">
                    <button type="button" onClick={onNext} className="btn-engage">
                        <span>J'ai Prié - S'inscrire Maintenant</span>
                        <ArrowRight size={16} className="btn-engage-arrow" />
                    </button>
                </div>
            </div>

            {/* FAQ */}
            <div className="mb-12">
                <h3 className="text-3xl font-black text-white mb-8 tracking-tighter" data-reveal="chars">
                    Questions <span className="text-amber-500">Fréquentes</span>
                </h3>
                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="sv-faq" data-reveal="up">
                            <h4 className="font-black text-white mb-2 text-lg">{faq.q}</h4>
                            <p className="text-gray-400 font-light text-sm">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

/* ─── Step 2: Form ────────────────────────────────────────────────────── */
const StepForm = ({ onBack, onSuccess }) => {
    const [formData, setFormData] = useState({
        lastName: '', firstName: '', email: '', password: '', telephone: '', message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [cardRef, shake] = useShake();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const fail = (message) => {
        setError(message);
        shake();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.lastName.trim() || !formData.firstName.trim() || !formData.email.trim() || !formData.password.trim()) {
            fail('Veuillez remplir tous les champs obligatoires.');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            fail('Adresse email invalide.');
            return;
        }
        if (formData.password.length < 8) {
            fail('Le mot de passe doit contenir au moins 8 caractères.');
            return;
        }

        setIsSubmitting(true);
        setError('');
        try {
            await apiFetch("/salvation", { method: "POST", body: JSON.stringify(formData) });
            onSuccess();
        } catch (err) {
            fail(err.message || "Une erreur est survenue lors de l'envoi");
        } finally {
            setIsSubmitting(false);
        }
    };

    const fields = [
        { label: 'Ton Nom', icon: <User size={14} />, inputs: [
            { name: 'lastName', placeholder: 'Dupont', type: 'text', autoComplete: 'family-name' },
            { name: 'firstName', placeholder: 'Jean', type: 'text', autoComplete: 'given-name' }
        ]},
        { label: 'Email', icon: <Mail size={14} />, inputs: [
            { name: 'email', placeholder: 'jean@example.com', type: 'email', autoComplete: 'email' }
        ]},
        { label: 'Password', icon: <Lock size={14} />, inputs: [
            { name: 'password', placeholder: 'Mot de passe', type: 'password', autoComplete: 'new-password', minLength: 8 }
        ]},
        { label: 'Téléphone (optionnel)', icon: <Phone size={14} />, inputs: [
            { name: 'telephone', placeholder: '+229 XX XXX XXX', type: 'tel' }
        ]},
    ];

    return (
        <motion.div {...stepTransition} className="max-w-2xl mx-auto">
            <motion.div ref={cardRef} className="sv-form glass-gold gold-border">
                <span className="ct-glow" aria-hidden="true" />
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: EXPO }}
                    className="text-4xl font-black text-white mb-2 tracking-tighter"
                >
                    Bienvenue en Famille! 🎉
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    className="text-gray-400 font-light mb-10"
                >
                    Remplis ce formulaire pour que nous puissions te soutenir dans ton nouveau voyage spirituel.
                </motion.p>

                <div role="status" aria-live="polite">
                    <AnimatePresence>
                        {error && (
                            <motion.div key="err" {...feedback} className="gx-feedback gx-feedback--err">
                                <AlertCircle size={18} aria-hidden="true" />
                                <p>{error}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <form onSubmit={handleSubmit} onInvalidCapture={shake} className="space-y-6">
                    {fields.map(({ label, icon, inputs }, fi) => (
                        <motion.div
                            key={fi}
                            className="gx-group"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, ease: EXPO, delay: 0.3 + fi * 0.08 }}
                        >
                            <label htmlFor={`sv-${inputs[0].name}`} className="gx-label">
                                {icon}{label}
                            </label>
                            {inputs.map(({ name, placeholder, type, autoComplete, minLength }, ii) => (
                                <div key={ii} className={`gx-field ${ii > 0 ? 'mt-4' : ''}`}>
                                    <input
                                        id={`sv-${name}`}
                                        type={type}
                                        name={name}
                                        value={formData[name]}
                                        onChange={handleInputChange}
                                        placeholder={placeholder}
                                        autoComplete={autoComplete}
                                        minLength={minLength}
                                        className="gx-input"
                                        required={name !== 'telephone'}
                                    />
                                    <Check size={16} className="gx-ok" aria-hidden="true" />
                                </div>
                            ))}
                        </motion.div>
                    ))}

                    {/* Message */}
                    <motion.div
                        className="gx-group"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: EXPO, delay: 0.62 }}
                    >
                        <label htmlFor="sv-message" className="gx-label">
                            Message (optionnel)
                        </label>
                        <div className="gx-field">
                            <textarea
                                id="sv-message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                placeholder="Partage comment tu te sens maintenant..."
                                rows="4"
                                className="gx-input resize-none"
                            />
                        </div>
                    </motion.div>

                    {/* Submit */}
                    <div className="space-y-4 pt-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`btn-engage gx-submit ${isSubmitting ? 'is-loading' : ''}`}
                            aria-busy={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="gx-spinner" aria-hidden="true" />
                                    <span>Envoi en cours...</span>
                                </>
                            ) : (
                                <>
                                    <span>Confirmer mon Inscription</span>
                                    <ArrowRight size={16} className="btn-engage-arrow" />
                                </>
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={onBack}
                            className="btn-engage btn-engage--ghost gx-submit"
                        >
                            <span>Retour</span>
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

/* ─── Step 3: Confirmation ────────────────────────────────────────────── */
const StepConfirmation = () => (
    <motion.div {...stepTransition} className="max-w-2xl mx-auto text-center">
        <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: EXPO }}
            className="sv-confirm glass-gold gold-border"
        >
            <GoldParticles variant="rise" count={260} speed={2.2} />
            <SuccessBurst size={96} className="mb-6" />

            <motion.div
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.9, duration: 0.6, type: 'spring', stiffness: 200 }}
                className="text-6xl mb-6 inline-block"
            >
                ✝️
            </motion.div>

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="text-5xl font-black text-white mb-4 tracking-tighter"
            >
                Félicitations!
            </motion.h2>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65 }}
                className="text-gray-300 font-light text-lg mb-6 leading-relaxed"
            >
                Tu as fait le plus important choix de ta vie! Tu es maintenant un enfant de Dieu et fais partie de notre famille EJP.
            </motion.p>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-amber-400 font-bold text-lg mb-8"
            >
                Bienvenue à la maison! 🙏
            </motion.p>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-gray-400 font-light mb-8"
            >
                Nous t'enverrons un email de bienvenue avec les prochaines étapes.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
            >
                <button
                    type="button"
                    onClick={() => window.location.href = '/login'}
                    className="btn-engage btn-engage--ghost"
                >
                    <span>Connecte toi</span>
                </button>
            </motion.div>
        </motion.div>
    </motion.div>
);

/* ─── Testimonies ─────────────────────────────────────────────────────── */
const testimonies = [
    { name: "Marie Dupont", role: "Nouvelle convertie", text: "La prière du salut a changé ma vie. J'ai trouvé la paix et un nouveau sens de vie.", image: "M" },
    { name: "Jean Paul", role: "Membre actif", text: "Depuis que j'ai accepté Jésus, tout a changé. Je suis libre et j'ai l'espoir.", image: "J" },
    { name: "Sophie Martin", role: "Nouvelle convertie", text: "C'est la meilleure décision que j'ai jamais prise. Gloire à Dieu!", image: "S" }
];

const TestimoniesSection = () => {
    const ref = useRef(null);
    useScrollReveal(ref);

    return (
        <section ref={ref} className="py-32 px-4 md:px-8 relative bg-zinc-950 border-y border-white/5 overflow-hidden">
            <div className="container mx-auto max-w-6xl relative z-10">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-16 tracking-tighter text-center" data-reveal="chars">
                    Témoignages de <span className="text-amber-500">Transformation</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonies.map((testimony, idx) => (
                        <div key={idx} data-reveal="up">
                            <TiltCard max={8} className="sv-testi glass-gold">
                                <span className="sv-testi-halo" aria-hidden="true" />
                                <span className="sv-testi-quote" aria-hidden="true">“</span>
                                <div className="flex items-center gap-4 mb-6 relative">
                                    <div className="sv-avatar">
                                        {testimony.image}
                                    </div>
                                    <div>
                                        <p className="font-black text-white">{testimony.name}</p>
                                        <p className="text-amber-500 text-xs font-bold uppercase tracking-widest">{testimony.role}</p>
                                    </div>
                                </div>
                                <p className="text-gray-300 font-light leading-relaxed italic relative">"{testimony.text}"</p>
                            </TiltCard>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

/* ─── Page Principale ─────────────────────────────────────────────────── */
const SalvationPrayer = () => {
    const [step, setStep] = useState(1);
    const stepsRef = useRef(null);
    const shownStep = useRef(step);

    // Each step change brings the step stage back into view (step 1 is much taller than 2/3).
    useEffect(() => {
        if (shownStep.current === step) return;
        shownStep.current = step;
        const top = stepsRef.current.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top, behavior: 'smooth' });
    }, [step]);

    useEffect(() => {
        if (step !== 3) return undefined;
        const t = setTimeout(() => setStep(1), 5000);
        return () => clearTimeout(t);
    }, [step]);

    const handleSuccess = () => setStep(3);

    return (
        <div className="sv-page relative flex min-h-screen flex-col bg-black text-gray-400">
            <div className="fixed top-0 right-0 left-0 z-50">
                <Nav />
            </div>

            <main className="grow">
                <HeroBanner />

                {/* Steps Section */}
                <section ref={stepsRef} className="py-20 px-4 md:px-8 relative">
                    <div className="absolute inset-0 bg-linear-to-b from-black via-zinc-900/50 to-black pointer-events-none" />
                    <div className="container mx-auto max-w-6xl relative z-10">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <StepPrayer key="step1" onNext={() => setStep(2)} />
                            )}
                            {step === 2 && (
                                <StepForm key="step2" onBack={() => setStep(1)} onSuccess={handleSuccess} />
                            )}
                            {step === 3 && (
                                <StepConfirmation key="step3" />
                            )}
                        </AnimatePresence>
                    </div>
                </section>

                <TestimoniesSection />
            </main>

            <section id="contact" className="py-32 bg-zinc-950">
                <Contact verset={{
                    verset: "Si tu confesses de ta bouche le Seigneur Jésus, et si tu crois dans ton coeur que Dieu l'a ressuscité des morts, tu seras sauvé.",
                    ref: 'Romains 10:9'
                }} />
            </section>

            <Footer />
        </div>
    );
};

export default SalvationPrayer;
