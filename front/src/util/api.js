const API_ORIGIN = import.meta.env.VITE_API_URL?.replace(/\/+$/, '') || ''
const BASE_URL = API_ORIGIN ? `${API_ORIGIN}/api` : '/api'

export const getBackendUrl = () => API_ORIGIN || ''

let currentAccessToken = null
let isRefreshing = false
let pendingRefresh = null

export const setAccessToken = (token) => {
    currentAccessToken = token
}

export const getAccessToken = () => currentAccessToken

const attemptRefresh = async () => {
    if (isRefreshing) return pendingRefresh

    isRefreshing = true
    pendingRefresh = (async () => {
        try {
            const res = await fetch(`${BASE_URL}/refresh_access_token`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            })
            if (!res.ok) {
                const body = await res.json().catch(() => ({}))
                throw new Error(body.error || 'Refresh token invalide ou expiré')
            }
            const data = await res.json()
            if (!data.access_token) throw new Error('Aucun token reçu')
            currentAccessToken = data.access_token
            return data.access_token
        } catch (err) {
            currentAccessToken = null
            throw err
        } finally {
            isRefreshing = false
            pendingRefresh = null
        }
    })()
    return pendingRefresh
}

const buildHeaders = (optionsHeaders, body) => {
    const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;
    return {
        'Accept': 'application/json',
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...(currentAccessToken ? { 'Authorization': `Bearer ${currentAccessToken}` } : {}),
        ...optionsHeaders,
    }
}

const doFetch = async (endpoint, options) => {
    return fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: buildHeaders(options.headers, options.body),
        credentials: 'include',
    })
}

export const apiFetch = async (endpoint, options = {}) => {
    try {
        let response = await doFetch(endpoint, options)

        if (response.status === 401 && currentAccessToken) {
            try {
                const newToken = await attemptRefresh()
                if (newToken) {
                    response = await doFetch(endpoint, options)
                }
            } catch (err) {
                throw new Error(err.message || 'Session expirée. Veuillez vous reconnecter.')
            }
        }

        const contentType = response.headers.get('content-type') || ''

        if (!response.ok) {
            if (contentType.includes('application/json')) {
                const errorData = await response.json().catch(() => ({}))
                const message =
                    errorData.error ||
                    errorData.message ||
                    (errorData.errors && Object.values(errorData.errors).flat().join(', ')) ||
                    `Erreur : ${response.statusText}`
                throw new Error(message)
            }
            throw new Error(`Erreur ${response.status}: le serveur API est inaccessible.`)
        }

        if (response.status !== 204) {
            if (!contentType.includes('application/json')) {
                throw new Error("Le serveur API a retourné une réponse invalide (pas du JSON). Vérifiez que le backend est en cours d'exécution.")
            }
            return await response.json()
        }
        return null
    } catch (error) {
        console.error("Erreur API:", error.message)
        throw error
    }
}
