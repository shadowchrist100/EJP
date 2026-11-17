import { useState, useEffect } from 'react';
import { Clock, MapPin, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TiltCard from '../../fx/TiltCard';

const MONTHS = ['JAN', 'FÉV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUL', 'AOU', 'SEP', 'OCT', 'NOV', 'DÉC'];
const AUTOPLAY_MS = 8000;
const EASE = [0.77, 0, 0.18, 1];

// Poster transition: the incoming poster wipes in over the outgoing one (direction-aware).
const wipe = {
    enter: (dir) => ({ clipPath: dir === 'next' ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)', scale: 1.3, zIndex: 2 }),
    center: {
        clipPath: 'inset(0% 0% 0% 0%)', scale: 1.06, zIndex: 2,
        transition: { clipPath: { duration: 1.1, ease: EASE }, scale: { duration: 1.6, ease: [0.16, 1, 0.3, 1] } },
    },
    exit: (dir) => ({ x: dir === 'next' ? '-14%' : '14%', opacity: 0.35, zIndex: 1, transition: { duration: 1.1, ease: EASE } }),
};

const rise = (delay = 0) => ({
    initial: { y: '110%', opacity: 0 },
    animate: { y: '0%', opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay } },
    exit: { y: '-60%', opacity: 0, transition: { duration: 0.4, ease: EASE } },
});

/**
 * ComingNext — "stage" carousel: posters wipe in like a scene change, a spotlight
 * follows the cursor, a giant outlined day number sits in the back plane.
 */
const ComingNext = ({ events }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState('next');
    const [isAutoPlay, setIsAutoPlay] = useState(true);

    const count = events.length;
    const index = count ? currentIndex % count : 0;
    const currentEvent = events[index];

    useEffect(() => {
        if (!isAutoPlay || count < 2) return undefined;
        const id = setInterval(() => {
            setDirection('next');
            setCurrentIndex((prev) => (prev + 1) % count);
        }, AUTOPLAY_MS);
        return () => clearInterval(id);
    }, [isAutoPlay, count]);

    if (!currentEvent) return null;

    const handleNext = () => {
        setIsAutoPlay(false);
        setDirection('next');
        setCurrentIndex((prev) => (prev + 1) % count);
    };

    const handlePrev = () => {
        setIsAutoPlay(false);
        setDirection('prev');
        setCurrentIndex((prev) => (prev - 1 + count) % count);
    };

    const handleDotClick = (i) => {
        setIsAutoPlay(false);
        setDirection(i > index ? 'next' : 'prev');
        setCurrentIndex(i);
    };

    const infos = [
        `Date : ${currentEvent.day} ${MONTHS[currentEvent.month]} ${currentEvent.year}`,
        `Heure : ${currentEvent.time}`,
        `Lieu : ${currentEvent.location}`,
    ];

    return (
        <section className="cn-section">
            <div className="ev-grid-bg" aria-hidden="true" />
            <div className="relative w-full max-w-7xl mx-auto" style={{ zIndex: 1 }}>
                <div className="text-center mb-16 md:mb-20">
                    <h2 className="ev-h2" data-reveal="chars">PROCHAINEMENT</h2>
                    <p className="ev-kicker" data-reveal="up">Découvrez nos rendez-vous à venir</p>
                </div>

                {/* Stage */}
                <div data-reveal="up">
                    <TiltCard max={3} className="cn-stage gold-border">
                        <div className="cn-media">
                            <AnimatePresence initial={false} custom={direction}>
                                <motion.img
                                    key={index}
                                    src={currentEvent.image}
                                    alt={currentEvent.title}
                                    custom={direction}
                                    variants={wipe}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    className="cn-img"
                                />
                            </AnimatePresence>
                            <div className="cn-shade" aria-hidden="true" />
                        </div>
                        <span className="cn-spot" aria-hidden="true" />

                        {/* Back plane: giant outlined day number */}
                        <div className="cn-bignum-wrap" aria-hidden="true">
                            <AnimatePresence mode="wait">
                                <motion.span key={`n-${index}`} className="cn-bignum" {...rise(0.15)}>
                                    {String(currentEvent.day).padStart(2, '0')}
                                </motion.span>
                            </AnimatePresence>
                        </div>

                        <div className="cn-content">
                            <div>
                                <div className="cn-badge">
                                    <span className="cn-badge-dot" aria-hidden="true" />
                                    Prochain rendez-vous
                                </div>
                                <div className="cn-mask">
                                    <AnimatePresence mode="wait">
                                        <motion.h3 key={`t-${index}`} className="cn-title" {...rise(0.2)}>
                                            {currentEvent.title}
                                        </motion.h3>
                                    </AnimatePresence>
                                </div>
                            </div>

                            <div>
                                <div className="cn-mask">
                                    <AnimatePresence mode="wait">
                                        <motion.p key={`d-${index}`} className="cn-desc" {...rise(0.32)}>
                                            {currentEvent.description}
                                        </motion.p>
                                    </AnimatePresence>
                                </div>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`i-${index}`}
                                        className="cn-infos"
                                        initial="hidden" animate="visible" exit="hidden"
                                        variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } }, hidden: {} }}
                                    >
                                        <motion.div className="cn-info glass-gold" variants={chip}>
                                            <span className="cn-info-day">{currentEvent.day}</span>
                                            <div>
                                                <p className="cn-info-val">{MONTHS[currentEvent.month]} {currentEvent.year}</p>
                                                <p className="cn-info-label">Date</p>
                                            </div>
                                        </motion.div>
                                        <motion.div className="cn-info glass-gold" variants={chip}>
                                            <Clock className="text-amber-500 shrink-0" size={22} />
                                            <div>
                                                <p className="cn-info-val">{currentEvent.time}</p>
                                                <p className="cn-info-label">Heure</p>
                                            </div>
                                        </motion.div>
                                        <motion.div className="cn-info glass-gold" variants={chip}>
                                            <MapPin className="text-amber-500 shrink-0" size={22} />
                                            <div>
                                                <p className="cn-info-val">{currentEvent.location}</p>
                                                <p className="cn-info-label">Lieu</p>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        {count > 1 && (
                            <div className="cn-nav">
                                <button type="button" onClick={handlePrev} onMouseEnter={() => setIsAutoPlay(false)} className="cn-nav-btn" aria-label="Événement précédent">
                                    <ChevronRight size={18} style={{ transform: 'rotate(180deg)' }} />
                                </button>
                                <button type="button" onClick={handleNext} onMouseEnter={() => setIsAutoPlay(false)} className="cn-nav-btn" aria-label="Événement suivant">
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        )}

                        {isAutoPlay && count > 1 && (
                            <span key={`p-${index}`} className="cn-progress" style={{ animationDuration: `${AUTOPLAY_MS}ms` }} aria-hidden="true" />
                        )}
                    </TiltCard>
                </div>

                {/* Dots */}
                <div className="flex flex-wrap justify-center items-center gap-3 mt-10 mb-16">
                    {events.map((ev, i) => (
                        <button
                            key={ev.id ?? i}
                            type="button"
                            onClick={() => handleDotClick(i)}
                            onMouseEnter={() => setIsAutoPlay(false)}
                            className={`cn-dot ${i === index ? 'is-active' : ''}`}
                            aria-label={`Afficher : ${ev.title}`}
                            aria-current={i === index}
                        />
                    ))}
                </div>

                {/* Bottom info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div className="cn-panel glass-gold gold-border" data-reveal="up">
                        <h4 className="cn-panel-title">À propos</h4>
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={`a-${index}`}
                                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.45 }}
                                className="text-gray-300 font-light leading-relaxed"
                            >
                                {currentEvent.description}
                            </motion.p>
                        </AnimatePresence>
                    </div>
                    <div className="cn-panel glass-gold gold-border" data-reveal="up">
                        <h4 className="cn-panel-title">Infos pratiques</h4>
                        <ul className="flex flex-col gap-3">
                            {infos.map((item, i) => (
                                <li key={i} className="cn-panel-li">
                                    <span className="cn-panel-dot" style={{ animationDelay: `${i * 0.2}s` }} aria-hidden="true" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

const chip = {
    hidden: { opacity: 0, y: 24, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 160, damping: 16 } },
};

export default ComingNext;
