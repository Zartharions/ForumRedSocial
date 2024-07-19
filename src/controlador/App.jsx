import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Auth } from '../vista/Autenticacion';
import { Dashboard } from '../vista/Dashboard';
import { Register } from '../vista/Registro';
import { CssBaseline, Container } from '@mui/material';

const App = () => {
  const [userData, setUserData] = useState(null);

  const handleLoginSuccess = (data) => {
    setUserData(data);
  };

  return (
    <Router>
      <CssBaseline />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Auth onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/dashboard" element={<Dashboard userData={userData} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
