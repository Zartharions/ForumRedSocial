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
            <div className="main-content">
                <header>
                    <h1>Dashboard Overview</h1>
                </header>
                <section className="cards">
                    <div className="card">
                        <h3>Total Users</h3>
                        <p>1,234</p>
                    </div>
                    <div className="card">
                        <h3>New Signups</h3>
                        <p>123</p>
                    </div>
                    <div className="card">
                        <h3>Active Users</h3>
                        <p>567</p>
                    </div>
                    <div className="card">
                        <h3>Revenue</h3>
                        <p>$12,345</p>
                    </div>
                </section>
            </div>
        </>
    );
};
