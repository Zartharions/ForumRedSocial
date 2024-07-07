import React, { useState, useEffect } from 'react';

export const Dashboard = ({ userData }) => {
    const [expanded, setExpanded] = useState(null); // Estado para controlar qué opción está expandida

    useEffect(() => {
        if (!userData) {
            // redirigir a la página de autenticación si no hay datos de usuario
            window.location.href = '/';
        }
    }, [userData]);

    // Función para manejar el clic en un ítem del menú
    const handleItemClick = (index) => {
        if (expanded === index) {
            setExpanded(null); // Si ya está expandido, cerrarlo
        } else {
            setExpanded(index); // De lo contrario, expandirlo
        }
    };

    if (!userData) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <div className="sidebar">
                <h2>Taller</h2>
                <ul>
                    <li onClick={() => handleItemClick(0)}>
                        <a href="#">{userData.rol_name}</a>
                        {expanded === 0 && (
                            <ul className="submenu">
                                <li><a href="#">{userData.user_names}</a></li>
                                <li><a href="#">{userData.user_lastnames}</a></li>
                                <li><a href="#">{userData.user_login_id}</a></li>
                            </ul>
                        )}
                    </li>
                    <li onClick={() => handleItemClick(1)}>
                        <a href="#">{userData.mod_name}</a>
                        {expanded === 1 && (
                            <ul className="submenu">
                                <li><a href="#">{userData.mod_description}</a></li>
                                <li><a href="#">{userData.menu_name}</a></li>
                            </ul>
                        )}
                    </li>
                    <li><a href="#">Configuraciones</a></li>
                    <li><a href="/">Logout</a></li>
                </ul>
            </div>
        
        </>
    );
};
