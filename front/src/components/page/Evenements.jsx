import { Calendar, MapPin, Clock, ArrowRight, Share2 } from 'lucide-react';
import { Nav, Footer, Contact } from '../.'
import { useState, useMemo } from 'react';
import ComingNext from './ComingNext';

const EventCard = ({ event }) => {
    const monthNames = ['JAN', 'FÉV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUL', 'AOU', 'SEP', 'OCT', 'NOV', 'DÉC'];

    return (
        <div className="group relative pt-4 mt-10 bg-zinc-950 border border-white/5 rounded-4xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-amber-600/5 flex flex-col h-full">
            {/* Date Badge flottant */}
            <div className="absolute top-6 left-6 z-20 bg-amber-600 text-black px-4 py-2 rounded-xl text-center shadow-xl">
                <span className="block text-lg font-black leading-none">{event.day}</span>
                <span className="block text-[10px] font-bold uppercase tracking-widest">{monthNames[event.month]}</span>
            </div>

            {/* Image Container */}
            <div className="relative h-64 overflow-hidden">
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="p-20 flex flex-col grow">
                <div className="flex flex-wrap items-center gap-4 mb-4 text-amber-500/60">
                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest">
                        <Clock size={12} /> {event.time}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest">
                        <MapPin size={12} /> {event.location}
                    </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-amber-500 transition-colors">
                    {event.title}
                </h3>

                <p className="text-gray-500 text-sm font-light leading-relaxed mb-8 line-clamp-3">
                    {event.description}
                </p>

                {/* <div className="mt-auto">
                    <button className="w-full py-4 bg-zinc-900 border border-white/5 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl group-hover:bg-amber-600 group-hover:text-black transition-all duration-300">
                        Réserver ma place
                    </button>
                </div> */}
            </div>
        </div>
    );
};

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
                time: "19:00",
                location: "EJP Porto",
                title: "Embrasé.e.s",
                description: "Une soirée de prière et d'adoration où tu es ambrasés par le Saint Esprit. Un moment spirituel intense pour recharger ton âme.",
                image: "/images/embrases4.jpeg"
            },
            {
                id: 2,
                day: culteDate.getDate(),
                month: culteDate.getMonth(),
                year: culteDate.getFullYear(),
                date: culteDate,
                time: "15:30",
                location: "EJP Porto",
                title: "CULTE EJP",
                description: "Un culte, une expérience! Rejoins-nous pour un moment de communion fraternelle et de louange ensemble.",
                image: "/images/culte2.jpeg"
            },
            {
                id: 3,
                day: fijDate.getDate(),
                month: fijDate.getMonth(),
                year: fijDate.getFullYear(),
                date: fijDate,
                time: "19:15",
                location: "EJP Porto",
                title: "FIJ - Famille D'Impact Jeunes",
                description: "Des soirées d'échanges et de communion avec ta famille d'impact. Moments de partage et de bénédictions.",
                image: "/fij/image.jpg"
            }
        ];
    });

    // Calcul de l'événement à la une (le plus proche)
    const featuredEvent = useMemo(() => {
        const now = new Date();
        const upcomingEvents = events.filter(event => event.date > now);

        if (upcomingEvents.length === 0) {
            // Si pas d'événements à venir, afficher le premier de la liste
            return events[0];
        }

        // Trier par date et prendre le plus proche
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

    return (
        <div className="bg-black min-h-screen text-gray-400 font-sans">
            {/* Fixed Nav */}
            <div className='fixed top-0 right-0 left-0 z-50'>
                <Nav />
            </div>

            <main className="">
                {/* Spacer pour compenser la hauteur de la Nav fixe */}
                <div className="h-20 lg:h-32" />

                {/* Hero Section: Featured Event */}
                <section className="relative min-h-[70vh] md:min-h-[80vh] lg:min-h-[85vh] flex items-center pt-12 md:pt-20 lg:pt-24">
                    <div className="absolute inset-0 overflow-hidden">
                        <img
                            src={featuredEvent.image}
                            className="w-full h-full object-cover brightness-90 contrast-125 saturate-100"
                            alt="Featured"
                        />
                        <div className="absolute inset-0 bg-linear-to-r from-black via-black/50 to-transparent" />
                        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
                    </div>

                    <div className="container mx-auto px-6 relative z-10">
                        <div className="max-w-3xl">
                            <span className="inline-flex items-center gap-2 bg-amber-600/20 text-amber-500 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                                </span>
                                Événement à la une
                            </span>

                            <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6">
                                {featuredEvent.title}
                            </h2>

                            <p className="text-xl md:text-2xl text-gray-300 font-light italic mb-8 border-l-4 border-amber-600 pl-6">
                                Prochainement le {featuredEvent.day} {monthNames[featuredEvent.month]}
                            </p>

                            <div className="flex flex-wrap gap-8 mb-12">
                                <div className="flex items-center gap-3">
                                    <Calendar className="text-amber-500" />
                                    <div>
                                        <p className="text-white font-bold leading-none">{featuredEvent.day} {monthNames[featuredEvent.month]} {featuredEvent.year}</p>
                                        <p className="text-[10px] uppercase tracking-widest text-gray-500">Date</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Clock className="text-amber-500" />
                                    <div>
                                        <p className="text-white font-bold leading-none">{featuredEvent.time}</p>
                                        <p className="text-[10px] uppercase tracking-widest text-gray-500">Heure</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPin className="text-amber-500" />
                                    <div>
                                        <p className="text-white font-bold leading-none">{featuredEvent.location}</p>
                                        <p className="text-[10px] uppercase tracking-widest text-gray-500">Lieu</p>
                                    </div>
                                </div>
                            </div>

                            <p className="text-gray-300 font-light text-lg leading-relaxed mb-12 max-w-2xl">
                                {featuredEvent.description}
                            </p>

                            {/* <button className="bg-white text-black px-12 py-5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-amber-500 transition-all flex items-center gap-4 group shadow-2xl shadow-white/5">
                                S'inscrire maintenant
                                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                            </button> */}
                        </div>
                    </div>
                </section>

                {/* Coming Next Animation Section */}
                <ComingNext events={events} />
                <Contact />
            </main>
            <Footer />
        </div>
    );
};

export default EventsPage;