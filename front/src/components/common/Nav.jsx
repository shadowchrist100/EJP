import { useState, useContext } from "react";
import { User, ChevronDown, X, LogOut, Settings } from 'lucide-react'
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext"; 

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const { user, logout, is_loading } = useContext(AuthContext);

    const navLinks = [
        { name: 'Accueil', href: '/' },
        { name: 'Événements', href: '/evenements' },
        { name: 'Ministères', href: '/ministeres' },
        { name: 'Rejoindre une FIJ', href: '/fij' },
        { name: 'Priere du Salut', href: '/salvation' },
        { name: 'Galerie', href: '/galerie' },
        { name: 'Contact', href: '#contact' },
        { name: 'Faire un Don', href: '/dons' }
    ];

    // Lien ArtProdige uniquement si connecté
    const displayNavLinks = [{ name: 'ArtProdige', href: '/artprodige', special: true }, ...navLinks] ;

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const handleLogout = async () => {
        try {
            await logout();
            closeMenu();
            setIsAuthOpen(false);
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error);
        }
    };

    // Fonction pour obtenir les initiales de l'utilisateur
    const getInitials = (name) => {
        if (!name) return "?";
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    // Fonction pour obtenir la couleur de l'avatar
    const getAvatarColor = (name) => {
        if (!name) return 'bg-gray-500';
        const colors = [
            'bg-gradient-to-br from-amber-400 to-amber-600',
            'bg-gradient-to-br from-yellow-400 to-yellow-600',
            'bg-gradient-to-br from-orange-400 to-orange-600',
            'bg-gradient-to-br from-red-400 to-red-600',
            'bg-gradient-to-br from-pink-400 to-pink-600'
        ];
        const index = name.charCodeAt(0) % colors.length;
        return colors[index];
    };

    return (
        <nav className="bg-black/90 backdrop-blur-md border-b border-white/5 w-full z-50 transition-all relative">
            <div className="container mx-auto px-6">
                {/* Desktop Navigation - Single Row */}
                <div className="hidden lg:flex items-center justify-between h-25 gap-6 py-4">
                    {/* Logo - Left (flex-shrink-0 to stay close to left) */}
                    <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity flex-shrink-0">
                        <h1 className="text-3xl font-black text-white tracking-tighter uppercase">
                            EJP<span className="text-amber-500">.</span>PORTO
                        </h1>
                    </Link>

                    {/* Navigation Menu - Center */}
                    <div className="flex-1 flex items-center justify-center px-8">
                        <ul className="flex items-center gap-3 list-none m-0 p-0 flex-wrap justify-center">
                            {displayNavLinks.map((link) => (
                                <li key={link.name} className="menu-item">
                                    <Link
                                        to={link.href}
                                        className={`wpr-menu-item wpr-pointer-item inline-block px-4 py-2 text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300 rounded-lg whitespace-nowrap ${
                                            link.special
                                                ? 'text-amber-500 hover:text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30'
                                                : 'text-gray-400 hover:text-amber-500 hover:bg-white/10'
                                        }`}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Auth Dropdown - Right (flex-shrink-0 to stay close to right) */}
                    <div className="relative flex-shrink-0">
                        {!is_loading && user ? (
                            // Utilisateur connecté
                            <button
                                onClick={() => setIsAuthOpen(!isAuthOpen)}
                                className="flex items-center gap-4 px-6 py-4 rounded-2xl hover:bg-white/10 transition-all group border border-transparent hover:border-amber-500/30 bg-white/5"
                            >
                                {/* Avatar */}
                                <div className={`w-14 h-14 ${getAvatarColor(user.firstName)} rounded-full flex items-center justify-center text-white font-black text-lg border-3 border-amber-400/50 group-hover:border-amber-400 transition-colors shadow-lg shadow-amber-500/20`}>
                                    {getInitials(user.firstName)}
                                </div>
                                
                                {/* Username & Chevron */}
                                <div className="text-left min-w-max">
                                    <p className="text-sm font-black uppercase tracking-widest text-white leading-tight">
                                        {user.name?.split(' ')[0]}
                                    </p>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-tight">
                                        Connecté
                                    </p>
                                </div>
                                <ChevronDown size={16} className={`transition-transform text-amber-500 flex-shrink-0 ml-2 ${isAuthOpen ? 'rotate-180' : ''}`} />
                            </button>
                        ) : (
                            // Utilisateur non connecté
                            <button
                                onClick={() => setIsAuthOpen(!isAuthOpen)}
                                className="flex items-center gap-3 text-amber-500 text-[11px] font-black uppercase tracking-widest border-2 border-amber-500/50 px-8 py-4 rounded-2xl hover:bg-amber-500 hover:text-black transition-all shadow-lg shadow-amber-500/10 bg-white/5"
                            >
                                <User size={18} /> Compte
                                <ChevronDown size={16} className={`transition-transform ${isAuthOpen ? 'rotate-180' : ''}`} />
                            </button>
                        )}

                        {isAuthOpen && (
                            <div className="absolute right-0 mt-4 w-64 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl py-2 z-50 animate-fade-in">
                                {user ? (
                                    // Menu utilisateur connecté
                                    <>
                                        {/* User Info Header */}
                                        <div className="px-6 py-5 border-b border-white/10">
                                            <p className="text-xs font-black text-white uppercase tracking-widest mb-1">
                                                {user.name}
                                            </p>
                                            <p className="text-[10px] text-gray-400">
                                                {user.email}
                                            </p>
                                        </div>

                                        {/* Menu Items */}
                                        <Link
                                            to="/profile"
                                            onClick={() => setIsAuthOpen(false)}
                                            className="flex items-center gap-3 px-6 py-4 text-sm text-white hover:bg-amber-600 hover:text-black transition-colors font-semibold"
                                        >
                                            <User size={18} />
                                            Mon Profil
                                        </Link>
                                        {/* <Link
                                            to="/settings"
                                            onClick={() => setIsAuthOpen(false)}
                                            className="flex items-center gap-3 px-6 py-4 text-sm text-white hover:bg-amber-600 hover:text-black transition-colors font-semibold"
                                        >
                                            <Settings size={18} />
                                            Paramètres
                                        </Link> */}

                                        {/* Divider */}
                                        <div className="my-2 border-t border-white/10" />

                                        {/* Logout */}
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-6 py-4 text-sm text-red-400 hover:bg-red-600/20 transition-colors font-semibold"
                                        >
                                            <LogOut size={18} />
                                            Déconnexion
                                        </button>
                                    </>
                                ) : (
                                    // Menu utilisateur non connecté
                                    <>
                                        <Link
                                            to="/login"
                                            onClick={() => setIsAuthOpen(false)}
                                            className="block px-6 py-4 text-sm text-white hover:bg-amber-600 hover:text-black transition-colors font-semibold"
                                        >
                                            Connexion
                                        </Link>
                                        <Link
                                            to="/register"
                                            onClick={() => setIsAuthOpen(false)}
                                            className="block px-6 py-4 text-sm text-white hover:bg-amber-600 hover:text-black transition-colors font-semibold"
                                        >
                                            S'inscrire
                                        </Link>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="lg:hidden flex items-center justify-between h-20">
                    {/* Logo / Nom */}
                    <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity flex-shrink-0">
                        <h1 className="text-xl font-black text-white tracking-tighter uppercase">
                            EJP<span className="text-amber-500">.</span>PORTO
                        </h1>
                    </Link>

                    {/* Mobile Toggle Button */}
                    <button
                        onClick={toggleMenu}
                        className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
                    >
                        {isMenuOpen ? (
                            <X size={28} />
                        ) : (
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden bg-zinc-900/95 border-t border-white/10 animate-in fade-in slide-in-from-top-2">
                    <div className="container mx-auto px-6 py-6 space-y-3">
                        {/* Mobile Nav Links */}
                        <ul className="space-y-2 list-none m-0 p-0">
                            {displayNavLinks.map(link => (
                                <li key={link.name} className="menu-item">
                                    <Link
                                        to={link.href}
                                        onClick={closeMenu}
                                        className={`block px-5 py-3 text-sm font-bold uppercase tracking-wider rounded-lg transition-all ${
                                            link.special
                                                ? 'text-amber-500 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50'
                                                : 'text-gray-300 hover:text-amber-500 hover:bg-white/10 border border-transparent hover:border-amber-500/30'
                                        }`}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Divider */}
                        <div className="my-4 border-t border-white/10" />

                        {/* Mobile Auth Section */}
                        {!is_loading && user ? (
                            // Menu mobile utilisateur connecté
                            <div className="space-y-3">
                                {/* User Header */}
                                <div className="px-5 py-4 bg-white/10 rounded-lg border border-white/20">
                                    <p className="text-xs font-black text-white uppercase tracking-widest mb-1">
                                        {user.name}
                                    </p>
                                    <p className="text-[10px] text-gray-400">
                                        {user.email}
                                    </p>
                                </div>

                                {/* Profile Link */}
                                <Link
                                    to="/profile"
                                    onClick={closeMenu}
                                    className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-white bg-white/10 hover:bg-amber-600 hover:text-black rounded-lg transition-all border border-white/20 hover:border-amber-600"
                                >
                                    <User size={16} />
                                    Mon Profil
                                </Link>

                                {/* Settings Link */}
                                <Link
                                    to="/settings"
                                    onClick={closeMenu}
                                    className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-white bg-white/10 hover:bg-amber-600 hover:text-black rounded-lg transition-all border border-white/20 hover:border-amber-600"
                                >
                                    <Settings size={16} />
                                    Paramètres
                                </Link>

                                {/* Logout Button */}
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-5 py-3 text-sm font-bold text-red-400 bg-red-600/20 hover:bg-red-600/40 rounded-lg transition-all border border-red-600/50"
                                >
                                    <LogOut size={16} />
                                    Déconnexion
                                </button>
                            </div>
                        ) : (
                            // Menu mobile utilisateur non connecté
                            <div className="space-y-3">
                                <Link
                                    to="/login"
                                    onClick={closeMenu}
                                    className="block px-5 py-3 text-sm font-bold text-white bg-white/10 hover:bg-amber-600 hover:text-black rounded-lg transition-all border border-white/20 hover:border-amber-600"
                                >
                                    Connexion
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={closeMenu}
                                    className="block px-5 py-3 text-sm font-bold text-white bg-white/10 hover:bg-amber-600 hover:text-black rounded-lg transition-all border border-white/20 hover:border-amber-600"
                                >
                                    S'inscrire
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Nav;