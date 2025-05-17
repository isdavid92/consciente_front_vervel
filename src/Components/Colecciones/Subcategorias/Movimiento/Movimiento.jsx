import style from "./Movimiento.module.css";
import movimiento from "../../../../Assets/Img/movimiento.png";
import pilates from "../../../../Assets/Img/pilates.png";
import yoga from "../../../../Assets/Img/yoga.png";
import hipopresivos from "../../../../Assets/Img/hipopresivos.png";
import fuerza from "../../../../Assets/Img/fuerza.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { contFilter } from "../../../../redux/actions";

const Movimiento = () => {

    const dispatch = useDispatch();

    return(
        <div className={style.Movimiento}>

            <Link
                to={`/colecciones/movimiento/filtro`}
                className={style.Subcategoria}
                onClick={() => dispatch(contFilter("movimiento"))}
            >
                <img
                    src={movimiento}
                    alt="movimiento"
                    className={style.movimiento}
                />
                <div className={style.divTitulo}>
                    <h1 className={style.titulo}>MOVIMIENTO</h1>
                </div>
            </Link>

            <div className={style.subcategorias}>
                <Link
                    to={`/colecciones/movimiento/filtro`}
                    className={style.subcategoria}
                    onClick={() => dispatch(contFilter("pilates"))}
                >
                    <img
                        src={pilates}
                        alt="pilates"
                        className={style.imgSubcategoria}
                    />
                    <h4 className={style.h4Subcategoria}>Pilates</h4>
                </Link>
                <Link
                    to={`/colecciones/movimiento/filtro`}
                    className={style.subcategoria}
                    onClick={() => dispatch(contFilter("yoga"))}
                >
                    <img
                        src={yoga}
                        alt="yoga"
                        className={style.imgSubcategoria}
                    />
                    <h4 className={style.h4Subcategoria}>Yoga</h4>
                </Link>
                <Link
                    to={`/colecciones/movimiento/filtro`}
                    className={style.subcategoria}
                    onClick={() => dispatch(contFilter("hipopresivos"))}
                >
                    <img
                        src={hipopresivos}
                        alt="hipopresivos"
                        className={style.imgSubcategoria}
                    />
                    <h4 className={style.h4Subcategoria}>Hipopresivos</h4>
                </Link>
                <Link
                    to={`/colecciones/movimiento/filtro`}
                    className={style.subcategoria}
                    onClick={() => dispatch(contFilter("fuerza"))}
                >
                    <img
                        src={fuerza}
                        alt="fuerza"
                        className={style.imgSubcategoria}
                    />
                    <h4 className={style.h4Subcategoria}>Funcional / Fuerza</h4>
                </Link>
            </div>
            
        </div>
    )
};

export default Movimiento;