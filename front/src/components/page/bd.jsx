const KumiEagles = () => {
    return (
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

const Predictions = () => {
    return (
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

// --- BANNER STYLE STAR ---
const Banner = () => {
    return (
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
            <div className="mb-8 flex justify-center">
                <div className="relative">
                    <div className="absolute inset-0 bg-amber-500/20 blur-2xl rounded-full"></div>
                    <img src={logo} alt="logo" className="relative w-28 h-28 rounded-full border-2 border-amber-500/30 p-1 shadow-2xl" />
                </div>
            </div>

            <span className="text-amber-500 font-bold tracking-[0.5em] uppercase text-[10px] mb-4 block">Porto-Novo, Bénin</span>
            <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter leading-none uppercase">
                Église Jeunes <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600 italic">Prodiges</span>
            </h1>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-12">
                <button className="bg-amber-600 text-black px-10 py-5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-amber-600/10">
                    Rejoins-nous cette semaine
                </button>
                <button className="border border-white/20 text-white px-10 py-5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                    Faire un don
                </button>
            </div>
        </div>
    );
};

// --- NAVIGATION HARMONISÉE ---
const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);

    const navLinks = [
        { name: 'Accueil', href: '/' },
        { name: 'À Propos', href: '#apropos' },
        { name: 'Événements', href: '/evenements' },
        { name: 'Ministères', href: '/ministeres' },
        { name: 'Galerie', href: '/galerie' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav className="bg-black/90 backdrop-blur-md border-b border-white/5 w-full z-50 transition-all">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo / Nom */}
                    <div className="flex items-center gap-3">
                        <h1 className="text-xl font-black text-white tracking-tighter uppercase">
                            EJP<span className="text-amber-500">.</span>PORTO
                        </h1>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map(link => (
                            <a key={link.name} href={link.href} className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-amber-500 transition-colors">
                                {link.name}
                            </a>
                        ))}

                        {/* Auth Dropdown */}
                        <div className="relative">
                            <button onClick={() => setIsAuthOpen(!isAuthOpen)} className="flex items-center gap-2 text-amber-500 text-[10px] font-black uppercase tracking-widest border border-amber-500/20 px-4 py-2 rounded-full hover:bg-amber-500 hover:text-black transition-all">
                                <User size={14} /> Compte
                            </button>
                            {isAuthOpen && (
                                <div className="absolute right-0 mt-4 w-48 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl py-2 z-50 animate-fade-in">
                                    <a href="#login" className="block px-6 py-3 text-xs text-white hover:bg-amber-600 hover:text-black transition-colors">Connexion</a>
                                    <a href="#signup" className="block px-6 py-3 text-xs text-white hover:bg-amber-600 hover:text-black transition-colors">S'inscrire</a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Toggle */}
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};

// --- MAIN INDEX ---
const Index = () => {
    return (
        <div className="bg-black min-h-screen text-gray-400">
            <Nav />

            {/* Hero Section */}
            <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
                <div className="absolute inset-0 bg-[url('/src/assets/images/immg.jpeg')] bg-cover bg-center">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black"></div>
                </div>
                <Banner />
                <div class="slide active" style="background-image: url('./images/fij1.jpeg')"></div>
            <div class="slide" style="background-image: url('./images/fij2.jpeg')"></div>
            <div class="slide" style="background-image: url('./images/fij3.jpeg')"></div>
            <div class="slide" style="background-image: url('./images/fij4.jpeg')"></div>
            </section>

            {/* Vision Section */}
            <section className="py-32 bg-black relative">
                <div className="container mx-auto px-6 text-center">
                    <div className="max-w-4xl mx-auto border-y border-white/5 py-20">
                        <h2 className="text-amber-500 font-black tracking-[0.4em] uppercase text-xs mb-8">Notre Vision</h2>
                        <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tighter uppercase mb-12">
                            " L’excellence par la <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Jeunesse</span>, de Porto Novo jusqu’aux extrémités de la Terre "
                        </h1>
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-1 bg-amber-600 mb-6"></div>
                            <p className="text-white font-bold tracking-widest uppercase text-[10px]">Berger Dimitri Dumas</p>
                            <p className="text-gray-500 text-[9px] uppercase tracking-widest mt-1">EJP Porto-Novo</p>
                        </div>
                    </div>
                </div>
            </section>

            <TestimonialSection />

            {/* Event Preview Section */}
            <section className="py-32 px-6">
                <div className="max-w-[1550px] mx-auto">
                    <div className="flex justify-between items-end mb-16">
                        <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Prochains <span className="text-amber-500 italic">Events</span></h2>
                        <a href="/evenements" className="text-amber-500 font-black text-[10px] uppercase tracking-widest border-b border-amber-500/30 pb-2 hover:border-amber-500 transition-all">Voir tout l'agenda</a>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[1, 2, 3].map(item => (
                            <div key={item} className="bg-zinc-900/50 border border-white/5 rounded-3xl p-8 hover:border-amber-500/50 transition-all group">
                                <div className="text-amber-500 font-black text-2xl mb-4 leading-none">15 <span className="text-xs block text-gray-500 uppercase">Nov.</span></div>
                                <h4 className="text-xl font-bold text-white mb-4 group-hover:text-amber-500 transition-colors">Célébration Spéciale Jeunesse</h4>
                                <p className="text-gray-500 text-sm mb-8 font-light">Un moment d'impact et de louange transformatrice au coeur de Porto-Novo.</p>
                                <button className="text-white font-black text-[9px] uppercase tracking-[0.2em] flex items-center gap-2 group-hover:gap-4 transition-all">En savoir plus <ChevronRight size={14} /></button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer simplifié intégré */}
            <footer className="py-20 bg-zinc-950 border-t border-white/5 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-600">© 2024 Église Jeunes Prodiges • Crafted for Excellence</p>
            </footer>
        </div>
    );
};