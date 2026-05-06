import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Nav, Footer, Contact } from '../'
import { Heart, ArrowRight, Mail, User, Phone } from 'lucide-react';
import { apiFetch } from '../../util/api';

/* ─── Animation Variants ─────────────────────────────────────────────── */

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }
    })
};

const fadeInScale = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: (delay = 0) => ({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }
    })
};

const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: (delay = 0) => ({
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }
    })
};

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } }
};

const stepTransition = {
    initial: { opacity: 0, x: 60, filter: 'blur(4px)' },
    animate: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, x: -60, filter: 'blur(4px)', transition: { duration: 0.35, ease: 'easeIn' } }
};

/* ─── Floating Orb (décoratif) ────────────────────────────────────────── */
const FloatingOrb = ({ className, delay = 0 }) => (
    <motion.div
        className={className}
        animate={{ y: [0, -20, 0], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 6 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
);

/* ─── Hero Banner ─────────────────────────────────────────────────────── */
const HeroBanner = ({ onPrayClick }) => {
    return (
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden px-4 md:px-8">
            {/* Background orbs */}
            <FloatingOrb
                className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"
                delay={0}
            />
            <FloatingOrb
                className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"
                delay={1.5}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-zinc-900" />

            <div className="container mx-auto max-w-4xl relative z-10">
                <motion.div
                    className="text-center"
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                >
                    {/* Badge */}
                    <motion.div
                        variants={fadeInUp}
                        custom={0}
                        className="inline-flex items-center gap-3 mb-8 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full backdrop-blur-sm group hover:bg-amber-500/20 transition-all duration-300 cursor-default"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <Heart className="text-amber-500" size={16} />
                        </motion.div>
                        <span className="text-amber-500 font-bold tracking-[0.3em] uppercase text-xs">
                            Un Nouveau Commencement
                        </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        variants={fadeInUp}
                        custom={0.1}
                        className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-none"
                    >
                        La{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600">
                            Prière du Salut
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        variants={fadeInUp}
                        custom={0.2}
                        className="text-lg md:text-xl text-gray-300 font-light mb-10 leading-relaxed max-w-3xl mx-auto"
                    >
                        Accepte Jésus-Christ comme ton Seigneur et Sauveur personnel. C'est le moment de transformer ta vie et de commencer un nouveau voyage spirituel.
                    </motion.p>

                    {/* CTA */}
                    <motion.div variants={fadeInUp} custom={0.3}>
                        <motion.a
                            href="#prayer"
                            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(245,158,11,0.4)' }}
                            whileTap={{ scale: 0.97 }}
                            className="bg-gradient-to-r from-amber-500 to-yellow-500 text-black px-10 py-4 rounded-full font-black uppercase text-sm tracking-widest inline-flex items-center gap-2"
                        >
                            <Heart size={18} />
                            <span>Faire la prière</span>
                        </motion.a>
                    </motion.div>
                </motion.div>
            </div>
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
    <motion.div
        variants={fadeInUp}
        custom={idx * 0.1}
        whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(245,158,11,0.15)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="group bg-gradient-to-br from-zinc-950 to-black border border-white/10 hover:border-amber-500/50 rounded-2xl p-8 transition-colors duration-300 cursor-default"
    >
        <motion.div
            className="text-5xl mb-4"
            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
            transition={{ duration: 0.4 }}
        >
            {point.icon}
        </motion.div>
        <h3 className="text-2xl font-black text-white mb-3 tracking-tight group-hover:text-amber-400 transition-colors">
            {point.title}
        </h3>
        <p className="text-gray-400 font-light leading-relaxed">{point.description}</p>
    </motion.div>
);

/* ─── Step 1 ──────────────────────────────────────────────────────────── */
const StepPrayer = ({ onNext }) => {
    const faqs = [
        { q: "Qu'est-ce que la prière du salut?", a: "C'est une prière personnelle d'acceptation de Jésus-Christ comme Seigneur et Sauveur. C'est le début de ta relation avec Dieu." },
        { q: "Que se passe-t-il après la prière?", a: "Tu es sauvé et deviens enfant de Dieu. Il est important de te connecter à une communauté chrétienne et de commencer à apprendre la Bible." },
        { q: "Dois-je faire quelque chose de spécial?", a: "Après la prière, nous te recommandons de trouver une église, de lire la Bible et de partager ta décision avec d'autres." }
    ];

    return (
        <motion.div {...stepTransition}>
            {/* Prayer Points */}
            <motion.div className="mb-20" initial="hidden" animate="visible" variants={stagger}>
                <motion.h2 variants={fadeInUp} custom={0} className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">
                    Les 4 étapes du <span className="text-amber-500">Salut</span>
                </motion.h2>
                <motion.div
                    variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.8, delay: 0.2 } } }}
                    className="w-16 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full mb-12 origin-left"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {prayerPoints.map((point, idx) => (
                        <PrayerCard key={idx} point={point} idx={idx} />
                    ))}
                </div>
            </motion.div>

            {/* Prayer Text Box */}
            <motion.div
                id="prayer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="bg-gradient-to-br from-amber-500/10 to-yellow-500/5 border-2 border-amber-500/30 rounded-3xl p-12 mb-12"
            >
                <motion.h3
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl font-black text-white mb-8 tracking-tight text-center"
                >
                    Récite cette Prière
                </motion.h3>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-gray-300 font-light leading-relaxed max-w-3xl mx-auto mb-8"
                >
                    <p>
                        <span className="text-amber-400 font-bold">"Seigneur Jésus,</span> je reconnais que je suis un pécheur. Je crois que Tu es mort et ressuscité pour mes péchés. Je T'accepte maintenant comme mon Seigneur et Sauveur personnel. Pardonne-moi et transforms ma vie. Je veux Te suivre et vivre pour Toi. Amen."
                    </p>
                </motion.div>

                <div className="text-center">
                    <motion.button
                        onClick={onNext}
                        whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(245,158,11,0.35)' }}
                        whileTap={{ scale: 0.96 }}
                        className="bg-gradient-to-r from-amber-500 to-yellow-500 text-black px-12 py-4 rounded-full font-black uppercase text-sm tracking-widest inline-flex items-center gap-2 mx-auto"
                    >
                        <span>J'ai Prié - S'inscrire Maintenant</span>
                        <motion.span
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.2, repeat: Infinity }}
                        >
                            <ArrowRight size={16} />
                        </motion.span>
                    </motion.button>
                </div>
            </motion.div>

            {/* FAQ */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={stagger}
                className="mb-12"
            >
                <motion.h3 variants={fadeInUp} custom={0} className="text-3xl font-black text-white mb-8 tracking-tighter">
                    Questions <span className="text-amber-500">Fréquentes</span>
                </motion.h3>
                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <motion.div
                            key={idx}
                            variants={fadeInUp}
                            custom={idx * 0.1}
                            whileHover={{ x: 6, borderColor: 'rgba(245,158,11,0.4)' }}
                            className="bg-white/5 border border-white/10 rounded-xl p-6 transition-colors cursor-default"
                        >
                            <h4 className="font-black text-white mb-2 text-lg">{faq.q}</h4>
                            <p className="text-gray-400 font-light text-sm">{faq.a}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        try {
            await apiFetch("/salvation", { method: "POST", body: JSON.stringify(formData) });
            onSuccess();
        } catch (err) {
            setError(err.message || "Une erreur est survenue lors de l'envoi");
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputCls = "w-full bg-black border-2 border-white/10 focus:border-amber-500 text-white px-6 py-4 rounded-xl outline-none transition-all duration-300 placeholder-gray-600";

    const fields = [
        { label: 'Ton Nom', icon: <User size={16} className="inline mr-2" />, inputs: [
            { name: 'lastName', placeholder: 'Dupont', type: 'text', autoComplete: 'family-name' },
            { name: 'firstName', placeholder: 'Jean', type: 'text', autoComplete: 'given-name' }
        ]},
        { label: 'Email', icon: <Mail size={16} className="inline mr-2" />, inputs: [
            { name: 'email', placeholder: 'jean@example.com', type: 'email', autoComplete: 'email' }
        ]},
        { label: 'Password', icon: null, inputs: [
            { name: 'password', placeholder: 'Mot de passe', type: 'password', autoComplete: 'new-password' }
        ]},
        { label: 'Téléphone (optionnel)', icon: <Phone size={16} className="inline mr-2" />, inputs: [
            { name: 'telephone', placeholder: '+229 XX XXX XXX', type: 'tel' }
        ]},
    ];

    return (
        <motion.div {...stepTransition} className="max-w-2xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-zinc-950 to-black border-2 border-white/10 rounded-3xl p-12"
            >
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
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

                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-6 border border-red-500/30 bg-red-500/10 px-5 py-4 rounded-xl text-red-300 text-sm font-bold"
                        >
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                >
                    {fields.map(({ label, icon, inputs }, fi) => (
                        <motion.div key={fi} variants={fadeInUp} custom={fi * 0.08}>
                            <label className="block text-white font-bold text-sm mb-3 uppercase tracking-widest">
                                {icon}{label}
                            </label>
                            {inputs.map(({ name, placeholder, type, autoComplete }, ii) => (
                                <motion.input
                                    key={ii}
                                    type={type}
                                    name={name}
                                    value={formData[name]}
                                    onChange={handleInputChange}
                                    placeholder={placeholder}
                                    autoComplete={autoComplete}
                                    className={`${inputCls} ${ii > 0 ? 'mt-4' : ''}`}
                                    required={name !== 'telephone'}
                                    whileFocus={{ borderColor: '#f59e0b', scale: 1.005 }}
                                />
                            ))}
                        </motion.div>
                    ))}

                    {/* Message */}
                    <motion.div variants={fadeInUp} custom={0.5}>
                        <label className="block text-white font-bold text-sm mb-3 uppercase tracking-widest">
                            Message (optionnel)
                        </label>
                        <motion.textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Partage comment tu te sens maintenant..."
                            rows="4"
                            className={`${inputCls} resize-none`}
                            whileFocus={{ borderColor: '#f59e0b', scale: 1.005 }}
                        />
                    </motion.div>

                    {/* Submit */}
                    <motion.div variants={fadeInUp} custom={0.6} className="space-y-4 pt-2">
                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={!isSubmitting ? { scale: 1.02, boxShadow: '0 0 40px rgba(245,158,11,0.35)' } : {}}
                            whileTap={!isSubmitting ? { scale: 0.97 } : {}}
                            className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 disabled:from-zinc-700 disabled:to-zinc-600 text-black disabled:text-zinc-400 px-10 py-4 rounded-xl font-black uppercase text-sm tracking-widest flex items-center justify-center gap-2 transition-colors duration-300"
                        >
                            {isSubmitting ? (
                                <>
                                    <motion.svg
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                        width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                    >
                                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                    </motion.svg>
                                    <span>Envoi en cours...</span>
                                </>
                            ) : (
                                <>
                                    <span>Confirmer mon Inscription</span>
                                    <ArrowRight size={16} />
                                </>
                            )}
                        </motion.button>

                        <motion.button
                            type="button"
                            onClick={onBack}
                            whileHover={{ scale: 1.01, backgroundColor: 'rgba(255,255,255,0.08)' }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-white/5 border border-white/20 text-white px-10 py-3 rounded-xl font-bold uppercase text-[10px] tracking-widest"
                        >
                            Retour
                        </motion.button>
                    </motion.div>
                </motion.form>
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
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="bg-gradient-to-br from-amber-500/20 to-yellow-500/10 border-2 border-amber-500/50 rounded-3xl p-16"
        >
            <motion.div
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, duration: 0.6, type: 'spring', stiffness: 200 }}
                className="text-7xl mb-6 inline-block"
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
                <motion.button
                    onClick={() => window.location.href = '/login'}
                    whileHover={{ scale: 1.04, backgroundColor: 'rgba(255,255,255,0.1)' }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-white/5 border border-white/20 text-white px-10 py-3 rounded-xl font-bold uppercase text-[10px] tracking-widest"
                >
                    Connecte toi
                </motion.button>
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

const TestimoniesSection = () => (
    <section className="py-32 px-4 md:px-8 relative bg-zinc-950 border-y border-white/5">
        <div className="container mx-auto max-w-6xl relative z-10">
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl font-black text-white mb-16 tracking-tighter text-center"
            >
                Témoignages de <span className="text-amber-500">Transformation</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonies.map((testimony, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                        whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(245,158,11,0.15)', borderColor: 'rgba(245,158,11,0.3)' }}
                        className="bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-2xl p-8 transition-colors duration-300 cursor-default"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <motion.div
                                whileHover={{ rotate: 5, scale: 1.1 }}
                                className="w-14 h-14 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-full flex items-center justify-center font-black text-black text-xl"
                            >
                                {testimony.image}
                            </motion.div>
                            <div>
                                <p className="font-black text-white">{testimony.name}</p>
                                <p className="text-amber-500 text-xs font-bold uppercase tracking-widest">{testimony.role}</p>
                            </div>
                        </div>
                        <p className="text-gray-400 font-light leading-relaxed italic">"{testimony.text}"</p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

/* ─── Page Principale ─────────────────────────────────────────────────── */
const SalvationPrayer = () => {
    const [step, setStep] = useState(1);

    const handleSuccess = () => {
        setStep(3);
        setTimeout(() => setStep(1), 5000);
    };

    return (
        <div className="relative flex min-h-screen flex-col bg-black text-gray-400">
            <div className="fixed top-0 right-0 left-0 z-50">
                <Nav />
            </div>

            <main className="grow pt-20">
                <HeroBanner />

                {/* Steps Section */}
                <section className="py-20 px-4 md:px-8 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/50 to-black pointer-events-none" />
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