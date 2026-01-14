import React, { useState, useEffect, Component } from 'react';
import "./App.css";

import Index from "./Index.jsx";
import Login from "./components/Auth/Login.jsx";
import Register from "./components/Auth/Register.jsx";
import Fij from "./components/page/Fij.jsx";
import Apropos from "./components/page/Apropos.jsx";
import Don from "./components/page/Don.jsx";
import Galerie from './components/page/Galerie.jsx';
import Ministeres from './Ministeres.jsx';

function App() {
  let Component;
  switch (window.location.pathname) {
    case "/":
      Component = Index;
      break;
    case "/Login":
      Component = Login;
      break;
    case "/Register":
      Component = Register;
      break;
    case "/Fij":
      Component=Fij;
      break
    case "/apropos":
      Component= Apropos;
      break;
    case "/dons":
        Component= Don;
      break;
      case "/galerie" :
        Component= Galerie;
        break;
      case "/ministeres":
        Component = Ministeres
    default:
      break;
  }
  return (
    <Component />
  );
}

export default App;