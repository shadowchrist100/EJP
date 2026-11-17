import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * useScrollReveal — declarative GSAP ScrollTrigger reveals for static markup.
 * Scans the scope once (on mount) for:
 *   data-reveal="chars"  masked letter-by-letter rise (titles)
 *   data-reveal="mask"   clip-path wipe from the bottom; the inner [data-reveal-media]
 *                        (or <img>) de-zooms at the same time — visuals are never cropped
 *                        at rest, the mask is cleared once revealed
 *   data-reveal="up"     fade + rise
 *   data-parallax="12"   scrubbed vertical drift (±12 yPercent) while crossing the viewport
 * Content rendered later (API data) simply shows without the reveal.
 * Disabled under prefers-reduced-motion.
 */
export default function useScrollReveal(scopeRef) {
    useLayoutEffect(() => {
        const scope = scopeRef.current;
        if (!scope) return undefined;
        const mm = gsap.matchMedia();

        const ctx = gsap.context(() => {
            mm.add('(prefers-reduced-motion: no-preference)', () => {
                const q = gsap.utils.selector(scope);
                const once = (trigger, start = 'top 86%') => ({ trigger, start, once: true });

                q('[data-reveal="chars"]').forEach((el) => {
                    const split = SplitText.create(el, { type: 'words,chars', mask: 'chars' });
                    gsap.from(split.chars, {
                        yPercent: 120, rotate: 8, duration: 1.2, ease: 'expo.out', stagger: 0.028,
                        scrollTrigger: once(el, 'top 90%'),
                    });
                });

                q('[data-reveal="mask"]').forEach((el) => {
                    const media = el.querySelector('[data-reveal-media]') || el.querySelector('img');
                    const tl = gsap.timeline({ scrollTrigger: once(el) });
                    tl.fromTo(el,
                        { clipPath: 'inset(100% 0% 0% 0%)' },
                        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.inOut', clearProps: 'clipPath' });
                    if (media) {
                        tl.fromTo(media, { scale: 1.45 }, { scale: 1, duration: 2, ease: 'expo.out', clearProps: 'transform' }, 0);
                    }
                });

                q('[data-reveal="up"]').forEach((el) => {
                    gsap.fromTo(el, { y: 60, opacity: 0 }, {
                        y: 0, opacity: 1, duration: 1.1, ease: 'expo.out', clearProps: 'transform,opacity',
                        scrollTrigger: once(el, 'top 92%'),
                    });
                });

                q('[data-parallax]').forEach((el) => {
                    const amount = Number(el.dataset.parallax) || 10;
                    gsap.fromTo(el, { yPercent: -amount }, {
                        yPercent: amount, ease: 'none',
                        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
                    });
                });
            });
        }, scope);

        // Async content above (API lists, fonts, images) shifts trigger positions.
        let timer;
        const ro = new ResizeObserver(() => {
            clearTimeout(timer);
            timer = setTimeout(() => ScrollTrigger.refresh(), 250);
        });
        ro.observe(document.body);

        return () => {
            clearTimeout(timer);
            ro.disconnect();
            mm.revert();
            ctx.revert();
        };
    }, [scopeRef]);
}
