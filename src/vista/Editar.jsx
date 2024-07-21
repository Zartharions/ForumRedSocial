import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase, Menu, MenuItem, Drawer, List, ListItem, ListItemText, Box, Paper, CssBaseline, Container, TextField, Button } from '@mui/material';
import { Search as SearchIcon, AccountCircle, MoreVert as MoreVertIcon } from '@mui/icons-material';

export const EditUserScreen = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // State for user details
    const [userDetails, setUserDetails] = useState({
        usuario: 'Usuario 1',
        celular: '1234567890',
        clave: '',
        universidad: 'Universidad XYZ',
    });

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        console.log('Logout');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({
            ...userDetails,
            [name]: value
        });
    };

    const handleSave = () => {
        console.log('Guardar cambios', userDetails);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
                        FORUMRS
                    </Typography>
                    <Box sx={{ flexGrow: 2, display: 'flex', justifyContent: 'left' }}>
                        <InputBase
                            placeholder="Buscar..."
                            inputProps={{ 'aria-label': 'search' }}
                            sx={{
                                color: 'inherit',
                                '& .MuiInputBase-input': {
                                    padding: '9px',
                                    borderRadius: '4px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.25)' },
                                },
                            }}
                            startAdornment={<SearchIcon sx={{ marginRight: '8px' }} />}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </Box>
                    <Typography variant="body1" sx={{ marginRight: 2 }}>
                        NombreUsuario
                    </Typography>
                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        keepMounted
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Configuración</MenuItem>
                        <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: 240,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box', marginTop: '64px' }, // Ajuste para que el menú esté debajo de la barra superior
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        <ListItem button>
                            <ListItemText primary="Grupo 1" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Grupo 2" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Grupo 3" />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <Toolbar />
                <Container>
                    <Paper sx={{ padding: 3, marginBottom: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Editar Usuario
                        </Typography>
                        <TextField
                            label="Usuario"
                            variant="outlined"
                            name="usuario"
                            value={userDetails.usuario}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Celular"
                            variant="outlined"
                            name="celular"
                            value={userDetails.celular}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Clave"
                            type="password"
                            variant="outlined"
                            name="clave"
                            value={userDetails.clave}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Universidad"
                            variant="outlined"
                            name="universidad"
                            value={userDetails.universidad}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <Box sx={{ textAlign: 'right', marginTop: 2 }}>
                            <Button variant="contained" color="primary" onClick={handleSave}>
                                Guardar cambios
                            </Button>
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </Box>
    );
};
