import { useEffect, useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { apiFetch } from "../../util/api";
import { AlertCircle } from 'lucide-react';

const GoogleCallback = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [error, setError] = useState('');

    useEffect(() => {
        const token = searchParams.get('token');

        if (!token) {
            setError("Jeton d'authentification Google manquant.");
            return;
        }

        const fetchUserProfile = async () => {
            try {
                // Récupérer les données utilisateur en utilisant le token Google reçu
                const data = await apiFetch("/profile", {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!data.user) {
                    throw new Error("Impossible de récupérer les informations de l'utilisateur.");
                }

                // Connecter l'utilisateur dans l'application
                login(token, data.user);

                // Rediriger vers l'accueil
                navigate("/");
            } catch (err) {
                setError(err.message || "Erreur lors de la récupération du profil utilisateur.");
                console.error("Erreur de callback Google:", err);
            }
        };

        fetchUserProfile();
    }, [searchParams, login, navigate]);

    if (error) {
        return (
            <div className="min-h-screen bg-linear-to-b from-black via-zinc-900 to-black flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    <div className="bg-zinc-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl text-center space-y-6">
                        <div className="flex justify-center">
                            <div className="w-20 h-20 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center">
                                <AlertCircle className="text-red-500" size={40} />
                            </div>
                        </div>
                        <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                            Erreur de Connexion
                        </h2>
                        <p className="text-red-400 text-sm leading-relaxed">
                            {error}
                        </p>
                        <button
                            onClick={() => navigate('/login')}
                            className="w-full bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-black uppercase tracking-widest py-3 rounded-lg transition-all duration-300"
                        >
                            Retourner à la connexion
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-b from-black via-zinc-900 to-black flex items-center justify-center">
            <div className="text-center space-y-4">
                <div className="w-16 h-16 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto" />
                <h2 className="text-xl font-bold text-white uppercase tracking-wider animate-pulse">
                    Authentification avec Google...
                </h2>
                <p className="text-gray-400 text-sm">
                    Veuillez patienter pendant la synchronisation.
                </p>
            </div>
        </div>
    );
};

export default GoogleCallback;
