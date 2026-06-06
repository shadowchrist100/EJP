import { useState, useContext } from "react";
import { User, ChevronDown, X, LogOut } from 'lucide-react';
import { useLocation, Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const { user, logout, is_loading } = useContext(AuthContext);
    const location = useLocation();

    const displayNavLinks = [
        { name: 'Accueil', href: '/' },
        { name: 'Événements', href: '/evenements' },
        { name: 'Ministères', href: '/ministeres' },
        { name: 'Art&Prodiges', href: '/artprodige' },
        { name: 'FIJ', href: '/fij' },
        { name: 'Salut', href: '/salvation' },
        { name: 'Galerie', href: '/galerie' },
        { name: 'Contact', href: '#contact' },
    ];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const isActive = (href) => {
        if (href === '/') return location.pathname === '/';
        return location.pathname.startsWith(href);
    };

    const handleLogout = async () => {
        try {
            await logout();
            closeMenu();
            setIsAuthOpen(false);
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error);
        }
    };

    const getInitials = (name) => {
        if (!name) return "?";
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    return (
        /* nav-bar: bg canvas, height 64px, link-sm typography */
        <nav
            className="w-full z-50 transition-all relative"
            style={{
                background: 'rgba(0,0,0,0.92)',
                backdropFilter: 'blur(16px)',
                height: '64px',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
        >
            <div className="section-container h-full">
                {/* ═══ DESKTOP ═══ */}
                <div className="hidden lg:flex items-center justify-between h-full gap-6">
                    {/* Wordmark — lowercase, ink on dark */}
                    <Link to="/" className="flex items-center gap-1 hover:opacity-80 transition-opacity shrink-0">
                        <span
                            className="t-heading-sm"
                            style={{ color: 'var(--color-on-primary)', fontWeight: 600, letterSpacing: '-0.5px' }}
                        >
                            ejp
                        </span>
                        <span style={{ color: 'var(--color-amber)', fontWeight: 600 }}>.</span>
                        <span
                            className="t-heading-sm"
                            style={{ color: 'var(--color-on-primary)', fontWeight: 600, letterSpacing: '-0.5px' }}
                        >
                            porto
                        </span>
                    </Link>

                    {/* Nav links — centred, link-sm */}
                    <div className="flex-1 flex items-center justify-center">
                        <ul className="flex items-center gap-1 list-none m-0 p-0">
                            {displayNavLinks.map((link) => {
                                const active = isActive(link.href);
                                return (
                                    <li key={link.name}>
                                        <Link
                                            to={link.href}
                                            className="t-link-sm"
                                            style={{
                                                display: 'inline-block',
                                                padding: '8px 14px',
                                                color: active ? 'var(--color-amber)' : 'rgba(255,255,255,0.6)',
                                                borderBottom: active ? '2px solid var(--color-amber)' : '2px solid transparent',
                                                transition: 'color 0.2s, border-color 0.2s',
                                                textDecoration: 'none',
                                                whiteSpace: 'nowrap',
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!active) e.target.style.color = 'var(--color-on-primary)';
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!active) e.target.style.color = 'rgba(255,255,255,0.6)';
                                            }}
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Right cluster */}
                    <div className="flex items-center gap-3 shrink-0">
                        {/* Donation CTA — button-primary amber pill */}
                        <Link to="/dons" className="btn-primary" style={{ fontSize: '13px', height: '36px', padding: '0 20px' }}>
                            Faire un don
                        </Link>

                        {/* Auth */}
                        <div className="relative">
                            {!is_loading && user ? (
                                <button
                                    onClick={() => setIsAuthOpen(!isAuthOpen)}
                                    className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-white/10 transition-all"
                                    style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                                >
                                    <div
                                        className="w-8 h-8 rounded-full flex items-center justify-center t-micro-caps"
                                        style={{ background: 'var(--color-amber)', color: 'var(--color-primary)', fontWeight: 700 }}
                                    >
                                        {getInitials(user.firstName)}
                                    </div>
                                    <ChevronDown size={14} style={{ color: 'rgba(255,255,255,0.5)', transition: 'transform 0.2s', transform: isAuthOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
                                </button>
                            ) : (
                                <button
                                    onClick={() => setIsAuthOpen(!isAuthOpen)}
                                    className="btn-ghost"
                                    style={{ fontSize: '13px', height: '36px', padding: '0 16px', gap: '6px' }}
                                >
                                    <User size={15} /> Compte
                                </button>
                            )}

                            {isAuthOpen && (
                                <div
                                    className="absolute right-0 mt-2 w-56 py-2 z-50 animate-fadeIn"
                                    style={{
                                        background: 'var(--color-scrim)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        borderRadius: 'var(--rounded-md)',
                                        boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
                                    }}
                                >
                                    {user ? (
                                        <>
                                            <div className="px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                                                <p className="t-link-sm" style={{ color: 'var(--color-on-primary)', marginBottom: '2px' }}>{user.name}</p>
                                                <p className="t-meta" style={{ color: 'var(--color-stone)' }}>{user.email}</p>
                                            </div>
                                            <Link
                                                to="/profile"
                                                onClick={() => setIsAuthOpen(false)}
                                                className="flex items-center gap-3 px-4 py-3 t-body transition-colors"
                                                style={{ color: 'var(--color-on-primary)', textDecoration: 'none' }}
                                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(217,119,6,0.15)'}
                                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                            >
                                                <User size={16} /> Mon Profil
                                            </Link>
                                            <div style={{ margin: '4px 0', borderTop: '1px solid rgba(255,255,255,0.08)' }} />
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-4 py-3 t-body transition-colors"
                                                style={{ color: '#f87171', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(248,113,113,0.1)'}
                                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                            >
                                                <LogOut size={16} /> Déconnexion
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                to="/login"
                                                onClick={() => setIsAuthOpen(false)}
                                                className="block px-4 py-3 t-body transition-colors"
                                                style={{ color: 'var(--color-on-primary)', textDecoration: 'none' }}
                                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(217,119,6,0.15)'}
                                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                            >
                                                Connexion
                                            </Link>
                                            <Link
                                                to="/register"
                                                onClick={() => setIsAuthOpen(false)}
                                                className="block px-4 py-3 t-body transition-colors"
                                                style={{ color: 'var(--color-on-primary)', textDecoration: 'none' }}
                                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(217,119,6,0.15)'}
                                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                            >
                                                S'inscrire
                                            </Link>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* ═══ MOBILE ═══ */}
                <div className="lg:hidden flex items-center justify-between h-full">
                    <Link to="/" className="flex items-center gap-1 hover:opacity-80 transition-opacity shrink-0">
                        <span className="t-subtitle" style={{ color: 'var(--color-on-primary)', fontWeight: 600, letterSpacing: '-0.5px' }}>
                            ejp
                        </span>
                        <span style={{ color: 'var(--color-amber)', fontWeight: 600, fontSize: '20px' }}>.</span>
                        <span className="t-subtitle" style={{ color: 'var(--color-on-primary)', fontWeight: 600, letterSpacing: '-0.5px' }}>
                            porto
                        </span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <Link to="/dons" className="btn-primary" style={{ fontSize: '12px', height: '32px', padding: '0 14px' }}>
                            Don
                        </Link>
                        <button
                            onClick={toggleMenu}
                            className="p-2 rounded-md transition-colors"
                            style={{ color: 'var(--color-on-primary)', background: 'transparent', border: 'none', cursor: 'pointer' }}
                        >
                            {isMenuOpen ? <X size={24} /> : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* ═══ MOBILE MENU OVERLAY ═══ */}
            {isMenuOpen && (
                <div
                    className="lg:hidden animate-fadeIn"
                    style={{
                        background: 'rgba(0,0,0,0.97)',
                        borderTop: '1px solid rgba(255,255,255,0.06)',
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: '64px',
                        zIndex: 50,
                    }}
                >
                    <div className="section-container py-6">
                        <ul className="list-none m-0 p-0" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            {displayNavLinks.map((link) => {
                                const active = isActive(link.href);
                                return (
                                    <li key={link.name}>
                                        <Link
                                            to={link.href}
                                            onClick={closeMenu}
                                            className="t-body"
                                            style={{
                                                display: 'block',
                                                padding: '12px 16px',
                                                color: active ? 'var(--color-amber)' : 'rgba(255,255,255,0.7)',
                                                textDecoration: 'none',
                                                borderLeft: active ? '2px solid var(--color-amber)' : '2px solid transparent',
                                                transition: 'all 0.2s',
                                            }}
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>

                        <div style={{ margin: '16px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }} />

                        {!is_loading && user ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <div className="t-meta" style={{ padding: '8px 16px', color: 'var(--color-stone)' }}>
                                    {user.name} · {user.email}
                                </div>
                                <Link
                                    to="/profile"
                                    onClick={closeMenu}
                                    className="t-body"
                                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', color: 'var(--color-on-primary)', textDecoration: 'none' }}
                                >
                                    <User size={16} /> Mon Profil
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="t-body"
                                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', color: '#f87171', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }}
                                >
                                    <LogOut size={16} /> Déconnexion
                                </button>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <Link to="/login" onClick={closeMenu} className="btn-ghost" style={{ justifyContent: 'center', width: '100%', marginBottom: '4px' }}>
                                    Connexion
                                </Link>
                                <Link to="/register" onClick={closeMenu} className="btn-primary" style={{ justifyContent: 'center', width: '100%' }}>
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