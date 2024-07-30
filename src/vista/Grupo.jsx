import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, InputBase, Menu, MenuItem, Drawer, List, ListItem, ListItemText, Box, Paper, CssBaseline, Container, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress, Snackbar, Alert
} from '@mui/material';
import { Search as SearchIcon, AccountCircle, Add as AddIcon, ThumbUp as ThumbUpIcon, Comment as CommentIcon, Report as ReportIcon } from '@mui/icons-material'; // Asegúrate de que ReportIcon esté aquí
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const GroupViewScreen = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [postAnchorEl, setPostAnchorEl] = useState({});
  const [newPost, setNewPost] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groups, setGroups] = useState([]);
  const [posts, setPosts] = useState([]);
  const [createGroupOpen, setCreateGroupOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [userName, setUserName] = useState(''); // Para almacenar el nombre del usuario
  const [selectedGroupDescription, setSelectedGroupDescription] = useState('');
  const [joinGroupOpen, setJoinGroupOpen] = useState(false); // Controla la visibilidad de la ventana
  const [showSearchResults, setShowSearchResults] = useState(false); // Controla la visibilidad de los resultados de búsqueda
  const [searchResults, setSearchResults] = useState([]);
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
  
    fetchUserData();
    fetchGroups();
  }, [navigate]);
  
  
  const fetchPosts = async (groupId) => {
    if (!groupId) {
      console.error('El ID del grupo no está definido');
      return;
    }
    try {
      const response = await axios.get(`http://127.0.0.1:9002/forum/post?id_grupo=${groupId}`);
      if (response.data.result) {
        setPosts(response.data.data);
      } else {
        console.error('Error al obtener los posts:', response.data.message);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };
  
  useEffect(() => {
    if (selectedGroup) {
      console.log("Selected Group:", selectedGroup); // Agrega esta línea
      fetchPosts(selectedGroup.id_grupo);
    }
  }, [selectedGroup]);

const fetchGroupPosts = async (groupId) => {
  try {
    const response = await axios.get(`http://127.0.0.1:9002/forum/post?id_grupo=${groupId}`);
    if (response.data.result) {
      setPosts(response.data.data);
    } else {
      console.error('Error al obtener las publicaciones:', response.data.message);
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
};

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
        ...userDetails,
        [name]: value
    });
};

const handleLogout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('userGroups');
  localStorage.removeItem('userId');
  localStorage.removeItem('token');
  navigate('/login');
}

const handleCreateGroupSubmit = async () => {
  if (!newGroupName || !newGroupDescription) {
    setSnackbarMessage('Por favor, completa todos los campos');
    setSnackbarSeverity('warning');
    setSnackbarOpen(true);
    return;
  }

  try {
    const response = await fetch('http://127.0.0.1:9002/forum/grupo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre_grupo: newGroupName,
        descripcion: newGroupDescription,
        id_usuario: JSON.parse(localStorage.getItem('userId')),
      }),
    });

    const data = await response.json();

    if (data.result) {
      setSnackbarMessage('Grupo creado exitosamente');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setGroups((prevGroups) => [...prevGroups, {
        id_grupo: data.data.id_grupo,
        nombre_grupo: newGroupName,
        descripcion: newGroupDescription,
      }]);
      handleCreateGroupClose();
    } else {
      setSnackbarMessage(data.message || 'Error al crear el grupo');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  } catch (error) {
    console.error('Error al crear el grupo:', error);
    setSnackbarMessage('Error al crear el grupo');
    setSnackbarSeverity('error');
    setSnackbarOpen(true);
  }
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

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePostMenu = (event, id_publicacion) => {
    setPostAnchorEl(prev => ({ ...prev, [id_publicacion]: event.currentTarget }));
  };

  const handlePostMenuClose = (id_publicacion) => {
    setPostAnchorEl(prev => ({ ...prev, [id_publicacion]: null }));
  };

  const handlePostLike = (id_publicacion) => {
    console.log(`Like post ${id_publicacion}`);
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
    setSelectedGroup(group);
    setSelectedGroupDescription(group.descripcion);
    fetchGroupPosts(group.id_grupo); // Fetch posts for the selected group
    setJoinGroupOpen(true);
};

const handleJoinGroupClose = () => {
    setJoinGroupOpen(false);
    setSelectedGroup(null);
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
            nombre_grupo: selectedGroup.nombre_grupo
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

const handlePublish = useCallback(async () => {
  setLoading(true);
  try {
    const user = localStorage.getItem('user'); // Obtén el JSON del localStorage
    const userData = JSON.parse(user); // Analiza el JSON para obtener el objeto
    const userId = userData.id_usuario; // Extrae el id_usuario

    if (newPost.trim()) {
      const response = await fetch('http://127.0.0.1:9002/Publicaciones/List', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          publicacion_descripcion: newPost, // Ajusta el nombre del campo
          publicacion_id_grupo: selectedGroup.id_grupo,
          publicacion_id_usuario: userId,
        }),
      });

      const data = await response.json();

      if (data.result) {
        setSnackbarMessage('Publicación exitosa');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);

        setPosts((prevPosts) => [
          {
            id_publicacion: data.data.id_publicacion,
            publicacion_contenido: newPost, // Mantén este campo solo para tu estado local
            nombre_usuario: userData.nombre_usuario, 
            id_usuario: userId, // Asegúrate de que sea el ID de usuario correcto
            // Otros campos relevantes que puedan estar en la respuesta
          },
          ...prevPosts,
        ]);

        setNewPost('');
      } else {
        setSnackbarMessage(data.message || 'Error al publicar');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    }
  } catch (error) {
    console.error('Error al publicar:', error);
    setSnackbarMessage('Error al publicar');
    setSnackbarSeverity('error');
    setSnackbarOpen(true);
  } finally {
    setLoading(false);
  }
}, [newPost, selectedGroup]);

const handleAddComment = async (postId) => {
  const commentText = newComment.trim();
  if (commentText === '') return;

  try {
    const response = await axios.post(`http://127.0.0.1:9002/forum/${postId}/comentar`, {
      comentario_contenido: commentText,
      comentario_id_usuario: JSON.parse(localStorage.getItem('userId')),
      comentario_id_publicacion: postId
    });

    if (response.data.result) {
      const newCommentData = {
        id_comentario: response.data.data,
        comentario_contenido: commentText,
        nombre_usuario: userName, 
        comentario_id_usuario: JSON.parse(localStorage.getItem('userId')),
        comentario_id_publicacion: postId
      };

      setComments((prevComments) => ({
        ...prevComments,
        [postId]: [...(prevComments[postId] || []), newCommentData]
      }));

      setNewComment('');
    } else {
      console.error('Error al agregar el comentario:', response.data.message);
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
};

const handleCommentButtonClick = (postId) => {
  if (selectedPost === postId) {
    setSelectedPost(null);
  } else {
    setSelectedPost(postId);
  }
};

const filteredPosts = useMemo(() => {
    if (!searchQuery) return posts;
    return posts.filter(post =>
        post.nombre_usuario.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.publicacion_contenido.toLowerCase().includes(searchQuery.toLowerCase())
    );
}, [posts, searchQuery]);

const renderPosts = useMemo(() => {
  return filteredPosts.map((post) => (
    <Paper key={post.id_publicacion} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6">{selectedGroup.nombre_grupo}</Typography>
      <Typography variant="body1">{post.descripcion}</Typography> {/* Muestra la descripción en lugar del contenido */}
      <Typography variant="body2" color="textSecondary">
        {post.publicacion_likes || 0} Likes
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
        <IconButton
          onClick={() => handlePostLike(post.id_publicacion)}
          color="primary"
        >
          <ThumbUpIcon />
        </IconButton>
        <Typography variant="body2" sx={{ ml: 1, mr: 2 }}>
          {post.publicacion_likes || 0}
        </Typography>
        <IconButton
          onClick={() => handleCommentButtonClick(post.id_publicacion)}
          color="primary"
        >
          <CommentIcon />
        </IconButton>
        <IconButton
          onClick={() => handleReportPost(post.id_publicacion)}
          color="secondary"
          sx={{ ml: 'auto' }}
        >
          <ReportIcon />
        </IconButton>
      </Box>
      {selectedPost === post.id_publicacion && (
        <Box sx={{ mt: 2 }}>
          {(comments[post.id_publicacion] || []).map((comment) => (
            <Paper key={comment.id_comentario} sx={{ p: 1, mb: 1 }}>
              <Typography variant="body2">{comment.nombre_usuario}</Typography>
              <Typography variant="body1">{comment.comentario_contenido}</Typography>
            </Paper>
          ))}
          <TextField
            label="Agregar comentario"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            fullWidth
            multiline
            rows={2}
            variant="outlined"
          />
          <Button onClick={() => handleAddComment(post.id_publicacion)} variant="contained" color="primary" sx={{ mt: 1 }}>
            Comentar
          </Button>
        </Box>
      )}
    </Paper>
  ));
}, [filteredPosts, selectedPost, comments, newComment]);

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
              <ListItem button key={group.id_grupo} onClick={() => handleGroupSelect(group)}>
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
      <Container maxWidth="md">
        {selectedGroup ? (
          <>
            <Typography variant="h4" gutterBottom>
              {selectedGroup.nombre_grupo}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {selectedGroup.descripcion}
            </Typography>
            <Box sx={{ display: 'center', mb: 3 }}>
              <TextField
                label="Crear nueva publicación"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                multiline
                rows={2}
                variant="outlined"
                fullWidth  
          
              />
              <Button
                onClick={handlePublish}
                variant="contained"
                color="primary"
                sx={{ ml: 25, alignSelf: 'center' }}
              >
                {loading ? <CircularProgress size={24} /> : 'Publicar'}
              </Button>
            </Box>
            {renderPosts}
          </>
        ) : (
          <Typography variant="h6">Selecciona un grupo para ver las publicaciones.</Typography>
        )}
      </Container>
    </Box>
    <Dialog open={createGroupOpen} onClose={handleCreateGroupClose}>
      <DialogTitle>Crear Grupo</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Ingresa el nombre y descripción del nuevo grupo.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Nombre del grupo"
          type="text"
          fullWidth
          variant="outlined"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Descripción"
          type="text"
          fullWidth
          variant="outlined"
          value={newGroupDescription}
          onChange={(e) => setNewGroupDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCreateGroupClose}>Cancelar</Button>
        <Button onClick={handleCreateGroup}>Crear</Button>
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