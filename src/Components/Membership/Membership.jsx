import style from './Membership.module.css';
import logoOscuro from '../../Assets/Img/logoOscuro.png';
import flecha from '../../Assets/Img/flecha.png';
import corazon from '../../Assets/Img/corazon.png';
import rayo from '../../Assets/Img/rayo.png';
import chat from '../../Assets/Img/chat.png';
import { useDispatch } from 'react-redux';
import { setData } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';

const Membership = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className={style.Membership}>

            <div className={style.head}>
                <h4 className={style.h4Head}>Consciente By Aleja M</h4>
                <img src={logoOscuro} alt="logoOscuro" className={style.imgHead} />
            </div>

            <h3 className={style.membresia}>
                Membresía Esencial
                <br />
                14,99 usd / mes
            </h3>

            <div className={style.membership}>
                <div
                    className={style.botonSumate}
                    onClick={() => navigate("/pagos")}
                >
                    <h4 className={style.h4BotonSumate}>Súmate</h4>
                </div>
                <h4 className={style.tituloTexto}>ESTA MEMBRESÍA INCLUYE</h4>
                <div className={style.divSubtitulo}>
                    <img src={corazon} alt="corazon" className={style.imgSubtitulo} />
                    <h4 className={style.subtitulo}>
                        Contenido nuevo cada semana:
                    </h4>
                </div>
                <h4 className={style.texto}>
                    Acceso ilimitado a nuestra biblioteca de recursos y contenido exclusivo sobre ejercicio, hábitos saludables, productividad, cocina saludable, meditación y más. Tus mismos objetivos de bienestar.
                </h4>
                <div className={style.divSubtitulo}>
                    <img src={rayo} alt="rayo" className={style.imgSubtitulo} />
                    <h4 className={style.subtitulo}>
                        Cápsulas de contenido con expertos:
                    </h4>
                </div>
                <h4 className={style.texto}>
                    Disfruta de cápsulas de contenido especializadas con otros expertos en yoga, psicología, diversos entrenamientos y talleres con invitados especiales.
                </h4>
                <div className={style.divSubtitulo}>
                    <img src={chat} alt="chat" className={style.imgSubtitulo} />
                    <h4 className={style.subtitulo}>
                        Comunidad activa:
                    </h4>
                </div>
                <h4 className={style.texto}>
                    Únete a una comunidad donde podrás compartir experiencias, recibir apoyo y conectar con personas que comparten tus mismos objetivos de bienestar.
                </h4>
            </div>

            <div
                className={style.boton}
                onClick={() => navigate("/pagos")}
            >
                <img src={flecha} alt="flecha" className={style.flecha} />
            </div>

            <h4
                className={style.cerrarSesion}
                onClick={() => {
                    localStorage.removeItem("usuario");
                    dispatch(setData());
                }}
            >
                Cerrar Sesión</h4>

        </div>
    );
};

export default Membership;