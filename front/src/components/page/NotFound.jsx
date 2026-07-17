import { Link } from 'react-router-dom';

/**
 * NotFound — 404 page for unmatched routes (M5)
 */
const NotFound = () => (
    <div
        style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--color-primary)',
            textAlign: 'center',
            padding: '0 24px',
        }}
    >
        <p
            style={{
                fontFamily: 'var(--font-family-display)',
                fontSize: 'clamp(80px, 20vw, 180px)',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.04)',
                lineHeight: 1,
                margin: 0,
                userSelect: 'none',
            }}
            aria-hidden="true"
        >
            404
        </p>
        <div style={{ position: 'absolute' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', marginBottom: '16px' }}>
                <div style={{ width: '24px', height: '1px', background: 'rgba(217,119,6,0.4)' }} />
                <span className="t-eyebrow" style={{ color: 'var(--color-amber)', opacity: 0.7, fontSize: '11px', letterSpacing: '3px' }}>
                    PAGE INTROUVABLE
                </span>
                <div style={{ width: '24px', height: '1px', background: 'rgba(217,119,6,0.4)' }} />
            </div>
            <h1 className="t-display" style={{ color: 'var(--color-on-primary)', fontSize: 'clamp(28px, 5vw, 48px)', marginBottom: '12px' }}>
                Cette page n'existe pas
            </h1>
            <p className="t-body" style={{ color: 'var(--color-stone)', marginBottom: '40px', maxWidth: '400px' }}>
                La page que vous cherchez a peut-être été déplacée ou n'existe plus.
            </p>
            <Link to="/" className="btn-primary" style={{ padding: '12px 32px', height: '44px' }}>
                Retour à l'accueil
            </Link>
        </div>
    </div>
);

export default NotFound;
