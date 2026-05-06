import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import FadeIn from '../../common/FadeIn';
import { PP } from '../../../assets';

const ApostleSection = () => (
    <section className="relative py-32 bg-black overflow-hidden border-t border-white/4">
        <div className='absolute top-0 left-1/2 -translate-x-1/2 w-[600px] bg-amber-600/4 rounded-full blur-[100px] pointer-events-none' />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
            <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
                {/* Colonne gauche - texte */}
                <div className='relative z-10'>
                    {/* Tag */}
                    <FadeIn delay={0.1} direction="left" className="flex items-center gap-4 mb-6">
                        <div className="w-8 h-px bg-amber-600/50" />
                        <span className="text-amber-500/70 text-[9px] font-black uppercase tracking-[0.5em]">
                            Notre Papa
                        </span>
                    </FadeIn>

                    {/* Nom */}
                    <FadeIn delay={0.2} direction="left">
                        <h2 className="font-display leading-none tracking-wide uppercase">
                            <span className="block text-[clamp(3rem,6vw,5.5rem)] text-white">
                                Apôtre
                            </span>
                            <span className="block text-[clamp(3rem,6vw,5.5rem)] shimmer-gold">
                                Yvan Castanou
                            </span>
                        </h2>
                    </FadeIn>

                    {/* Ligne déco */}
                    <FadeIn delay={0.3} direction="left">
                        <div className="w-8 h-px bg-amber-500 my-8" />
                    </FadeIn>

                    {/* Citation */}
                    <FadeIn delay={0.4} direction="left" className="border-l-2 border-amber-500/40 pl-6 mb-8">
                        <p className="text-white/75 text-base font-light italic leading-relaxed">
                            "La jeunesse n'est pas un problème à gérer,
                            c'est une puissance à libérer."
                        </p>
                    </FadeIn>

                    {/* Paragraphes */}
                    <FadeIn delay={0.5} direction="left" className="space-y-4 mb-10">
                        <p className="text-gray-500 text-[15px] font-light leading-relaxed">
                            Apôtre Yvan Castanou est le fondateur et superviseur général de l'Église
                            des Jeunes Prodiges (EJP), un mouvement né de la conviction profonde que
                            Dieu appelle la jeunesse à une destinée extraordinaire.
                        </p>
                        <p className="text-gray-500 text-[15px] font-light leading-relaxed">
                            Visionnaire, orateur, homme de foi et passionné de Dieu, il porte depuis plus de deux
                            décennies un message de transformation, d'excellence et de consécration
                            au service du Royaume de Dieu. Son ministère rayonne aujourd'hui dans
                            plusieurs nations à travers l'Afrique et au-delà.
                        </p>
                        <p className="text-gray-500 text-[15px] font-light leading-relaxed">
                            À travers l'EJP, il incarne une vision claire : former une
                            génération de jeunes disciples enflammés, capables d'impacter leur
                            génération pour la gloire de Dieu.
                        </p>
                    </FadeIn>

                    {/* CTA */}
                    <FadeIn delay={0.6} direction="left">
                        <Link to="/apropos" className="inline-flex items-center gap-2 group text-white/80 hover:text-white transition-colors">
                            En savoir plus <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </FadeIn>
                </div>

                {/* Colonne droite - photo */}
                <FadeIn delay={0.3} direction="right" className="relative hidden md:block h-full">
                    {/* Coins décoratifs */}
                    <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-amber-500/40 z-10" />
                    <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-amber-500/40 z-10" />

                    <div className="absolute inset-0 overflow-hidden group">
                        <img
                            src={PP}
                            alt="Apôtre Yvan Castanou"
                            className="w-full h-full object-cover object-top transition-transform duration-1200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                            style={{ filter: 'grayscale(15%) brightness(0.85) contrast(1.1)' }}
                        />
                        {/* Fondu gauche vers le fond noir */}
                        <div className="absolute inset-0 bg-linear-to-r from-black via-transparent to-transparent" style={{ width: '25%' }} />
                        {/* Fondu bas */}
                        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black to-transparent" />
                    </div>
                    {/* Badge bas */}
                    <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-amber-600 rotate-45" />
                        <span className="text-white/50 text-[9px] font-black uppercase tracking-[0.3em]">
                            EJP Porto-Novo · Bénin
                        </span>
                    </div>
                </FadeIn>
            </div>

            {/* Colonne droite - photo (Mobile) */}
            <div className="opacity-20 md:hidden absolute inset-0 z-0" style={{ height: '600px' }}>
                {/* Coins décoratifs */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-amber-500/40 z-10" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-amber-500/40 z-10" />

                <div className="absolute inset-0 overflow-hidden group">
                    <img
                        src={PP}
                        alt="Apôtre Yvan Castanou"
                        className="w-full h-full object-cover object-top transition-transform duration-1200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                        style={{ filter: 'grayscale(15%) brightness(0.85) contrast(1.1)' }}
                    />
                    {/* Fondu gauche vers le fond noir */}
                    <div className="absolute inset-0 bg-linear-to-r from-black via-transparent to-transparent" style={{ width: '25%' }} />
                    {/* Fondu bas */}
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black to-transparent" />
                </div>
                {/* Badge bas */}
                <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-amber-600 rotate-45" />
                    <span className="text-white/50 text-[9px] font-black uppercase tracking-[0.3em]">
                        EJP Porto-Novo · Bénin
                    </span>
                </div>
            </div>
        </div>
    </section>
);

export default ApostleSection;
