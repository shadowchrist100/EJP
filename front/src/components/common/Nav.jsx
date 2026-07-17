import { useState, useContext, useMemo, useCallback } from "react";
import { User, ChevronDown, X, LogOut } from 'lucide-react';
import { useLocation, Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";

// P3: Pure helper moved outside component — no recreation on every render
const getInitials = (name) => {
    if (!name) return "?";
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const { user, logout, is_loading } = useContext(AuthContext);
    const location = useLocation();

    // P2: useMemo prevents array recreation on every render
    const displayNavLinks = useMemo(() => [
        { name: 'Accueil', href: '/' },
        { name: 'Événements', href: '/evenements' },
        { name: 'Ministères', href: '/ministeres' },
        { name: 'Art&Prodiges', href: '/artprodige' },
        { name: 'FIJ', href: '/fij' },
        { name: 'Salut', href: '/salvation' },
        { name: 'Galerie', href: '/galerie' },
        { name: 'Contact', href: '#contact' },
        ...(user?.is_admin || user?.is_superadmin ? [{ name: 'Admin', href: '/admin' }] : []),
    ], [user?.is_admin, user?.is_superadmin]);

    const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);
    const closeMenu = useCallback(() => setIsMenuOpen(false), []);

    const isActive = useCallback((href) => {
        if (href === '/') return location.pathname === '/';
        return location.pathname.startsWith(href);
    }, [location.pathname]);

    const handleLogout = useCallback(async () => {
        try {
            await logout();
            closeMenu();
            setIsAuthOpen(false);
        } catch (error) {
            if (import.meta.env.DEV) console.error("Erreur lors de la déconnexion:", error);
        }
    }, [logout, closeMenu]);

    return (
        <nav
            className="w-full z-50 transition-all relative"
            aria-label="Navigation principale"
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
                    {/* Wordmark */}
                    <Link
                        to="/"
                        className="flex items-center gap-1 hover:opacity-80 transition-opacity shrink-0"
                        aria-label="Accueil — EJP Porto-Novo"
                    >
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

                    {/* Nav links */}
                    <div className="flex-1 flex items-center justify-center">
                        <ul className="flex items-center gap-1 list-none m-0 p-0" role="list">
                            {displayNavLinks.map((link) => {
                                const active = isActive(link.href);
                                return (
                                    <li key={link.name}>
                                        <Link
                                            to={link.href}
                                            className="nav-link t-link-sm"
                                            aria-current={active ? 'page' : undefined}
                                            style={{
                                                display: 'inline-block',
                                                padding: '8px 14px',
                                                color: active ? 'var(--color-amber)' : 'rgba(255,255,255,0.6)',
                                                borderBottom: active ? '2px solid var(--color-amber)' : '2px solid transparent',
                                                transition: 'color 0.2s, border-color 0.2s, transform 0.3s, background 0.2s',
                                                textDecoration: 'none',
                                                whiteSpace: 'nowrap',
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
                        <Link to="/dons" className="btn-primary" style={{ fontSize: '13px', height: '36px', padding: '0 20px' }}>
                            Faire un don
                        </Link>

                        {/* Auth */}
                        <div className="relative">
                            {/* U1: Skeleton placeholder while loading */}
                            {is_loading && (
                                <div
                                    className="w-10 h-10 rounded-full"
                                    style={{ background: 'rgba(255,255,255,0.08)', animation: 'pulse 1.5s ease-in-out infinite' }}
                                    aria-hidden="true"
                                />
                            )}

                            {!is_loading && user && (
                                <button
                                    onClick={() => setIsAuthOpen(prev => !prev)}
                                    className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-white/10 transition-all"
                                    style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                                    aria-expanded={isAuthOpen}
                                    aria-haspopup="true"
                                    aria-controls="auth-menu"
                                    aria-label={`Menu de ${user.firstName}`}
                                >
                                    <div
                                        className="w-8 h-8 rounded-full flex items-center justify-center t-micro-caps"
                                        style={{ background: 'var(--color-amber)', color: 'var(--color-primary)', fontWeight: 700 }}
                                        aria-hidden="true"
                                    >
                                        {getInitials(user.firstName)}
                                    </div>
                                    <ChevronDown
                                        size={14}
                                        style={{ color: 'rgba(255,255,255,0.5)', transition: 'transform 0.2s', transform: isAuthOpen ? 'rotate(180deg)' : 'rotate(0)' }}
                                        aria-hidden="true"
                                    />
                                </button>
                            )}

                            {isAuthOpen && (
                                <div
                                    id="auth-menu"
                                    role="menu"
                                    className="absolute right-0 mt-2 w-56 py-2 z-50 animate-fadeIn"
                                    style={{
                                        background: 'var(--color-scrim)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        borderRadius: 'var(--rounded-md)',
                                        boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
                                    }}
                                >
                                    {user && (
                                        <>
                                            <div className="px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                                                <p className="t-link-sm" style={{ color: 'var(--color-on-primary)', marginBottom: '2px' }}>{user.firstName} {user.lastName}</p>
                                                <p className="t-meta" style={{ color: 'var(--color-stone)' }}>{user.email}</p>
                                            </div>
                                            <Link
                                                to="/profile"
                                                role="menuitem"
                                                onClick={() => setIsAuthOpen(false)}
                                                className="flex items-center gap-3 px-4 py-3 t-body nav-menu-item"
                                                style={{ color: 'var(--color-on-primary)', textDecoration: 'none' }}
                                            >
                                                <User size={16} aria-hidden="true" /> Mon Profil
                                            </Link>
                                            {(user.is_admin || user.is_superadmin) && (
                                                <Link
                                                    to="/admin"
                                                    role="menuitem"
                                                    onClick={() => setIsAuthOpen(false)}
                                                    className="flex items-center gap-3 px-4 py-3 t-body nav-menu-item"
                                                    style={{ color: 'var(--color-amber)', textDecoration: 'none' }}
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                                    Administration
                                                </Link>
                                            )}
                                            <div style={{ margin: '4px 0', borderTop: '1px solid rgba(255,255,255,0.08)' }} />
                                            <button
                                                role="menuitem"
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-4 py-3 t-body nav-menu-item-danger"
                                                style={{ color: '#f87171', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                                            >
                                                <LogOut size={16} aria-hidden="true" /> Déconnexion
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* ═══ MOBILE ═══ */}
                <div className="lg:hidden flex items-center justify-between h-full">
                    <Link
                        to="/"
                        className="flex items-center gap-1 hover:opacity-80 transition-opacity shrink-0"
                        aria-label="Accueil — EJP Porto-Novo"
                    >
                        <span className="t-subtitle" style={{ color: 'var(--color-on-primary)', fontWeight: 600, letterSpacing: '-0.5px' }}>ejp</span>
                        <span style={{ color: 'var(--color-amber)', fontWeight: 600, fontSize: '20px' }}>.</span>
                        <span className="t-subtitle" style={{ color: 'var(--color-on-primary)', fontWeight: 600, letterSpacing: '-0.5px' }}>porto</span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <Link to="/dons" className="btn-primary" style={{ fontSize: '12px', height: '32px', padding: '0 14px' }}>
                            Don
                        </Link>
                        {/* A2: aria-expanded + aria-controls on hamburger button */}
                        <button
                            onClick={toggleMenu}
                            className="p-2 rounded-md transition-colors"
                            style={{ color: 'var(--color-on-primary)', background: 'transparent', border: 'none', cursor: 'pointer' }}
                            aria-expanded={isMenuOpen}
                            aria-controls="mobile-nav-menu"
                            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                        >
                            {isMenuOpen
                                ? <X size={24} aria-hidden="true" />
                                : <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                            }
                        </button>
                    </div>
                </div>
            </div>

            {/* ═══ MOBILE MENU OVERLAY ═══ */}
            {isMenuOpen && (
                <div
                    id="mobile-nav-menu"
                    className="lg:hidden animate-fadeIn"
                    role="navigation"
                    aria-label="Menu mobile"
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
                        <ul className="list-none m-0 p-0" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }} role="list">
                            {displayNavLinks.map((link) => {
                                const active = isActive(link.href);
                                return (
                                    <li key={link.name}>
                                        <Link
                                            to={link.href}
                                            onClick={closeMenu}
                                            className="t-body"
                                            aria-current={active ? 'page' : undefined}
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

                        {/* U1: Skeleton while loading */}
                        {is_loading && (
                            <div
                                style={{ height: '60px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', animation: 'pulse 1.5s ease-in-out infinite' }}
                                aria-hidden="true"
                            />
                        )}

                        {!is_loading && user && (
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
                                    <User size={16} aria-hidden="true" /> Mon Profil
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="t-body"
                                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', color: '#f87171', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }}
                                >
                                    <LogOut size={16} aria-hidden="true" /> Déconnexion
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Nav;