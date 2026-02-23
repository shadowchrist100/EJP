import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const Register = () => {
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
        if (!formData.firstName.trim()) {
            setError('Le prénom est requis');
            return false;
        }
        if (!formData.lastName.trim()) {
            setError('Le nom est requis');
            return false;
        }
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            setError('Veuillez entrer une adresse email valide');
            return false;
        }
        if (formData.password.length < 8) {
            setError('Le mot de passe doit contenir au moins 8 caractères');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return false;
        }
        if (!formData.acceptTerms) {
            setError('Vous devez accepter les conditions d\'utilisation');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            // Simuler l'appel API
            await new Promise(resolve => setTimeout(resolve, 1500));

            setSuccess(true);
            setError('');

            // Rediriger vers login après 2 secondes
            setTimeout(() => {
                navigate('/login', {
                    state: { email: formData.email, message: 'Inscription réussie! Connectez-vous.' }
                });
            }, 2000);
        } catch (err) {
            setError('Une erreur est survenue. Veuillez réessayer.');
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
                            Inscription réussie!
                        </h2>
                        <p className="text-gray-400 text-sm">
                            Bienvenue! Vous allez être redirigé vers la page de connexion.
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
                        Créer un compte
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Rejoignez notre communauté EJP Porto
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
                        {/* Names Row */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* First Name */}
                            <div className="relative group">
                                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                                    Prénom
                                </label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-amber-500 transition-colors" size={16} />
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 group-focus-within:border-amber-500/50 rounded-lg pl-10 pr-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none transition-all"
                                        placeholder="Jean"
                                    />
                                </div>
                            </div>

                            {/* Last Name */}
                            <div className="relative group">
                                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                                    Nom
                                </label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-amber-500 transition-colors" size={16} />
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 group-focus-within:border-amber-500/50 rounded-lg pl-10 pr-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none transition-all"
                                        placeholder="Dupont"
                                    />
                                </div>
                            </div>
                        </div>

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

                        {/* Confirm Password */}
                        <div className="relative group">
                            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                                Confirmer le mot de passe
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-amber-500 transition-colors" size={16} />
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 group-focus-within:border-amber-500/50 rounded-lg pl-10 pr-12 py-3 text-white text-sm placeholder-gray-600 focus:outline-none transition-all"
                                    placeholder="Confirmez le mot de passe"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-amber-500 transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {/* Terms Checkbox */}
                        <div className="flex items-start gap-3 pt-2">
                            <input
                                type="checkbox"
                                name="acceptTerms"
                                checked={formData.acceptTerms}
                                onChange={handleChange}
                                className="w-5 h-5 mt-0.5 accent-amber-500 rounded cursor-pointer bg-white/5 border border-white/10"
                            />
                            <label className="text-xs text-gray-400 cursor-pointer">
                                J'accepte les <a href="#" className="text-amber-500 hover:underline">conditions d'utilisation</a> et la <a href="#" className="text-amber-500 hover:underline">politique de confidentialité</a>
                            </label>
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
                                    Inscription en cours...
                                </>
                            ) : (
                                <>
                                    S'inscrire
                                    <ArrowRight size={16} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="mt-6 text-center border-t border-white/10 pt-6">
                        <p className="text-sm text-gray-400">
                            Vous avez déjà un compte?{' '}
                            <a href="/login" className="text-amber-500 font-black hover:underline">
                                Se connecter
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

export default Register;