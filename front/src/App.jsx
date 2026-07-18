import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./App.css";

import { AuthProvider } from './components/AuthContext.jsx';
import AuthComponent from './components/AuthComponent.jsx';
import AdminRoute from './components/AdminRoute.jsx';

// Composants vitaux / à chargement immédiat
import Index from "./Index.jsx";
import Login from "./components/Auth/Login.jsx";
import Register from "./components/Auth/Register.jsx";
import ForgotPassword from "./components/Auth/ForgotPassword.jsx";
import ResetPassword from "./components/Auth/ResetPassword.jsx";
import GoogleCallback from "./components/Auth/GoogleCallback.jsx";
import ScrollToTop from './util/ScrollToTop.jsx';
import NotFound from './components/page/NotFound.jsx';

// Chargement paresseux (Lazy Loading) pour le reste des pages
const Fij = React.lazy(() => import("./components/page/Fij.jsx"));
const Apropos = React.lazy(() => import("./components/page/Apropos.jsx"));
const Don = React.lazy(() => import("./components/page/Don.jsx"));
const Galerie = React.lazy(() => import('./components/page/Galerie.jsx'));
const Ministeres = React.lazy(() => import('./components/page/Ministeres.jsx'));
const EventsPage = React.lazy(() => import('./components/page/Evenements.jsx'));
const ArtProdige = React.lazy(() => import('./components/page/ArtProdige.jsx'));
const SalvationPrayer = React.lazy(() => import('./components/page/Salvation.jsx'));
const ProfilePage = React.lazy(() => import('./components/page/ProfilePage.jsx'));
const AdminPage = React.lazy(() => import('./components/page/AdminPage.jsx'));

// U2: Premium page loader fallback
const PageLoader = () => (
    <div
        className="h-screen w-screen flex flex-col items-center justify-center bg-black"
        role="status"
        aria-label="Chargement de la page"
    >
        <div style={{ position: 'relative', width: '48px', height: '48px', marginBottom: '16px' }}>
            <div style={{
                position: 'absolute', inset: 0, borderRadius: '50%',
                border: '2px solid rgba(217,119,6,0.2)',
            }} />
            <div style={{
                position: 'absolute', inset: 0, borderRadius: '50%',
                border: '2px solid transparent',
                borderTopColor: '#d97706',
                animation: 'spin 0.8s linear infinite',
            }} />
        </div>
        <p style={{ color: 'rgba(217,119,6,0.7)', fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
            Chargement
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
);

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <AuthProvider>
                <Suspense fallback={<PageLoader />}>
                    <Routes>
                        {/* Public routes */}
                        <Route path='/' element={<Index />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/forgot-password' element={<ForgotPassword />} />
                        <Route path='/reset-password' element={<ResetPassword />} />
                        <Route path='/oauth/callback' element={<GoogleCallback />} />
                        <Route path='/fij' element={<Fij />} />
                        <Route path='/apropos' element={<Apropos />} />
                        <Route path='/dons' element={<Don />} />
                        <Route path='/galerie' element={<Galerie />} />
                        <Route path='/ministeres' element={<Ministeres />} />
                        <Route path='/evenements' element={<EventsPage />} />
                        <Route path='/salvation' element={<SalvationPrayer />} />

                        {/* Protected routes */}
                        <Route path='/artprodige' element={
                            <AuthComponent>
                                <ArtProdige />
                            </AuthComponent>
                        } />
                        <Route path='/profile' element={
                            <AuthComponent>
                                <ProfilePage />
                            </AuthComponent>
                        } />

                        {/* Admin routes */}
                        <Route path='/admin' element={
                            <AdminRoute>
                                <AdminPage />
                            </AdminRoute>
                        } />

                        {/* M5: 404 catch-all */}
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </Suspense>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;