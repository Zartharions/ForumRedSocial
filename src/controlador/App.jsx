import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Auth } from '../vista/Autenticacion';
import { MainScreen } from '../vista/Dashboard';
import { Register } from '../vista/Registro';
import { EditUserScreen } from '../vista/Editar';
import { CssBaseline, Container } from '@mui/material';
import { GroupViewScreen } from '../vista/Grupo';

const App = () => {
  const [userData, setUserData] = useState(null);

  // Cargar datos del localStorage al montar el componente
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedUserGroups = JSON.parse(localStorage.getItem('userGroups'));

    if (storedUser) {
      setUserData({
        usuario: storedUser.usuario,
        id_usuario: storedUser.id_usuario,
        userGroups: storedUser.grupos
      });
    }
  }, []);

  const handleLoginSuccess = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    localStorage.setItem('userGroups', JSON.stringify(data.userGroups || []));
    setUserData({
      usuario: data.usuario,
      id_usuario: data.id_usuario,
      userGroups: data.userGroups || []
    });
  };

  return (
    <Router>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <Routes>
          <Route path="/login" element={<Auth onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/" element={<MainScreen user={userData ? userData.usuario : null} userGroups={userData ? userData.userGroups : []} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/perfil" element={<EditUserScreen />} />
          <Route path="/grupo" element={<GroupViewScreen />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
