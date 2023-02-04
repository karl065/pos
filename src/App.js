import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from "./componentes/Admin";
import CrearCategoria from "./componentes/CrearCategoria";
import CrearCuenta from "./componentes/CrearCuenta";
import Home from "./componentes/Home";
import ListarCategorias from "./componentes/ListarCategorias";
import Login from "./componentes/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/crear-cuenta" exact element={<CrearCuenta />} />
        <Route path="/admin" exact element={<Admin />} />
        <Route path="/crear-categoria" exact element={<CrearCategoria />} />
        
      </Routes>
    </Router>
  );
}

export default App;
