import style from "./Recuperar.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import atras from "../../../Assets/Img/atras.png";
import { useDispatch } from "react-redux";
import { recoverPassword } from "../../../redux/actions";

const Recuperar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [correo, setCorreo] = useState("");
    const [verificado, setVerificado] = useState(false);

    const handleChange = (e) => {
        setCorreo(e.target.value);
    };

    const sendEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(correo)) {
            dispatch(recoverPassword(correo.toLowerCase()));
            setCorreo("");
            navigate(-1);
        } else {
            setVerificado(true);
        }
    };

    return (
        <div className={style.Recuperar}>

            <img
                className={style.atras}
                onClick={() => navigate(-1)}
                src={atras}
                alt="atras"
            />

            <h1 className={style.titulo}>Recuperar contraseña</h1>

            <div className={style.inputs}>
                {
                    verificado &&
                    <h5 className={style.error}>Por favor, ingrese un correo electrónico válido</h5>
                }
                <div className={style.divInput}>
                    <input
                        type="email"
                        placeholder="Ingrese su correo electrónico"
                        className={style.input}
                        value={correo}
                        onChange={handleChange}
                        onKeyDown={e => { if (e.key === 'Enter' && correo !== "") sendEmail()}}
                    />
                </div>
            </div>

            <div
                className={style.boton}
                onClick={() => correo !== "" && sendEmail()}
            >
                <h4 className={style.h4Boton}>Enviar</h4>
            </div>

        </div>
    )
}

export default Recuperar;