import style from "./Comentarios.module.css";
import atras from "../../../../../Assets/Img/atras.png";
import enviar from "../../../../../Assets/Img/enviar.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addComment } from "../../../../../redux/actions";
import { useNavigate, useParams } from "react-router-dom";

const Comentarios = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const comentariosGlobal = useSelector(state => {
        if (state.data.contenido) {
            const contenidoSelec = state.data.contenido.find(contenido => contenido.id === Number(id));
            return contenidoSelec.comentarios;
        } else {
            return null
        }
    });
    const nombreGlobal = useSelector(state => state.data.usuario ? state.data.usuario.nombre : "");
    const [comentarios, setComentarios] = useState([]);
    const [nombre, setNombre] = useState("");
    const [comentario, setComentario] = useState("");

    const handleChange = (e) => {
        setComentario(e.target.value);
    };

    const handleSend = () => {
        if (comentario !== "") {
            dispatch(addComment({
                usuario: nombre,
                comentario: comentario,
                id: id
            }))
            setComentario("");
        }
    };

    useEffect(() => {
        if (comentariosGlobal) {
            setComentarios(comentariosGlobal);
            setNombre(nombreGlobal);
        }
    }, [comentariosGlobal, nombreGlobal]);

    return (
        <div className={style.Comentarios}>

            <img
                className={style.atras}
                onClick={() => navigate(-1)}
                src={atras}
                alt="atras"
            />

            <h1 className={style.titulo}>Comentarios:</h1>

            {comentarios.map((comentario, index) => {
                return (
                    <div key={index} className={style.Comentario}>
                        <h3 className={style.usuario}>{comentario.usuario}:</h3>
                        <p className={style.comentario}>{comentario.comentario}</p>
                    </div>
                )
            })}

            <div className={style.inputComentario}>
                <input
                    className={style.input}
                    placeholder="Escribe tu comentario..."
                    type="text"
                    onChange={handleChange}
                    value={comentario}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                />
                <img
                    className={style.enviar}
                    src={enviar}
                    alt="enviar"
                    onClick={() => handleSend()}
                />
            </div>

        </div>
    )
};

export default Comentarios;