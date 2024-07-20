import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon, 
  Divider, 
  Typography, 
  Avatar, 
  Button 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export const Dashboard = ({ userData }) => {
  const [expanded, setExpanded] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      navigate('/login');
    }
  }, [userData, navigate]);

  const handleItemClick = (index) => {
    if (expanded === index) {
      setExpanded(null);
    } else {
      setExpanded(index);
    }
  };

  if (!userData) {
    return null; // Return null if userData is not available
  }

  return (
    <Container maxWidth="lg">
      <Drawer
        variant="permanent"
        open
      >
        <List>
          <ListItem>
            <Avatar alt={userData.user_names} src="/static/images/avatar/1.jpg" />
            <ListItemText primary={userData.user_names} secondary={userData.rol_name} />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => handleItemClick(0)}>
            <ListItemIcon><MenuIcon /></ListItemIcon>
            <ListItemText primary="Menú Principal" />
          </ListItem>
          <ListItem button onClick={() => handleItemClick(1)}>
            <ListItemIcon><MenuIcon /></ListItemIcon>
            <ListItemText primary="Menú Secundario" />
          </ListItem>
          <Divider />
          <ListItem button component="a" href="/settings">
            <ListItemIcon><SettingsIcon /></ListItemIcon>
            <ListItemText primary="Configuraciones" />
          </ListItem>
          <ListItem button component="a" href="/" onClick={() => window.location.href = '/'}>
            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
            <ListItemText primary="Cerrar Sesión" />
          </ListItem>
        </List>
      </Drawer>
      <Container>
        {/* Your dashboard content goes here */}
        <Typography variant="h4" gutterBottom>
          Bienvenido, {userData.user_names}!
        </Typography>
        <Typography variant="body1">
          Este es el contenido del panel de control.
        </Typography>
      </Container>
    </Container>
  );
};