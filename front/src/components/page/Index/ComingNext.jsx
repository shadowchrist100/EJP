import { useState, useEffect, useRef } from 'react';
import { Clock, MapPin, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ComingNext = ({ events }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState('next');
    const [isAutoPlay, setIsAutoPlay] = useState(true);
    const autoPlayRef = useRef(null);
    const monthNames = ['JAN', 'FÉV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUL', 'AOU', 'SEP', 'OCT', 'NOV', 'DÉC'];

    const currentEvent = events[currentIndex];

    useEffect(() => {
        if (!isAutoPlay) return;
        autoPlayRef.current = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % events.length);
            setDirection('next');
        }, 8000);
        return () => clearInterval(autoPlayRef.current);
    }, [isAutoPlay, events.length]);

    const handleNext = () => {
        setIsAutoPlay(false);
        setDirection('next');
        setCurrentIndex(prev => (prev + 1) % events.length);
    };

    const handlePrev = () => {
        setIsAutoPlay(false);
        setDirection('prev');
        setCurrentIndex(prev => (prev - 1 + events.length) % events.length);
    };

    const handleDotClick = (index) => {
        setIsAutoPlay(false);
        setDirection(index > currentIndex ? 'next' : 'prev');
        setCurrentIndex(index);
    };

    // ============ ANIMATION VARIANTS ============

    // 1. Page entrance
    const pageVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
            },
        },
    };

    // 2. Title avec scale et fade
    const titleVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 80,
                damping: 15,
            },
        },
    };

    // 3. Subtitle
    const subtitleVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
            },
        },
    };

    // 4. Stage (carousel) avec scale
    const stageVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 90,
                damping: 14,
            },
        },
        hover: {
            boxShadow: '0 30px 80px rgba(217, 119, 6, 0.3)',
            transition: { duration: 0.3 },
        },
    };

    // 5. Image slide transitions
    const imageVariants = {
        enterNext: { opacity: 0, x: 100, scale: 0.95 },
        enterPrev: { opacity: 0, x: -100, scale: 0.95 },
        center: { opacity: 1, x: 0, scale: 1 },
        exitNext: { opacity: 0, x: -100, scale: 0.95 },
        exitPrev: { opacity: 0, x: 100, scale: 0.95 },
    };

    // 6. Content fade in sur l'image
    const contentOverlayVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.6, delay: 0.2 },
        },
    };

    // 7. Badge pulse
    const badgeVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 150,
                damping: 12,
            },
        },
        pulse: {
            scale: [1, 1.05, 1],
            transition: {
                duration: 2,
                repeat: Infinity,
            },
        },
    };

    // 8. Title avec gradient effect
    const eventTitleVariants = {
        hidden: { opacity: 0, y: 20, letterSpacing: '-0.05em' },
        visible: {
            opacity: 1,
            y: 0,
            letterSpacing: '0em',
            transition: {
                type: 'spring',
                stiffness: 70,
                damping: 18,
                delay: 0.1,
            },
        },
    };

    // 9. Description
    const descriptionVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
                delay: 0.15,
            },
        },
    };

    // 10. Info items container avec stagger
    const infoContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const infoItemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 12,
            },
        },
        hover: {
            x: 5,
            transition: { type: 'spring', stiffness: 300, damping: 10 },
        },
    };

    // 11. Navigation buttons
    const buttonVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 150,
                damping: 12,
            },
        },
        hover: {
            scale: 1.1,
            backgroundColor: '#d97706',
            transition: { type: 'spring', stiffness: 300, damping: 10 },
        },
        tap: { scale: 0.9 },
    };

    // 12. Dots avec pulse active
    const dotContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.3,
            },
        },
    };

    const dotVariants = {
        hidden: { opacity: 0, scale: 0.5 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 150,
                damping: 12,
            },
        },
        active: {
            backgroundColor: '#f59e0b',
            boxShadow: '0 0 20px rgba(245, 158, 11, 0.6)',
            transition: { duration: 0.3 },
        },
        inactive: {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            boxShadow: 'none',
            transition: { duration: 0.3 },
        },
        hover: {
            scale: 1.2,
            transition: { type: 'spring', stiffness: 300, damping: 10 },
        },
    };

    // 13. Bottom info section avec stagger
    const bottomSectionVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.4,
            },
        },
    };

    const infoSectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
            },
        },
    };

    // 14. List items
    const listItemVariants = {
        hidden: { opacity: 0, x: -15 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 12,
            },
        },
        hover: {
            x: 5,
            transition: { type: 'spring', stiffness: 300, damping: 10 },
        },
    };

    return (
        <motion.section
            className="relative bg-black min-h-screen flex flex-col items-center justify-center py-24 px-6 overflow-hidden"
            variants={pageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            {/* Grille fond */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `linear-gradient(90deg, rgba(217,119,6,0.1) 1px, transparent 1px), linear-gradient(rgba(217,119,6,0.1) 1px, transparent 1px)`,
                    backgroundSize: '80px 80px',
                }}
            />

            <div className="relative w-full max-w-7xl mx-auto" style={{ zIndex: 1 }}>
                {/* Titre */}
                <div className="text-center mb-20">
                    <motion.h2
                        variants={titleVariants}
                        className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4"
                    >
                        PROCHAINEMENT
                    </motion.h2>
                    <motion.p
                        variants={subtitleVariants}
                        className="text-amber-500 text-sm md:text-base font-bold uppercase tracking-[0.3em]"
                    >
                        Découvrez nos rendez-vous à venir
                    </motion.p>
                </div>

                {/* Stage Carousel */}
                <motion.div
                    variants={stageVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    viewport={{ once: true }}
                    className="mb-16"
                    style={{
                        position: 'relative',
                        height: '500px',
                        borderRadius: '1.5rem',
                        boxShadow: '0 25px 60px rgba(217,119,6,0.2)',
                    }}
                >
                    {/* Image Container */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '1.5rem',
                            overflow: 'hidden',
                        }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentIndex}
                                src={currentEvent.image}
                                alt={currentEvent.title}
                                variants={imageVariants}
                                initial={direction === 'next' ? 'enterNext' : 'enterPrev'}
                                animate="center"
                                exit={direction === 'next' ? 'exitNext' : 'exitPrev'}
                                transition={{
                                    x: { type: 'spring', stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.5 },
                                    scale: { type: 'spring', stiffness: 200, damping: 25 },
                                }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    display: 'block',
                                }}
                            />
                        </AnimatePresence>

                        {/* Overlay gradient */}
                        <motion.div
                            style={{
                                position: 'absolute',
                                inset: 0,
                                background:
                                    'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.1) 100%)',
                            }}
                        />
                    </div>

                    {/* Content Overlay */}
                    <motion.div
                        variants={contentOverlayVariants}
                        initial="hidden"
                        animate="visible"
                        key={currentIndex}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            padding: '2rem',
                            zIndex: 2,
                        }}
                    >
                        {/* Haut */}
                        <div>
                            <motion.div
                                variants={badgeVariants}
                                initial="hidden"
                                animate={['visible', 'pulse']}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    background: 'rgba(217,119,6,0.2)',
                                    border: '1px solid rgba(217,119,6,0.5)',
                                    padding: '0.5rem 1.5rem',
                                    borderRadius: '999px',
                                    marginBottom: '2rem',
                                }}
                            >
                                <span style={{ position: 'relative', display: 'flex', width: 8, height: 8 }}>
                                    <motion.span
                                        animate={{ scale: [1, 1.5, 1], opacity: [0.75, 0, 0.75] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                        style={{
                                            position: 'absolute',
                                            inset: 0,
                                            borderRadius: '50%',
                                            background: '#fbbf24',
                                        }}
                                    />
                                    <span
                                        style={{
                                            position: 'relative',
                                            width: 8,
                                            height: 8,
                                            borderRadius: '50%',
                                            background: '#f59e0b',
                                            display: 'block',
                                        }}
                                    />
                                </span>
                                <motion.span
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    style={{
                                        color: '#fbbf24',
                                        fontSize: '0.7rem',
                                        fontWeight: 800,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.15em',
                                    }}
                                >
                                    Prochain rendez-vous
                                </motion.span>
                            </motion.div>

                            <motion.h3
                                variants={eventTitleVariants}
                                initial="hidden"
                                animate="visible"
                                key={`title-${currentIndex}`}
                                style={{
                                    fontSize: 'clamp(2rem, 6vw, 4rem)',
                                    fontWeight: 900,
                                    color: '#ffffff',
                                    letterSpacing: '-0.03em',
                                    lineHeight: 1.05,
                                    textShadow: '0 4px 20px rgba(0,0,0,0.8)',
                                    margin: 0,
                                }}
                            >
                                {currentEvent.title}
                            </motion.h3>
                        </div>

                        {/* Bas */}
                        <motion.div
                            variants={contentOverlayVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.p
                                variants={descriptionVariants}
                                key={`desc-${currentIndex}`}
                                style={{
                                    color: '#e5e7eb',
                                    fontSize: '1.1rem',
                                    fontStyle: 'italic',
                                    fontWeight: 300,
                                    borderLeft: '4px solid #d97706',
                                    paddingLeft: '1rem',
                                    marginBottom: '1.5rem',
                                    lineHeight: 1.6,
                                    maxWidth: '32rem',
                                }}
                            >
                                {currentEvent.description}
                            </motion.p>

                            <motion.div
                                variants={infoContainerVariants}
                                initial="hidden"
                                animate="visible"
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '2rem',
                                    alignItems: 'center',
                                }}
                            >
                                {/* Date */}
                                <motion.div
                                    variants={infoItemVariants}
                                    whileHover="hover"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                    }}
                                >
                                    <div
                                        style={{
                                            background: '#d97706',
                                            color: '#000',
                                            width: 44,
                                            height: 44,
                                            borderRadius: 8,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 900,
                                            fontSize: '1rem',
                                            flexShrink: 0,
                                        }}
                                    >
                                        {currentEvent.day}
                                    </div>
                                    <div>
                                        <p style={{ color: '#fff', fontWeight: 700, margin: 0 }}>
                                            {monthNames[currentEvent.month]} {currentEvent.year}
                                        </p>
                                        <p
                                            style={{
                                                color: '#9ca3af',
                                                fontSize: '0.65rem',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.1em',
                                                margin: 0,
                                            }}
                                        >
                                            Date
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Heure */}
                                <motion.div
                                    variants={infoItemVariants}
                                    whileHover="hover"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                    }}
                                >
                                    <Clock style={{ color: '#f59e0b', flexShrink: 0 }} size={22} />
                                    <div>
                                        <p style={{ color: '#fff', fontWeight: 700, margin: 0 }}>
                                            {currentEvent.time}
                                        </p>
                                        <p
                                            style={{
                                                color: '#9ca3af',
                                                fontSize: '0.65rem',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.1em',
                                                margin: 0,
                                            }}
                                        >
                                            Heure
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Lieu */}
                                <motion.div
                                    variants={infoItemVariants}
                                    whileHover="hover"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                    }}
                                >
                                    <MapPin style={{ color: '#f59e0b', flexShrink: 0 }} size={22} />
                                    <div>
                                        <p style={{ color: '#fff', fontWeight: 700, margin: 0 }}>
                                            {currentEvent.location}
                                        </p>
                                        <p
                                            style={{
                                                color: '#9ca3af',
                                                fontSize: '0.65rem',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.1em',
                                                margin: 0,
                                            }}
                                        >
                                            Lieu
                                        </p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Navigation Buttons */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        style={{
                            position: 'absolute',
                            bottom: '1.5rem',
                            right: '1.5rem',
                            zIndex: 3,
                            display: 'flex',
                            gap: '0.5rem',
                        }}
                    >
                        <motion.button
                            variants={buttonVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover="hover"
                            whileTap="tap"
                            transition={{ delay: 0.55 }}
                            onClick={handlePrev}
                            onMouseEnter={() => setIsAutoPlay(false)}
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                background: 'rgba(255,255,255,0.12)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: '#fff',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <ChevronRight size={18} style={{ transform: 'rotate(180deg)' }} />
                        </motion.button>
                        <motion.button
                            variants={buttonVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover="hover"
                            whileTap="tap"
                            transition={{ delay: 0.6 }}
                            onClick={handleNext}
                            onMouseEnter={() => setIsAutoPlay(false)}
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                background: 'rgba(255,255,255,0.12)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: '#fff',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <ChevronRight size={18} />
                        </motion.button>
                    </motion.div>
                </motion.div>

                {/* Dots Carousel */}
                <motion.div
                    variants={dotContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center items-center gap-3 mb-16"
                >
                    {events.map((_, index) => (
                        <motion.button
                            key={index}
                            variants={dotVariants}
                            animate={index === currentIndex ? ['visible', 'active'] : ['visible', 'inactive']}
                            whileHover="hover"
                            onClick={() => handleDotClick(index)}
                            onMouseEnter={() => setIsAutoPlay(false)}
                            style={{
                                height: 10,
                                width: index === currentIndex ? 36 : 10,
                                borderRadius: 999,
                                background: index === currentIndex ? '#f59e0b' : 'rgba(255,255,255,0.2)',
                                border: 'none',
                                cursor: 'pointer',
                                padding: 0,
                            }}
                        />
                    ))}
                </motion.div>

                {/* Bottom Info Section */}
                <motion.div
                    variants={bottomSectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-12"
                >
                    {/* About */}
                    <motion.div variants={infoSectionVariants}>
                        <motion.h4
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            style={{
                                color: '#d97706',
                                fontSize: '0.7rem',
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                letterSpacing: '0.25em',
                                marginBottom: '1rem',
                            }}
                        >
                            À propos
                        </motion.h4>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            viewport={{ once: true }}
                            style={{
                                color: '#d1d5db',
                                fontSize: '1rem',
                                fontWeight: 300,
                                lineHeight: 1.7,
                            }}
                        >
                            {currentEvent.description}
                        </motion.p>
                    </motion.div>

                    {/* Info Pratiques */}
                    <motion.div variants={infoSectionVariants}>
                        <motion.h4
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            style={{
                                color: '#d97706',
                                fontSize: '0.7rem',
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                letterSpacing: '0.25em',
                                marginBottom: '1rem',
                            }}
                        >
                            Infos pratiques
                        </motion.h4>
                        <motion.ul
                            style={{
                                listStyle: 'none',
                                padding: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.75rem',
                            }}
                        >
                            {[
                                `Date : ${currentEvent.day} ${monthNames[currentEvent.month]} ${currentEvent.year}`,
                                `Heure : ${currentEvent.time}`,
                                `Lieu : ${currentEvent.location}`,
                            ].map((item, i) => (
                                <motion.li
                                    key={i}
                                    variants={listItemVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    whileHover="hover"
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        color: '#d1d5db',
                                        fontWeight: 300,
                                    }}
                                >
                                    <motion.span
                                        style={{
                                            width: 6,
                                            height: 6,
                                            borderRadius: '50%',
                                            background: '#f59e0b',
                                            flexShrink: 0,
                                            display: 'block',
                                        }}
                                        animate={{ scale: [1, 1.5, 1] }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            delay: i * 0.2,
                                        }}
                                    />
                                    {item}
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default ComingNext;