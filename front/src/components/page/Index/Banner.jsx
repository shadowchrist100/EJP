import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SpatialCanvas from '../../fx/SpatialCanvas';
import { emblemGold, fij1, fij2, fij3, fij4 } from '../../../assets';

gsap.registerPlugin(SplitText, ScrollTrigger);

// All existing hero photos are kept: they tint the 3D scene and live in the floating cards.
const IMAGES = [fij1, fij2, fij3, fij4];
const SLIDE_MS = 7000;
const fmt = (n) => String(n).padStart(2, '0');

// Floating photo cards: position (desktop), depth (parallax strength), label
const CARDS = [
    { cls: 'tl', depth: 1.4, label: 'Culte' },
    { cls: 'tr', depth: 0.9, label: 'Louange' },
    { cls: 'br', depth: 1.8, label: 'Jeunesse' },
    { cls: 'bl', depth: 1.1, label: 'Famille' },
];

const RIBBON = 'Église Jeunes Prodiges · Porto-Novo · Par les jeunes, pour les jeunes · Dimanche 15h29 · ';

const Banner = () => {
    const [current, setCurrent] = useState(0);
    const [sceneReady, setSceneReady] = useState(false);
    const sectionRef = useRef(null);
    const sceneApi = useRef(null);

    // Slideshow timer — restarts on every change so the progress bar stays in sync
    useEffect(() => {
        const id = setTimeout(() => setCurrent((p) => (p + 1) % IMAGES.length), SLIDE_MS);
        sceneApi.current?.setSlide(current);
        return () => clearTimeout(id);
    }, [current]);

    const onSceneReady = useCallback(() => setSceneReady(true), []);

    // GSAP choreography: kinetic title, cards, UI, cursor parallax, scroll-out
    useLayoutEffect(() => {
        const section = sectionRef.current;
        const mm = gsap.matchMedia();

        const ctx = gsap.context(() => {
            mm.add('(prefers-reduced-motion: no-preference)', () => {
                const left = SplitText.create('.sp-word--left', { type: 'chars', mask: 'chars' });
                const right = SplitText.create('.sp-word--right', { type: 'chars', mask: 'chars' });
                const gold = SplitText.create('.sp-word--gold', { type: 'chars', charsClass: 'sp-gold-char' });

                const tl = gsap.timeline({ delay: 1.5, defaults: { ease: 'expo.out' } });
                tl.from('.sp-eyebrow', { opacity: 0, y: 20, letterSpacing: '1.2em', duration: 1.4 }, 0)
                    .from(left.chars, { yPercent: 115, rotate: 14, duration: 1.3, stagger: 0.05 }, 0.1)
                    .from(right.chars, { yPercent: -115, rotate: -14, duration: 1.3, stagger: { each: 0.05, from: 'end' } }, 0.2)
                    .from(gold.chars, { yPercent: 80, scale: 1.6, opacity: 0, filter: 'blur(16px)', duration: 1.6, stagger: { each: 0.06, from: 'center' } }, 0.55)
                    .from('.sp-tagline', { scaleX: 0, opacity: 0, duration: 1.1 }, 1.0)
                    // fromTo (not from): the buttons have CSS transitions, so from() could read a
                    // mid-transition value as its end state on an effect re-run. clearProps restores hover.
                    .fromTo('.sp-ctas > *', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, stagger: 0.1, clearProps: 'transform,opacity' }, 1.1)
                    .from('.sp-card-intro', {
                        opacity: 0, scale: 0.2, y: 160, rotate: (i) => [-35, 30, -25, 40][i],
                        duration: 1.6, stagger: 0.12,
                    }, 0.4)
                    .from('.sp-annot', { opacity: 0, x: -24, duration: 0.9, stagger: 0.15 }, 1.3)
                    .from('.sp-annot-line', { scaleX: 0, duration: 0.9, stagger: 0.15 }, 1.4)
                    .from('.sp-ui', { opacity: 0, y: 24, duration: 0.9, stagger: 0.1 }, 1.5);

                // Scroll: words split apart around the emblem, cards sink, scene zooms out
                gsap.timeline({
                    scrollTrigger: {
                        trigger: section, start: 'top top', end: 'bottom top', scrub: 0.6,
                        onUpdate: (self) => sceneApi.current?.setScroll(self.progress),
                    },
                })
                    .to('.sp-word--left', { xPercent: -70, opacity: 0, ease: 'none' }, 0)
                    .to('.sp-word--right', { xPercent: 70, opacity: 0, ease: 'none' }, 0)
                    .to('.sp-word--gold', { yPercent: -30, scale: 1.35, opacity: 0, ease: 'none' }, 0)
                    .to('.sp-cards', { y: 320, opacity: 0, ease: 'none' }, 0)
                    .to('.sp-eyebrow, .sp-tagline, .sp-ctas, .sp-annots', { y: -90, opacity: 0, ease: 'none' }, 0);

                // Cursor parallax on the cards (each at its own depth)
                const movers = gsap.utils.toArray('.sp-card-anchor').map((el) => ({
                    depth: Number(el.dataset.depth),
                    x: gsap.quickTo(el, 'x', { duration: 1.1, ease: 'power3.out' }),
                    y: gsap.quickTo(el, 'y', { duration: 1.1, ease: 'power3.out' }),
                    rx: gsap.quickTo(el, 'rotationX', { duration: 1.1, ease: 'power3.out' }),
                    ry: gsap.quickTo(el, 'rotationY', { duration: 1.1, ease: 'power3.out' }),
                }));
                const onMove = (e) => {
                    const nx = (e.clientX / window.innerWidth) * 2 - 1;
                    const ny = (e.clientY / window.innerHeight) * 2 - 1;
                    movers.forEach((m) => { m.x(nx * 34 * m.depth); m.y(ny * 22 * m.depth); m.ry(nx * 14); m.rx(-ny * 12); });
                };
                window.addEventListener('pointermove', onMove, { passive: true });
                return () => window.removeEventListener('pointermove', onMove);
            });
        }, section);

        return () => { mm.revert(); ctx.revert(); };
    }, []);

    return (
        <section ref={sectionRef} className="sp-hero" aria-label="Bannière principale">
            {/* LCP / no-WebGL fallback: first photo, fades out once the 3D scene is ready */}
            <img
                src={IMAGES[0]} alt="" width={1920} height={1080}
                loading="eager" fetchPriority="high" decoding="sync"
                className={`sp-fallback ${sceneReady ? 'is-hidden' : ''}`} aria-hidden="true"
            />

            <SpatialCanvas ref={sceneApi} emblem={emblemGold} photos={IMAGES} onReady={onSceneReady} />
            <div className="sp-vignette" aria-hidden="true" />

            {/* Floating photo cards (all 4 slideshow photos) — active one is featured */}
            <div className="sp-cards hidden lg:block">
                {CARDS.map((c, i) => (
                    <div key={c.cls} className={`sp-card-anchor sp-card-anchor--${c.cls}`} data-depth={c.depth}>
                        <div className="sp-card-intro">
                        <button
                            type="button"
                            className={`sp-card gold-border ${i === current ? 'is-active' : ''}`}
                            onClick={() => setCurrent(i)}
                            aria-label={`Afficher la photo ${i + 1} : ${c.label}`}
                        >
                            <img src={IMAGES[i]} alt="" loading="lazy" decoding="async" />
                            <span className="sp-card-label"><span className="sp-card-idx">{fmt(i + 1)}</span>{c.label}</span>
                            <span className="sp-card-shine" aria-hidden="true" />
                        </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Stage: title wraps around the emblem */}
            <div className="sp-stage">
                <div className="sp-top">
                    <p className="t-eyebrow sp-eyebrow">
                        <span className="sp-eyebrow-line" aria-hidden="true" />
                        Porto-Novo · Bénin
                        <span className="sp-eyebrow-line" aria-hidden="true" />
                    </p>
                </div>

                <h1 className="sp-title">
                    <span className="sr-only">Église Jeunes Prodiges — Par les jeunes, pour les jeunes</span>
                    <span className="sp-word sp-word--left" aria-hidden="true">Église</span>
                    <span className="sp-emblem-slot" aria-hidden="true" />
                    <span className="sp-word sp-word--right" aria-hidden="true">Jeunes</span>
                    <span className="sp-word sp-word--gold" aria-hidden="true">Prodiges</span>
                </h1>

                <div className="sp-bottom">
                    <p className="sp-tagline" aria-hidden="true">
                        Par les jeunes <span className="sp-tagline-sep">|</span> Pour les jeunes
                    </p>
                    <div className="sp-ctas">
                        <Link to="/register" className="btn-primary btn-glow btn-magnetic"><span>Rejoins-nous</span></Link>
                        <Link to="/dons" className="btn-ghost btn-glass btn-magnetic"><span>Faire un don</span></Link>
                    </div>
                </div>
            </div>

            {/* Annotations with leader lines (desktop) */}
            <div className="sp-annots hidden lg:block" aria-hidden="true">
                <div className="sp-annot sp-annot--a"><span className="sp-annot-dot" />Culte · Dimanche 15h29<span className="sp-annot-line" /></div>
                <div className="sp-annot sp-annot--b"><span className="sp-annot-line" />Touchez l'emblème ↻<span className="sp-annot-dot" /></div>
            </div>

            {/* Slide counter + indicators (accessible tabs) */}
            <div className="sp-ui sp-slider">
                <span className="hero-counter" aria-hidden="true">
                    <span style={{ color: 'var(--color-amber-light)' }}>{fmt(current + 1)}</span> / {fmt(IMAGES.length)}
                </span>
                <div style={{ display: 'flex', gap: '8px' }} role="tablist" aria-label="Diaporama de photos">
                    {IMAGES.map((_, i) => (
                        <button
                            key={i} role="tab" aria-selected={i === current}
                            aria-label={`Photo ${i + 1} sur ${IMAGES.length}`}
                            onClick={() => setCurrent(i)}
                            className="hero-dot" style={{ width: i === current ? '48px' : '14px' }}
                        >
                            {i === current && <span key={current} className="hero-dot-fill" style={{ animationDuration: `${SLIDE_MS}ms` }} />}
                        </button>
                    ))}
                </div>
            </div>

            <div className="sp-ui hero-scroll-cue" aria-hidden="true">
                <span>Défiler</span>
                <div className="scroll-cue-line" />
            </div>

            <div className="sp-ui hero-ribbon" aria-hidden="true">
                <div className="hero-ribbon-track">
                    <span>{RIBBON}{RIBBON}</span>
                    <span>{RIBBON}{RIBBON}</span>
                </div>
            </div>
        </section>
    );
};

export default Banner;
