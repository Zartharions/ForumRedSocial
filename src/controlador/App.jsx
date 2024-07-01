import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Principal } from '../vista/Principal';
import { Auth } from '../vista/Autenticacion';
import { Busqueda} from '../vista/Busqueda';
import { Control } from '../vista/Control';
import { Agendar } from '../vista/Agendar';
import '../estilos/Auth.css';
import '../estilos/Busqueda.css';
import '../estilos/Agendar.css';
import '../estilos/Control.css';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/sign-up-log-in" element={<Auth />} />
        <Route path="/search" element={<Busqueda />} />
        <Route path="/control" element={<Control />} />
        <Route path="/agendar" element={<Agendar />} />
      </Routes>
    </Router>
  );
};

export default App;