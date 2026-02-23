import { Calendar, MapPin, Clock, ArrowRight, Share2 } from 'lucide-react';
import Nav from '../common/Nav';


const EventCard = ({ event }) => (
    <div className="group relative bg-zinc-950 border border-white/5 rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-amber-600/5 flex flex-col h-full">
        {/* Date Badge flottant */}
        <div className="absolute top-6 left-6 z-20 bg-amber-600 text-black px-4 py-2 rounded-xl text-center shadow-xl">
            <span className="block text-lg font-black leading-none">{event.day}</span>
            <span className="block text-[10px] font-bold uppercase tracking-widest">{event.month}</span>
        </div>

        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
            <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col flex-grow">
            <div className="flex items-center gap-4 mb-4 text-amber-500/60">
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

            <div className="mt-auto">
                <button className="w-full py-4 bg-zinc-900 border border-white/5 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl group-hover:bg-amber-600 group-hover:text-black transition-all duration-300">
                    Réserver ma place
                </button>
            </div>
        </div>
    </div>
);

const EventsPage = () => {
    const featuredEvent = {
        title: "CONFÉRENCE IMPACT 2024",
        subtitle: "Le rassemblement annuel de la jeunesse",
        day: "24",
        month: "AOÛT",
        time: "18:00",
        location: "Auditorium Principal",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070",
        description: "Un temps exceptionnel de louange, d'enseignement et de communion fraternelle pour propulser ta destinée vers de nouveaux sommets."
    };

    const upcomingEvents = [
        { id: 1, day: "12", month: "SEPT", time: "19:00", location: "EJP Porto", title: "Ambrasés", description: "Une veillée de prière intense pour tous les serviteurs actifs du royaume.", image: "https://images.unsplash.com/photo-1514525253361-b83f859b73c0?w=800" },
        { id: 2, day: "05", month: "OCT", time: "09:00", location: "EJP Porto", title: "CULTE EJP", description: "Atelier pratique sur le leadership créatif et la gestion de projets ministériels.", image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800" },
        { id: 3, day: "20", month: "OCT", time: "16:00", location: "EJP Porto", title: "FIJ", description: "Un concert acoustique intimiste pour une rencontre authentique avec le divin.", image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800" }
    ];

    return (
        <div className="bg-black min-h-screen text-gray-400 font-sans">
            <Nav />

            <main className="pt-20">
                {/* Hero Section: Featured Event */}
                <section className="relative min-h-[85vh] flex items-center">
                    <div className="absolute inset-0 overflow-hidden">
                        <img
                            src={featuredEvent.image}
                            className="w-full h-full object-cover scale-105 opacity-40 grayscale-[0.5]"
                            alt="Featured"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
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
                                {featuredEvent.subtitle}
                            </p>

                            <div className="flex flex-wrap gap-8 mb-12">
                                <div className="flex items-center gap-3">
                                    <Calendar className="text-amber-500" />
                                    <div>
                                        <p className="text-white font-bold leading-none">{featuredEvent.day} {featuredEvent.month}</p>
                                        <p className="text-[10px] uppercase tracking-widest text-gray-500">Date</p>
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

                            <button className="bg-white text-black px-12 py-5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-amber-500 transition-all flex items-center gap-4 group shadow-2xl shadow-white/5">
                                S'inscrire maintenant
                                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </div>
                </section>

                {/* Upcoming Events Grid */}
                <section className="py-32 px-6">
                    <div className="container mx-auto max-w-[1550px]">
                        <div className="flex justify-between items-end mb-16 border-b border-white/5 pb-8">
                            <div>
                                <h3 className="text-4xl font-bold text-white tracking-tighter">PROCHAINS <span className="text-amber-500 italic">RENDEZ-VOUS</span></h3>
                                <p className="text-gray-500 text-sm mt-2 font-light tracking-widest uppercase">Ne manquez aucun moment d'impact</p>
                            </div>
                            <div className="hidden md:flex gap-4">
                                <button className="p-4 border border-white/10 rounded-full hover:bg-white/5 transition-all text-white"><Share2 size={18} /></button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {upcomingEvents.map(event => (
                                <EventCard key={event.id} event={event} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Newsletter / Stay Updated - Style STAR */}
                <section className="py-24 px-6 bg-zinc-950 border-y border-white/5">
                    <div className="container mx-auto max-w-4xl text-center">
                        <h4 className="text-3xl font-bold text-white mb-4">Restez informé</h4>
                        <p className="text-gray-500 mb-10 font-light italic">Reçois les notifications pour les nouveaux événements directement sur WhatsApp ou par email.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <input
                                type="email"
                                placeholder="votre@email.com"
                                className="bg-black border border-white/10 px-8 py-4 rounded-full text-white outline-none focus:border-amber-500 transition-all w-full sm:w-96"
                            />
                            <button className="bg-amber-600 text-black px-10 py-4 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-white transition-all">
                                S'abonner
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default EventsPage;