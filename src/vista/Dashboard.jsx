import React, { useState, useEffect } from 'react';
import { 
    AppBar, Toolbar, Typography, IconButton, InputBase, Menu, MenuItem, Drawer, 
    List, ListItem, ListItemText, Box, Paper, CssBaseline, Container, Button, 
    TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle 
} from '@mui/material';
import { Search as SearchIcon, AccountCircle, MoreVert as MoreVertIcon, ThumbUp as ThumbUpIcon, Add as AddIcon, Comment as CommentIcon } from '@mui/icons-material';

export const MainScreen = ({ user, userGroups }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [postAnchorEl, setPostAnchorEl] = useState(null);
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
        setPostAnchorEl({ [id_publicacion]: event.currentTarget });
    };

    const handlePostMenuClose = (id_publicacion) => {
        setPostAnchorEl({ [id_publicacion]: null });
    };

    const handleCreateGroupOpen = () => {
        setCreateGroupOpen(true);
    };

    const handleCreateGroupClose = () => {
        setCreateGroupOpen(false);
        setNewGroupName('');
        setNewGroupDescription('');
    };

    const handleCreateGroup = () => {
        const newGroup = {
            id_grupo: groups.length + 1,
            nombre_grupo: newGroupName,
            descripcion: newGroupDescription
        };
        setGroups([...groups, newGroup]);
        handleCreateGroupClose();
    };

    const handleCommentClick = (postId) => {
        setSelectedPost(postId);
    };

    const handleAddComment = () => {
        if (newComment.trim()) {
            const postComments = comments[selectedPost] || [];
            setComments({
                ...comments,
                [selectedPost]: [...postComments, { usuario: user.usuario, comentario: newComment, fecha_hora: new Date() }]
            });
            setNewComment('');
        }
    };

    const handleLogout = () => {
        console.log('Logout');
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
                        {user.nombres}
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
                    [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box', marginTop: '64px' },
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
                                <AddIcon />
                                <ListItemText primary="Crear grupo" />
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
                    {posts.map((post) => (
                        <Paper key={post.id_publicacion} sx={{ padding: 2, marginBottom: 2, position: 'relative', maxWidth: 600, minHeight: 100 }}>
                            <IconButton
                                size="small"
                                sx={{ position: 'absolute', top: 8, right: 8 }}
                                onClick={(event) => handlePostMenu(event, post.id_publicacion)}
                            >
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                anchorEl={postAnchorEl ? postAnchorEl[post.id_publicacion] : null}
                                open={Boolean(postAnchorEl && postAnchorEl[post.id_publicacion])}
                                onClose={() => handlePostMenuClose(post.id_publicacion)}
                            >
                                <MenuItem onClick={() => handlePostMenuClose(post.id_publicacion)}>Editar</MenuItem>
                                <MenuItem onClick={() => handlePostMenuClose(post.id_publicacion)}>Eliminar</MenuItem>
                            </Menu>
                            <Typography variant="body2" color="textSecondary">
                                {post.grupo} - {post.usuario}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                {post.descripcion}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton size="small">
                                    <ThumbUpIcon />
                                </IconButton>
                                <Typography variant="body2">{post.likes}</Typography>
                                <IconButton size="small" onClick={() => handleCommentClick(post.id_publicacion)}>
                                    <CommentIcon />
                                </IconButton>
                            </Box>
                            {selectedPost === post.id_publicacion && (
                                <Box sx={{ marginTop: 2 }}>
                                    {(comments[post.id_publicacion] || []).map((comment, index) => (
                                        <Paper key={index} sx={{ padding: 1, marginBottom: 1 }}>
                                            <Typography variant="body2" color="textSecondary">
                                                {comment.usuario}
                                            </Typography>
                                            <Typography variant="body1">{comment.comentario}</Typography>
                                        </Paper>
                                    ))}
                                    <Box sx={{ display: 'flex', marginTop: 1 }}>
                                        <TextField
                                            fullWidth
                                            placeholder="Añadir comentario..."
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                            size="small"
                                            variant="outlined"
                                        />
                                        <Button onClick={handleAddComment} variant="contained" sx={{ marginLeft: 1 }}>
                                            Comentar
                                        </Button>
                                    </Box>
                                </Box>
                            )}
                        </Paper>
                    ))}
                </Container>
            </Box>
            <Dialog open={createGroupOpen} onClose={handleCreateGroupClose}>
                <DialogTitle>Crear Grupo</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Por favor, introduce el nombre y la descripción del nuevo grupo.
                    </DialogContentText>
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
                    <Button onClick={handleCreateGroup} variant="contained">Crear</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default MainScreen;
