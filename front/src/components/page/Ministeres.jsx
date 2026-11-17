import React, { useState, useContext, useLayoutEffect, useRef } from 'react';
import { Contact, Nav, Footer } from '../';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { AuthContext } from '../AuthContext';
import { apiFetch } from '../../util/api';
import { motion, AnimatePresence } from 'framer-motion';
import imgCommunication from '../../assets/ministries/communication.jpg';
import imgMusic from '../../assets/ministries/music.jpg';
import imgAudiovisuel from '../../assets/ministries/audiovisuel.jpg';
import imgSecretariat from '../../assets/ministries/secretariat.jpg';
import imgEntretiens from '../../assets/ministries/entretiens.jpg';
import imgProtocole from '../../assets/ministries/protocole.jpg';
import imgArt from '../../assets/ministries/art.jpg';
import heroImg from '../../assets/images/fij3.jpeg';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GoldParticles from '../fx/GoldParticles';
import TiltCard from '../fx/TiltCard';
import useScrollReveal from '../fx/useScrollReveal';

gsap.registerPlugin(SplitText, ScrollTrigger);

/* ─── Global styles ─────────────────────────────────────────────────── */
const GlobalStyles = () => (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,700;1,300&display=swap');

        .font-display { font-family: 'Bebas Neue', sans-serif; }
        .font-body    { font-family: 'DM Sans', sans-serif; }

        @keyframes float-up {
            from { opacity: 0; transform: translateY(45px); }
            to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes line-grow {
            from { transform: scaleX(0); }
            to   { transform: scaleX(1); }
        }
        @keyframes shimmer-sweep {
            0%   { background-position: -200% center; }
            100% { background-position:  200% center; }
        }
        @keyframes fade-in {
            from { opacity: 0; }
            to   { opacity: 1; }
        }

        .anim-up   { animation: float-up 0.9s cubic-bezier(0.16,1,0.3,1) forwards; }
        .anim-fade { animation: fade-in 1s ease forwards; }
        .anim-line { animation: line-grow 1.2s ease forwards; transform-origin: left; }

        .d-100 { animation-delay: 100ms; }
        .d-200 { animation-delay: 200ms; }
        .d-300 { animation-delay: 300ms; }
        .d-500 { animation-delay: 500ms; }
        .d-700 { animation-delay: 700ms; }

        .shimmer-gold {
            background: linear-gradient(90deg, #d97706 0%, #fef3c7 40%, #d97706 80%);
            background-size: 200% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shimmer-sweep 4s linear infinite;
        }

        .grain-overlay::after {
            content: '';
            position: absolute; inset: 0;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
            pointer-events: none; z-index: 5;
        }

        .star-letter {
            display: inline-block;
            transition: color 0.2s ease, transform 0.2s ease;
        }
        .star-word:hover .star-letter { transform: translateY(-3px); }

        .ministry-img {
            transition: transform 1.2s cubic-bezier(0.16,1,0.3,1), filter 0.8s ease;
        }
        .ministry-card:hover .ministry-img {
            transform: scale(1.08);
            filter: grayscale(0%) brightness(1);
        }

        .field-line {
            position: absolute;
            bottom: 0; left: 0;
            height: 1px;
            width: 0;
            background: linear-gradient(90deg, #d97706, #fbbf24);
            transition: width 0.4s ease;
        }
        .field-wrap:focus-within .field-line { width: 100%; }

        select option { background: #111; color: white; }
    `}</style>
);

/* ─── Données des ministères (option = valeur du formulaire) ──────────── */
const MINISTRIES = [
    { category: 'Communication', title: 'Communication', option: 'Communication', description: "Partage la vision S.T.A.R. à travers les mots et les images. Manage les réseaux sociaux et crée du contenu impactant pour inspirer notre communauté.", image: imgCommunication },
    { category: 'Musique', title: 'Prodiges Music', option: 'Prodige', description: "Lève-toi et chante ! Exprime ton amour à travers la musique et conduis les autres à la louange sincère. Aucune expérience requise, juste une passion.", image: imgMusic },
    { category: 'Tech', title: 'Audio Visuel', option: 'Audio Visuel', description: "Maîtrise la technologie pour créer une expérience spirituelle immersive. Son, lumière, vidéo — tous les éléments au service de la vision S.T.A.R.", image: imgAudiovisuel },
    { category: 'Logistique', title: 'Secrétariat', option: 'Secrétariat', description: "Sois l'organisateur invisible qui fait fonctionner la machine. Gère les documents, archives et coordonne les événements avec précision.", image: imgSecretariat },
    { category: 'Maintenance', title: 'Entretiens', option: 'Entretiens', description: "Maintiens nos espaces en excellence et propreté. Un environnement bien organisé et accueillant reflète l'ordre et la grâce de Dieu.", image: imgEntretiens },
    { category: 'Leadership', title: 'Protocole', option: 'Protocole', description: "Accueille avec excellence nos visiteurs et membres. Sois la représentation du service raffiné et de l'amour du Christ dans chaque interaction.", image: imgProtocole },
    { category: 'Créativité', title: 'Art et Expression', option: 'Art et Expression', description: "Exprime ta créativité pour glorifier l'Éternel. Danse, théâtre, peinture, design — tous les arts sont bienvenus pour une expression complète.", image: imgArt },
];

/* ─── Hero ───────────────────────────────────────────────────────────── */
const Hero = () => {
    const ref = useRef(null);
    const compact = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;

    useLayoutEffect(() => {
        const root = ref.current;
        const mm = gsap.matchMedia();
        const ctx = gsap.context(() => {
            mm.add('(prefers-reduced-motion: no-preference)', () => {
                const lead = SplitText.create('.mn-lead', { type: 'chars', mask: 'chars' });
                gsap.timeline({ delay: 0.2, defaults: { ease: 'expo.out' } })
                    .fromTo('.mn-hero-img', { scale: 1.4, opacity: 0 }, { scale: 1.05, opacity: 1, duration: 2.6, ease: 'power3.out' }, 0)
                    .fromTo('.mn-tag', { opacity: 0, letterSpacing: '1.4em' }, { opacity: 1, letterSpacing: '0.5em', duration: 1.6 }, 0.2)
                    .from(lead.chars, { yPercent: 120, rotate: 10, duration: 1.2, stagger: 0.035 }, 0.35)
                    .from('.mn-star-in', { yPercent: 140, rotateY: 100, scale: 1.8, opacity: 0, duration: 1.5, stagger: 0.09 }, 0.6)
                    .fromTo('.mn-def', { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.inOut', clearProps: 'clipPath' }, 1.2)
                    .fromTo('.mn-cta', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, clearProps: 'transform,opacity' }, 1.45);

                gsap.timeline({ scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 0.6 } })
                    .to('.mn-hero-drift', { yPercent: 18, scale: 1.12, ease: 'none' }, 0)
                    .to('.mn-hero-copy', { y: -120, opacity: 0, ease: 'none' }, 0)
                    .to('.mn-star', { yPercent: (i) => (i % 2 ? -60 : 60), ease: 'none' }, 0);
            });
        }, root);
        return () => { mm.revert(); ctx.revert(); };
    }, []);

    return (
        <section ref={ref} className="mn-hero grain-overlay">
            <div className="mn-hero-drift" aria-hidden="true">
                <img src={heroImg} alt="" className="mn-hero-img" fetchPriority="high" decoding="async" />
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-black/60 z-1" />
            <div className="absolute inset-0 bg-linear-to-r from-black/40 via-transparent to-black/40 z-1" />
            <GoldParticles count={compact ? 400 : 900} className="z-1" />

            <div className="absolute inset-0 z-2 pointer-events-none">
                <div className="absolute left-12 top-1/3 w-px h-28 bg-linear-to-b from-transparent via-amber-500/30 to-transparent" />
                <div className="absolute right-12 top-1/3 w-px h-28 bg-linear-to-b from-transparent via-amber-500/30 to-transparent" />
                <div className="absolute bottom-24 left-1/4 right-1/4 h-px bg-linear-to-r from-transparent via-amber-500/15 to-transparent" />
            </div>

            <div className="mn-hero-copy relative z-3 text-center px-6 max-w-5xl mx-auto">
                <div className="mb-8">
                    <span className="mn-tag inline-flex items-center gap-3 text-amber-400/80 tracking-[0.5em] text-[9px] uppercase font-bold">
                        <span className="w-8 h-px bg-amber-500/60 inline-block" />
                        Engagement & Service
                        <span className="w-8 h-px bg-amber-500/60 inline-block" />
                    </span>
                </div>

                <h1 className="font-display leading-none tracking-wide uppercase mb-8" aria-label="Deviens un(e) S.T.A.R.">
                    <span className="mn-lead block text-[clamp(2rem,9vw,7rem)] text-white" aria-hidden="true">Deviens un(e)</span>
                    <span className="mn-stars" aria-hidden="true">
                        {'S.T.A.R.'.split('').map((c, i) => (
                            <span key={i} className="mn-star"><span className="mn-star-in shimmer-gold">{c}</span></span>
                        ))}
                    </span>
                </h1>

                <div className="mb-12">
                    <div className="mn-def inline-block border-l-2 border-amber-500/60 pl-6 text-left">
                        <p className="text-white/70 text-base md:text-lg font-light italic leading-relaxed">
                            "<span className="font-black text-amber-400 not-italic">S</span>erviteur
                            <span className="font-black text-amber-400 not-italic"> T</span>ravaillant
                            <span className="font-black text-amber-400 not-italic"> A</span>ctivement pour le
                            <span className="font-black text-amber-400 not-italic"> R</span>oyaume"
                        </p>
                    </div>
                </div>

                <div className="mn-cta">
                    <a href="#ministries-list" className="btn-engage">
                        <span>Trouve ton Ministère</span>
                        <ArrowRight size={16} className="btn-engage-arrow" />
                    </a>
                </div>
            </div>

            <div className="mn-scroll absolute bottom-10 left-1/2 -translate-x-1/2 z-3 flex flex-col items-center gap-2 opacity-40">
                <span className="text-[9px] text-white/60 tracking-[0.3em] uppercase">Scroll</span>
                <div className="w-px h-10 bg-linear-to-b from-white/60 to-transparent" />
            </div>
        </section>
    );
};

/* ─── Pôles : navigation spatiale entre ministères ────────────────────── */
const MinistriesSection = ({ onJoin }) => {
    const [active, setActive] = useState(0);
    const [hovered, setHovered] = useState(null);
    const tabsRef = useRef([]);
    const m = MINISTRIES[active];
    const focus = hovered ?? active;

    const select = (i) => {
        setActive(i);
        tabsRef.current[i]?.focus({ preventScroll: true });
    };
    const onKeyDown = (e) => {
        const n = MINISTRIES.length;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); select((active + 1) % n); }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); select((active - 1 + n) % n); }
        if (e.key === 'Home') { e.preventDefault(); select(0); }
        if (e.key === 'End') { e.preventDefault(); select(n - 1); }
    };

    return (
        <section className="mn-section" id="ministries-list">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] max-w-full h-[400px] bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto relative z-10">
                <div className="mb-14 md:mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-4 mb-4" data-reveal="up">
                            <div className="w-8 h-px bg-amber-600/50" />
                            <span className="text-amber-500/70 text-[9px] font-black uppercase tracking-[0.5em]">Nos équipes</span>
                        </div>
                        <h2 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] text-white leading-none tracking-wide uppercase">
                            <span className="block" data-reveal="chars">Explore nos</span>
                            <span className="shimmer-gold" data-reveal="up">Ministères</span>
                        </h2>
                    </div>
                    <p className="text-gray-500 text-base font-light max-w-xs leading-relaxed lg:text-right italic" data-reveal="up">
                        Chaque don est unique — trouve ta place dans l'équipe S.T.A.R.
                    </p>
                </div>

                {/* Deck : le pôle actif avance, les autres reculent dans la profondeur */}
                <div className="mn-deck" role="tablist" aria-label="Ministères" onKeyDown={onKeyDown} onMouseLeave={() => setHovered(null)} data-reveal="up">
                    {MINISTRIES.map((x, i) => {
                        const isActive = i === active;
                        const lit = isActive || i === focus;
                        return (
                            <motion.button
                                key={x.title}
                                ref={(el) => { tabsRef.current[i] = el; }}
                                type="button"
                                role="tab"
                                id={`mn-tab-${i}`}
                                aria-selected={isActive}
                                aria-controls="mn-panel"
                                tabIndex={isActive ? 0 : -1}
                                onClick={() => setActive(i)}
                                onMouseEnter={() => setHovered(i)}
                                className={`mn-tab ${isActive ? 'is-active' : ''}`}
                                animate={{
                                    z: isActive ? 40 : lit ? 15 : -90,
                                    scale: isActive ? 1.06 : lit ? 1 : 0.92,
                                    opacity: lit ? 1 : 0.5,
                                    filter: lit ? 'blur(0px) grayscale(0)' : 'blur(2.5px) grayscale(0.75)',
                                }}
                                transition={{ type: 'spring', stiffness: 170, damping: 20 }}
                            >
                                <img src={x.image} alt="" loading="lazy" decoding="async" />
                                <span className="mn-tab-shade" aria-hidden="true" />
                                <span className="mn-tab-idx">{String(i + 1).padStart(2, '0')}</span>
                                <span className="mn-tab-text">
                                    <span className="mn-tab-cat">{x.category}</span>
                                    <span className="mn-tab-title">{x.title}</span>
                                </span>
                            </motion.button>
                        );
                    })}
                </div>

                {/* Scène du pôle actif */}
                <div data-reveal="up">
                    <TiltCard max={3} className="mn-stage glass-gold" id="mn-panel" role="tabpanel" aria-labelledby={`mn-tab-${active}`}>
                        <span className="mn-rim" aria-hidden="true" />
                        <div className="mn-stage-media">
                            <AnimatePresence initial={false}>
                                <motion.div
                                    key={active}
                                    className="mn-stage-frame"
                                    initial={{ opacity: 0, scale: 1.2, filter: 'blur(14px)' }}
                                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
                                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <img src={m.image} alt={m.title} className="mn-stage-img" decoding="async" />
                                </motion.div>
                            </AnimatePresence>
                            <div className="mn-stage-shade" aria-hidden="true" />
                            <span className="mn-stage-badge">{m.category}</span>
                        </div>

                        <div className="mn-stage-body">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={active}
                                    initial="hidden" animate="visible" exit="exit"
                                    variants={{ visible: { transition: { staggerChildren: 0.08 } }, hidden: {}, exit: { opacity: 0, y: -16, transition: { duration: 0.25 } } }}
                                >
                                    <motion.span className="mn-stage-num" variants={riseIn}>{String(active + 1).padStart(2, '0')}</motion.span>
                                    <div className="w-8 h-px bg-amber-500 mb-6" />
                                    <div className="overflow-hidden mb-5">
                                        <motion.h3 variants={riseIn} className="font-display text-[clamp(2.4rem,4.5vw,4rem)] text-white leading-none tracking-wide uppercase">
                                            {m.title}
                                        </motion.h3>
                                    </div>
                                    <motion.p variants={riseIn} className="text-gray-300 text-base leading-relaxed font-light mb-10">
                                        {m.description}
                                    </motion.p>
                                    <motion.div variants={riseIn}>
                                        <a href="#rejoindre" onClick={() => onJoin(m.option)} className="btn-engage btn-engage--ghost">
                                            <span>Rejoindre</span>
                                            <ArrowRight size={14} className="btn-engage-arrow" />
                                        </a>
                                    </motion.div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </TiltCard>
                </div>
            </div>
        </section>
    );
};

const riseIn = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

/* ─── Contact Form ───────────────────────────────────────────────────── */
const Field = ({ label, name, touched, errors, children }) => (
    <div>
        <label className="block text-gray-600 text-[9px] font-black tracking-[0.4em] uppercase mb-2">{label}</label>
        <div className="field-wrap relative">
            {children}
            <div className="field-line" />
        </div>
        {/*  Message d'erreur par champ */}
        {touched[name] && errors[name] && (
            <p className="mt-1.5 text-red-400 text-[10px] font-medium tracking-wide flex items-center gap-1.5">
                <span className="w-1 h-1 bg-red-400 rounded-full inline-block shrink-0" />
                {errors[name]}
            </p>
        )}
    </div>
);
const ContactForm = ({ preset }) => {
    const { user, is_loading } = useContext(AuthContext)

    const initialForm = { nom: '', email: '', ministry_name: '', message: '' };

    const [form, setForm] = useState(initialForm);

    // « Rejoindre » sur un pôle pré-remplit le ministère (ajustement pendant le rendu, sans effet)
    const [seenPreset, setSeenPreset] = useState(preset);
    if (preset !== seenPreset) {
        setSeenPreset(preset);
        if (preset) setForm((f) => ({ ...f, ministry_name: preset.name }));
    }
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
    const [touched, setTouched] = useState({});

    const validate = (data) => {
        const errs = {};
        if (!data.nom.trim())
            errs.nom = 'Le nom est requis';
        else if (data.nom.trim().length < 2)
            errs.nom = 'Le nom doit contenir au moins 2 caractères.';


        if (!data.email.trim())
            errs.email = "L'email est requis.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
            errs.email = 'Adresse email invalide';


        if (!data.ministry_name) {
            errs.ministry_name = 'Veillez sélectionner un ministère.';
        }

        if (!data.message.trim())
            errs.message = 'Le message est requis'

        return errs;
    }

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        setErrors(validate(form));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const updated = { ...form, [name]: value };
        setForm(updated);
        if (touched[name]) {
            setErrors(validate(updated))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setTouched({ nom: true, email: true, ministry_name: true, message: true });
        const errs = validate(form);
        if (Object.keys(errs).length > 0) {
            setErrors(errs)
            return;
        }
        setStatus('loading')

        try {
            const data = await apiFetch('/ministry_request', {
                method: 'POST',
                body: JSON.stringify(form),
            });

            setForm(initialForm);
            setTouched({});
            setErrors({});
            setStatus('success');
            setTimeout(() => setStatus('idle'), 5000);

        } catch (error) {
            // setErrors(errs.message || 'Une erreur est survenue.');
            // setStatus('error');
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    const ministryOptions = ['Communication', 'Prodige', 'Audio Visuel', 'Secrétariat', 'Entretiens', 'Protocole', 'Art et Expression'];



    const inputCls = "w-full bg-transparent border-b border-white/10 py-3 text-white placeholder-zinc-700 text-sm font-light outline-none transition-colors duration-300 focus:border-amber-500/0";
    const isFormDirty = Object.values(touched).some(Boolean);
    const hasErrors = Object.keys(validate(form)).length > 0;

    if (!is_loading && !user) {
        return (
            <section className="relative py-28 px-4 bg-zinc-950 border-t border-white/4 overflow-hidden" id="rejoindre">
                <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/5 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-600/3 rounded-full blur-[80px] pointer-events-none" />
                <div className="max-w-5xl mx-auto relative z-10 text-center">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="w-8 h-px bg-amber-600/50" />
                        <span className="text-amber-500/70 text-[9px] font-black uppercase tracking-[0.5em]">Rejoins-nous</span>
                        <div className="w-8 h-px bg-amber-600/50" />
                    </div>
                    <h2 className="font-display text-[clamp(3rem,6vw,5rem)] text-white leading-none tracking-wide uppercase mb-8">
                        Prêt à <span className="shimmer-gold">Servir ?</span>
                    </h2>
                    <p className="text-gray-400 text-lg mb-8">
                        Connecte-toi pour postuler à un ministère et rejoindre l'équipe S.T.A.R.
                    </p>
                    <a href="/login" className="btn-engage">
                        <span>Se connecter</span>
                        <ArrowRight size={14} className="btn-engage-arrow" />
                    </a>
                </div>
            </section>
        );
    }

    return (
        <section className="relative py-28 px-4 bg-zinc-950 border-t border-white/4 overflow-hidden">
            {/* Ambiance déco */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-600/3 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                <span className="font-display text-[20vw] text-white/[0.012] leading-none uppercase">SERVIR</span>
            </div>

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-start">

                    {/* Colonne gauche */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-[35%] lg:sticky lg:top-32"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-8 h-px bg-amber-600/50" />
                            <span className="text-amber-500/70 text-[9px] font-black uppercase tracking-[0.5em]">Rejoins-nous</span>
                        </div>
                        <h2 className="font-display text-[clamp(3rem,6vw,5rem)] text-white leading-none tracking-wide uppercase mb-8">
                            Prêt à <br />
                            <span className="shimmer-gold">Servir ?</span>
                        </h2>
                        <p className="text-gray-600 font-light text-sm leading-relaxed mb-10">
                            Rejoins l'aventure S.T.A.R. et mets tes talents au service d'une vision plus grande. Ton engagement change les vies.
                        </p>
                        <div className="space-y-4 border-l border-white/6 pl-6">
                            {['Croissance personnelle', 'Impact communautaire', 'Connexions spirituelles'].map(item => (
                                <div key={item} className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 bg-amber-500 rotate-45 shrink-0" />
                                    <span className="text-gray-500 text-sm font-light">{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Formulaire */}
                    <motion.form
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        onSubmit={handleSubmit} id="rejoindre" className="w-full lg:w-[65%] space-y-8" noValidate
                    >
                        {/* Bandeaux succès/erreur */}
                    <AnimatePresence mode='wait'>
                        {status === 'success' && (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="border border-amber-500/30 bg-amber-500/10 px-6 py-4 text-amber-300 text-sm font-bold p-8 text-center flex flex-col items-center gap-4">
                                <CheckCircle2 className="text-amber-500" size={40} />
                                <p className="text-white font-display text-2xl uppercase">Demande Envoyée !</p>
                                <p className="text-gray-400 text-sm">L'équipe S.T.A.R. reviendra vers toi très vite.</p>
                                <button onClick={() => setStatus('idle')} className="text-amber-500 text-[10px] uppercase underline mt-4">Nouvel envoi</button>
                                <div className="w-1.5 h-1.5 bg-amber-500 rotate-45 shrink-0" />
                                Merci ! Nous avons reçu ta demande. À très bientôt.
                            </motion.div>
                        )}

                        {status === 'error' && (
                            <motion.div
                                key="error"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="border border-red-500/30 bg-red-500/10 px-6 py-4 text-red-300 text-sm font-bold flex items-center gap-3">
                                <div className="w-1.5 h-1.5 bg-red-500 rotate-45 shrink-0" />
                                Une erreur est survenue. Veuillez réessayer.
                            </motion.div>
                        )}
                    </AnimatePresence>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <Field label="Nom complet" name="nom" touched={touched} errors={errors} >
                                    <input
                                        name="nom" value={form.nom}
                                        onChange={handleInputChange} onBlur={handleBlur}
                                        className={`${inputCls} ${touched.nom && errors.nom ? 'border-b-red-500/50' : ''}`}
                                        placeholder="Jean d'Impact"
                                        autoComplete="name"
                                    />
                                </Field>
                                <Field label="Email" name="email" touched={touched} errors={errors} >
                                    <input
                                        name="email" type="email" value={form.email}
                                        onChange={handleInputChange} onBlur={handleBlur}
                                        className={`${inputCls} ${touched.email && errors.email ? 'border-b-red-500/50' : ''}`}
                                        placeholder="vous@email.com"
                                        autoComplete="email"
                                    />
                                </Field>
                            </div>

                            <Field label="Ministère d'intérêt" name="ministry_name" touched={touched} errors={errors} >
                                <select
                                    name="ministry_name" value={form.ministry_name}
                                    onChange={handleInputChange} onBlur={handleBlur}
                                    className={`${inputCls} appearance-none cursor-pointer ${touched.ministry_name && errors.ministry_name ? 'border-b-red-500/50' : ''}`}
                                >
                                    <option value="">Sélectionne un ministère...</option>
                                    {ministryOptions.map(m => <option key={m} value={m}>{m}</option>)}
                                </select>
                                <ArrowRight size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-amber-500/50 pointer-events-none rotate-90" />
                                {preset && <span key={preset.tick} className="mn-flash" aria-hidden="true" />}
                            </Field>

                            <Field label="Message" name="message" touched={touched} errors={errors} >
                                <textarea
                                    name="message" value={form.message}
                                    onChange={handleInputChange} onBlur={handleBlur}
                                    className={`${inputCls} resize-none ${touched.message && errors.message ? 'border-b-red-500/50' : ''}`}
                                    style={{ height: '100px' }}
                                    placeholder="Parle-nous de toi et de tes motivations..."
                                />
                                {/* ✅ Compteur de caractères */}
                                <span className="absolute right-0 bottom-4 text-[10px] text-gray-600">
                                    {form.message.length}/20 min
                                </span>
                            </Field>

                            {/* ✅ Bouton avec état loading */}
                            <button
                                type="submit"
                                disabled={status === 'loading' || (isFormDirty && hasErrors)}
                                className="btn-engage disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed disabled:shadow-none"
                            >
                                <span className="relative z-10">
                                    {status === 'loading' ? 'Envoi en cours...' : 'Envoyer ma demande'}
                                </span>
                                {status === 'loading' ? (
                                    <svg className="relative z-10 animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                    </svg>
                                ) : (
                                    <ArrowRight size={14} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                                )}
                                <div className="absolute inset-0 bg-white/15 -translate-x-full group-hover:translate-x-full transition-transform duration-500 skew-x-12" />
                            </button>
                    </motion.form>
                </div>
            </div>
        </section>
    )
};

/* ─── Page ───────────────────────────────────────────────────────────── */
const MinistriesPage = () => {
    const pageRef = useRef(null);
    useScrollReveal(pageRef);
    const [preset, setPreset] = useState(null);
    const onJoin = (name) => setPreset((p) => ({ name, tick: (p?.tick ?? 0) + 1 }));

    return (
        <div ref={pageRef} className="mn-page relative flex min-h-screen flex-col text-gray-400 font-body">
            <GlobalStyles />

            <header className="fixed top-0 right-0 left-0 z-50">
                <Nav />
            </header>

            <main className="grow">
                <Hero />

                <div className="relative z-10">
                    <MinistriesSection onJoin={onJoin} />
                    <ContactForm preset={preset} />
                </div>
            </main>

            {/* 7. Contact */}
            <section id="contact" className="py-32 bg-zinc-950">
                <Contact verset={{
                    verset: "Comme de bons dispensateurs des diverses grâces de Dieu, que chacun de vous mette au service des autres le don qu'il a reçu",
                    ref: '1 Pierre 4:10'
                }} />
            </section>

            <footer className="bg-black border-t border-white/4">
                <Footer />
            </footer>
        </div>
    );
};

export default MinistriesPage;