import React, { useState } from 'react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="font-['Inter','Segoe_UI',sans-serif]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <a href="#accueil" className="font-bold">
              <img 
                src="/src/assets/ejp_logo.jpg" 
                alt="EPJ Logo" 
                className="h-20 w-20"
              />
            </a>
            
            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-white p-2"
              aria-label="Toggle navigation"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Desktop menu */}
            <ul className="hidden lg:flex space-x-8">
              <li><a href="#accueil" className="text-white hover:text-gray-300 transition">Accueil</a></li>
              <li><a href="#apropos" className="text-white hover:text-gray-300 transition">À Propos</a></li>
              <li><a href="#evenements" className="text-white hover:text-gray-300 transition">Événements</a></li>
              <li><a href="#galerie" className="text-white hover:text-gray-300 transition">Galerie</a></li>
              <li><a href="#contact" className="text-white hover:text-gray-300 transition">Contact</a></li>
            </ul>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <ul className="lg:hidden pb-4 space-y-2">
              <li><a href="#accueil" className="block text-white hover:text-gray-300 py-2">Accueil</a></li>
              <li><a href="#apropos" className="block text-white hover:text-gray-300 py-2">À Propos</a></li>
              <li><a href="#evenements" className="block text-white hover:text-gray-300 py-2">Événements</a></li>
              <li><a href="#galerie" className="block text-white hover:text-gray-300 py-2">Galerie</a></li>
              <li><a href="#contact" className="block text-white hover:text-gray-300 py-2">Contact</a></li>
            </ul>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="accueil" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-gray-900 mt-28">
        <div className="container mx-auto px-4 text-center text-white">
          <div className="mb-12 space-y-4">
            <a href="#servir" className="inline-block text-white hover:text-gray-300 transition">
              JE SOUHAITE SERVIR À L'EPJ
            </a>
            <br />
            <a href="#contact" className="inline-block text-white hover:text-gray-300 transition">
              JE SOUHAITE FAIRE LA PRIÈRE DU SALUT
            </a>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-4">ÉGLISE JEUNES PRODIGES</h2>
          <p className="text-2xl md:text-3xl mb-12">POUR LES JEUNES, PAR LES JEUNES</p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center mb-16">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
              <p className="text-lg">Rejoins nous cette semaine</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
              <p className="text-lg">Regarder nos cultes en ligne</p>
            </div>
          </div>
          
          <div className="animate-bounce">
            <p className="mb-2">Défiler vers le bas</p>
            <div className="text-3xl">↓</div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="apropos" className="py-20 bg-gray-800 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">À Propos</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-gray-700 h-96 flex items-center justify-center rounded-lg">
              <span className="text-gray-400">Image ici</span>
            </div>
            <div>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="evenements" className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Événements à Venir</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map(item => (
              <div key={item} className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition">
                <div className="bg-gray-700 h-48 flex items-center justify-center">
                  <span className="text-gray-400">Image {item}</span>
                </div>
                <div className="p-6">
                  <h5 className="text-xl font-bold mb-3">Événement {item}</h5>
                  <p className="text-gray-400 text-sm mb-2">Date: 15 Novembre 2025</p>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Description de l'événement ici. Un aperçu rapide de ce qui va se passer.
                  </p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">
                    En savoir plus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="galerie" className="py-20 bg-gray-800 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Galerie</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[1,2,3,4,5,6,7,8].map(item => (
              <div key={item} className="bg-gray-700 h-48 flex items-center justify-center rounded hover:opacity-75 transition">
                <span className="text-gray-400">Photo {item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Contactez-nous</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 tracking-wider">Informations</h3>
              <div className="mb-6">
                <strong className="text-white">📍 Adresse</strong>
                <p className="text-gray-400 mt-2">Votre adresse ici</p>
              </div>
              <div className="mb-6">
                <strong className="text-white">📧 Email</strong>
                <p className="text-gray-400 mt-2">email@example.com</p>
              </div>
              <div className="mb-6">
                <strong className="text-white">📞 Téléphone</strong>
                <p className="text-gray-400 mt-2">+229 XX XX XX XX</p>
              </div>
            </div>
            <div>
              <input 
                type="text" 
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:border-blue-500" 
                placeholder="Votre nom" 
              />
              <input 
                type="email" 
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:border-blue-500" 
                placeholder="Votre email" 
              />
              <textarea 
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:border-blue-500" 
                rows="5" 
                placeholder="Votre message"
              ></textarea>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition">
                Envoyer
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black text-center text-white">
        <div className="container mx-auto px-4">
          <p className="text-gray-400 mb-4">&copy; 2025 Votre Nom. Tous droits réservés.</p>
          <div className="space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition">Facebook</a>
            <a href="#" className="text-gray-400 hover:text-white transition">Instagram</a>
            <a href="#" className="text-gray-400 hover:text-white transition">YouTube</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;