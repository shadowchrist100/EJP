import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./App.css";

import { AuthProvider } from './components/AuthContext.jsx';
import AuthComponent from './components/AuthComponent.jsx';

// Composants vitaux / à chargement immédiat
import Index from "./Index.jsx";
import Login from "./components/Auth/Login.jsx";
import Register from "./components/Auth/Register.jsx";

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

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center bg-black text-amber-500 font-display text-2xl animate-pulse">Chargement...</div>}>
                    <Routes>
                        {/* Public routes */}
                        <Route path='/' element={<Index />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/fij' element={<Fij />} />
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
                    </Routes>
                </Suspense>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;