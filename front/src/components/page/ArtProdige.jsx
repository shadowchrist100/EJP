import React, { useState } from 'react';
import Nav from '../common/Nav';
import Footer from '../common/Footer';
import { BookOpen, Palette, Film, Music, Image, ArrowRight, X, ChevronRight, Play, Download, Sparkles } from 'lucide-react';

const ArtProdige = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [expandedWork, setExpandedWork] = useState(null);

    const categories = [
        { id: 'all', label: 'Toutes les œuvres', icon: Image },
        { id: 'book', label: 'Livres', icon: BookOpen },
        { id: 'art', label: 'Art Visuel', icon: Palette },
        { id: 'film', label: 'Métrage', icon: Film },
        { id: 'sound', label: 'Son', icon: Music },
    ];

    // Fonction pour extraire l'ID YouTube d'une URL
    const getYoutubeId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11 ? match[2] : null;
    };

    // Fonction pour générer l'URL de la thumbnail YouTube
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
            description: 'Un recueil de contes poétiques explorant les frontières entre réalité et imagination. Une œuvre touchante qui inspire les jeunes à rêver grand et à croire en leurs visions.',
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
            title: 'Derrière le voil',
            author: 'EJP Porto',
            youtubeUrl: 'https://youtu.be/lOf1ls3giIw?si=c-qyP2tH44Z1u__q',
            description: 'Court métrage expérimental jouant avec les effets de lumière et d\'ombre. Une œuvre cinématographique captivante sur la beauté des instants éphémères.',
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
            description: 'Un hymne inspirant qui célèbre la priorité de mettre Dieu en premier. Une composition musicale puissante et mémorable.',
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
            description: 'Manuel pratique rassemblant techniques et conseils des artistes de l\'école. Une ressource complète pour inspirer et guider les jeunes créatifs.',
            duration: '3 min',
            year: 2024,
            type: 'youtube',
        },
    ];

    const filteredWorks = selectedCategory === 'all'
        ? works
        : works.filter(work => work.category === selectedCategory);

    // Composant pour afficher une carte d'œuvre
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
            <div
                key={work.id}
                className="group cursor-pointer animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${idx * 100}ms` }}
            >
                <div
                    onClick={handleClickYoutube}
                    className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-950 to-black border border-white/10 hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20 hover:-translate-y-2"
                >
                    {/* Image */}
                    <div className="aspect-square overflow-hidden bg-gradient-to-br from-zinc-800 to-black">
                        <img
                            src={thumbnailUrl}
                            alt={work.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                    </div>

                    {/* Overlay pour YouTube avec bouton Play */}
                    {isYoutube ? (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-2xl shadow-red-600/50 group-hover:scale-110 transition-transform duration-300">
                                <Play size={32} className="text-white fill-white ml-1" />
                            </div>
                        </div>
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                            <button className="inline-flex items-center gap-2 text-sm font-bold text-white bg-gradient-to-r from-amber-500 to-yellow-500 px-4 py-2 rounded-lg hover:shadow-lg w-fit">
                                Voir plus
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}

                    {/* Badge année */}
                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-amber-400 border border-amber-500/30">
                        {work.year}
                    </div>

                    {/* Badge YouTube */}
                    {isYoutube && (
                        <div className="absolute top-4 left-4 bg-red-600 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-white border border-red-500/50 flex items-center gap-2">
                            <Film size={12} />
                            YouTube
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="mt-4 space-y-1">
                    <h3 className="font-black text-white group-hover:text-amber-400 transition-colors text-lg">
                        {work.title}
                    </h3>
                    <p className="text-sm text-gray-500 font-light">{work.author}</p>
                    {work.duration && (
                        <p className="text-xs text-gray-600 italic">{work.duration}</p>
                    )}
                    {isYoutube && (
                        <p className="text-xs text-red-400 font-semibold">Cliquez pour regarder sur YouTube</p>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="relative flex min-h-screen flex-col bg-black text-gray-400">
            {/* Navigation */}
            <div className='fixed top-0 right-0 left-0 z-50'>
                <Nav />
            </div>

            {/* Spacer pour compenser la hauteur de la Nav fixe */}
            <div className="h-20 lg:h-32" />

            <main className="grow">
                {/* Hero Section */}
                <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden px-4 md:px-8">
                    {/* Background avec gradient et animation */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
                        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-zinc-900" />
                    </div>

                    {/* Content */}
                    <div className="container mx-auto max-w-4xl relative z-10">
                        <div className="pt-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <div className=" inline-flex items-center gap-3 mb-8 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full backdrop-blur-sm group hover:bg-amber-500/20 transition-all duration-300">
                                <Palette className="text-amber-500 animate-pulse" size={16} />
                                <span className="text-amber-500 font-bold tracking-[0.3em] uppercase text-xs">
                                    Créativité Sans Limites
                                </span>
                            </div>

                            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-none">
                                Découvrez les <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600">Œuvres</span> de nos Jeunes Prodiges
                            </h1>

                            <p className="text-lg md:text-xl text-gray-300 font-light mb-10 leading-relaxed max-w-3xl mx-auto">
                                Une galerie exceptionnelle mettant en avant les talents artistiques, littéraires et créatifs des Jeunes Prodiges de Porto Novo.
                            </p>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto">
                                <div className="p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm hover:border-amber-500/50 transition-all duration-300">
                                    <p className="text-3xl font-black text-amber-400 mb-1">{works.length}</p>
                                    <p className="text-xs text-gray-400 uppercase tracking-widest font-light">Œuvres</p>
                                </div>
                                <div className="p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm hover:border-amber-500/50 transition-all duration-300">
                                    <p className="text-3xl font-black text-amber-400 mb-1">5</p>
                                    <p className="text-xs text-gray-400 uppercase tracking-widest font-light">Catégories</p>
                                </div>
                                <div className="p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm hover:border-amber-500/50 transition-all duration-300">
                                    <p className="text-3xl font-black text-amber-400 mb-1">2024</p>
                                    <p className="text-xs text-gray-400 uppercase tracking-widest font-light">Depuis</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section Inspirante - Verset biblique */}
                <section className="relative py-24 px-4 md:px-8 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-amber-500/10 pointer-events-none" />
                    <div className="absolute -top-20 -right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />

                    <div className="container mx-auto max-w-4xl relative z-10">
                        <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                            {/* Icône inspirante */}
                            <div className="inline-flex items-center justify-center mb-8">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-2xl animate-pulse" />
                                    <div className="relative p-4 bg-gradient-to-br from-amber-500/20 to-yellow-500/10 rounded-full border border-amber-500/30">
                                        <Sparkles className="text-amber-400" size={32} />
                                    </div>
                                </div>
                            </div>

                            {/* Titre */}
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tighter leading-tight">
                                Remplis de l'<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600">Esprit Divin</span>
                            </h2>

                            {/* Verset biblique */}
                            <blockquote className="mb-8 relative">
                                <div className="absolute left-0 top-0 w-1 h-12 bg-gradient-to-b from-amber-500 to-transparent" />
                                <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed italic pl-6 max-w-3xl mx-auto">
                                    <span className="text-amber-400 font-bold">"</span>Je l'ai rempli de l'Esprit de Dieu, de sagesse, d'intelligence, et de savoir pour toutes sortes d'ouvrages.<span className="text-amber-400 font-bold">"</span>
                                </p>
                                <p className="text-sm text-gray-500 mt-4">Exode 35:31</p>
                            </blockquote>

                            {/* Message inspirant */}
                            <div className="space-y-6 max-w-3xl mx-auto">
                                <p className="text-base md:text-lg text-gray-300 font-light leading-relaxed">
                                    Chaque jeune Prodige porte en lui les dons divins : la <span className="text-amber-400 font-semibold">créativité</span> de l'Esprit, la <span className="text-amber-400 font-semibold">sagesse</span> pour guider ses œuvres, et l'<span className="text-amber-400 font-semibold">intelligence</span> pour transformer ses rêves en réalité.
                                </p>

                                <p className="text-base md:text-lg text-gray-300 font-light leading-relaxed">
                                    Ces <span className="text-amber-400 font-semibold">œuvres d'art, de littérature et de création</span> ne sont pas seulement des expressions personnelles — elles sont des témoignages vivants d'une génération remplie de l'Esprit, appelée à <span className="text-amber-400 font-semibold">transformer son environnement</span> et à <span className="text-amber-400 font-semibold">influencer le monde</span> avec les valeurs du Royaume.
                                </p>

                                <p className="text-base md:text-lg text-gray-300 font-light leading-relaxed">
                                    Nous célébrons chaque talent, chaque vision, chaque création — car <span className="text-amber-400 font-semibold">tous les ouvrages</span> entrepris avec l'Esprit de Dieu portent une puissance transformatrice.
                                </p>
                            </div>

                            {/* Separator */}
                            <div className="mt-12 pt-8 border-t border-white/10">
                                <div className="flex items-center justify-center gap-4">
                                    <div className="w-8 h-px bg-gradient-to-r from-transparent to-amber-500/50" />
                                    <span className="text-xs text-amber-400 font-black uppercase tracking-widest">Inspirés • Créatifs • Impactants</span>
                                    <div className="w-8 h-px bg-gradient-to-l from-transparent to-amber-500/50" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Section with Sidebar */}
                <section className="py-20 px-4 md:px-8 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/50 to-black pointer-events-none" />

                    <div className="container mx-auto max-w-7xl relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                            {/* Sidebar Catégories */}
                            <aside className="lg:col-span-1">
                                <div className="sticky top-40 bg-gradient-to-br from-zinc-950 to-black border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:border-amber-500/30 transition-all duration-300">
                                    <h3 className="text-xl font-black text-white mb-6 tracking-tight">Catégories</h3>

                                    <div className="space-y-2">
                                        {categories.map((cat) => {
                                            const Icon = cat.icon;
                                            const isSelected = selectedCategory === cat.id;
                                            return (
                                                <button
                                                    key={cat.id}
                                                    onClick={() => setSelectedCategory(cat.id)}
                                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-left group ${isSelected
                                                        ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold shadow-lg shadow-amber-500/30'
                                                        : 'text-gray-300 hover:bg-white/5 hover:text-amber-400 border border-transparent hover:border-amber-500/30'
                                                        }`}
                                                >
                                                    <Icon className={`w-5 h-5 flex-shrink-0 transition-transform ${isSelected ? '' : 'group-hover:scale-110'}`} />
                                                    <span className="text-sm font-bold flex-1">{cat.label}</span>
                                                    {isSelected && <ChevronRight className="w-4 h-4" />}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Counter */}
                                    <div className="mt-8 pt-6 border-t border-white/10">
                                        <p className="text-xs text-gray-500 text-center font-light">
                                            {filteredWorks.length} {filteredWorks.length > 1 ? 'œuvre' : 'œuvre'}
                                        </p>
                                    </div>
                                </div>
                            </aside>

                            {/* Gallery */}
                            <div className="lg:col-span-4">
                                {/* Section Header */}
                                <div className="mb-12 animate-in fade-in slide-in-from-bottom-4">
                                    <h2 className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tighter">
                                        {categories.find(c => c.id === selectedCategory)?.label}
                                    </h2>
                                    <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full" />
                                </div>

                                {/* Works Grid */}
                                {filteredWorks.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {filteredWorks.map((work, idx) => (
                                            <WorkCard key={work.id} work={work} idx={idx} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-20 text-center">
                                        <Palette className="w-16 h-16 text-gray-700 mb-4" />
                                        <h3 className="text-2xl font-black text-white mb-2">Aucune œuvre trouvée</h3>
                                        <p className="text-gray-500">Sélectionnez une autre catégorie</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Modal Détail */}
                {expandedWork && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300 overflow-y-auto">
                        <div
                            className="bg-gradient-to-br from-zinc-900 to-black border-2 border-white/10 rounded-3xl w-full max-w-2xl my-8"
                            style={{ animation: 'slideUp 0.3s ease-out' }}
                        >
                            <div className="p-8">
                                {/* Entête modal */}
                                <div className="flex items-start justify-between mb-6">
                                    <div>
                                        <h3 className="text-3xl font-black text-white mb-2 tracking-tighter">{expandedWork.title}</h3>
                                        <p className="text-gray-400 text-lg font-light">{expandedWork.author}</p>
                                    </div>
                                    <button
                                        onClick={() => setExpandedWork(null)}
                                        className="p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
                                    >
                                        <X className="w-6 h-6 text-gray-400" />
                                    </button>
                                </div>

                                {/* Image - Adaptée pour tous les types (livres, art, etc.) */}
                                <div className="mb-8 rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-800 to-black border border-white/10 flex items-center justify-center p-6 min-h-64">
                                    <img 
                                        src={expandedWork.image} 
                                        alt={expandedWork.title} 
                                        className="max-h-96 w-auto object-contain"
                                    />
                                </div>

                                {/* Infos */}
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-xs font-black text-amber-400 uppercase tracking-widest mb-3">Description</p>
                                        <p className="text-base leading-relaxed text-gray-300 font-light">
                                            {expandedWork.description}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                                        <div>
                                            <p className="text-xs font-black text-amber-400 uppercase tracking-widest mb-2">Année</p>
                                            <p className="text-lg font-black text-white">{expandedWork.year}</p>
                                        </div>
                                        {expandedWork.duration && (
                                            <div>
                                                <p className="text-xs font-black text-amber-400 uppercase tracking-widest mb-2">Durée</p>
                                                <p className="text-lg font-black text-white">{expandedWork.duration}</p>
                                            </div>
                                        )}
                                        <div>
                                            <p className="text-xs font-black text-amber-400 uppercase tracking-widest mb-2">Catégorie</p>
                                            <p className="text-lg font-black text-white capitalize">
                                                {categories.find(c => c.id === expandedWork.category)?.label}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Boutons d'action */}
                                <div className="mt-8 flex flex-col gap-3">
                                    {/* Bouton de téléchargement pour les livres */}
                                    {expandedWork.category === 'book' && expandedWork.downloadUrl && (
                                        <a
                                            href={expandedWork.downloadUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-black uppercase text-xs tracking-widest hover:shadow-2xl hover:shadow-green-500/40 transition-all duration-300 flex items-center justify-center gap-2 group"
                                        >
                                            <Download size={16} className="group-hover:scale-110 transition-transform" />
                                            <span>Télécharger le livre</span>
                                        </a>
                                    )}

                                    {/* Bouton fermer */}
                                    <button
                                        onClick={() => setExpandedWork(null)}
                                        className="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-black rounded-xl font-black uppercase text-xs tracking-widest hover:shadow-2xl hover:shadow-amber-500/40 transition-all duration-300 flex items-center justify-center gap-2 group"
                                    >
                                        <span>Fermer</span>
                                        <X size={16} className="group-hover:rotate-90 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <Footer />

            <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
        </div>
    );
};

export default ArtProdige;