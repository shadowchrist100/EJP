import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";

const AuthComponent = (props) => {
    const { children } = props;
    const { user, is_loading } = useContext(AuthContext);

    // Vérifier que is_loading est bien défini
    if (is_loading === undefined) {
        console.error("❌ ERREUR: is_loading est undefined. Vérifie le nom dans AuthContext!");
        return (
            <div className="flex items-center justify-center h-screen bg-black">
                <p className="text-red-500 font-bold">Erreur de configuration</p>
            </div>
        );
    }

    // Afficher le loading spinner
    if (is_loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-black">
                <div className="relative">
                    {/* Animated spinner */}
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-500"></div>
                    
                    {/* Pulsing circle */}
                    <div className="absolute inset-0 rounded-full border-2 border-amber-500/20 animate-pulse"></div>
                </div>
                <span className="ml-3 text-amber-500 font-bold text-lg mt-6">
                    Vérification de la session...
                </span>
            </div>
        )
    }

    // Redirection si pas d'utilisateur
    if (user === null) {
        console.warn("⚠️ Accès refusé - Pas d'utilisateur authentifié");
        return <Navigate to="/login" replace />
    }

    // Afficher le contenu protégé
    return children;
}

export default AuthComponent;