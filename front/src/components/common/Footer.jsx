export default function Footer() {
    return (
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div className="col-span-1 md:col-span-1 text-center md:text-left">
                    <div>
                        <h3 className="text-white font-black tracking-tighter text-2xl mb-4">EJP<span className="text-amber-500">.</span>PN</h3>
                        <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mr-3">
                            <img src="/src/assets/images/logo.jpeg" alt="Logo EJP" className="w-10 h-10 rounded-full" />
                        </div>
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed uppercase tracking-widest font-bold">L'Excellence par la jeunesse.</p>
                </div>

                <div>
                    <h4 className="text-amber-500 text-[10px] font-black tracking-[0.3em] uppercase mb-6">Contact</h4>
                    <p className="text-gray-400 text-xs leading-loose">ICC Campus Porto-Novo<br />Face église Catholique<br />+229 01 49 12 12 09</p>
                </div>

                <div>
                    <h4 className="text-amber-500 text-[10px] font-black tracking-[0.3em] uppercase mb-6">Navigation</h4>
                    <div className="flex flex-col gap-3 text-xs uppercase tracking-widest font-bold grid grid-cols-2 " >
                        <a href="/" className="hover:text-white" >Home</a>
                        <a href="/galerie" className="hover:text-white">Galerie</a>
                        <a href="/evenements" className="hover:text-white">Événements</a>
                        <a href="/ministeres" className="hover:text-white">Ministeres</a>
                        <a href="/fij" className="hover:text-white" >FIJ</a>
                        <a href="/don" className="hover:text-white">Dons</a>
                    </div>
                </div>

                <div>
                    <h4 className="text-amber-500 text-[10px] font-black tracking-[0.3em] uppercase mb-6">Social</h4>
                    <div className="flex gap-4 justify-center md:justify-start">
                        {/* Icônes réseaux sociaux ici */}
                        <a href="https://youtube.com/@ejp_porto-novo"
                            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-amber-600 hover:text-black transition-all"
                            aria-label="YouTube">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                        </a>

                        <a href="https://wa.me/2290149121209"
                            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-amber-600 hover:text-black transition-all"
                            aria-label="WhatsApp">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                        </a>
                        <a href="https://www.facebook.com/JeunesICCPortoNovo" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-amber-600 hover:text-black transition-all">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                            </svg>
                        </a>
                        <a href="https://www.instagram.com/ejp_portonovo" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-amber-600 hover:text-black transition-all">
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            <div className="text-center pt-12 border-t border-white/5">
                <p className="text-[10px] text-gray-600 uppercase tracking-[0.4em]">© 2025 Église des Jeunes Prodiges — Porto-Novo</p>
            </div>
        </div>
    )
}