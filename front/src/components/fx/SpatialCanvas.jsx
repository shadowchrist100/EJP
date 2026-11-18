import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

/**
 * SpatialCanvas — React host for spatialScene.js (Three.js, loaded on demand).
 * Exposes { setSlide, setScroll, burst } through the ref.
 */
const SpatialCanvas = forwardRef(({ emblem, photos, onReady }, ref) => {
    const hostRef = useRef(null);
    const sceneRef = useRef(null);
    const pending = useRef({ slide: 0, scroll: 0 });

    useImperativeHandle(ref, () => ({
        setSlide(i) { pending.current.slide = i; sceneRef.current?.setSlide(i); },
        setScroll(p) { pending.current.scroll = p; sceneRef.current?.setScroll(p); },
        burst(s) { sceneRef.current?.burst(s); },
    }), []);

    useEffect(() => {
        const host = hostRef.current;
        if (!host) return undefined;
        let cancelled = false;
        const compact = window.matchMedia('(max-width: 768px)').matches;
        import('./spatialScene')
            .then(({ mountSpatialScene }) => {
                if (cancelled) return;
                const api = mountSpatialScene(host, { emblem, photos, compact, onReady });
                sceneRef.current = api;
                api.setSlide(pending.current.slide);
                api.setScroll(pending.current.scroll);
            })
            .catch(() => { /* decorative — the static fallback photo stays */ });
        return () => {
            cancelled = true;
            sceneRef.current?.dispose();
            sceneRef.current = null;
        };
    }, [emblem, photos, onReady]);

    return <div ref={hostRef} className="sp-canvas" aria-hidden="true" />;
});

SpatialCanvas.displayName = 'SpatialCanvas';
export default SpatialCanvas;
