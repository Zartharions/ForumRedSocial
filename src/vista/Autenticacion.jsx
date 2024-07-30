import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

export const Auth = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const storedUser = JSON.parse(localStorage.getItem('usuario'));

        if (!storedUser) {
            setError('No hay usuarios registrados. Regístrate primero.');
            return;
        }

        if (username === storedUser.usuario && password === storedUser.contrasena) {
            setSuccess(true);
            setTimeout(() => navigate('/'), 2000); // Navegar a la página de inicio después de 2 segundos
        } else {
            setError('Usuario o contraseña incorrectos.');
        }
    };

    const handleClose = () => {
        setSuccess(false);
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
            margin: 0,
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
                maxWidth: '600px', 
                padding: 2, 
                backgroundColor: '#0c4e5f', 
                borderRadius: 4
            }}>
                <Typography variant="h4" align="center" sx={{ 
                    color: '#dfcdc3', 
                    marginBottom: 2, 
                    fontWeight: 'bold'
                }}>
                    AlumniUG
                </Typography>
                <Paper elevation={8} sx={{ 
                    padding: 6, 
                    backgroundColor: '#0c4e5f', 
                    borderRadius: 16, 
                    width: '100%', 
                    boxSizing: 'border-box'
                }}>
                    <Box component="form" onSubmit={handleSubmit} sx={{ 
                        display: 'flex', 
                        flexDirection: 'column' 
                    }}>
                        <TextField
                            label="Usuario"
                            variant="outlined"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            fullWidth
                            margin="normal"
                            sx={{input: { color: '#202427' }, 
                            '& .MuiOutlinedInput-root': { 
                                '& fieldset': { borderColor: '#202427' }, 
                                '&:hover fieldset': { borderColor: '#8cb924' } 
                            }, 
                            '& .MuiInputLabel-root': { color: '#dfcdc3' }, 
                            '& .MuiFormLabel-root.Mui-focused': { color: '#8cb924' } }}
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
                            sx={{input: { color: '#202427' }, 
                            '& .MuiOutlinedInput-root': { 
                                '& fieldset': { borderColor: '#202427' }, 
                                '&:hover fieldset': { borderColor: '#8cb924' } 
                            }, 
                            '& .MuiInputLabel-root': { color: '#dfcdc3' }, 
                            '& .MuiFormLabel-root.Mui-focused': { color: '#8cb924' } }}
                        />
                        {error && (
                            <Typography variant="body2" color="error" align="center" sx={{ marginTop: 2 }}>
                                {error}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ marginTop: 3 }}
                        >
                            Iniciar Sesión
                        </Button>
                        <Button
                            variant="contained"
                            color="success"
                            sx={{ marginTop: 2 }}
                            onClick={() => navigate('/register')}
                        >
                            Registrarse
                        </Button>
                    </Box>
                </Paper>
            </Box>
            <Dialog open={success} onClose={handleClose}>
                <DialogTitle>Inicio de Sesión Exitoso</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Has iniciado sesión exitosamente.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => navigate('/home')} color="primary">
                        Ir a Inicio
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};
