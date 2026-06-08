import { useState, useContext } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate, useSearchParams } from "react-router-dom";
import { apiFetch } from "../../util/api";
import { AuthContext } from "../AuthContext";

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const verified = searchParams.get('verified');

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
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
            setError('');
            const data = await apiFetch("/login", {
                method: "POST",
                body: JSON.stringify(formData)
            });

            if (!data.user_data || !data.access_token) {
                throw new Error("Données utilisateur ou token manquants.");
            }

            setSuccess(true);
            login(data.access_token, data.user_data);
            navigate("/");
        } catch (err) {
            setError(err.message || 'Une erreur est survenue.');
            console.error("Erreur lors de la connexion:", err);
        } finally {
            setLoading(false);
        }
    };

    // Pour Google OAuth, on doit rediriger DIRECTEMENT vers le back-end (pas via le proxy Vercel)
    // car Vercel ne peut pas transmettre les redirections 302 générées par Laravel/Socialite.
    const handleGoogleLogin = () => {
        setLoading(true);
        setError('');

        // En production (VITE_API_URL défini dans les variables d'environnement Vercel)
        // On utilise l'URL directe du back-end pour contourner le proxy Vercel.
        // En développement, on utilise le proxy Vite via /api.
        const apiUrl = import.meta.env.VITE_API_URL;
        const googleRedirectUrl = apiUrl
            ? `${apiUrl}/api/google/redirect`
            : `/api/google/redirect`;

        window.location.href = googleRedirectUrl;
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
                            Bienvenue! Vous allez être redirigé vers la page d'accueil
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
                    {/* Email Verification Messages */}
                    {verified === 'true' && (
                        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                            <CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" />
                            <p className="text-green-400 text-sm">Votre adresse e-mail a été confirmée avec succès ! Vous pouvez maintenant vous connecter.</p>
                        </div>
                    )}
                    {verified === 'already' && (
                        <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                            <CheckCircle size={18} className="text-amber-500 mt-0.5 shrink-0" />
                            <p className="text-amber-400 text-sm">Votre adresse e-mail est déjà vérifiée.</p>
                        </div>
                    )}

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
                                    disabled={loading}
                                    className="w-full bg-white/5 border border-white/10 group-focus-within:border-amber-500/50 rounded-lg pl-10 pr-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none transition-all disabled:opacity-50"
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
                                    disabled={loading}
                                    className="w-full bg-white/5 border border-white/10 group-focus-within:border-amber-500/50 rounded-lg pl-10 pr-12 py-3 text-white text-sm placeholder-gray-600 focus:outline-none transition-all disabled:opacity-50"
                                    placeholder="Min. 8 caractères"
                                />
                                <button
                                    type="button"
                                    disabled={loading}
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-amber-500 transition-colors disabled:cursor-not-allowed"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            <div className="flex justify-end mt-1.5">
                                <a href="/forgot-password" className="text-xs text-amber-500 hover:underline font-black uppercase tracking-wider">
                                    Mot de passe oublié ?
                                </a>
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
                                    Connexion en cours...
                                </>
                            ) : (
                                <>
                                    Se Connecter
                                    <ArrowRight size={16} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Google Login Separator */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-zinc-900 px-3 text-gray-500 font-bold tracking-wider">Ou continuer avec</span>
                        </div>
                    </div>

                    {/* Google Login Button - Updated with loading state */}
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="w-full bg-white hover:bg-zinc-200 disabled:bg-zinc-700 disabled:text-zinc-400 text-black font-black uppercase tracking-widest py-3 rounded-lg flex items-center justify-center gap-3 transition-all duration-300 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-zinc-500/30 border-t-zinc-500 rounded-full animate-spin" />
                                Redirection...
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                Google
                            </>
                        )}
                    </button>

                    {/* Register Link */}
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