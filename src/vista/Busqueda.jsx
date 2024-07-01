import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../estilos/Principal.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export const Busqueda = () => {
    // variables de estado
    const [userType, setUserType] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchError, setSearchError] = useState('');
    // hook de navegación
    const navigate = useNavigate();

    // captura de tipo de usuario desde el local storage
    useEffect(() => {
        const typeUser = localStorage.getItem('user_type');
        if (typeUser) {
            setUserType(JSON.parse(typeUser));
        }
    }, []);

    // función para buscar reparaciones por cédula

    const busqueda = async () => {
        try {
            
            const response = await fetch(`http://localhost:3200/seleccionarReparacionesCedula/${searchTerm}`);
            const data = await response.json();
            if (data.success) {
                if (data.data.length > 0) {
                    setSearchResults(data.data);
                    setSearchError('');
                } else {
                    setSearchResults([]);
                    setSearchError('No se encontraron resultados para la cédula ingresada.');
                }
            } else {
                console.error('Error fetching data:', data.message);
                setSearchError('Error al buscar datos. Por favor, intente nuevamente.');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setSearchError('Error al buscar datos. Por favor, intente nuevamente.');
        }
    };

    // funcion para cerrar sesión
    const logout = () => {
        setUserType(null);
        localStorage.removeItem('user_type');
    };

    return (
        <>
            <header>
                <div className="header-content">
                    <div className="logo">
                        <h1>Juan<b>Reparaciones</b></h1>
                    </div>

                    <div className="menu" id="show-menu">
                        <nav>
                            <ul>
                                {userType === 'admin' && (
                                    <>
                                        <li><Link to="/agendar"><i className="fas fa-calendar-alt"></i> Agendar</Link></li>
                                        <li><Link to="/control"><i className="fas fa-cog"></i> Control</Link></li>
                                    </>
                                )}
                                <li><Link to="/search"><i className="fas fa-search"></i> Busqueda</Link></li>
                                <li className="menu-selected"><Link to="/"><i className="fas fa-file-alt"></i> Nosotros</Link></li>
                                {userType ? (
                                    <li><a href="/" onClick={logout}><i className="fas fa-sign-out-alt"></i> Salir</a></li>
                                ) : (
                                    <li><a href="sign-up-log-in"><i className="fas fa-headset"></i> Login</a></li>
                                )}
                            </ul>
                        </nav>
                    </div>
                </div>

                <div id="icon-menu">
                    <i className="fas fa-bars"></i>
                </div>
            </header>

            <div className="blog-container-cover">
                <div className="container-info-cover search-container">
                    <h1>Búsqueda de estado del Dispositivo en reparación</h1>
                    <p>Ingrese su cédula</p>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Cédula"
                        className="search-input"
                    />
                    <button onClick={busqueda} className="search-button">Buscar</button>

                    {searchError && <p style={{ color: 'red' }}>{searchError}</p>}

                    {searchResults.length > 0 && (
                        <table className="results-table">
                            <thead>
                                <tr>
                                    <th>#Reparación</th>
                                    <th>Cédula</th>
                                    <th>Nombre Cliente</th>
                                    <th>Detalle del Daño</th>
                                    <th>Estado</th>
                                    <th>Técnico Asignado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchResults.map(reparacion => (
                                    <tr key={reparacion["#reparacion"]}>
                                        <td>{reparacion["#reparacion"]}</td>
                                        <td>{reparacion.cedula}</td>
                                        <td>{reparacion.Nombre_Cliente}</td>
                                        <td>{reparacion.Detalles_daño}</td>
                                        <td>{reparacion.estado}</td>
                                        <td>{reparacion.Tecnico_asignado}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
};
