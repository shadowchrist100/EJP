import React, { useState, useEffect, Component } from 'react';
import "./App.css";

import Index from "./Index.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Fij from "./Fij.jsx";
import Apropos from './Apropos.jsx';
import Don from './Don.jsx';
import Galerie from './Galerie.jsx';

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
    default:
      break;
  }
  return (
    <Component />
  );
}

export default App;