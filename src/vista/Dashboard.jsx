import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
    
    // variables de estado
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // hook de navegacion
    const navigate = useNavigate();

    // maneja el submit del formulario para autenticar al usuario
    const submit = async (e) => {
        e.preventDefault();
        const body = {
            login_user: usuario,
            login_password: password
             
        }
        try {
            // autenticar al usuario
            const response = await axios.post('http://127.0.0.1:5000/security/login', body);
            if (response.data.status_code === 200 ) {

                navigate('/');
            } else {
                // mostrar error de autenticación
                setError('Error en la autenticación, intente de nuevo.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Error en la autenticación, intente de nuevo.');
        }
    };

    return (
        <>
        <div class="sidebar">
        <h2>Dashboard</h2>
        <ul>
            <li><a href="#">Overview</a></li>
            <li><a href="#">Analytics</a></li>
            <li><a href="#">Reports</a></li>
            <li><a href="#">Users</a></li>
            <li><a href="#">Settings</a></li>
            <li><a href="#">Help</a></li>
        </ul>
    </div>
    <div class="main-content">
        <header>
            <h1>Dashboard Overview</h1>
        </header>
        <section class="cards">
            <div class="card">
                <h3>Total Users</h3>
                <p>1,234</p>
            </div>
            <div class="card">
                <h3>New Signups</h3>
                <p>123</p>
            </div>
            <div class="card">
                <h3>Active Users</h3>
                <p>567</p>
            </div>
            <div class="card">
                <h3>Revenue</h3>
                <p>$12,345</p>
            </div>
        </section>
        <section class="charts">
            <div class="chart">
                <h3>Monthly Users</h3>
                <div class="chart-placeholder">[Chart]</div>
            </div>
            <div class="chart">
                <h3>Revenue Growth</h3>
                <div class="chart-placeholder">[Chart]</div>
            </div>
        </section>
        <section class="user-list">
            <h2>Recent Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Joined</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Jane Doe</td>
                        <td>jane@example.com</td>
                        <td>2024-07-01</td>
                        <td>Active</td>
                    </tr>
                    <tr>
                        <td>John Smith</td>
                        <td>john@example.com</td>
                        <td>2024-06-25</td>
                        <td>Inactive</td>
                    </tr>
                  
                </tbody>
            </table>
        </section>
    </div>
    </>
    );
};
