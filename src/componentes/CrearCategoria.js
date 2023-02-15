import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import swal from "sweetalert";
import crud from "../conexiones/crud";



const CrearCategoria = () => {

    const navigate = useNavigate();

    const [categoria, setCategoria] = useState({
        nombre: '',
        imagen: ''
    });


    const { nombre, imagen } = categoria;

    const onChange = (e) => {
        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value
        })
    };

    const crearCategoria = async () => {

        if (nombre === "") {
            const mensaje = "Introduzca una categoria valida";
            swal({
                title: "Error",
                text: mensaje,
                icon: "error",
                buttons: false,
                timer: 1500
            })
        } else {

            const data = {
                nombre: categoria.nombre,
                imagen: categoria.imagen
            };
            console.log(data);
            const response = await crud.POST("/api/categorias", data);
            const mensaje = response.msg;

            console.log(mensaje);
            if (mensaje === "La categoria ya existe ") {
                swal({
                    position: 'top-end',
                    icon: 'error',
                    title: mensaje,
                    buttons: false,
                    timer: 1500
                })

                setCategoria({
                    nombre: "",
                    imagen: ""
                })

            } else {
                swal({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Categoria creada con Exito!',
                    buttons: false,
                    timer: 1000
                })

                setCategoria({
                    nombre: "",
                    imagen: ""
                })
                /*
                const token = response.token;
                localStorage.setItem("token", token);
                */
                navigate("/admin");
            };
        }
    };
    const onSubmit = (e) => {
        e.preventDefault();
        crearCategoria();
    }


    return (
        <>
            <Header />
            <div className="md:flex md:min-h-screen">
                <Sidebar />
                <main className="flex-1">

                    <div className="mt-10 flex justify-center">
                        <h1 className="tracking-tight text-transparent text-4xl incline bg-gradient-to-r from-white via-blue-600 to-white bg-clip-text font-black text-left mb-5 md:mb-0">
                            Crear Categoria
                        </h1>
                    </div>
                    <div className="mt-10 flex justify-center">
                        <form
                            className="my-10 bg-blue-300 shadow rounded-lg p-10"
                            onSubmit={onSubmit}>
                            <div className="my-5">
                                <label className="uppercase text-gray-600 block text-lx font-bold">Categoria</label>
                                <input
                                    type="nombre"
                                    id="nombre"
                                    name="nombre"
                                    placeholder="Nueva Categoria"
                                    className="font-black w-full mt-3 p-3 border rounded-xl bg-gray-50"
                                    value={nombre}
                                    onChange={onChange}
                                />
                                <label className="uppercase text-gray-600 block text-lx font-bold">Imagen Categoria</label>
                                <input
                                    type="text"
                                    id="imagen"
                                    name="imagen"
                                    placeholder="Imagen Categoria"
                                    className="font-black w-full mt-3 p-3 border rounded-xl bg-gray-50"
                                    value={imagen}
                                    onChange={onChange}
                                />
                            </div>
                            <input
                                type="submit"
                                value="Crear Categoria"
                                className="bg-blue-900 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-zinc-800 hover:text-black transition-colors"
                            />
                            <Link
                                className="block text-center my-5 font-black text-white hover:cursor-pointer hover:text-black transition-colors"
                                to={"/admin"}
                            >
                                Atras
                            </Link>
                        </form>

                    </div>
                </main>
            </div>


        </>
    );
}

export default CrearCategoria;