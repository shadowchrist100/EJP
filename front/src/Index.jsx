import React, { useState, useEffect, Component } from 'react';
import logo from "./assets/images/ejp_logo.jpg";
import { ArrowRight, Quote } from 'lucide-react'
import VisionSection from './components/VisionSection';
import Nav from './components/common/Nav'
import Footer from './components/common/Footer';
import fij1 from "./assets/images/image.jpg";
import fij2 from "./assets/images/image1.jpg";
import fij3 from "./assets/images/image2.jpg";
import fij4 from "./assets/images/immg.jpeg";
import song from "./assets/song.mp3"

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const images = [fij1, fij2, fij3, fij4];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <section className="relative h-screen flex items-start justify-center overflow-hidden bg-black">
            {/* --- SLIDESHOW BACKGROUND (Inchangé) --- */}
            <div className="absolute inset-0 z-0">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 bg-cover bg-center transition-all duration-1500 ease-in-out ${index === currentSlide ? 'opacity-70 scale-100' : 'opacity-0 scale-110'
                            }`}
                        style={{
                            backgroundImage: `url(${img})`,
                            filter: 'contrast(1.1) brightness(0.8)'
                        }}
                    />
                ))}
                <div className="absolute inset-0 bg-linear-to-b from-black/90 via-transparent to-black z-10" />
            </div>

            {/* --- CONTENT : Ajusté pour monter plus haut --- */}
            <div className="relative z-20 text-center px-4 max-w-5xl mx-auto pt-15 md:pt-3">
                {/* Logo plus petit et marge réduite */}
                <div className="mb-4 flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-amber-500/20 blur-2xl rounded-full"></div>
                        <img src={logo} alt="logo" className="relative w-15 h-15 md:w-24 md:h-24 rounded-full border-2 border-amber-500/30 p-1 shadow-2xl" />
                    </div>
                </div>

                {/* Surtitre rapproché */}
                <span className="text-amber-500 font-black tracking-[0.5em] uppercase text-[9px] md:text-[10px] mb-2 block">
                    Porto-Novo, Bénin
                </span>

                {/* Titre avec interligne serré et marge réduite */}
                {/* Titre Principal */}
                <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9] uppercase drop-shadow-2xl">
                    Église Jeunes <br />
                    {/* Bloc Slogan Encadré par deux barres horizontales */}
                    <div className="flex flex-col items-center mt-6 mb-8">
                        {/* Barre horizontale supérieure */}
                        <div className="w-24 md:w-32 h-px bg-linear-to-r from-transparent via-amber-500 to-transparent mb-3"></div>

                        <p className="text-amber-500 font-bold tracking-[0.4em] text-[9px] md:text-[11px] uppercase">
                            Par les jeunes <span className="mx-2 text-white/30">|</span> Pour les jeunes
                        </p>

                        {/* Barre horizontale inférieure */}
                        <div className="w-24 md:w-32 h-px bg-linear-to-r from-transparent via-amber-500 to-transparent mt-3"></div>
                    </div>
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-200 to-amber-600 italic">Prodiges</span>
                </h1>



                {/* Slogan ou séparateur subtil (optionnel, réduit ici) */}
                <div className="w-12 h-0.5 bg-amber-500/50 mx-auto mb-6"></div>

                {/* Boutons plus compacts */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
                    <button className="bg-amber-600 text-black px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-lg">
                        <a href="/register">Rejoins-nous</a>
                    </button>
                    <button className="border border-white/40 text-white backdrop-blur-sm px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                        <a href="/dons">Faire un don</a>
                    </button>
                </div>

                {/* Indicateurs remontés à l'intérieur de la vue */}
                <div className="flex justify-center gap-2 mt-8">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`h-1 transition-all duration-500 ${index === currentSlide ? 'w-10 bg-amber-500' : 'w-3 bg-white/30'
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Icône de scroll  */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 animate-bounce opacity-50">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7-7-7" />
                </svg>
            </div>
        </section>
    );
};

const CountdownSection = () => {
    const now = new Date();
    const next = new Date();
    next.setDate(now.getDate() + ((7 - now.getDay()) > 0 ? (7 - now.getDay()) : 0))
    next.setHours(15, 29, 0);
    const left = next - now;

    const [timeLeft, setTimeLeft] = useState({
        days: Math.floor(left / (1000 * 60 * 60 * 24)),
        hours: Math.floor((left / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((left / (1000 * 60)) % 60),
        seconds: Math.floor((left / 1000) % 60)
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let { days, hours, minutes, seconds } = prev;

                if (seconds > 0) {
                    seconds--;
                } else {
                    seconds = 59;
                    if (minutes > 0) {
                        minutes--;
                    } else {
                        minutes = 59;
                        if (hours > 0) {
                            hours--;
                        } else {
                            hours = 23;
                            if (days > 0) {
                                days--;
                            }
                        }
                    }
                }
                return { days, hours, minutes, seconds };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    const formatNumber = (num) => num.toString().padStart(2, '0');
    return (
        <section className="h-100 py-16 bg-linear-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20 w-60 h-60 bg-white/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-80 h-80 bg-gray-300/40 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gray-200/30 rounded-full blur-3xl animate-pulse"></div>
            </div>

            <div className="relative z-10 text-center space-y-6">
                <div className="space-y-3">
                    <h1 className="text-3xl md:text-4xl font-black text-gray-700 tracking-tight">
                        PROCHAIN CULTE DE L'EJP
                    </h1>
                    <p className="text-base md:text-lg text-gray-600 font-light tracking-wide">
                        CULTE DE L'ÉGLISE DES JEUNES PRODIGES PORTO
                    </p>
                </div>

                <div className="flex gap-3 md:gap-4 justify-center">
                    <div className="bg-white/60 backdrop-blur-md border border-gray-300/30 rounded-xl p-4 md:p-5 min-w-20 md:min-w-[90px] shadow-xl">
                        <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                            {formatNumber(timeLeft.days)}
                        </div>
                        <div className="text-xs text-gray-600 uppercase tracking-wider">Jours</div>
                    </div>

                    <div className="bg-white/60 backdrop-blur-md border border-gray-300/30 rounded-xl p-4 md:p-5 min-w-20 md:min-w-[90px] shadow-xl">
                        <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                            {formatNumber(timeLeft.hours)}
                        </div>
                        <div className="text-xs text-gray-600 uppercase tracking-wider">Heures</div>
                    </div>

                    <div className="bg-white/60 backdrop-blur-md border border-gray-300/30 rounded-xl p-4 md:p-5 min-w-20 md:min-w-[90px] shadow-xl">
                        <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                            {formatNumber(timeLeft.minutes)}
                        </div>
                        <div className="text-xs text-gray-600 uppercase tracking-wider">Minutes</div>
                    </div>

                    <div className="bg-white/60 backdrop-blur-md border border-gray-300/30 rounded-xl p-4 md:p-5 min-w-20 md:min-w-[90px] shadow-xl">
                        <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                            {formatNumber(timeLeft.seconds)}
                        </div>
                        <div className="text-xs text-gray-600 uppercase tracking-wider">Secondes</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// --- COMPOSANT CONTACT ---
const Contact = () => {
    return (
        <div className="relative">
            {/* Background subtil */}
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-amber-600/5 blur-[120px] rounded-full hidden md:block"></div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="text-center mb-16">
                    <span className="text-amber-500 font-black tracking-[0.4em] uppercase text-[10px]">Contact</span>
                    <h2 className="text-4xl md:text-5xl font-black text-white mt-4 tracking-tighter uppercase">
                        UNE <span className="text-amber-500 italic">QUESTION ?</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-16 items-start">
                    {/* Formulaire */}
                    <div className="space-y-6 bg-zinc-900/50 p-8 rounded-[2rem] border border-white/5 shadow-2xl">
                        {[
                            { label: "NOM", type: "text", placeholder: "Votre nom complet" },
                            { label: "EMAIL", type: "email", placeholder: "votre@email.com" }
                        ].map((field) => (
                            <div key={field.label}>
                                <label className="block text-gray-500 font-black mb-2 text-[10px] tracking-widest">{field.label}</label>
                                <input
                                    type={field.type}
                                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-amber-500 text-white transition-all duration-300"
                                    placeholder={field.placeholder}
                                />
                            </div>
                        ))}

                        <div>
                            <label className="block text-gray-500 font-black mb-2 text-[10px] tracking-widest">MESSAGE</label>
                            <textarea
                                className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-amber-500 text-white resize-none h-32 transition-all"
                                placeholder="Tapez votre message ici..."
                            ></textarea>
                        </div>

                        <button className="w-full bg-amber-600 hover:bg-white text-black font-black py-4 px-6 rounded-xl transition-all duration-500 tracking-widest text-[10px] uppercase">
                            ENVOYER LE MESSAGE
                        </button>
                    </div>

                    {/* Carte Citation / Bible */}
                    <div className="relative group h-full">
                        <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-amber-900 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                        <div className="relative bg-zinc-900 rounded-[2rem] overflow-hidden shadow-xl h-full flex flex-col justify-center p-12 border border-white/10">
                            <div className="text-center">
                                <span className="bg-amber-600/10 text-amber-500 px-4 py-1 rounded-full text-[10px] font-black tracking-widest mb-6 inline-block">
                                    LUC 14:23
                                </span>
                                <p className="text-2xl md:text-3xl leading-tight text-white font-bold italic mb-8 tracking-tighter">
                                    "Va dans les chemins et le long des haies, et ceux que tu trouveras, contrains-les d'entrer, afin que ma maison soit remplie."
                                </p>
                                <div className="w-12 h-1 bg-amber-600 mx-auto mb-6"></div>
                                <p className="text-gray-500 font-black text-[10px] tracking-[0.3em] uppercase">Église Jeunes Prodiges</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- TESTIMONIALS STYLE MINISTÈRE ---
const TestimonialSection = () => {
    const testimonials = [
        { name: "Audrey", title: "L'Église de mes rêves", text: "Je n'aurais pas pu rêver d'une meilleure église. Moi qui me sentais seule, je me sens tellement mieux maintenant à l'EJP !" },
        { name: "Owen", title: "J'aime mon église !", text: "Depuis que je suis à l'EJP, j'attends dimanche après dimanche avec impatience. Merci Seigneur pour Ta grâce." }
    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <section id="apropos" className="py-32 bg-zinc-950 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-20">
                    <Quote className="mx-auto text-amber-500/20 mb-6" size={60} />
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">Paroles de <span className="text-amber-500 italic">Prodiges</span></h2>
                </div>

                <div className="relative bg-zinc-900 border border-white/5 rounded-[3rem] p-12 md:p-24 overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/5 blur-[100px] rounded-full"></div>

                    <div className="relative z-10 text-center">
                        <h3 className="text-2xl md:text-4xl font-bold text-white mb-8 tracking-tight italic">"{testimonials[currentIndex].title}"</h3>
                        <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-12">
                            {testimonials[currentIndex].text}
                        </p>
                        <span className="text-amber-500 font-black uppercase tracking-[0.3em] text-xs">— {testimonials[currentIndex].name}</span>
                    </div>

                    <div className="flex justify-center gap-4 mt-12">
                        <button onClick={() => setCurrentIndex(0)} className={`w-12 h-1 bg-amber-600 transition-all ${currentIndex === 0 ? 'opacity-100' : 'opacity-20'}`} />
                        <button onClick={() => setCurrentIndex(1)} className={`w-12 h-1 bg-amber-600 transition-all ${currentIndex === 1 ? 'opacity-100' : 'opacity-20'}`} />
                    </div>
                </div>
            </div>
        </section>
    );
}

// --- PAGE D'ACCUEIL COMPLÈTE ---
const Index = () => {
    return (
        <div className="bg-black min-h-screen text-gray-400 font-sans selection:bg-amber-500/30">
            <Nav />

            <Banner />

            <CountdownSection />
            <VisionSection audioPath = {song} />
            {/* 3. TESTIMONIALS */}
            <TestimonialSection />

            {/* 4. PREMIERS PAS (Version Dark) */}
            <section id="premierpas" className="py-32 bg-zinc-950 border-y border-white/5">
                <div className="container mx-auto px-6 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tighter uppercase">MES PREMIERS PAS AVEC <span className="text-amber-500">JÉSUS</span></h2>
                        <p className="text-gray-400 text-lg font-light leading-relaxed mb-10">
                            Tu commences ta marche avec Jésus ? Laisse-nous t'accompagner pour bâtir des fondements solides pour ta nouvelle vie.
                        </p>
                        <button className="bg-white text-black px-12 py-5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-amber-500 transition-all shadow-xl">
                            <a href="/register">Inscris-toi maintenant</a>
                        </button>
                    </div>
                </div>
            </section>

            {/* 5. FAIRE UN DON (Style Immersif) */}
            <section className="relative py-40 overflow-hidden">
                <div className="absolute inset-0 bg-zinc-900/50"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none">
                    <div className="text-[25rem] font-black text-white transform rotate-[-10deg]">DONNER</div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
                    <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase">FAIRE UN <span className="text-amber-500">DON</span></h2>
                    <p className="text-xl text-gray-300 font-light mb-12 italic">"Dieu aime celui qui donne avec joie." (2 Cor 9:7)</p>
                    <button className="group border-2 border-white px-12 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all flex items-center gap-4 mx-auto">
                        <a href="/dons">SOUTENIR LA VISION</a> <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </button>
                </div>
            </section>

            {/* 6. CONTACT SECTION (Version Dark Intégrée) */}
            <section id="contact" className="py-32 bg-black">
                <Contact />
            </section>

            {/* 7. FOOTER HARMONISÉ */}
            <footer className="py-20 bg-zinc-950 border-t border-white/5">
                <Footer />
            </footer>
        </div>
    );
};


export default Index;
export { Contact };