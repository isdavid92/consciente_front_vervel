import style from "./Video.module.css";
import camara from "../../../../Assets/Img/camara.png";
import { useEffect, useState } from "react";
import Detalles from "../Detalles/Detalles";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const Video = ({ contenido, handlePlayPause }) => {

    const { link, id } = contenido;
    const [duracionVideo, setDuracionVideo] = useState("00:00");
    const { pathname } = useLocation();

    const handleControls = () => {
        const video = document.getElementById(id);
        const mascara = document.getElementById(`mascara${id}`);
        handlePlayPause(id);
        mascara.style.display = "none";
        video.controls = true;
        video.play();
    };

    useEffect(() => {
        const video = document.getElementById(id);
        const mascara = document.getElementById(`mascara${id}`);
        mascara.style.height = getComputedStyle(video).height;
        video.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        })
        if (pathname === "/membership") {
            video.addEventListener("timeupdate", () => {
                if (video.currentTime >= 20) {
                    video.pause();
                    video.currentTime = 0;
                    video.controls = false;
                    mascara.style.display = "flex";
                    Swal.fire({
                        title: "Adquiere tu membresia",
                        text: "Activa tu membresía para ver el video completo.",
                        icon: "info",
                        confirmButtonText: "Aceptar"
                    });
                }
            })
        }
        video.addEventListener("loadedmetadata", () => {
            const duracion = video.duration.toFixed();
            const horas = Math.floor(duracion / 3600).toString().padStart(2, '0');
            const minutos = Math.floor((duracion % 3600) / 60).toString().padStart(2, '0');
            const segundos = (duracion % 60).toString().padStart(2, '0');
            setDuracionVideo(horas > 0
                ? `${horas}:${minutos}:${segundos}`
                : `${minutos}:${segundos}`);
        });
    }, [duracionVideo, id, pathname]);

    return (
        <div className={style.Video}>

            <div className={style.divVideo}>
                <video
                    src={link}
                    className={style.video}
                    id={id}
                    controlsList="nodownload"
                >
                </video>
                <div
                    className={style.mascaraVideo}
                    onClick={() => handleControls()}
                    id={`mascara${id}`}
                >
                    <div className={style.contDuracion}>
                        <h3 className={style.duracion}>
                            <img
                                className={style.camara}
                                src={camara}
                                alt="camara"
                            />
                            {duracionVideo}
                        </h3>
                    </div>
                    <div className={style.contPlay}>
                        <h3 className={style.play}>
                            ▶ Reproducir
                        </h3>
                    </div>
                </div>
            </div>

            <Detalles contenido={contenido} />

        </div>
    )
};

export default Video;