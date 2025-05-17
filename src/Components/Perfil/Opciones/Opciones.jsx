import { Link, useNavigate, useParams } from "react-router-dom";
import style from "./Opciones.module.css";
import atras from "../../../Assets/Img/atras.png";
import noVer from "../../../Assets/Img/noVer.png";
import ver from "../../../Assets/Img/ver.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../../redux/actions";
import Swal from "sweetalert2";



const Opciones = () => {

    const { opcion } = useParams();
    const navigate = useNavigate();
    const emailGlobal = useSelector(state => state.data.usuario.email);
    const [ email, setEmail ] = useState("");
    const [type, setType] = useState("password");
    const [actual, setActual] = useState("");
    const [nueva, setNueva] = useState("");
    const [confirmar, setConfirmar] = useState("");
    const dispatch = useDispatch();

    const handleChange = (e) => {
        if (e.target.placeholder === "Contraseña actual") setActual(e.target.value);
        if (e.target.placeholder === "Nueva contraseña") setNueva(e.target.value);
        if (e.target.placeholder === "Confirmar nueva contraseña") setConfirmar(e.target.value);
    };

    const handleVer = () => {
        const ver = document.querySelectorAll(`.${style.ver}`);
        const noVer = document.querySelectorAll(`.${style.nover}`);
        if (type === "password") {
            setType("text");
            ver.forEach(element => element.style.display = "block");
            noVer.forEach(element => element.style.display = "none");
        } else {
            setType("password");
            ver.forEach(element => element.style.display = "none");
            noVer.forEach(element => element.style.display = "block");
        }
    };

    const validarContraseña = (str) => {
        if (str.length < 8) return false;
        const tieneLetras = /[a-zA-Z]/.test(str);
        const tieneNumeros = /[0-9]/.test(str);
        return tieneLetras && tieneNumeros;
    };

    useEffect(() => {
        if (emailGlobal) setEmail(emailGlobal);
    }, [emailGlobal]);

    return (
        <div className={style.Opciones}>

            <img
                className={style.atras}
                onClick={() => navigate(-1)}
                src={atras}
                alt="atras"
            />

            {opcion === "aleja" &&
                <div className={style.aleja}>
                    <h1 className={style.titulo}>¡Hola! Soy Aleja Márquez, wellness coach.
                    </h1>
                    <h3 className={style.texto}>
                        Soy chef, coach en cambio de hábitos e instructora de pilates, pero sobre todo, soy una persona apasionada por el bienestar y el equilibrio.
                        <br />
                        <br />
                        A través de mi contenido, mis recetarios, talleres, retiros y la membresía CONSCIENTE by aleja m acompaño a miles de personas a crear una vida más saludable, sin restricciones ni extremos, disfrutando el proceso.
                        <br />
                        <br />
                        Durante mucho tiempo creí que llevar un estilo de vida saludable significaba seguir reglas estrictas y llenas de sacrificios. Sin embargo, con el tiempo descubrí que el verdadero bienestar no se trata de perfección, sino de consciencia y balance.
                        <br />
                        <br />
                        Mi camino me llevó a formarme en diferentes áreas: desde la cocina saludable hasta la ciencia de los hábitos y el movimiento consciente con pilates. Hoy comparto mis conocimientos con una comunidad increíble que, como yo, busca sentirse bien sin presiones ni culpas.
                        <br />
                        <br />
                        Creo en un bienestar holístico en el que la alimentación, el movimiento, la mente y las emociones trabajan en conjunto para que te sientas mejor cada día.
                        <br />
                        <br />
                        ¡Gracias por confiar en mí para acompañarte y guiarte en tu camino hacia una vida llena de bienestar!
                    </h3>
                </div>
            }

            {opcion === "contacto" &&
                <div className={style.contacto}>
                    <h1 className={style.titulo}>Contáctanos</h1>
                    <h3 className={style.texto}>
                        Si tienes alguna duda, sugerencia o simplemente quieres ponerte en contacto conmigo, puedes escribirme a mi correo electronico.
                    </h3>
                    <Link
                        className={style.correo}
                        to="mailto:correo@example.com"
                    >
                        info@alejandramarquezv.com
                    </Link>
                    <h3 className={style.texto}>
                        Estoy aquí para ayudarte y acompañarte en tu camino hacia el bienestar. ¡Espero saber de ti pronto!
                    </h3>
                </div>
            }

            {opcion === "cambiar_contraseña" &&
                <div className={style.cambiarContraseña}>
                    <h1 className={style.titulo}>Cambiar contraseña</h1>
                    <div className={style.inputs}>
                        <div className={style.divInput}>
                            <input
                                type={type}
                                placeholder="Contraseña actual"
                                className={style.input}
                                value={actual}
                                onChange={handleChange}
                            />
                            <img
                                src={ver}
                                alt="ver"
                                className={style.ver}
                                onClick={() => handleVer()}
                            />
                            <img
                                src={noVer}
                                alt="noVer"
                                className={style.nover}
                                onClick={() => handleVer()}
                            />
                        </div>
                        <div className={style.divInput}>
                            <input
                                type={type}
                                placeholder="Nueva contraseña"
                                className={style.input}
                                value={nueva}
                                onChange={handleChange}
                            />
                            <img
                                src={ver}
                                alt="ver"
                                className={style.ver}
                                onClick={() => handleVer()}
                            />
                            <img
                                src={noVer}
                                alt="noVer"
                                className={style.nover}
                                onClick={() => handleVer()}
                            />
                        </div>
                        <div className={style.divInput}>
                            <input
                                type={type}
                                placeholder="Confirmar nueva contraseña"
                                className={style.input}
                                value={confirmar}
                                onChange={handleChange}
                            />
                            <img
                                src={ver}
                                alt="ver"
                                className={style.ver}
                                onClick={() => handleVer()}
                            />
                            <img
                                src={noVer}
                                alt="noVer"
                                className={style.nover}
                                onClick={() => handleVer()}
                            />
                        </div>
                    </div>
                    <div
                        className={style.boton}
                        onClick={() => {
                            if (nueva !== confirmar) {
                                Swal.fire({
                                    title: "Las contraseñas no coinciden",
                                    text: "Por favor, verifica que ambas contraseñas sean iguales.",
                                    icon: "warning",
                                    confirmButtonText: "Aceptar",
                                });
                            } else if (validarContraseña(nueva) && nueva === confirmar) {
                                dispatch(changePassword({
                                    actual,
                                    nueva,
                                    email
                                }))
                                navigate(-1)
                            }
                        }}
                    >
                        <h4 className={style.h4Boton}>Cambiar</h4>
                    </div>
                </div>
            }

        </div>
    )
}

export default Opciones;