import React, { useState, useContext } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Nav, Footer, Contact } from "../"
import { AuthContext } from '../AuthContext';
import { apiFetch } from '../../util/api';
import { User, Mail, Phone, MapPin, Edit2, Save, X, ArrowRight, LogOut } from 'lucide-react';

/* ─── Variants réutilisables ─────────────────────────────────────────── */

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }
    })
};

const fadeInScale = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (delay = 0) => ({
        opacity: 1, scale: 1,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }
    })
};

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } }
};

const formPanelVariants = {
    initial: { opacity: 0, x: 30, filter: 'blur(4px)' },
    animate: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, x: -30, filter: 'blur(4px)', transition: { duration: 0.3, ease: 'easeIn' } }
};

/* ─── Champ info (mode lecture) ──────────────────────────────────────── */
const InfoRow = ({ label, value, delay }) => (
    <motion.div
        variants={fadeInUp}
        custom={delay}
        className="pb-6 border-b border-white/10 last:border-0"
    >
        <p className="text-xs font-black text-amber-400 uppercase tracking-widest mb-2">{label}</p>
        <p className="text-lg text-white font-bold">{value || 'Non renseigné'}</p>
    </motion.div>
);

/* ─── Champ input (mode édition) ─────────────────────────────────────── */
const FormField = ({ label, icon, name, value, onChange, type = 'text', placeholder }) => (
    <motion.div variants={fadeInUp}>
        <label className="block text-white font-bold text-sm mb-3 uppercase tracking-widest">
            {icon && React.cloneElement(icon, { size: 16, className: 'inline mr-2' })}
            {label}
        </label>
        <motion.input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            whileFocus={{ borderColor: '#f59e0b', scale: 1.005 }}
            className="w-full bg-black border-2 border-white/10 focus:border-amber-500 text-white px-6 py-4 rounded-xl outline-none transition-colors duration-300 placeholder-gray-600"
        />
    </motion.div>
);

/* ─── Page ───────────────────────────────────────────────────────────── */
const ProfilePage = () => {
    const { user, logout, updateUser, access_token } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        telephone: user?.telephone || '',
        localisation: user?.localisation || '',
        bio: user?.bio || ''
    });
    const [isSaving, setIsSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    /* Barre de progression scroll */
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrorMessage('');
    };

    const handleSave = async () => {
        setIsSaving(true);
        setErrorMessage('');
        setSuccessMessage('');
        try {
            const data = await apiFetch('/profile', {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${access_token}` },
                body: JSON.stringify(formData)
            });
            if (!data.user) throw new Error('Données utilisateur manquantes dans la réponse');
            updateUser(data.user);
            setFormData({
                firstName: data.user.firstName || '',
                lastName: data.user.lastName || '',
                email: data.user.email || '',
                telephone: data.user.telephone || '',
                localisation: data.user.localisation || '',
                bio: data.user.bio || ''
            });
            setSuccessMessage('✓ Profil mis à jour avec succès!');
            setIsEditing(false);
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            setErrorMessage(error.message || "Une erreur s'est produite lors de la mise à jour du profil");
        } finally {
            setIsSaving(false);
        }
    };

    const handleLogout = async () => {
        try { await logout(); } catch (error) { console.error('Erreur logout:', error); }
    };

    const handleCancel = () => {
        setFormData({
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            email: user?.email || '',
            telephone: user?.telephone || '',
            localisation: user?.localisation || '',
            bio: user?.bio || ''
        });
        setIsEditing(false);
        setErrorMessage('');
    };

    if (!user) return (
        <div className="bg-black min-h-screen text-gray-400">
            <Nav />
            <div className="flex items-center justify-center h-screen">
                <motion.p
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-xl text-amber-500"
                >
                    Redirection vers la connexion...
                </motion.p>
            </div>
        </div>
    );

    const getInitials = (f, l) => {
        const n = `${f || ''} ${l || ''}`.trim();
        if (!n) return '?';
        return n.split(' ').map(x => x[0]).join('').toUpperCase().slice(0, 2);
    };

    const getAvatarColor = (name) => {
        const colors = [
            'bg-gradient-to-br from-amber-400 to-amber-600',
            'bg-gradient-to-br from-yellow-400 to-yellow-600',
            'bg-gradient-to-br from-orange-400 to-orange-600',
            'bg-gradient-to-br from-red-400 to-red-600',
            'bg-gradient-to-br from-pink-400 to-pink-600',
        ];
        return name ? colors[name.charCodeAt(0) % colors.length] : 'bg-gray-500';
    };

    const displayName = `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'Utilisateur';

    const quickLinks = [
        { href: '/settings', icon: '⚙️', label: 'Paramètres' },
        { href: '/artprodige', icon: '🎨', label: 'ArtProdige' },
        { href: '/dons', icon: '❤️', label: 'Faire un Don' },
    ];

    return (
        <div className="relative flex min-h-screen flex-col bg-black text-gray-400">

            {/* Barre de progression scroll */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-amber-500 origin-left z-[100]"
                style={{ scaleX }}
            />

            <div className="fixed top-0 right-0 left-0 z-50">
                <Nav />
            </div>
            <div className="h-20 lg:h-32" />

            <main className="grow">

                {/* ── Hero ─────────────────────────────────────────────── */}
                <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden px-4 md:px-8">
                    {/* Orbes animés */}
                    <motion.div
                        animate={{ y: [0, -20, 0], opacity: [0.2, 0.35, 0.2] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"
                    />
                    <motion.div
                        animate={{ y: [0, 20, 0], opacity: [0.1, 0.2, 0.1] }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                        className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-zinc-900" />

                    <motion.div
                        className="container mx-auto max-w-4xl relative z-10 text-center"
                        initial="hidden"
                        animate="visible"
                        variants={stagger}
                    >
                        <motion.h1
                            variants={fadeInUp}
                            custom={0}
                            className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-none"
                        >
                            Mon{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600">
                                Profil
                            </span>
                        </motion.h1>
                        <motion.p variants={fadeInUp} custom={0.1} className="text-lg md:text-xl text-gray-300 font-light">
                            Gère tes informations personnelles et tes paramètres
                        </motion.p>
                    </motion.div>
                </section>

                {/* ── Contenu ───────────────────────────────────────────── */}
                <section className="py-20 px-4 md:px-8 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/50 to-black pointer-events-none" />

                    <div className="container mx-auto max-w-4xl relative z-10">

                        {/* Bandeaux feedback */}
                        <AnimatePresence>
                            {successMessage && (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, y: -12, height: 0 }}
                                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                                    exit={{ opacity: 0, y: -12, height: 0 }}
                                    className="mb-8 p-4 bg-gradient-to-r from-amber-500/20 to-yellow-500/10 border border-amber-500/50 rounded-2xl text-amber-400 font-bold text-center"
                                >
                                    {successMessage}
                                </motion.div>
                            )}
                            {errorMessage && (
                                <motion.div
                                    key="error"
                                    initial={{ opacity: 0, y: -12, height: 0 }}
                                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                                    exit={{ opacity: 0, y: -12, height: 0 }}
                                    className="mb-8 p-4 bg-gradient-to-r from-red-500/20 to-red-500/10 border border-red-500/50 rounded-2xl text-red-400 font-bold text-center"
                                >
                                    {errorMessage}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* ── Grille principale ────────────────────────── */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">

                            {/* Carte profil (sidebar) */}
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={fadeInScale}
                                custom={0.1}
                                className="lg:col-span-1"
                            >
                                <div className="bg-gradient-to-br from-zinc-950 to-black border border-white/10 rounded-3xl p-8 text-center">

                                    {/* Avatar avec ring pulsé */}
                                    <motion.div
                                        initial={{ scale: 0, rotate: -20 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                                        whileHover={{ scale: 1.07 }}
                                        className={`w-24 h-24 ${getAvatarColor(user.firstName)} rounded-full flex items-center justify-center text-white font-black text-3xl border-4 border-amber-400/50 mx-auto mb-6 shadow-2xl shadow-amber-500/20 cursor-default`}
                                    >
                                        {getInitials(user.firstName, user.lastName)}
                                    </motion.div>

                                    <motion.h2
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.35 }}
                                        className="text-3xl font-black text-white mb-2 tracking-tight"
                                    >
                                        {displayName}
                                    </motion.h2>
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.45 }}
                                        className="text-amber-500 text-sm font-bold uppercase tracking-widest mb-6"
                                    >
                                        Membre depuis {new Date(user.created_at).getFullYear()}
                                    </motion.p>

                                    {/* Infos contact */}
                                    <motion.div
                                        initial="hidden"
                                        animate="visible"
                                        variants={stagger}
                                        className="space-y-3 mb-8 pt-8 border-t border-white/10"
                                    >
                                        {[
                                            { icon: <Mail />, value: user.email },
                                            user.telephone && { icon: <Phone />, value: user.telephone },
                                            user.localisation && { icon: <MapPin />, value: user.localisation },
                                        ].filter(Boolean).map(({ icon, value }, i) => (
                                            <motion.div
                                                key={i}
                                                variants={fadeInUp}
                                                custom={i * 0.05}
                                                className="flex items-center gap-2 text-gray-400"
                                            >
                                                {React.cloneElement(icon, { size: 16, className: 'text-amber-500 shrink-0' })}
                                                <span className="text-sm break-all">{value}</span>
                                            </motion.div>
                                        ))}
                                    </motion.div>

                                    {/* Boutons */}
                                    <AnimatePresence>
                                        {!isEditing && (
                                            <motion.button
                                                key="edit-btn"
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(245,158,11,0.3)' }}
                                                whileTap={{ scale: 0.97 }}
                                                onClick={() => setIsEditing(true)}
                                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-black px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest mb-4"
                                            >
                                                <Edit2 size={16} />
                                                Modifier le Profil
                                            </motion.button>
                                        )}
                                    </AnimatePresence>

                                    <motion.button
                                        whileHover={{ scale: 1.02, borderColor: 'rgba(239,68,68,0.7)' }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={handleLogout}
                                        className="w-full flex items-center justify-center gap-2 bg-red-600/20 border border-red-600/50 text-red-400 px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-colors"
                                    >
                                        <LogOut size={16} />
                                        Déconnexion
                                    </motion.button>
                                </div>
                            </motion.div>

                            {/* Panneau édition / lecture */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                                className="lg:col-span-2"
                            >
                                <div className="bg-gradient-to-br from-zinc-950 to-black border border-white/10 rounded-3xl p-8 overflow-hidden">
                                    <AnimatePresence mode="wait">

                                        {/* ── Mode édition ─────────────── */}
                                        {isEditing ? (
                                            <motion.div key="edit" {...formPanelVariants}>
                                                <h3 className="text-3xl font-black text-white mb-8 tracking-tight">
                                                    Modifier les Informations
                                                </h3>
                                                <motion.div
                                                    className="space-y-6"
                                                    initial="hidden"
                                                    animate="visible"
                                                    variants={stagger}
                                                >
                                                    <FormField label="Prénom" icon={<User />} name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Ton prénom" />
                                                    <FormField label="Nom" icon={<User />} name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Ton nom" />
                                                    <FormField label="Email" icon={<Mail />} name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="ton.email@exemple.com" />
                                                    <FormField label="Téléphone" icon={<Phone />} name="telephone" value={formData.telephone} onChange={handleInputChange} type="tel" placeholder="+229 XX XXX XXX" />
                                                    <FormField label="Localisation" icon={<MapPin />} name="localisation" value={formData.localisation} onChange={handleInputChange} placeholder="Ville, Pays" />

                                                    {/* Bio (textarea) */}
                                                    <motion.div variants={fadeInUp}>
                                                        <label className="block text-white font-bold text-sm mb-3 uppercase tracking-widest">Bio</label>
                                                        <motion.textarea
                                                            name="bio"
                                                            value={formData.bio}
                                                            onChange={handleInputChange}
                                                            placeholder="Parle un peu de toi..."
                                                            rows="4"
                                                            whileFocus={{ borderColor: '#f59e0b', scale: 1.005 }}
                                                            className="w-full bg-black border-2 border-white/10 focus:border-amber-500 text-white px-6 py-4 rounded-xl outline-none transition-colors duration-300 resize-none placeholder-gray-600"
                                                        />
                                                    </motion.div>

                                                    {/* Boutons save / cancel */}
                                                    <motion.div variants={fadeInUp} className="flex gap-4 pt-6">
                                                        <motion.button
                                                            onClick={handleSave}
                                                            disabled={isSaving}
                                                            whileHover={!isSaving ? { scale: 1.02, boxShadow: '0 0 30px rgba(245,158,11,0.3)' } : {}}
                                                            whileTap={!isSaving ? { scale: 0.97 } : {}}
                                                            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-black px-6 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                                                        >
                                                            {isSaving ? (
                                                                <motion.svg
                                                                    animate={{ rotate: 360 }}
                                                                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                                                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                                                >
                                                                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                                                </motion.svg>
                                                            ) : <Save size={16} />}
                                                            {isSaving ? 'Sauvegarde...' : 'Enregistrer'}
                                                        </motion.button>

                                                        <motion.button
                                                            onClick={handleCancel}
                                                            disabled={isSaving}
                                                            whileHover={{ scale: 1.01, backgroundColor: 'rgba(255,255,255,0.08)' }}
                                                            whileTap={{ scale: 0.97 }}
                                                            className="flex-1 flex items-center justify-center gap-2 bg-white/5 border border-white/20 text-white px-6 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest disabled:opacity-50 transition-colors"
                                                        >
                                                            <X size={16} />
                                                            Annuler
                                                        </motion.button>
                                                    </motion.div>
                                                </motion.div>
                                            </motion.div>

                                        ) : (
                                            /* ── Mode lecture ──────────────── */
                                            <motion.div key="view" {...formPanelVariants}>
                                                <h3 className="text-3xl font-black text-white mb-8 tracking-tight">
                                                    Informations Personnelles
                                                </h3>
                                                <motion.div
                                                    className="space-y-6"
                                                    initial="hidden"
                                                    animate="visible"
                                                    variants={stagger}
                                                >
                                                    <InfoRow label="Prénom" value={formData.firstName} delay={0} />
                                                    <InfoRow label="Nom" value={formData.lastName} delay={0.05} />
                                                    <InfoRow label="Email" value={formData.email} delay={0.1} />
                                                    <InfoRow label="Téléphone" value={formData.telephone} delay={0.15} />
                                                    <InfoRow label="Localisation" value={formData.localisation} delay={0.2} />
                                                    {formData.bio && <InfoRow label="Bio" value={formData.bio} delay={0.25} />}
                                                </motion.div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        </div>

                        {/* ── Bas de page : stats + liens rapides ──────── */}
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 gap-8"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-60px' }}
                            variants={stagger}
                        >
                            {/* Stats */}
                            <motion.div
                                variants={fadeInUp}
                                custom={0}
                                className="bg-gradient-to-br from-zinc-950 to-black border border-white/10 rounded-3xl p-8"
                            >
                                <h3 className="text-2xl font-black text-white mb-6 tracking-tight">
                                    Statistiques du Compte
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        { label: 'Statut', value: 'Actif', amber: true },
                                        { label: 'Membre depuis', value: new Date(user.created_at).toLocaleDateString('fr-FR') },
                                        { label: 'Rôle', value: user.role || 'Membre' },
                                    ].map(({ label, value, amber }, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.08 }}
                                            className="flex justify-between items-center pb-4 border-b border-white/10 last:border-0"
                                        >
                                            <span className="text-gray-400">{label}</span>
                                            <span className={`font-bold ${amber ? 'text-amber-400' : 'text-white'}`}>{value}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Liens rapides */}
                            <motion.div
                                variants={fadeInUp}
                                custom={0.1}
                                className="bg-gradient-to-br from-zinc-950 to-black border border-white/10 rounded-3xl p-8"
                            >
                                <h3 className="text-2xl font-black text-white mb-6 tracking-tight">
                                    Liens Rapides
                                </h3>
                                <div className="space-y-3">
                                    {quickLinks.map(({ href, icon, label }, i) => (
                                        <motion.a
                                            key={i}
                                            href={href}
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.08 }}
                                            whileHover={{ x: 6, backgroundColor: 'rgba(217,119,6,0.15)' }}
                                            className="flex items-center gap-2 p-4 bg-white/5 rounded-xl group transition-colors"
                                        >
                                            <span>{icon}</span>
                                            <span className="text-white font-bold group-hover:text-amber-400 transition-colors">{label}</span>
                                            <motion.span
                                                className="ml-auto"
                                                animate={{ x: [0, 3, 0] }}
                                                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                                            >
                                                <ArrowRight size={14} className="text-gray-500 group-hover:text-amber-400 transition-colors" />
                                            </motion.span>
                                        </motion.a>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <section id="contact" className="py-32 bg-zinc-950">
                <Contact verset={{
                    verset: "Or, la vie éternelle, c'est qu'ils te connaissent, toi, le seul vrai Dieu, et celui que tu as envoyé, Jésus Christ",
                    ref: 'Jean 17:3'
                }} />
            </section>

            <Footer />
        </div>
    );
};

export default ProfilePage;