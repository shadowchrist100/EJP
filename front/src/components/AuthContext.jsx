import { createContext, useEffect, useState, useRef } from "react";
import { apiFetch } from "../util/api";

const AuthContext = createContext();

export const AuthProvider = (props) => {
    const { children } = props;

    const [user, set_user] = useState(null);
    // Access Token stocké en mémoire (perdu au rafraîchissement, mais renouvelé)
    const [access_token, set_access_token] = useState(null);
    const [is_loading, set_is_loading] = useState(true);
    const [error, set_error] = useState(null);

    //  Le verrou pour empêcher le double refresh
    const isRefreshing = useRef(false);

    const refresh_access_token = async () => {
        try {
            // On utilise apiFetch pour bénéficier de la gestion automatique des erreurs 
            // et de l'ajout automatique de /api via BASE_URL.
            const data = await apiFetch("/refresh_access_token", {
                method: "GET",
                // credentials: 'include' est déjà dans ton apiFetch par défaut, 
                // donc c'est parfait pour envoyer le HttpOnly cookie.
            });

            // Si apiFetch n'a pas levé d'erreur
            if (!data.access_token) {
                throw new Error("Missing access_token");
            }

            // Mise à jour de l'état global
            set_user(data.user_data);
            set_access_token(data.access_token);

            set_error(null);
            return data.access_token;

        } catch (err) {
            // Ici, err.message contiendra soit "Erreur: 401" (si le refresh cookie est expiré)
            // soit le message d'erreur renvoyé par ton backend Laravel.
            set_error(err.message);

            //  Si le refresh échoue, on peut déconnecter l'utilisateur
            set_user(null);
            set_access_token(null);

            throw err;
        }
    };

    useEffect(() => {
        const checkSession = async () => {
            // Si un refresh est déjà en cours, on sort immédiatement
            if (isRefreshing.current) return;

            isRefreshing.current = true; // On ferme le verrou
            try {
                const initial_token = await refresh_access_token();
                console.log("Session vérifiée - Utilisateur connecté:", user);
            } catch (error) {
                console.warn(" Impossible de renouveler le token : utilisateur non connecté", error);
                set_user(null);
                set_access_token(null);
            } finally {
                set_is_loading(false);
                isRefreshing.current = false; // On rouvre le verrou pour plus tard
            }
        }
        checkSession();
    }, []);

    const login = (access_token, user_data) => {
        try {
            set_access_token(access_token);
            set_user(user_data);
            set_error(null);
        } catch (err) {
            set_error(err.message);
        }
    }

    const updateUser = (user)=>{
        set_user(user)
    }

    const logout = async () => {
        try {
            await apiFetch("/logout", {
                method: 'POST',
            });

            console.log(" Déconnexion côté serveur réussie");
        } catch (err) {
            console.error("Erreur serveur lors de la déconnexion:", err.message);
        } finally {
            set_user(null);
            set_access_token(null);
            set_error(null);

            // Redirection vers la page de connexion
            navigate('/login');
        }
    };

    return <AuthContext.Provider value={{
        user,
        access_token,
        is_loading,
        error,
        login,
        updateUser,
        logout,
        refresh_access_token
    }}>
        {children}
    </AuthContext.Provider>;
}

export { AuthContext };