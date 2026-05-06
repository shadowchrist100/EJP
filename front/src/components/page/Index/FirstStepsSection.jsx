import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import FadeIn from '../../common/FadeIn';

const FirstStepsSection = () => (
    <section id="premierpas" className="relative py-32 bg-zinc-950 overflow-hidden">
        {/* Background watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span className="font-display text-[18vw] text-white/[0.018] leading-none uppercase">PREMIERS PAS</span>
        </div>
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-amber-600/5 rounded-full blur-[120px]" />

        <div className="container mx-auto px-6 text-center relative z-10">
            <div className="max-w-2xl mx-auto">
                <FadeIn delay={0.2} direction="up" className="flex items-center justify-center gap-4 mb-6">
                    <div className="w-8 h-px bg-amber-600/50" />
                    <span className="text-amber-500/70 text-[9px] font-black uppercase tracking-[0.5em]">Nouveau ici ?</span>
                    <div className="w-8 h-px bg-amber-600/50" />
                </FadeIn>
                <FadeIn delay={0.3} direction="up">
                    <h2 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] text-white leading-none tracking-wide uppercase mb-8">
                        Mes premiers pas avec <span className="shimmer-gold">Jesus</span>
                    </h2>
                </FadeIn>
                <FadeIn delay={0.4} direction="up">
                    <p className="text-gray-500 text-base font-light leading-relaxed mb-12 max-w-lg mx-auto">
                        Tu commences ta marche avec Jesus ? Laisse-nous t'accompagner pour bâtir des fondements solides pour ta nouvelle vie.
                    </p>
                </FadeIn>
                <FadeIn delay={0.5} direction="up">
                    <Link
                        to="/salvation"
                        className="group inline-flex items-center gap-4 bg-white text-black px-12 py-5 text-[10px] font-black uppercase tracking-[0.25em] hover:bg-amber-500 transition-all duration-300 shadow-xl"
                    >
                        Inscris-toi maintenant
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </FadeIn>
            </div>
        </div>
    </section>
);

export default FirstStepsSection;
