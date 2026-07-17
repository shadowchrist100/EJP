import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../AuthContext";
import { apiFetch } from "../../util/api";
import { Nav, Footer } from "../";
import { Users, Heart, BookOpen, LogOut, AlertCircle, Eye, X, Shield, ShieldOff } from 'lucide-react';

const TABS = [
    { key: 'users', label: 'Utilisateurs', icon: Users },
    { key: 'salvation', label: 'Prière du salut', icon: Heart },
    { key: 'ministry', label: 'Demandes ministères', icon: BookOpen },
];

const AdminPage = () => {
    const { user, logout } = useContext(AuthContext);
    const isSuperAdmin = user?.is_superadmin;
    const [activeTab, setActiveTab] = useState('users');
    const [data, setData] = useState({ users: [], salvation: [], ministry: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [updating, setUpdating] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError('');
        try {
            const [usersRes, salvationRes, ministryRes] = await Promise.all([
                apiFetch('/admin/users'),
                apiFetch('/admin/users/salvation'),
                apiFetch('/admin/ministry-requests'),
            ]);
            setData({
                users: usersRes.users || [],
                salvation: salvationRes.users || [],
                ministry: ministryRes.requests || [],
            });
        } catch (err) {
            setError(err.message || 'Erreur lors du chargement des données.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleToggleAdmin = async (targetUser, makeAdmin) => {
        setUpdating(targetUser.id);
        setError('');
        try {
            const endpoint = `/admin/user/${targetUser.id}/${makeAdmin ? 'make-admin' : 'remove-admin'}`;
            await apiFetch(endpoint, { method: 'POST' });
            setData(prev => ({
                ...prev,
                users: prev.users.map(u =>
                    u.id === targetUser.id ? { ...u, is_admin: makeAdmin } : u
                ),
            }));
            if (selectedUser?.id === targetUser.id) {
                setSelectedUser(prev => prev ? { ...prev, is_admin: makeAdmin } : null);
            }
        } catch (err) {
            setError(err.message || 'Erreur lors de la mise à jour.');
        } finally {
            setUpdating(null);
        }
    };

    const handleViewUser = async (userId) => {
        setSelectedUser(null);
        try {
            const res = await apiFetch(`/admin/user/${userId}`);
            setSelectedUser(res.user);
        } catch (err) {
            setError(err.message || 'Erreur lors du chargement du profil.');
        }
    };

    return (
        <div className="min-h-screen bg-black text-gray-300 font-body">
            <header className="fixed top-0 right-0 left-0 z-50">
                <Nav />
            </header>
            <div className="h-24" />

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-10 border-b border-zinc-800 pb-6">
                    <div>
                        <h1 className="font-display text-4xl text-white uppercase tracking-wide">Administration</h1>
                        <p className="text-zinc-500 text-sm mt-1 flex items-center gap-2">
                            Connecté en tant que <span className="text-amber-400">{user?.firstName} {user?.lastName}</span>
                            {isSuperAdmin && (
                                <span className="text-[10px] uppercase tracking-widest bg-amber-500/10 text-amber-500 border border-amber-500/30 px-2 py-0.5 rounded-full">
                                    Super Admin
                                </span>
                            )}
                        </p>
                    </div>
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 text-zinc-400 hover:text-red-400 transition-colors text-xs uppercase tracking-widest font-bold"
                    >
                        <LogOut size={16} />
                        Déconnexion
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 mb-8 border-b border-zinc-800">
                    {TABS.map(({ key, label, icon: Icon }) => (
                        <button
                            key={key}
                            onClick={() => setActiveTab(key)}
                            className={`flex items-center gap-2 px-5 py-3 text-xs uppercase tracking-widest font-bold transition-all duration-300 border-b-2 ${
                                activeTab === key
                                    ? 'border-amber-500 text-amber-400'
                                    : 'border-transparent text-zinc-500 hover:text-zinc-300'
                            }`}
                        >
                            <Icon size={14} />
                            {label}
                            <span className="ml-1 text-[10px] opacity-50">
                                ({data[key].length})
                            </span>
                        </button>
                    ))}
                </div>

                {/* Error */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3"
                        >
                            <AlertCircle size={18} className="text-red-500 shrink-0" />
                            <p className="text-red-400 text-sm">{error}</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Loading */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500" />
                        <p className="text-zinc-500 text-sm mt-4">Chargement des données...</p>
                    </div>
                ) : (
                    <div className="flex gap-8">
                        {/* Main content */}
                        <div className="flex-1 min-w-0">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {activeTab === 'users' && (
                                    <UsersTable
                                        users={data.users}
                                        currentUserId={user?.id}
                                        isSuperAdmin={isSuperAdmin}
                                        onView={handleViewUser}
                                        onToggleAdmin={handleToggleAdmin}
                                        updating={updating}
                                    />
                                )}
                                {activeTab === 'salvation' && <SalvationTable users={data.salvation} />}
                                {activeTab === 'ministry' && <MinistryTable requests={data.ministry} />}
                            </motion.div>
                        </div>

                        {/* User detail panel */}
                        <AnimatePresence>
                            {selectedUser && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="w-80 shrink-0"
                                >
                                    <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-6 sticky top-32">
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-xs uppercase tracking-widest text-zinc-400 font-bold">Détail</h3>
                                            <button onClick={() => setSelectedUser(null)} className="text-zinc-500 hover:text-white transition-colors">
                                                <X size={16} />
                                            </button>
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Nom</p>
                                                <p className="text-white font-medium">{selectedUser.firstName} {selectedUser.lastName}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Email</p>
                                                <p className="text-zinc-300">{selectedUser.email}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Téléphone</p>
                                                <p className="text-zinc-300">{selectedUser.telephone || '-'}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Localisation</p>
                                                <p className="text-zinc-300">{selectedUser.localisation || '-'}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Bio</p>
                                                <p className="text-zinc-300 text-sm">{selectedUser.bio || '-'}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Rôle</p>
                                                {selectedUser.is_superadmin ? (
                                                    <span className="text-amber-500 text-xs font-bold uppercase tracking-wider">Super Admin</span>
                                                ) : selectedUser.is_admin ? (
                                                    <span className="text-amber-400/70 text-xs font-bold uppercase tracking-wider">Admin</span>
                                                ) : (
                                                    <span className="text-zinc-500 text-xs">Utilisateur</span>
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Priére du salut</p>
                                                <p>{selectedUser.prayed_salvation_prayer ? <span className="text-green-500">✓</span> : '-'}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">Inscrit le</p>
                                                <p className="text-zinc-500 text-xs">{new Date(selectedUser.created_at).toLocaleDateString('fr-FR')}</p>
                                            </div>

                                            {isSuperAdmin && selectedUser.id !== user?.id && !selectedUser.is_superadmin && (
                                                <div className="pt-4 border-t border-zinc-800">
                                                    {selectedUser.is_admin ? (
                                                        <button
                                                            onClick={() => handleToggleAdmin(selectedUser, false)}
                                                            disabled={updating === selectedUser.id}
                                                            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs uppercase tracking-widest font-bold bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors disabled:opacity-50"
                                                        >
                                                            <ShieldOff size={14} />
                                                            {updating === selectedUser.id ? '...' : 'Retirer admin'}
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleToggleAdmin(selectedUser, true)}
                                                            disabled={updating === selectedUser.id}
                                                            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs uppercase tracking-widest font-bold bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-lg hover:bg-amber-500/20 transition-colors disabled:opacity-50"
                                                        >
                                                            <Shield size={14} />
                                                            {updating === selectedUser.id ? '...' : 'Nommer admin'}
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            <footer className="border-t border-zinc-900 mt-20">
                <Footer />
            </footer>
        </div>
    );
};

const TableHead = ({ children }) => (
    <thead className="bg-zinc-900">
        <tr>{children}</tr>
    </thead>
);

const Th = ({ children }) => (
    <th className="text-left text-[10px] uppercase tracking-widest text-zinc-400 font-bold px-4 py-3">{children}</th>
);

const Td = ({ children }) => (
    <td className="px-4 py-3 text-sm text-zinc-300 border-t border-zinc-800/50">{children}</td>
);

const UsersTable = ({ users, currentUserId, isSuperAdmin, onView, onToggleAdmin, updating }) => (
    <div className="overflow-x-auto">
        {users.length === 0 ? (
            <p className="text-zinc-500 text-center py-12">Aucun utilisateur inscrit.</p>
        ) : (
            <table className="w-full">
                <TableHead>
                    <Th>Nom</Th>
                    <Th>Email</Th>
                    <Th>Téléphone</Th>
                    <Th>Localisation</Th>
                    <Th>Rôle</Th>
                    <Th>Salut</Th>
                    <Th>Inscrit le</Th>
                    <Th></Th>
                </TableHead>
                <tbody>
                    {users.map(u => (
                        <tr key={u.id} className="hover:bg-zinc-900/50 transition-colors">
                            <Td>
                                <span className="text-white font-medium">{u.firstName} {u.lastName}</span>
                                {u.id === currentUserId && <span className="ml-2 text-[10px] text-zinc-500">(vous)</span>}
                            </Td>
                            <Td className="text-zinc-400">{u.email}</Td>
                            <Td>{u.telephone || '-'}</Td>
                            <Td>{u.localisation || '-'}</Td>
                            <Td>
                                {u.is_superadmin ? (
                                    <span className="text-amber-500 text-xs font-bold uppercase tracking-wider">Super Admin</span>
                                ) : u.is_admin ? (
                                    <span className="text-amber-400/70 text-xs font-bold uppercase tracking-wider">Admin</span>
                                ) : (
                                    <span className="text-zinc-600 text-xs">Utilisateur</span>
                                )}
                            </Td>
                            <Td>{u.prayed_salvation_prayer ? <span className="text-green-500">✓</span> : '-'}</Td>
                            <Td className="text-zinc-500 text-xs">{new Date(u.created_at).toLocaleDateString('fr-FR')}</Td>
                            <Td>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => onView(u.id)}
                                        className="p-1.5 text-zinc-500 hover:text-amber-400 transition-colors"
                                        title="Voir le détail"
                                    >
                                        <Eye size={14} />
                                    </button>
                                    {isSuperAdmin && u.id !== currentUserId && !u.is_superadmin && (
                                        u.is_admin ? (
                                            <button
                                                onClick={() => onToggleAdmin(u, false)}
                                                disabled={updating === u.id}
                                                className="p-1.5 text-zinc-500 hover:text-red-400 transition-colors disabled:opacity-50"
                                                title="Retirer admin"
                                            >
                                                <ShieldOff size={14} />
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => onToggleAdmin(u, true)}
                                                disabled={updating === u.id}
                                                className="p-1.5 text-zinc-500 hover:text-amber-400 transition-colors disabled:opacity-50"
                                                title="Nommer admin"
                                            >
                                                <Shield size={14} />
                                            </button>
                                        )
                                    )}
                                </div>
                            </Td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>
);

const SalvationTable = ({ users }) => (
    <div className="overflow-x-auto">
        {users.length === 0 ? (
            <p className="text-zinc-500 text-center py-12">Aucune prière du salut enregistrée.</p>
        ) : (
            <table className="w-full">
                <TableHead>
                    <Th>Nom</Th>
                    <Th>Email</Th>
                    <Th>Téléphone</Th>
                    <Th>Date</Th>
                </TableHead>
                <tbody>
                    {users.map(u => (
                        <tr key={u.id} className="hover:bg-zinc-900/50 transition-colors">
                            <Td><span className="text-white font-medium">{u.firstName} {u.lastName}</span></Td>
                            <Td className="text-zinc-400">{u.email}</Td>
                            <Td>{u.telephone || '-'}</Td>
                            <Td className="text-zinc-500 text-xs">{new Date(u.created_at).toLocaleDateString('fr-FR')}</Td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>
);

const MinistryTable = ({ requests }) => (
    <div className="overflow-x-auto">
        {requests.length === 0 ? (
            <p className="text-zinc-500 text-center py-12">Aucune demande de ministère.</p>
        ) : (
            <table className="w-full">
                <TableHead>
                    <Th>Utilisateur</Th>
                    <Th>Email</Th>
                    <Th>Ministère</Th>
                    <Th>Message</Th>
                    <Th>Date</Th>
                </TableHead>
                <tbody>
                    {requests.map(r => (
                        <tr key={r.id} className="hover:bg-zinc-900/50 transition-colors">
                            <Td>
                                <span className="text-white font-medium">
                                    {r.user ? `${r.user.firstName} ${r.user.lastName}` : 'Inconnu'}
                                </span>
                            </Td>
                            <Td className="text-zinc-400">{r.email || r.user?.email || '-'}</Td>
                            <Td><span className="text-amber-400 text-xs font-bold uppercase tracking-wider">{r.ministry_name}</span></Td>
                            <Td className="max-w-xs truncate text-zinc-400">{r.message || '-'}</Td>
                            <Td className="text-zinc-500 text-xs">{new Date(r.created_at).toLocaleDateString('fr-FR')}</Td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>
);

export default AdminPage;
