import { useState, useCallback, useEffect } from 'react';

// Formule de Haversine pour calculer la distance entre deux coordonnées GPS en km
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Rayon de la Terre en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return R * c;
};

export const useNearestFij = (fijList) => {
    const [sortedFijs, setSortedFijs] = useState(fijList);
    const [isLocating, setIsLocating] = useState(false);
    const [locationError, setLocationError] = useState(null);

    const findNearest = useCallback(() => {
        if (!navigator.geolocation) {
            setLocationError("La géolocalisation n'est pas supportée par votre navigateur.");
            return;
        }

        if (fijList.length === 0) {
            setLocationError("Les données FIJ ne sont pas encore chargées.");
            return;
        }

        setIsLocating(true);
        setLocationError(null);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;

                const withDistances = fijList.map(fij => {
                    if (fij.lat && fij.lng) {
                        const distance = calculateDistance(userLat, userLng, fij.lat, fij.lng);
                        return { ...fij, distance };
                    }
                    return { ...fij, distance: Infinity };
                });

                withDistances.sort((a, b) => a.distance - b.distance);
                setSortedFijs(withDistances);
                setIsLocating(false);
            },
            (error) => {
                console.error("Erreur de géolocalisation:", error);
                let errorMessage = "Erreur lors de la récupération de votre position.";
                if (error.code === 1) errorMessage = "Vous avez refusé l'accès à la localisation.";
                else if (error.code === 2) errorMessage = "Position indisponible.";
                else if (error.code === 3) errorMessage = "Délai d'attente dépassé.";
                
                setLocationError(errorMessage);
                setIsLocating(false);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    }, [fijList]);

    useEffect(() => {
        if (fijList.length > 0) {
            setSortedFijs(fijList);
        }
    }, [fijList]);

    const resetFijs = useCallback(() => {
        setSortedFijs(fijList);
        setLocationError(null);
    }, [fijList]);

    return {
        sortedFijs,
        isLocating,
        locationError,
        findNearest,
        resetFijs
    };
};
