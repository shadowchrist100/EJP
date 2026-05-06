import { Calendar, MapPin, Clock, ArrowRight, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Nav, Footer, Contact } from '../.';
import { useState, useMemo } from 'react';
import ComingNext from './Index/ComingNext';
import EventCard from './Index/EventCard';

const EventsPage = () => {
    const monthNames = ['JAN', 'FÉV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUL', 'AOU', 'SEP', 'OCT', 'NOV', 'DÉC'];

    // Fonction pour trouver le premier lundi du mois
    const findFirstMonday = (year, month) => {
        const date = new Date(year, month, 1);
        const day = date.getDay();
        const diff = day === 1 ? 0 : (day === 0 ? 1 : 8 - day);
        date.setDate(1 + diff);
        return date;
    };

    // Fonction pour obtenir le prochain dimanche
    const getNextSunday = (fromDate = new Date()) => {
        const date = new Date(fromDate);
        const day = date.getDay();
        const diff = day === 0 ? 7 : (7 - day);
        date.setDate(date.getDate() + diff);
        date.setHours(15, 30, 0, 0);
        return date;
    };

    // Fonction pour obtenir le prochain mardi à 19h
    const getNextTuesday = (fromDate = new Date()) => {
        const date = new Date(fromDate);
        const day = date.getDay();
        // Mardi = 2
        const diff = day <= 2 ? (2 - day) : (9 - day);
        date.setDate(date.getDate() + diff);
        date.setHours(19, 0, 0, 0);
        return date;
    };

    // Initialiser les événements avec logique correcte
    const [events] = useState(() => {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();

        // Ambrasés - premier lundi du mois
        const ambrasesDate = findFirstMonday(currentYear, currentMonth);
        // Si le premier lundi est passé, prendre le premier lundi du mois suivant
        if (ambrasesDate < now) {
            ambrasesDate.setMonth(currentMonth + 1);
            findFirstMonday(currentYear, currentMonth + 1);
        }

        // Culte - prochain dimanche
        const culteDate = getNextSunday();

        // FIJ - tous les mardis à 19h
        const fijDate = getNextTuesday();

        return [
            {
                id: 1,
                day: ambrasesDate.getDate(),
                month: ambrasesDate.getMonth(),
                year: ambrasesDate.getFullYear(),
                date: ambrasesDate,
                time: '19:00',
                location: 'EJP Porto',
                title: 'Embrasé.e.s',
                description:
                    'Une soirée de prière et d\'adoration où tu es ambrasés par le Saint Esprit. Un moment spirituel intense pour recharger ton âme.',
                image: '/images/embrases4.jpeg',
            },
            {
                id: 2,
                day: culteDate.getDate(),
                month: culteDate.getMonth(),
                year: culteDate.getFullYear(),
                date: culteDate,
                time: '15:30',
                location: 'EJP Porto',
                title: 'CULTE EJP',
                description:
                    'Un culte, une expérience! Rejoins-nous pour un moment de communion fraternelle et de louange ensemble.',
                image: '/images/culte2.jpeg',
            },
            {
                id: 3,
                day: fijDate.getDate(),
                month: fijDate.getMonth(),
                year: fijDate.getFullYear(),
                date: fijDate,
                time: '19:15',
                location: 'EJP Porto',
                title: 'FIJ - Famille D\'Impact Jeunes',
                description:
                    'Des soirées d\'échanges et de communion avec ta famille d\'impact. Moments de partage et de bénédictions.',
                image: '/fij/image.jpg',
            },
        ];
    });

    // Calcul de l'événement à la une (le plus proche)
    const featuredEvent = useMemo(() => {
        const now = new Date();
        const upcomingEvents = events.filter(event => event.date > now);

        if (upcomingEvents.length === 0) {
            return events[0];
        }

        const closest = upcomingEvents.sort((a, b) => a.date - b.date)[0];
        return closest;
    }, [events]);

    // Événements à afficher dans la grille (sauf celui à la une)
    const otherEvents = useMemo(() => {
        const now = new Date();
        return events
            .filter(event => event.id !== featuredEvent.id && event.date > now)
            .sort((a, b) => a.date - b.date);
    }, [events, featuredEvent]);

    // ============ ANIMATION VARIANTS ============

    // 1. Hero section
    const heroVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
            },
        },
    };

    // 2. Badge
    const badgeVariants = {
        hidden: { opacity: 0, scale: 0, rotate: -180 },
        visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
                type: 'spring',
                stiffness: 150,
                damping: 15,
            },
        },
        pulse: {
            scale: [1, 1.08, 1],
            transition: {
                duration: 2,
                repeat: Infinity,
            },
        },
    };

    // 3. Title
    const titleVariants = {
        hidden: { opacity: 0, y: 40, letterSpacing: '-0.05em' },
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

    // 4. Subtitle italic
    const subtitleVariants = {
        hidden: { opacity: 0, y: 20, x: -30 },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
                delay: 0.2,
            },
        },
    };

    // 5. Info items
    const infoContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.25,
            },
        },
    };

    const infoItemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 12,
            },
        },
        hover: {
            x: 10,
            transition: { type: 'spring', stiffness: 300, damping: 10 },
        },
    };

    // 6. Description
    const descriptionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
                delay: 0.3,
            },
        },
    };

    // 7. Background image parallax
    const imageParallaxVariants = {
        initial: { scale: 1.05 },
        animate: { scale: 1 },
    };

    return (
        <div className="bg-black min-h-screen text-gray-400 font-sans">
            {/* Fixed Nav */}
            <div className="fixed top-0 right-0 left-0 z-50">
                <Nav />
            </div>

            <main className="">
                {/* Spacer */}
                <div className="h-20 lg:h-32" />

                {/* Hero Section: Featured Event */}
                <section className="relative min-h-[70vh] md:min-h-[80vh] lg:min-h-[85vh] flex items-center pt-12 md:pt-20 lg:pt-24 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <motion.img
                            src={featuredEvent.image}
                            className="w-full h-full object-cover brightness-90 contrast-125 saturate-100"
                            alt="Featured"
                            variants={imageParallaxVariants}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        />
                        <div className="absolute inset-0 bg-linear-to-r from-black via-black/50 to-transparent" />
                        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
                    </div>

                    <motion.div
                        className="container mx-auto px-6 relative z-10"
                        variants={heroVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <div className="max-w-3xl">
                            {/* Badge */}
                            <motion.span
                                variants={badgeVariants}
                                animate={['visible', 'pulse']}
                                className="inline-flex items-center gap-2 bg-amber-600/20 text-amber-500 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8"
                            >
                                <motion.span
                                    className="relative flex h-2 w-2"
                                    animate={{ scale: [1, 1.3, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                                </motion.span>
                                Événement à la une
                            </motion.span>

                            {/* Title */}
                            <motion.h2
                                variants={titleVariants}
                                className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6"
                            >
                                {featuredEvent.title}
                            </motion.h2>

                            {/* Subtitle */}
                            <motion.p
                                variants={subtitleVariants}
                                className="text-xl md:text-2xl text-gray-300 font-light italic mb-8 border-l-4 border-amber-600 pl-6"
                            >
                                Prochainement le {featuredEvent.day} {monthNames[featuredEvent.month]}
                            </motion.p>

                            {/* Info items */}
                            <motion.div
                                variants={infoContainerVariants}
                                className="flex flex-wrap gap-8 mb-12"
                            >
                                <motion.div
                                    variants={infoItemVariants}
                                    whileHover="hover"
                                    className="flex items-center gap-3"
                                >
                                    <Calendar className="text-amber-500" />
                                    <div>
                                        <p className="text-white font-bold leading-none">
                                            {featuredEvent.day} {monthNames[featuredEvent.month]} {featuredEvent.year}
                                        </p>
                                        <p className="text-[10px] uppercase tracking-widest text-gray-500">Date</p>
                                    </div>
                                </motion.div>
                                <motion.div
                                    variants={infoItemVariants}
                                    whileHover="hover"
                                    className="flex items-center gap-3"
                                >
                                    <Clock className="text-amber-500" />
                                    <div>
                                        <p className="text-white font-bold leading-none">{featuredEvent.time}</p>
                                        <p className="text-[10px] uppercase tracking-widest text-gray-500">Heure</p>
                                    </div>
                                </motion.div>
                                <motion.div
                                    variants={infoItemVariants}
                                    whileHover="hover"
                                    className="flex items-center gap-3"
                                >
                                    <MapPin className="text-amber-500" />
                                    <div>
                                        <p className="text-white font-bold leading-none">{featuredEvent.location}</p>
                                        <p className="text-[10px] uppercase tracking-widest text-gray-500">Lieu</p>
                                    </div>
                                </motion.div>
                            </motion.div>

                            {/* Description */}
                            <motion.p
                                variants={descriptionVariants}
                                className="text-gray-300 font-light text-lg leading-relaxed mb-12 max-w-2xl"
                            >
                                {featuredEvent.description}
                            </motion.p>
                        </div>
                    </motion.div>
                </section>

                {/* Coming Next Section */}
                <ComingNext events={events} />

                {/* Events Grid Section */}
                {otherEvents.length > 0 && (
                    <section className="relative bg-black py-24 px-6">
                        <div className="absolute inset-0 opacity-5" style={{
                            backgroundImage: `linear-gradient(90deg, rgba(217,119,6,0.1) 1px, transparent 1px), linear-gradient(rgba(217,119,6,0.1) 1px, transparent 1px)`,
                            backgroundSize: '80px 80px',
                        }} />

                        <div className="container mx-auto max-w-7xl relative z-10">
                            {/* Section title */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 80,
                                    damping: 15,
                                }}
                                className="mb-20 text-center"
                            >
                                <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4">
                                    Autres Rendez-vous
                                </h3>
                                <p className="text-amber-500 text-sm md:text-base font-bold uppercase tracking-[0.3em]">
                                    Tous nos événements
                                </p>
                            </motion.div>

                            {/* Events grid */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                {otherEvents.map((event, idx) => (
                                    <EventCard key={event.id} event={event} index={idx} />
                                ))}
                            </motion.div>
                        </div>
                    </section>
                )}
            </main>

            {/* Contact Section */}
            <section id="contact" className="py-32 bg-zinc-950">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <Contact
                        verset={{
                            verset:
                                "O Dieu! tu es mon Dieu, je te cherche; Mon âme a soif de toi, mon corps soupire après toi, Dans une terre aride, desséchée, sans eau",
                            ref: 'Psaume 63: 2',
                        }}
                    />
                </motion.div>
            </section>

            <Footer />
        </div>
    );
};

export default EventsPage;