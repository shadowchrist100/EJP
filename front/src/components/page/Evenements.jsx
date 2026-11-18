import { Calendar, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Nav, Footer, Contact } from '../.';
import { useLayoutEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GoldParticles from '../fx/GoldParticles';
import ScrollMarquee from '../fx/ScrollMarquee';
import useScrollReveal from '../fx/useScrollReveal';
import ComingNext from './Index/ComingNext';
import EventCard from './Index/EventCard';
import ContentManager from '../admin/ContentManager';
import { useContentApi } from '../../hooks/useContentApi';
import { eventFields, eventColumns, eventMapper } from '../../util/contentConfigs';

gsap.registerPlugin(SplitText, ScrollTrigger);

const EventsPage = () => {
    const pageRef = useRef(null);
    useScrollReveal(pageRef);

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

    // Initialiser les événements par défaut (repli si l'API est vide / indisponible)
    const defaultEvents = useMemo(() => {
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
                    'Un moment spirituelle intense pour recharger ton homme intérieur',
                image: '/images/embrasees.jpeg',
            },
            {
                id: 2,
                day: culteDate.getDate(),
                month: culteDate.getMonth(),
                year: culteDate.getFullYear(),
                date: culteDate,
                time: '15:30',
                location: 'EJP Porto',
                title: 'Prodiges Expérience',
                description:
                    'Un culte, une expérience! Rejoins-nous pour vivre un culte une expérience.',
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
    }, []);

    // Chargement des événements depuis l'API (avec repli sur les défauts ci-dessus)
    const {
        data: events,
        raw: rawEvents,
        refresh: refreshEvents,
    } = useContentApi('/events', defaultEvents, eventMapper);

    // Calcul de l'événement à la une (le plus proche)
    const featuredEvent = useMemo(() => {
        if (events.length === 0) return null;
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
        if (events.length === 0) return [];
        const now = new Date();
        return events
            .filter(event => event.id !== featuredEvent.id && event.date > now)
            .sort((a, b) => a.date - b.date);
    }, [events, featuredEvent]);

    return (
        <div ref={pageRef} className="ev-page min-h-screen text-gray-400 font-sans">
            {/* Fixed Nav */}
            <div className="fixed top-0 right-0 left-0 z-50">
                <Nav />
            </div>

            <main>
                {featuredEvent ? (
                    <>
                        {/* Hero: featured event on a lit stage (remounts when the featured event changes) */}
                        <FeaturedStage key={`${featuredEvent.id}-${featuredEvent.title}-${featuredEvent.day}`} event={featuredEvent} monthNames={monthNames} />

                        {/* Coming Next: stage carousel */}
                        <ComingNext events={events} />

                        {/* Events Grid Section */}
                        {otherEvents.length > 0 && (
                            <section className="relative py-24 md:py-32 px-6 overflow-hidden">
                                <div className="ev-grid-bg" aria-hidden="true" />
                                <ScrollMarquee text="Rendez-vous" from="5%" to="-35%" style={{ top: '4rem' }} />

                                <div className="container mx-auto max-w-7xl relative z-10">
                                    <div className="mb-16 md:mb-20 text-center">
                                        <h3 className="ev-h2" data-reveal="chars">Autres Rendez-vous</h3>
                                        <p className="ev-kicker" data-reveal="up">Tous nos événements</p>
                                    </div>

                                    <div className="ev-cards">
                                        {otherEvents.map((event, idx) => (
                                            <EventCard key={event.id} event={event} index={idx} />
                                        ))}
                                    </div>
                                </div>
                            </section>
                        )}
                    </>
                ) : (
                    <div className="min-h-[70vh] flex items-center justify-center px-6 pt-32">
                        <div className="text-center">
                            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
                                AUCUN ÉVÉNEMENT
                            </h2>
                            <p className="text-gray-500 font-light">
                                Aucun événement à venir pour le moment. Reviens bientôt !
                            </p>
                        </div>
                    </div>
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

            {/* Panneau d'administration des événements */}
            <ContentManager
                title="Événements"
                singular="un événement"
                subtitle="Ajoutez, modifiez ou supprimez les événements du site."
                items={rawEvents}
                onRefresh={refreshEvents}
                apiPath="/admin/events"
                fields={eventFields}
                columns={eventColumns}
            />
        </div>
    );
};

/* ─── Hero : événement à la une, mis en scène ─────────────────────────── */

const FeaturedStage = ({ event, monthNames }) => {
    const ref = useRef(null);
    const compact = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;

    useLayoutEffect(() => {
        const section = ref.current;
        const mm = gsap.matchMedia();
        const ctx = gsap.context(() => {
            mm.add('(prefers-reduced-motion: no-preference)', () => {
                const title = SplitText.create('.evf-title', { type: 'words,chars', mask: 'chars' });
                const big = SplitText.create('.evf-bignum', { type: 'chars' });

                // Curtain opens on the poster, beams light up, then the type choreography.
                gsap.timeline({ delay: 0.15, defaults: { ease: 'expo.out' } })
                    .fromTo('.evf-media', { clipPath: 'inset(50% 0% 50% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.7, ease: 'expo.inOut' }, 0)
                    .fromTo('.evf-media img', { scale: 1.45 }, { scale: 1.06, duration: 2.6 }, 0)
                    .fromTo('.evf-beam', { opacity: 0, scaleY: 0.2 }, { opacity: 1, scaleY: 1, duration: 1.6, stagger: 0.15 }, 0.7)
                    .from(big.chars, { yPercent: 120, rotateX: -90, opacity: 0, duration: 1.8, stagger: 0.12 }, 0.8)
                    .fromTo('.evf-badge', { scale: 0, rotate: -180, opacity: 0 }, { scale: 1, rotate: 0, opacity: 1, duration: 1.1, ease: 'back.out(1.8)', clearProps: 'transform,opacity' }, 0.9)
                    .from(title.chars, { yPercent: 120, rotate: 12, duration: 1.3, stagger: 0.03 }, 1.0)
                    .fromTo('.evf-sub', { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'expo.inOut', clearProps: 'clipPath' }, 1.3)
                    .fromTo('.evf-chip', { y: 50, opacity: 0, scale: 0.85 }, { y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.1, clearProps: 'transform,opacity' }, 1.45)
                    .fromTo('.evf-desc', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, clearProps: 'transform,opacity' }, 1.7);

                // Scroll: poster drifts and zooms, number rises, copy leaves the stage.
                gsap.timeline({ scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: 0.6 } })
                    .to('.evf-media-drift', { yPercent: 14, scale: 1.18, ease: 'none' }, 0)
                    .to('.evf-bignum', { yPercent: -35, ease: 'none' }, 0)
                    .to('.evf-content', { y: -100, opacity: 0, ease: 'none' }, 0);
            });
        }, section);
        return () => { mm.revert(); ctx.revert(); };
    }, []);

    // Spotlight follows the cursor (CSS vars, no React re-render)
    const onPointerMove = (e) => {
        const r = ref.current.getBoundingClientRect();
        ref.current.style.setProperty('--sx', `${e.clientX - r.left}px`);
        ref.current.style.setProperty('--sy', `${e.clientY - r.top}px`);
    };

    return (
        <section ref={ref} className="evf" onPointerMove={onPointerMove} aria-label="Événement à la une">
            <div className="evf-media">
                <div className="evf-media-drift">
                    <img src={event.image} alt="" className="evf-img" fetchPriority="high" decoding="async" />
                </div>
                <div className="evf-shade" aria-hidden="true" />
            </div>

            <span className="evf-beam evf-beam--l" aria-hidden="true" />
            <span className="evf-beam evf-beam--r" aria-hidden="true" />
            <GoldParticles count={compact ? 450 : 1100} variant="rise" speed={1.4} />
            <span className="evf-spot" aria-hidden="true" />

            <div className="evf-bignum" aria-hidden="true">
                {String(event.day).padStart(2, '0')}
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="evf-content max-w-3xl">
                    <span className="evf-badge">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                        </span>
                        Événement à la une
                    </span>

                    <h2 className="evf-title">{event.title}</h2>

                    <p className="evf-sub">
                        Prochainement le {event.day} {monthNames[event.month]}
                    </p>

                    <div className="flex flex-wrap gap-3 md:gap-4 mb-10">
                        <div className="evf-chip glass-gold">
                            <Calendar className="text-amber-500" />
                            <div>
                                <p className="text-white font-bold leading-none">{event.day} {monthNames[event.month]} {event.year}</p>
                                <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-1">Date</p>
                            </div>
                        </div>
                        <div className="evf-chip glass-gold">
                            <Clock className="text-amber-500" />
                            <div>
                                <p className="text-white font-bold leading-none">{event.time}</p>
                                <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-1">Heure</p>
                            </div>
                        </div>
                        <div className="evf-chip glass-gold">
                            <MapPin className="text-amber-500" />
                            <div>
                                <p className="text-white font-bold leading-none">{event.location}</p>
                                <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-1">Lieu</p>
                            </div>
                        </div>
                    </div>

                    <p className="evf-desc">{event.description}</p>
                </div>
            </div>
        </section>
    );
};

export default EventsPage;
