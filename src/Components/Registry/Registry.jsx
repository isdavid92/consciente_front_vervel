import style from './Registry.module.css';
import conscienteOscuro from '../../Assets/Img/conscienteOscuro.png';
import logoBlanco from '../../Assets/Img/logoBlanco.png';
import { Link, useNavigate } from 'react-router-dom';
import noVer from "../../Assets/Img/noVer.png";
import ver from "../../Assets/Img/ver.png";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addData } from '../../redux/actions';
import Swal from 'sweetalert2';

const Registry = () => {

    const dispatch = useDispatch();
    const data = useSelector(state => state.data);
    const navigate = useNavigate();
    const [type, setType] = useState("password");
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (e) => {
        if (e.target.id === 'nombre') setNombre(e.target.value);
        if (e.target.id === 'apellido') setApellido(e.target.value);
        if (e.target.id === 'email') setEmail(e.target.value);
        if (e.target.id === 'password') setPassword(e.target.value);
    };

    const valNombre = () => {
        let isValid = /^.{4,29}$/.test(nombre);
        if (!isValid) Swal.fire({
            title: "Nombre muy corto",
            text: "Ingresa tu NOMBRE con mas de 3 caracteres",
            icon: "info",
            confirmButtonText: "Aceptar"
        });
        return isValid
    };

    const valApellido = () => {
        let isValid = /^.{4,29}$/.test(apellido);
        if (!isValid) Swal.fire({
            title: "Apellido muy corto",
            text: "Ingresa tu APELLIDO con mas de 3 caracteres",
            icon: "info",
            confirmButtonText: "Aceptar"
        });
        return isValid
    };

    const valCorreo = () => {
        let isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)
        if (!isValid) Swal.fire({
            title: "Correo electrónico inválido",
            text: "Ingresa una dirección de CORREO electrónico válida",
            icon: "info",
            confirmButtonText: "Aceptar"
        });
        return isValid
    };

    const valPassword = () => {
        const tieneLetras = /[a-zA-Z]/.test(password);
        const tieneNumeros = /[0-9]/.test(password);
        if (password.length < 8 || !tieneLetras || !tieneNumeros) Swal.fire({
            title: "Contraseña inválida",
            text: "La contraseña debe tener al menos 8 caracteres, una letra y un número",
            icon: "info",
            confirmButtonText: "Aceptar"
        });
        return tieneLetras && tieneNumeros;
    };

    const handleSend = () => {
        if (valNombre() && valApellido() && valCorreo() && valPassword()) {
            console.log("Datos enviados:", { nombre, email, password });
            dispatch(addData({
                nombre,
                apellido,
                email: email.toLowerCase(),
                password,
                url: "registry"
            }))
        }
    };

    const handleVer = () => {
        const ver = document.getElementById(`ver`);
        const noVer = document.getElementById(`nover`);
        if (type === "password") {
            setType("text");
            ver.style.display = "block";
            noVer.style.display = "none";
        } else {
            setType("password");
            ver.style.display = "none";
            noVer.style.display = "block";
        }
    };

    useEffect(() => {
        if (data.usuario) {
            localStorage.setItem("usuario", JSON.stringify(data.usuario));
            console.log(JSON.parse(localStorage.getItem("usuario")));
            Swal.fire({
                title: "Registro exitoso!",
                text: `${nombre}, el equipo de Consciente te da la bienvenida!`,
                icon: "success"
            });
            if (data.usuario.membresia) {
                navigate('/wall')
            } else {
                navigate('/membership')
            };
        }
    }, [data, navigate, nombre]);

    return (
        <div className={style.Registry}>

            <div className={style.bienvenida}>
                <img src={conscienteOscuro} alt="conscienteOscuro" className={style.imgBienvenida} />
            </div>

            <div className={style.Registrate}>
                <div className={style.registrate}>
                    <h3 className={style.h3Registrate}>Regístrate</h3>
                    <img src={logoBlanco} alt="logoBlanco" className={style.imgRegistrate} />
                </div>
                <div className={style.Input}>
                    <h5 className={style.h5Registro}>Nombre</h5>
                    <div className={style.divInput}>
                        <input
                            id='nombre'
                            onChange={handleChange}
                            value={nombre}
                            type="text"
                            className={style.input}
                        />
                    </div>
                </div>
                <div className={style.Input}>
                    <h5 className={style.h5Registro}>Apellido</h5>
                    <div className={style.divInput}>
                        <input
                            id='apellido'
                            onChange={handleChange}
                            value={apellido}
                            type="text"
                            className={style.input}
                        />
                    </div>
                </div>
                <div className={style.Input}>
                    <h5 className={style.h5Registro}>Email</h5>
                    <div className={style.divInput}>
                        <input
                            id='email'
                            onChange={handleChange}
                            value={email}
                            type="text"
                            className={style.input}
                        />
                    </div>
                </div>
                <div className={style.Input}>
                    <h5 className={style.h5Registro}>Contraseña</h5>
                    <div className={style.divInput}>
                        <input
                            id='password'
                            onChange={handleChange}
                            value={password}
                            type={type}
                            className={style.input}
                            onKeyDown={e => e.key === 'Enter' && handleSend()}
                        />
                        <img
                            id='ver'
                            src={ver}
                            alt="ver"
                            className={style.ver}
                            onClick={() => handleVer()}
                        />
                        <img
                            id='nover'
                            src={noVer}
                            alt="noVer"
                            className={style.nover}
                            onClick={() => handleVer()}
                        />
                    </div>
                </div>
                <div className={style.boton} onClick={() => handleSend()}>
                    <h5 className={style.h5Boton}>Siguiente</h5>
                </div>
                <div className={style.login}>
                    <Link to="/" className={style.aLoginL}>¿Ya tienes cuenta?</Link>
                    <Link to="/" className={style.aLoginR}>Iniciar Sesión</Link>
                </div>
            </div>

        </div>
    );
};

export default Registry;