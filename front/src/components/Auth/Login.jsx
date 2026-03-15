import { useState,useContext } from "react";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../util/api";
import { AuthContext } from "../AuthContext";

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        setError('');
    };

    const validateForm = () => {
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            setError('Veuillez entrer une adresse email valide');
            return false;
        }
        if (formData.password.length < 8) {
            setError('Le mot de passe doit contenir au moins 8 caractères');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            setLoading(true);
            setError('');

            // On appelle apiFetch. Pas besoin de réécrire headers/credentials, 
            // ils sont déjà dans defaultOptions de ta fonction !
            const data = await apiFetch("/login", {
                method: "POST",
                body: JSON.stringify(formData)
            });

            // Si on arrive ici, c'est que la réponse était "ok" (200-299)
            // car apiFetch a déjà géré le reste.

            if (!data.user_data || !data.access_token) {
                throw new Error("Données utilisateur ou token manquants.");
            }

            setSuccess(true);

            login(data.access_token,data.user_data)

            navigate("/");

        } catch (err) {
            // Ici, "err.message" contiendra soit le message d'erreur de Laravel 
            // (grâce au throw dans apiFetch), soit ton message par défaut.
            setError(err.message || 'Une erreur est survenue.');
            console.error("Erreur lors de la connexion:", err);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-linear-to-b from-black via-zinc-900 to-black flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center">
                                <CheckCircle className="text-amber-500" size={40} />
                            </div>
                        </div>
                        <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                            Connexion réussie!
                        </h2>
                        <p className="text-gray-400 text-sm">
                            Bienvenue! Vous allez être redirigé vers la page d'acceil
                        </p>
                    </div>
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
                        CONNEXION
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Connectez vous à votre compte EJP Porto
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
                        {/* Email */}
                        <div className="relative group">
                            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-amber-500 transition-colors" size={16} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 group-focus-within:border-amber-500/50 rounded-lg pl-10 pr-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none transition-all"
                                    placeholder="votre@email.com"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="relative group">
                            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                                Mot de passe
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

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-6 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:from-gray-600 disabled:to-gray-700 text-black font-black uppercase tracking-widest py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                    Connection en cours...
                                </>
                            ) : (
                                <>
                                    Se Connecter
                                    <ArrowRight size={16} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="mt-6 text-center border-t border-white/10 pt-6">
                        <p className="text-sm text-gray-400">
                            Vous n'avez pas de compte?{' '}
                            <a href="/register" className="text-amber-500 font-black hover:underline">
                                S'inscrire
                            </a>
                        </p>
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

export default Login;