import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, Paper } from '@mui/material';

export const Auth = ({ onLoginSuccess }) => {
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        const body = {
            login_user: usuario,
            login_password: password
        };

        try {
            const response = await axios.post('http://127.0.0.1:9002/segu/login', body);
            if (response.data.result) {
                onLoginSuccess(response.data.data);
                navigate('/');
            } else {
                setError('Error en la autenticación, intente de nuevo.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Error en la autenticación, intente de nuevo.');
        }
    };

    return (
        <Container component="main" maxWidth="xl" sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100vh',
            width: '115%', 
            backgroundColor: '#5f6769', 
            padding: 0,
            margin: 0
        }}>
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center', 
                width: '100%', 
                maxWidth: '500px', 
                padding: 6, 
                backgroundColor: '#0c4e5f', 
                borderRadius: 3
            }}>
                <Typography variant="h4" align="center" sx={{ 
                    color: '#dfcdc3', 
                    marginBottom: 3, 
                    fontWeight: 'bold'
                }}>
                    ForumRSE
                </Typography>
                
                <Paper elevation={8} sx={{ 
                    padding: 6, 
                    backgroundColor: '#0c4e5f', 
                    borderRadius: 3, 
                    width: '100%', 
                    maxWidth: '400px', 
                    boxSizing: 'border-box'
                }}>
                    <Box component="form" onSubmit={submit} sx={{ 
                        display: 'flex', 
                        flexDirection: 'column' 
                    }}>
                        <Typography variant="h4" align="center" sx={{ 
                            color: '#dfcdc3', 
                            marginBottom: 3, 
                            fontWeight: 'bold'
                        }}>
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
                            sx={{ 
                                input: { color: '#202427' }, 
                                '& .MuiOutlinedInput-root': { 
                                    '& fieldset': { borderColor: '#202427' }, 
                                    '&:hover fieldset': { borderColor: '#8cb924' }
                                },
                                '& .MuiInputLabel-root': { color: '#dfcdc3' },
                                '& .MuiFormLabel-root.Mui-focused': { color: '#8cb924' }
                            }}
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
                            sx={{ 
                                input: { color: '#202427' }, 
                                '& .MuiOutlinedInput-root': { 
                                    '& fieldset': { borderColor: '#202427' }, 
                                    '&:hover fieldset': { borderColor: '#8cb924' }
                                },
                                '& .MuiInputLabel-root': { color: '#dfcdc3' },
                                '& .MuiFormLabel-root.Mui-focused': { color: '#8cb924' }
                            }}
                        />
                        {error && <Typography color="error" align="center" sx={{ marginTop: 2 }}>{error}</Typography>}
                        <Button type="submit" variant="contained" color="success" fullWidth sx={{ marginTop: 3 }}>
                            Ingresar
                        </Button>
                    </Box>
                    <Box sx={{ textAlign: 'center', marginTop: 3 }}>
                        <Typography variant="body2" sx={{ color: '#8cb924' }}>
                            <a href="/register" style={{ textDecoration: 'none', color: '#8cb924' }}>Registrarse</a>
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};