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

function App() {

    // let Component;
    // switch (window.location.pathname) {
    //     case "/":
    //         Component = Index;
    //         break;
    //     case "/login":
    //         Component = Login;
    //         break;
    //     case "/register":
    //         Component = Register;
    //         break;
    //     case "/fij":
    //         Component = Fij;
    //         break
    //     case "/apropos":
    //         Component = Apropos;
    //         break;
    //     case "/dons":
    //         Component = Don;
    //         break;
    //     case "/galerie":
    //         Component = Galerie;
    //         break;
    //     case "/ministeres":
    //         Component = Ministeres;
    //         break;
    //     case "/evenements":
    //         Component = EventsPage;
    //         break;
    //     case "/t":
    //         Component = BackgroundSlider
    //     default:
    //         break;
    // }
    // return (
    //     <Component />
    // );
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Index />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/fij' element={<Fij />} />
                <Route path='/dons' element={<Don />} />
                <Route path='/galerie' element={<Galerie />} />
                <Route path='/ministeres' element={<Ministeres />} />
                <Route path='/evenements' element={<EventsPage />} />
                <Route path='/' element={<Login />} />
                <Route path='/' element={<Login />} />

            </Routes>
        </BrowserRouter>
    )
}

export default App;