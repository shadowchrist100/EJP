import React from 'react';
import { motion } from 'framer-motion';
import { logo } from "../../assets";

export default function Footer() {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        show: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 120, damping: 20 }
        }
    };

    return (
        <footer className="relative bg-black pt-20 pb-8 border-t border-white/[0.03] overflow-hidden w-full">

            {/* Halo lumineux ambré plus compact */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[500px] h-[250px] pointer-events-none z-0 opacity-30">
                <div className="w-full h-full bg-amber-500/10 rounded-full blur-[90px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

                {/* Grille principale avec écarts verticaux réduits (mb-12 au lieu de mb-20) */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12"
                >
                    {/* Colonne Marque */}
                    <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 text-center md:text-left space-y-3">
                        <div className="flex items-center justify-center md:justify-start gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                                <img src={logo} alt="Logo EJP" className="w-full h-full object-cover" />
                            </div>
                            <h3 className="text-sm font-black text-white uppercase tracking-widest">
                                ejp<span className="text-amber-500">.</span>porto
                            </h3>
                        </div>
                        <p className="text-[11px] text-zinc-400 max-w-xs leading-relaxed mx-auto md:mx-0">
                            L'Excellence par la jeunesse. Nous bâtissons une génération de leaders pour impacter le monde.
                        </p>
                    </motion.div>

                    {/* Colonne Liens (Interligne réduit) */}
                    <motion.div variants={itemVariants} className="space-y-3 text-center md:text-left">
                        <h4 className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.25em]">
                            Navigation
                        </h4>
                        <div className="flex flex-col gap-2 items-center md:items-start">
                            {['Accueil', 'Événements', 'Ministères', 'Art & Prodiges', 'FIJ', 'Galerie', 'Dons'].map((link) => (
                                <a
                                    key={link}
                                    href={`/${link.toLowerCase().replace(/\s/g, '')}`}
                                    className="text-[11px] text-zinc-400 hover:text-amber-500 transition-colors duration-200"
                                >
                                    {link}
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Colonne Contact */}
                    <motion.div variants={itemVariants} className="space-y-3 text-center md:text-left">
                        <h4 className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.25em]">
                            Contact
                        </h4>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">
                            ICC Campus Porto-Novo<br />
                            Face église Catholique<br />
                        </p>
                        <a
                            href="tel:+2290149121209"
                            className="inline-block text-[11px] font-bold text-amber-500 hover:text-amber-400 tracking-wider transition-colors duration-200"
                        >
                            +229 01 49 12 12 09
                        </a>
                    </motion.div>

                    {/* Colonne Réseaux Sociaux */}
                    <motion.div variants={itemVariants} className="space-y-3 text-center md:text-left">
                        <h4 className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.25em]">
                            Réseaux
                        </h4>
                        <div className="flex gap-2 justify-center md:justify-start items-center">
                            {[
                                { name: 'YouTube', href: 'https://youtube.com/@ejp_porto-novo', icon: <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /> },
                                { name: 'WhatsApp', href: 'https://wa.me/2290149121209', icon: <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /> },
                            ].map((social) => (
                                <motion.a
                                    whileHover={{ y: -2, scale: 1.03 }}
                                    key={social.name}
                                    href={social.href}
                                    className="w-8 h-8 rounded-full bg-white/[0.01] border border-white/5 flex items-center justify-center text-zinc-400 hover:text-black hover:bg-amber-500 hover:border-amber-500 transition-colors duration-200"
                                >
                                    <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
                                        {social.icon}
                                    </svg>
                                </motion.a>
                            ))}
                            {/* Facebook */}
                            <motion.a whileHover={{ y: -2, scale: 1.03 }} href="https://www.facebook.com/JeunesICCPortoNovo" className="w-8 h-8 rounded-full bg-white/[0.01] border border-white/5 flex items-center justify-center text-zinc-400 hover:text-black hover:bg-amber-500 hover:border-amber-500 transition-colors duration-200">
                                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                </svg>
                            </motion.a>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Wordmark compressé (Taille maximale réduite de 11rem à 7.5rem) */}
                <div className="relative my-6 overflow-hidden select-none pointer-events-none tracking-tighter">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-center font-black uppercase text-[clamp(2rem,10vw,7.5rem)] leading-none text-white/[0.02] whitespace-nowrap bg-gradient-to-b from-white/[0.03] to-transparent bg-clip-text"
                    >
                        EJP PORTO
                    </motion.h1>
                </div>

                {/* Baseline de fin */}
                <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-white/[0.03] gap-3">
                    <p className="text-[9px] font-medium text-zinc-500 uppercase tracking-wider">
                        © 2026 Église des Jeunes Prodiges — Porto-Novo
                    </p>
                    <div className="flex gap-4">
                        <a href="#privacy" className="text-[9px] font-medium text-zinc-500 hover:text-amber-500 uppercase tracking-wider transition-colors duration-200">
                            Mentions Légales
                        </a>
                        <a href="#terms" className="text-[9px] font-medium text-zinc-500 hover:text-amber-500 uppercase tracking-wider transition-colors duration-200">
                            Confidentialité
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
}