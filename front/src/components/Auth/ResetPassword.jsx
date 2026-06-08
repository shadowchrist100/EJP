import { useState, useEffect } from "react";
import { Lock, Eye, EyeOff, ArrowRight, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { useNavigate, useSearchParams } from "react-router-dom";
import { apiFetch } from "../../util/api";

const ResetPassword = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');
    
    const [formData, setFormData] = useState({
        password: '',
        password_confirmation: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const tokenParam = searchParams.get('token');
        const emailParam = searchParams.get('email');

        if (!tokenParam || !emailParam) {
            setError('Lien de réinitialisation invalide ou incomplet.');
        } else {
            setToken(tokenParam);
            setEmail(emailParam);
        }
    }, [searchParams]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password.length < 8) {
            setError('Le mot de passe doit contenir au moins 8 caractères');
            return;
        }

        if (formData.password !== formData.password_confirmation) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await apiFetch("/reset-password", {
                method: "POST",
                body: JSON.stringify({
                    token,
                    email,
                    password: formData.password,
                    password_confirmation: formData.password_confirmation
                })
            });

            setSuccess(true);
        } catch (err) {
            setError(err.message || 'Une erreur est survenue.');
            console.error("Erreur lors de la réinitialisation du mot de passe:", err);
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
                        Mot de Passe Modifié!
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter avec vos nouvelles coordonnées.
                    </p>
                    <button
                        onClick={() => navigate('/login')}
                        className="w-full mt-6 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-black uppercase tracking-widest py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300"
                    >
                        Se connecter
                        <ArrowRight size={16} />
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
                        NOUVEAU MOT DE PASSE
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Définissez votre nouveau mot de passe de connexion
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

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* New Password */}
                        <div className="relative group">
                            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                                Nouveau mot de passe
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-amber-500 transition-colors" size={16} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 group-focus-within:border-amber-500/50 rounded-lg pl-10 pr-12 py-3 text-white text-sm placeholder-gray-600 focus:outline-none transition-all"
                                    placeholder="Min. 8 caractères"
                                    required
                                    disabled={!token}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-amber-500 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="relative group">
                            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                                Confirmer le mot de passe
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-amber-500 transition-colors" size={16} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password_confirmation"
                                    value={formData.password_confirmation}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 group-focus-within:border-amber-500/50 rounded-lg pl-10 pr-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none transition-all"
                                    placeholder="Confirmer votre mot de passe"
                                    required
                                    disabled={!token}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading || !token}
                            className="w-full mt-6 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:from-gray-600 disabled:to-gray-700 text-black font-black uppercase tracking-widest py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                    Mise à jour...
                                </>
                            ) : (
                                <>
                                    Réinitialiser
                                    <ArrowRight size={16} />
                                </>
                            )}
                        </button>
                    </form>
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

export default ResetPassword;
