import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';
import FadeIn from '../../common/FadeIn';

const TestimonialSection = () => {
    const testimonials = [
        { name: "Audrey", title: "L'Église de mes rêves", text: "Je n'aurais pas pu rêver d'une meilleure église. Moi qui me sentais seule, je me sens tellement mieux maintenant à l'EJP !" },
        { name: "Owen", title: "J'aime mon église !", text: "Depuis que je suis à l'EJP, j'attends dimanche après dimanche avec impatience. Merci Seigneur pour Ta grâce." },
        { name: "Grace", title: "Transformée", text: "L'EJP a changé ma façon de voir la vie. Une communauté qui aime, qui prie, qui avance ensemble. Je ne l'échangerais contre rien." },
    ];

    const [idx, setIdx] = useState(0);
    const [fading, setFading] = useState(false);

    const goTo = (next) => {
        setFading(true);
        setTimeout(() => { setIdx(next); setFading(false); }, 350);
    };

    useEffect(() => {
        const id = setInterval(() => goTo((idx + 1) % testimonials.length), 6000);
        return () => clearInterval(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idx]);

    const t = testimonials[idx];

    return (
        <section className="relative py-32 bg-black overflow-hidden">
            {/* Background text watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                <span
                    className="font-display text-[20vw] text-white/1.5 leading-none uppercase whitespace-nowrap"
                    style={{ letterSpacing: '-0.02em' }}
                >
                    TÉMOIGNAGES
                </span>
            </div>

            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                {/* Header */}
                <FadeIn delay={0.2} direction="up" className="text-center mb-16">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="w-8 h-px bg-amber-600/50" />
                        <span className="text-amber-500/70 text-[9px] font-black uppercase tracking-[0.5em]">Paroles de Prodiges</span>
                        <div className="w-8 h-px bg-amber-600/50" />
                    </div>
                    <h2 className="font-display text-[clamp(2.5rem,7vw,5rem)] text-white leading-none tracking-wide uppercase">
                        Ils témoignent
                    </h2>
                </FadeIn>

                {/* Testimonial card */}
                <FadeIn delay={0.4} direction="up" className="relative border border-white/6 bg-zinc-900/50 p-12 md:p-16 overflow-hidden">
                    {/* Amber corner accent */}
                    <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-amber-500/40" />
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-amber-500/40" />
                    <div className="absolute top-0 right-0 w-48 h-48 bg-amber-600/5 rounded-full blur-[60px]" />

                    <div
                        className="relative z-10 text-center transition-all duration-350"
                        style={{ opacity: fading ? 0 : 1, transform: fading ? 'translateY(10px)' : 'translateY(0)' }}
                    >
                        <Quote className="mx-auto text-amber-500/20 mb-8" size={48} />
                        <h3 className="font-display text-[clamp(1.8rem,4vw,3rem)] text-white leading-none tracking-wide uppercase mb-6">
                            "{t.title}"
                        </h3>
                        <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-2xl mx-auto italic">
                            {t.text}
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <div className="w-6 h-px bg-amber-600/60" />
                            <span className="text-amber-500 font-black text-[10px] tracking-[0.4em] uppercase">{t.name}</span>
                            <div className="w-6 h-px bg-amber-600/60" />
                        </div>
                    </div>
                </FadeIn>

                {/* Navigation */}
                <FadeIn delay={0.6} direction="none" className="flex items-center justify-center gap-4 mt-8">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            className="h-0.5 transition-all duration-500"
                            style={{
                                width: i === idx ? '2.5rem' : '0.75rem',
                                background: i === idx ? '#d97706' : 'rgba(255,255,255,0.15)',
                            }}
                        />
                    ))}
                </FadeIn>
            </div>
        </section>
    );
};

export default TestimonialSection;
