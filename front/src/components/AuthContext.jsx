import { createContext, useEffect, useState, useRef } from "react";
import { apiFetch } from "../util/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = (props) => {
    const { children } = props;
    const navigate = useNavigate();

    const [user, set_user] = useState(null);
    const [access_token, set_access_token] = useState(null);
    const [is_loading, set_is_loading] = useState(true);
    const [error, set_error] = useState(null);

    const isRefreshing = useRef(false);

    const refresh_access_token = async () => {
        try {
            const data = await apiFetch("/refresh_access_token", {
                method: "GET",
            });

            if (!data.access_token) {
                throw new Error("Missing access_token");
            }

            set_user(data.user_data);
            set_access_token(data.access_token);

            set_error(null);
            return data.access_token;

        } catch (err) {
            set_error(err.message);
            set_user(null);
            set_access_token(null);
            throw err;
        }
    };

    useEffect(() => {
        const checkSession = async () => {
            if (isRefreshing.current) return;

            isRefreshing.current = true;
            try {
                await refresh_access_token();
                console.log("Session vérifiée");
            } catch (error) {
                console.warn("Impossible de renouveler le token : utilisateur non connecté", error);
                set_user(null);
                set_access_token(null);
            } finally {
                set_is_loading(false);
                isRefreshing.current = false;
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
            console.log("Déconnexion côté serveur réussie");
        } catch (err) {
            console.error("Erreur serveur lors de la déconnexion:", err.message);
        } finally {
            set_user(null);
            set_access_token(null);
            set_error(null);
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