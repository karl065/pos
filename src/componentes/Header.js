import React from "react";
import { useNavigate } from "react-router-dom";


const Header = () => {

    const navigate = useNavigate();

    const CerrarSesion = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <header className="px-4 py-5 bg-gradient-to-t from-white via-neutral-400 to-neutral-400">
            <div className="md:flex md:justify-between">
                <h2 className="tracking-tight text-transparent text-4xl incline bg-gradient-to-r from-black via-blue-600 to-black bg-clip-text font-black text-left mb-5 md:mb-0">
                    Panel de Control
                </h2>
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <input
                        type="submit"
                        value="Cerrar Sesion"
                        className="bg-blue-900 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-zinc-800 hover:text-black transition-colors"
                        onClick={CerrarSesion}
                    />
                </div>
            </div>
        </header>

    );
}

export default Header;