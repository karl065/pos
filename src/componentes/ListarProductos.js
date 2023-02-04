import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import crud from "../conexiones/crud";


const ListarProductos = () => {

    const navigate = useNavigate();

    const [categoria, setCategoria] = useState({
        nombre: ''
    });


    const { nombre } = categoria;

    const onChange = (e) => {
        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value
        })
    };


    const obtenerCategorias = async () => {
        const response = await crud.GET("/api/categorias");
        const categorias = response.categoria;
        console.log(categorias);

        let tabla = "";
        for (let i = 0; i < categorias.length; i++) {
            let name = categorias[i].nombre;
            let fila = "<tr><td><button> ";
            fila += name;
            fila += "</button></td></tr>";
            tabla += fila;
            console.log(fila);

        }

        document.getElementById("tablaCategorias").innerHTML = tabla;

    }

    useEffect(() => {
        obtenerCategorias();
    });

    /*const onSubmit = (e) => {
        e.preventDefault();
        obtenerCategorias();
    }*/



    return (
        <main className="flex-1">
            <div className="mt-5 flex justify-center">
                <h1 className="text-transparent text-3xl bg-gradient-to-r from-white via-blue-600 to-white bg-clip-text font-black mb-5">
                    Categorias
                </h1>
            </div>
            <div className="mt-10 flex justify-center">
                <form className="my-10 bg-blue-300 shadow rounded-lg p-10"
                >
                    <table
                        id="tablaCategorias"
                    >

                    </table>
                </form>

            </div>

        </main>
    );
}

export default ListarProductos;