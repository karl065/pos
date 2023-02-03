import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import crud from "../conexiones/crud";

const CrearCuenta = () => {

    const navigate = useNavigate();
    const [usuario, setUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    });

    const { nombre, email, password, confirmar } = usuario;

    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    };


    const crearCuentas = async () => {

        if (nombre === "") {
            const mensaje = "Introduzca un nombre valido";
            swal({
                title: "Error",
                text: mensaje,
                icon: "error",
                buttons: false,
                timer: 1500
            })
        } else if (email === "") {
            const mensaje = "Introduzca un email valido";
            swal({
                title: "Error",
                text: mensaje,
                icon: "error",
                buttons: false,
                timer: 1500
            })
        } else if (password === "") {
            const mensaje = "Introduzca un password valido";
            swal({
                title: "Error",
                text: mensaje,
                icon: "error",
                buttons: false,
                timer: 1500
            })
        } else if (password !== confirmar) {
            console.log("La contraseña no coincide")
            const mensaje = "La contraseña no coincide";
            swal({
                title: "Error",
                text: mensaje,
                icon: "error",
                buttons: false,
                timer: 1500
            })

        } else {

            const data = {
                nombre: usuario.nombre,
                email: usuario.email,
                password: usuario.password
            };
            console.log(data);
            const response = await crud.POST("/api/usuarios", data);
            const mensaje = response.msg;
            console.log(mensaje);
            if (mensaje === "El email ya esta registrado") {
                swal({
                    position: 'top-end',
                    icon: 'error',
                    title: mensaje,
                    buttons: false,
                    timer: 1500
                })

            } else {
                swal({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Cuenta creada con Exito!',
                    buttons: false,
                    timer: 1000
                })

                setUsuario({
                    nombre:"",
                    email:"",
                    password:"",
                    confirmar:""
                })
                navigate("/");
            };

        }

    };

    const onSubmit = (e) => {
        e.preventDefault();
        crearCuentas();


    }

    return (
        <main className="container mx-auto  mt-5 md:mt-20 p-5 md:flex md:justify-center">
            <div className="md:w-2/3 lg:w-2/5">
                <h1 className="incline bg-gradient-to-r from-indigo-200 via-blue-600 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">Bienvenidos al POS</h1>
                <h1 className="incline bg-gradient-to-r from-indigo-200 via-blue-600 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">Iniciar Sesion</h1>
                <form
                    className="my-10 bg-blue-300 shadow rounded-lg p-10"
                    onSubmit={onSubmit}
                >
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-lx font-bold">Nombre</label>
                        <input
                            type="nombre"
                            id="nombre"
                            name="nombre"
                            placeholder="Ingrese su nombre"
                            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                            value={nombre}
                            onChange={onChange}
                        />
                        <label className="uppercase text-gray-600 block text-lx font-bold">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Ingrese su Email"
                            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                            value={email}
                            onChange={onChange}
                        />
                        <label className="uppercase text-gray-600 block text-lx font-bold">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                            value={password}
                            onChange={onChange}
                        />
                        <label className="uppercase text-gray-600 block text-lx font-bold">Confirmar Password</label>
                        <input
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            placeholder="Confirmar Password"
                            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                            value={confirmar}
                            onChange={onChange}
                        />

                    </div>
                    <input
                        type="submit"
                        value="Crear Cuenta"
                        className="bg-blue-900 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-zinc-800 transition-colors"
                    />

                    <Link
                        className="block text-center my-5"
                        to={"/"}
                    >
                        Atras
                    </Link>
                </form>
            </div>
        </main>
    );
}

export default CrearCuenta;