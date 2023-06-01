import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import crud from '../conexiones/crud';
import swal from 'sweetalert';

const Productos = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
      }
    };
    autenticarUsuario();
  }, [navigate]);

  let {search} = useLocation();
  let query = new URLSearchParams(search);

  let idCategoria = query.get('id');
  let nombre = query.get('nombre');
  let nombreUsuario = query.get('nombreUsuario');

  const [productos, setProductos] = useState([]);

  const cargarProductos = async () => {
    const response = await crud.GET(`/api/productos/${idCategoria}`);
    setProductos(response.productos);
  };
  useEffect(() => {
    cargarProductos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const eliminarProducto = async (e, idCategoria, idProducto) => {
    e.preventDefault();

    const valor = await swal('Esta seguro?', {
      icon: 'warning',
      dangerMode: true,
      buttons: {
        confirm: {
          text: 'Si',
          value: true,
          visible: true,
          closeModal: true,
        },
        deny: {
          text: 'No',
          value: null,
          visible: true,
          closeModal: true,
        },
      },
    });

    if (valor === true) {
      const response = await crud.DELETE(
        `/api/productos/${idCategoria}/${idProducto}`
      );
      const mensaje = response.msg;
      swal({
        text: mensaje,
        icon: 'success',
        buttons: false,
        timer: 2000,
      });
      console.log(response.msg);
      window.location.reload(3000);
    } else {
      swal({
        text: 'No se elimino la producto',
        icon: 'info',
        buttons: false,
        timer: 2000,
      });
    }
  };

  return (
    <>
      <Header />
      <div className="md:flex md:min-h-screen">
        <Sidebar />
        <main className="flex-1">
          <div className="mt-10 flex justify-center">
            <h1 className="incline bg-gradient-to-r from-indigo-200 via-blue-600 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
              {nombre}
            </h1>
          </div>
          <div className="mt-10 flex justify-center">
            <table>
              <thead className="bg-white">
                <tr>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Descripcion</th>
                  <th>Stock</th>
                  <th>Precio</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {productos.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <img
                        src={item.imagen}
                        width="300"
                        height="300"
                        alt="imagen producto"
                      ></img>
                    </td>
                    <td>
                      <input
                        type="submit"
                        value={item.nombre}
                        className="bg-blue-900 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-zinc-800 hover:text-black transition-colors"
                        //onClick={CerrarSesion}
                      />
                    </td>
                    <td>
                      <input
                        type="submit"
                        value={item.descripcion}
                        className="bg-blue-900 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-zinc-800 hover:text-black transition-colors"
                        //onClick={CerrarSesion}
                      />
                    </td>
                    <td>
                      <input
                        type="submit"
                        value={item.stock}
                        className="bg-blue-900 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-zinc-800 hover:text-black transition-colors"
                        //onClick={CerrarSesion}
                      />
                    </td>
                    <td>
                      <input
                        type="submit"
                        value={item.precio}
                        className="bg-blue-900 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-zinc-800 hover:text-black transition-colors"
                        //onClick={CerrarSesion}
                      />
                    </td>
                    <td>
                      <Link
                        type="submit"
                        value="Actualizar"
                        className="text-center bg-blue-900 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-zinc-800 hover:text-black transition-colors"
                        to={`/actualizar-producto?idCategoria=${idCategoria}&id=${item._id}&nombre=${item.nombre}&descripcion=${item.descripcion}&stock=${item.stock}&precio=${item.precio}&imagen=${item.imagen}&nombreCategoria=${nombre}`}
                      >
                        Actualizar
                      </Link>
                      <input
                        type="submit"
                        value="Eliminar"
                        className="bg-blue-900 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-zinc-800 hover:text-black transition-colors"
                        onClick={(e) =>
                          eliminarProducto(e, idCategoria, item._id)
                        }
                      />
                      <Link
                        type="submit"
                        value="Atras"
                        className="text-center bg-blue-900 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-zinc-800 hover:text-black transition-colors"
                        to={`/admin?nombreUsuario=${nombreUsuario}`}
                      >
                        Atras
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
};

export default Productos;
