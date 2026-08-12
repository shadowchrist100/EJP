import { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PenSquare, X, Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { AuthContext } from '../AuthContext';
import { apiFetch } from '../../util/api';

/* ─── Champ de formulaire (config-driven) ─────────────────────────────── */

const FieldInput = ({ field, value, onChange }) => {
    const base =
        'w-full bg-zinc-950 border border-zinc-700 text-white text-sm px-3 py-2.5 rounded-lg focus:outline-none focus:border-amber-500 transition-colors';

    switch (field.type) {
        case 'textarea':
            return (
                <textarea
                    rows={5}
                    className={base}
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={field.placeholder}
                />
            );
        case 'array':
            return (
                <textarea
                    rows={4}
                    className={base}
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={field.placeholder || 'Un élément par ligne'}
                />
            );
        case 'select':
            return (
                <select className={base} value={value || ''} onChange={(e) => onChange(e.target.value)}>
                    {field.options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
            );
        case 'number':
            return (
                <input
                    type="number"
                    step={field.step || 'any'}
                    className={base}
                    value={value ?? ''}
                    onChange={(e) => onChange(e.target.value)}
                />
            );
        case 'date':
            return <input type="date" className={base} value={value || ''} onChange={(e) => onChange(e.target.value)} />;
        case 'time':
            return <input type="time" className={base} value={value || ''} onChange={(e) => onChange(e.target.value)} />;
        case 'image':
            return (
                <div>
                    <input
                        type="file"
                        accept="image/*"
                        className={base}
                        onChange={(e) => onChange(e.target.files?.[0] || null)}
                    />
                    {value && !(value instanceof File) && (
                        <img
                            src={value}
                            alt="Aperçu"
                            className="mt-2 h-20 object-cover rounded-lg border border-zinc-700"
                        />
                    )}
                </div>
            );
        default:
            return (
                <input
                    type="text"
                    className={base}
                    value={value ?? ''}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={field.placeholder}
                />
            );
    }
};

/* ─── Panneau de gestion du contenu ───────────────────────────────────── */

const ContentManager = ({
    title,
    singular,
    subtitle,
    items,
    onRefresh,
    apiPath,
    fields,
    columns,
}) => {
    const { user } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState(null);
    const [form, setForm] = useState({});
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const isAdmin = user?.is_admin || user?.is_superadmin;
    if (!isAdmin) return null;

    const labelOf = (item) => {
        const nameField = fields.find((f) => f.name === 'title' || f.name === 'nom');
        const v = nameField ? item[nameField.name] : null;
        return v || item.id || 'élément';
    };

    const toForm = (item) => {
        const out = {};
        fields.forEach((f) => {
            const v = item ? item[f.name] : '';
            out[f.name] = f.type === 'array' ? (Array.isArray(v) ? v.join('\n') : v || '') : (v ?? '');
        });
        return out;
    };

    const openCreate = () => {
        setMode('new');
        setForm(toForm(null));
        setError('');
        setSuccess('');
    };

    const openEdit = (item) => {
        setMode(item.id);
        setForm(toForm(item));
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        setSuccess('');

        const editing = mode !== 'new';
        const missing = fields.find(
            (f) =>
                f.required &&
                (form[f.name] === undefined ||
                    form[f.name] === null ||
                    form[f.name] === '' ||
                    (f.type === 'image' && !(form[f.name] instanceof File) && !editing))
        );
        if (missing) {
            setError(`Le champ « ${missing.label} » est obligatoire.`);
            setSaving(false);
            return;
        }

        try {
            const fd = new FormData();
            fields.forEach((f) => {
                const v = form[f.name];
                if (v === undefined || v === null || v === '') return;
                if (f.type === 'array') {
                    const arr = String(v).split('\n').map((s) => s.trim()).filter(Boolean);
                    fd.append(f.name, JSON.stringify(arr));
                } else if (f.type === 'image') {
                    if (v instanceof File) fd.append(f.name, v);
                } else {
                    fd.append(f.name, v);
                }
            });

            const url = editing ? `${apiPath}/${mode}` : apiPath;
            if (editing) fd.append('_method', 'PUT');
            await apiFetch(url, { method: 'POST', body: fd });

            setSuccess(editing ? 'Modifications enregistrées.' : 'Élément ajouté.');
            await onRefresh();
            setMode(null);
        } catch (err) {
            setError(err.message || 'Erreur lors de la sauvegarde.');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (item) => {
        const label = labelOf(item);
        if (!window.confirm(`Supprimer « ${label} » ? Cette action est irréversible.`)) return;
        setSaving(true);
        setError('');
        try {
            await apiFetch(`${apiPath}/${item.id}`, { method: 'DELETE' });
            setSuccess(`« ${label} » a été supprimé.`);
            await onRefresh();
        } catch (err) {
            setError(err.message || 'Erreur lors de la suppression.');
        } finally {
            setSaving(false);
        }
    };

    const renderValue = (item, col) => {
        if (col.type === 'image') {
            return item[col.name] ? (
                <img src={item[col.name]} alt="" className="h-12 w-16 object-cover rounded-lg border border-zinc-800" />
            ) : '—';
        }
        if (col.type === 'array') {
            const v = item[col.name];
            return Array.isArray(v) ? v.join(', ') || '—' : v || '—';
        }
        const v = item[col.name];
        return v === null || v === undefined || v === '' ? '—' : String(v);
    };

    return (
        <>
            {/* Bouton flottant (admin uniquement) */}
            <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => setOpen(true)}
                className="fixed bottom-6 right-6 z-[9997] flex items-center gap-2 bg-amber-500 text-black font-bold text-xs uppercase tracking-widest px-5 py-3.5 rounded-full shadow-[0_8px_30px_rgba(217,119,6,0.4)] hover:bg-amber-400 transition-colors"
            >
                <PenSquare size={16} />
                Gérer {title}
            </motion.button>

            {/* Panneau principal */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9998] flex items-center justify-center p-4 md:p-8"
                        style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}
                        onClick={() => setOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.92, y: 24 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.94, y: 16 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                            className="relative w-full max-w-4xl bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden flex flex-col"
                            style={{ maxHeight: '88vh' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950 shrink-0">
                                <div>
                                    <h3 className="text-white font-display text-2xl uppercase tracking-wide">
                                        Gestion — {title}
                                    </h3>
                                    {subtitle && <p className="text-zinc-500 text-xs mt-0.5">{subtitle}</p>}
                                </div>
                                <button
                                    onClick={() => setOpen(false)}
                                    className="text-zinc-400 hover:text-white transition-colors"
                                    aria-label="Fermer"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {(error || success) && (
                                <div
                                    className={`px-6 py-3 text-sm shrink-0 ${
                                        error
                                            ? 'bg-red-500/10 text-red-400 border-b border-red-500/20'
                                            : 'bg-green-500/10 text-green-400 border-b border-green-500/20'
                                    }`}
                                >
                                    {error || success}
                                </div>
                            )}

                            <div className="grow overflow-y-auto p-6">
                                <div className="flex justify-end mb-4">
                                    <button
                                        onClick={openCreate}
                                        className="flex items-center gap-2 bg-amber-500 text-black text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-lg hover:bg-amber-400 transition-colors"
                                    >
                                        <Plus size={14} /> Ajouter
                                    </button>
                                </div>

                                {items.length === 0 ? (
                                    <p className="text-zinc-500 text-center py-16">
                                        Aucun élément pour le moment. Cliquez sur « Ajouter ».
                                    </p>
                                ) : (
                                    <div className="space-y-2">
                                        {items.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex items-center gap-4 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3"
                                            >
                                                <div className="grow min-w-0 grid gap-3 md:grid-cols-4">
                                                    {columns.map((col) => (
                                                        <div key={col.name} className="min-w-0">
                                                            <p className="text-[9px] uppercase tracking-widest text-zinc-600 mb-1">
                                                                {col.label}
                                                            </p>
                                                            <p className="text-zinc-300 text-sm truncate">
                                                                {renderValue(item, col)}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="flex items-center gap-1 shrink-0">
                                                    <button
                                                        onClick={() => openEdit(item)}
                                                        className="p-2 text-zinc-400 hover:text-amber-400 transition-colors"
                                                        title="Modifier"
                                                    >
                                                        <Pencil size={15} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item)}
                                                        className="p-2 text-zinc-400 hover:text-red-400 transition-colors"
                                                        title="Supprimer"
                                                    >
                                                        <Trash2 size={15} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Formulaire ajout / modification */}
            <AnimatePresence>
                {mode !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
                        style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(6px)' }}
                        onClick={() => !saving && setMode(null)}
                    >
                        <motion.form
                            onSubmit={handleSubmit}
                            initial={{ opacity: 0, scale: 0.92, y: 24 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.94, y: 16 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                            className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden flex flex-col"
                            style={{ maxHeight: '88vh' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950 shrink-0">
                                <h4 className="text-white font-bold text-lg">
                                    {mode === 'new' ? `Ajouter ${singular || title}` : `Modifier ${singular || title}`}
                                </h4>
                                <button
                                    type="button"
                                    onClick={() => setMode(null)}
                                    disabled={saving}
                                    className="text-zinc-400 hover:text-white transition-colors"
                                    aria-label="Fermer"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="grow overflow-y-auto p-6 space-y-5">
                                {fields.map((field) => (
                                    <div key={field.name}>
                                        <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-1.5">
                                            {field.label}
                                            {field.required && <span className="text-amber-500 ml-1">*</span>}
                                        </label>
                                        <FieldInput
                                            field={field}
                                            value={form[field.name]}
                                            onChange={(v) => setForm((prev) => ({ ...prev, [field.name]: v }))}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-zinc-800 bg-zinc-950 shrink-0">
                                <button
                                    type="button"
                                    onClick={() => setMode(null)}
                                    disabled={saving}
                                    className="text-zinc-400 hover:text-white text-xs uppercase tracking-widest font-bold px-4 py-2"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex items-center gap-2 bg-amber-500 text-black text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-lg hover:bg-amber-400 disabled:opacity-50 transition-colors"
                                >
                                    {saving ? <Loader2 size={14} className="animate-spin" /> : null}
                                    {saving ? 'Enregistrement…' : 'Enregistrer'}
                                </button>
                            </div>
                        </motion.form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ContentManager;
