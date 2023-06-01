import React from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const CerrarSesion = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const habilitarDeshabilitarCerrarSesion = () => {
    const token = localStorage.getItem('token');
    if (token) {
      return false;
    } else {
      return true;
    }
  };
  const habilitarCerrarSesion = habilitarDeshabilitarCerrarSesion();

  const habilitarDeshabilitarIniciarSesion = () => {
    const token = localStorage.getItem('token');
    if (token) {
      return 'none';
    } else {
      return 'block';
    }
  };

  const habilitarIniciarSesion = habilitarDeshabilitarIniciarSesion();

  let {search} = useLocation();
  let query = new URLSearchParams(search);
  let nombre = query.get('nombreUsuario');
  if (nombre) {
    nombre = nombre.toUpperCase();
  }

  var panelControl = '';

  if (habilitarIniciarSesion === 'none') {
    panelControl = 'Panel de Control';
  }

  return (
    <header className="px-4 py-5 bg-gradient-to-t from-white via-neutral-400 to-neutral-400">
      <div className="md:flex md:justify-between">
        <h2 className="tracking-tight text-transparent text-4xl incline bg-gradient-to-r from-black via-blue-600 to-black bg-clip-text font-black text-left mb-5 md:mb-0">
          {panelControl}
        </h2>
        <h3 className="tracking-tight text-transparent text-4xl incline bg-gradient-to-r from-black via-blue-600 to-black bg-clip-text font-black text-left mb-5 md:mb-0">
          {nombre}
        </h3>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <Link
            style={{display: habilitarIniciarSesion}}
            className="block text-center mb-5 bg-blue-900 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-zinc-800 transition-colors"
            to={'/login'}
          >
            Iniciar Sesion
          </Link>
          <input
            hidden={habilitarCerrarSesion}
            type="submit"
            value="Cerrar Sesion"
            className="bg-blue-900 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-zinc-800 hover:text-black transition-colors"
            onClick={CerrarSesion}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
