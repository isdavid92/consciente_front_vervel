import style from "./ExtraMagic.module.css";
import meditaciones from "../../../../Assets/Img/meditaciones.png";
import otros from "../../../../Assets/Img/otros.png";
import extraMagic from "../../../../Assets/Img/extraMagic.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { contFilter } from "../../../../redux/actions";

const ExtraMagic = () => {

    const dispatch = useDispatch();

    return (
        <div className={style.ExtraMagic}>

            <Link
                to={`/colecciones/extraMagic/filtro`}
                className={style.Subcategoria}
                onClick={() => dispatch(contFilter("extraMagic"))}
            >
                <img
                    src={extraMagic}
                    alt="movimiento"
                    className={style.extraMagic}
                />
                <div className={style.divTitulo}>
                    <h1 className={style.titulo}>EXTRA MAGIC</h1>
                </div>
            </Link>

            <div className={style.subcategorias}>
                <Link
                    to={`/colecciones/extraMagic/filtro`}
                    className={style.subcategoria}
                    onClick={() => dispatch(contFilter("meditaciones"))}
                >
                    <img
                        src={meditaciones}
                        alt="meditaciones"
                        className={style.imgSubcategoria}
                    />
                    <h4 className={style.h4Subcategoria}>Meditaciones</h4>
                </Link>
                <Link
                    to={`/colecciones/extraMagic/filtro`}
                    className={style.subcategoria}
                    onClick={() => dispatch(contFilter("otros"))}
                >
                    <img
                        src={otros}
                        alt="otros"
                        className={style.imgSubcategoria}
                    />
                    <h4 className={style.h4Subcategoria}>Otros</h4>
                </Link>
            </div>

        </div>
    )
};

export default ExtraMagic;