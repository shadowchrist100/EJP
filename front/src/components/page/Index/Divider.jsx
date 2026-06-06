import React from 'react';

/**
 * Divider — DESIGN.md hairline separator with amber diamond accent.
 * Uses hairline color tokens and restrained amber accents.
 */
const Divider = () => (
    <div style={{ padding: 'var(--space-xs) 0', background: 'var(--color-primary)' }}>
        <div className="section-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-sm)', maxWidth: '400px' }}>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(217,119,6,0.15))' }} />
            <div style={{ width: '4px', height: '4px', background: 'rgba(217,119,6,0.5)', transform: 'rotate(45deg)' }} />
            <div style={{ width: '6px', height: '6px', background: 'var(--color-amber)', transform: 'rotate(45deg)', boxShadow: '0 0 8px rgba(217,119,6,0.3)' }} />
            <div style={{ width: '4px', height: '4px', background: 'rgba(217,119,6,0.5)', transform: 'rotate(45deg)' }} />
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(217,119,6,0.15))' }} />
        </div>
    </div>
);

export default Divider;