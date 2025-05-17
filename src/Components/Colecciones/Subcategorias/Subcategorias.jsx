import { useLocation } from "react-router-dom";
import style from "./Subcategorias.module.css";
import logoBlanco from "../../../Assets/Img/logoBlanco.png";
import Movimiento from "./Movimiento/Movimiento";
import ExtraMagic from "./ExtraMagic/ExtraMagic";

const Subcategorias = () => {

    const { pathname } = useLocation();

    return (
        <div className={style.Subcategorias}>

            <div className={style.head}>
                <h4 className={style.h4Head}>Consciente By Aleja M</h4>
                <img src={logoBlanco} alt="logoBlanco" className={style.imgHead} />
            </div>

            {pathname === "/colecciones/movimiento" &&
                <Movimiento />
            }

            {pathname === "/colecciones/extraMagic" &&
                <ExtraMagic />
            }

        </div>
    )
};

export default Subcategorias;