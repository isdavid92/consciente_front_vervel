import style from "./NavBar.module.css";
import inicio from "../../Assets/Img/inicio.png";
import colecciones from "../../Assets/Img/colecciones.png";
import chatNav from "../../Assets/Img/chatNav.png";
import perfil from "../../Assets/Img/perfil.png";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const NavBar = () => {

    const { pathname: path } = useLocation();
    const [styleInicio, setStyleInicio] = useState(style.imgIcono);
    const [styleColec, setStyleColec] = useState(style.imgIcono);
    const [styleChat, setStyleChat] = useState(style.imgIcono);
    const [stylePerfil, setStylePerfil] = useState(style.imgIcono);

    useEffect(() => {
        path === "/wall" ? setStyleInicio(style.imgBlack) : setStyleInicio(style.imgIcono);
        path === "/colecciones" ? setStyleColec(style.imgBlack) : setStyleColec(style.imgIcono);
        path === "/chat" ? setStyleChat(style.imgBlack) : setStyleChat(style.imgIcono);
        path === "/perfil" ? setStylePerfil(style.imgBlack) : setStylePerfil(style.imgIcono);
    }, [path]);

    return (
        <div className={style.NavBar}>

            <Link className={style.linkIcono} to="/wall" onClick={() => window.scrollTo(0, 0)}>
                <img src={inicio} alt="inicio" className={styleInicio} />
                <h6 className={style.h6Icono}>Inicio</h6>
            </Link>

            <Link className={style.linkIcono} to="/colecciones" onClick={() => window.scrollTo(0, 0)}>
                <img src={colecciones} alt="colecciones" className={styleColec} />
                <h6 className={style.h6Icono}>Colecciones</h6>
            </Link>

            <Link className={style.linkIcono} to="/chat" >
                <img src={chatNav} alt="chatNav" className={styleChat} />
                <h6 className={style.h6Icono}>Chat</h6>
            </Link>

            <Link className={style.linkIcono} to="/perfil" onClick={() => window.scrollTo(0, 0)}>
                <img src={perfil} alt="perfil" className={stylePerfil} />
                <h6 className={style.h6Icono}>Perfil</h6>
            </Link>

        </div>
    )
};

export default NavBar;