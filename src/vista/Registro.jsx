import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid } from '@mui/material';

export const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [university, setUniversity] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        const body = {
            first_name: firstName,
            last_name: lastName,
            username,
            university,
            email,
            phone,
            password
        };

        try {
            const response = await axios.post('http://127.0.0.1:9002/segu/register', body);
            if (response.data.result) {
                setSuccess(true);
                navigate('/login'); // Redirect to login after registration
            } else {
                setError('Error en el registro, intente de nuevo.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Error en el registro, intente de nuevo.');
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
            margin: 0
        }}>
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center', 
                width: '100%', 
                maxWidth: '650px', 
                padding: 2, 
                backgroundColor: '#0c4e5f', 
                borderRadius: 4
            }}>
                <Typography variant="h4" align="center" sx={{ 
                    color: '#dfcdc3', 
                    marginBottom: 1, 
                    fontWeight: 'bold'
                }}>
                    ForumRSE
                </Typography>
                <Paper elevation={8} sx={{ 
                    padding: 6, 
                    backgroundColor: '#0c4e5f', 
                    borderRadius: 16, 
                    width: '100%', 
                    maxWidth: '600px', 
                    boxSizing: 'border-box'
                }}>
                    <Box component="form" onSubmit={submit} sx={{ 
                        display: 'flex', 
                        flexDirection: 'column' 
                    }}>
                        <Grid container spacing={0.5}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Nombres"
                                    variant="outlined"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
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
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Apellidos"
                                    variant="outlined"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
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
                            </Grid>
                            <Grid item xs={12} sm={6}>
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
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Universidad"
                                    variant="outlined"
                                    value={university}
                                    onChange={(e) => setUniversity(e.target.value)}
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
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Correo electrónico"
                                    variant="outlined"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Teléfono"
                                    variant="outlined"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
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
                            </Grid>
                            <Grid item xs={12} sm={6}>
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
                            </Grid>
                        </Grid>
                        {error && <Typography color="error" align="center" sx={{ marginTop: 2 }}>{error}</Typography>}
                        <Button type="submit" variant="contained" color="success" fullWidth sx={{ marginTop: 3 }}>
                            Registrarse
                        </Button>
                        <Button variant="contained" color="primary" fullWidth sx={{ marginTop: 3 }} onClick={() => navigate('/')}>
                        Iniciar Sesión
                        </Button>
                    </Box>
                </Paper>
            </Box>
            <Dialog open={success} onClose={handleClose}>
                <DialogTitle>Registro Correcto</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Su registro se ha realizado con éxito.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cerrar</Button>
                </DialogActions>
            </Dialog>
        </Container>
        
    );
};
