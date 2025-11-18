import React, { useState, useEffect, Component } from 'react';
import logo from "./assets/logo.jpeg";  
import { User, ChevronDown, ChevronUp } from 'lucide-react'

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    
    return (
        <nav className="navbar-dark">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20 relative">
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-all"
                        aria-label="Toggle navigation"
                    >
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <ul className="hidden lg:flex space-x-8">
                        <li><a href="/" className="nav-link">Accueil</a></li>
                        <li><a href="#apropos" className="nav-link">À Propos</a></li>
                        <li><a href="/evenements" className="nav-link">Événements</a></li>
                        <li><a href="#galerie" className="nav-link">Galerie</a></li>
                        <li><a href="#contact" className="nav-link">Contact</a></li>
                        <li><a href="/dons" className="nav-link">Faire un Don</a></li>
                        <li><a href="/Fij" className="nav-link">Rejoindre une FIJ</a></li>
                    </ul>

            {isMenuOpen && (
                <div className="lg:hidden absolute top-20 left-0 right-0 bg-black/70 backdrop-blur-sm border-b border-white/20 z-50">
                    <ul className="py-4 space-y-2 px-4">
                        <li><a href="/" className="block text-white hover:text-gray-300 py-4 px-4 font-medium rounded-lg hover:bg-white/5 transition-all text-base">Accueil</a></li>
                        <li><a href="#apropos" className="block text-white hover:text-gray-300 py-4 px-4 font-medium rounded-lg hover:bg-white/5 transition-all text-base">À Propos</a></li>
                        <li><a href="/evenements" className="block text-white hover:text-gray-300 py-4 px-4 font-medium rounded-lg hover:bg-white/5 transition-all text-base">Événements</a></li>
                        <li><a href="#galerie" className="block text-white hover:text-gray-300 py-4 px-4 font-medium rounded-lg hover:bg-white/5 transition-all text-base">Galerie</a></li>
                        <li><a href="#contact" className="block text-white hover:text-gray-300 py-4 px-4 font-medium rounded-lg hover:bg-white/5 transition-all text-base">Contact</a></li>
                        <li><a href="/Fij" className="block text-white hover:text-gray-300 py-4 px-4 font-medium rounded-lg hover:bg-white/5 transition-all text-base">Rejoindre une FIJ</a></li>
                        
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
                        <path d="m6 9 6 6 6-6"/>
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
            return { days, hours, minutes, seconds };});
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
                        CULTE DE L'ÉGLISE DES JEUNES PRODIGES DE LA CITÉ ROYALE
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

const Contact = ()=>{
    return (
        <div>
            <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-cover bg-center opacity-10 hidden md:block" 
                style={{backgroundImage: 'url("https://images.unsplash.com/photo-1544830291-4a3940477c7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80")'}}>
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
                    style={{backgroundImage: 'url("https://images.unsplash.com/photo-1544830291-4a3940477c7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80")'}}>
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


const Index = () =>{
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
                    MOUVEMENT JEUNES PRODIGES
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
                    " UNE ÉGLISE SUSCITÉE POUR ACCOMPLIR LE RÊVE DE DIEU "
                </h1>
                <p className="text-sm text-gray-500 mt-4">
                    Samuel EBOUMBOU<br/>
                    Berger de l'EJP Croissy
                </p>
                </div>
            </div>
            </div>
        </section>

        {/* Section - Témoignages */}
        <section id="apropos" className="py-16 bg-black">
            <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl p-8 shadow-2xl">
                {/* Témoignage 1 - Audrey */}
                <div className="testimonial-slide">
                    <p className="text-center text-gray-500 italic mb-2">Audrey</p>
                    <div className="text-center mb-4">
                    <span className="text-5xl text-black">"</span>
                    </div>
                    <h3 className="text-2xl font-bold text-black text-center mb-6">
                    L'Église de mes rêves
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-center">
                    Je n'aurais pas pu rêver d'une meilleure église, franchement, l'église de mes rêves. Moi qui me sentais seule et qui avais l'impression que Dieu m'avait abandonnée, je me sens tellement mieux maintenant que je suis à l'EJP ! Merci ma famille !
                    </p>
                </div>
                
                {/* Pagination dots */}
                <div className="flex justify-center gap-2 mt-8">
                    <div className="w-2 h-2 rounded-full bg-black"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                </div>
                </div>

                {/* Témoignage 2 - Owen (caché pour l'instant) */}
                <div className="bg-white rounded-xl p-8 shadow-2xl hidden">
                <p className="text-center text-gray-500 italic mb-2">Owen</p>
                <div className="text-center mb-4">
                    <span className="text-5xl text-black">"</span>
                </div>
                <h3 className="text-2xl font-bold text-black text-center mb-6">
                    J'aime tellement mon église !
                </h3>
                <p className="text-gray-700 leading-relaxed text-center">
                    Avant je pensais que j'allais aller à l'église quand je serais plus grand, mais Dieu en a décidé autrement. Honnêtement je n'aurai jamais imaginé vivre cette vie là et depuis que je suis à l'EJP j'attends dimanche après dimanche ! Merci Seigneur pour Ta grâce 🙏
                </p>
                </div>

                {/* Témoignage 3 - Joël (caché pour l'instant) */}
                <div className="bg-white rounded-xl p-8 shadow-2xl hidden">
                <p className="text-center text-gray-500 italic mb-2">Joël</p>
                <div className="text-center mb-4">
                    <span className="text-5xl text-black">"</span>
                </div>
                <h3 className="text-2xl font-bold text-black text-center mb-6">
                    Réponse à mes prières
                </h3>
                <p className="text-gray-700 leading-relaxed text-center">
                    Le MJP a été la réponse à ma prière. Je voulais une maison spirituelle où j'allais grandir avec Christ en étant libre d'exprimer mon amour pour Jésus. Le MJP a été et est l'une de mes plus grandes bénédictions !
                </p>
                </div>

                {/* Témoignage 4 - Stella (caché pour l'instant) */}
                <div className="bg-white rounded-xl p-8 shadow-2xl hidden">
                <p className="text-center text-gray-500 italic mb-2">Stella</p>
                <div className="text-center mb-4">
                    <span className="text-5xl text-black">"</span>
                </div>
                <h3 className="text-2xl font-bold text-black text-center mb-6">
                    Hâte d'être dimanche prochain
                </h3>
                <p className="text-gray-700 leading-relaxed text-center">
                    Chaque dimanche est une nouvelle occasion de grandir et de découvrir l'amour de Dieu. Cette communauté est vraiment exceptionnelle. Merci !
                </p>
                </div>
            </div>
            </div>
        </section>

        <section id="evenements" className="py-16 bg-white bg-opacity-70 backdrop-blur-sm text-black">
            <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Cultes à Venir de l'EJP </h2>
            <h3 className="text-2x1 font-bold text-center mb-6">Retrouve les derniers cultes de l’église des jeunes prodiges de l'Impact Centre Chrétien de PORTO-NOVO</h3>
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
                {[1,2,3,4,5,6,7,8].map(item => (
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
                    Lorsque tu donnes, fais-le en toute conscience et liberté,{' '}
                    <span className="font-semibold text-white">avec joie</span>,{' '}
                    <span className="font-semibold text-white">sans contrainte</span>, ni{' '}
                    <span className="font-semibold text-white">regret</span>{' '}
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

        <section id="contact" className="py-12 bg-white relative">
            <Contact />
        </section>
        
        <footer className="py-6 bg-linear-gradient-to-br from-gray-100 via-gray-200 to-gray-300 backdrop-blur-sm text-center relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-4 left-8 w-40 h-40 bg-white/30 rounded-full blur-2xl"></div>
            <div className="absolute bottom-4 right-8 w-48 h-48 bg-gray-300/40 rounded-full blur-2xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10 max-w-4xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 items-center">
                <div className="grid grid-cols-3 gap-3">
                <div className="text-center bg-white/60 backdrop-blur-md rounded-lg p-3 hover:shadow-md transition duration-300 border border-gray-300/30">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    </div>
                    <h4 className="font-bold text-gray-800 text-xs mb-1">Adresse</h4>
                    <p className="text-gray-600 text-xs">Votre adresse</p>
                </div>

                <div className="text-center bg-white/60 backdrop-blur-md rounded-lg p-3 hover:shadow-md transition duration-300 border border-gray-300/30">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    </div>
                    <h4 className="font-bold text-gray-800 text-xs mb-1">Email</h4>
                    <p className="text-gray-600 text-xs">email@example.com</p>
                </div>

                <div className="text-center bg-white/60 backdrop-blur-md rounded-lg p-3 hover:shadow-md transition duration-300 border border-gray-300/30">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    </div>
                    <h4 className="font-bold text-gray-800 text-xs mb-1">Téléphone</h4>
                    <p className="text-gray-600 text-xs">+229 XX XX XX XX</p>
                </div>
                </div>

                <div className="text-center">
                <p className="text-sm font-semibold mb-3">SUIVEZ-NOUS SUR NOS RESEAUX SOCIAUX</p>
                <div className="flex justify-center gap-3">
                    <a 
                    href="#" 
                    className="group bg-white/60 backdrop-blur-md border border-gray-300/30 rounded-full p-2 hover:bg-white/80 hover:scale-110 transition-all duration-300 shadow-sm"
                    aria-label="Facebook"
                    >
                    <svg className="w-4 h-4 text-gray-700 group-hover:text-blue-600 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    </a>

                    <a 
                    href="#" 
                    className="group bg-white/60 backdrop-blur-md border border-gray-300/30 rounded-full p-2 hover:bg-white/80 hover:scale-110 transition-all duration-300 shadow-sm"
                    aria-label="Instagram"
                    >
                    <svg className="w-4 h-4 text-gray-700 group-hover:text-pink-600 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    </a>

                    <a 
                    href="#" 
                    className="group bg-white/60 backdrop-blur-md border border-gray-300/30 rounded-full p-2 hover:bg-white/80 hover:scale-110 transition-all duration-300 shadow-sm"
                    aria-label="YouTube"
                    >
                    <svg className="w-4 h-4 text-gray-700 group-hover:text-red-600 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    </a>
                </div>
                </div>
            </div>

            <div className="w-32 h-px bg-linear-gradient-to-r from-transparent via-gray-500/50 to-transparent mx-auto mb-4"></div>

            <p className="text-gray-600 text-xs font-medium">
                &copy; 2025 Église Jeunes Prodiges. Tous droits réservés.
            </p>
            </div>
        </footer>

        </div>
    )
}

export default Index;
export {Nav, Contact};
