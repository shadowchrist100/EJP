import {Quote} from 'lucide-react';
const Contact = ({verset}) => (
    <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-8 h-px bg-amber-600/50" />
                <span className="text-amber-500/70 text-[9px] font-black uppercase tracking-[0.5em]">Contactez-nous</span>
                <div className="w-8 h-px bg-amber-600/50" />
            </div>
            <h2 className="font-display text-[clamp(2.5rem,8vw,6rem)] text-white leading-none tracking-wide uppercase">
                Une <span className="shimmer-gold">Question ?</span>
            </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-1">
            {/* Form */}
            <div className="bg-zinc-900/60 border border-white/6 p-10">
                <div className="space-y-5">
                    {[
                        { label: 'Nom complet', type: 'text', placeholder: 'Jean Kouassi' },
                        { label: 'Adresse email', type: 'email', placeholder: 'vous@email.com' },
                    ].map(({ label, type, placeholder }) => (
                        <div key={label}>
                            <label className="block text-gray-600 text-[9px] font-black tracking-[0.35em] uppercase mb-2">{label}</label>
                            <input type={type} placeholder={placeholder} className="input-field" />
                        </div>
                    ))}
                    <div>
                        <label className="block text-gray-600 text-[9px] font-black tracking-[0.35em] uppercase mb-2">Message</label>
                        <textarea
                            placeholder="Comment pouvons-nous vous aider ?"
                            className="input-field resize-none"
                            style={{ height: '120px' }}
                        />
                    </div>
                    <button className="w-full bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-black font-black py-4 text-[10px] tracking-[0.3em] uppercase transition-all duration-300 mt-2">
                        Envoyer le message
                    </button>
                </div>
            </div>

            {/* Bible quote */}
            <div className="relative bg-zinc-950 border border-white/6 p-10 flex flex-col justify-center overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-amber-600/8 rounded-full blur-[60px]" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-600/5 rounded-full blur-2xl" />
                <div className="relative z-10 text-center">
                    <div className="w-8 h-8 border border-amber-500/30 flex items-center justify-center mx-auto mb-8">
                        <Quote size={14} className="text-amber-500/60" />
                    </div>
                    <span className="text-amber-500/60 text-[9px] font-black tracking-[0.5em] uppercase block mb-6">{verset.ref}</span>
                    <p className="font-display text-[clamp(1.4rem,3vw,2rem)] text-white leading-tight tracking-wide uppercase mb-8"> {verset.verset} </p>
                    <div className="w-10 h-px bg-amber-600/40 mx-auto mb-6" />
                    <p className="text-gray-600 text-[9px] font-black tracking-[0.4em] uppercase">Église Jeunes Prodiges</p>
                </div>
            </div>
        </div>
    </div>
);
export default Contact;