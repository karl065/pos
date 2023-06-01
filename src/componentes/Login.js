import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import swal from 'sweetalert';
import crud from '../conexiones/crud';

const Login = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    email: '',
    password: '',
  });

  const {email, password} = usuario;

  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const iniciarSesion = async () => {
    if (email === '') {
      const mensaje = 'Introduzca un email valido';
      swal({
        title: 'Error',
        text: mensaje,
        icon: 'error',
        buttons: false,
        timer: 1500,
      });
    } else if (password === '') {
      const mensaje = 'Introduzca un password valido';
      swal({
        title: 'Error',
        text: mensaje,
        icon: 'error',
        buttons: false,
        timer: 1500,
      });
    } else {
      const data = {
        email: usuario.email,
        password: usuario.password,
      };
      const response = await crud.POST('/api/auth', data);
      const mensaje = response.msg;

      if (mensaje === 'Usuario o Password incorrecto') {
        swal({
          position: 'top-end',
          icon: 'error',
          title: mensaje,
          buttons: false,
          timer: 1500,
        });

        setUsuario({
          email: '',
          password: '',
        });
      } else {
        swal({
          position: 'top-end',
          icon: 'success',
          title: 'Sesion iniciada con Exito!',
          buttons: false,
          timer: 1000,
        });
        let usuarioNombre = await crud.GET(`/api/usuarios/email/${email}`);
        let nombreUsuario = '';

        for (var prop in usuarioNombre) {
          usuarioNombre = usuarioNombre[prop];
          for (let i = 0; i < usuarioNombre.length; i++) {
            nombreUsuario = usuarioNombre[i];
          }
        }

        setUsuario({
          email: '',
          password: '',
        });
        const token = response.token;

        localStorage.setItem('token', token);

        navigate(`/admin?nombreUsuario=${nombreUsuario.nombre}`);
      }
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    iniciarSesion();
  };

  return (
    <main className="container mx-auto  mt-5 md:mt-20 p-5 md:flex md:justify-center">
      <div className="md:w-2/3 lg:w-2/5">
        <h1 className="incline bg-gradient-to-r from-indigo-200 via-blue-600 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
          Bienvenidos al POS
        </h1>
        <h1 className="incline bg-gradient-to-r from-indigo-200 via-blue-600 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
          Iniciar Sesion
        </h1>
        <form
          className="my-10 bg-blue-300 shadow rounded-lg p-10"
          onSubmit={onSubmit}
        >
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-lx font-bold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Ingrese su Email"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={email}
              onChange={onChange}
            />
            <label className="uppercase text-gray-600 block text-lx font-bold">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={password}
              onChange={onChange}
            />
          </div>
          <input
            type="submit"
            value="Iniciar Sesion"
            className="bg-blue-900 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-zinc-800 transition-colors"
          />

          <Link className="block text-center my-5" to={'/crear-cuenta'}>
            Crear Cuenta
          </Link>
          <Link className="block text-center my-5" to={'/'}>
            Atras
          </Link>
        </form>
      </div>
    </main>
  );
};

export default Login;
