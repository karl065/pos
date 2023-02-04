import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import ListarCategorias from "./ListarCategorias";
import Sidebar from "./Sidebar";


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



    return (
        <>
            <Header />
            <div className="md:flex md:min-h-screen">
                <Sidebar />
                <ListarCategorias/>
            </div>
        </>
    );
}

export default Admin;