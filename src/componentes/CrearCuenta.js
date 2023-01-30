import React from "react";
import { Link } from "react-router-dom";

const CrearCuenta = () => {
    return (
        <div>
            <h1>Crear Cuenta</h1>
            <h2>Ingrese sus Datos</h2>
            <input placeholder="Nombre" />
            <input placeholder="Email" />
            <input placeholder="Contraseña" />
            <input placeholder="Confirmar" />

            <button>Crear Cuenta</button>
            <Link to={"/"}>Atras</Link>
        </div>
    );
}

export default CrearCuenta;