import React, { useState, useEffect, Component } from 'react';
import logo from "./assets/logo.jpeg";
import banner from "./assets/immg.jpeg";
import unesœur from "./assets/unesœur.webp";
import unfrère from "./assets/unfrère.webp";
import { User, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react'

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);

    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <nav className="navbar-dark">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20 relative">

                    {/* MENU BURGER MOBILE */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-all"
                        aria-label="Toggle navigation"
                    >
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    {/* MENU PC */}
                    <div className="hidden lg:flex items-center justify-center flex-1">
                        <ul className="flex items-center gap-2">
                            <li><a href="/" className="nav-link">Accueil</a></li>
                            <li><a href="#apropos" className="nav-link">À Propos</a></li>
                            <li><a href="/evenements" className="nav-link">Événements</a></li>
                            <li><a href="#galerie" className="nav-link">Galerie</a></li>
                            <li><a href="#contact" className="nav-link">Contact</a></li>
                            <li><a href="/don" className="nav-link">Faire un Don</a></li>
                            <li><a href="/Fij" className="nav-link">Rejoindre une FIJ</a></li>

                            <li className="relative">
                                <button
                                    onClick={() => setIsAuthOpen(!isAuthOpen)}
                                    className="nav-link flex items-center gap-1.5"
                                >
                                    <User className="w-3.5 h-3.5" />
                                    <span>Mon Compte</span>
                                    {isAuthOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                </button>

                                {isAuthOpen && (
                                    <div className="absolute right-0 mt-2 w-44 bg-black/90 backdrop-blur-sm rounded-lg shadow-xl py-2 z-50 border border-white/20">
                                        <a href="#inscription" className="block px-4 py-2.5 text-sm text-white hover:text-gray-300 hover:bg-white/10 transition-colors">
                                            S'inscrire
                                        </a>
                                        <a href="#connexion" className="block px-4 py-2.5 text-sm text-white hover:text-gray-300 hover:bg-white/10 transition-colors">
                                            Se connecter
                                        </a>
                                    </div>
                                )}
                            </li>
                        </ul>
                    </div>

                    {/* MENU MOBILE */}
                    {isMenuOpen && (
                        <div className="lg:hidden absolute top-20 left-0 right-0 bg-black/70 backdrop-blur-sm border-b border-white/20 z-50">
                            <ul className="py-4 space-y-2 px-4">
                                <li><a href="/" className="block text-white hover:text-gray-300 py-4 px-4 font-medium rounded-lg hover:bg-white/5 transition-all text-base">Accueil</a></li>
                                <li><a href="#apropos" className="block text-white hover:text-gray-300 py-4 px-4 font-medium rounded-lg hover:bg-white/5 transition-all text-base">À Propos</a></li>
                                <li><a href="/evenements" className="block text-white hover:text-gray-300 py-4 px-4 font-medium rounded-lg hover:bg-white/5 transition-all text-base">Événements</a></li>
                                <li><a href="#galerie" className="block text-white hover:text-gray-300 py-4 px-4 font-medium rounded-lg hover:bg-white/5 transition-all text-base">Galerie</a></li>
                                <li><a href="#contact" className="block text-white hover:text-gray-300 py-4 px-4 font-medium rounded-lg hover:bg-white/5 transition-all text-base">Contact</a></li>
                                <li><a href="/Fij" className="block text-white hover:text-gray-300 py-4 px-4 font-medium rounded-lg hover:bg-white/5 transition-all text-base">Rejoindre une FIJ</a></li>
                                <li><a href="/don" className="block text-white hover:text-gray-300 py-4 px-4 font-medium rounded-lg hover:bg-white/5 transition-all text-base">Faire un Don</a></li>

                                <li className="border-t border-white/20 pt-4 mt-4">
                                    <button
                                        onClick={() => setIsAuthOpen(!isAuthOpen)}
                                        className="w-full flex items-center justify-between text-white hover:text-gray-300 hover:bg-white/5 py-4 px-4 font-medium rounded-lg transition-all"
                                    >
                                        <div className="flex items-center gap-3">
                                            <User className="w-5 h-5" />
                                            <span className="text-base">Mon Compte</span>
                                        </div>
                                        {isAuthOpen ? (
                                            <ChevronUp className="w-5 h-5" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5" />
                                        )}
                                    </button>

                                    {isAuthOpen && (
                                        <div className="mt-2 ml-4 space-y-2">
                                            <a href="#inscription" className="block text-gray-300 hover:text-white py-3 pl-4 border-l-2 border-white/30 hover:border-white transition-colors text-base">
                                                S'inscrire
                                            </a>
                                            <a href="#connexion" className="block text-gray-300 hover:text-white py-3 pl-4 border-l-2 border-white/30 hover:border-white transition-colors text-base">
                                                Se connecter
                                            </a>
                                        </div>
                                    )}
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};
const Banner = () => {
    return (
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mt-6">
            <div className="mb-4">
                <div className="flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                        <img src={logo} alt="logo" className="w-16 h-16 rounded-full" />
                    </div>
                </div>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tighter">EGLISE JEUNES PRODIGES</h1>
            <div className="border-t border-b border-white/30 py-3 mb-6">
                <p className="text-lg md:text-xl text-white font-medium tracking-wide">POUR LES JEUNES, PAR LES JEUNES</p>
            </div>
            <div className="flex flex-col gap-3 justify-center items-center mb-12">
                <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-6 py-2 text-base font-medium transition-all duration-300 min-w-60">Rejoins nous cette semaine</button>
                <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-6 py-2 text-base font-medium transition-all duration-300 min-w-60">Regarder nos cultes en ligne</button>
            </div>
            <div className="absolute -bottom-1/12 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="flex flex-col items-center text-white">
                    <span className="text-sm mb-2">Défiler vers le bas</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

const CountdownSection = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 5,
        hours: 4,
        minutes: 23,
        seconds: 26
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
        <section className="py-16 bg-linear-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex flex-col items-center justify-center relative overflow-hidden">
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
                        CULTE DE L'ÉGLISE DES JEUNES PRODIGES ICC PORTO
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

const Contact = () => {
    return (
        <div>
            <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-cover bg-center opacity-10 hidden md:block"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1544830291-4a3940477c7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80")' }}>
            </div>

            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                    UNE QUESTION ?
                </h2>

                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2 text-base">
                                NOM
                            </label>
                            <input
                                type="text"
                                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 text-gray-800 placeholder-gray-400 transition duration-300"
                                placeholder="Votre nom complet"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-2 text-base">
                                EMAIL
                            </label>
                            <input
                                type="email"
                                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 text-gray-800 placeholder-gray-400 transition duration-300"
                                placeholder="Votre adresse email"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-2 text-base">
                                ÉCRIVEZ VOTRE MESSAGE
                            </label>
                            <textarea
                                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 text-gray-800 placeholder-gray-400 resize-none transition duration-300"
                                rows="5"
                                placeholder="Tapez votre message ici..."
                            ></textarea>
                        </div>

                        <button className="w-full bg-gray-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 shadow-md">
                            ENVOYER VOTRE MESSAGE
                        </button>
                    </div>

                    <div className="relative">
                        <div className="bg-cover bg-center rounded-xl overflow-hidden shadow-lg h-full min-h-[400px]"
                            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1544830291-4a3940477c7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80")' }}>
                            <div className="absolute inset-0 bg-black bg-opacity-40"></div>

                            <div className="relative z-10 p-6 h-full flex flex-col justify-center text-black">
                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-bold mb-3 bg-white bg-opacity-20 inline-block px-5 py-1 rounded-full">
                                        LUC 14V23
                                    </h3>
                                    <div className="w-20 h-1 bg-yellow-400 mx-auto mt-3"></div>
                                </div>

                                <p className="text-lg leading-relaxed text-center font-medium mb-6 text-white drop-shadow-lg">
                                    "ET LE MAÎTRE DIT AU SERVITEUR: VA DANS LES CHEMINS ET LE LONG DES HAIES,
                                    ET CEUX QUE TU TROUVERAS, CONTRAINS-LES D'ENTRER, AFIN QUE MA MAISON SOIT REMPLIE."
                                </p>

                                <div className="mt-6 text-center">
                                    <div className="w-14 h-14 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                                        <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                    <p className="text-white font-semibold text-base">
                                        Église Jeunes Prodiges
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


const TestimonialSection = () => {
    const testimonials = [
        {
            name: "Audrey",
            title: "L'Église de mes rêves",
            text: "Je n'aurais pas pu rêver d'une meilleure église, franchement, l'église de mes rêves. Moi qui me sentais seule et qui avais l'impression que Dieu m'avait abandonnée, je me sens tellement mieux maintenant que je suis à l'EJP ! Merci ma famille !"
        },
        {
            name: "Owen",
            title: "J'aime tellement mon église !",
            text: "Avant je pensais que j'allais aller à l'église quand je serais plus grand, mais Dieu en a décidé autrement. Honnêtement je n'aurai jamais imaginé vivre cette vie là et depuis que je suis à l'EJP j'attends dimanche après dimanche ! Merci Seigneur pour Ta grâce 🙏"
        },
        {
            name: "Joël",
            title: "Réponse à mes prières",
            text: "Le MJP a été la réponse à ma prière. Je voulais une maison spirituelle où j'allais grandir avec Christ en étant libre d'exprimer mon amour pour Jésus. Le MJP a été et est l'une de mes plus grandes bénédictions !"
        },
        {
            name: "Stella",
            title: "Hâte d'être dimanche prochain",
            text: "Chaque dimanche est une nouvelle occasion de grandir et de découvrir l'amour de Dieu. Cette communauté est vraiment exceptionnelle. Merci !"
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <section id="apropos" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto relative">

                    {/* Flèche gauche - ÉLOIGNÉE */}
                    <button
                        onClick={goToPrevious}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 md:-translate-x-16 z-10 bg-white hover:bg-gray-100 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
                        aria-label="Témoignage précédent"
                    >
                        <ChevronLeft className="w-6 h-6 text-gray-700" />
                    </button>

                    {/* Contenu du carousel */}
                    <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl overflow-hidden">
                        <div className="relative min-h-[300px] flex items-center justify-center">
                            {testimonials.map((testimonial, index) => (
                                <div
                                    key={index}
                                    className={`absolute inset-0 transition-all duration-500 ease-in-out ${index === currentIndex
                                            ? 'opacity-100 translate-x-0'
                                            : index < currentIndex
                                                ? 'opacity-0 -translate-x-full'
                                                : 'opacity-0 translate-x-full'
                                        }`}
                                >
                                    <div className="flex flex-col items-center justify-center h-full">
                                        <p className="text-center text-gray-500 italic mb-4 text-lg">
                                            {testimonial.name}
                                        </p>

                                        <div className="text-center mb-6">
                                            <span className="text-6xl text-gray-800">"</span>
                                        </div>

                                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-6">
                                            {testimonial.title}
                                        </h3>

                                        <p className="text-gray-700 leading-relaxed text-center text-base md:text-lg max-w-3xl">
                                            {testimonial.text}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination dots */}
                        <div className="flex justify-center gap-2 mt-8">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentIndex
                                            ? 'bg-gray-900 w-8'
                                            : 'bg-gray-300 hover:bg-gray-400'
                                        }`}
                                    aria-label={`Aller au témoignage ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Flèche droite - ÉLOIGNÉE */}
                    <button
                        onClick={goToNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 md:translate-x-16 z-10 bg-white hover:bg-gray-100 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
                        aria-label="Témoignage suivant"
                    >
                        <ChevronRight className="w-6 h-6 text-gray-700" />
                    </button>
                </div>
            </div>
        </section>
    );
}

const KumiEagles = ()=>{
    return(
        <section className="grid grid-cols-1 lg:grid-cols-2">
            {/* Section KUMI - Gauche */}
                <div className="relative min-h-[600px] lg:min-h-[700px] bg-gray-300 flex flex-col items-center justify-between py-12 px-8">
                    {/* Titre */}
                    <div className="text-center mb-8">
                        <h2 className="text-4xl md:text-3xl lg:text-5xl font-bold text-white leading-tight drop-shadow-lg">
                            TU ES UNE SŒUR ?<br />
                            REJOINS LES KUMI !
                        </h2>
                    </div>

                    {/* Image */}
                    <div className="flex-1 w-full max-w-2xl mb-8">
                        <img
                            src={unesœur}
                            alt="Les Kumi"
                            className="w-full h-full object-cover rounded-lg shadow-2xl"
                        />
                    </div>

                    {/* Bouton */}
                    <button className="px-8 py-4 border-2 border-white text-white rounded-md hover:bg-white hover:text-[#1e3a8a] transition-all duration-300 font-medium text-lg flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                        Rejoindre ici
                    </button><br />
                    <h2 className="text-2xl md:text-2xl lg:text-2xl font-bold text-gray-600 leading-tight drop-shadow-lg">
                        Kumi – du grec « lève-toi » est la plateforme des soeurs de l'EJP Croissy
                    </h2>
                </div>

                {/* Section EAGLES - Droite */}
                <div className="relative min-h-[600px] lg:min-h-[700px] bg-gray-300 flex flex-col items-center justify-between py-12 px-8">
                    {/* Titre */}
                    <div className="text-center mb-8">
                        <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-white leading-tight drop-shadow-lg">
                            TU ES UN FRÈRE ?<br />
                            REJOINS LES EAGLES !
                        </h2>
                    </div>

                    {/* Image */}
                    <div className="flex-1 w-full max-w-2xl mb-8">
                        <img
                            src={unfrère}
                            alt="Les Eagles"
                            className="w-full h-full object-cover rounded-lg shadow-2xl"
                        />
                    </div>

                    {/* Bouton */}
                    <button className="px-8 py-4 border-2 border-white text-white rounded-md hover:bg-white hover:text-[#581c87] transition-all duration-300 font-medium text-lg flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                        Rejoindre ici
                    </button><br />
                    <h2 className="text-2xl md:text-2xl lg:text-2x1 font-bold text-gray-600 leading-tight drop-shadow-lg">
                        Eagles – de l'anglais « aigle » est la plateforme des jeunes hommes de l'EJP Croissy
                    </h2>
                </div>
        </section>
    )
}

const Predictions= ()=>{
    return(
        <section
            className="relative w-full h-screen flex flex-col items-center justify-center text-white"
            style={{
                backgroundImage:
                "url('src/assets/predictions.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
            >
            {/* Overlay */}
                <div className="absolute inset-0 bg-black/50"></div>

                <div className="relative z-10 flex flex-col items-center px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-wider">
                        PRÉDICATIONS
                    </h2>

                    <p className="mt-2 text-sm md:text-base opacity-80">
                        Retrouve toutes les prédications de notre berger sur Spotify
                    </p>



                    {/* Spotify button */}
                    <a
                        href="#"
                        className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-full shadow-lg hover:bg-gray-200 transition"
                    >
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg"
                            className="w-5 h-5"
                            alt="spotify"
                        />
                        Spotify
                    </a>
                </div>
        </section>
    )
}

const Index = () => {
    return (
        <div className="font-['Inter','Segoe_UI',sans-serif]">
            <section className="min-h-screen">
                <header className="fixed top-0 right-0 left-0 z-50">
                    <Nav />
                </header>
                <main>
                    <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
                        <div className="absolute banner inset-0 bg-cover bg-center">
                            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
                        </div>
                        <Banner />
                    </section>
                    <CountdownSection />
                </main>
            </section>
            {/* Trait de séparation */}
            <div className="w-full bg-white py-0">
                <div className="container mx-auto px-4">
                    <div className="w-full h-px bg-black"></div>
                </div>
            </div>

            {/* Section blanche - Notre Vision */}
            <section className="py-6 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center space-y-4">
                        <div className="space-y-1">
                            <h2 className="text-2xl md:text-3xl font-bold text-black">
                                EGLISE JEUNES PRODIGES
                            </h2>
                            <p className="text-base text-gray-700">IMPACT CENTRE CHRETIEN DE PORTO-NOVO</p>
                        </div>

                        <div className="w-24 h-px bg-linear-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto"></div>

                        <button className="bg-black hover:bg-gray-800 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg">
                            Notre vision détaillée
                        </button>

                        {/* Citation après le bouton */}
                        <div className="pt-8">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-black leading-tight">
                                " L’excellence par la Jeunesse, de Porto Novo jusqu’aux extrémités de la Terre "
                            </h1>
                            <p className="text-sm text-gray-500 mt-4">
                                <br />
                                Berger de l'EJP Porto
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section - Témoignages */}
            <TestimonialSection />

            <section id="evenements" className="py-16 bg-white bg-opacity-70 backdrop-blur-sm text-black">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">Evènements à Venir de l'EJP </h2>
                    <h3 className="text-2x1 font-bold text-center mb-6">Retrouve les derniers cultes de l'église des jeunes prodiges ICC PORTO-NOVO</h3>
                    <div className="grid md:grid-cols-3 gap-5">
                        {[1, 2, 3,].map(item => (
                            <div key={item} className="bg-[#0a0a0a] rounded-lg overflow-hidden hover:scale-105 transition border border-[#222]">
                                <div className="bg-[#111] h-40 flex items-center justify-center">
                                    <span className="text-[#aaa]">Image {item}</span>
                                </div>
                                <div className="p-5">
                                    <h5 className="text-lg font-bold mb-2">Événement {item}</h5>
                                    <p className="text-[#aaa] text-sm mb-2">Date: 15 Novembre 2025</p>
                                    <p className="text-[#ccc] leading-relaxed mb-3">
                                        Description de l'événement ici. Un aperçu rapide de ce qui va se passer.
                                    </p>
                                    <button className="bg-white hover:bg-[#ddd] text-black px-5 py-2 rounded-lg transition font-semibold">
                                        En savoir plus
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="premierpas" className="py-16 bg-gray-200 bg-opacity-70 backdrop-blur-sm text-gray-700">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-center mb-8">MES PREMIERS PAS AVEC JESUS</h2>
                    <h3 className="text-2xl font-bold text-center mb-6">
                        Tu commences ta marche avec Jésus et tu veux être guidé et bâti dans tes premiers pas avec Lui ou tu veux revoir certains fondements de la foi ? Rejoins la formation : « Mes premiers pas avec Jésus »
                    </h3>
                    <div className="flex justify-center">
                        <button className="bg-white hover:bg-[#ddd] text-black px-5 py-2 rounded-lg transition font-semibold">
                            Inscris-toi
                        </button>
                    </div>
                </div>
            </section>

            <div className="w-full bg-white py-0">
                <div className="container mx-auto px-4">
                    <div className="w-full h-px bg-black"></div>
                </div>
            </div>

            <section id="galerie" className="py-16 bg-gray-200 bg-opacity-70 backdrop-blur-sm text-gray-650">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">Galerie</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(item => (
                            <div key={item} className="bg-[#111] h-40 flex items-center justify-center rounded hover:opacity-75 transition border border-[#222]">
                                <span className="text-[#aaa]">Photo {item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative min-h-screen bg-linear-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center px-6 py-20 overflow-hidden">
                {/* Background overlay with darker pattern */}
                <div className="absolute inset-0 bg-black/70"></div>

                {/* Decorative watermark - maintained visibility */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 select-none pointer-events-none">
                    <div className="text-[20rem] font-bold text-white transform rotate-[-15deg] whitespace-nowrap">
                        JESUS
                    </div>
                </div>

                {/* Content container */}
                <div className="relative z-10 max-w-5xl mx-auto text-center text-white space-y-8">
                    {/* Title */}
                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-6xl font-bold tracking-wide">
                            FAIRE UN DON
                        </h1>
                        <div className="w-32 h-1 bg-white mx-auto"></div>
                    </div>

                    {/* Subtitle */}
                    <p className="text-xl md:text-2xl text-gray-300 font-light">
                        Merci beaucoup pour ton désir de soutenir la vision de l'EJP.
                    </p>

                    {/* Main message */}
                    <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-4xl mx-auto">
                        C'est l'opportunité de contribuer à répandre l'Évangile à travers le monde et à transformer des vies.
                    </p>

                    {/* Bible verse */}
                    <div className="text-base md:text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto py-4">
                        Que chacun donne comme il l'a résolu en son cœur, sans <span className="font-semibold text-white"> tristesse</span> ni{' '}  
                        <span className="font-semibold text-white">contrainte</span> {' '}; car Dieu aime celui qui donne{' '}
                        <span className="font-semibold text-white">avec joie</span>.{' '}<br />
                        <span className="text-gray-400 italic">(2 Corinthiens 9:7)</span>
                    </div>

                    {/* Description */}
                    <p className="text-base md:text-lg text-gray-200 leading-relaxed max-w-4xl mx-auto pt-4">
                        Par ton soutien occasionnel ou régulier, tu contribues de manière significative à impacter les vies et à ramener les cœurs vers Dieu en nous aidant à{' '}
                        <span className="font-semibold text-white">diffuser la bonne nouvelle du Royaume de Dieu.</span>
                    </p>

                    {/* Notice */}
                    <p className="text-sm md:text-base text-gray-400 italic">
                        Aucuns biens ou services ne seront fournis en échange de ta contribution.
                    </p>

                    {/* Blessing */}
                    <p className="text-2xl md:text-3xl font-semibold text-white pt-6">
                        Sois béni(e) !
                    </p>

                    {/* CTA Button */}
                    <div className="pt-8">
                        <button className="group relative inline-flex items-center gap-3 px-8 py-4 text-lg font-medium text-white border-2 border-white hover:bg-white hover:text-gray-900 transition-all duration-300 ease-in-out">
                            <span>Faire un don</span>
                            <svg
                                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={banner}
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-gradient-to-br from-black/40 via-black/30 to-black/50"></div>
                </div>
                {/* Content */}
                <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-20">
                    <h3 className="text-4xl sm:text-3xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
                        REJOINDRE UNE FAMILLE D'IMPACT JEUNES
                    </h3>

                    {/* Decorative golden line */}
                    <div className="w-24 sm:w-32 h-1 bg-amber-600 mx-auto mb-12"></div>

                    <p className="text-xl sm:text-2xl md:text-3xl text-white mb-8 font-light">
                        Les FIJ sont des cellules de l'Église des Jeunes Prodiges.
                    </p>

                    <p className="text-base sm:text-lg md:text-xl text-white mb-16 max-w-5xl mx-auto leading-relaxed px-4">
                        Les Jeunes de l'église se réunissent <span className="font-bold">tous les mardis de 19h15 à 20h30</span> dans les maisons hôtes pour s'édifier et influencer leurs villes avec les valeurs de Christ. (Actes 5:42)
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4">
                        <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 font-medium text-base sm:text-lg shadow-lg hover:shadow-xl">
                            <a href="/Fij#fijgird">Rejoindre une FIJ</a>
                        </button>

                        <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-amber-600 rounded-full hover:bg-amber-50 transition-all duration-300 font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl">
                            Ouvrir ma maison
                        </button>

                        <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-amber-600 text-white rounded-full hover:bg-amber-600 transition-all duration-300 font-medium text-base sm:text-lg shadow-lg hover:shadow-xl">
                            <a href="/Fij">Carte des FIJ</a>
                        </button>
                    </div>
                </div>
            </section>

            <section id="nosministères" className="py-16 bg-gray-100 bg-opacity-70 backdrop-blur-sm text-gray-700">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-center mb-8">NOS MINISTÈRES</h2>
                    <h3 className="text-2xl font-bold text-center mb-6">
                        Tu retrouveras ici la liste de tous nos ministères, à toi de choisir
                    </h3>
                    <div className="flex justify-center">
                        <button className="bg-white hover:bg-[#ddd] text-black px-5 py-2 rounded-lg transition font-semibold">
                            Voir les ministères
                        </button>
                    </div>
                </div>
            </section>
            <br />

            {/* Trait de séparation */}
            <div className="w-full bg-white py-0">
                <div className="container mx-auto px-4">
                    <div className="w-full h-px bg-black"></div>
                </div>
            </div>

            <br />

            <section id="contact" className="py-12 bg-white relative">
                <Contact />
            </section>
            <footer className="py-8 bg-gray-900 text-white border-t border-gray-700">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Section principale */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

                        {/* Colonne 1: Logo et description */}
                        <div className="text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start mb-3">
                                <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mr-3">
                                    <img src={logo} alt="Logo EJP" className="w-10 h-10 rounded-full" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">EJP</h3>
                                    <p className="text-amber-400 text-xs">Église Jeunes Prodiges</p>
                                </div>
                            </div>
                            <p className="text-gray-300 text-xs">
                                Une église suscitée pour accomplir le rêve de Dieu
                            </p>
                        </div>

                        {/* Colonne 2: Contact */}
                        <div className="text-center md:text-left">
                            <h4 className="text-base font-semibold text-white mb-3 border-b border-amber-400 pb-1 inline-block">
                                CONTACT
                            </h4>
                            <div className="space-y-2">
                                <div className="flex items-center justify-center md:justify-start text-gray-300">
                                    <svg className="w-4 h-4 mr-2 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    </svg>
                                    <div className="text-left">
                                        <p className="text-xs">21 Rue des Vieilles vignes</p>
                                        <p className="text-xs">Croissy Beaubourg, 77183</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center md:justify-start text-gray-300">
                                    <svg className="w-4 h-4 mr-2 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <p className="text-xs">contact@eglisedesjeunesprodiges.com</p>
                                </div>
                            </div>
                        </div>

                        {/* Colonne 3: Liens rapides */}
                        <div className="text-center md:text-left">
                            <h4 className="text-base font-semibold text-white mb-3 border-b border-amber-400 pb-1 inline-block">
                                LIENS RAPIDES
                            </h4>
                            <div className="grid grid-cols-2 gap-1">
                                <a href="/" className="text-gray-300 hover:text-amber-400 transition-colors text-xs block py-1 text-left">Accueil</a>
                                <a href="#apropos" className="text-gray-300 hover:text-amber-400 transition-colors text-xs block py-1 text-left">À Propos</a>
                                <a href="/evenements" className="text-gray-300 hover:text-amber-400 transition-colors text-xs block py-1 text-left">Événements</a>
                                <a href="#galerie" className="text-gray-300 hover:text-amber-400 transition-colors text-xs block py-1 text-left">Galerie</a>
                                <a href="/don" className="text-gray-300 hover:text-amber-400 transition-colors text-xs block py-1 text-left">Faire un Don</a>
                                <a href="/Fij" className="text-gray-300 hover:text-amber-400 transition-colors text-xs block py-1 text-left">Rejoindre une FIJ</a>
                            </div>
                        </div>

                        {/* Colonne 4: Réseaux sociaux */}
                        <div className="text-center md:text-left">
                            <h4 className="text-base font-semibold text-white mb-3 border-b border-amber-400 pb-1 inline-block">
                                SUIVEZ-NOUS
                            </h4>
                            <p className="text-gray-300 text-xs mb-3">
                                Rejoignez notre communauté en ligne
                            </p>
                            <div className="flex justify-center md:justify-start gap-2">
                                <a href="https://www.facebook.com/JeunesICCPortoNovo"
                                    className="bg-gray-800 hover:bg-blue-600 text-white p-2 rounded-lg transition-all duration-300 hover:scale-110"
                                    aria-label="Facebook">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </a>

                                <a href="https://www.instagram.com/ejp_portonovo"
                                    className="bg-gray-800 hover:bg-pink-600 text-white p-2 rounded-lg transition-all duration-300 hover:scale-110"
                                    aria-label="Instagram">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </a>

                                <a href="https://youtube.com/@ejp_porto-novo"
                                    className="bg-gray-800 hover:bg-red-600 text-white p-2 rounded-lg transition-all duration-300 hover:scale-110"
                                    aria-label="YouTube">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                </a>

                                <a href="https://wa.me/2290149121209"
                                    className="bg-gray-800 hover:bg-green-600 text-white p-2 rounded-lg transition-all duration-300 hover:scale-110"
                                    aria-label="WhatsApp">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Ligne de séparation */}
                    <div className="border-t border-gray-700 my-6"></div>

                    {/* Copyright */}
                    <div className="text-center">
                        <p className="text-gray-400 text-xs">
                            © 2025 Église des Jeunes Prodiges - Tous droits réservés
                        </p>
                        <div className="flex justify-center gap-4 mt-2">
                            <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors text-xs">Mentions légales</a>
                            <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors text-xs">Confidentialité</a>
                            <a href="#contact" className="text-gray-400 hover:text-amber-400 transition-colors text-xs">Contact</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Index;
export { Nav, Contact };