import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../estilos/Principal.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export const Agendar = () => {
    // variables de estado
    const [userType, setUserType] = useState(null);
    const [cedula, setCedula] = useState('');
    const [danio, setDanio] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    // hook de navegación
    const navigate = useNavigate();

    // redireccionar al login si el usuario no está logueado o si no es un admin
    useEffect(() => {
        const typeUser = localStorage.getItem('user_type');
        const type = JSON.parse(typeUser);
        setUserType(type);

        if (type !== 1) {
            navigate('/sign-up-log-in');
        }
    }, [navigate]);


    // función para enviar el formulario de creación de orden de reparación a la api
    const submit = async (e) => {
        e.preventDefault();

        const body = {
            cedula_cliente: cedula,
            danio_equipos: danio
        };

        try {
            const response = await axios.post('http://localhost:3200/crearReparacion', body);
            if (response.data.success) {
                setResponseMessage(response.data.message);
                setFormSubmitted(true);
                setCedula('');
                setDanio('');
            } else {
                setResponseMessage('Error en la creación de la orden');
            }
        } catch (error) {
            console.error('Error:', error);
            setResponseMessage('Error en la comunicación con el servidor');
        }
    };

    // función para cerrar sesión
    const logout = () => {
        localStorage.removeItem('user_type');
        setUserType(null);
        navigate('/sign-up-log-in');
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
                                {userType === 1 && (
                                    <>
                                        <li><a href="agendar"><i className="fas fa-calendar-alt"></i> Agendar</a></li>
                                        <li><a href="control"><i className="fas fa-cog"></i> Control</a></li>
                                    </>
                                )}
                                <li><a href="search"><i className="fas fa-search"></i> Busqueda</a></li>
                                <li className="menu-selected"><a href="/" className="text-menu-selected"><i className="fas fa-file-alt"></i> Nosotros</a></li>
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
                <div className="container-info-cover">
                    <div className="form-container">
                        <h1>Agendar Reparación</h1>
                        {formSubmitted ? (
                            <p>{responseMessage}</p>
                        ) : (
                            <form onSubmit={submit}>
                                <div className="form-group">
                                    <label htmlFor="cedula_cliente">Cédula:</label>
                                    <input
                                        type="text"
                                        id="cedula_cliente"
                                        value={cedula}
                                        onChange={(e) => setCedula(e.target.value)}
                                        required
                                        placeholder="Ingrese el número de Cédula del cliente"
                                        className="search-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="danio_equipos">Daño:</label>
                                    <input
                                        type="text"
                                        id="danio_equipos"
                                        value={danio}
                                        onChange={(e) => setDanio(e.target.value)}
                                        required
                                        placeholder="Detalle el problema que presenta el dispositivo"
                                        className="search-input"
                                    />
                                </div>
                                
                                <button type="submit" className="search-button">Enviar</button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
