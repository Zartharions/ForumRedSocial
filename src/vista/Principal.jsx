import React, { useState, useEffect } from 'react';
import '../estilos/Principal.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css';

export const Principal = () => {
    // declaracion de variable de estado del tipo de usuario en nula = no logeado
    const [userType, setUserType] = useState(null);

    // captura del tipo de usuario en el local storage
    useEffect(() => {
        const typeUser = localStorage.getItem('user_type');
        const type = JSON.parse(typeUser);
        setUserType(type);
    }, []);


    //funcion para cerrar sesion y eliminar el tipo de usuario en el local storage
    const logout = () => {
        localStorage.removeItem('user_type');
        setUserType(null);
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
                    <h1>Proyecto Primer Parcial</h1>
                    <p>Presentación de proyecto sobre problematica de control y busqueda de estado de reparaciones de dispositivos de clientes</p>
                </div>
            </div>
        </>
    );
};
