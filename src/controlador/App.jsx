import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Auth } from '../vista/Autenticacion';
import { Dashboard } from '../vista/Dashboard';
import '../estilos/Auth.css';
import '../estilos/Dash.css';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;