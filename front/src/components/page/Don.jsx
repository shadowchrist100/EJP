import React, { useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Nav, Footer, Contact } from "../"
import { Heart, Check, ArrowRight, Zap, Users, Globe, AlertCircle, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { apiFetch } from '../../util/api';
import GoldParticles from '../fx/GoldParticles';
import TiltCard from '../fx/TiltCard';
import SuccessBurst from '../fx/SuccessBurst';
import AnimatedNumber from '../fx/AnimatedNumber';
import useScrollReveal from '../fx/useScrollReveal';
import useShake from '../fx/useShake';

gsap.registerPlugin(SplitText);

const EXPO = [0.16, 1, 0.3, 1];

const feedback = {
    initial: { opacity: 0, height: 0, y: -10 },
    animate: { opacity: 1, height: 'auto', y: 0, transition: { duration: 0.45, ease: EXPO } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.3 } },
};

// Hero Section Component
const DonationHero = () => {
    const ref = useRef(null);
    const [impacted, setImpacted] = useState(0);

    useLayoutEffect(() => {
        const mm = gsap.matchMedia();
        const ctx = gsap.context(() => {
            mm.add('(prefers-reduced-motion: no-preference)', () => {
                const title = SplitText.create('.dn-title', { type: 'words,chars', mask: 'chars' });
                const lead = SplitText.create('.dn-lead', { type: 'words' });
                // Gold shimmer per letter (background-clip text breaks on a transformed parent).
                title.chars.filter((c) => c.closest('.dn-gold')).forEach((c) => c.classList.add('shimmer-gold'));
                gsap.timeline({ defaults: { ease: 'expo.out' } })
                    .fromTo('.dn-badge', { y: 30, opacity: 0, scale: 0.8 }, { y: 0, opacity: 1, scale: 1, duration: 1, clearProps: 'transform' }, 0.2)
                    .from(title.chars, { yPercent: 120, rotate: 6, duration: 1.2, stagger: 0.025 }, 0.35)
                    .from(lead.words, { opacity: 0, y: 18, filter: 'blur(8px)', duration: 0.9, stagger: 0.02 }, 0.9)
                    .fromTo('.dn-stat', { y: 40, opacity: 0, rotateX: -40 }, { y: 0, opacity: 1, rotateX: 0, duration: 1.2, clearProps: 'transform,opacity' }, 1.2)
                    .fromTo('.dn-cta', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, clearProps: 'transform,opacity' }, 1.4);
            });
        }, ref);
        const t = setTimeout(() => setImpacted(100), 1300);
        return () => { clearTimeout(t); mm.revert(); ctx.revert(); };
    }, []);

    return (
        <section ref={ref} className="dn-hero relative min-h-screen flex items-center justify-center overflow-hidden pt-25">
            {/* Background avec gradient et animation */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute inset-0 bg-linear-to-b from-black via-black/95 to-zinc-900" />
            </div>
            <GoldParticles count={650} speed={1.3} style={{ zIndex: 1 }} />

            {/* Content */}
            <div className="container mx-auto px-6 relative z-10 pt-2 mb-2">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="dn-badge inline-flex items-center gap-3 mb-8 px-4 py-2 glass-gold rounded-full">
                        <Heart className="text-amber-500 animate-pulse" size={16} />
                        <span className="text-amber-500 font-bold tracking-[0.3em] uppercase text-xs">
                            Soutenir la Vision
                        </span>
                    </div>

                    <h1 className="dn-title text-5xl sm:text-7xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
                        Sois <span className="dn-gold">Partenaire</span> de la Vision E.J.P
                    </h1>

                    <p className="dn-lead text-xl md:text-2xl text-gray-300 font-light mb-12 leading-relaxed max-w-3xl mx-auto">
                        Ton don finance les événements, les ministères et l'impact communautaire de l'EJP. Chaque contribution propulse notre vision vers les extrémités de la Terre.
                    </p>

                    {/* Impact Stats */}
                    <div className="flex items-center justify-center mb-12 max-w-2xl mx-auto" style={{ perspective: 800 }}>
                        <div className="dn-stat glass-gold gold-border">
                            <p className="text-4xl font-black text-amber-400 mb-2 tabular-nums">
                                <AnimatedNumber value={impacted} />+
                            </p>
                            <p className="text-xs text-gray-400 uppercase tracking-widest font-light">Jeunes impactés</p>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className="dn-cta">
                        <a href="#donation-options" className="btn-engage">
                            <span>Commencer un don</span>
                            <ArrowRight size={16} className="btn-engage-arrow" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};


const QUICK_AMOUNTS = [1000, 2000, 5000, 10000];

const DonationOptions = () => {
    const [customAmount, setCustomAmount] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [cardRef, shake] = useShake();

    const amount = parseFloat(customAmount);
    const valid = customAmount && amount > 0;

    const handleDonate = async () => {
        if (!customAmount || parseFloat(customAmount) <= 0) return;
        setLoading(true);
        setError('');
        try {
            await apiFetch('/dons', {
                method: 'POST',
                body: JSON.stringify({ amount: parseFloat(customAmount) }),
            });
            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
                setCustomAmount('');
            }, 3000);
        } catch (err) {
            setError(err.message || 'Une erreur est survenue.');
            shake();
            setTimeout(() => setError(''), 5000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="donation-options" className="py-32 px-4 md:px-8 relative">
            <div className="absolute inset-0 bg-linear-to-b from-black via-zinc-900/50 to-black pointer-events-none" />

            <div className="container mx-auto max-w-4xl relative z-10">
                {/* Section Title */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter" data-reveal="chars">
                        Soutenir la <span className="text-amber-400">Vision</span>
                    </h2>
                    <p className="text-gray-400 text-lg font-light italic" data-reveal="up">
                        Peu importe le montant, chaque don compte et crée un impact réel
                    </p>
                </div>

                {/* Mobile Transfer Card */}
                <div className="relative mb-8" data-reveal="up">
                    <TiltCard max={4} className="dn-card dn-card--green">
                        <span className="dn-card-halo" aria-hidden="true" />
                        <div className="relative p-6 sm:p-12 md:p-16">
                            <div className="text-center">
                                <div className="text-7xl mb-8 dn-float">📱</div>

                                <h3 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">
                                    Transfert Mobile
                                </h3>

                                <p className="text-gray-400 text-lg font-light mb-6 max-w-2xl mx-auto leading-relaxed">
                                    Envoie ton don directement par transfert mobile sur le numéro ci-dessous :
                                </p>

                                <div className="dn-number inline-block rounded-2xl p-6 sm:p-8 mb-6">
                                    <p className="text-gray-500 text-xs uppercase tracking-widest font-black mb-2">
                                        Numéro à utiliser
                                    </p>
                                    <p className="text-3xl sm:text-4xl font-black text-green-400 tracking-wider">
                                        +229 XX XX XX XX
                                    </p>
                                    <div className="mt-4 pt-4 border-t border-white/10">
                                        <p className="text-gray-500 text-sm font-light">
                                            Nom du compte : <span className="text-white font-bold">EJP PORTO</span>
                                        </p>
                                    </div>
                                </div>

                                <p className="text-gray-500 text-sm font-light">
                                    Disponible sur toutes les plateformes de transfert mobile (MTN, Moov, etc.)
                                </p>
                            </div>
                        </div>
                    </TiltCard>
                </div>

                {/* Custom Donation Card */}
                <div className="relative" data-reveal="up">
                    <motion.div ref={cardRef}>
                        <TiltCard max={3} className="dn-card dn-card--gold glass-gold">
                            <span className="dn-card-halo" aria-hidden="true" />
                            <div className="relative p-6 sm:p-12 md:p-16">
                                <div className="text-center">
                                    {/* Icon */}
                                    <div className="text-7xl mb-8 animate-bounce">💝</div>

                                    {/* Title */}
                                    <h3 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">
                                        Don Personnalisé
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-400 text-lg font-light mb-10 max-w-2xl mx-auto leading-relaxed">
                                        Tu as un montant spécifique en tête? Aucun problème! Fixe le montant de ton choix et soutiens directement la vision E.J.P
                                    </p>

                                    {/* Montant animé */}
                                    <div className={`dn-amount ${valid ? 'is-on' : ''}`} aria-hidden="true">
                                        <AnimatedNumber value={valid ? amount : 0} className="tabular-nums" />
                                        <span className="dn-amount-cur">F</span>
                                    </div>

                                    {/* Montants rapides */}
                                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6">
                                        {QUICK_AMOUNTS.map((v) => (
                                            <motion.button
                                                key={v}
                                                type="button"
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => setCustomAmount(String(v))}
                                                className={`dn-chip ${amount === v ? 'is-active' : ''}`}
                                            >
                                                {v.toLocaleString('fr-FR')} F
                                            </motion.button>
                                        ))}
                                    </div>

                                    {/* Input & Button Container */}
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 max-w-2xl mx-auto">
                                        <div className="gx-field flex-1 w-full">
                                            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-white font-black text-xl z-10">F</span>
                                            <input
                                                type="number"
                                                min="1"
                                                value={customAmount}
                                                onChange={(e) => setCustomAmount(e.target.value)}
                                                onKeyDown={(e) => { if (e.key === 'Enter') handleDonate(); }}
                                                placeholder="Ton montant..."
                                                aria-label="Montant du don en francs CFA"
                                                className="gx-input text-center font-black text-2xl"
                                                style={{ paddingLeft: '3rem' }}
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleDonate}
                                            disabled={!customAmount || parseFloat(customAmount) <= 0 || loading}
                                            className="btn-engage w-full sm:w-auto"
                                            aria-busy={loading}
                                        >
                                            <span>{loading ? 'Envoi en cours...' : 'Donner'}</span>
                                            {loading ? (
                                                <span className="gx-spinner" aria-hidden="true" />
                                            ) : (
                                                <ArrowRight size={16} className="btn-engage-arrow" />
                                            )}
                                        </button>
                                    </div>

                                    {/* Feedback Message */}
                                    <div role="status" aria-live="polite">
                                        <AnimatePresence>
                                            {isSubmitted && (
                                                <motion.div key="ok" {...feedback} className="flex flex-col items-center gap-3 text-amber-500 font-bold text-lg text-center">
                                                    <SuccessBurst size={64} />
                                                    ✓ Merci pour ta générosité!
                                                </motion.div>
                                            )}
                                            {error && (
                                                <motion.div key="err" {...feedback} className="text-red-400 font-bold text-sm text-center flex items-center justify-center gap-2">
                                                    <AlertCircle size={16} />
                                                    {error}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Additional Info */}
                                    <div className="mt-10 pt-10 border-t border-white/10">
                                        <p className="text-gray-500 text-sm font-light">
                                            Tous les dons sont sécurisés et 100% déduits à l'impact communautaire
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </TiltCard>
                    </motion.div>
                </div>

                {/* Trust Badges
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6"
                >
                    <div className="text-center p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-amber-500/30 transition-all">
                        <div className="text-3xl mb-3">🔒</div>
                        <p className="text-white font-black text-sm mb-1">Sécurisé</p>
                        <p className="text-gray-500 text-xs font-light">Paiement crypté</p>
                    </div>
                    <div className="text-center p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-amber-500/30 transition-all">
                        <div className="text-3xl mb-3">✓</div>
                        <p className="text-white font-black text-sm mb-1">Transparent</p>
                        <p className="text-gray-500 text-xs font-light">100% pour l'impact</p>
                    </div>
                    <div className="text-center p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-amber-500/30 transition-all">
                        <div className="text-3xl mb-3">❤️</div>
                        <p className="text-white font-black text-sm mb-1">Flexible</p>
                        <p className="text-gray-500 text-xs font-light">Montant libre</p>
                    </div>
                </motion.div> */}
            </div>
        </section>
    );
};

// Donation Options Component
// const DonationOptions = () => {
//     const [selectedOption, setSelectedOption] = useState(null);

//     const donationPlans = [
//         {
//             id: 1,
//             amount: 10,
//             name: "Ami",
//             description: "Soutien symbolique pour débuter",
//             benefits: [
//                 "Accès à la newsletter mensuelle",
//                 "Badge de soutien sur le site",
//                 "Prières spéciales mensuelles"
//             ],
//             icon: "🤝",
//             popular: false
//         },
//         {
//             id: 2,
//             amount: 25,
//             name: "Partenaire",
//             description: "Soutien mensuel régulier",
//             benefits: [
//                 "Tout du plan Ami",
//                 "Rapports trimestriels d'impact",
//                 "Invitations aux événements VIP",
//                 "Reconnaissance publique"
//             ],
//             icon: "⭐",
//             popular: true
//         },
//         {
//             id: 3,
//             amount: 50,
//             name: "Champion",
//             description: "Soutien financier principal",
//             benefits: [
//                 "Tout du plan Partenaire",
//                 "Appels mensuels avec le leadership",
//                 "Influence sur les décisions d'impact",
//                 "Nommage d'initiatives",
//                 "Rapport annuel détaillé"
//             ],
//             icon: "🏆",
//             popular: false
//         }
//     ];

//     return (
//         <section id="donation-options" className="py-32 px-4 md:px-8 relative">
//             <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/50 to-black pointer-events-none" />

//             <div className="container mx-auto max-w-6xl relative z-10">
//                 {/* Section Title */}
//                 <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-4">
//                     <h2 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter">
//                         Choisir votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">Niveau de Soutien</span>
//                     </h2>
//                     <p className="text-gray-400 text-lg font-light italic">
//                         Peu importe le montant, chaque don compte et crée un impact réel
//                     </p>
//                 </div>

//                 {/* Plans Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
//                     {donationPlans.map((plan, idx) => (
//                         <div
//                             key={plan.id}
//                             onClick={() => setSelectedOption(plan.id)}
//                             className={`group relative rounded-3xl overflow-hidden transition-all duration-300 cursor-pointer animate-in fade-in slide-in-from-bottom-4`}
//                             style={{ animationDelay: `${idx * 100}ms` }}
//                         >
//                             {/* Popular Badge */}
//                             {plan.popular && (
//                                 <div className="absolute top-6 right-6 z-20 bg-gradient-to-r from-amber-500 to-yellow-500 text-black px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse">
//                                     Populaire
//                                 </div>
//                             )}

//                             {/* Card Background */}
//                             <div className={`absolute inset-0 rounded-3xl transition-all duration-300 ${plan.popular
//                                     ? 'bg-gradient-to-br from-amber-500/20 to-yellow-500/10 border-2 border-amber-500/50 group-hover:border-amber-400'
//                                     : 'bg-gradient-to-br from-zinc-950 to-black border-2 border-white/10 group-hover:border-amber-500/50'
//                                 }`} />

//                             {/* Glow Effect */}
//                             <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl blur-2xl ${plan.popular ? 'bg-amber-500/20' : 'bg-amber-500/10'
//                                 }`} />

//                             {/* Content */}
//                             <div className="relative p-8 flex flex-col h-full">
//                                 {/* Icon & Name */}
//                                 <div className="mb-6">
//                                     <div className="text-5xl mb-4">{plan.icon}</div>
//                                     <h3 className="text-3xl font-black text-white mb-2 tracking-tight">
//                                         {plan.name}
//                                     </h3>
//                                     <p className="text-gray-400 text-sm font-light">
//                                         {plan.description}
//                                     </p>
//                                 </div>

//                                 {/* Price */}
//                                 <div className="mb-8">
//                                     <div className="flex items-baseline gap-2">
//                                         <span className="text-5xl font-black text-amber-400">
//                                             ${plan.amount}
//                                         </span>
//                                         <span className="text-gray-500 text-sm font-light">/mois</span>
//                                     </div>
//                                 </div>

//                                 {/* Benefits */}
//                                 <div className="space-y-3 mb-8 flex-grow">
//                                     {plan.benefits.map((benefit, bidx) => (
//                                         <div key={bidx} className="flex items-start gap-3">
//                                             <Check size={16} className="text-amber-500 flex-shrink-0 mt-1" />
//                                             <span className="text-gray-300 text-sm font-light">
//                                                 {benefit}
//                                             </span>
//                                         </div>
//                                     ))}
//                                 </div>

//                                 {/* CTA Button */}
//                                 <button className={`w-full py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all duration-300 flex items-center justify-center gap-2 group/btn overflow-hidden relative ${selectedOption === plan.id || plan.popular
//                                         ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black hover:shadow-2xl hover:shadow-amber-500/50'
//                                         : 'bg-white/5 border border-white/20 text-white hover:bg-amber-600 hover:text-black hover:border-amber-600'
//                                     }`}>
//                                     <span className="relative flex items-center gap-2">
//                                         Choisir ce plan
//                                         <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
//                                     </span>
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Custom Amount Section */}
//                 <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/5 border-2 border-amber-500/30 rounded-3xl p-10 text-center animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: '300ms' }}>
//                     <h3 className="text-2xl font-black text-white mb-3">Don personnalisé</h3>
//                     <p className="text-gray-400 mb-6 font-light">
//                         Tu as un montant spécifique en tête? Nous l'acceptons!
//                     </p>
//                     <input
//                         type="number"
//                         placeholder="Entre ton montant..."
//                         className="w-full md:w-64 bg-black border-2 border-amber-500/30 text-white px-6 py-3 rounded-xl focus:border-amber-500 focus:outline-none transition-all text-center font-black text-xl mb-4"
//                     />
//                 </div>
//             </div>
//         </section>
//     );
// };


// Impact Section Component
const ImpactSection = () => {
    const impacts = [
        {
            icon: <Zap className="text-amber-400" size={32} />,
            title: "Événements",
            description: "Organiser les rendez-vous S.T.A.R. avec excellence et impact spirituel"
        },
        {
            icon: <Users className="text-amber-400" size={32} />,
            title: "Ministère",
            description: "Soutenir le ministère  pour servir efficacement notre communauté"
        },
        {
            icon: <Globe className="text-amber-400" size={32} />,
            title: "Expansion",
            description: "Étendre la vision E.J.P à de nouveaux pays et continents"
        }
    ];

    return (
        <section className="py-32 px-4 md:px-8 bg-black relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto max-w-6xl relative z-10">
                {/* Title */}
                <div className="text-center mb-20">
                    <h2 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter" data-reveal="chars">
                        Où va votre <span className="text-amber-400">Don</span>
                    </h2>
                    <p className="text-gray-400 text-lg font-light" data-reveal="up">
                        100% de transparence sur l'utilisation de vos contributions
                    </p>
                </div>

                {/* Impact Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {impacts.map((impact, idx) => (
                        <div key={idx} data-reveal="up">
                            <TiltCard max={10} className="dn-impact glass-gold">
                                <span className="dn-card-halo" aria-hidden="true" />
                                <span className="dn-impact-num" aria-hidden="true">{String(idx + 1).padStart(2, '0')}</span>
                                <div className="relative">
                                    <div className="dn-impact-icon mb-6 p-4 w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center">
                                        {impact.icon}
                                    </div>
                                    <h3 className="text-2xl font-black text-white mb-3">
                                        {impact.title}
                                    </h3>
                                    <p className="text-gray-400 font-light leading-relaxed">
                                        {impact.description}
                                    </p>
                                </div>
                            </TiltCard>
                        </div>
                    ))}
                </div>

                {/* Budget Breakdown */}
                {/* <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="bg-linear-to-br from-amber-500/5 to-yellow-500/5 border-2 border-amber-500/20 rounded-3xl p-10"
                >
                    <h3 className="text-2xl font-black text-white mb-8">Allocation des ressources</h3>
                    <div className="space-y-6">
                        {[
                            { label: 'Événements & Ministères', percent: 60, color: 'from-amber-500 to-yellow-500' },
                            { label: 'Formation & Leadership', percent: 20, color: 'from-amber-400 to-orange-400' },
                            { label: 'Frais opérationnels', percent: 15, color: 'from-yellow-400 to-amber-400' },
                            { label: 'Reserve & croissance', percent: 5, color: 'from-amber-300 to-yellow-300' }
                        ].map((item, idx) => (
                            <div key={idx}>
                                <div className="flex justify-between mb-2">
                                    <span className="font-bold text-white">{item.label}</span>
                                    <span className="text-amber-400 font-black">{item.percent}%</span>
                                </div>
                                <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                                    <div
                                        className={`h-full bg-linear-to-r ${item.color}`}
                                        style={{ width: `${item.percent}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div> */}
            </div>
        </section>
    );
};

// FAQ Section Component
const FAQSection = () => {
    const [openFAQ, setOpenFAQ] = useState(null);

    const faqs = [
        {
            id: 1,
            question: "Les dons sont-ils sécurisés?",
            answer: "Oui, tous les dons sont traités via un processus de paiement sécurisés (FedaPay ). Tes informations sont cryptées et protégées."
        },

        {
            id: 5,
            question: "Comment je peux suivre l'impact de mon don?",
            answer: "En fonction de ton niveau de soutien, tu reçois des rapports d'impact réguliers, des invitations à des événements et des appels avec le leadership."
        }
    ];

    return (
        <section className="py-32 px-4 md:px-8 relative bg-linear-to-b from-black to-zinc-900/50">
            <div className="container mx-auto max-w-4xl">
                {/* Title */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter" data-reveal="chars">
                        Questions <span className="text-amber-400">Fréquentes</span>
                    </h2>
                </div>

                {/* FAQs */}
                <div className="space-y-4">
                    {faqs.map((faq) => {
                        const open = openFAQ === faq.id;
                        return (
                            <div key={faq.id} data-reveal="up" className={`dn-faq ${open ? 'is-open' : ''}`}>
                                <button
                                    onClick={() => setOpenFAQ(open ? null : faq.id)}
                                    aria-expanded={open}
                                    className="w-full px-6 py-5 flex items-center justify-between gap-4"
                                >
                                    <h3 className="text-lg font-bold text-white text-left">
                                        {faq.question}
                                    </h3>
                                    <ChevronDown size={20} className="dn-faq-chev text-amber-500 shrink-0" />
                                </button>

                                <AnimatePresence initial={false}>
                                    {open && (
                                        <motion.div
                                            key="a"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1, transition: { duration: 0.5, ease: EXPO } }}
                                            exit={{ height: 0, opacity: 0, transition: { duration: 0.3 } }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 py-4 border-t border-white/5">
                                                <p className="text-gray-400 font-light leading-relaxed">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

// Main Donation Page Component
const DonationPage = () => {
    const pageRef = useRef(null);
    useScrollReveal(pageRef);

    return (
        <div ref={pageRef} className="dn-page relative flex min-h-screen flex-col bg-black text-gray-400">
            <div className='fixed top-0 right-0 left-0 z-50'>
                <Nav />
            </div>

            <main className="grow">
                <DonationHero />
                <DonationOptions />
                <ImpactSection />
                <FAQSection />

                {/* Final CTA */}
                <section className="py-24 px-4 bg-linear-to-b from-black to-zinc-900 relative overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />
                        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
                    </div>

                    <div className="container mx-auto max-w-4xl text-center relative z-10">
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter" data-reveal="chars">
                            Prêt à <span className="text-amber-400">Transformer</span> des Vies?
                        </h2>
                        <p className="text-gray-400 text-lg font-light mb-10 max-w-2xl mx-auto" data-reveal="up">
                            Rejoins les centaines de partenaires qui soutiennent la vision S.T.A.R. et créent un impact durable.
                        </p>
                        <div data-reveal="up">
                            <a href="#donation-options" className="btn-engage">
                                <Heart size={18} />
                                <span>Faire un don maintenant</span>
                                <ArrowRight size={16} className="btn-engage-arrow" />
                            </a>
                        </div>
                    </div>
                </section>
            </main>
            <section id="contact" className="py-32 bg-zinc-950">
                <Contact verset={{
                    verset: "Que chacun donne comme il l'a résolu en son coeur, sans tristesse ni contrainte; car Dieu aime celui qui donne avec joie.",
                    ref: '2 Corinthiens 9:7'
                }} />
            </section>
            <Footer />
        </div>
    );
};

export default DonationPage;
