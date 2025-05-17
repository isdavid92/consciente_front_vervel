import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login';
import Registry from './Components/Registry/Registry';
import Membership from './Components/Membership/Membership';
import Wall from './Components/Wall/Wall';
import NavBar from './Components/NavBar/NavBar';
import Colecciones from './Components/Colecciones/Colecciones';
import Chat from './Components/Chat/Chat';
import Perfil from './Components/Perfil/Perfil';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addData, contFilter } from './redux/actions';
import Comentarios from './Components/Wall/Contenido/Detalles/Comentarios/Comentarios';
import Subcategorias from './Components/Colecciones/Subcategorias/Subcategorias';
import Opciones from './Components/Perfil/Opciones/Opciones';
import Recuperar from './Components/Login/Recuperar/Recuperar';
import ResetPassword from './Components/Login/Recuperar/ResetPassword/ResetPassword';
import Pagos from './Components/Pagos/Pagos';



function App() {
  
  const { pathname: path } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector(state => state.data);

  useEffect(() => { // Verifica si hay un usuario en el localStorage y lo agrega al estado global
    const usuarioLocal = JSON.parse(localStorage.getItem("usuario"));
    if (usuarioLocal && usuarioLocal.nombre) {
      dispatch(addData({
        usuario: usuarioLocal,
        url: "localStorage"
      }));
    }
  }, [dispatch]);

  useEffect(() => { // Mantiene el filtro en el estado global vacio
    const isFilter = path.includes("filtro");
    !isFilter && dispatch(contFilter(null));
  }, [path, dispatch]);

  useEffect(() => { // Verifica si el usuario está logueado y redirige a login si no lo está
    path !== "/recuperar" && path !== "/registry" && !path.includes("reset-password") && !data.usuario && navigate("/");
  }, [path, data, navigate]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/recuperar" element={<Recuperar />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/registry" element={<Registry />} />
        <Route
          path="/membership"
          element={
            data.usuario &&
            <>
              <Membership />
              <Wall />
            </>
          }
        />
        <Route path="/pagos" element={<Pagos />} />
        <Route path="/wall" element={<Wall />} />
        <Route path="/comentarios/:id" element={<Comentarios />} />
        <Route path="/colecciones/" element={<Colecciones />} />
        <Route path="/colecciones/:categoria" element={<Subcategorias />} />
        <Route path="/colecciones/:categoria/filtro" element={<Wall />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/opciones/:opcion" element={<Opciones />} />
      </Routes>
      {
        (path === "/wall" || path === "/chat" || path === "/perfil" || path === "/colecciones" || path.startsWith("/colecciones")) &&
        <NavBar />
      }
    </div>
  );
}

export default App;
