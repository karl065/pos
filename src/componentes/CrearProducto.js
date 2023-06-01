import React, {useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import swal from 'sweetalert';
import crud from '../conexiones/crud';

const CrearProducto = () => {
  const navigate = useNavigate();

  let {search} = useLocation();
  let query = new URLSearchParams(search);

  let id = query.get('id');
  let nombreAdmin = query.get('nombre');
  let imagenAdmin = query.get('imagen');
  let nombreUsuario = query.get('nombreUsuario');

  const [categoria, setCategoria] = useState({
    idCategoria: id,
    nombreCategoria: nombreAdmin,
    imagenCategoria: imagenAdmin,
  });

  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    stock: '',
    precio: '',
    imagen: '',
  });
  const {nombreCategoria, imagenCategoria} = categoria;

  const {nombre, descripcion, stock, precio, imagen} = producto;

  const onChange = (e) => {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
    });
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  const crearProducto = async () => {
    if (nombre === '') {
      const mensaje = 'Introduzca una producto valida';
      swal({
        title: 'Error',
        text: mensaje,
        icon: 'error',
        buttons: false,
        timer: 1500,
      });
    } else {
      const data = {
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        stock: producto.stock,
        precio: producto.precio,
        imagen: producto.imagen,
      };
      const response = await crud.POST(`/api/productos/${id}`, data);
      const mensaje = response.msg;

      if (mensaje === 'El producto ya existe') {
        swal({
          position: 'top-end',
          icon: 'error',
          title: mensaje,
          buttons: false,
          timer: 1500,
        });

        setProducto({
          nombre: '',
          descripcion: '',
          stock: '',
          precio: '',
          imagen: '',
        });
      } else {
        swal({
          position: 'top-end',
          icon: 'success',
          title: 'Categoria creada con Exito!',
          buttons: false,
          timer: 1000,
        });

        setProducto({
          nombre: '',
          descripcion: '',
          stock: '',
          precio: '',
          imagen: '',
        });
        /*
                const token = response.token;
                localStorage.setItem("token", token);
                */
        navigate(`/admin?nombreUsuario=${nombreUsuario}`);
      }
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    crearProducto();
  };

  return (
    <>
      <Header />
      <div className="md:flex md:min-h-screen">
        <Sidebar />
        <main className="flex-1">
          <div className="mt-5 flex justify-center">
            <img
              src={imagenCategoria}
              width="100"
              height="100"
              alt="imagen categoria"
            ></img>
            <h1 className="tracking-tight text-transparent text-4xl incline bg-gradient-to-r from-white via-blue-600 to-white bg-clip-text font-black text-left mb-5 md:mb-0">
              Crear {nombreCategoria}
            </h1>
          </div>
          <div className="mt-1 flex justify-center">
            <form
              className="my-10 bg-blue-300 shadow rounded-lg p-10"
              onSubmit={onSubmit}
            >
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-lx font-bold">
                  Producto
                </label>
                <input
                  type="nombre"
                  id="nombre"
                  name="nombre"
                  placeholder="Producto"
                  className="font-black w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  value={nombre}
                  onChange={onChange}
                />
                <input
                  type="descripcion"
                  id="descripcion"
                  name="descripcion"
                  placeholder="Descripcion"
                  className="font-black w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  value={descripcion}
                  onChange={onChange}
                />
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  placeholder="Stock"
                  className="font-black w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  value={stock}
                  onChange={onChange}
                />
                <input
                  type="number"
                  id="precio"
                  name="precio"
                  placeholder="Precio"
                  className="font-black w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  value={precio}
                  onChange={onChange}
                />
                <label className="uppercase text-gray-600 block text-lx font-bold">
                  Imagen Producto
                </label>
                <input
                  type="text"
                  id="imagen"
                  name="imagen"
                  placeholder="Imagen Producto"
                  className="font-black w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  value={imagen}
                  onChange={onChange}
                />
              </div>
              <input
                type="submit"
                value="Crear Producto"
                className="bg-blue-900 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-zinc-800 hover:text-black transition-colors"
              />
              <Link
                className="block text-center my-5 font-black text-white hover:cursor-pointer hover:text-black transition-colors"
                to={`/admin?nombreUsuario=${nombreUsuario}`}
              >
                Atras
              </Link>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default CrearProducto;
