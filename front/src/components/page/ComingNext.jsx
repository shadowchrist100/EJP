import { useState, useEffect, useRef } from 'react';
import { Clock, MapPin, ChevronRight } from 'lucide-react';

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

    return (
        <section className="relative bg-black min-h-screen flex flex-col items-center justify-center py-24 px-6 overflow-hidden">
            {/* Grille fond */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `linear-gradient(90deg, rgba(217,119,6,0.1) 1px, transparent 1px), linear-gradient(rgba(217,119,6,0.1) 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />

            <div className="relative w-full max-w-7xl mx-auto" style={{ zIndex: 1 }}>
                {/* Titre */}
                <div className="text-center mb-20">
                    <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4">PROCHAINEMENT</h2>
                    <p className="text-amber-500 text-sm md:text-base font-bold uppercase tracking-[0.3em]">
                        Découvrez nos rendez-vous à venir
                    </p>
                </div>

                {/* ✅ Stage — PAS de overflow-hidden ni rounded ici, on les met sur un wrapper interne */}
                <div
                    className="mb-16"
                    style={{
                        position: 'relative',
                        height: '500px',
                        borderRadius: '1.5rem',
                        // overflow hidden retiré — c'était lui le problème
                        boxShadow: '0 25px 60px rgba(217,119,6,0.2)',
                    }}
                >
                    {/* Couche image — clipper séparément */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '1.5rem',
                        overflow: 'hidden',  // overflow-hidden uniquement ici, pas sur le parent
                    }}>
                        <img
                            key={currentIndex}
                            src={currentEvent.image}
                            alt={currentEvent.title}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block',
                                animation: `${direction === 'next' ? 'fadeImgDown' : 'fadeImgUp'} 0.9s ease forwards`,
                            }}
                        />
                        {/* Overlay gradient dans le même contexte que l'image */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.1) 100%)',
                        }} />
                    </div>

                    {/* Couche texte — hors du overflow-hidden */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: '2rem',
                        zIndex: 2,
                    }}>
                        {/* Haut */}
                        <div>
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                background: 'rgba(217,119,6,0.2)',
                                border: '1px solid rgba(217,119,6,0.5)',
                                padding: '0.5rem 1.5rem',
                                borderRadius: '999px',
                                marginBottom: '2rem',
                            }}>
                                <span style={{ position: 'relative', display: 'flex', width: 8, height: 8 }}>
                                    <span className="animate-ping" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#fbbf24', opacity: 0.75 }} />
                                    <span style={{ position: 'relative', width: 8, height: 8, borderRadius: '50%', background: '#f59e0b', display: 'block' }} />
                                </span>
                                <span style={{ color: '#fbbf24', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                                    Prochain rendez-vous
                                </span>
                            </div>

                            <h3 style={{
                                fontSize: 'clamp(2rem, 6vw, 4rem)',
                                fontWeight: 900,
                                color: '#ffffff',
                                letterSpacing: '-0.03em',
                                lineHeight: 1.05,
                                textShadow: '0 4px 20px rgba(0,0,0,0.8)',
                                margin: 0,
                            }}>
                                {currentEvent.title}
                            </h3>
                        </div>

                        {/* Bas */}
                        <div>
                            <p style={{
                                color: '#e5e7eb',
                                fontSize: '1.1rem',
                                fontStyle: 'italic',
                                fontWeight: 300,
                                borderLeft: '4px solid #d97706',
                                paddingLeft: '1rem',
                                marginBottom: '1.5rem',
                                lineHeight: 1.6,
                                maxWidth: '32rem',
                            }}>
                                {currentEvent.description}
                            </p>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center' }}>
                                {/* Date */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{
                                        background: '#d97706', color: '#000',
                                        width: 44, height: 44, borderRadius: 8,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontWeight: 900, fontSize: '1rem', flexShrink: 0,
                                    }}>
                                        {currentEvent.day}
                                    </div>
                                    <div>
                                        <p style={{ color: '#fff', fontWeight: 700, margin: 0 }}>{monthNames[currentEvent.month]} {currentEvent.year}</p>
                                        <p style={{ color: '#9ca3af', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Date</p>
                                    </div>
                                </div>

                                {/* Heure */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <Clock style={{ color: '#f59e0b', flexShrink: 0 }} size={22} />
                                    <div>
                                        <p style={{ color: '#fff', fontWeight: 700, margin: 0 }}>{currentEvent.time}</p>
                                        <p style={{ color: '#9ca3af', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Heure</p>
                                    </div>
                                </div>

                                {/* Lieu */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <MapPin style={{ color: '#f59e0b', flexShrink: 0 }} size={22} />
                                    <div>
                                        <p style={{ color: '#fff', fontWeight: 700, margin: 0 }}>{currentEvent.location}</p>
                                        <p style={{ color: '#9ca3af', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Lieu</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div style={{
                        position: 'absolute',
                        bottom: '1.5rem',
                        right: '1.5rem',
                        zIndex: 3,
                        display: 'flex',
                        gap: '0.5rem',
                    }}>
                        <button
                            onClick={handlePrev}
                            onMouseEnter={() => setIsAutoPlay(false)}
                            className="hover:bg-amber-600 transition-all duration-300"
                            style={{
                                width: 40, height: 40, borderRadius: '50%',
                                background: 'rgba(255,255,255,0.12)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: '#fff', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}
                        >
                            <ChevronRight size={18} style={{ transform: 'rotate(180deg)' }} />
                        </button>
                        <button
                            onClick={handleNext}
                            onMouseEnter={() => setIsAutoPlay(false)}
                            className="hover:bg-amber-600 transition-all duration-300"
                            style={{
                                width: 40, height: 40, borderRadius: '50%',
                                background: 'rgba(255,255,255,0.12)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: '#fff', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>

                {/* Dots */}
                <div className="flex flex-wrap justify-center items-center gap-3 mb-16">
                    {events.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleDotClick(index)}
                            onMouseEnter={() => setIsAutoPlay(false)}
                            style={{
                                height: 10,
                                width: index === currentIndex ? 36 : 10,
                                borderRadius: 999,
                                background: index === currentIndex ? '#f59e0b' : 'rgba(255,255,255,0.2)',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                padding: 0,
                            }}
                        />
                    ))}
                </div>

                {/* Infos bas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h4 style={{ color: '#d97706', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.25em', marginBottom: '1rem' }}>
                            À propos
                        </h4>
                        <p style={{ color: '#d1d5db', fontSize: '1rem', fontWeight: 300, lineHeight: 1.7 }}>
                            {currentEvent.description}
                        </p>
                    </div>
                    <div>
                        <h4 style={{ color: '#d97706', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.25em', marginBottom: '1rem' }}>
                            Infos pratiques
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {[
                                `Date : ${currentEvent.day} ${monthNames[currentEvent.month]} ${currentEvent.year}`,
                                `Heure : ${currentEvent.time}`,
                                `Lieu : ${currentEvent.location}`,
                            ].map((item, i) => (
                                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#d1d5db', fontWeight: 300 }}>
                                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#f59e0b', flexShrink: 0, display: 'block' }} />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeImgDown {
                    from { opacity: 0; transform: scale(1.04) translateY(10px); }
                    to   { opacity: 1; transform: scale(1) translateY(0); }
                }
                @keyframes fadeImgUp {
                    from { opacity: 0; transform: scale(1.04) translateY(-10px); }
                    to   { opacity: 1; transform: scale(1) translateY(0); }
                }
            `}</style>
        </section>
    );
};

export default ComingNext;