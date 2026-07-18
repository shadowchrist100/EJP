import { createContext, useEffect, useState, useRef, useMemo, useCallback } from "react";
import { apiFetch, setAccessToken } from "../util/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = (props) => {
    const { children } = props;
    const navigate = useNavigate();

    const [user, set_user] = useState(null);
    const [is_loading, set_is_loading] = useState(true);
    const [error, set_error] = useState(null);

    const isRefreshing = useRef(false);

    const refresh_access_token = useCallback(async () => {
        try {
            const data = await apiFetch("/refresh_access_token", {
                method: "GET",
            });

            if (!data.access_token) {
                throw new Error("Missing access_token");
            }

            set_user(data.user_data);
            setAccessToken(data.access_token);
            set_error(null);
            return data.access_token;

        } catch (err) {
            // Distinguish network errors from auth errors
            const isNetworkError = err instanceof TypeError && err.message.includes('fetch');
            set_error(isNetworkError ? 'network' : 'auth');
            set_user(null);
            setAccessToken(null);
            throw err;
        }
    }, []);

    useEffect(() => {
        const checkSession = async () => {
            if (isRefreshing.current) return;

            isRefreshing.current = true;
            try {
                await refresh_access_token();
                if (import.meta.env.DEV) console.log("Session vérifiée");
            } catch (error) {
                if (import.meta.env.DEV) console.warn("Token non renouvelé :", error.message);
                set_user(null);
                setAccessToken(null);
                set_error(null);
            } finally {
                set_is_loading(false);
                isRefreshing.current = false;
            }
        };
        checkSession();
    }, [refresh_access_token]);

    const login = useCallback((token, user_data) => {
        setAccessToken(token);
        set_user(user_data);
        set_error(null);
    }, []);

    const updateUser = useCallback((updatedUser) => {
        set_user(updatedUser);
    }, []);

    const logout = useCallback(async () => {
        try {
            await apiFetch("/logout", { method: 'POST' });
            if (import.meta.env.DEV) console.log("Déconnexion côté serveur réussie");
        } catch (err) {
            if (import.meta.env.DEV) console.error("Erreur serveur lors de la déconnexion:", err.message);
        } finally {
            setAccessToken(null);
            set_user(null);
            set_error(null);
            navigate('/login');
        }
    }, [navigate]);

    // M6: access_token is NOT exposed — api.js manages it via its own module-level singleton.
    // P1: useMemo prevents re-rendering all consumers on every AuthProvider state change.
    const value = useMemo(() => ({
        user,
        is_loading,
        error,
        login,
        updateUser,
        logout,
        refresh_access_token,
    }), [user, is_loading, error, login, updateUser, logout, refresh_access_token]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };
