import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import FadeIn from '../../common/FadeIn';

const DonationSection = () => (
    <section className="relative py-40 bg-black overflow-hidden">
        {/* Massive background text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span
                className="font-display text-[25vw] text-white/1.5 leading-none uppercase"
                style={{ transform: 'rotate(-8deg)', letterSpacing: '-0.02em' }}
            >
                DONNER
            </span>
        </div>

        {/* Vertical amber lines */}
        <div className="absolute left-20 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-amber-600/15 to-transparent hidden lg:block" />
        <div className="absolute right-20 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-amber-600/15 to-transparent hidden lg:block" />

        <div className="container mx-auto px-6 text-center max-w-4xl relative z-10">
            <FadeIn delay={0.2} direction="up" className="flex items-center justify-center gap-4 mb-6">
                <div className="w-8 h-px bg-amber-600/50" />
                <span className="text-amber-500/70 text-[9px] font-black uppercase tracking-[0.5em]">Soutenir la vision</span>
                <div className="w-8 h-px bg-amber-600/50" />
            </FadeIn>
            <FadeIn delay={0.3} direction="up">
                <h2 className="font-display text-[clamp(3rem,10vw,8rem)] text-white leading-none tracking-wide uppercase mb-6">
                    Faire un <span className="shimmer-gold">Don</span>
                </h2>
            </FadeIn>
            <FadeIn delay={0.4} direction="up">
                <p className="text-gray-600 text-lg font-light italic mb-12 max-w-md mx-auto">
                    "Dieu aime celui qui donne avec joie." (2 Cor 9:7)
                </p>
            </FadeIn>
            <FadeIn delay={0.5} direction="up">
                <Link
                    to="/dons"
                    className="group inline-flex items-center gap-5 border border-white/20 hover:border-amber-500/60 text-white/80 hover:text-white px-12 py-5 text-[10px] font-black uppercase tracking-[0.25em] transition-all duration-300"
                >
                    Soutenir la vision
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </Link>
            </FadeIn>
        </div>
    </section>
);

export default DonationSection;
