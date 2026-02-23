import React, { useState, useEffect } from 'react';
import Nav from '../common/Nav';
import Footer from '../common/Footer'
import { ArrowRight, Sparkles, Zap } from 'lucide-react';

const Banner = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto animate-fade-in">
            {/* Élément de parallax subtil */}
            <div 
                className="absolute -top-40 -left-40 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl opacity-0 animate-pulse"
                style={{
                    left: `${mousePos.x / 100}px`,
                    top: `${mousePos.y / 100}px`,
                    transition: 'all 0.3s ease-out'
                }}
            />

            {/* Surtitre animé */}
            <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full backdrop-blur-sm group hover:bg-amber-500/20 transition-all duration-300">
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                <span className="text-amber-500 font-bold tracking-[0.4em] uppercase text-xs">
                    Engagement & Service
                </span>
            </div>

            {/* Titre Principal avec animation */}
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none relative">
                Deviens un(e){' '}
                <span className="inline-block relative">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600 animate-pulse">
                        S.T.A.R.
                    </span>
                    <span className="absolute -inset-2 bg-gradient-to-r from-amber-500 to-yellow-500 blur-2xl opacity-20 animate-pulse rounded-lg" />
                </span>
            </h1>

            {/* Définition STAR améliorée */}
            <div className="relative inline-block mb-12 group">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative border-l-4 border-amber-500 pl-6 py-4 bg-white/5 backdrop-blur-sm px-8 rounded-2xl border border-white/10 hover:border-amber-500/50 transition-all duration-300">
                    <p className="text-xl md:text-3xl text-white font-light tracking-wide italic">
                        "<span className="font-bold text-amber-400 uppercase">S</span>erviteur
                        <span className="font-bold text-amber-400 uppercase"> t</span>ravaillant
                        <span className="font-bold text-amber-400 uppercase"> a</span>ctivement pour le
                        <span className="font-bold text-amber-400 uppercase"> R</span>oyaume"
                    </p>
                </div>
            </div>

            {/* Bouton d'action amélioré */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-8">
                <a
                    href="#ministries-list"
                    className="group relative bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:text-black px-10 py-4 text-sm font-black uppercase tracking-widest transition-all duration-300 rounded-full shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 flex items-center gap-3 overflow-hidden"
                >
                    <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                    <span className="relative flex items-center gap-2">
                        <Sparkles size={16} />
                        Trouve ton Ministère
                    </span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform relative" />
                </a>
            </div>
        </div>
    );
};

// Ministry Card Component amélioré
const MinistryCard = ({ ministry, reversed = false, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`group relative bg-gradient-to-br from-zinc-950 to-black border border-white/10 rounded-3xl overflow-hidden transition-all duration-700 shadow-2xl hover:shadow-amber-600/20 flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-stretch min-h-[450px] hover:border-amber-500/40 animate-in fade-in slide-in-from-bottom-4`}
            style={{ animationDelay: `${index * 100}ms` }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image avec effets */}
            <div className="w-full lg:w-[60%] relative overflow-hidden">
                {ministry.image && (
                    <>
                        <div
                            className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                            style={{ backgroundImage: `url("${ministry.image}")` }}
                        />
                        <div className={`absolute inset-0 bg-gradient-to-${reversed ? 'l' : 'r'} from-black via-black/40 to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-500`} />
                    </>
                )}
                {!ministry.image && (
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 flex items-center justify-center">
                        <Zap className="text-amber-500/30" size={64} />
                    </div>
                )}
            </div>

            {/* Contenu */}
            <div className="w-full lg:w-[40%] p-8 lg:p-12 flex flex-col justify-between">
                <div>
                    <span className="text-amber-400 text-[11px] font-black tracking-[0.6em] uppercase mb-4 block opacity-80 group-hover:opacity-100 transition-opacity">
                        {ministry.category || 'MINISTÈRE'}
                    </span>
                    <h3 className="text-4xl lg:text-5xl font-black text-white mb-6 tracking-tighter leading-tight group-hover:text-amber-400 transition-colors duration-300">
                        {ministry.title}
                    </h3>
                    <p className="text-gray-300 text-base leading-relaxed mb-8 font-light">
                        {ministry.description || 'Rejoins-nous et mets tes talents au service de la vision S.T.A.R.'}
                    </p>
                </div>

                <button className="group/btn w-fit px-8 py-3 bg-transparent border-2 border-amber-500/50 text-amber-400 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-amber-600 hover:text-black hover:border-amber-600 transition-all duration-500 rounded-full flex items-center gap-2 relative overflow-hidden">
                    <span className="absolute inset-0 bg-amber-600 -z-10 scale-x-0 group-hover/btn:scale-x-100 origin-left transition-transform duration-500" />
                    <span className="relative">Rejoindre</span>
                    <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform relative" />
                </button>
            </div>

            {/* Effet de glow au hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/10 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>
    );
};

// Ministries Section Component
const MinistriesSection = () => {
    const [visibleCount, setVisibleCount] = useState(3);

    const ministries = [
        {
            category: "Communication",
            title: "Communication",
            description: "Partage la vision S.T.A.R. à travers les mots et les images. Manage les réseaux sociaux et crée du contenu impactant pour inspirer notre communauté.",
            buttonText: "Rejoindre",
            image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop"
        },
        {
            category: "Musique",
            title: "Chorale",
            description: "Lève-toi et chante! Exprime ton amour à travers la musique et conduis les autres à la louange sincère. Aucune expérience requise, juste une passion pour le chant.",
            buttonText: "Rejoindre",
            image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop"
        },
        {
            category: "Tech",
            title: "Audio Visuel",
            description: "Maîtrise la technologie pour créer une expérience spirituelle immersive. Son, lumière, vidéo - tous les éléments au service de la vision S.T.A.R.",
            buttonText: "Rejoindre",
            image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop"
        },
        {
            category: "Logistique",
            title: "Secrétariat",
            description: "Sois l'organisateur invisible qui fait fonctionner la machine. Gère les documents, archives, communication administrative et coordonne les événements avec precision.",
            buttonText: "Rejoindre",
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop"
        },
        {
            category: "Maintenance",
            title: "Entretiens",
            description: "Maintiens nos espaces en excellence et propreté. Un environnement bien organisé et accueillant reflète l'ordre et la grâce de Dieu dans nos vies.",
            buttonText: "Rejoindre",
            image: "https://images.unsplash.com/photo-1503387762519-52582dea4e4e?w=800&h=600&fit=crop"
        },
        {
            category: "Leadership",
            title: "Protocole",
            description: "Accueille avec excellence et hospitalité nos visiteurs et membres. Sois la représentation du service raffiné et de l'amour du Christ dans chaque interaction.",
            buttonText: "Rejoindre",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"
        },
        {
            category: "Créativité",
            title: "Art et Expression",
            description: "Exprime ta créativité pour glorifier l'Éternel. Danse, théâtre, peinture, design - tous les arts sont bienvenus et nécessaires pour une expression complète.",
            buttonText: "Rejoindre",
            image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800&h=600&fit=crop"
        }
    ];

    return (
        <section className="py-32 px-4 md:px-8 lg:px-12 relative" id="ministries-list">
            {/* Background elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-[1550px] w-full mx-auto relative z-10 space-y-16">
                {/* Titre de section */}
                <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-4">
                    <h2 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter">
                        Explore nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">Ministères</span>
                    </h2>
                    <p className="text-gray-400 text-lg font-light italic">
                        Chaque don est unique, trouve ta place dans l'équipe S.T.A.R.
                    </p>
                </div>

                {/* Cartes ministères */}
                {ministries.slice(0, visibleCount).map((ministry, index) => (
                    <MinistryCard key={index} ministry={ministry} reversed={index % 2 !== 0} index={index} />
                ))}

                {/* Bouton Load More stylisé */}
                {visibleCount < ministries.length && (
                    <div className="flex justify-center pt-8 animate-in fade-in">
                        <button 
                            onClick={() => setVisibleCount(prev => prev + 3)}
                            className="group flex items-center gap-6 text-gray-500 hover:text-amber-400 transition-all duration-300"
                        >
                            <span className="w-20 h-px bg-white/10 group-hover:w-32 group-hover:bg-amber-500 transition-all duration-500" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] whitespace-nowrap">
                                Découvrir plus
                            </span>
                            <span className="w-20 h-px bg-white/10 group-hover:w-32 group-hover:bg-amber-500 transition-all duration-500" />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

// Contact Form Component amélioré
const ContactForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        ministry: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        setFormData({ fullName: '', email: '', ministry: '', message: '' });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section className="bg-gradient-to-b from-black to-zinc-900/50 border-t border-white/5 py-32 px-4 relative overflow-hidden">
            {/* Décoration de fond */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    {/* Colonne Gauche */}
                    <div className="w-full lg:w-1/3 animate-in fade-in slide-in-from-left-4">
                        <h2 className="text-5xl lg:text-6xl font-black text-white mb-6 leading-tight tracking-tighter">
                            Prêt à <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500 italic">Servir ?</span>
                        </h2>
                        <p className="text-gray-400 leading-relaxed font-light text-lg mb-8">
                            Rejoins l'aventure S.T.A.R. et mets tes talents au service d'une vision plus grande. Ton engagement change les vies.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-amber-400">
                                <span className="w-2 h-2 bg-amber-400 rounded-full" />
                                <span className="text-sm font-light">Croissance personnelle</span>
                            </div>
                            <div className="flex items-center gap-3 text-amber-400">
                                <span className="w-2 h-2 bg-amber-400 rounded-full" />
                                <span className="text-sm font-light">Impact communautaire</span>
                            </div>
                            <div className="flex items-center gap-3 text-amber-400">
                                <span className="w-2 h-2 bg-amber-400 rounded-full" />
                                <span className="text-sm font-light">Connexions spirituelles</span>
                            </div>
                        </div>
                    </div>

                    {/* Colonne Droite : Formulaire */}
                    <form onSubmit={handleSubmit} className="w-full lg:w-2/3 space-y-8 animate-in fade-in slide-in-from-right-4">
                        {submitted && (
                            <div className="p-6 bg-amber-500/20 border border-amber-500/50 rounded-2xl text-amber-300 text-center font-bold animate-in fade-in">
                                ✓ Merci! Nous avons reçu ta demande. À bientôt! 🌟
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-[11px] uppercase tracking-widest font-black text-amber-400/80">Nom Complet</label>
                                <div className="relative group">
                                    <input
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('fullName')}
                                        onBlur={() => setFocusedField(null)}
                                        className="w-full bg-white/5 border-b-2 border-white/20 py-3 text-white placeholder-gray-600 focus:border-amber-500 transition-all outline-none backdrop-blur-sm"
                                        placeholder="Jean d'Impact"
                                    />
                                    <span className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-500 transition-all duration-300 w-0 group-focus-within:w-full" />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[11px] uppercase tracking-widest font-black text-amber-400/80">Email</label>
                                <div className="relative group">
                                    <input
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('email')}
                                        onBlur={() => setFocusedField(null)}
                                        className="w-full bg-white/5 border-b-2 border-white/20 py-3 text-white placeholder-gray-600 focus:border-amber-500 transition-all outline-none backdrop-blur-sm"
                                        placeholder="votre@email.com"
                                    />
                                    <span className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-500 transition-all duration-300 w-0 group-focus-within:w-full" />
                                </div>
                            </div>

                            <div className="space-y-3 md:col-span-2">
                                <label className="text-[11px] uppercase tracking-widest font-black text-amber-400/80">Ministère d'intérêt</label>
                                <div className="relative group">
                                    <select
                                        name="ministry"
                                        value={formData.ministry}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('ministry')}
                                        onBlur={() => setFocusedField(null)}
                                        className="w-full bg-white/5 border-b-2 border-white/20 py-3 text-white placeholder-gray-600 focus:border-amber-500 transition-all outline-none backdrop-blur-sm appearance-none cursor-pointer"
                                    >
                                        <option value="">Sélectionne un ministère...</option>
                                        <option value="Communication">Communication</option>
                                        <option value="Chorale">Chorale</option>
                                        <option value="Audio Visuel">Audio Visuel</option>
                                        <option value="Secrétariat">Secrétariat</option>
                                        <option value="Entretiens">Entretiens</option>
                                        <option value="Protocole">Protocole</option>
                                        <option value="Art et Expression">Art et Expression</option>
                                    </select>
                                    <ArrowRight size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-amber-500 pointer-events-none rotate-90" />
                                    <span className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-500 transition-all duration-300 w-0 group-focus-within:w-full" />
                                </div>
                            </div>

                            <div className="space-y-3 md:col-span-2">
                                <label className="text-[11px] uppercase tracking-widest font-black text-amber-400/80">Message</label>
                                <div className="relative group">
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('message')}
                                        onBlur={() => setFocusedField(null)}
                                        className="w-full bg-white/5 border-2 border-white/20 py-4 px-4 text-white placeholder-gray-600 focus:border-amber-500 transition-all outline-none backdrop-blur-sm rounded-xl resize-none h-32"
                                        placeholder="Parle-nous de toi et de tes motivations..."
                                    />
                                    <span className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-500 transition-all duration-300 w-0 group-focus-within:w-full rounded-full" />
                                </div>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className="group relative w-full md:w-fit px-12 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-black uppercase tracking-widest text-[11px] rounded-full hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden"
                        >
                            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                            <span className="relative">Envoyer ma demande</span>
                            <Sparkles size={14} className="relative group-hover:animate-spin" />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

// Main App Component
const MinistriesPage = () => {
    return (
        <div className="relative flex min-h-screen flex-col bg-black text-gray-400 overflow-x-hidden">
            <div className='fixed top-0 right-0 left-0 z-50'>
                <Nav />
            </div>

            <main className="grow">
                {/* Hero Section */}
                <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
                        style={{
                            backgroundImage: `url('/src/assets/fij3.jpeg')`,
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/90" />
                        <div className="absolute inset-0 backdrop-blur-[1px]" />
                    </div>

                    <Banner />
                </section>

                <div className="bg-black relative z-10">
                    <MinistriesSection />
                    <ContactForm />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default MinistriesPage;