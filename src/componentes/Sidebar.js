import React from 'react';
import {Link, useLocation} from 'react-router-dom';

const Sidebar = () => {
  let {search} = useLocation();
  let query = new URLSearchParams(search);
  let nombreUsuario = query.get('nombreUsuario');
  let idCategoria = query.get('id');

  let verificarUsuario = '';

  if (nombreUsuario === null) {
    nombreUsuario = '';
  }

  if (!nombreUsuario) {
    verificarUsuario = '/ver-productos-usuario';
  } else {
    verificarUsuario = '/ver-productos';
  }

  const habilitarCrearCategoria = () => {
    if (!idCategoria || !nombreUsuario) {
      if (verificarUsuario === '/ver-productos-usuario') {
        return 'none';
      }
    } else {
      return 'block';
    }
  };
  let habilitarCategoria = habilitarCrearCategoria();

  return (
    <aside className="lg:w-50 px-4 py-5 bg-gradient-to-b from-white via-neutral-400 to-black">
      <div className="flex">
        <Link
          style={{display: habilitarCategoria}}
          className="bg-blue-900 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-zinc-800 hover:text-black transition-colors"
          to={`/crear-categoria?nombreUsuario=${nombreUsuario}`}
        >
          Crear Categoria
        </Link>
      </div>
      <div>
        <Link
          className="bg-blue-900 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-zinc-800 hover:text-black transition-colors"
          to={`${verificarUsuario}?nombreUsuario=${nombreUsuario}`}
        >
          Ver productos
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
