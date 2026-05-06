import React, { useState, useEffect } from 'react';
import FadeIn from '../../common/FadeIn';

const CountdownSection = () => {
    const getTarget = () => {
        const now = new Date();
        const next = new Date();
        const day = now.getDay(); // 0=Sun
        const daysUntilSun = day === 0 ? 7 : 7 - day;
        next.setDate(now.getDate() + daysUntilSun);
        next.setHours(15, 29, 0, 0);
        return next;
    };

    const calc = () => {
        const diff = getTarget() - new Date();
        if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        return {
            days: Math.floor(diff / 86400000),
            hours: Math.floor((diff / 3600000) % 24),
            minutes: Math.floor((diff / 60000) % 60),
            seconds: Math.floor((diff / 1000) % 60),
        };
    };

    const [time, setTime] = useState(calc());
    const fmt = (n) => String(n).padStart(2, '0');

    useEffect(() => {
        const id = setInterval(() => setTime(calc()), 1000);
        return () => clearInterval(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const units = [
        { label: 'Jours', value: time.days },
        { label: 'Heures', value: time.hours },
        { label: 'Minutes', value: time.minutes },
        { label: 'Secondes', value: time.seconds },
    ];

    return (
        <section className="relative bg-zinc-950 py-20 overflow-hidden border-t border-white/4">
            {/* Ambient */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-600/5 rounded-full blur-[100px]" />
                <div className="absolute inset-0 opacity-[0.015]"
                    style={{ backgroundImage: 'repeating-linear-gradient(0deg, #d97706 0, #d97706 1px, transparent 0, transparent 40px)' }} />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                {/* Header */}
                <FadeIn delay={0.2} direction="up" className="mb-12">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="w-8 h-px bg-amber-600/50" />
                        <span className="text-amber-500/70 text-[9px] font-black uppercase tracking-[0.5em]">Prochain culte</span>
                        <div className="w-8 h-px bg-amber-600/50" />
                    </div>
                    <h2 className="font-display text-[clamp(2rem,6vw,4.5rem)] text-white leading-none tracking-wide uppercase">
                        EJP Porto-Novo
                    </h2>
                    <p className="text-gray-600 text-xs tracking-[0.3em] uppercase mt-2 font-bold">
                        Église des Jeunes Prodiges
                    </p>
                </FadeIn>

                {/* Timer */}
                <FadeIn delay={0.4} direction="up" className="inline-flex items-end gap-0 border border-white/6 bg-black/40">
                    {units.map(({ label, value }, i) => (
                        <React.Fragment key={label}>
                            <div className="flex flex-col items-center px-6 py-8 md:px-10 md:py-10 group">
                                <span
                                    className="font-display text-[clamp(2.5rem,7vw,5.5rem)] text-white leading-none digit-swap"
                                >
                                    {fmt(value)}
                                </span>
                                <span className="text-amber-600/60 text-[9px] font-black uppercase tracking-[0.35em] mt-3">
                                    {label}
                                </span>
                            </div>
                            {i < units.length - 1 && (
                                <div className="self-center pb-6 text-amber-600/30 font-display text-4xl md:text-5xl select-none">:</div>
                            )}
                        </React.Fragment>
                    ))}
                </FadeIn>

                {/* Bottom note */}
                <FadeIn delay={0.6} direction="up">
                    <p className="mt-8 text-gray-700 text-[10px] tracking-[0.4em] uppercase font-bold">
                        Dimanche · 15h29 · Porto-Novo
                    </p>
                </FadeIn>
            </div>
        </section>
    );
};

export default CountdownSection;
