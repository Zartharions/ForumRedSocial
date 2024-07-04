import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Auth = () => {
    
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
                // guardar el tipo de usuario en el local storage
                
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
        <div id="contenedor">
            <div id="contenedorcentrado">
                <div id="login">
                    <form id="loginform" onSubmit={submit}>
                        <label htmlFor="usuario">Usuario</label>
                        <input 
                            id="usuario" 
                            type="text" 
                            name="usuario" 
                            placeholder="Usuario" 
                            onChange={(e) => setUsuario(e.target.value)}
                            required 
                        />
                        <label htmlFor="password">Contraseña</label>
                        <input 
                            id="password" 
                            type="password" 
                            placeholder="Contraseña" 
                            name="password" 
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <button type="submit" title="Ingresar" name="Ingresar">
                            Ingresar
                        </button>
                    </form>
                </div>
                <div id="derecho">
                    <div className="titulo">
                        Bienvenido a JuanReparaciones
                    </div>
                    <div className="pie">
                        <a href="/">Regresar</a>
                    </div>
                </div>
            </div>
        </div>
    );
};
