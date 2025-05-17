import { useLocation } from 'react-router-dom';
import Detalles from '../Detalles/Detalles';
import style from './Journal.module.css';
import journal from "../../../../Assets/Img/journal.png";
import Swal from 'sweetalert2';

const Journal = ({ contenido }) => {
    const { link, imagen } = contenido;
    const { pathname } = useLocation();

    const handleClick = () => {
        if (pathname === '/membership') {
            Swal.fire({
                title: "Adquiere tu membresia",
                text: "Activa tu membresía para ver el contenido de este documento.",
                icon: "info",
                confirmButtonText: "Aceptar"
            });
        } else if (link === "") {
            Swal.fire({
                title: "En la descripción",
                text: "El contenido de este documento se encuentra en la descripción.",
                icon: "info",
                confirmButtonText: "Aceptar"
            });
        } else {
            window.open(link)
        };
    };

    return (
        <div className={style.Journal}>

            <div className={style.divLibro}>
                <img
                    className={style.journal}
                    src={journal}
                    alt="journal"
                    onClick={() => handleClick()}
                />
                <img
                    src={imagen}
                    alt="imagen"
                    className={style.imgLibro}
                    onClick={() => handleClick()}
                />
            </div>

            <Detalles contenido={contenido} />

        </div>
    )
};

export default Journal;