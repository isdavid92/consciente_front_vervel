import { useEffect } from "react";
import Detalles from "../Detalles/Detalles";
import style from "./Audio.module.css";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const Audio = ({ contenido, handlePlayPause }) => {

    const { link, id } = contenido;
    const {pathname} = useLocation();

    const handleControls = () => {
        const audio = document.getElementById(id);
        handlePlayPause(id);
        audio.play();
    };

    useEffect(() => {
        const audio = document.getElementById(id);
        if (pathname === "/membership" && audio) {
            audio.addEventListener("timeupdate", () => {
                if (audio.currentTime >= 10) {
                    audio.pause();
                    audio.currentTime = 0;
                    Swal.fire({
                        title: "Adquiere tu membresia",
                        text: "Activa tu membresía para escuchar este audio completo.",
                        icon: "info",
                        confirmButtonText: "Aceptar"
                    });
                }
            })
        }
    },[id,pathname])
    
    return (
        <div className={style.Audio}>

            <div className={style.divAudio}>
                <img
                    src={contenido.imagen}
                    alt="imgAudio"
                    className={style.imgAudio}
                />
                <audio
                    id={id}
                    className={style.audio}
                    src={link}
                    controls
                    onPlay={handleControls}
                    controlsList="nodownload"
                >
                </audio>
            </div>

            <Detalles contenido={contenido} />

        </div>
    )
};

export default Audio;