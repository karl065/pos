import React from "react";
import { Link } from "react-router-dom";



const Sidebar = () => {



    return (
        <aside className="lg:w-50 px-4 py-5 bg-gradient-to-b from-white via-neutral-400 to-black">
            <div className="flex">
                <Link
                    className="bg-blue-900 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-zinc-800 hover:text-black transition-colors"
                    to={"/crear-categoria"}>
                    Crear Categoria
                </Link>
            </div>
            <div className="flex">
                <Link
                    className="bg-blue-900 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-zinc-800 hover:text-black transition-colors"
                    to={"/crear-productos"}>
                    Crear Productos
                </Link>
            </div>


        </aside>

    );
}

export default Sidebar;