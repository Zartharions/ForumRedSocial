import React, { useState, useEffect } from 'react';
import { 
    AppBar, Toolbar, Typography, IconButton, InputBase, Menu, MenuItem, Drawer, 
    List, ListItem, ListItemText, Box, Paper, CssBaseline, Button, 
    TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle 
} from '@mui/material';
import { Search as SearchIcon, AccountCircle, MoreVert as MoreVertIcon, ThumbUp as ThumbUpIcon, Comment as CommentIcon } from '@mui/icons-material';
import axios from 'axios'; 

export const MainScreen = ({ user, userGroups }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [postAnchorEl, setPostAnchorEl] = useState({});
    const [createGroupOpen, setCreateGroupOpen] = useState(false);
    const [newGroupName, setNewGroupName] = useState('');
    const [newGroupDescription, setNewGroupDescription] = useState('');
    const [comments, setComments] = useState({});
    const [newComment, setNewComment] = useState('');
    const [selectedPost, setSelectedPost] = useState(null);
    
    const [groups, setGroups] = useState(userGroups || []);
    const [posts, setPosts] = useState([
        { id_publicacion: 1, id_grupo: 1, grupo: 'Grupo 1', usuario: 'Usuario 1', descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.', likes: 10, fecha_hora: new Date() },
        { id_publicacion: 2, id_grupo: 2, grupo: 'Grupo 2', usuario: 'Usuario 2', descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.', likes: 5, fecha_hora: new Date() },
        { id_publicacion: 3, id_grupo: 3, grupo: 'Grupo 3', usuario: 'Usuario 3', descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.', likes: 8, fecha_hora: new Date() }
    ]);

    useEffect(() => {
        setGroups(userGroups || []);
    }, [userGroups]);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handlePostMenu = (event, id_publicacion) => {
        setPostAnchorEl(prevState => ({ ...prevState, [id_publicacion]: event.currentTarget }));
    };

    const handlePostMenuClose = (id_publicacion) => {
        setPostAnchorEl(prevState => ({ ...prevState, [id_publicacion]: null }));
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
            const id_usuario = localStorage.getItem('id_usuario');  
            if (!id_usuario) {
                console.error('ID de usuario no encontrado');
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
            } else {
                console.error('Error al crear el grupo:', response.data.message);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    const handleCommentClick = (postId) => {
        setSelectedPost(postId);
    };

    const handleAddComment = () => {
        if (newComment.trim() && selectedPost !== null) {
            const postComments = comments[selectedPost] || [];
            const newCommentObj = {
                usuario: user ? user : 'Desconocido',
                comentario: newComment,
                fecha_hora: new Date().toISOString()
            };
            setComments({
                ...comments,
                [selectedPost]: [...postComments, newCommentObj]
            });
            setNewComment('');
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredPosts = posts.filter(post =>
        post.descripcion.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />


            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
                        ForumRSE
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6" sx={{ marginRight: 2 }}>
                            {user ? user : 'Invitado'}
                        </Typography>
                        <IconButton color="inherit">
                            <AccountCircle />
                        </IconButton>
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={handleMenu}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Perfil</MenuItem>
                            <MenuItem onClick={() => { /* lógica para cerrar sesión */ }}>Cerrar sesión</MenuItem>
                        </Menu>
                    </Box>
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
                    },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                    {groups.length > 0 ? (
                            groups.map((group) => (
                                <ListItem button key={group.id_grupo}>
                                    <ListItemText primary={group.nombre_grupo} />
                                </ListItem>
                            ))
                        ) : (
                            <ListItem button onClick={handleCreateGroupOpen}>
                                <ListItemText primary="Crear grupo" />
                            </ListItem>
                        )}
                    </List>
                </Box>
            </Drawer>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: 'background.default',
                    p: 3,
                    ml: 30,
                }}
            >
                <Toolbar />


                <Paper component="form" sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Buscar publicaciones"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <IconButton type="submit" sx={{ p: '10px' }}>
                        <SearchIcon />
                    </IconButton>
                </Paper>

              
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <Box key={post.id_publicacion} sx={{ mb: 3, border: '1px solid #ddd', borderRadius: '4px', p: 2 }}>
                            <Typography variant="h6">{post.grupo}</Typography>
                            <Typography variant="subtitle2" color="textSecondary">{post.usuario}</Typography>
                            <Typography variant="body1">{post.descripcion}</Typography>
                            <Typography variant="caption" color="textSecondary">Publicado en {new Date(post.fecha_hora).toLocaleString()}</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                <IconButton onClick={(event) => handlePostMenu(event, post.id_publicacion)}>
                                    <ThumbUpIcon />
                                </IconButton>
                                <Typography variant="body2">{post.likes}</Typography>
                                <IconButton onClick={() => handleCommentClick(post.id_publicacion)}>
                                    <CommentIcon />
                                </IconButton>
                            </Box>

                        
                            <Menu
                                anchorEl={postAnchorEl[post.id_publicacion]}
                                open={Boolean(postAnchorEl[post.id_publicacion])}
                                onClose={() => handlePostMenuClose(post.id_publicacion)}
                            >
                                <MenuItem onClick={() => handlePostMenuClose(post.id_publicacion)}>Reportar</MenuItem>
                                <MenuItem onClick={() => handlePostMenuClose(post.id_publicacion)}>Compartir</MenuItem>
                            </Menu>

                            {/* Comentarios */}
                            {selectedPost === post.id_publicacion && (
                                <Box>
                                    <TextField
                                        fullWidth
                                        label="Nuevo comentario"
                                        variant="outlined"
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        sx={{ mb: 2 }}
                                    />
                                    <Button variant="contained" onClick={handleAddComment}>Añadir comentario</Button>
                                    {comments[post.id_publicacion] && comments[post.id_publicacion].map((comment, index) => (
                                        <Box key={index} sx={{ mt: 2, borderBottom: '1px solid #ddd', pb: 1 }}>
                                            <Typography variant="body2" color="textSecondary">{comment.usuario}: {comment.comentario}</Typography>
                                            <Typography variant="caption" color="textSecondary">{new Date(comment.fecha_hora).toLocaleString()}</Typography>
                                        </Box>
                                    ))}
                                </Box>
                            )}
                        </Box>
                    ))
                ) : (
                    <Typography variant="body1">No hay publicaciones</Typography>
                )}

                {/* Crear grupo */}
                <Dialog open={createGroupOpen} onClose={handleCreateGroupClose}>
                    <DialogTitle>Crear nuevo grupo</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Ingresa el nombre y la descripción del nuevo grupo.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Nombre del grupo"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={newGroupName}
                            onChange={(e) => setNewGroupName(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            id="description"
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
            </Box>
        </Box>
    );
};
