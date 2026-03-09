import React, { useState } from 'react';
import Nav from '../common/Nav';
import Footer from '../common/Footer';
import { BookOpen, Palette, Film, Music, Image, ArrowRight, X, ChevronRight } from 'lucide-react';

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

    const works = [
        {
            id: 1,
            category: 'book',
            title: 'Contes de l\'Horizon',
            author: 'Sophie Dufour',
            image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280"%3E%3Crect fill="%23d4a574" width="200" height="280"/%3E%3Crect fill="%23c9956b" x="10" y="20" width="180" height="240" rx="5"/%3E%3Ctext font-family="Georgia" font-size="24" fill="%23000" text-anchor="middle" x="100" y="130" font-weight="bold"%3EContes de%3C/text%3E%3Ctext font-family="Georgia" font-size="24" fill="%23000" text-anchor="middle" x="100" y="160" font-weight="bold"%3El%27Horizon%3C/text%3E%3C/svg%3E',
            description: 'Un recueil de contes poétiques explorant les frontières entre réalité et imagination. Une œuvre touchante qui inspire les jeunes à rêver grand et à croire en leurs visions.',
            year: 2023,
        },
        {
            id: 2,
            category: 'art',
            title: 'Abstraction Urbaine',
            author: 'Marc Bellini',
            image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 280"%3E%3Crect fill="%23fbbf24" width="280" height="280"/%3E%3Crect fill="%23f59e0b" x="20" y="20" width="100" height="100"/%3E%3Crect fill="%23d97706" x="140" y="50" width="120" height="80"/%3E%3Crect fill="%23b45309" x="30" y="160" width="220" height="100"/%3E%3C/svg%3E',
            description: 'Peinture acrylique mêlant géométrie et couleurs vives, inspirée par l\'architecture contemporaine. Une exploration dynamique des formes urbaines modernes.',
            year: 2024,
        },
        {
            id: 3,
            category: 'film',
            title: 'Lumières Éphémères',
            author: 'Justine Moreau',
            image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 200"%3E%3Crect fill="%231f2937" width="280" height="200"/%3E%3Ccircle cx="70" cy="50" r="20" fill="%23fbbf24"/%3E%3Ccircle cx="180" cy="100" r="30" fill="%23f59e0b"/%3E%3Crect fill="%23111827" x="0" y="140" width="280" height="60"/%3E%3C/svg%3E',
            description: 'Court métrage expérimental jouant avec les effets de lumière et d\'ombre. Une œuvre cinématographique captivante sur la beauté des instants éphémères.',
            duration: '12 min',
            year: 2024,
        },
        {
            id: 4,
            category: 'sound',
            title: 'Symphonie Digitale',
            author: 'Lucas Dubois',
            image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 280"%3E%3Crect fill="%23f59e0b" width="280" height="280"/%3E%3Cpath d="M 140 40 L 160 120 L 240 120 L 180 170 L 200 250 L 140 200 L 80 250 L 100 170 L 40 120 L 120 120 Z" fill="%23fbbf24"/%3E%3Ccircle cx="140" cy="140" r="80" fill="none" stroke="%23d97706" stroke-width="2"/%3E%3C/svg%3E',
            description: 'Composition originale fusion musique électronique et instruments traditionnels. Une symphonie qui défie les frontières entre l\'ancien et le nouveau.',
            duration: '8 min',
            year: 2023,
        },
        {
            id: 5,
            category: 'art',
            title: 'Mosaïque des Rêves',
            author: 'Émilie Rousseau',
            image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 280"%3E%3Crect fill="%23f3f4f6" width="280" height="280"/%3E%3Crect fill="%23fbbf24" x="20" y="20" width="50" height="50"/%3E%3Crect fill="%23f59e0b" x="90" y="20" width="50" height="50"/%3E%3Crect fill="%23d97706" x="160" y="20" width="50" height="50"/%3E%3Crect fill="%23b45309" x="230" y="20" width="30" height="50"/%3E%3Crect fill="%23fde68a" x="20" y="90" width="50" height="50"/%3E%3Crect fill="%23fcd34d" x="90" y="90" width="50" height="50"/%3E%3Crect fill="%23fbbd04" x="160" y="90" width="50" height="50"/%3E%3Crect fill="%23f59e0b" x="230" y="90" width="30" height="50"/%3E%3Crect fill="%23f97316" x="20" y="160" width="50" height="50"/%3E%3Crect fill="%23ea580c" x="90" y="160" width="50" height="50"/%3E%3Crect fill="%23c2410c" x="160" y="160" width="50" height="50"/%3E%3Crect fill="%23b45309" x="230" y="160" width="30" height="50"/%3E%3Crect fill="%23fbbf24" x="20" y="230" width="50" height="30"/%3E%3Crect fill="%23f59e0b" x="90" y="230" width="50" height="30"/%3E%3Crect fill="%23d97706" x="160" y="230" width="50" height="30"/%3E%3Crect fill="%238b7500" x="230" y="230" width="30" height="30"/%3E%3C/svg%3E',
            description: 'Collage numérique composé de 200+ éléments géométriques colorés. Une célébration visuelle de la diversité et de l\'harmonie des rêves.',
            year: 2024,
        },
        {
            id: 6,
            category: 'book',
            title: 'Guide du Jeune Créatif',
            author: 'Collectif EJP',
            image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280"%3E%3Crect fill="%23fbbf24" width="200" height="280"/%3E%3Crect fill="%23f59e0b" x="10" y="20" width="180" height="240" rx="5"/%3E%3Ctext font-family="Georgia" font-size="18" fill="%23000" text-anchor="middle" x="100" y="120" font-weight="bold"%3EGuide du%3C/text%3E%3Ctext font-family="Georgia" font-size="18" fill="%23000" text-anchor="middle" x="100" y="150" font-weight="bold"%3EJeune Créatif%3C/text%3E%3Ctext font-family="Georgia" font-size="12" fill="%23654321" text-anchor="middle" x="100" y="180" font-style="italic"%3EEJP 2024%3C/text%3E%3C/svg%3E',
            description: 'Manuel pratique rassemblant techniques et conseils des artistes de l\'école. Une ressource complète pour inspirer et guider les jeunes créatifs.',
            year: 2024,
        },
    ];

    const filteredWorks = selectedCategory === 'all'
        ? works
        : works.filter(work => work.category === selectedCategory);

    return (
        <div className="relative flex min-h-screen flex-col bg-black text-gray-400">
            {/* Navigation */}
            <div className='fixed top-0 right-0 left-0 z-50'>
                <Nav />
            </div>

            <main className="grow pt-20">
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
                        <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full backdrop-blur-sm group hover:bg-amber-500/20 transition-all duration-300">
                                <Palette className="text-amber-500 animate-pulse" size={16} />
                                <span className="text-amber-500 font-bold tracking-[0.3em] uppercase text-xs">
                                    Créativité Sans Limites
                                </span>
                            </div>

                            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-none">
                                Découvrez les <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600">Œuvres</span> de nos Jeunes Prodiges
                            </h1>

                            <p className="text-lg md:text-xl text-gray-300 font-light mb-10 leading-relaxed max-w-3xl mx-auto">
                                Une galerie exceptionnelle mettant en avant les talents artistiques, littéraires et créatifs des élèves de l'École des Jeunes Prodiges.
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
                                    <p className="text-3xl font-black text-amber-400 mb-1">2023</p>
                                    <p className="text-xs text-gray-400 uppercase tracking-widest font-light">Depuis</p>
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
                                <div className="sticky top-32 bg-gradient-to-br from-zinc-950 to-black border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:border-amber-500/30 transition-all duration-300">
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
                                            <div
                                                key={work.id}
                                                className="group cursor-pointer animate-in fade-in slide-in-from-bottom-4"
                                                style={{ animationDelay: `${idx * 100}ms` }}
                                            >
                                                <div
                                                    onClick={() => setExpandedWork(work)}
                                                    className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-950 to-black border border-white/10 hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20 hover:-translate-y-2"
                                                >
                                                    {/* Image */}
                                                    <div className="aspect-square overflow-hidden bg-gradient-to-br from-zinc-800 to-black">
                                                        <img
                                                            src={work.image}
                                                            alt={work.title}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                        />
                                                    </div>

                                                    {/* Overlay */}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                                        <button className="inline-flex items-center gap-2 text-sm font-bold text-white bg-gradient-to-r from-amber-500 to-yellow-500 px-4 py-2 rounded-lg hover:shadow-lg w-fit">
                                                            Voir plus
                                                            <ArrowRight className="w-4 h-4" />
                                                        </button>
                                                    </div>

                                                    {/* Badge année */}
                                                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-amber-400 border border-amber-500/30">
                                                        {work.year}
                                                    </div>
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
                                                </div>
                                            </div>
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
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
                        <div
                            className="bg-gradient-to-br from-zinc-900 to-black border-2 border-white/10 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
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

                                {/* Image grande */}
                                <div className="mb-8 rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-800 to-black aspect-video border border-white/10">
                                    <img src={expandedWork.image} alt={expandedWork.title} className="w-full h-full object-cover" />
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

                                {/* Bouton fermer */}
                                <button
                                    onClick={() => setExpandedWork(null)}
                                    className="w-full mt-8 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-black rounded-xl font-black uppercase text-xs tracking-widest hover:shadow-2xl hover:shadow-amber-500/40 transition-all duration-300 flex items-center justify-center gap-2 group"
                                >
                                    <span>Fermer</span>
                                    <X size={16} className="group-hover:rotate-90 transition-transform" />
                                </button>
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