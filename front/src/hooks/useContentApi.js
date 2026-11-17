import { useState, useCallback, useEffect, useRef } from 'react';
import { apiFetch } from '../util/api';

/**
 * Charge du contenu éditable via l'API, avec repli sur des données statiques
 * quand l'API est indisponible ou vide.
 *
 * @param {string} endpoint  Endpoint public de l'API (ex: "/events")
 * @param {Array}  fallback  Données statiques affichées en secours
 * @param {Function} mapper  Transforme les items bruts de l'API
 */
export const useContentApi = (endpoint, fallback = [], mapper = (items) => items) => {
    const [data, setData] = useState(fallback);
    const [raw, setRaw] = useState([]);
    const [loading, setLoading] = useState(true);
    const [apiAvailable, setApiAvailable] = useState(false);

    // Refs pour éviter que des valeurs inline (fallback / mapper) ne provoquent
    // des re-fetchs en boucle à chaque rendu.
    const fallbackRef = useRef(fallback);
    const mapperRef = useRef(mapper);
    fallbackRef.current = fallback;
    mapperRef.current = mapper;

    const refresh = useCallback(async () => {
        setLoading(true);
        try {
            const res = await apiFetch(endpoint);
            const items = Array.isArray(res)
                ? res
                : (res?.events ?? res?.fijs ?? res?.images ?? []);
            setRaw(items);
            setApiAvailable(true);
            setData(items.length ? mapperRef.current(items) : fallbackRef.current);
        } catch {
            setApiAvailable(false);
            setData(fallbackRef.current);
        } finally {
            setLoading(false);
        }
    }, [endpoint]);

    useEffect(() => { refresh(); }, [refresh]);

    return { data, raw, loading, refresh, apiAvailable };
};