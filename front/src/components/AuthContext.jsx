import { createContext, useEffect, useState, useRef } from "react";

const AuthContext = createContext();

export const AuthProvider = (props) => {
    const { children } = props;

    const [user, set_user] = useState(null);
    // Access Token stocké en mémoire (perdu au rafraîchissement, mais renouvelé)
    const [access_token, set_access_token] = useState(null);
    const [is_loading, set_is_loading] = useState(true);
    const [error, set_error] = useState(null);

    // 🔒 Le verrou pour empêcher le double refresh
    const isRefreshing = useRef(false);

    const refresh_access_token = async () => {
        try {
            const response = await fetch("/api/refresh_access_token", {
                method: "GET",
                credentials: 'include' //send a http OnlyCookie to refresh the acces token  
            })
            if (!response.ok) {
                throw new Error(`Token refresh fail : ${response.status}`);
            }
            const data = await response.json();
            set_user(data.user_data);
            const new_access_token = data.access_token;
            if (!new_access_token) {
                throw new Error(`Missing access_token `);
            }
            else {
                set_access_token(new_access_token);
            }
            set_error(null);
            return new_access_token;
        } catch (err) {
            set_error(err.message);
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
                console.log("✅ Session vérifiée - Utilisateur connecté:", user);
            } catch (error) {
                console.warn("⚠️ Impossible de renouveler le token : utilisateur non connecté", error);
                set_user(null);
                set_access_token(null);
            } finally {
                set_is_loading(false);
                isRefreshing.current = false; // On rouvre le verrou pour plus tard
            }
        }
        checkSession();
    }, []);

    const get_profil = async (token = null) => {
        try {
            const token_to_use = token || access_token;
            if (!token_to_use) {
                throw new Error("No access token available");
            }

            const response = await fetch("/api/get_profile", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token_to_use}`
                }
            });

            if (!response.ok) {
                if (response.status === 401 && access_token) {
                    try {
                        const refresh_token = await refresh_access_token();
                        return get_profil(refresh_token);
                    } catch (error) {
                        // Échec du renouvellement: déconnexion
                        logout();
                    }
                }
                else {
                    throw new Error(`Une erreur est survenue : ${response.status}`);
                }
            }
            else {
                const data = await response.json();
                const user_data = data.user_data;
                if (!user_data) {
                    throw new Error("User data missing");
                }
                else {
                    set_user(user_data);
                    set_error(null);
                }
            }
        } catch (err) {
            set_error(err.message);
            throw err;
        }
    };

    const login = (access_token, user_data) => {
        try {
            set_access_token(access_token);
            set_user(user_data);
            set_error(null);
            console.log("✅ Connexion réussie:", user_data.name);
        } catch (err) {
            set_error(err.message);
            console.error("❌ Erreur lors de la connexion:", err);
        }
    }

    const logout = async () => {
        try {
            const response = await fetch("/api/logout", {
                method: 'POST',
                credentials: 'include'
            })
            if (!response.ok) {
                if (response.status === 404 && access_token) {
                    try {
                        await refresh_access_token();
                        return logout();
                    } catch (error) {
                        console.error("Logout error: ", error);
                    }
                }
            }
            set_user(null);
            set_access_token(null);
            set_error(null);
            console.log("✅ Déconnexion réussie");
        } catch (err) {
            set_error(err.message);
            console.error("❌ Erreur lors de la déconnexion:", err);
            // Force logout anyway
            set_user(null);
            set_access_token(null);
        }
    }

    return <AuthContext.Provider value={{ 
        user, 
        access_token, 
        is_loading, 
        error,
        login, 
        logout,
        get_profil,
        refresh_access_token
    }}>
        {children}
    </AuthContext.Provider>;
}

export { AuthContext };