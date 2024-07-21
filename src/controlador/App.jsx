import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Auth } from '../vista/Autenticacion';
import { MainScreen } from '../vista/Dashboard';
import { Register } from '../vista/Registro';
import { EditUserScreen } from '../vista/Editar';
import { CssBaseline, Container } from '@mui/material';
import { ReportedPostsScreen } from '../vista/Reportes';
import { GroupViewScreen } from '../vista/Grupos';


const App = () => {
  const [userData, setUserData] = useState(null);

  const handleLoginSuccess = (data) => {
    setUserData(data);
  };

  return (
    <Router>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <Routes>
          <Route path="/" element={<Auth onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/dashboard" element={<MainScreen userData={userData} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/perfil" element={<EditUserScreen />} />
          <Route path="/reportes" element={<ReportedPostsScreen />} />
          <Route path="/grupo" element={<GroupViewScreen />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
