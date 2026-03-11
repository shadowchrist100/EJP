import React, { useState, useEffect, Component } from 'react';
import "./App.css";

import Index from "./Index.jsx";
import Login from "./components/Auth/Login.jsx";
import Register from "./components/Auth/Register.jsx";
import Fij from "./components/page/Fij.jsx";
import Apropos from "./components/page/Apropos.jsx";
import Don from "./components/page/Don.jsx";
import Galerie from './components/page/Galerie.jsx';
import Ministeres from './components/page/Ministeres.jsx';
import EventsPage from './components/page/Evenements.jsx';
import BackgroundSlider from './components/page/Background.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ArtProdige from './components/page/ArtProdige.jsx';
import SalvationPrayer from './components/page/Salvation.jsx';
import { AuthProvider } from './components/AuthContext.jsx';
import AuthComponent from './components/AuthComponent.jsx';
import ProfilePage from './components/page/ProfilePage.jsx';

function App() {


    return (
        <AuthProvider>
            <BrowserRouter>
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
                    }
                    />
                    <Route path='/profile' element= {
                        <AuthComponent>
                            <ProfilePage></ProfilePage>    
                        </AuthComponent>
                    } />
                    
                </Routes>
            </BrowserRouter>
        </AuthProvider>

    )
}

export default App;