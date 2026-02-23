import React, { useState } from 'react';
import Nav from '../common/Nav';

const Banner = () => {
    return (
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto animate-fade-in">
            {/* Surtitre discret */}
            <span className="text-amber-500 font-bold tracking-[0.4em] uppercase text-xs mb-4 block">
                Engagement & Service
            </span>

            {/* Titre Principal */}
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
                Deviens un(e) <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-500 to-amber-600">S.T.A.R.</span>
            </h1>

            {/* Définition STAR mise en valeur */}
            <div className="relative inline-block mb-12">
                <div className="absolute inset-0 bg-white/10 blur-xl rounded-full"></div>
                <div className="relative border-l-4 border-amber-500 pl-6 py-2">
                    <p className="text-xl md:text-3xl text-white font-light tracking-wide italic">
                        "<span className="font-bold text-amber-500 uppercase">S</span>erviteur
                        <span className="font-bold text-amber-500 uppercase"> t</span>ravaillant
                        <span className="font-bold text-amber-500 uppercase"> a</span>ctivement pour le
                        <span className="font-bold text-amber-500 uppercase"> R</span>oyaume"
                    </p>
                </div>
            </div>

            {/* Bouton d'action */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-4">
                <a
                    href="#fij-list"
                    className="group bg-amber-600 text-white hover:bg-white hover:text-black px-10 py-4 text-sm font-black uppercase tracking-widest transition-all duration-300 rounded-full shadow-xl flex items-center gap-3"
                >
                    Trouve ton Ministere
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </a>
            </div>
        </div>
    );
};

// Ministry Card Component
const MinistryCard = ({ ministry, reversed = false }) => {
    return (
        <div className={`group relative bg-zinc-950 border border-white/5 rounded-[2.5rem] overflow-hidden transition-all duration-700 shadow-2xl hover:shadow-amber-600/5 flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-stretch min-h-[500px]`}>
            {/* Image : Augmentée à 60% de largeur */}
            <div className="w-full lg:w-[60%] relative overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                    style={{ backgroundImage: `url("${ministry.image}")` }}
                />
                {/* Overlay pour fondre l'image dans le texte */}
                <div className={`absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-${reversed ? 'l' : 'r'} from-zinc-950 via-transparent to-transparent opacity-60`} />
            </div>

            {/* Texte : 40% de largeur avec plus de padding */}
            <div className="w-full lg:w-[40%] p-10 lg:p-16 flex flex-col justify-center">
                <span className="text-amber-500 text-[11px] font-black tracking-[0.6em] uppercase mb-6 block">
                    {ministry.category}
                </span>
                <h3 className="text-4xl lg:text-5xl font-bold text-white mb-8 tracking-tighter leading-tight">
                    {ministry.title}
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-10 font-light italic">
                    {ministry.description}
                </p>
                <button className="w-fit px-10 py-4 bg-transparent border border-amber-500/30 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-amber-600 hover:text-black hover:border-amber-600 transition-all duration-500 rounded-full">
                    {ministry.buttonText}
                </button>
            </div>
        </div>
    );
};

// Ministries Section Component
const MinistriesSection = () => {
    const ministries = [
        {
            category: "Leadership & Creative",
            title: "Worship & Creative Arts",
            description: "Join a team of musicians, vocalists, and technical artists dedicated to creating immersive environments where people can encounter the divine.",
            buttonText: "Join This Ministry",
            image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop"
        },
        {
            category: "Generations",
            title: "EJP Kids & Youth",
            description: "Help shape the future by investing in the next generation. Our kids ministry is a vibrant space for learning, growth, and joyful discovery.",
            buttonText: "Volunteer Now",
            image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop"
        },
        {
            category: "Service",
            title: "Hospitality & Care",
            description: "Be the first point of contact for our visitors. Create a culture of belonging through radical hospitality and practical support for our community.",
            buttonText: "Connect with Care",
            image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop"
        }
    ];
    // ... tes données ministries restent les mêmes
    return (
        <section className="pb-32 px-4 md:px-8 lg:px-12"> {/* Padding réduit ici pour laisser respirer la grille */}
            <div className="max-w-[1550px] w-full mx-auto space-y-20"> {/* Largeur max augmentée et espace entre cartes augmenté */}
                {ministries.map((ministry, index) => (
                    <MinistryCard key={index} ministry={ministry} reversed={index % 2 !== 0} />
                ))}

                {/* Bouton Load More stylisé */}
                <div className="flex justify-center pt-12">
                    <button className="group flex items-center gap-6 text-gray-500 hover:text-amber-500 transition-all">
                        <span className="w-20 h-px bg-white/10 group-hover:w-32 group-hover:bg-amber-500/50 transition-all" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em]">Découvrir plus</span>
                        <span className="w-20 h-px bg-white/10 group-hover:w-32 group-hover:bg-amber-500/50 transition-all" />
                    </button>
                </div>
            </div>
        </section>
    );
};

// Contact Form Component
const ContactForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        ministry: 'Worship & Arts',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Ajoutez votre logique d'envoi ici
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    // ... logique useState identique
    return (
        <section className="bg-black border-t border-white/5 py-32 px-4">
            <div className="max-w-5xl mx-auto"> {/* Largeur augmentée à 5xl */}
                <div className="flex flex-col md:flex-row gap-16 items-start">
                    {/* Colonne Gauche : Texte */}
                    <div className="w-full md:w-1/3">
                        <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
                            Prêt à <br />
                            <span className="text-amber-500 italic">Servir ?</span>
                        </h2>
                        <p className="text-gray-500 leading-relaxed font-light">
                            Rejoins l'aventure S.T.A.R. et mets tes talents au service d'une vision plus grande.
                        </p>
                    </div>

                    {/* Colonne Droite : Formulaire */}
                    <form onSubmit={handleSubmit} className="w-full md:w-2/3 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="group space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-amber-500/60">Nom Complet</label>
                                <input name="fullName" className="w-full bg-zinc-900/50 border-b border-white/10 py-4 text-white focus:border-amber-500 transition-all outline-none" placeholder="Ex: Jean d'Impact" />
                            </div>
                            <div className="group space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-amber-500/60">Email</label>
                                <input name="email" className="w-full bg-zinc-900/50 border-b border-white/10 py-4 text-white focus:border-amber-500 transition-all outline-none" placeholder="votre@email.com" />
                            </div>
                        </div>
                        {/* ... Autres champs avec le même style de border-b (plus moderne) ... */}
                        <button type="submit" className="px-12 py-5 bg-amber-600 text-black font-black uppercase tracking-widest text-[10px] rounded-full hover:bg-white transition-all shadow-xl shadow-amber-600/10">
                            Envoyer ma demande
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

// Footer Component
const Footer = () => {
    return (
        <footer className="bg-gray-950 border-t border-white/5 px-4 md:px-20 lg:px-40 py-20">
            <div className="mx-auto max-w-[1400px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                    <div className="space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-7 h-7 border border-yellow-600/40 flex items-center justify-center text-yellow-600 rotate-45">
                                <span className="-rotate-45 text-lg">⛪</span>
                            </div>
                            <h2 className="text-xl font-black text-white tracking-tighter uppercase">
                                EJP<span className="text-yellow-600">.</span>
                            </h2>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                            A contemporary community dedicated to living out faith with excellence and deep purpose.
                        </p>
                        <div className="flex gap-5">
                            <a className="text-gray-500 hover:text-yellow-600 transition-colors" href="#">📱</a>
                            <a className="text-gray-500 hover:text-yellow-600 transition-colors" href="#">📷</a>
                            <a className="text-gray-500 hover:text-yellow-600 transition-colors" href="#">🎥</a>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-white text-[10px] font-bold uppercase tracking-[0.3em] mb-8">Navigation</h4>
                        <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-gray-500">
                            <li><a className="hover:text-yellow-600 transition-colors" href="#">About Us</a></li>
                            <li><a className="hover:text-yellow-600 transition-colors" href="#">Our Beliefs</a></li>
                            <li><a className="hover:text-yellow-600 transition-colors" href="#">Ministries</a></li>
                            <li><a className="hover:text-yellow-600 transition-colors" href="#">Live Stream</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white text-[10px] font-bold uppercase tracking-[0.3em] mb-8">Involvement</h4>
                        <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-gray-500">
                            <li><a className="hover:text-yellow-600 transition-colors" href="#">Serve</a></li>
                            <li><a className="hover:text-yellow-600 transition-colors" href="#">Groups</a></li>
                            <li><a className="hover:text-yellow-600 transition-colors" href="#">Missions</a></li>
                            <li><a className="hover:text-yellow-600 transition-colors" href="#">Giving</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white text-[10px] font-bold uppercase tracking-[0.3em] mb-8">Connect</h4>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4 leading-loose">
                            123 Faith Avenue<br />Grace City, ST 12345
                        </p>
                        <p className="text-yellow-600 text-xs font-bold uppercase tracking-widest">Sundays: 9:00 & 11:00 AM</p>
                    </div>
                </div>
                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] uppercase tracking-widest text-gray-700 font-bold">© 2024 EJP Church. Crafted for Purpose.</p>
                    <div className="flex gap-8">
                        <a className="text-[10px] uppercase tracking-widest text-gray-700 font-bold hover:text-yellow-600" href="#">Privacy</a>
                        <a className="text-[10px] uppercase tracking-widest text-gray-700 font-bold hover:text-yellow-600" href="#">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

// Main App Component
const MinistriesPage = () => {
    return (
        <div className="relative flex min-h-screen flex-col bg-black text-gray-400">
            <div className='fixed top-0 right-0 left-0 z-50'>
                <Nav />
            </div>

            <main className="flex-grow">
                {/* Section Hero avec Image de fond */}
                <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
                    {/* Background Image Layer */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 animate-slow-zoom"
                        style={{
                            backgroundImage: `url('/src/assets/fij3.jpeg')`,
                        }}
                    >
                        {/* Overlay sombre progressif */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black"></div>
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


