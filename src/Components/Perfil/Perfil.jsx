import { useDispatch, useSelector } from "react-redux";
import style from "./Perfil.module.css";
import { useEffect, useState } from "react";
import logoBlanco from "../../Assets/Img/logoBlanco.png";
import { useNavigate } from "react-router-dom";
import { setData } from "../../redux/actions";

const Perfil = () => {
    const usuarioGlobal = useSelector(state => state.data.usuario);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [fecha, setFecha] = useState(null);

    const handleTiempo = () => {
        if (fecha) {
            const { dia, mes, año } = fecha;
            const fechaOriginal = new Date(año, mes - 1, dia);
            fechaOriginal.setDate(fechaOriginal.getDate() + 30);
            const meses = [
                "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
            ];
            const nuevoDia = fechaOriginal.getDate();
            const nuevoMes = meses[fechaOriginal.getMonth()];
            const nuevoAño = fechaOriginal.getFullYear();
            return `${nuevoDia} ${nuevoMes} ${nuevoAño}`;
        }
    };

    useEffect(() => {
        if (usuarioGlobal) {
            setNombre(usuarioGlobal.nombre);
            setApellido(usuarioGlobal.apellido);
            setEmail(usuarioGlobal.email);
            setFecha(usuarioGlobal.fecha_inscripcion);
        };
    }, [usuarioGlobal]);

    return (
        <div className={style.Perfil}>

            <div className={style.head}>
                <h4 className={style.h4Head}>Consciente By Aleja M</h4>
                <img src={logoBlanco} alt="logoBlanco" className={style.imgHead} />
            </div>

            <div className={style.info}>
                <div className={style.siglas}>
                    <h1 className={style.h1Siglas}>
                        {nombre.charAt(0)}
                        {apellido.charAt(0)}
                    </h1>
                </div>
                <h2 className={style.nombre}>{nombre} {apellido}</h2>
                <h3 className={style.email}>{email}</h3>
            </div>

            <div className={style.Plan}>
                <div className={style.planL}>
                    <h3 className={style.subtituloPlan}>Plan activo:</h3>
                    <h3 className={style.plan}>MEMBRESÍA ESENCIAL</h3>
                </div>
                <div className={style.planR}>
                    <h3 className={style.renovacion}>Renovación: {handleTiempo()}</h3>
                </div>
            </div>

            <div className={style.menu}>
                <h4
                    className={style.h4Menu}
                    onClick={() => navigate(`/opciones/aleja`)}
                >
                    Quién es Aleja Márquez</h4>
                <h4
                    className={style.h4Menu}
                    onClick={() => navigate(`/opciones/contacto`)}
                >
                    Contáctanos</h4>
                <h4
                    className={style.h4Menu}
                    onClick={() => navigate(`/opciones/cambiar_contraseña`)}
                >
                    Cambiar contraseña</h4>
                <h4
                    className={style.h4Menu}
                    onClick={() => {
                        dispatch(setData());
                        localStorage.removeItem("usuario");
                    }}
                >
                    Cerrar Sesión</h4>
            </div>

        </div>
    )
};

export default Perfil;