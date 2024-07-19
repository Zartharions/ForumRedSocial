import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, Paper } from '@mui/material';

export const Auth = ({ onLoginSuccess }) => {
    
    // Variables de estado
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Hook de navegación
    const navigate = useNavigate();

    // Maneja el submit del formulario para autenticar al usuario
    const submit = async (e) => {
        e.preventDefault();
        const body = {
            login_user: usuario,
            login_password: password
        };

        try {
            // Autenticar al usuario
            const response = await axios.post('http://127.0.0.1:9002/segu/login', body);
            if (response.data.result) {
                onLoginSuccess(response.data.data); // Pasar datos del usuario a App
                navigate('/dashboard');
            } else {
                // Mostrar error de autenticación
                setError('Error en la autenticación, intente de nuevo.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Error en la autenticación, intente de nuevo.');
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#5f6769' }}>
            <Paper elevation={3} sx={{ padding: 4, backgroundColor: '#0c4e5f', borderRadius: 2 }}>
                <Box component="form" onSubmit={submit} sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h5" align="center" sx={{ color: '#dfcdc3', marginBottom: 3 }}>
                        Iniciar Sesión
                    </Typography>
                    <TextField
                        label="Usuario"
                        variant="outlined"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                        sx={{ input: { color: '#202427' } }}
                    />
                    <TextField
                        label="Contraseña"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                        sx={{ input: { color: '#202427' } }}
                    />
                    {error && <Typography color="error" align="center" sx={{ marginTop: 2 }}>{error}</Typography>}
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 3 }}>
                        Ingresar
                    </Button>
                </Box>
                <Box sx={{ textAlign: 'center', marginTop: 3 }}>
                    <Typography variant="body2" sx={{ color: '#8cb924' }}>
                        <a href="/register" style={{ textDecoration: 'none', color: '#8cb924' }}>Registrarse</a>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};
