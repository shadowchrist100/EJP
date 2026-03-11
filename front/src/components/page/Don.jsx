import React, { useState } from 'react';
import { Nav, Footer } from "../"
import { Heart, Check, ArrowRight, Zap, Users, Globe } from 'lucide-react';

// Hero Section Component
const DonationHero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-25">
            {/* Background avec gradient et animation */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute inset-0 bg-linear-to-b from-black via-black/95 to-zinc-900" />
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full backdrop-blur-sm group hover:bg-amber-500/20 transition-all duration-300">
                        <Heart className="text-amber-500 animate-pulse" size={16} />
                        <span className="text-amber-500 font-bold tracking-[0.3em] uppercase text-xs">
                            Soutenir la Vision
                        </span>
                    </div>

                    <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
                        Sois <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-200 via-yellow-400 to-amber-600">Partenaire</span> de la Vision S.T.A.R.
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-300 font-light mb-12 leading-relaxed max-w-3xl mx-auto">
                        Ton don finance les événements, les ministères et l'impact communautaire de l'EJP. Chaque contribution propulse notre vision vers les extrémités de la Terre.
                    </p>

                    {/* Impact Stats */}
                    <div className="flex items-center justify-center mb-12 max-w-2xl mx-auto">
                        <div className=" p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm hover:border-amber-500/50 transition-all duration-300">
                            <p className="text-3xl font-black text-amber-400 mb-2">100+</p>
                            <p className="text-xs text-gray-400 uppercase tracking-widest font-light">Jeunes impactés</p>
                        </div>
                    </div>
                    {/* <div className="grid grid-cols-3 gap-6 mb-12 max-w-2xl mx-auto">
                        <div className="p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm hover:border-amber-500/50 transition-all duration-300">
                            <p className="text-3xl font-black text-amber-400 mb-2">100+</p>
                            <p className="text-xs text-gray-400 uppercase tracking-widest font-light">Jeunes impactés</p>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm hover:border-amber-500/50 transition-all duration-300">
                            <p className="text-3xl font-black text-amber-400 mb-2">12</p>
                            <p className="text-xs text-gray-400 uppercase tracking-widest font-light">Ministères actifs</p>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm hover:border-amber-500/50 transition-all duration-300">
                            <p className="text-3xl font-black text-amber-400 mb-2">7</p>
                            <p className="text-xs text-gray-400 uppercase tracking-widest font-light">Pays touchés</p>
                        </div>
                    </div> */}

                    {/* CTA Button */}
                    <a href="#donation-options" className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-black px-10 py-4 rounded-full font-black uppercase text-sm tracking-widest hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 group">
                        <span>Commencer un don</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>
        </section>
    );
};



const DonationOptions = () => {
    const [customAmount, setCustomAmount] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleDonate = () => {
        if (customAmount && parseFloat(customAmount) > 0) {
            setIsSubmitted(true);
            // Ici vous pouvez ajouter la logique de paiement
            setTimeout(() => {
                setIsSubmitted(false);
                setCustomAmount('');
            }, 3000);
        }
    };

    return (
        <section id="donation-options" className="py-32 px-4 md:px-8 relative">
            <div className="absolute inset-0 bg-linear-to-b from-black via-zinc-900/50 to-black pointer-events-none" />

            <div className="container mx-auto max-w-4xl relative z-10">
                {/* Section Title */}
                <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4">
                    <h2 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter">
                        Soutenir la <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-yellow-500">Vision</span>
                    </h2>
                    <p className="text-gray-400 text-lg font-light italic">
                        Peu importe le montant, chaque don compte et crée un impact réel
                    </p>
                </div>

                {/* Custom Donation Card */}
                <div className="relative group animate-in fade-in slide-in-from-bottom-4">
                    {/* Card Background */}
                    <div className="absolute inset-0 bg-linear-to-br from-amber-500/20 to-yellow-500/10 border-2 border-amber-500/50 rounded-3xl group-hover:border-amber-400 transition-all duration-300" />
                    
                    {/* Glow Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl blur-2xl bg-amber-500/20" />

                    {/* Content */}
                    <div className="relative p-12 md:p-16">
                        <div className="text-center">
                            {/* Icon */}
                            <div className="text-7xl mb-8 animate-bounce">💝</div>

                            {/* Title */}
                            <h3 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">
                                Don Personnalisé
                            </h3>

                            {/* Description */}
                            <p className="text-gray-400 text-lg font-light mb-10 max-w-2xl mx-auto leading-relaxed">
                                Tu as un montant spécifique en tête? Aucun problème! Fixe le montant de ton choix et soutiens directement la vision S.T.A.R.
                            </p>

                            {/* Input & Button Container */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 max-w-2xl mx-auto">
                                <div className="relative flex-1 w-full">
                                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-white font-black text-xl">F</span>
                                    <input
                                        type="number"
                                        value={customAmount}
                                        onChange={(e) => setCustomAmount(e.target.value)}
                                        placeholder="Ton montant..."
                                        className="w-full bg-black border-2 border-amber-500/30 focus:border-amber-500 text-white px-6 pl-12 py-4 rounded-xl outline-none transition-all text-center font-black text-2xl placeholder-gray-600"
                                    />
                                </div>
                                <button
                                    onClick={handleDonate}
                                    disabled={!customAmount || parseFloat(customAmount) <= 0}
                                    className="w-full sm:w-auto bg-linear-to-r from-amber-500 to-yellow-500 text-black px-10 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 flex items-center justify-center gap-2 group/btn disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                                >
                                    <span>Donner</span>
                                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>

                            {/* Feedback Message */}
                            {isSubmitted && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 text-amber-500 font-bold text-lg">
                                    ✓ Merci pour ta générosité!
                                </div>
                            )}

                            {/* Additional Info */}
                            <div className="mt-10 pt-10 border-t border-white/10">
                                <p className="text-gray-500 text-sm font-light">
                                    Tous les dons sont sécurisés et 100% déduits à l'impact communautaire
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-16 grid grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: '100ms' }}>
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
                </div>
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
            title: "Ministères",
            description: "Soutenir les 7 ministères pour servir efficacement notre communauté"
        },
        {
            icon: <Globe className="text-amber-400" size={32} />,
            title: "Expansion",
            description: "Étendre la vision S.T.A.R. à de nouveaux pays et continents"
        }
    ];

    return (
        <section className="py-32 px-4 md:px-8 bg-black relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto max-w-6xl relative z-10">
                {/* Title */}
                <div className="text-center mb-20">
                    <h2 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter">
                        Où va votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">Don</span>
                    </h2>
                    <p className="text-gray-400 text-lg font-light">
                        100% de transparence sur l'utilisation de vos contributions
                    </p>
                </div>

                {/* Impact Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {impacts.map((impact, idx) => (
                        <div
                            key={idx}
                            className="group relative bg-gradient-to-br from-zinc-950 to-black border border-white/10 rounded-3xl p-8 hover:border-amber-500/50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
                            style={{ animationDelay: `${idx * 100}ms` }}
                        >
                            {/* Glow */}
                            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 bg-amber-500/10 blur-2xl transition-opacity" />

                            {/* Content */}
                            <div className="relative">
                                <div className="mb-6 p-4 w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center group-hover:bg-amber-500/20 transition-all">
                                    {impact.icon}
                                </div>
                                <h3 className="text-2xl font-black text-white mb-3">
                                    {impact.title}
                                </h3>
                                <p className="text-gray-400 font-light leading-relaxed">
                                    {impact.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Budget Breakdown */}
                <div className="bg-gradient-to-br from-amber-500/5 to-yellow-500/5 border-2 border-amber-500/20 rounded-3xl p-10">
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
                                        className={`h-full bg-gradient-to-r ${item.color}`}
                                        style={{ width: `${item.percent}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
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
            answer: "Oui, tous les dons sont traités via des processus de paiement sécurisés (Stripe, PayPal). Tes informations sont cryptées et protégées."
        },
        {
            id: 2,
            question: "Puis-je modifier ou annuler mon don?",
            answer: "Absolument! Tu peux modifier ou annuler ton don mensuel à tout moment sans pénalité. Accède à ton compte et gère tes préférences."
        },
        {
            id: 3,
            question: "Est-ce que je reçois un reçu fiscal?",
            answer: "Oui, tu reçois un reçu pour chaque don qui peut être utilisé à des fins fiscales selon ta juridiction."
        },
        {
            id: 4,
            question: "Puis-je faire un don ponctuel au lieu d'un don mensuel?",
            answer: "Bien sûr! Tu peux faire un don unique en utilisant la section 'Don personnalisé' ou nous contacter directement."
        },
        {
            id: 5,
            question: "Comment je peux suivre l'impact de mon don?",
            answer: "En fonction de ton niveau de soutien, tu reçois des rapports d'impact réguliers, des invitations à des événements et des appels avec le leadership."
        }
    ];

    return (
        <section className="py-32 px-4 md:px-8 relative bg-gradient-to-b from-black to-zinc-900/50">
            <div className="container mx-auto max-w-4xl">
                {/* Title */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter">
                        Questions <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">Fréquentes</span>
                    </h2>
                </div>

                {/* FAQs */}
                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div
                            key={faq.id}
                            className="group border-2 border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-amber-500/50 animate-in fade-in slide-in-from-bottom-4"
                            style={{ animationDelay: `${idx * 50}ms` }}
                        >
                            <button
                                onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                                className="w-full px-6 py-4 flex items-center justify-between bg-white/5 hover:bg-white/10 transition-all"
                            >
                                <h3 className="text-lg font-bold text-white text-left">
                                    {faq.question}
                                </h3>
                                <span className={`text-amber-500 transition-transform duration-300 ${openFAQ === faq.id ? 'rotate-180' : ''}`}>
                                    ▼
                                </span>
                            </button>

                            {openFAQ === faq.id && (
                                <div className="px-6 py-4 bg-black/50 border-t border-white/5">
                                    <p className="text-gray-400 font-light leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Main Donation Page Component
const DonationPage = () => {
    return (
        <div className="relative flex min-h-screen flex-col bg-black text-gray-400">
            <div className='fixed top-0 right-0 left-0 z-50'>
                <Nav />
            </div>

            <main className="grow">
                <DonationHero />
                <DonationOptions />
                <ImpactSection />
                <FAQSection />

                {/* Final CTA */}
                <section className="py-24 px-4 bg-gradient-to-b from-black to-zinc-900 relative overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />
                        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
                    </div>

                    <div className="container mx-auto max-w-4xl text-center relative z-10">
                        <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter">
                            Prêt à <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">Transformer</span> des Vies?
                        </h2>
                        <p className="text-gray-400 text-lg font-light mb-10 max-w-2xl mx-auto">
                            Rejoins les centaines de partenaires qui soutiennent la vision S.T.A.R. et créent un impact durable.
                        </p>
                        <a href="#donation-options" className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-black px-12 py-5 rounded-full font-black uppercase text-sm tracking-widest hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 group">
                            <Heart size={18} />
                            <span>Faire un don maintenant</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default DonationPage;