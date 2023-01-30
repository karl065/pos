import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div>
            <h1>Bienvenidos al POS</h1>
            <h1>Iniciar Sesion</h1>
            <h2>Ingrese sus Credenciales</h2>
            <input placeholder="Email" />
            <input placeholder="Contraseña" />
            <button>Ingresar</button>
            <Link to={"/crear-cuenta"}>Crear Cuenta</Link>
        </div>
    );
}

export default Login;