import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import crud from "../conexiones/crud";
import swal from "sweetalert";



const Admin = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
            }
        }
        autenticarUsuario()
    }, [navigate]);


    const [categoria, setCategoria] = useState([]);

    const cargarCategorias = async () => {
        const response = await crud.GET(`/api/categorias`);
        console.log(response);
        setCategoria(response.categoria);
    }

    useEffect(() => {
        cargarCategorias();
    }, []);


    const eliminarCategoria = async (e, idCategoria) => {
        e.preventDefault();

        const valor = await swal("Esta seguro?", {
            icon: "warning",
            dangerMode: true,
            buttons: {
                confirm: {
                    text: "Si",
                    value: true,
                    visible: true,
                    closeModal: true
                },
                deny: {
                    text: "No",
                    value: null,
                    visible: true,
                    closeModal: true
                }
            },

        })
        console.log(valor);

        if (valor === true) {
            const response = await crud.DELETE(`/api/categorias/${idCategoria}`);
            const mensaje = response.msg;
            swal({
                text: mensaje,
                icon: "success",
                buttons: false,
                timer: 2000
            })
            console.log(response.msg);
            window.location.reload(3000);
        } else {
            swal({
                text: "No se elimino la categoria",
                icon: "info",
                buttons: false,
                timer: 2000
            })
        };

    }


    return (
        <>
            <Header />
            <div className="md:flex md:min-h-screen">
                <Sidebar />
                <main>
                    <h1 className="incline bg-gradient-to-r from-indigo-200 via-blue-600 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
                        Categorias
                    </h1>
                    <div>
                        <table>
                            <thead className="bg-white">
                                <tr>
                                    <th>Imagen</th>
                                    <th>Nombre</th>
                                    <th>ID</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {
                                    categoria.map(
                                        item =>
                                            <tr key={item._id}>
                                                <td><img src={item.imagen} width="300" height="300" alt="imagen categoria"></img></td>
                                                <td>
                                                    <input
                                                        type="submit"
                                                        value={item.nombre}
                                                        className="bg-blue-900 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-zinc-800 hover:text-black transition-colors"
                                                    //onClick={CerrarSesion}
                                                    />
                                                </td>
                                                <td>{item._id}</td>
                                                <td>
                                                    <input
                                                        type="submit"
                                                        value="Crear Producto"
                                                        className="bg-blue-900 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-zinc-800 hover:text-black transition-colors"
                                                    //onClick={CerrarSesion}
                                                    />
                                                    <Link
                                                        type="submit"
                                                        value="Actualizar"
                                                        className="text-center bg-blue-900 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-zinc-800 hover:text-black transition-colors"
                                                        to={`/actualizar-categoria?id=${item._id}&nombre=${item.nombre}&imagen=${item.imagen}`}
                                                    >Actualizar</Link>
                                                    <input
                                                        type="submit"
                                                        value="Eliminar"
                                                        className="bg-blue-900 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-zinc-800 hover:text-black transition-colors"
                                                        onClick={(e) => eliminarCategoria(e, item._id)}
                                                    />

                                                </td>

                                            </tr>
                                    )
                                }
                            </tbody>

                        </table>
                    </div>
                </main>
            </div>
        </>
    );
}

export default Admin;