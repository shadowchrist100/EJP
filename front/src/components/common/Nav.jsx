import { useState } from "react";
import { User, ChevronDown, X } from 'lucide-react'

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);

    const navLinks = [
        { name: 'Accueil', href: '/' },
        { name: 'À Propos', href: '#apropos' },
        { name: 'Événements', href: '/evenements' },
        { name: 'Ministères', href: '/ministeres' },
        { name: 'Rejoindre une FIJ', href: '/fij' },
        { name: 'Galerie', href: '/galerie' },
        { name: 'Contact', href: '#contact' },
        { name: 'Faire un Don', href: '/dons' }
    ];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav className="bg-black/90 backdrop-blur-md border-b border-white/5 w-full z-50 transition-all relative">
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
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-amber-500 transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}

                        {/* Auth Dropdown Desktop */}
                        <div className="relative">
                            <button
                                onClick={() => setIsAuthOpen(!isAuthOpen)}
                                className="flex items-center gap-2 text-amber-500 text-[10px] font-black uppercase tracking-widest border border-amber-500/20 px-4 py-2 rounded-full hover:bg-amber-500 hover:text-black transition-all"
                            >
                                <User size={14} /> Compte
                                <ChevronDown size={12} className={`transition-transform ${isAuthOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isAuthOpen && (
                                <div className="absolute right-0 mt-4 w-48 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl py-2 z-50 animate-fade-in">
                                    <a href="/login" className="block px-6 py-3 text-xs text-white hover:bg-amber-600 hover:text-black transition-colors">
                                        Connexion
                                    </a>
                                    <a href="/register" className="block px-6 py-3 text-xs text-white hover:bg-amber-600 hover:text-black transition-colors">
                                        S'inscrire
                                    </a>
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
                        {navLinks.map(link => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={closeMenu}
                                className="block px-4 py-3 text-sm font-bold uppercase tracking-wider text-gray-300 hover:text-amber-500 hover:bg-white/5 rounded-lg transition-all"
                            >
                                {link.name}
                            </a>
                        ))}

                        {/* Divider */}
                        <div className="my-4 border-t border-white/10" />

                        {/* Mobile Auth Section */}
                        <div className="space-y-2">
                            <button
                                onClick={() => setIsAuthOpen(!isAuthOpen)}
                                className="w-full flex items-center justify-between px-4 py-3 text-amber-500 text-sm font-black uppercase tracking-widest border border-amber-500/20 rounded-lg hover:bg-amber-500 hover:text-black transition-all"
                            >
                                <span className="flex items-center gap-2">
                                    <User size={14} />
                                    Compte
                                </span>
                                <ChevronDown size={14} className={`transition-transform ${isAuthOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isAuthOpen && (
                                <div className="pl-4 space-y-2 animate-in fade-in slide-in-from-top-2">
                                    <a
                                        href="/login"
                                        onClick={closeMenu}
                                        className="block px-4 py-3 text-xs text-white bg-white/5 hover:bg-amber-600 hover:text-black rounded-lg transition-colors"
                                    >
                                        Connexion
                                    </a>
                                    <a
                                        href="/register"
                                        onClick={closeMenu}
                                        className="block px-4 py-3 text-xs text-white bg-white/5 hover:bg-amber-600 hover:text-black rounded-lg transition-colors"
                                    >
                                        S'inscrire
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Nav;