import { useState } from "react";
import { Mail, ArrowRight, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../util/api";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            setError('Veuillez entrer une adresse email valide');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const data = await apiFetch("/forgot-password", {
                method: "POST",
                body: JSON.stringify({ email })
            });

            setSuccess(true);
        } catch (err) {
            setError(err.message || 'Une erreur est survenue.');
            console.error("Erreur lors de la demande de réinitialisation:", err);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-linear-to-b from-black via-zinc-900 to-black flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center">
                            <CheckCircle className="text-amber-500" size={40} />
                        </div>
                    </div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                        Email Envoyé!
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Si un compte est associé à l'adresse <span className="text-white font-bold">{email}</span>, vous recevrez un e-mail contenant les instructions pour réinitialiser votre mot de passe d'ici quelques instants.
                    </p>
                    <button
                        onClick={() => navigate('/login')}
                        className="w-full mt-6 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-black uppercase tracking-widest py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300"
                    >
                        <ArrowLeft size={16} />
                        Retour à la connexion
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-b from-black via-zinc-900 to-black flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">
                        MOT DE PASSE OUBLIÉ
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Entrez votre email pour recevoir un lien de réinitialisation
                    </p>
                </div>

                {/* Form Container */}
                <div className="bg-zinc-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                            <AlertCircle size={18} className="text-red-500 mt-0.5 shrink-0" />
                            <p className="text-red-400 text-sm">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div className="relative group">
                            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-amber-500 transition-colors" size={16} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                                    className="w-full bg-white/5 border border-white/10 group-focus-within:border-amber-500/50 rounded-lg pl-10 pr-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none transition-all"
                                    placeholder="votre@email.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:from-gray-600 disabled:to-gray-700 text-black font-black uppercase tracking-widest py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                    Envoi en cours...
                                </>
                            ) : (
                                <>
                                    Envoyer le lien
                                    <ArrowRight size={16} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Back Link */}
                    <div className="mt-6 text-center border-t border-white/10 pt-6">
                        <a href="/login" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-amber-500 transition-colors font-black uppercase tracking-wider">
                            <ArrowLeft size={14} />
                            Retour à la connexion
                        </a>
                    </div>
                </div>

                {/* Bottom Message */}
                <div className="text-center mt-8">
                    <p className="text-xs text-gray-500 uppercase tracking-widest">
                        EJP <span className="text-amber-500">.</span> PORTO
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
