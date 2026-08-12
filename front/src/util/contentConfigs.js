/* Configurations des champs / colonnes pour le panneau d'administration */

export const eventFields = [
    { name: 'title', label: 'Titre', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'date', label: 'Date', type: 'date', required: true },
    { name: 'time', label: 'Heure', type: 'time' },
    { name: 'location', label: 'Lieu', type: 'text' },
    { name: 'image', label: 'Image', type: 'image' },
];

export const eventColumns = [
    { name: 'image', label: 'Image', type: 'image' },
    { name: 'title', label: 'Titre' },
    { name: 'date', label: 'Date' },
    { name: 'time', label: 'Heure' },
];

export const eventMapper = (apiEvents) =>
    apiEvents.map((e) => {
        const date = new Date(`${e.date}T00:00:00`);
        return {
            ...e,
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear(),
            date,
        };
    });

export const fijFields = [
    { name: 'nom', label: 'Nom de la FIJ', type: 'text', required: true },
    { name: 'image', label: 'Image', type: 'image' },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'lieu', label: 'Lieu', type: 'text' },
    { name: 'phone', label: 'Téléphone', type: 'text', placeholder: '01 23 45 67 89' },
    { name: 'mapURL', label: 'Lien Google Maps', type: 'text', placeholder: 'https://www.google.com/maps/embed?...' },
    { name: 'quartier_proches', label: 'Quartiers proches', type: 'array', placeholder: 'Un quartier par ligne' },
    { name: 'Bergers', label: 'Bergers', type: 'array', placeholder: 'Un berger par ligne' },
    { name: 'lat', label: 'Latitude', type: 'number' },
    { name: 'lng', label: 'Longitude', type: 'number' },
];

export const fijColumns = [
    { name: 'image', label: 'Image', type: 'image' },
    { name: 'nom', label: 'Nom' },
    { name: 'lieu', label: 'Lieu' },
    { name: 'Bergers', label: 'Bergers', type: 'array' },
];

export const galleryFields = [
    { name: 'title', label: 'Titre', type: 'text', required: true },
    {
        name: 'category',
        label: 'Catégorie',
        type: 'select',
        options: ['events', 'worship', 'community'],
    },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'image', label: 'Image', type: 'image', required: true },
];

export const galleryColumns = [
    { name: 'image', label: 'Image', type: 'image' },
    { name: 'title', label: 'Titre' },
    { name: 'category', label: 'Catégorie' },
];

export const galleryMapper = (apiImages) =>
    apiImages.map((img) => ({
        ...img,
        url: img.image,
        category: img.category || 'events',
    }));
