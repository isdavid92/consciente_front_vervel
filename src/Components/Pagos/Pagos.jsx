import style from "./Pagos.module.css";
import atras from "../../Assets/Img/atras.png";
import { useNavigate } from "react-router-dom";

const Pagos = () => {

    const navigate = useNavigate();

    return (
        <div className={style.Pagos}>

            <img
                className={style.atras}
                onClick={() => navigate(-1)}
                src={atras}
                alt="atras"
            />

            <h1 className={style.titulo}>Pagos</h1>

        </div>
    )
};

export default Pagos;
