import { useEffect, useRef, useState } from 'react';

/**
 * LightStory — « De l'ombre à la lumière ».
 * A pinned, scroll-driven film: the visitor's scroll plays the story of a young man transformed by
 * the Word of God (Three.js scene in fx/lightStoryScene.js, loaded on demand). The Scripture texts
 * are real HTML overlays — always crisp and readable — synchronised with the image.
 * This component owns the clock: it smooths the scroll progress and drives both text and scene.
 */

/* Story timeline (0..1 of the pinned scroll). Shared with the scene so text and image stay in sync. */
const STORY = {
    genesis: 0.035,
    ground: 0.12,
    isaiah2: 0.14,
    bibleIn: 0.2,
    bibleLand: 0.27,
    reach: 0.3,
    open: 0.34,
    passages: [
        { at: 0.37, end: 0.45 },
        { at: 0.45, end: 0.53 },
        { at: 0.53, end: 0.61 },
        { at: 0.61, end: 0.69 },
        { at: 0.69, end: 0.77 },
    ],
    stand: 0.81,
    final: 0.86,
};

/* Louis Segond 1910 — in the required order. */
const VERSES = [
    { ref: 'Genèse 1:2', text: "La terre était informe et vide : il y avait des ténèbres à la surface de l'abîme, et l'esprit de Dieu se mouvait au-dessus des eaux.", from: STORY.genesis, to: 0.105 },
    { ref: 'Ésaïe 60:2', text: "Voici, les ténèbres couvrent la terre, et l'obscurité les peuples ; mais sur toi l'Éternel se lève, sur toi sa gloire apparaît.", from: STORY.isaiah2, to: 0.195 },
    { ref: 'Jean 3:16', text: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle." },
    { ref: '2 Timothée 1:7', text: "Car ce n'est pas un esprit de timidité que Dieu nous a donné, mais un esprit de force, d'amour et de sagesse." },
    { ref: '2 Corinthiens 5:17', text: "Si quelqu'un est en Christ, il est une nouvelle créature. Les choses anciennes sont passées ; voici, toutes choses sont devenues nouvelles." },
    { ref: 'Romains 8:1', text: "Il n'y a donc maintenant aucune condamnation pour ceux qui sont en Jésus-Christ." },
    { ref: 'Matthieu 5:14, 16', text: "Vous êtes la lumière du monde. […] Que votre lumière luise ainsi devant les hommes, afin qu'ils voient vos bonnes œuvres, et qu'ils glorifient votre Père qui est dans les cieux." },
    { ref: 'Ésaïe 60:3', text: "Des nations marchent à ta lumière, et des rois à la clarté de tes rayons.", from: STORY.final + 0.005, to: 1.2, final: true },
].map((v, i) => (i >= 2 && i <= 6
    ? { ...v, from: STORY.passages[i - 2].at + 0.006, to: STORY.passages[i - 2].end }
    : v));

const FINAL_FROM = 0.94;
const RAMP = 0.014;

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const smooth = (a, b, v) => { const t = clamp01((v - a) / (b - a)); return t * t * (3 - 2 * t); };
/** 0 → 1 → 0 window with soft edges. */
const windowed = (p, from, to) => smooth(from, from + RAMP, p) * (1 - smooth(to - RAMP, to, p));

const prefersReduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Static version for visitors who prefer reduced motion: the same message, no film. */
const StaticStory = () => (
    <section className="ls ls--static" aria-labelledby="ls-title">
        <div className="section-container">
            <p className="t-eyebrow ls-eyebrow">La puissance transformatrice de la Parole</p>
            <h2 id="ls-title" className="t-display ls-title">De l'ombre <span className="shimmer-gold">à la lumière</span></h2>
            <ol className="ls-static-list">
                {VERSES.map((v) => (
                    <li key={v.ref}>
                        <span className="ls-ref">{v.ref}</span>
                        <p className="ls-text">{v.text}</p>
                    </li>
                ))}
            </ol>
            <p className="ls-final-msg">
                La Parole de Dieu fait passer des ténèbres à la lumière, pour que tu deviennes la lumière qui brille au milieu de ta génération.
            </p>
        </div>
    </section>
);

const Film = () => {
    const sectionRef = useRef(null);
    const stageRef = useRef(null);
    const canvasRef = useRef(null);
    const introRef = useRef(null);
    const fadeRef = useRef(null);
    const finalRef = useRef(null);
    const verseRefs = useRef([]);
    const dotRefs = useRef([]);
    const barRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const host = canvasRef.current;
        if (!section || !host) return undefined;

        const compact = window.matchMedia('(max-width: 768px)').matches;
        let scene = null;
        let cancelled = false;
        import('../../fx/lightStoryScene')
            .then(({ mountLightStory }) => {
                if (cancelled) return;
                try {
                    scene = mountLightStory(host, { compact, story: STORY });
                    stageRef.current?.classList.add('has-gl');
                } catch { /* no WebGL: the text story still plays over the CSS backdrop */ }
            })
            .catch(() => {});

        const target = () => {
            const r = section.getBoundingClientRect();
            const span = r.height - window.innerHeight;
            return span > 0 ? clamp01(-r.top / span) : 0;
        };

        let p = target();
        let raf = 0;
        let running = false;
        let prev = performance.now();
        const t0 = prev;
        const cache = new Map();
        const set = (el, key, value) => {
            if (!el) return;
            const k = el;
            const c = cache.get(k) || {};
            if (c[key] === value) return;
            c[key] = value;
            cache.set(k, c);
            if (key.startsWith('--')) el.style.setProperty(key, value);
            else el.style[key] = value;
        };

        const frame = (now) => {
            const dt = Math.min(0.1, (now - prev) / 1000);
            prev = now;
            const goal = target();
            p += (goal - p) * (1 - Math.exp(-dt * 4.5));
            if (Math.abs(goal - p) < 0.00005) p = goal;

            // overlays
            const intro = 1 - smooth(0.012, 0.03, p);
            set(introRef.current, 'opacity', intro.toFixed(3));
            set(introRef.current, 'visibility', intro > 0.001 ? 'visible' : 'hidden');
            const fade = smooth(0.1, 0.118, p) * (1 - smooth(0.122, 0.148, p));
            set(fadeRef.current, 'opacity', fade.toFixed(3));
            let active = -1;
            VERSES.forEach((v, i) => {
                const el = verseRefs.current[i];
                const o = windowed(p, v.from, v.to);
                if (o > 0.5) active = i;
                set(el, 'opacity', o.toFixed(3));
                set(el, 'visibility', o > 0.001 ? 'visible' : 'hidden');
                set(el, '--o', o.toFixed(3));
                // word-by-word illumination across the first part of the window
                const local = clamp01((p - v.from) / ((v.final ? 0.06 : (v.to - v.from) * 0.55)));
                set(el, '--lp', local.toFixed(3));
            });
            const fin = smooth(FINAL_FROM, FINAL_FROM + 0.03, p);
            set(finalRef.current, 'opacity', fin.toFixed(3));
            set(finalRef.current, 'visibility', fin > 0.001 ? 'visible' : 'hidden');
            dotRefs.current.forEach((d, i) => d?.classList.toggle('is-on', i === active || p >= VERSES[i].from + 0.01));
            set(barRef.current, 'transform', `scaleY(${p.toFixed(4)})`);
            set(stageRef.current, '--ls-l', smooth(STORY.open, 0.95, p).toFixed(3));

            scene?.render(p, (now - t0) / 1000);
            raf = running ? requestAnimationFrame(frame) : 0;
        };

        const io = new IntersectionObserver(([entry]) => {
            running = entry.isIntersecting;
            if (running && !raf) { prev = performance.now(); p = target(); raf = requestAnimationFrame(frame); }
        }, { rootMargin: '200px 0px' });
        io.observe(section);

        return () => {
            cancelled = true;
            running = false;
            io.disconnect();
            cancelAnimationFrame(raf);
            scene?.dispose();
            scene = null;
        };
    }, []);

    const scrollToProgress = (q) => {
        const section = sectionRef.current;
        if (!section) return;
        const top = section.getBoundingClientRect().top + window.scrollY;
        const span = section.offsetHeight - window.innerHeight;
        window.scrollTo({ top: top + span * q, behavior: 'smooth' });
    };

    const skipStory = () => {
        const section = sectionRef.current;
        if (!section) return;
        const top = section.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: top + section.offsetHeight, behavior: 'smooth' });
    };

    return (
        <section ref={sectionRef} className="ls" aria-labelledby="ls-title">
            <div ref={stageRef} className="ls-stage">
                <div className="ls-backdrop" aria-hidden="true" />
                <div ref={canvasRef} className="ls-canvas" aria-hidden="true" />
                <div className="ls-vignette" aria-hidden="true" />

                <header ref={introRef} className="ls-intro">
                    <p className="t-eyebrow ls-eyebrow">La puissance transformatrice de la Parole</p>
                    <h2 id="ls-title" className="t-display ls-title">
                        De l'ombre <span className="shimmer-gold">à la lumière</span>
                    </h2>
                    <p className="ls-cue"><span className="ls-cue-line" aria-hidden="true" />Fais défiler pour vivre l'histoire</p>
                </header>

                {VERSES.map((v, i) => {
                    const words = v.text.split(' ');
                    return (
                        <article
                            key={v.ref}
                            ref={(el) => { verseRefs.current[i] = el; }}
                            className={`ls-verse${v.final ? ' ls-verse--final' : ''}${i < 2 ? ' ls-verse--prologue' : ''}`}
                        >
                            <span className="ls-ref">{v.ref}</span>
                            <p className="ls-text">
                                {words.map((w, k) => (
                                    <span key={k} className="ls-w" style={{ '--k': (k / words.length).toFixed(3) }}>{w} </span>
                                ))}
                            </p>
                        </article>
                    );
                })}

                <p ref={finalRef} className="ls-final-msg">
                    La Parole de Dieu fait passer des ténèbres à la lumière, pour que tu deviennes <em>la lumière</em> qui brille au milieu de ta génération.
                </p>

                <div ref={fadeRef} className="ls-fade" aria-hidden="true" />

                <nav className="ls-progress" aria-label="Passages de l'histoire">
                    <span className="ls-progress-track" aria-hidden="true"><span ref={barRef} className="ls-progress-bar" /></span>
                    {VERSES.map((v, i) => (
                        <button
                            key={v.ref}
                            type="button"
                            ref={(el) => { dotRefs.current[i] = el; }}
                            className="ls-dot"
                            onClick={() => scrollToProgress(v.from + 0.02)}
                            aria-label={v.ref}
                        >
                            <span className="ls-dot-label">{v.ref}</span>
                        </button>
                    ))}
                </nav>

                <button type="button" className="ls-skip" onClick={skipStory}>
                    Passer l'histoire
                </button>
            </div>
        </section>
    );
};

const LightStory = () => {
    const [reduced] = useState(prefersReduced);
    return reduced ? <StaticStory /> : <Film />;
};

export default LightStory;
