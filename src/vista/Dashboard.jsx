import React, { useState, useEffect } from 'react';
import { 
    AppBar, Toolbar, Typography, IconButton, InputBase, Menu, MenuItem, 
    Drawer, Box, Paper, CssBaseline, Container, TextField, Button, 
    Dialog, DialogActions, DialogContent, DialogTitle,
    Snackbar, Alert, List, ListItem, Divider
} from '@mui/material';
import { Search as SearchIcon, AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const MainScreen = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
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
    const [selectedGroup, setSelectedGroup] = useState(''); // Para almacenar el grupo seleccionado
    const [selectedGroupDescription, setSelectedGroupDescription] = useState('');
    const [joinGroupOpen, setJoinGroupOpen] = useState(false); // Controla la visibilidad de la ventana emergente para unirse al grupo
    const [posts, setPosts] = useState([]); // Nuevo estado para los posts
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const user = JSON.parse(localStorage.getItem('usuario'));
            if (user) {
                setUserName(user);
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

        const fetchPosts = async () => {
            const userId = JSON.parse(localStorage.getItem('userId'));
            if (userId) {
                try {
                    const response = await axios.get(`http://127.0.0.1:9002/forum/user_posts?id_usuario=${userId}`);
                    if (response.data.result) {
                        setPosts(response.data.data);
                    } else {
                        console.error('Error al obtener los posts:', response.data.message);
                    }
                } catch (error) {
                    console.error('Error en la solicitud:', error);
                }
            }
        };

        fetchUserData();
        fetchGroups();
        fetchPosts();
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

    const handleCreateGroupOpen = () => {
        setCreateGroupOpen(true);
    };

    const handleCreateGroupClose = () => {
        setCreateGroupOpen(false);
        setNewGroupName('');
        setNewGroupDescription('');
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

    const handleGroupClick = (group) => {
        localStorage.setItem('selectedGroup', JSON.stringify(group));
        navigate('/grupo');
    };
    
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
                    <Typography variant="body1" sx={{ marginRight: 2 }}>
                        {userName}
                    </Typography>
                    <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        onClick={handleMenu}
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => navigate('/perfil')}>Perfil</MenuItem>
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
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 10 }}
            >
                <Toolbar />
                
                <Box sx={{ mb: 2 }}>
                    <Typography variant="h6">Feed de Publicaciones</Typography>
                    <Divider sx={{ mb: 2 }} />
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <Box key={post.id_publicacion} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
                                <Typography variant="h6">{post.nombre_grupo}</Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>{post.descripcion_publicacion}</Typography>
                                <Typography variant="body2" color="textSecondary">Likes: {post.likes}</Typography>
                                <Typography variant="body2" color="textSecondary">Visibilidad: {post.visibilidad ? 'Pública' : 'Privada'}</Typography>
                            </Box>
                        ))
                    ) : (
                        <Typography variant="body2">No hay publicaciones</Typography>
                    )}
                </Box>
            </Box>
            <Dialog open={createGroupOpen} onClose={handleCreateGroupClose}>
                <DialogTitle>Crear Grupo</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nombre del grupo"
                        fullWidth
                        value={newGroupName}
                        onChange={(e) => setNewGroupName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Descripción"
                        fullWidth
                        multiline
                        rows={4}
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
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};
