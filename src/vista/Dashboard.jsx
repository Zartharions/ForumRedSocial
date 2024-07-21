import React from 'react';
import { Container, Typography, Box, Button, List, ListItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const MainScreen = ({ userData }) => {
  const navigate = useNavigate();

  const handleCreateGroup = () => {
    navigate('/grupo'); // Navegar a la página para crear un grupo
  };

  if (!userData) {
    return <Typography variant="h6">Cargando...</Typography>;
  }

  const { nombres, grupos } = userData;

  return (
    <Container>
      <Box sx={{ marginTop: 4, padding: 2 }}>
        <Typography variant="h4">Hola, {nombres}!</Typography>
        <Box sx={{ marginTop: 4 }}>
          {grupos && grupos.length > 0 ? (
            <List>
              {grupos.map((grupo) => (
                <ListItem key={grupo.id_grupo}>{grupo.nombre_grupo}</ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="h6">No perteneces a ningún grupo.</Typography>
          )}
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateGroup}
          sx={{ marginTop: 4 }}
        >
          Crear Grupo
        </Button>
      </Box>
    </Container>
  );
};
