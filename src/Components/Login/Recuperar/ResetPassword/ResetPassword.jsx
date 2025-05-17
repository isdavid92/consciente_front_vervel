import { useLocation, useNavigate } from "react-router-dom";
import style from "./ResetPassword.module.css";
import noVer from "../../../../Assets/Img/noVer.png";
import ver from "../../../../Assets/Img/ver.png";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../../../redux/actions";
import Swal from "sweetalert2";

const ResetPassword = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { pathname: path } = useLocation();
    const token = path.split("/").pop();
    const [type, setType] = useState("password");
    const [nueva, setNueva] = useState("");
    const [confirmar, setConfirmar] = useState("");

    const handleChange = (e) => {
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

    return (
        <div className={style.ResetPassword}>

            <h1 className={style.titulo}>Recuperar contraseña</h1>


            <div className={style.inputs}>
                <p className={style.pContraseña}>La contraseña debe tener al menos 8 caracteres, una letra y un número.</p>
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
                        dispatch(resetPassword({
                            nueva,
                            token
                        }));
                        navigate("/")
                    }
                }}
            >
                <h4 className={style.h4Boton}>Cambiar</h4>
            </div>

        </div>
    )
};

export default ResetPassword;