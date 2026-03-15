import React, { useState } from 'react';
import {Nav, Footer} from '../'
import { Heart, Check, ArrowRight, Mail, User, Phone } from 'lucide-react';
import { apiFetch } from '../../util/api';

const SalvationPrayer = () => {
    const [step, setStep] = useState(1); // 1: Prayer, 2: Form, 3: Confirmation
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.name && formData.email) {
            setSubmitted(true);
            setStep(3);
            // const data = await apiFetch("/reborn", {
            //     method: "POST",
            //     body: JSON.stringify(formData)
            // });
            // Reset form after 5 seconds
            setTimeout(() => {
                setFormData({ name: '', email: '', phone: '', message: '' });
                setStep(1);
                setSubmitted(false);
            }, 5000);
        }
    };

    const prayerPoints = [
        {
            title: "Reconnaître",
            description: "Reconnais que tu es un pécheur et que tu as besoin de Jésus",
            icon: "👁️"
        },
        {
            title: "Croire",
            description: "Crois que Jésus est mort et ressuscité pour tes péchés",
            icon: "✝️"
        },
        {
            title: "Confess",
            description: "Confesse Jésus comme ton Seigneur et Sauveur personnel",
            icon: "💬"
        },
        {
            title: "Transformer",
            description: "Laisse-toi transformer par la puissance du Saint Esprit",
            icon: "🔥"
        }
    ];

    const testimonies = [
        {
            name: "Marie Dupont",
            role: "Nouvelle convertie",
            text: "La prière du salut a changé ma vie. J'ai trouvé la paix et un nouveau sens de vie.",
            image: "M"
        },
        {
            name: "Jean Paul",
            role: "Membre actif",
            text: "Depuis que j'ai accepté Jésus, tout a changé. Je suis libre et j'ai l'espoir.",
            image: "J"
        },
        {
            name: "Sophie Martin",
            role: "Nouvelle convertie",
            text: "C'est la meilleure décision que j'ai jamais prise. Gloire à Dieu!",
            image: "S"
        }
    ];

    return (
        <div className="relative flex min-h-screen flex-col bg-black text-gray-400">
            <div className='fixed top-0 right-0 left-0 z-50'>
                <Nav />
            </div>

            <main className="grow pt-20">
                {/* Hero Section */}
                <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden px-4 md:px-8">
                    {/* Background avec gradient et animation */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
                        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-zinc-900" />
                    </div>

                    {/* Content */}
                    <div className="container mx-auto max-w-4xl relative z-10">
                        <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full backdrop-blur-sm group hover:bg-amber-500/20 transition-all duration-300">
                                <Heart className="text-amber-500 animate-pulse" size={16} />
                                <span className="text-amber-500 font-bold tracking-[0.3em] uppercase text-xs">
                                    Un Nouveau Commencement
                                </span>
                            </div>

                            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-none">
                                La <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600">Prière du Salut</span>
                            </h1>

                            <p className="text-lg md:text-xl text-gray-300 font-light mb-10 leading-relaxed max-w-3xl mx-auto">
                                Accepte Jésus-Christ comme ton Seigneur et Sauveur personnel. C'est le moment de transformer ta vie et de commencer un nouveau voyage spirituel.
                            </p>

                            <div className="flex gap-4 justify-center flex-wrap">
                                <button
                                    onClick={() => setStep(1)}
                                    className="bg-gradient-to-r from-amber-500 to-yellow-500 text-black px-10 py-4 rounded-full font-black uppercase text-sm tracking-widest hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 group flex items-center gap-2"
                                >
                                    <Heart size={18} />
                                    <span><a href="#prayer">Faire la prière</a></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Content Sections */}
                <section className="py-20 px-4 md:px-8 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/50 to-black pointer-events-none" />

                    <div className="container mx-auto max-w-6xl relative z-10">
                        {/* Step 1: Prayer */}
                        {step === 1 && (
                            <div className="animate-in fade-in slide-in-from-bottom-4">
                                {/* Prayer Points */}
                                <div className="mb-20">
                                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">
                                        Les 4 étapes du <span className="text-amber-500">Salut</span>
                                    </h2>
                                    <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full mb-12" />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {prayerPoints.map((point, idx) => (
                                            <div
                                                key={idx}
                                                className="group bg-gradient-to-br from-zinc-950 to-black border border-white/10 hover:border-amber-500/50 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20 hover:-translate-y-2"
                                            >
                                                <div className="text-5xl mb-4">{point.icon}</div>
                                                <h3 className="text-2xl font-black text-white mb-3 tracking-tight group-hover:text-amber-400 transition-colors">
                                                    {point.title}
                                                </h3>
                                                <p className="text-gray-400 font-light leading-relaxed">
                                                    {point.description}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Prayer Text */}
                                <div id='prayer' className="bg-gradient-to-br from-amber-500/10 to-yellow-500/5 border-2 border-amber-500/30 rounded-3xl p-12 mb-12">
                                    <h3 className="text-3xl font-black text-white mb-8 tracking-tight text-center">
                                        Récite cette Prière
                                    </h3>

                                    <div className="prayer space-y-6 text-gray-300 font-light leading-relaxed max-w-3xl mx-auto mb-8">
                                        <p>
                                            <span className="text-amber-400 font-bold">"Seigneur Jésus,</span> je reconnais que je suis un pécheur. Je crois que Tu es mort et ressuscité pour mes péchés. Je T'accepte maintenant comme mon Seigneur et Sauveur personnel. Pardonne-moi et transforms ma vie. Je veux Te suivre et vivre pour Toi. Amen."
                                        </p>
                                    </div>

                                    <div className="text-center">
                                        <button
                                            onClick={() => setStep(2)}
                                            className="bg-gradient-to-r from-amber-500 to-yellow-500 text-black px-12 py-4 rounded-full font-black uppercase text-sm tracking-widest hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 group flex items-center gap-2 mx-auto"
                                        >
                                            <span>J'ai Prié - S'inscrire Maintenant</span>
                                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>

                                {/* FAQ Section */}
                                <div className="mb-12">
                                    <h3 className="text-3xl font-black text-white mb-8 tracking-tighter">
                                        Questions <span className="text-amber-500">Fréquentes</span>
                                    </h3>

                                    <div className="space-y-4">
                                        {[
                                            {
                                                q: "Qu'est-ce que la prière du salut?",
                                                a: "C'est une prière personnelle d'acceptation de Jésus-Christ comme Seigneur et Sauveur. C'est le début de ta relation avec Dieu."
                                            },
                                            {
                                                q: "Que se passe-t-il après la prière?",
                                                a: "Tu es sauvé et deviens enfant de Dieu. Il est important de te connecter à une communauté chrétienne et de commencer à apprendre la Bible."
                                            },
                                            {
                                                q: "Dois-je faire quelque chose de spécial?",
                                                a: "Après la prière, nous te recommandons de trouver une église, de lire la Bible et de partager ta décision avec d'autres."
                                            }
                                        ].map((faq, idx) => (
                                            <div key={idx} className="bg-white/5 border border-white/10 hover:border-amber-500/30 rounded-xl p-6 transition-all">
                                                <h4 className="font-black text-white mb-2 text-lg">{faq.q}</h4>
                                                <p className="text-gray-400 font-light text-sm">{faq.a}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Registration Form */}
                        {step === 2 && (
                            <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4">
                                <div className="bg-gradient-to-br from-zinc-950 to-black border-2 border-white/10 rounded-3xl p-12">
                                    <h2 className="text-4xl font-black text-white mb-2 tracking-tighter mb-8">
                                        Bienvenue en Famille! 🎉
                                    </h2>
                                    <p className="text-gray-400 font-light mb-10">
                                        Remplis ce formulaire pour que nous puissions te soutenir dans ton nouveau voyage spirituel.
                                    </p>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Name */}
                                        <div>
                                            <label className="block text-white font-bold text-sm mb-3 uppercase tracking-widest">
                                                <User size={16} className="inline mr-2" />
                                                Ton Nom
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="Jean Dupont"
                                                className="w-full bg-black border-2 border-white/10 focus:border-amber-500 text-white px-6 py-4 rounded-xl outline-none transition-all placeholder-gray-600"
                                                required
                                            />
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label className="block text-white font-bold text-sm mb-3 uppercase tracking-widest">
                                                <Mail size={16} className="inline mr-2" />
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="jean@example.com"
                                                className="w-full bg-black border-2 border-white/10 focus:border-amber-500 text-white px-6 py-4 rounded-xl outline-none transition-all placeholder-gray-600"
                                                required
                                            />
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <label className="block text-white font-bold text-sm mb-3 uppercase tracking-widest">
                                                <Phone size={16} className="inline mr-2" />
                                                Téléphone (optionnel)
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="+229 XX XXX XXX"
                                                className="w-full bg-black border-2 border-white/10 focus:border-amber-500 text-white px-6 py-4 rounded-xl outline-none transition-all placeholder-gray-600"
                                            />
                                        </div>

                                        {/* Message */}
                                        <div>
                                            <label className="block text-white font-bold text-sm mb-3 uppercase tracking-widest">
                                                Message (optionnel)
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                placeholder="Partage comment tu te sens maintenant..."
                                                rows="4"
                                                className="w-full bg-black border-2 border-white/10 focus:border-amber-500 text-white px-6 py-4 rounded-xl outline-none transition-all placeholder-gray-600 resize-none"
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-black px-10 py-4 rounded-xl font-black uppercase text-sm tracking-widest hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 flex items-center justify-center gap-2 group mt-8"
                                        >
                                            <span>Confirmer mon Inscription</span>
                                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </button>

                                        {/* Back Button */}
                                        <button
                                            type="button"
                                            onClick={() => setStep(1)}
                                            className="w-full bg-white/5 border border-white/20 text-white px-10 py-3 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all"
                                        >
                                            Retour
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Confirmation */}
                        {step === 3 && (
                            <div className="max-w-2xl mx-auto text-center animate-in fade-in slide-in-from-bottom-4">
                                <div className="bg-gradient-to-br from-amber-500/20 to-yellow-500/10 border-2 border-amber-500/50 rounded-3xl p-16">
                                    <div className="text-7xl mb-6 animate-bounce">✝️</div>
                                    <h2 className="text-5xl font-black text-white mb-4 tracking-tighter">
                                        Félicitations!
                                    </h2>
                                    <p className="text-gray-300 font-light text-lg mb-6 leading-relaxed">
                                        Tu as fait le plus important choix de ta vie! Tu es maintenant un enfant de Dieu et fais partie de notre famille EJP.
                                    </p>
                                    <p className="text-amber-400 font-bold text-lg mb-8">
                                        Bienvenue à la maison! 🙏
                                    </p>
                                    <p className="text-gray-400 font-light mb-8">
                                        Nous t'enverrons un email de bienvenue avec les prochaines étapes.
                                    </p>
                                    <div className="flex gap-4 justify-center">
                                        <button
                                            onClick={() => window.location.href = '/'}
                                            className="bg-white/5 border border-white/20 text-white px-10 py-3 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all"
                                        >
                                            Retour à l'Accueil
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* Testimonies Section */}
                <section className="py-32 px-4 md:px-8 relative bg-zinc-950 border-y border-white/5">
                    <div className="container mx-auto max-w-6xl relative z-10">
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter text-center mb-16">
                            Témoignages de <span className="text-amber-500">Transformation</span>
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {testimonies.map((testimony, idx) => (
                                <div
                                    key={idx}
                                    className="bg-gradient-to-br from-zinc-900 to-black border border-white/10 hover:border-amber-500/30 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-4"
                                    style={{ animationDelay: `${idx * 100}ms` }}
                                >
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-full flex items-center justify-center font-black text-black text-xl">
                                            {testimony.image}
                                        </div>
                                        <div>
                                            <p className="font-black text-white">{testimony.name}</p>
                                            <p className="text-amber-500 text-xs font-bold uppercase tracking-widest">{testimony.role}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-400 font-light leading-relaxed italic">
                                        "{testimony.text}"
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default SalvationPrayer;