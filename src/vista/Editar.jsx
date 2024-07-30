import React, { useState, useEffect } from 'react';
import { 
    AppBar, Toolbar, Typography, IconButton, InputBase, Menu, MenuItem, 
    Drawer, Box, Paper, CssBaseline, Container, TextField, Button, 
    Dialog, DialogActions, DialogContent, DialogTitle,
    Snackbar, Alert, List, ListItem
} from '@mui/material';
import { Search as SearchIcon, AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const EditUserScreen = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [userDetails, setUserDetails] = useState({
        usuario: '',
        celular: '',
        claveNueva: '',
        claveActual: '',
        universidad: '',
    });
    const [groups, setGroups] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [createGroupOpen, setCreateGroupOpen] = useState(false);
    const [newGroupName, setNewGroupName] = useState('');
    const [newGroupDescription, setNewGroupDescription] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [showSearchResults, setShowSearchResults] = useState(false); // Controla la visibilidad de los resultados de búsqueda
    const [userName, setUserName] = useState(''); // Para almacenar el nombre del usuario
    const [selectedGroupDescription, setSelectedGroupDescription] = useState('');
    const [joinGroupOpen, setJoinGroupOpen] = useState(false); // Controla la visibilidad de la ventana
    const [selectedGroup, setSelectedGroup] = useState(''); // Para almacenar el grupo seleccionado
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                setUserDetails(prev => ({
                    ...prev,
                    usuario: user.usuario || '',
                    celular: user.celular || '',
                    universidad: user.universidad || ''
                }));
            } else {
                navigate('/login');
            }
        };

        const fetchGroups = async () => {
            const userId = JSON.parse(localStorage.getItem('userId'));
            if (userId) {
                try {
                    const response = await axios.get(`http://127.0.0.1:9002/grupo/list?id_usuario=${userId}`);
                    if (response.data.result) {
                        setGroups(response.data.data);
                    } else {
                        console.error('Error al obtener los grupos:', response.data.message);
                    }
                } catch (error) {
                    console.error('Error en la solicitud:', error);
                }
            }
        };

        fetchUserData();
        fetchGroups();
    }, [navigate]);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('userGroups');
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({
            ...userDetails,
            [name]: value
        });
    };

    const handleSearchChange = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.length > 0) {
            try {
                const response = await axios.get('http://127.0.0.1:9002/forum/grupos');
                if (response.data.result) {
                    const filteredResults = response.data.data.filter(group => 
                        group.nombre_grupo.toLowerCase().includes(query.toLowerCase())
                    );
                    setSearchResults(filteredResults);
                    setShowSearchResults(true);
                } else {
                    console.error('Error al obtener los grupos:', response.data.message);
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
            }
        } else {
            setSearchResults([]);
            setShowSearchResults(false);
        }
    };

    const handleUpdateUser = async () => {
        const id_usuario = JSON.parse(localStorage.getItem('userId'));
        if (!id_usuario) {
            console.error('ID de usuario no encontrado');
            setSnackbarMessage('ID de usuario no encontrado');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        try {
            const response = await axios.put('http://127.0.0.1:9002/forum/update', {
                id_usuario,
                usuario: userDetails.usuario || undefined,
                universidad: userDetails.universidad || undefined,
                contrasena_actual: userDetails.claveActual,
                nueva_contrasena: userDetails.claveNueva || undefined,
            });

            if (response.data.result) {
                setSnackbarMessage('Información actualizada correctamente');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
                const updatedUser = response.data.data;
                localStorage.setItem('user', JSON.stringify(updatedUser));
            } else {
                console.error('Error al actualizar la información:', response.data.message);
                setSnackbarMessage(response.data.message);
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            setSnackbarMessage('Error en la solicitud');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    const handleSave = () => {
        if (userDetails.claveActual === '' || userDetails.claveNueva === '') {
            setSnackbarMessage('Por favor ingrese todos los campos requeridos.');
            setSnackbarSeverity('warning');
            setSnackbarOpen(true);
            return;
        }
        handleUpdateUser();
    };

    const handleCreateGroupOpen = () => {
        setCreateGroupOpen(true);
    };

    const handleCreateGroupClose = () => {
        setCreateGroupOpen(false);
        setNewGroupName('');
        setNewGroupDescription('');
    };

    const handleGroupSelect = (group) => {
        setSelectedGroup(group.nombre_grupo);
        setSelectedGroupDescription(group.descripcion);
        setJoinGroupOpen(true);
    };

    const handleJoinGroupClose = () => {
        setJoinGroupOpen(false);
        setSelectedGroup('');
        setSelectedGroupDescription('');
    };

    const handleCreateGroup = async () => {
        try {
            const id_usuario = JSON.parse(localStorage.getItem('userId'));  
            if (!id_usuario) {
                console.error('ID de usuario no encontrado');
                setSnackbarMessage('ID de usuario no encontrado');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
                return;
            }

            const response = await axios.post('http://127.0.0.1:9002/forum/create', {
                nombre_grupo: newGroupName,
                descripcion: newGroupDescription,
                id_usuario
            });

            if (response.data.result) {
                const newGroup = {
                    id_grupo: response.data.data,   
                    nombre_grupo: newGroupName,
                    descripcion: newGroupDescription
                };
                setGroups([...groups, newGroup]);
                handleCreateGroupClose();
                setSnackbarMessage('Grupo creado correctamente');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
            } else {
                console.error('Error al crear el grupo:', response.data.message);
                setSnackbarMessage(response.data.message);
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            setSnackbarMessage('Error en la solicitud');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    const handleJoinGroup = async () => {
        try {
            const id_usuario = JSON.parse(localStorage.getItem('userId'));
            if (!id_usuario) {
                console.error('ID de usuario no encontrado');
                setSnackbarMessage('ID de usuario no encontrado');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
                return;
            }

            const response = await axios.post('http://127.0.0.1:9002/forum/join', {
                id_usuario,
                nombre_grupo: selectedGroup
            });

            if (response.data.result) {
                setSnackbarMessage('Unido al grupo correctamente');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
                handleJoinGroupClose();
            } else {
                setSnackbarMessage(response.data.message);
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error('Ya perteneces a este grupo:', error);
            setSnackbarMessage('Ya perteneces a este grupo');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    

    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed">
                <Toolbar>
                    <Typography 
                        variant="h6" 
                        noWrap 
                        sx={{ flexGrow: 1 }}
                        component="a" 
                        onClick={() => navigate('/')} 
                        style={{ cursor: 'pointer' }}
                    >
                        AlumniUG
                    </Typography>
                    <Box sx={{ flexGrow: 2, display: 'flex', justifyContent: 'left' }}>
                        <Box sx={{ position: 'relative' }}>
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
                                onChange={handleSearchChange}
                            />
                            {showSearchResults && (
                                <Box sx={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    right: 0,
                                    backgroundColor: 'background.paper',
                                    boxShadow: 3,
                                    zIndex: 10,
                                    maxHeight: '200px',
                                    overflowY: 'auto'
                                }}>
                                    <List>
                                        {searchResults.length > 0 ? (
                                            searchResults.map((result, index) => (
                                                <ListItem key={index} sx={{ mb: 1 }}>
                                                    <Button
                                                        variant="outlined"
                                                        fullWidth
                                                        sx={{ textAlign: 'left', justifyContent: 'flex-start' }}
                                                        onClick={() => handleGroupSelect(result)}
                                                    >
                                                        {result.nombre_grupo}
                                                    </Button>
                                                </ListItem>
                                            ))
                                        ) : (
                                            <ListItem>
                                                <Typography variant="body2">No se encontraron resultados</Typography>
                                            </ListItem>
                                        )}
                                    </List>
                                </Box>
                            )}
                        </Box>
                    </Box>
                    <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        onClick={handleMenu}
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
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
                        <MenuItem onClick={() => { handleClose(); navigate('/'); }}>Inicio</MenuItem>
                        <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: 240,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 240,
                        boxSizing: 'border-box',
                        top: 64, // Ajustar para que quede debajo de la AppBar
                    },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto', p: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCreateGroupOpen}
                        sx={{ mb: 2, width: '100%' }}
                    >
                        Crear Grupo
                    </Button>
                    <List>
                        {groups.length > 0 ? (
                            groups.map((group) => (
                                <ListItem button key={group.id_grupo} onClick={() => handleGroupClick(group)}>
                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        sx={{ textAlign: 'left', justifyContent: 'flex-start' }}
                                    >
                                        {group.nombre_grupo}
                                    </Button>
                                </ListItem>
                            ))
                        ) : (
                            <ListItem>
                                <Typography variant="body2">No hay grupos</Typography>
                            </ListItem>
                        )}
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
                            label="Clave nueva"
                            type="password"
                            variant="outlined"
                            name="claveNueva"
                            value={userDetails.claveNueva}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Facultad"
                            variant="outlined"
                            name="Facultad"
                            value={userDetails.universidad}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Ingresar clave actual"
                            type="password"
                            variant="outlined"
                            name="claveActual"
                            value={userDetails.claveActual}
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

                <Dialog open={createGroupOpen} onClose={handleCreateGroupClose}>
                    <DialogTitle>Crear nuevo grupo</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Nombre del grupo"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={newGroupName}
                            onChange={(e) => setNewGroupName(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Descripción"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={newGroupDescription}
                            onChange={(e) => setNewGroupDescription(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCreateGroupClose}>Cancelar</Button>
                        <Button onClick={handleCreateGroup}>Crear</Button>
                    </DialogActions>
                </Dialog>
                    <Dialog open={joinGroupOpen} onClose={handleJoinGroupClose}>
                    <DialogTitle>{`Unirse al grupo ${selectedGroup}`}</DialogTitle>
                    <DialogContent>
                        <Typography variant="body1">
                            {selectedGroupDescription}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleJoinGroupClose}>Cancelar</Button>
                        <Button onClick={handleJoinGroup}>Unirse</Button>
                    </DialogActions>
                </Dialog>

                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={() => setSnackbarOpen(false)}
                    message={snackbarMessage}
                    action={
                        <Button color="inherit" onClick={() => setSnackbarOpen(false)}>
                            Cerrar
                        </Button>
                    }
                >
                    <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    );
};
