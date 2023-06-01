import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Admin from './componentes/Admin';
import CrearCategoria from './componentes/CrearCategoria';
import CrearCuenta from './componentes/CrearCuenta';
import Home from './componentes/Home';
import Login from './componentes/Login';
import ActualizarCategoria from './componentes/ActualizarCategoria';
import CrearProducto from './componentes/CrearProducto';
import Productos from './componentes/Productos';
import ActualizarProducto from './componentes/ActualizarProducto';
import VerProductos from './componentes/VerProductos';
import ProductosUsuarios from './componentes/ProductosUsuarios';
import VerProductosUsuario from './componentes/VerProductosUsuario';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/crear-cuenta" exact element={<CrearCuenta />} />
        <Route path="/admin" exact element={<Admin />} />
        <Route path="/productos" exact element={<Productos />} />
        <Route
          path="/productos-usuario"
          exact
          element={<ProductosUsuarios />}
        />
        <Route path="/ver-productos" exact element={<VerProductos />} />
        <Route
          path="/ver-productos-usuario"
          exact
          element={<VerProductosUsuario />}
        />
        <Route path="/crear-categoria" exact element={<CrearCategoria />} />
        <Route path="/crear-producto" exact element={<CrearProducto />} />
        <Route
          path="/actualizar-categoria"
          exact
          element={<ActualizarCategoria />}
        />
        <Route
          path="/actualizar-producto"
          exact
          element={<ActualizarProducto />}
        />
      </Routes>
    </Router>
  );
}

export default App;
