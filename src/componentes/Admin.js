import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import crud from '../conexiones/crud';
import swal from 'sweetalert';

const Admin = () => {
  const navigate = useNavigate();

  let {search} = useLocation();
  let query = new URLSearchParams(search);

  let nombreUsuario = query.get('nombreUsuario');
  if (nombreUsuario) {
    nombreUsuario = nombreUsuario.toUpperCase();
  }

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
      }
    };
    autenticarUsuario();
  }, [navigate]);

  const [categoria, setCategoria] = useState([]);

  const cargarCategorias = async () => {
    const response = await crud.GET(`/api/categorias`);
    setCategoria(response.categoria);
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  const eliminarCategoria = async (e, idCategoria) => {
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
      const response = await crud.DELETE(`/api/categorias/${idCategoria}`);
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
        text: 'No se elimino la categoria',
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
            <h1 className="incline bg-gradient-to-r uppercase from-indigo-200 via-blue-600 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
              Categorias
            </h1>
          </div>
          <div className="mt-10 flex justify-center">
            <table>
              <tbody className="bg-white">
                {categoria.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <img
                        src={item.imagen}
                        width="300"
                        height="300"
                        alt="imagen categoria"
                      ></img>
                    </td>
                    <td>
                      <Link
                        type="submit"
                        value={item.nombre}
                        className="text-center bg-blue-900 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-zinc-800 hover:text-black transition-colors"
                        to={`/productos?id=${item._id}&nombre=${item.nombre}&nombreUsuario=${nombreUsuario}`}
                      >
                        {item.nombre}
                      </Link>
                    </td>
                    {/*<td>{item._id}</td>*/}
                    <td>
                      <Link
                        type="submit"
                        value="Crear Producto"
                        className="text-center bg-blue-900 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-zinc-800 hover:text-black transition-colors"
                        to={`/crear-producto?id=${item._id}&nombre=${item.nombre}&imagen=${item.imagen}&nombreUsuario=${nombreUsuario}`}
                      >
                        Crear Producto
                      </Link>
                      <Link
                        type="submit"
                        value="Actualizar"
                        className="text-center bg-blue-900 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-zinc-800 hover:text-black transition-colors"
                        to={`/actualizar-categoria?id=${item._id}&nombre=${item.nombre}&imagen=${item.imagen}&nombreUsuario=${nombreUsuario}`}
                      >
                        Actualizar
                      </Link>
                      <input
                        type="submit"
                        value="Eliminar"
                        className="bg-blue-900 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-zinc-800 hover:text-black transition-colors"
                        onClick={(e) => eliminarCategoria(e, item._id)}
                      />
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

export default Admin;
