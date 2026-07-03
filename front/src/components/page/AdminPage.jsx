import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../AuthContext";
import { apiFetch } from "../../util/api";
import { Nav, Footer } from "../";
import { Users, Heart, BookOpen, LogOut, AlertCircle } from 'lucide-react';

const TABS = [
    { key: 'users', label: 'Utilisateurs', icon: Users },
    { key: 'salvation', label: 'Prière du salut', icon: Heart },
    { key: 'ministry', label: 'Demandes ministères', icon: BookOpen },
];

const AdminPage = () => {
    const { user, logout } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('users');
    const [data, setData] = useState({ users: [], salvation: [], ministry: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
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
        fetchData();
    }, []);

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
                        <p className="text-zinc-500 text-sm mt-1">
                            Connecté en tant que <span className="text-amber-400">{user?.firstName} {user?.lastName}</span>
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
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {activeTab === 'users' && <UsersTable users={data.users} />}
                        {activeTab === 'salvation' && <SalvationTable users={data.salvation} />}
                        {activeTab === 'ministry' && <MinistryTable requests={data.ministry} />}
                    </motion.div>
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

const UsersTable = ({ users }) => (
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
                    <Th>Salut</Th>
                    <Th>Admin</Th>
                    <Th>Inscrit le</Th>
                </TableHead>
                <tbody>
                    {users.map(u => (
                        <tr key={u.id} className="hover:bg-zinc-900/50 transition-colors">
                            <Td><span className="text-white font-medium">{u.firstName} {u.lastName}</span></Td>
                            <Td className="text-zinc-400">{u.email}</Td>
                            <Td>{u.telephone || '-'}</Td>
                            <Td>{u.localisation || '-'}</Td>
                            <Td>{u.prayed_salvation_prayer ? <span className="text-green-500">✓</span> : '-'}</Td>
                            <Td>{u.is_admin ? <span className="text-amber-500">✓</span> : '-'}</Td>
                            <Td className="text-zinc-500 text-xs">{new Date(u.created_at).toLocaleDateString('fr-FR')}</Td>
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
