import React, {useEffect, useState} from 'react';

import Header from './Header';
import Sidebar from './Sidebar';
import crud from '../conexiones/crud';
import {Link} from 'react-router-dom';

const Home = () => {
  const [categoria, setCategoria] = useState([]);

  const cargarCategorias = async () => {
    const response = await crud.GETInvitado(`/api/categorias`);
    setCategoria(response.categoria);
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  return (
    <>
      <Header />
      <div className="md:flex md:min-h-screen">
        <Sidebar />
        <main className="flex-1">
          <div className="mt-10 flex justify-center">
            <h1 className="incline bg-gradient-to-r from-indigo-200 via-blue-600 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
              Categorias
            </h1>
          </div>
          <div className="mt-10 flex justify-center">
            <table>
              <thead className="bg-white">
                <tr>
                  <th>Imagen</th>
                  <th>Nombre</th>
                </tr>
              </thead>
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
                        to={`/productos-usuario?id=${item._id}`}
                      >
                        {item.nombre}
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

export default Home;
