import style from './Login.module.css';
import conscienteOscuro from '../../Assets/Img/conscienteOscuro.png';
import logoBlanco from '../../Assets/Img/logoBlanco.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addData } from '../../redux/actions';
import { useEffect, useState } from 'react';
import ver from "../../Assets/Img/ver.png";
import noVer from "../../Assets/Img/noVer.png";

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data = useSelector(state => state.data);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState("password");

    const handleChange = (e) => {
        if (e.target.id === 'email') setEmail(e.target.value);
        if (e.target.id === 'password') setPassword(e.target.value);
    };

    const handleVer = () => {
        const ver = document.getElementById(`ver`);
        const noVer = document.getElementById(`nover`);
        if (type === "password") {
            setType("text");
            ver.style.display = "block";
            noVer.style.display = "none";
        } else {
            ver.style.display = "none";
            noVer.style.display = "block";
            setType("password");
        }
    };

    const handleSend = () => {
        if (password !== "") {
            dispatch(addData({
                email: email.toLowerCase(),
                password,
                url: "login"
            }))
        }
    };

    useEffect(() => {
        if (data.usuario) {
            localStorage.setItem("usuario", JSON.stringify(data.usuario));
            if (data.usuario.membresia) {
                navigate('/wall')
            } else {
                navigate('/membership')
            };
        }
    }, [data, navigate]);

    return (
        <div className={style.Login}>

            <div className={style.bienvenida}>
                <h3 className={style.h3Bienvenida}>Bienvenida</h3>
                <img src={conscienteOscuro} alt="conscienteOscuro" className={style.imgBienvenida} />
            </div>

            <div className={style.IniciaSesion}>
                <div className={style.iniciaSesion}>
                    <h3 className={style.h3IniciaSesion}>Inicia Sesión</h3>
                    <img src={logoBlanco} alt="logoBlanco" className={style.imgIniciaSesion} />
                </div>
                <div className={style.divCorreo}>
                    <h5 className={style.h5IniciaSesion}>Email</h5>
                    <div className={style.divInput}>
                        <input
                            id='email'
                            type="text"
                            className={style.input}
                            value={email}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className={style.divPassword}>
                    <h5 className={style.h5IniciaSesion}>Contraseña</h5>
                    <div className={style.divInput}>
                        <input 
                            id='password'
                            type={type}
                            className={style.input}
                            value={password}
                            onChange={handleChange}
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
                <div className={style.divEspacio}></div>
                <div
                    className={style.boton}
                    onClick={() => handleSend()}
                >
                    <h5 className={style.h5Boton}>Siguiente</h5>
                </div>
                <div className={style.login}>
                    <Link to="/recuperar" className={style.aRegistryL}>¿Olvidaste tu contraseña?</Link>
                    <Link to="/registry" className={style.aRegistryR}>Registrate</Link>
                </div>
            </div>

        </div>
    );
};

export default Login;