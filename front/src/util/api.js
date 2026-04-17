const isDevelopment = import.meta.env.MODE === 'development';
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
            console.log(errorData);
            
            throw new Error(errorData.error || `Erreur: ${response.error}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Erreur API:", error.message);
        throw error;
    }
};