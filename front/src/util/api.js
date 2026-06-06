const BASE_URL = '/api'

export const apiFetch = async (endpoint, options = {}) => {
    // Configuration par défaut (CORS, Headers, etc.)
    const defaultOptions = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...options.headers,
        },
        credentials: 'include',
    };

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, defaultOptions);

        // Gestion automatique des erreurs HTTP (4xx, 5xx)
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));

            throw new Error(errorData.message || `Error survenue : ${response.statusText} ` );
        }
        if (response.status !== 204) {
            return await response.json();
        }
        return null;
    } catch (error) {
        console.log(error.message);

        console.error("Erreur API:", error.message);
        throw error;
    }
};