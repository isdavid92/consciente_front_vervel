import { useLocation, useNavigate } from "react-router-dom";
import style from "./Detalles.module.css";
import candado from "../../../../Assets/Img/candado.png";
import like from "../../../../Assets/Img/like.png";
import chat from "../../../../Assets/Img/chat.png";
import { useDispatch, useSelector } from "react-redux";
import { addSetLike } from "../../../../redux/actions";
import { use, useEffect, useState } from "react";
import React from "react";

const Detalles = ({ contenido }) => {

    const { title, subtitle, description, comentarios, likes, fecha, id } = contenido;
    const membresia = useSelector(state => state.data.usuario.membresia);
    const email = useSelector(state => state.data.usuario.email);
    const [mostrarCompleto, setMostrarCompleto] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { pathname } = useLocation();


    const handleTiempo = () => {
        const segundos = Math.floor((Date.now() - new Date(fecha.año, fecha.mes - 1, fecha.dia, fecha.hora.hora, fecha.hora.minuto)) / 1000);
        const formatos = [[31536000, 'año'], [2592000, 'mes'], [86400, 'día'], [3600, 'hora'], [60, 'minuto'], [1, 'segundo']];
        const [valor, nombre] = formatos.find(([v]) => segundos >= v) || [1, 'segundo'];
        const cantidad = Math.floor(segundos / valor);
        return `hace ${cantidad} ${nombre}${cantidad > 1 ? 's' : ''}`;
    };

    const handleDescripcion = () => {
        return (
            <>
                {description.split('\n').map((linea, index) => (
                    <React.Fragment key={index}>
                        {linea}
                        {index < description.split('\n').length - 1 && <br />}
                    </React.Fragment>
                ))}
            </>
        )
    };

    const handleLinks = (links) => {
        return (
            <>
                {pathname !== "/membership" &&
                    <div className={style.links}>
                        {links.map((link, index) =>
                            <a
                                key={index}
                                href={link.link}
                                target="_blank"
                                className={style.link}
                                rel="noopener noreferrer"
                            >
                                {link.nombre}
                            </a>
                        )}
                    </div>
                }
            </>
        )
    };

    const handleStileLike = () => {
        if (likes.includes(email)) {
            return style.imgLikes;
        } else {
            return style.imgLikesClaro;
        }
    };

    return (
        <div className={style.Detalles}>

            <div className={style.detalles}>
                <h2 className={style.titulo}>
                    {title}
                </h2>
                <h3 className={style.subtitulo}>
                    {subtitle}
                </h3>
                <h5 className={style.tiempo}>
                    {handleTiempo()}
                </h5>
                <h4 className={style.descripcion}>
                    {!mostrarCompleto && description.length > 100 ? `${description.slice(0, 100)}... ` : handleDescripcion()}{" "}
                    {description.length > 100 &&
                        <span
                            className={style.leerMas}
                            onClick={() => {
                                setMostrarCompleto(!mostrarCompleto);
                            }}
                        >
                            {mostrarCompleto ? 'Leer menos' :' Leer más'}
                        </span>
                    }
                    {contenido.links ? handleLinks(contenido.links) : null}
                </h4>
            </div>

            {!membresia &&
                <div
                    className={style.linkDesbloquear}
                    onClick={() => navigate("/pagos")}
                >
                    <img src={candado} alt="candado" className={style.imgDesbloquear} />
                    <h4 className={style.h4Desbloquear}>Súmate para desbloquear</h4>
                </div>
            }

            {membresia &&
                <div className={style.footerDetalles}>
                    <div className={style.likes}>
                        <img
                            src={like}
                            alt="like"
                            className={handleStileLike()}
                            onClick={() => dispatch(addSetLike({ id, email }))}
                        />
                        <h4 className={style.h4Likes}>{likes.length}</h4>
                    </div>
                    <div className={style.comentarios}>
                        <img
                            src={chat}
                            alt="chat"
                            className={style.imgComentarios}
                            onClick={() => {
                                navigate(`/comentarios/${id}`);
                                window.scrollTo(0, 0);
                            }}
                        />
                        <h4 className={style.h4Comentarios}>
                            {comentarios.length}
                        </h4>
                    </div>
                </div>
            }

        </div>
    )
};

export default Detalles;