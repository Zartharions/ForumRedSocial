import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Box,
  Paper,
  CssBaseline,
  Container,
  Button,
  Snackbar,
  Alert
} from '@mui/material';
import { Search as SearchIcon, AccountCircle, MoreVert as MoreVertIcon } from '@mui/icons-material';

export const ReportedPostsScreen = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [postAnchorEl, setPostAnchorEl] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const reportedPosts = [
    { id_publicacion: 1, id_grupo: 1, grupo: 'Grupo 1', usuario: 'Usuario 1', descripcion: 'Post reasdasdasdasdasdadasds portado 1', fecha_hora: new Date() },
    { id_publicacion: 2, id_grupo: 2, grupo: 'Grupo 2', usuario: 'Usuario 2', descripcion: 'Post reportado 2', fecha_hora: new Date() }
  ];

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

  const handleAction = (action, id_publicacion) => {
    setSnackbarMessage(`Post ${action === 'accept' ? 'aceptado' : action === 'reject' ? 'rechazado' : 'baneado'}`);
    setSnackbarOpen(true);
    handlePostMenuClose(id_publicacion);
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
            AlumniUG
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
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, marginTop: '1px' }} // Ajuste para que el contenido esté debajo de la barra superior
      >
        <Container>
          {reportedPosts.map((post) => (
            <Paper key={post.id_publicacion} sx={{ padding: 2, marginBottom: 2, position: 'relative', width: 600, maxWidth: 800, minHeight: 100 }}>
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
                <MenuItem onClick={() => handleAction('accept', post.id_publicacion)}>Aceptar</MenuItem>
                <MenuItem onClick={() => handleAction('reject', post.id_publicacion)}>Rechazar</MenuItem>
                <MenuItem onClick={() => handleAction('ban', post.id_publicacion)}>Banear</MenuItem>
              </Menu>
              <Typography variant="subtitle2">{post.grupo} &gt; {post.usuario}</Typography>
              <Typography variant="body2" color="textSecondary">
                {new Date(post.fecha_hora).toLocaleString()}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: 1, marginBottom: 1 }}>
                {post.descripcion}
              </Typography>
            </Paper>
          ))}
        </Container>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="info">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
