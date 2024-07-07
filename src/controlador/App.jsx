import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Auth } from '../vista/Autenticacion';
import { Dashboard } from '../vista/Dashboard';
import '../estilos/Auth.css';
import '../estilos/Dash.css';

const App = () => {
  const [userData, setUserData] = useState(null);

  const handleLoginSuccess = (data) => {
    setUserData(data);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/dashboard" element={<Dashboard userData={userData} />} />
      </Routes>
    </Router>
  );
};

export default App;
