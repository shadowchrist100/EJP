const FijGrid = () => {
    const [fijData, setFijData] = useState([]);
    const [flippedCards, setFlippedCards] = useState({});

    useEffect(() => {
        fetch("/data/fij.json")
            .then(response => response.json())
            .then(data => setFijData(data))
            .catch(error => console.error("Erreur chargement FIJ:", error));
    }, []); // Important : le [] évite la boucle infinie

    const toggleFlip = (index) => {
        setFlippedCards(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 p-6 max-w-7xl mx-auto">
            {/* Ajout des styles CSS nécessaires pour le flip si non présents dans votre config tailwind */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .perspective-1000 { perspective: 1000px; }
                .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
                .rotate-y-180 { transform: rotateY(180deg); }
                .preserve-3d { transform-style: preserve-3d; }
            `}} />

            {fijData.map((fij, index) => {
                const isFlipped = flippedCards[index];

                return (
                    <div key={index} className="w-full h-[450px] perspective-1000 group">
                        <div className={`relative w-full h-full transition-transform duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>

                            {/* FACE AVANT */}
                            <div className="absolute w-full h-full bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 backface-hidden flex flex-col">
                                {/* Image avec Overlay */}
                                <div className="relative h-52 overflow-hidden shrink-0">
                                    <img
                                        src={fij.image || "/api/placeholder/400/320"}
                                        alt={fij.nom}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute bottom-4 left-4">
                                        <p className="text-white text-xs font-bold uppercase tracking-widest bg-amber-500 px-2 py-1 rounded">FIJ Secteur</p>
                                    </div>
                                </div>

                                {/* Contenu Texte */}
                                <div className="p-6 flex flex-col grow justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-800 mb-2">{fij.nom}</h3>
                                        <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                                            {fij.description}
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-3 mt-4">
                                        <button
                                            onClick={() => toggleFlip(index)}
                                            className="flex-[1.5] bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md"
                                        >
                                            📍 Voir Carte
                                        </button>
                                        <a
                                            href={`https://wa.me/${fij.phone}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl transition-all flex items-center justify-center shadow-md"
                                            title="Contacter le Berger"
                                        >
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* FACE ARRIÈRE (Carte) */}
                            <div className="absolute w-full h-full bg-gray-100 rounded-3xl overflow-hidden backface-hidden rotate-y-180 shadow-2xl flex flex-col border-2 border-amber-500">
                                <div className="grow relative bg-gray-200">
                                    <iframe
                                        src={fij.mapURL}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        title={`Map ${fij.nom}`}
                                        className="absolute inset-0"
                                    />
                                </div>
                                <button
                                    onClick={() => toggleFlip(index)}
                                    className="bg-gray-900 text-white py-4 font-bold hover:bg-black transition-colors flex items-center justify-center gap-2"
                                >
                                    ✕ Fermer la carte
                                </button>
                            </div>

                        </div>
                    </div>
                );
            })}
        </div>
    );
};