import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Nav, Footer, Contact } from '../';
import { BookOpen, Palette, Film, Music, Image, ArrowRight, X, ChevronRight, Play, Download, Sparkles, BookMarkedIcon } from 'lucide-react';
import { art1,art2 } from '../../assets';

const ArtProdige = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [expandedWork, setExpandedWork] = useState(null);
    const { scrollY } = useScroll();

    // Scroll-based parallax
    const y = useTransform(scrollY, [0, 500], [0, 150]);
    const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.8]);

    const categories = [
        { id: 'all', label: 'Toutes les œuvres', icon: Image },
        { id: 'book', label: 'Livres', icon: BookOpen },
        { id: 'art', label: 'Art Visuel', icon: Palette },
        { id: 'film', label: 'Métrage', icon: Film },
        { id: 'sound', label: 'Music', icon: Music },
        { id: 'bd', label: 'BD', icon: BookMarkedIcon }
    ];

    const getYoutubeId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11 ? match[2] : null;
    };

    const getYoutubeThumbnail = (youtubeId) => {
        return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
    };

    const works = [
        {
            id: 1,
            category: 'book',
            title: 'Sentinelles',
            author: 'Charles SANDAH',
            image: '/sentinelles.png',
            description: '',
            year: 2025,
            type: 'image',
            downloadUrl: 'https://example.com/sentinelles.pdf',
        },
        {
            id: 2,
            category: 'art',
            title: '',
            author: '',
            image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 280"%3E%3Crect fill="%23fbbf24" width="280" height="280"/%3E%3Crect fill="%23f59e0b" x="20" y="20" width="100" height="100"/%3E%3Crect fill="%23d97706" x="140" y="50" width="120" height="80"/%3E%3Crect fill="%23b45309" x="30" y="160" width="220" height="100"/%3E%3C/svg%3E',
            description: '',
            year: 2024,
            type: 'image',
        },
        {
            id: 3,
            category: 'film',
            title: 'Derrière le voile',
            author: 'EJP Porto',
            youtubeUrl: 'https://youtu.be/lOf1ls3giIw?si=c-qyP2tH44Z1u__q',
            description: 'Court métrage expérimental jouant avec les effets de lumière et d\'ombre.',
            duration: '12 min',
            year: 2024,
            type: 'youtube',
        },
        {
            id: 4,
            category: 'sound',
            title: 'Dieu D\'abord',
            author: 'SKY F',
            youtubeUrl: 'https://youtu.be/NKGc2DtqsZ8?si=Xmx-sctRbZDzqg3e',
            description: 'Un hymne inspirant qui célèbre la priorité de mettre Dieu en premier.',
            duration: '3 min',
            year: 2025,
            type: 'youtube',
        },
        {
            id: 5,
            category: 'art',
            title: '',
            author: '',
            image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 280"%3E%3Crect fill="%23f3f4f6" width="280" height="280"/%3E%3Crect fill="%23fbbf24" x="20" y="20" width="50" height="50"/%3E%3Crect fill="%23f59e0b" x="90" y="20" width="50" height="50"/%3E%3Crect fill="%23d97706" x="160" y="20" width="50" height="50"/%3E%3Crect fill="%23b45309" x="230" y="20" width="30" height="50"/%3E%3Crect fill="%23fde68a" x="20" y="90" width="50" height="50"/%3E%3Crect fill="%23fcd34d" x="90" y="90" width="50" height="50"/%3E%3Crect fill="%23fbbd04" x="160" y="90" width="50" height="50"/%3E%3Crect fill="%23f59e0b" x="230" y="90" width="30" height="50"/%3E%3Crect fill="%23f97316" x="20" y="160" width="50" height="50"/%3E%3Crect fill="%23ea580c" x="90" y="160" width="50" height="50"/%3E%3Crect fill="%23c2410c" x="160" y="160" width="50" height="50"/%3E%3Crect fill="%23b45309" x="230" y="160" width="30" height="50"/%3E%3Crect fill="%23fbbf24" x="20" y="230" width="50" height="30"/%3E%3Crect fill="%23f59e0b" x="90" y="230" width="50" height="30"/%3E%3Crect fill="%23d97706" x="160" y="230" width="50" height="30"/%3E%3Crect fill="%238b7500" x="230" y="230" width="30" height="30"/%3E%3C/svg%3E',
            description: '',
            year: 2024,
            type: 'image',
        },
        {
            id: 6,
            category: 'sound',
            title: 'Percer',
            author: 'SKY F',
            youtubeUrl: 'https://youtu.be/CU4qWeTPdGg?si=LGykxbVaeh1_3nns',
            description: 'Manuel pratique rassemblant techniques et conseils des artistes.',
            duration: '3 min',
            year: 2024,
            type: 'youtube',
        },
        {
            id:7,
            category: 'art',
            title:'',
            author:'',
            image: art1,
            description:'',
            year:2025,
            type:'image'
        },
        {
            id:8,
            category: 'art',
            title:'',
            author:'',
            image: art2,
            description:'',
            year:2025,
            type:'image'
        },
    ];

    const filteredWorks = selectedCategory === 'all'
        ? works
        : works.filter(work => work.category === selectedCategory);

    // ============ ANIMATION VARIANTS ============

    // 1. Container avec stagger
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.1,
            },
        },
    };

    // 2. Items génériques
    const itemVariants = {
        hidden: { opacity: 0, y: 25 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 100, damping: 15, duration: 0.5 },
        },
    };

    // 3. Card avec hover morphing
    const cardVariants = {
        hidden: { opacity: 0, y: 40, scale: 0.92 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: 'spring', stiffness: 80, damping: 12, duration: 0.6 },
        },
        hover: {
            y: -12,
            scale: 1.03,
            boxShadow: '0 25px 50px -12px rgba(251, 191, 36, 0.2)',
            transition: { type: 'spring', stiffness: 300, damping: 10 },
        },
        tap: {
            scale: 0.98,
            transition: { type: 'spring', stiffness: 400, damping: 15 },
        },
    };

    // 4. Image zoom avec rotation
    const imageVariants = {
        initial: { scale: 1, rotate: 0, filter: 'brightness(1)' },
        hover: {
            scale: 1.2,
            rotate: 2,
            filter: 'brightness(1.1)',
            transition: { type: 'spring', stiffness: 200, damping: 20, duration: 0.5 },
        },
    };

    // 5. Overlay fade
    const overlayVariants = {
        hidden: { opacity: 0, backdropFilter: 'blur(0px)' },
        visible: {
            opacity: 1,
            backdropFilter: 'blur(4px)',
            transition: { duration: 0.3 },
        },
    };

    // 6. Play button pop
    const playButtonVariants = {
        initial: { scale: 0.6, opacity: 0 },
        hover: {
            scale: 1,
            opacity: 1,
            transition: { type: 'spring', stiffness: 250, damping: 15 },
        },
        tap: { scale: 0.9 },
    };

    // 7. Badge avec rotation et pop
    const badgeVariants = {
        hidden: { opacity: 0, rotate: -25, scale: 0.6 },
        visible: {
            opacity: 1,
            rotate: 0,
            scale: 1,
            transition: { type: 'spring', stiffness: 150, damping: 12, delay: 0.2 },
        },
    };

    // 8. Hero title avec letter-spacing animation
    const heroTitleVariants = {
        hidden: { opacity: 0, y: 50, letterSpacing: '-0.05em' },
        visible: {
            opacity: 1,
            y: 0,
            letterSpacing: '0em',
            transition: { type: 'spring', stiffness: 70, damping: 18, delay: 0.1 },
        },
    };

    // 9. Hero badge avec pulse
    const heroBadgeVariants = {
        hidden: { opacity: 0, scale: 0, rotate: -180 },
        visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: { type: 'spring', stiffness: 200, damping: 15, delay: 0.05 },
        },
        pulse: {
            scale: [1, 1.05, 1],
            transition: { duration: 2, repeat: Infinity },
        },
    };

    // 10. Stats avec bounce
    const statsVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
            },
        },
    };

    const statItemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.7 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: 'spring', stiffness: 120, damping: 14 },
        },
        hover: {
            y: -5,
            scale: 1.08,
            transition: { type: 'spring', stiffness: 300, damping: 10 },
        },
    };

    // 11. Sidebar avec slide-in
    const sidebarVariants = {
        hidden: { opacity: 0, x: -60 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { type: 'spring', stiffness: 80, damping: 15, delay: 0.1 },
        },
    };

    // 12. Category button avec flip
    const categoryButtonVariants = {
        hidden: { opacity: 0, x: -25 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { type: 'spring', stiffness: 100, damping: 12 },
        },
        hover: {
            scale: 1.06,
            paddingLeft: '20px',
            transition: { type: 'spring', stiffness: 300, damping: 10 },
        },
        tap: { scale: 0.95 },
    };

    // 13. Modal avec slide up + scale
    const modalVariants = {
        hidden: { opacity: 0, scale: 0.75, y: 60 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 110, damping: 18, delay: 0.1 },
        },
        exit: {
            opacity: 0,
            scale: 0.7,
            y: 60,
            transition: { duration: 0.25 },
        },
    };

    const modalBackdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, transition: { duration: 0.25 } },
    };

    // 14. Background floats
    const floatingVariants = {
        animate: {
            y: [0, -25, 0],
            x: [0, 10, 0],
            transition: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
        },
    };

    // 15. Icon rotation
    const spinVariants = {
        animate: {
            rotate: 360,
            transition: { duration: 4, repeat: Infinity, ease: 'linear' },
        },
    };

    // 16. Pulse scale
    const pulseVariants = {
        animate: {
            scale: [1, 1.15, 1],
            opacity: [1, 0.7, 1],
            transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
        },
    };

    // 17. Underline expand
    const underlineVariants = {
        hidden: { width: 0 },
        visible: {
            width: '100%',
            transition: { type: 'spring', stiffness: 120, damping: 20, delay: 0.3 },
        },
    };

    // 18. Text reveal (lettres une par une)
    const containerVariantsText = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.2,
            },
        },
    };

    const letterVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 100, damping: 15 },
        },
    };

    // 19. Button ripple
    const buttonVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 120, damping: 15 },
        },
        hover: {
            scale: 1.05,
            boxShadow: '0 20px 40px rgba(251, 191, 36, 0.3)',
            transition: { type: 'spring', stiffness: 300, damping: 10 },
        },
        tap: { scale: 0.92 },
    };

    // 20. Grid layout animation
    const gridContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.05,
            },
        },
    };

    // WorkCard Component
    const WorkCard = ({ work, idx }) => {
        const isYoutube = work.type === 'youtube';
        const youtubeId = isYoutube ? getYoutubeId(work.youtubeUrl) : null;
        const thumbnailUrl = isYoutube ? getYoutubeThumbnail(youtubeId) : work.image;

        const handleClickYoutube = (e) => {
            if (isYoutube) {
                e.stopPropagation();
                window.open(work.youtubeUrl, '_blank');
            } else {
                setExpandedWork(work);
            }
        };

        return (
            <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                whileTap="tap"
                viewport={{ once: true, margin: '-50px' }}
                className="group cursor-pointer"
            >
                <div
                    onClick={handleClickYoutube}
                    className="relative overflow-hidden rounded-2xl bg-linear-to-br from-zinc-950 to-black border border-white/10 hover:border-amber-500/50 transition-colors duration-300"
                >
                    {/* Image avec zoom */}
                    <motion.div
                        className="aspect-square overflow-hidden bg-linear-to-br from-zinc-800 to-black"
                        variants={imageVariants}
                        initial="initial"
                        whileHover="hover"
                    >
                        <img
                            src={thumbnailUrl}
                            alt={work.title}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    {/* Overlay YouTube avec Play Button */}
                    {isYoutube ? (
                        <motion.div
                            className="absolute inset-0 bg-black/40 flex items-center justify-center"
                            variants={overlayVariants}
                            initial="hidden"
                            whileHover="visible"
                        >
                            <motion.div
                                className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-2xl shadow-red-600/50"
                                variants={playButtonVariants}
                                initial="initial"
                                whileHover="hover"
                                whileTap="tap"
                            >
                                <Play size={32} className="text-white fill-white ml-1" />
                            </motion.div>
                        </motion.div>
                    ) : (
                        <motion.div
                            className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6"
                            variants={overlayVariants}
                            initial="hidden"
                            whileHover="visible"
                        >
                            <motion.button
                                variants={buttonVariants}
                                initial="hidden"
                                whileHover="hover"
                                whileTap="tap"
                                className="inline-flex items-center gap-2 text-sm font-bold text-white bg-linear-to-r from-amber-500 to-yellow-500 px-4 py-2 rounded-lg w-fit"
                            >
                                Voir plus
                                <motion.div
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    <ArrowRight className="w-4 h-4" />
                                </motion.div>
                            </motion.button>
                        </motion.div>
                    )}

                    {/* Badge Année */}
                    <motion.div
                        variants={badgeVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="absolute top-4 right-4 bg-black/70 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-amber-400 border border-amber-500/30"
                    >
                        {work.year}
                    </motion.div>

                    {/* Badge YouTube */}
                    {isYoutube && (
                        <motion.div
                            variants={badgeVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="absolute top-4 left-4 bg-red-600 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-white border border-red-500/50 flex items-center gap-2"
                        >
                            <Film size={12} />
                            YouTube
                        </motion.div>
                    )}
                </div>

                {/* Info */}
                <motion.div variants={itemVariants} className="mt-4 space-y-1">
                    <h3 className="font-black text-white group-hover:text-amber-400 transition-colors text-lg">
                        {work.title}
                    </h3>
                    <p className="text-sm text-gray-500 font-light">{work.author}</p>
                    {work.duration && (
                        <p className="text-xs text-gray-600 italic">{work.duration}</p>
                    )}
                    {isYoutube && (
                        <p className="text-xs text-red-400 font-semibold">Cliquez pour regarder</p>
                    )}
                </motion.div>
            </motion.div>
        );
    };

    return (
        <div className="relative flex min-h-screen flex-col bg-black text-gray-400 overflow-hidden">
            {/* Navigation */}
            <div className='fixed top-0 right-0 left-0 z-50'>
                <Nav />
            </div>

            <div className="h-20 lg:h-32" />

            <main className="grow">
                {/* ===== HERO SECTION ===== */}
                <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden px-4 md:px-8">
                    <div className="absolute inset-0 overflow-hidden">
                        {/* Floating backgrounds */}
                        <motion.div
                            className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl"
                            variants={floatingVariants}
                            animate="animate"
                        />
                        <motion.div
                            className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl"
                            variants={floatingVariants}
                            animate="animate"
                            transition={{ duration: 8, delay: 0.5 }}
                        />
                        <motion.div
                            style={{ y }}
                            className="absolute inset-0 bg-linear-to-b from-black via-black/95 to-zinc-900"
                        />
                    </div>

                    <motion.div
                        className="container mx-auto max-w-4xl relative z-10"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <div className="pt-10 text-center">
                            {/* Hero Badge */}
                            <motion.div
                                variants={heroBadgeVariants}
                                animate="pulse"
                                className="inline-flex items-center gap-3 mb-8 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full backdrop-blur-sm hover:bg-amber-500/20 transition-all duration-300"
                            >
                                <motion.div variants={spinVariants} animate="animate">
                                    <Palette className="text-amber-500" size={16} />
                                </motion.div>
                                <span className="text-amber-500 font-bold tracking-[0.3em] uppercase text-xs">
                                    Créativité Sans Limites
                                </span>
                            </motion.div>

                            {/* Hero Title */}
                            <motion.h1
                                variants={heroTitleVariants}
                                className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-none"
                            >
                                Découvrez les{' '}
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-200 via-yellow-400 to-amber-600">
                                    Œuvres
                                </span>{' '}
                                de nos Jeunes Prodiges
                            </motion.h1>

                            {/* Hero Subtitle */}
                            <motion.p
                                variants={itemVariants}
                                className="text-lg md:text-xl text-gray-300 font-light mb-10 leading-relaxed max-w-3xl mx-auto"
                            >
                                Une galerie exceptionnelle mettant en avant les talents artistiques,
                                littéraires et créatifs des Jeunes Prodiges de Porto Novo.
                            </motion.p>

                            {/* Stats */}
                            <motion.div
                                variants={statsVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="grid grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto"
                            >
                                {[
                                    { value: works.length, label: 'Œuvres' },
                                    { value: 5, label: 'Catégories' },
                                    { value: 2024, label: 'Depuis' },
                                ].map((stat, idx) => (
                                    <motion.div
                                        key={idx}
                                        variants={statItemVariants}
                                        whileHover="hover"
                                        className="p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm hover:border-amber-500/50 transition-colors duration-300"
                                    >
                                        <p className="text-3xl font-black text-amber-400 mb-1">
                                            {stat.value}
                                        </p>
                                        <p className="text-xs text-gray-400 uppercase tracking-widest font-light">
                                            {stat.label}
                                        </p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                </section>

                {/* ===== INSPIRATIONAL SECTION ===== */}
                <section className="relative py-24 px-4 md:px-8 overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-r from-amber-500/10 via-yellow-500/5 to-amber-500/10 pointer-events-none" />

                    <motion.div
                        className="absolute -top-20 -right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"
                        variants={floatingVariants}
                        animate="animate"
                    />
                    <motion.div
                        className="absolute -bottom-20 -left-20 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl"
                        variants={floatingVariants}
                        animate="animate"
                        transition={{ duration: 9, delay: 0.5 }}
                    />

                    <motion.div
                        className="container mx-auto max-w-4xl relative z-10"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                    >
                        <div className="text-center">
                            {/* Icon */}
                            <motion.div
                                variants={heroBadgeVariants}
                                animate="pulse"
                                className="inline-flex items-center justify-center mb-8"
                            >
                                <div className="relative">
                                    <motion.div
                                        className="absolute inset-0 bg-amber-500/20 rounded-full blur-2xl"
                                        variants={pulseVariants}
                                        animate="animate"
                                    />
                                    <div className="relative p-4 bg-linear-to-br from-amber-500/20 to-yellow-500/10 rounded-full border border-amber-500/30">
                                        <motion.div
                                            variants={spinVariants}
                                            animate="animate"
                                        >
                                            <Sparkles className="text-amber-400" size={32} />
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Title */}
                            <motion.h2
                                variants={heroTitleVariants}
                                className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tighter leading-tight"
                            >
                                Remplis de l'
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-200 via-yellow-400 to-amber-600">
                                    Esprit Divin
                                </span>
                            </motion.h2>

                            {/* Quote */}
                            <motion.blockquote
                                variants={itemVariants}
                                className="mb-8 relative"
                            >
                                <div className="absolute left-0 top-0 w-1 h-12 bg-linear-to-b from-amber-500 to-transparent" />
                                <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed italic pl-6 max-w-3xl mx-auto">
                                    <span className="text-amber-400 font-bold">"</span>Je l'ai rempli de
                                    l'Esprit de Dieu, de sagesse, d'intelligence, et de savoir pour
                                    toutes sortes d'ouvrages.
                                    <span className="text-amber-400 font-bold">"</span>
                                </p>
                                <p className="text-sm text-gray-500 mt-4">Exode 35:31</p>
                            </motion.blockquote>

                            {/* Content paragraphs */}
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="space-y-6 max-w-3xl mx-auto"
                            >
                                {[
                                    'Chaque jeune Prodige porte en lui les dons divins : la créativité de l\'Esprit, la sagesse pour guider ses œuvres, et l\'intelligence pour transformer ses rêves en réalité.',
                                    'Ces œuvres d\'art, de littérature et de création ne sont pas seulement des expressions personnelles — elles sont des témoignages vivants d\'une génération remplie de l\'Esprit.',
                                    'Nous célébrons chaque talent, chaque vision, chaque création — car tous les ouvrages entrepris avec l\'Esprit de Dieu portent une puissance transformatrice.',
                                ].map((text, idx) => (
                                    <motion.p
                                        key={idx}
                                        variants={itemVariants}
                                        className="text-base md:text-lg text-gray-300 font-light leading-relaxed"
                                    >
                                        {text}
                                    </motion.p>
                                ))}
                            </motion.div>

                            {/* Separator */}
                            <motion.div
                                variants={itemVariants}
                                className="mt-12 pt-8 border-t border-white/10"
                            >
                                <div className="flex items-center justify-center gap-4">
                                    <motion.div
                                        className="h-px bg-linear-to-r from-transparent to-amber-500/50"
                                        variants={underlineVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        style={{ width: '32px' }}
                                    />
                                    <span className="text-xs text-amber-400 font-black uppercase tracking-widest">
                                        Inspirés • Créatifs • Impactants
                                    </span>
                                    <motion.div
                                        className="h-px bg-linear-to-l from-transparent to-amber-500/50"
                                        variants={underlineVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        style={{ width: '32px' }}
                                        transition={{ delay: 0.2 }}
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </section>

                {/* ===== GALLERY SECTION ===== */}
                <section className="py-20 px-4 md:px-8 relative">
                    <div className="absolute inset-0 bg-linear-to-b from-black via-zinc-900/50 to-black pointer-events-none" />

                    <div className="container mx-auto max-w-7xl relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                            {/* Sidebar */}
                            <motion.aside
                                variants={sidebarVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="lg:col-span-1"
                            >
                                <div className="sticky top-40 bg-linear-to-br from-zinc-950 to-black border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:border-amber-500/30 transition-all duration-300">
                                    <h3 className="text-xl font-black text-white mb-6 tracking-tight">
                                        Catégories
                                    </h3>

                                    <motion.div
                                        className="space-y-2"
                                        variants={containerVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                    >
                                        {categories.map((cat, idx) => {
                                            const Icon = cat.icon;
                                            const isSelected = selectedCategory === cat.id;
                                            return (
                                                <motion.button
                                                    key={cat.id}
                                                    variants={categoryButtonVariants}
                                                    whileHover="hover"
                                                    whileTap="tap"
                                                    onClick={() => setSelectedCategory(cat.id)}
                                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-left group ${
                                                        isSelected
                                                            ? 'bg-linear-to-r from-amber-500 to-yellow-500 text-black font-bold shadow-lg shadow-amber-500/30'
                                                            : 'text-gray-300 hover:bg-white/5 hover:text-amber-400 border border-transparent hover:border-amber-500/30'
                                                    }`}
                                                >
                                                    <Icon className={`w-5 h-5 shrink-0 transition-transform ${
                                                        isSelected ? '' : 'group-hover:scale-110'
                                                    }`} />
                                                    <span className="text-sm font-bold flex-1">
                                                        {cat.label}
                                                    </span>
                                                    {isSelected && <ChevronRight className="w-4 h-4" />}
                                                </motion.button>
                                            );
                                        })}
                                    </motion.div>

                                    <motion.div
                                        variants={itemVariants}
                                        className="mt-8 pt-6 border-t border-white/10"
                                    >
                                        <p className="text-xs text-gray-500 text-center font-light">
                                            {filteredWorks.length} œuvre{filteredWorks.length > 1 ? 's' : ''}
                                        </p>
                                    </motion.div>
                                </div>
                            </motion.aside>

                            {/* Gallery */}
                            <div className="lg:col-span-4">
                                <motion.div
                                    variants={itemVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    className="mb-12"
                                >
                                    <motion.h2
                                        variants={heroTitleVariants}
                                        className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tighter"
                                    >
                                        {categories.find(c => c.id === selectedCategory)?.label}
                                    </motion.h2>
                                    <motion.div
                                        className="h-1 bg-linear-to-r from-amber-500 to-yellow-500 rounded-full"
                                        variants={underlineVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        style={{ width: '64px' }}
                                    />
                                </motion.div>

                                {filteredWorks.length > 0 ? (
                                    <motion.div
                                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                                        variants={gridContainerVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, margin: '-50px' }}
                                    >
                                        <AnimatePresence mode="popLayout">
                                            {filteredWorks.map((work) => (
                                                <WorkCard key={work.id} work={work} idx={filteredWorks.indexOf(work)} />
                                            ))}
                                        </AnimatePresence>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        className="flex flex-col items-center justify-center py-20 text-center"
                                    >
                                        <motion.div
                                            variants={spinVariants}
                                            animate="animate"
                                        >
                                            <Palette className="w-16 h-16 text-gray-700 mb-4" />
                                        </motion.div>
                                        <motion.h3
                                            variants={itemVariants}
                                            className="text-2xl font-black text-white mb-2"
                                        >
                                            Aucune œuvre trouvée
                                        </motion.h3>
                                        <motion.p
                                            variants={itemVariants}
                                            className="text-gray-500"
                                        >
                                            Sélectionnez une autre catégorie
                                        </motion.p>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== MODAL ===== */}
                <AnimatePresence mode="wait">
                    {expandedWork && (
                        <motion.div
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
                            variants={modalBackdropVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <motion.div
                                className="bg-linear-to-br from-zinc-900 to-black border-2 border-white/10 rounded-3xl w-full max-w-2xl my-8"
                                variants={modalVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <div className="p-8">
                                    {/* Modal Header */}
                                    <motion.div
                                        className="flex items-start justify-between mb-6"
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        <motion.div variants={itemVariants}>
                                            <h3 className="text-3xl font-black text-white mb-2 tracking-tighter">
                                                {expandedWork.title}
                                            </h3>
                                            <p className="text-gray-400 text-lg font-light">
                                                {expandedWork.author}
                                            </p>
                                        </motion.div>
                                        <motion.button
                                            variants={buttonVariants}
                                            whileHover="hover"
                                            whileTap="tap"
                                            onClick={() => setExpandedWork(null)}
                                            className="p-2 hover:bg-white/10 rounded-lg transition-colors shrink-0"
                                        >
                                            <X className="w-6 h-6 text-gray-400" />
                                        </motion.button>
                                    </motion.div>

                                    {/* Modal Image */}
                                    <motion.div
                                        variants={itemVariants}
                                        className="mb-8 rounded-2xl overflow-hidden bg-linear-to-br from-zinc-800 to-black border border-white/10 flex items-center justify-center p-6 min-h-64"
                                    >
                                        <motion.img
                                            src={expandedWork.image}
                                            alt={expandedWork.title}
                                            className="max-h-96 w-auto object-contain"
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{
                                                type: 'spring',
                                                stiffness: 100,
                                                damping: 15,
                                            }}
                                        />
                                    </motion.div>

                                    {/* Modal Content */}
                                    <motion.div
                                        className="space-y-6"
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        <motion.div variants={itemVariants}>
                                            <p className="text-xs font-black text-amber-400 uppercase tracking-widest mb-3">
                                                Description
                                            </p>
                                            <p className="text-base leading-relaxed text-gray-300 font-light">
                                                {expandedWork.description}
                                            </p>
                                        </motion.div>

                                        <motion.div
                                            variants={itemVariants}
                                            className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10"
                                        >
                                            <div>
                                                <p className="text-xs font-black text-amber-400 uppercase tracking-widest mb-2">
                                                    Année
                                                </p>
                                                <p className="text-lg font-black text-white">
                                                    {expandedWork.year}
                                                </p>
                                            </div>
                                            {expandedWork.duration && (
                                                <div>
                                                    <p className="text-xs font-black text-amber-400 uppercase tracking-widest mb-2">
                                                        Durée
                                                    </p>
                                                    <p className="text-lg font-black text-white">
                                                        {expandedWork.duration}
                                                    </p>
                                                </div>
                                            )}
                                            <div>
                                                <p className="text-xs font-black text-amber-400 uppercase tracking-widest mb-2">
                                                    Catégorie
                                                </p>
                                                <p className="text-lg font-black text-white capitalize">
                                                    {categories.find(c => c.id === expandedWork.category)
                                                        ?.label}
                                                </p>
                                            </div>
                                        </motion.div>
                                    </motion.div>

                                    {/* Modal Actions */}
                                    <motion.div
                                        className="mt-8 flex flex-col gap-3"
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        {expandedWork.category === 'book' &&
                                            expandedWork.downloadUrl && (
                                                <motion.a
                                                    href={expandedWork.downloadUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-full py-3 bg-linear-to-r from-green-500 to-emerald-500 text-white rounded-xl font-black uppercase text-xs tracking-widest hover:shadow-2xl hover:shadow-green-500/40 transition-all duration-300 flex items-center justify-center gap-2 group"
                                                    variants={buttonVariants}
                                                    whileHover="hover"
                                                    whileTap="tap"
                                                >
                                                    <Download size={16} className="group-hover:scale-110 transition-transform" />
                                                    <span>Télécharger le livre</span>
                                                </motion.a>
                                            )}

                                        <motion.button
                                            onClick={() => setExpandedWork(null)}
                                            className="w-full py-3 bg-linear-to-r from-amber-500 to-yellow-500 text-black rounded-xl font-black uppercase text-xs tracking-widest hover:shadow-2xl hover:shadow-amber-500/40 transition-all duration-300 flex items-center justify-center gap-2 group"
                                            variants={buttonVariants}
                                            whileHover="hover"
                                            whileTap="tap"
                                        >
                                            <span>Fermer</span>
                                            <motion.div
                                                animate={{ rotate: [0, 90, 0] }}
                                                transition={{
                                                    duration: 0.6,
                                                    repeat: Infinity,
                                                }}
                                            >
                                                <X size={16} />
                                            </motion.div>
                                        </motion.button>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <section id="contact" className="py-32 bg-zinc-950">
                <Contact
                    verset={{
                        verset:
                            ' toute grâce excellente et tout don parfait descendent d\'en haut, du Père des lumières, chez lequel il n\'y a ni changement ni ombre de variation.',
                        ref: 'Jacques 1:17',
                    }}
                />
            </section>

            <Footer />
        </div>
    );
};

export default ArtProdige;