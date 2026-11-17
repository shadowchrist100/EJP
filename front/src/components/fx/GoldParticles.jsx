import { useEffect, useRef } from 'react';

/**
 * GoldParticles — WebGL golden dust (Three.js), rendered behind content.
 *
 * - The Three.js scene (goldScene.js) is dynamically imported → separate chunk, never blocks LCP.
 * - Render loop runs only while the canvas is on screen and the tab is visible.
 * - prefers-reduced-motion → a single static frame, no loop, no cursor tracking.
 * - Falls back to nothing if WebGL is unavailable.
 *
 * Props:
 *  - count    number of particles
 *  - variant  'float' (drifting dust) | 'rise' (light rising upward)
 *  - speed    time multiplier (2-3 = energetic, accelerated dust)
 */

const GoldParticles = ({ count = 900, variant = 'float', speed = 1, className = '', style }) => {
    const hostRef = useRef(null);

    useEffect(() => {
        const host = hostRef.current;
        if (!host) return undefined;
        let cancelled = false;
        let cleanup = () => {};

        import('./goldScene')
            .then(({ mountScene }) => {
                if (!cancelled) cleanup = mountScene(host, { count, variant, speed });
            })
            .catch(() => { /* decorative layer — fail silently */ });

        return () => {
            cancelled = true;
            cleanup();
            host.classList.remove('is-ready');
        };
    }, [count, variant, speed]);

    return <div ref={hostRef} className={`gold-particles ${className}`} style={style} aria-hidden="true" />;
};

export default GoldParticles;
