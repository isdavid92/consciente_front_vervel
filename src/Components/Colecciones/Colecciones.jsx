import style from "./Colecciones.module.css";
import logoBlanco from "../../Assets/Img/logoBlanco.png";
import movimiento from "../../Assets/Img/movimiento.png";
import alimentacion from "../../Assets/Img/alimentacion.png";
import habitos from "../../Assets/Img/habitos.png";
import recomendaciones from "../../Assets/Img/recomendaciones.png";
import extraMagic from "../../Assets/Img/extraMagic.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { contFilter } from "../../redux/actions";

const Colecciones = () => {

    const dispatch = useDispatch();

    return (
        <div className={style.Colecciones}>

            <div className={style.head}>
                <h4 className={style.h4Head}>Consciente By Aleja M</h4>
                <img src={logoBlanco} alt="logoBlanco" className={style.imgHead} />
            </div>

            <h1 className={style.titulo}>COLECCIONES</h1>

            <div className={style.colecciones}>
                <Link
                    to={`/colecciones/movimiento`}
                    className={style.coleccion}
                >
                    <img src={movimiento} alt="movimiento" className={style.imgColeccion} />
                    <h4 className={style.h4Coleccion}>Movimiento</h4>
                </Link>
                <Link
                    to={`/colecciones/alimentacion/filtro`}
                    className={style.coleccion}
                    onClick={() => dispatch(contFilter("alimentacion"))}
                >
                    <img src={alimentacion} alt="alimentacion" className={style.imgColeccion} />
                    <h4 className={style.h4Coleccion}>Alimentación</h4>
                </Link>
                <Link
                    to={`/colecciones/habitos/filtro`}
                    className={style.coleccion}
                    onClick={() => dispatch(contFilter("habitos"))}
                >
                    <img src={habitos} alt="habitos" className={style.imgColeccion} />
                    <h4 className={style.h4Coleccion}>Hábitos</h4>
                </Link>
                <Link
                    to={`/colecciones/recomendaciones/filtro`}
                    className={style.coleccion}
                    onClick={() => dispatch(contFilter("recomendaciones"))}

                >
                    <img src={recomendaciones} alt="recomendaciones" className={style.imgColeccion} />
                    <h4 className={style.h4Coleccion}>Recomendaciones</h4>
                </Link>
                <Link
                    to={`/colecciones/extraMagic`}
                    className={style.coleccion}
                >
                    <img src={extraMagic} alt="extraMagic" className={style.imgColeccion} />
                    <h4 className={style.h4Coleccion}>Extra Magic</h4>
                </Link>
            </div>

        </div>
    )
};

export default Colecciones;