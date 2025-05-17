import { useLocation } from 'react-router-dom';
import Detalles from '../Detalles/Detalles';
import style from './Libro.module.css';
import Swal from 'sweetalert2';

const Libro = ({ contenido }) => {
    const { link, imagen } = contenido;
    const { pathname } = useLocation();

    return (
        <div className={style.Libro}>

            <div className={style.divLibro}>
                <img
                    src={imagen}
                    alt="imagen"
                    className={style.imgLibro}
                    onClick={() => {
                        if (pathname === '/membership') {
                            Swal.fire({
                                title: "Adquiere tu membresia",
                                text: "Activa tu membresía para ver el contenido de este documento.",
                                icon: "info",
                                confirmButtonText: "Aceptar"
                            });
                        }else if (link === "") {
                            Swal.fire({
                                title: "En la descripción",
                                text: "El contenido de este documento se encuentra en la descripción.",
                                icon: "info",
                                confirmButtonText: "Aceptar"
                            });
                        } else {
                            window.open(link)
                        };
                    }}
                />
            </div>

            <Detalles contenido={contenido} />

        </div>
    )
};

export default Libro;