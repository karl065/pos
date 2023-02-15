import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import swal from "sweetalert";
import crud from "../conexiones/crud";



const ActualizarCategoria = () => {

    const navigate = useNavigate();

    let { search } = useLocation();
    let query = new URLSearchParams(search);
    console.log(query);

    let id = query.get("id");
    let nombreAdmin = query.get("nombre");
    let imagenAdmin = query.get("imagen");

    const [categoria, setCategoria] = useState({
        idCategoria: id,
        nombre: nombreAdmin,
        imagen: imagenAdmin
    });

    const { nombre, imagen } = categoria;


    const onChange = (e) => {
        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value
        })
    };



    const actualizar = async () => {


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

            id = categoria.idCategoria;
            const data = {
                nombre: categoria.nombre,
                imagen: categoria.imagen
            };

            const response = await crud.PUT(`/api/categorias/${id}`, data);
            const mensaje = response.msg;
            console.log(mensaje);

            swal({
                position: 'top-end',
                icon: 'success',
                text: mensaje,
                buttons: false,
                timer: 1000
            })

            setCategoria({
                nombre: "",
                imagen: ""
            })

            navigate("/admin")

        }

    }
    const onSubmit = (e) => {
        e.preventDefault();
        actualizar();
    }


    return (
        <>
            <Header />
            <div className="md:flex md:min-h-screen">
                <Sidebar />
                <main className="flex-1">
                    <div className="mt-10 flex justify-center">
                        <h1 className="tracking-tight text-transparent text-4xl incline bg-gradient-to-r from-white via-blue-600 to-white bg-clip-text font-black text-left mb-5 md:mb-0">
                            Actualizar Categoria
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
                                value="Actualizar Categoria"
                                className="bg-blue-900 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-zinc-800 hover:text-black transition-colors"
                                onClick={actualizar}
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

export default ActualizarCategoria;