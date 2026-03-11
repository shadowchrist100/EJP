import React, { useState, useContext } from 'react';
import {Nav, Footer} from "../"
import { AuthContext } from '../AuthContext';
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, X, ArrowRight, LogOut } from 'lucide-react';

const ProfilePage = () => {
    const { user, logout } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        location: user?.location || '',
        bio: user?.bio || ''
    });
    const [isSaving, setIsSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            // Simuler une sauvegarde - remplacer par votre API
            const response = await fetch('/api/update_profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSuccessMessage('Profil mis à jour avec succès!');
                setIsEditing(false);
                setTimeout(() => setSuccessMessage(''), 3000);
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleLogout = async () => {
        await logout();
        window.location.href = '/';
    };

    const handleCancel = () => {
        setFormData({
            name: user?.name || '',
            email: user?.email || '',
            phone: user?.phone || '',
            location: user?.location || '',
            bio: user?.bio || ''
        });
        setIsEditing(false);
    };

    if (!user) {
        return (
            <div className="bg-black min-h-screen text-gray-400">
                <Nav />
                <div className="flex items-center justify-center h-screen">
                    <p className="text-xl text-amber-500">Redirection vers la connexion...</p>
                </div>
            </div>
        );
    }

    // Fonction pour obtenir les initiales
    const getInitials = (name) => {
        if (!name) return "?";
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    // Fonction pour obtenir la couleur de l'avatar
    const getAvatarColor = (name) => {
        if (!name) return 'bg-gray-500';
        const colors = [
            'bg-gradient-to-br from-amber-400 to-amber-600',
            'bg-gradient-to-br from-yellow-400 to-yellow-600',
            'bg-gradient-to-br from-orange-400 to-orange-600',
            'bg-gradient-to-br from-red-400 to-red-600',
            'bg-gradient-to-br from-pink-400 to-pink-600'
        ];
        const index = name.charCodeAt(0) % colors.length;
        return colors[index];
    };

    return (
        <div className="relative flex min-h-screen flex-col bg-black text-gray-400">
            <div className='fixed top-0 right-0 left-0 z-50'>
                <Nav />
            </div>

            <main className="grow pt-20">
                {/* Hero Section */}
                <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden px-4 md:px-8">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
                        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-zinc-900" />
                    </div>

                    <div className="container mx-auto max-w-4xl relative z-10">
                        <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-none">
                                Mon <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600">Profil</span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-300 font-light">
                                Gère tes informations personnelles et tes paramètres
                            </p>
                        </div>
                    </div>
                </section>

                {/* Profile Content */}
                <section className="py-20 px-4 md:px-8 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/50 to-black pointer-events-none" />

                    <div className="container mx-auto max-w-4xl relative z-10">
                        {/* Success Message */}
                        {successMessage && (
                            <div className="mb-8 p-4 bg-gradient-to-r from-amber-500/20 to-yellow-500/10 border border-amber-500/50 rounded-2xl text-amber-400 font-bold text-center animate-in fade-in slide-in-from-bottom-4">
                                ✓ {successMessage}
                            </div>
                        )}

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                            {/* Profile Card */}
                            <div className="lg:col-span-1">
                                <div className="bg-gradient-to-br from-zinc-950 to-black border border-white/10 rounded-3xl p-8 text-center">
                                    {/* Avatar */}
                                    <div className={`w-24 h-24 ${getAvatarColor(user.name)} rounded-full flex items-center justify-center text-white font-black text-3xl border-4 border-amber-400/50 mx-auto mb-6 shadow-2xl shadow-amber-500/20`}>
                                        {getInitials(user.name)}
                                    </div>

                                    {/* User Info */}
                                    <h2 className="text-3xl font-black text-white mb-2 tracking-tight">
                                        {user.name}
                                    </h2>
                                    <p className="text-amber-500 text-sm font-bold uppercase tracking-widest mb-6">
                                        Membre depuis {new Date(user.created_at).getFullYear()}
                                    </p>

                                    {/* Stats */}
                                    <div className="space-y-3 mb-8 pt-8 border-t border-white/10">
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <Mail size={16} className="text-amber-500" />
                                            <span className="text-sm">{user.email}</span>
                                        </div>
                                        {user.phone && (
                                            <div className="flex items-center gap-2 text-gray-400">
                                                <Phone size={16} className="text-amber-500" />
                                                <span className="text-sm">{user.phone}</span>
                                            </div>
                                        )}
                                        {user.location && (
                                            <div className="flex items-center gap-2 text-gray-400">
                                                <MapPin size={16} className="text-amber-500" />
                                                <span className="text-sm">{user.location}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Edit Button */}
                                    {!isEditing && (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-black px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:shadow-2xl hover:shadow-amber-500/50 transition-all mb-4"
                                        >
                                            <Edit2 size={16} />
                                            Modifier le Profil
                                        </button>
                                    )}

                                    {/* Logout Button */}
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center justify-center gap-2 bg-red-600/20 border border-red-600/50 text-red-400 px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-red-600/40 transition-all"
                                    >
                                        <LogOut size={16} />
                                        Déconnexion
                                    </button>
                                </div>
                            </div>

                            {/* Edit Form */}
                            <div className="lg:col-span-2">
                                <div className="bg-gradient-to-br from-zinc-950 to-black border border-white/10 rounded-3xl p-8">
                                    {isEditing ? (
                                        <>
                                            <h3 className="text-3xl font-black text-white mb-8 tracking-tight">
                                                Modifier les Informations
                                            </h3>

                                            <div className="space-y-6">
                                                {/* Name */}
                                                <div>
                                                    <label className="block text-white font-bold text-sm mb-3 uppercase tracking-widest">
                                                        <User size={16} className="inline mr-2" />
                                                        Nom Complet
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-black border-2 border-white/10 focus:border-amber-500 text-white px-6 py-4 rounded-xl outline-none transition-all"
                                                    />
                                                </div>

                                                {/* Email */}
                                                <div>
                                                    <label className="block text-white font-bold text-sm mb-3 uppercase tracking-widest">
                                                        <Mail size={16} className="inline mr-2" />
                                                        Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-black border-2 border-white/10 focus:border-amber-500 text-white px-6 py-4 rounded-xl outline-none transition-all"
                                                    />
                                                </div>

                                                {/* Phone */}
                                                <div>
                                                    <label className="block text-white font-bold text-sm mb-3 uppercase tracking-widest">
                                                        <Phone size={16} className="inline mr-2" />
                                                        Téléphone
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleInputChange}
                                                        placeholder="+229 XX XXX XXX"
                                                        className="w-full bg-black border-2 border-white/10 focus:border-amber-500 text-white px-6 py-4 rounded-xl outline-none transition-all"
                                                    />
                                                </div>

                                                {/* Location */}
                                                <div>
                                                    <label className="block text-white font-bold text-sm mb-3 uppercase tracking-widest">
                                                        <MapPin size={16} className="inline mr-2" />
                                                        Localisation
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="location"
                                                        value={formData.location}
                                                        onChange={handleInputChange}
                                                        placeholder="Ville, Pays"
                                                        className="w-full bg-black border-2 border-white/10 focus:border-amber-500 text-white px-6 py-4 rounded-xl outline-none transition-all"
                                                    />
                                                </div>

                                                {/* Bio */}
                                                <div>
                                                    <label className="block text-white font-bold text-sm mb-3 uppercase tracking-widest">
                                                        Bio
                                                    </label>
                                                    <textarea
                                                        name="bio"
                                                        value={formData.bio}
                                                        onChange={handleInputChange}
                                                        placeholder="Parle un peu de toi..."
                                                        rows="4"
                                                        className="w-full bg-black border-2 border-white/10 focus:border-amber-500 text-white px-6 py-4 rounded-xl outline-none transition-all resize-none"
                                                    />
                                                </div>

                                                {/* Buttons */}
                                                <div className="flex gap-4 pt-6">
                                                    <button
                                                        onClick={handleSave}
                                                        disabled={isSaving}
                                                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-black px-6 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest hover:shadow-2xl hover:shadow-amber-500/50 transition-all disabled:opacity-50"
                                                    >
                                                        <Save size={16} />
                                                        {isSaving ? 'Sauvegarde...' : 'Enregistrer'}
                                                    </button>
                                                    <button
                                                        onClick={handleCancel}
                                                        className="flex-1 flex items-center justify-center gap-2 bg-white/5 border border-white/20 text-white px-6 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all"
                                                    >
                                                        <X size={16} />
                                                        Annuler
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <h3 className="text-3xl font-black text-white mb-8 tracking-tight">
                                                Informations Personnelles
                                            </h3>

                                            <div className="space-y-6">
                                                {/* Name */}
                                                <div className="pb-6 border-b border-white/10">
                                                    <p className="text-xs font-black text-amber-400 uppercase tracking-widest mb-2">
                                                        Nom Complet
                                                    </p>
                                                    <p className="text-lg text-white font-bold">
                                                        {formData.name || 'Non renseigné'}
                                                    </p>
                                                </div>

                                                {/* Email */}
                                                <div className="pb-6 border-b border-white/10">
                                                    <p className="text-xs font-black text-amber-400 uppercase tracking-widest mb-2">
                                                        Email
                                                    </p>
                                                    <p className="text-lg text-white font-bold">
                                                        {formData.email || 'Non renseigné'}
                                                    </p>
                                                </div>

                                                {/* Phone */}
                                                <div className="pb-6 border-b border-white/10">
                                                    <p className="text-xs font-black text-amber-400 uppercase tracking-widest mb-2">
                                                        Téléphone
                                                    </p>
                                                    <p className="text-lg text-white font-bold">
                                                        {formData.phone || 'Non renseigné'}
                                                    </p>
                                                </div>

                                                {/* Location */}
                                                <div className="pb-6 border-b border-white/10">
                                                    <p className="text-xs font-black text-amber-400 uppercase tracking-widest mb-2">
                                                        Localisation
                                                    </p>
                                                    <p className="text-lg text-white font-bold">
                                                        {formData.location || 'Non renseigné'}
                                                    </p>
                                                </div>

                                                {/* Bio */}
                                                {formData.bio && (
                                                    <div className="pb-6">
                                                        <p className="text-xs font-black text-amber-400 uppercase tracking-widest mb-2">
                                                            Bio
                                                        </p>
                                                        <p className="text-white font-light leading-relaxed">
                                                            {formData.bio}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Account Stats */}
                            <div className="bg-gradient-to-br from-zinc-950 to-black border border-white/10 rounded-3xl p-8">
                                <h3 className="text-2xl font-black text-white mb-6 tracking-tight">
                                    Statistiques du Compte
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center pb-4 border-b border-white/10">
                                        <span className="text-gray-400">Statut</span>
                                        <span className="text-amber-400 font-bold">Actif</span>
                                    </div>
                                    <div className="flex justify-between items-center pb-4 border-b border-white/10">
                                        <span className="text-gray-400">Membres depuis</span>
                                        <span className="text-white font-bold">{new Date(user.created_at).toLocaleDateString('fr-FR')}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400">Rôle</span>
                                        <span className="text-white font-bold capitalize">{user.role || 'Membre'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div className="bg-gradient-to-br from-zinc-950 to-black border border-white/10 rounded-3xl p-8">
                                <h3 className="text-2xl font-black text-white mb-6 tracking-tight">
                                    Liens Rapides
                                </h3>
                                <div className="space-y-3">
                                    <a
                                        href="/settings"
                                        className="flex items-center gap-2 p-4 bg-white/5 hover:bg-amber-600/20 rounded-xl transition-all group"
                                    >
                                        <span className="text-amber-500 group-hover:text-amber-400">⚙️</span>
                                        <span className="text-white font-bold group-hover:text-amber-400 transition-colors">Paramètres</span>
                                        <ArrowRight size={14} className="ml-auto text-gray-500 group-hover:text-amber-400 transition-colors" />
                                    </a>
                                    <a
                                        href="/galerie"
                                        className="flex items-center gap-2 p-4 bg-white/5 hover:bg-amber-600/20 rounded-xl transition-all group"
                                    >
                                        <span className="text-amber-500 group-hover:text-amber-400">🎨</span>
                                        <span className="text-white font-bold group-hover:text-amber-400 transition-colors">Galerie</span>
                                        <ArrowRight size={14} className="ml-auto text-gray-500 group-hover:text-amber-400 transition-colors" />
                                    </a>
                                    <a
                                        href="/dons"
                                        className="flex items-center gap-2 p-4 bg-white/5 hover:bg-amber-600/20 rounded-xl transition-all group"
                                    >
                                        <span className="text-amber-500 group-hover:text-amber-400">❤️</span>
                                        <span className="text-white font-bold group-hover:text-amber-400 transition-colors">Faire un Don</span>
                                        <ArrowRight size={14} className="ml-auto text-gray-500 group-hover:text-amber-400 transition-colors" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default ProfilePage;