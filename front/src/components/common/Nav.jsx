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
    const artProdigeLink = user ? { name: 'ArtProdige', href: '/artprodige' } : null;
    
    // Ajouter ArtProdige au début des liens si connecté
    const displayNavLinks = user ? [{ name: 'ArtProdige', href: '/artprodige' }, ...navLinks] : navLinks;

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
                <div className="flex items-center justify-between h-20">
                    {/* Logo / Nom */}
                    <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <h1 className="text-xl font-black text-white tracking-tighter uppercase">
                            EJP<span className="text-amber-500">.</span>PORTO
                        </h1>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-8">
                        {displayNavLinks.map(link => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${
                                    link.name === 'ArtProdige' 
                                        ? 'text-amber-500 hover:text-amber-400 border-b-2 border-amber-500/50 pb-1' 
                                        : 'text-gray-400 hover:text-amber-500'
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Auth Dropdown Desktop */}
                        <div className="relative">
                            {!is_loading && user ? (
                                // Utilisateur connecté
                                <button
                                    onClick={() => setIsAuthOpen(!isAuthOpen)}
                                    className="flex items-center gap-3 px-3 py-2 rounded-full hover:bg-white/10 transition-all group"
                                >
                                    {/* Avatar */}
                                    <div className={`w-10 h-10 ${getAvatarColor(user.name)} rounded-full flex items-center justify-center text-white font-black text-sm border border-amber-400/50 group-hover:border-amber-400 transition-colors`}>
                                        {getInitials(user.name)}
                                    </div>
                                    
                                    {/* Username & Chevron */}
                                    <div className="text-left">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-white">
                                            {user.name?.split(' ')[0]}
                                        </p>
                                        <p className="text-[8px] text-gray-400 uppercase tracking-widest">
                                            Connecté
                                        </p>
                                    </div>
                                    <ChevronDown size={12} className={`transition-transform text-amber-500 ${isAuthOpen ? 'rotate-180' : ''}`} />
                                </button>
                            ) : (
                                // Utilisateur non connecté
                                <button
                                    onClick={() => setIsAuthOpen(!isAuthOpen)}
                                    className="flex items-center gap-2 text-amber-500 text-[10px] font-black uppercase tracking-widest border border-amber-500/20 px-4 py-2 rounded-full hover:bg-amber-500 hover:text-black transition-all"
                                >
                                    <User size={14} /> Compte
                                    <ChevronDown size={12} className={`transition-transform ${isAuthOpen ? 'rotate-180' : ''}`} />
                                </button>
                            )}

                            {isAuthOpen && (
                                <div className="absolute right-0 mt-4 w-56 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl py-2 z-50 animate-fade-in">
                                    {user ? (
                                        // Menu utilisateur connecté
                                        <>
                                            {/* User Info Header */}
                                            <div className="px-6 py-4 border-b border-white/10">
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
                                                className="flex items-center gap-2 px-6 py-3 text-xs text-white hover:bg-amber-600 hover:text-black transition-colors"
                                            >
                                                <User size={14} />
                                                Mon Profil
                                            </Link>
                                            <Link
                                                to="/settings"
                                                onClick={() => setIsAuthOpen(false)}
                                                className="flex items-center gap-2 px-6 py-3 text-xs text-white hover:bg-amber-600 hover:text-black transition-colors"
                                            >
                                                <Settings size={14} />
                                                Paramètres
                                            </Link>

                                            {/* Divider */}
                                            <div className="my-2 border-t border-white/10" />

                                            {/* Logout */}
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-2 px-6 py-3 text-xs text-red-400 hover:bg-red-600/20 transition-colors"
                                            >
                                                <LogOut size={14} />
                                                Déconnexion
                                            </button>
                                        </>
                                    ) : (
                                        // Menu utilisateur non connecté
                                        <>
                                            <Link
                                                to="/login"
                                                onClick={() => setIsAuthOpen(false)}
                                                className="block px-6 py-3 text-xs text-white hover:bg-amber-600 hover:text-black transition-colors"
                                            >
                                                Connexion
                                            </Link>
                                            <Link
                                                to="/register"
                                                onClick={() => setIsAuthOpen(false)}
                                                className="block px-6 py-3 text-xs text-white hover:bg-amber-600 hover:text-black transition-colors"
                                            >
                                                S'inscrire
                                            </Link>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Toggle Button */}
                    <button
                        onClick={toggleMenu}
                        className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        {isMenuOpen ? (
                            <X size={24} />
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden bg-zinc-900/95 border-t border-white/10 animate-in fade-in slide-in-from-top-2">
                    <div className="container mx-auto px-6 py-4 space-y-2">
                        {/* Mobile Nav Links */}
                        {displayNavLinks.map(link => (
                            <Link
                                key={link.name}
                                to={link.href}
                                onClick={closeMenu}
                                className={`block px-4 py-3 text-sm font-bold uppercase tracking-wider rounded-lg transition-all ${
                                    link.name === 'ArtProdige'
                                        ? 'text-amber-500 bg-amber-500/10 hover:bg-amber-500/20'
                                        : 'text-gray-300 hover:text-amber-500 hover:bg-white/5'
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Divider */}
                        <div className="my-4 border-t border-white/10" />

                        {/* Mobile Auth Section */}
                        {!is_loading && user ? (
                            // Menu mobile utilisateur connecté
                            <div className="space-y-2">
                                {/* User Header */}
                                <div className="px-4 py-3 bg-white/5 rounded-lg">
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
                                    className="flex items-center gap-2 px-4 py-3 text-sm font-bold text-white bg-white/5 hover:bg-amber-600 hover:text-black rounded-lg transition-all"
                                >
                                    <User size={16} />
                                    Mon Profil
                                </Link>

                                {/* Settings Link */}
                                <Link
                                    to="/settings"
                                    onClick={closeMenu}
                                    className="flex items-center gap-2 px-4 py-3 text-sm font-bold text-white bg-white/5 hover:bg-amber-600 hover:text-black rounded-lg transition-all"
                                >
                                    <Settings size={16} />
                                    Paramètres
                                </Link>

                                {/* Logout Button */}
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-2 px-4 py-3 text-sm font-bold text-red-400 bg-red-600/10 hover:bg-red-600/30 rounded-lg transition-all"
                                >
                                    <LogOut size={16} />
                                    Déconnexion
                                </button>
                            </div>
                        ) : (
                            // Menu mobile utilisateur non connecté
                            <div className="space-y-2">
                                <Link
                                    to="/login"
                                    onClick={closeMenu}
                                    className="block px-4 py-3 text-sm font-bold text-white bg-white/5 hover:bg-amber-600 hover:text-black rounded-lg transition-colors"
                                >
                                    Connexion
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={closeMenu}
                                    className="block px-4 py-3 text-sm font-bold text-white bg-white/5 hover:bg-amber-600 hover:text-black rounded-lg transition-colors"
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