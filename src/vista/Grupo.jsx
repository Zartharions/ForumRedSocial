import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Paper,
  CssBaseline,
  Container,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { Search as SearchIcon, AccountCircle, MoreVert as MoreVertIcon, ThumbUp as ThumbUpIcon, Add as AddIcon, Comment as CommentIcon } from '@mui/icons-material';

export const GroupViewScreen = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [postAnchorEl, setPostAnchorEl] = useState(null);
  const [newPost, setNewPost] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groups, setGroups] = useState([
    { id_grupo: 1, nombre_grupo: 'Grupo 1' },
    { id_grupo: 2, nombre_grupo: 'Grupo 2' },
    { id_grupo: 3, nombre_grupo: 'Grupo 3' }
  ]);
  const [posts, setPosts] = useState([
    { id_publicacion: 1, id_grupo: 1, grupo: 'Grupo Seleccionado', usuario: 'Usuario 1', descripcion: 'Post 1 en Grupo Seleccionado', likes: 10, fecha_hora: new Date() },
    { id_publicacion: 2, id_grupo: 1, grupo: 'Grupo Seleccionado', usuario: 'Usuario 2', descripcion: 'Post 2 en Grupo Seleccionado', likes: 5, fecha_hora: new Date() }
  ]);
  const [createGroupOpen, setCreateGroupOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);

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

  const handlePostLike = (id_publicacion) => {
    console.log(`Like post ${id_publicacion}`);
  };

  const handlePublish = () => {
    if (newPost.trim()) {
      const newPostEntry = {
        id_publicacion: posts.length + 1,
        id_grupo: selectedGroup ? selectedGroup.id_grupo : 1,
        grupo: selectedGroup ? selectedGroup.nombre_grupo : 'Grupo Seleccionado',
        usuario: 'Usuario Actual',
        descripcion: newPost,
        likes: 0,
        fecha_hora: new Date()
      };
      setPosts([...posts, newPostEntry]);
      setNewPost('');
    }
  };

  const handleLogout = () => {
    console.log('Logout');
  };

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
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
        [selectedPost]: [...postComments, { usuario: 'Usuario Actual', comentario: newComment, fecha_hora: new Date() }]
      });
      setNewComment('');
    }
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
            {groups.map((group) => (
              <ListItem button key={group.id_grupo} onClick={() => handleGroupClick(group)}>
                <ListItemText primary={group.nombre_grupo} />
              </ListItem>
            ))}
            <ListItem button onClick={handleCreateGroupOpen}>
              <AddIcon />
              <ListItemText primary="Crear grupo" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, marginTop: '64px' }} // Ajuste para que el contenido esté debajo de la barra superior
      >
        <Container>
          <Paper sx={{ padding: 2, marginBottom: 2 }}>
            <Typography variant="h6">Publicar un nuevo post</Typography>
            <TextField
              multiline
              rows={3}
              fullWidth
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              variant="outlined"
              placeholder="Escribe tu post aquí..."
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
              onClick={handlePublish}
            >
              Publicar
            </Button>
          </Paper>

          {posts.filter(post => post.id_grupo === (selectedGroup ? selectedGroup.id_grupo : 1)).map((post) => (
            <Paper key={post.id_publicacion} sx={{ padding: 2, marginBottom: 2, position: 'relative', maxWidth: 900, width: 700 }}>
              <IconButton
                size="small"
                sx={{ position: 'absolute', top: 8, right: 8 }}
                onClick={(event) => handlePostMenu(event, post.id_publicacion)}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={postAnchorEl && postAnchorEl[post.id_publicacion]}
                open={Boolean(postAnchorEl && postAnchorEl[post.id_publicacion])}
                onClose={() => handlePostMenuClose(post.id_publicacion)}
              >
                <MenuItem onClick={() => console.log(`Reportar post ${post.id_publicacion}`)}>Reportar</MenuItem>
              </Menu>
              <Typography variant="subtitle2">{post.grupo} &gt; {post.usuario}</Typography>
              <Typography variant="body2" color="textSecondary">
                {new Date(post.fecha_hora).toLocaleString()}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: 1, marginBottom: 1 }}>
                {post.descripcion}
              </Typography>
              <Button startIcon={<ThumbUpIcon />} onClick={() => handlePostLike(post.id_publicacion)}>
                {post.likes} Like{post.likes !== 1 && 's'}
              </Button>
              <Button startIcon={<CommentIcon />} onClick={() => handleCommentClick(post.id_publicacion)}>
                Comentarios
              </Button>

              {selectedPost === post.id_publicacion && (
                <Box sx={{ marginTop: 2 }}>
                  <TextField
                    multiline
                    rows={2}
                    fullWidth
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    variant="outlined"
                    placeholder="Escribe tu comentario aquí..."
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 1 }}
                    onClick={handleAddComment}
                  >
                    Comentar
                  </Button>
                  <Box sx={{ marginTop: 2 }}>
                    {comments[post.id_publicacion] && comments[post.id_publicacion].map((comment, index) => (
                      <Paper key={index} sx={{ padding: 1, marginBottom: 1 }}>
                        <Typography variant="subtitle2">{comment.usuario}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {new Date(comment.fecha_hora).toLocaleString()}
                        </Typography>
                        <Typography variant="body1" sx={{ marginTop: 1 }}>
                          {comment.comentario}
                        </Typography>
                      </Paper>
                    ))}
                  </Box>
                </Box>
              )}
            </Paper>
          ))}
        </Container>
      </Box>

      <Dialog open={createGroupOpen} onClose={handleCreateGroupClose}>
        <DialogTitle>Crear nuevo grupo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Introduce el nombre y la descripción del nuevo grupo.
          </DialogContentText>
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
          <Button onClick={handleCreateGroupClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleCreateGroup} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
