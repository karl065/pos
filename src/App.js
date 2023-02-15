import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from "./componentes/Admin";
import CrearCategoria from "./componentes/CrearCategoria";
import CrearCuenta from "./componentes/CrearCuenta";
import Home from "./componentes/Home";
import Login from "./componentes/Login";
import ActualizarCategoria from "./componentes/ActualizarCategoria";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/crear-cuenta" exact element={<CrearCuenta />} />
        <Route path="/admin" exact element={<Admin />} />
        <Route path="/crear-categoria" exact element={<CrearCategoria />} />
        <Route path="/actualizar-categoria" exact element={<ActualizarCategoria />} />
        
      </Routes>
    </Router>
  );
}

export default App;
