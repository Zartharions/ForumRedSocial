import React, { useState, useEffect } from 'react';
import { 
    AppBar, Toolbar, Typography, IconButton, InputBase, Menu, MenuItem, Drawer, 
    List, ListItem, ListItemText, Box, Paper, CssBaseline, Container, Button, 
    TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle 
} from '@mui/material';
import { Search as SearchIcon, AccountCircle, MoreVert as MoreVertIcon, ThumbUp as ThumbUpIcon, Add as AddIcon, Comment as CommentIcon } from '@mui/icons-material';

export const MainScreen = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [postAnchorEl, setPostAnchorEl] = useState(null);
    const [createGroupOpen, setCreateGroupOpen] = useState(false);
    const [newGroupName, setNewGroupName] = useState('');
    const [newGroupDescription, setNewGroupDescription] = useState('');
    const [comments, setComments] = useState({});
    const [newComment, setNewComment] = useState('');
    const [selectedPost, setSelectedPost] = useState(null);
    
    const [user, setUser] = useState(null);
    const [groups, setGroups] = useState([]);
    const [posts, setPosts] = useState([
        { id_publicacion: 1, id_grupo: 1, grupo: 'Grupo 1', usuario: 'Usuario 1', descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.', likes: 10, fecha_hora: new Date() },
        { id_publicacion: 2, id_grupo: 2, grupo: 'Grupo 2', usuario: 'Usuario 2', descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.', likes: 5, fecha_hora: new Date() },
        { id_publicacion: 3, id_grupo: 3, grupo: 'Grupo 3', usuario: 'Usuario 3', descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.', likes: 8, fecha_hora: new Date() }
    ]);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
            setGroups(storedUser.grupos);
        }
    }, []);

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
        if (selectedPost && newComment) {
            setComments({
                ...comments,
                [selectedPost]: [...(comments[selectedPost] || []), newComment]
            });
            setNewComment('');
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        ForumRSE
                    </Typography>
                    <IconButton
                        size="large"
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
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Perfil</MenuItem>
                        <MenuItem onClick={handleClose}>Cerrar sesión</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: 240,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 240,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
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
                                <ListItemText primary="Crear Grupo" />
                            </ListItem>
                        )}
                    </List>
                </Box>
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.paper', p: 3 }}
            >
                <Toolbar />
                <Typography variant="h4" gutterBottom>
                    Bienvenido, {user ? user.usuario : 'Invitado'}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Publicaciones
                </Typography>
                <Paper sx={{ padding: 2, marginBottom: 2 }}>
                    {posts.map((post) => (
                        <Box key={post.id_publicacion} sx={{ marginBottom: 2 }}>
                            <Typography variant="body1">{post.descripcion}</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton color="primary">
                                    <ThumbUpIcon />
                                </IconButton>
                                <Typography variant="body2">{post.likes} Likes</Typography>
                                <IconButton
                                    color="primary"
                                    onClick={(e) => handlePostMenu(e, post.id_publicacion)}
                                >
                                    <CommentIcon />
                                </IconButton>
                                <Typography variant="body2">Comments</Typography>
                            </Box>
                            <Menu
                                anchorEl={postAnchorEl?.[post.id_publicacion]}
                                open={Boolean(postAnchorEl?.[post.id_publicacion])}
                                onClose={() => handlePostMenuClose(post.id_publicacion)}
                            >
                                <MenuItem onClick={() => handleCommentClick(post.id_publicacion)}>Add Comment</MenuItem>
                            </Menu>
                            {selectedPost === post.id_publicacion && (
                                <Box sx={{ marginTop: 2 }}>
                                    <TextField
                                        label="New Comment"
                                        variant="outlined"
                                        fullWidth
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                    />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleAddComment}
                                        sx={{ marginTop: 1 }}
                                    >
                                        Add Comment
                                    </Button>
                                    {comments[post.id_publicacion] && (
                                        <Box sx={{ marginTop: 2 }}>
                                            {comments[post.id_publicacion].map((comment, index) => (
                                                <Typography key={index} variant="body2">
                                                    {comment}
                                                </Typography>
                                            ))}
                                        </Box>
                                    )}
                                </Box>
                            )}
                        </Box>
                    ))}
                </Paper>
                <Dialog open={createGroupOpen} onClose={handleCreateGroupClose}>
                    <DialogTitle>Crear Grupo</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Por favor, ingrese el nombre y la descripción del nuevo grupo.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Nombre del Grupo"
                            type="text"
                            fullWidth
                            value={newGroupName}
                            onChange={(e) => setNewGroupName(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Descripción"
                            type="text"
                            fullWidth
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
