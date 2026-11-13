import { useEffect, useRef } from 'react';

/**
 * HeroCanvas — WebGL hero background (liquid photo + burn transitions + gold dust).
 * The Three.js scene is in heroScene.js and loaded on demand.
 * Props: images (array of urls), current (index), scrollProgress (MotionValue 0..1)
 */
const HeroCanvas = ({ images, current, scrollProgress, onReady }) => {
    const hostRef = useRef(null);
    const sceneRef = useRef(null);

    useEffect(() => {
        const host = hostRef.current;
        if (!host) return undefined;
        let cancelled = false;
        import('./heroScene')
            .then(({ mountScene }) => {
                if (cancelled) return;
                sceneRef.current = mountScene(host, { images, onReady });
                sceneRef.current.setSlide(current);
            })
            .catch(() => { /* decorative — the <img> fallback stays visible */ });
        return () => {
            cancelled = true;
            sceneRef.current?.dispose();
            sceneRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [images]);

    useEffect(() => { sceneRef.current?.setSlide(current); }, [current]);

    useEffect(() => {
        if (!scrollProgress) return undefined;
        return scrollProgress.on('change', (v) => sceneRef.current?.setScroll(v));
    }, [scrollProgress]);

    return <div ref={hostRef} className="hero-canvas" aria-hidden="true" />;
};

export default HeroCanvas;
