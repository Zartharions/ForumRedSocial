import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../estilos/Principal.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export const Control = () => {
    // variables de estado
    const [userType, setUserType] = useState(null);
    const [reparaciones, setReparaciones] = useState([]);
    const [selectedReparacion, setSelectedReparacion] = useState(null);
    const [nombreTecnico, setNombreTecnico] = useState('');
    const [apellidoTecnico, setApellidoTecnico] = useState('');
    const [error, setError] = useState('');

    // hook de navegación
    const navigate = useNavigate();

    // captura de tipo de usuario desde el local storage
    useEffect(() => {
        const typeUser = localStorage.getItem('user_type');
        const type = JSON.parse(typeUser);
        setUserType(type);

        if (type !== 1) {
            navigate('/sign-up-log-in');
        }
    }, [navigate]);


    // función para listar las reparaciones existentes
    useEffect(() => {
        fetch('http://localhost:3200/listadoReparacion')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const transformedData = data.data.map(reparacion => ({
                        id: reparacion['#reparacion'],
                        nombre: reparacion.Nombre_Cliente,
                        cedula: reparacion.cedula,
                        detalle: reparacion.Detalles_daño,
                        estado: reparacion.estado,
                        tecnico: reparacion.Tecnico_asignado
                    }));
                    setReparaciones(transformedData);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // funcion para cerrrar sesión
    const logout = () => {
        localStorage.removeItem('user_type');
        setUserType(null);
        navigate('/sign-up-log-in');
    };

    // funcion poder interactuar con las celdas si es una persona administradora
    const celdas = (reparacion) => {
        if (userType === 1) {
            setSelectedReparacion(reparacion);
        }
    };

    // funcion para cambiar el estado de la reparacion
    const cambioDeEstado = (e) => {
        setSelectedReparacion({ ...selectedReparacion, estado: e.target.value });
    };

    // funcion para cambiar el tecnico de la reparacion
    const asignacionDeTecnico = (e) => {
        const [nombre, apellido] = e.target.value.split(' ');
        setNombreTecnico(nombre || '');
        setApellidoTecnico(apellido || '');
        setSelectedReparacion({ ...selectedReparacion, tecnico: e.target.value });
    };

    // funcion para guardar los cambios realizados en la reparacion seleccionada
    const guardarCambios = async () => {
        if (selectedReparacion) {
            const { id, cedula, estado } = selectedReparacion;
            const body = {
                cedula_cliente: cedula,
                estado,
                nombre_tecnico: nombreTecnico,
                apellido_tecnico: apellidoTecnico
            };

            try {
                
                const response = await axios.put(`http://localhost:3200/actualizarReparacion/${id}`, body);
                if (response.data.success) {
                    setReparaciones(reparaciones.map(r => r.id === id ? { ...r, estado, tecnico: `${nombreTecnico} ${apellidoTecnico}` } : r));
                    setSelectedReparacion(null);
                    setError('');
                    alert(response.data.message);
                } else {
                    console.error('Error updating repair:', response.data.message);
                }
            } catch (error) {
                console.error('Error:', error);
                setError('Técnico no encontrado, no registrado');
            }
        }
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
                    <div className="table-container">
                        <h1>Control de Reparaciones</h1>
                        <table className="tabla-reparaciones">
                            <thead>
                                <tr>
                                    <th>ID Reparación</th>
                                    <th>Nombre</th>
                                    <th>Cédula</th>
                                    <th>Detalle de Daño</th>
                                    <th>Estado</th>
                                    <th>Técnico</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reparaciones.map(reparacion => (
                                    <tr
                                        key={reparacion.id}
                                        onClick={() => celdas(reparacion)}
                                        style={{
                                            backgroundColor: reparacion.estado === 'No asignado' ? 'red' :
                                                reparacion.estado === 'En reparación' ? 'yellow' :
                                                reparacion.estado === 'Recibido' ? 'red' :
                                                reparacion.estado === 'Reparado' ? 'green' : 'white'
                                        }}
                                    >
                                        <td>{reparacion.id}</td>
                                        <td>{reparacion.nombre}</td>
                                        <td>{reparacion.cedula}</td>
                                        <td>{reparacion.detalle}</td>
                                        <td>{reparacion.estado}</td>
                                        <td>{reparacion.tecnico}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {selectedReparacion && (
                        <div className="formulario-edicion">
                            <h3>Editar Reparación</h3>
                            <label>
                                Estado:
                                <select value={selectedReparacion.estado} onChange={cambioDeEstado}>
                                    <option value="No asignado">No asignado</option>
                                    <option value="En reparación">En reparación</option>
                                    <option value="Listo para recoger">Listo</option>
                                    <option value="Recibido">Recibido</option>
                                    <option value="Reparado">Reparado</option>
                                </select>
                            </label>
                            <label>
                                Técnico:
                                <input
                                    type="text"
                                    value={selectedReparacion.tecnico}
                                    onChange={asignacionDeTecnico}
                                    placeholder="Nombre Apellido"
                                />
                            </label>
                            <button className="search-button" onClick={guardarCambios}>Guardar Cambios</button>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
