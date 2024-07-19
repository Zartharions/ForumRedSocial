import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [university, setUniversity] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        const body = {
            first_name: firstName,
            last_name: lastName,
            username,
            university,
            email,
            phone
        };

        try {
            const response = await axios.post('http://127.0.0.1:9002/segu/register', body);
            if (response.data.result) {
                navigate('/login'); // Redirigir al login después del registro
            } else {
                setError('Error en el registro, intente de nuevo.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Error en el registro, intente de nuevo.');
        }
    };

    return (
        <div id="contenedor">
            <div id="contenedorcentrado">
                <div id="register">
                    <form id="registerform" onSubmit={submit}>
                        <label htmlFor="firstName">Nombres</label>
                        <input
                            id="firstName"
                            type="text"
                            name="firstName"
                            placeholder="Nombres"
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                        <label htmlFor="lastName">Apellidos</label>
                        <input
                            id="lastName"
                            type="text"
                            name="lastName"
                            placeholder="Apellidos"
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                        <label htmlFor="username">Nombre de Usuario</label>
                        <input
                            id="username"
                            type="text"
                            name="username"
                            placeholder="Nombre de Usuario"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <label htmlFor="university">Universidad</label>
                        <input
                            id="university"
                            type="text"
                            name="university"
                            placeholder="Universidad"
                            onChange={(e) => setUniversity(e.target.value)}
                            required
                        />
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Correo Electrónico"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label htmlFor="phone">Celular</label>
                        <input
                            id="phone"
                            type="tel"
                            name="phone"
                            placeholder="Celular"
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <button type="submit" title="Registrarse" name="Registrarse">
                            Registrarse
                        </button>
                    </form>
                </div>
                <div id="derecho">
                    <div className="titulo">
                        Bienvenido al proyecto del segundo Parcial
                    </div>
                    <div className="pie">
                        <a href="/login">Iniciar sesión.</a>
                    </div>
                </div>
            </div>
        </div>
    );
};
