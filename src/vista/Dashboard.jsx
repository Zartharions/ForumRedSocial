import React, { useState, useEffect } from 'react';
import { 
    AppBar, Toolbar, Typography, IconButton, InputBase, Menu, MenuItem, 
    Drawer, Box, Paper, CssBaseline, Container, Button, 
    Dialog, DialogActions, DialogContent, DialogTitle,
    Snackbar, Alert, List, ListItem, Divider
} from '@mui/material';
import { Search as SearchIcon, AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const MainScreen = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [userName, setUserName] = useState('');
    const [selectedGame, setSelectedGame] = useState(null);
    const [contactOpen, setContactOpen] = useState(false);
    const navigate = useNavigate();

    const materias = [
        
        {
            nombre: "Matemáticas Avanzadas",
            objetivo: "Desarrollar habilidades analíticas y de resolución de problemas complejos.",
            descripcion: "En este juego, los estudiantes enfrentarán desafíos matemáticos avanzados que requieren un pensamiento crítico y una comprensión profunda de conceptos matemáticos. Resolver estos problemas ayudará a los estudiantes a mejorar su capacidad para abordar problemas complejos de manera efectiva."
        },
        {
            nombre: "Física Cuántica",
            objetivo: "Introducir conceptos fundamentales de la física cuántica de manera interactiva.",
            descripcion: "Este juego lleva a los estudiantes a través de los principios básicos de la física cuántica, incluyendo la dualidad onda-partícula y el principio de incertidumbre. Los estudiantes aprenderán estos conceptos jugando, lo que facilita la comprensión de temas abstractos y complejos."
        },
        {
            nombre: "Biología Molecular",
            objetivo: "Comprender la estructura y función de las moléculas biológicas.",
            descripcion: "Mediante este juego, los estudiantes explorarán el mundo de las moléculas biológicas, como el ADN y las proteínas. Se enfrentarán a desafíos que les ayudarán a entender cómo estas moléculas interactúan y desempeñan sus funciones esenciales en los organismos vivos."
        },
        {
            nombre: "Química Orgánica",
            objetivo: "Aprender sobre la estructura, propiedades y reacciones de compuestos orgánicos.",
            descripcion: "Este juego sumerge a los estudiantes en la química orgánica, enseñándoles sobre las estructuras moleculares y las reacciones químicas de los compuestos orgánicos. Los estudiantes aprenderán divirtiéndose al completar tareas y retos que explican estos conceptos complejos."
        },
        {
            nombre: "Historia del Arte",
            objetivo: "Explorar los movimientos artísticos y sus influencias a lo largo del tiempo.",
            descripcion: "A través de este juego, los estudiantes descubrirán los diferentes movimientos artísticos y cómo han influido en la historia del arte. Completarán misiones que les permitirán apreciar el contexto histórico y cultural de diversas obras de arte."
        },
        {
            nombre: "Literatura Universal",
            objetivo: "Conocer las obras literarias más importantes de la historia.",
            descripcion: "En este juego, los estudiantes explorarán las obras literarias más influyentes de diferentes épocas y culturas. Se les presentarán desafíos y actividades que les ayudarán a comprender y analizar estos textos significativos."
        },
        {
            nombre: "Economía Global",
            objetivo: "Comprender los principios de la economía y su impacto global.",
            descripcion: "Este juego introduce a los estudiantes a los conceptos básicos de la economía y cómo funcionan los mercados globales. A través de simulaciones y escenarios interactivos, los estudiantes aprenderán sobre la oferta y demanda, el comercio internacional y la política económica."
        },
        {
            nombre: "Ingeniería de Software",
            objetivo: "Desarrollar habilidades en el diseño y desarrollo de software.",
            descripcion: "Mediante este juego, los estudiantes aprenderán sobre el ciclo de vida del desarrollo de software, incluyendo el diseño, la codificación, las pruebas y el mantenimiento. Resolverán problemas y desafíos que les ayudarán a aplicar estos conceptos en proyectos reales."
        },
        {
            nombre: "Derecho Internacional",
            objetivo: "Entender los principios y leyes que rigen las relaciones internacionales.",
            descripcion: "Este juego sumerge a los estudiantes en el mundo del derecho internacional, enseñándoles sobre los tratados, las organizaciones internacionales y los derechos humanos. A través de casos prácticos y simulaciones, los estudiantes aprenderán a aplicar estos principios legales."
        },
        {
            nombre: "Psicología Cognitiva",
            objetivo: "Explorar cómo funciona la mente humana y los procesos cognitivos.",
            descripcion: "En este juego, los estudiantes aprenderán sobre los procesos mentales que subyacen en la percepción, el aprendizaje, la memoria y el pensamiento. A través de actividades interactivas, los estudiantes mejorarán su comprensión de cómo funciona la mente humana."
        },
        {
            nombre: "Astronomía y Astrofísica",
            objetivo: "Explorar el universo y los fenómenos astronómicos.",
            descripcion: "Este juego lleva a los estudiantes en un viaje a través del universo, enseñándoles sobre los planetas, las estrellas, las galaxias y los agujeros negros. Resolverán misterios y completarán misiones que les ayudarán a entender los fenómenos astronómicos."
        },
        {
            nombre: "Neurociencia",
            objetivo: "Comprender la estructura y función del sistema nervioso.",
            descripcion: "Mediante este juego, los estudiantes explorarán el cerebro y el sistema nervioso, aprendiendo sobre las neuronas, la sinapsis y los neurotransmisores. Resolverán problemas y realizarán experimentos virtuales para entender cómo funciona el sistema nervioso."
        },
        {
            nombre: "Antropología Cultural",
            objetivo: "Estudiar las culturas humanas y sus desarrollos.",
            descripcion: "Este juego introduce a los estudiantes a la antropología cultural, enseñándoles sobre las diferentes culturas y sus prácticas. A través de estudios de caso y actividades interactivas, los estudiantes aprenderán a apreciar la diversidad cultural."
        },
        {
            nombre: "Sociología",
            objetivo: "Comprender las estructuras y dinámicas de las sociedades humanas.",
            descripcion: "En este juego, los estudiantes aprenderán sobre las instituciones sociales, los grupos y las organizaciones que componen las sociedades. Resolverán desafíos y realizarán investigaciones que les ayudarán a entender las dinámicas sociales."
        },
        {
            nombre: "Ecología",
            objetivo: "Estudiar las interacciones entre los organismos y su entorno.",
            descripcion: "Mediante este juego, los estudiantes explorarán los ecosistemas y las relaciones entre los organismos y su entorno. A través de simulaciones y actividades prácticas, aprenderán sobre la biodiversidad y la conservación del medio ambiente."
        },
        {
            nombre: "Filosofía",
            objetivo: "Reflexionar sobre las grandes preguntas de la existencia y el conocimiento.",
            descripcion: "Este juego lleva a los estudiantes a través de los principales temas y preguntas filosóficas, desde la ética hasta la metafísica. Resolverán dilemas y participarán en debates que les ayudarán a desarrollar su pensamiento crítico y reflexivo."
        },
        {
            nombre: "Genética",
            objetivo: "Comprender los principios de la herencia y la variación genética.",
            descripcion: "En este juego, los estudiantes aprenderán sobre los genes, los cromosomas y las mutaciones. A través de experimentos virtuales y simulaciones, entenderán cómo se transmiten los caracteres hereditarios y la importancia de la genética en la biología."
        },
        {
            nombre: "Química Inorgánica",
            objetivo: "Estudiar los elementos y compuestos inorgánicos.",
            descripcion: "Este juego introduce a los estudiantes a la química inorgánica, enseñándoles sobre los elementos y sus compuestos. Resolverán problemas y realizarán experimentos que les ayudarán a comprender las propiedades y reacciones de estos compuestos."
        },
        {
            nombre: "Estadística Aplicada",
            objetivo: "Desarrollar habilidades en el análisis y la interpretación de datos.",
            descripcion: "Mediante este juego, los estudiantes aprenderán sobre los métodos estadísticos y su aplicación en diversas áreas. Resolverán problemas y analizarán datos reales para desarrollar sus habilidades en el manejo y la interpretación de datos."
        },
        {
            nombre: "Microbiología",
            objetivo: "Explorar el mundo de los microorganismos y su impacto en la vida.",
            descripcion: "Este juego lleva a los estudiantes a través del estudio de los microorganismos, incluyendo bacterias, virus y hongos. A través de experimentos virtuales y simulaciones, aprenderán sobre la importancia de estos organismos en la salud y el medio ambiente."
        }
    ];

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('usuario'));
        if (user) {
            setUserName(user.usuario);
        }
    }, []);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('usuario');
        navigate('/login');
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.length > 0) {
            const filteredResults = materias.filter(materia =>
                materia.nombre.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(filteredResults);
            setShowSearchResults(true);
        } else {
            setSearchResults([]);
            setShowSearchResults(false);
        }
    };

    const handleMateriaClick = (materia) => {
        setSelectedGame(materia);
        setShowSearchResults(false);
    };

    const handleContactOpen = () => {
        setContactOpen(true);
    };

    const handleContactClose = () => {
        setContactOpen(false);
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
                                                        onClick={() => handleMateriaClick(result)}
                                                    >
                                                        {result.nombre}
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
                        top: 64,
                    },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'center', p: 1 }}>
                    <List>
                        {materias.map((materia, index) => (
                            <ListItem button key={index} onClick={() => handleMateriaClick(materia)}>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    sx={{ textAlign: 'left', justifyContent: 'flex-start' }}
                                >
                                    {materia.nombre}
                                </Button>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 10 }}
            >
                <Toolbar />
                
                <Box sx={{ mb: 2 }}>
                    <Typography variant="h6">Información del Juego</Typography>
                    <Divider sx={{ mb: 2 }} />
                    {selectedGame ? (
                        <Box sx={{ mb: 4, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
                            <Typography variant="h6">{selectedGame.nombre}</Typography>
                            <Typography variant="body1" sx={{ mb: 1 }}>Objetivo: {selectedGame.objetivo}</Typography>
                            <Typography variant="body2">{selectedGame.descripcion}</Typography>
                        </Box>
                    ) : (
                        <Typography variant="body2">Selecciona una materia para ver información sobre el juego.</Typography>
                    )}
                </Box>
                
                <Box sx={{ mb: 10 }}>
                    <Divider sx={{ mb: 7}} />
                    <Typography variant="h6">Cómo Conseguir las Cartas</Typography>
                    <Divider sx={{ mb: 2}} />
                    <Typography variant="body2">Puedes conseguir las cartas contactando al Grupo 1.</Typography>
                    <Button variant="contained" color="primary" onClick={handleContactOpen}>Contactar</Button>
                </Box>
                
                <Dialog open={contactOpen} onClose={handleContactClose}>
                    <DialogTitle>Contacto</DialogTitle>
                    <DialogContent>
                        <Typography variant="body1">
                            Para solicitar algún elemento, contactarse con el Grupo 1.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleContactClose}>Cerrar</Button>
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
        </Box>
    );
};
