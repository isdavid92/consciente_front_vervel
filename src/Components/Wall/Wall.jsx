import style from "./Wall.module.css";
import logoBlanco from "../../Assets/Img/logoBlanco.png";
import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react"; // Importamos useRef
import Video from "./Contenido/Video/Video";
import Audio from "./Contenido/Audio/Audio";
import Libro from "./Contenido/Libro/Libro";
import { useLocation } from "react-router-dom";
import Journal from "./Contenido/Journal/Journal";

const Wall = () => {
    const { pathname } = useLocation();
    const contenidoGlobal = useSelector((state) => state.data.contenido);
    const nombreGlobal = useSelector(
        (state) => (state.data.usuario ? state.data.usuario.nombre : null)
    );
    const contFilter = useSelector((state) => state.contFilter);
    const [nombre, setNombre] = useState("");
    const [contenidoTotal, setContenidoTotal] = useState([]);
    const [visibleCount, setVisibleCount] = useState(10);
    const [loading, setLoading] = useState(false);
    const scrollContainerRef = useRef(null); // Referencia al contenedor de las publicaciones

    useEffect(() => {
        if ((pathname === "/wall" || pathname === "/membership") && nombreGlobal) {
            if (nombreGlobal) setNombre(nombreGlobal);
            if (contenidoGlobal) setContenidoTotal(contenidoGlobal);
        } else if (pathname.startsWith("/colecciones")) {
            setContenidoTotal(contFilter);
        }
        setVisibleCount(10); // Resetear el contador al cambiar de ruta o datos
    }, [contFilter, pathname, contenidoGlobal, nombreGlobal]);

    const visibleContenido = contenidoTotal.slice(0, visibleCount);

    const handleScroll = () => {
        const container = scrollContainerRef.current;
        if (container) {
            const scrollTop = container.scrollTop;
            const scrollHeight = container.scrollHeight;
            const clientHeight = container.clientHeight;
            const scrollThreshold = 200; // Ajusta este valor según necesites
            if (scrollTop + clientHeight >= scrollHeight - scrollThreshold) {
                loadMore();
            }
        }
    };

    const handlePlayPause = (id) => {
        const videos = document.querySelectorAll(`video`);
        const audios = document.querySelectorAll(`audio`);
        const mascaras = document.querySelectorAll(`[id^="mascara"]`);
        mascaras.forEach((mascara) => {
            mascara.style.display = "flex";
        });
        audios.forEach((audio) => {
            if (Number(audio.id) !== id) {
                audio.pause();
                audio.currentTime = 0;
            }

        });
        videos.forEach((video) => {
            video.pause();
            video.currentTime = 0;
            video.controls = false;
        });
    };

    //     const handleScroll2 = () => {
    //     if (
    //       window.innerHeight + window.scrollY >=
    //       document.documentElement.offsetHeight - 200
    //     ) {
    //       loadMore();
    //     }
    //   };

    const loadMore = () => {
        if (visibleCount < contenidoTotal.length && !loading) {
            setLoading(true);
            setTimeout(() => {
                setVisibleCount((prevCount) =>
                    Math.min(prevCount + 10, contenidoTotal.length)
                );
                setLoading(false);
            }, 500); // Simula carga
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener("scroll", handleScroll);
            return () => {
                container.removeEventListener("scroll", handleScroll);
            };
        }
    }, [contenidoTotal]); // Mantenemos la dependencia en contenidoTotal por si el contenedor cambia

    return (
        <div className={style.Wall} ref={scrollContainerRef} style={{ overflowY: 'auto', maxHeight: '80vh' }}> {/* Ajusta maxHeight según necesites */}
            <div className={style.head}>
                <h4 className={style.h4Head}>Consciente By Aleja M</h4>
                <img src={logoBlanco} alt="logoBlanco" className={style.imgHead} />
            </div>

            {pathname === "/wall" && <h1 className={style.titulo}>Hola {nombre}</h1>}

            {visibleContenido.map((contenidoItem, index) => {
                if (contenidoItem.type === "video") {
                    return <Video key={index} contenido={contenidoItem} handlePlayPause={handlePlayPause} />;
                } else if (contenidoItem.type === "audio") {
                    return <Audio key={index} contenido={contenidoItem} handlePlayPause={handlePlayPause} />;
                } else if (contenidoItem.type === "libro") {
                    return <Libro key={index} contenido={contenidoItem} />;
                } else if (contenidoItem.type === "journal") {
                    return <Journal key={index} contenido={contenidoItem} />;
                }
                return null;
            })}

            {loading && <p>Cargando más contenido...</p>}
            {visibleCount < contenidoTotal.length && !loading && (
                <div className={style.loadMoreButtonContainer}>
                    <button onClick={loadMore} className={style.loadMoreButton}>
                        Cargar más
                    </button>
                </div>
            )}
            {visibleCount === contenidoTotal.length && (
                <p className={style.noMoreContent}>No hay más contenido.</p>
            )}
        </div>
    );
};

export default Wall;











// import style from "./Wall.module.css";
// import logoBlanco from "../../Assets/Img/logoBlanco.png";
// import { useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import Video from "./Contenido/Video/Video";
// import Audio from "./Contenido/Audio/Audio";
// import Libro from "./Contenido/Libro/Libro";
// import { useLocation } from "react-router-dom";
// import Journal from "./Contenido/Journal/Journal";

// const Wall = () => {

//     const {pathname} = useLocation();
//     const contenidoGlobal = useSelector(state => state.data.contenido);
//     const nombreGlobal = useSelector(state => state.data.usuario ? state.data.usuario.nombre : null);
//     const contFilter = useSelector(state => state.contFilter);
//     const [nombre, setNombre] = useState("");
//     const [contenido, setContenido] = useState([]);

//     useEffect(() => {
//         if ((pathname === "/wall" || pathname === "/membership") && nombreGlobal) {
//             if (nombreGlobal) setNombre(nombreGlobal);
//             if (contenidoGlobal) setContenido(contenidoGlobal);
//         } else if (pathname.startsWith("/colecciones")) {
//             setContenido(contFilter)
//         }
//     },[contFilter, pathname, contenidoGlobal, nombreGlobal]);

//     return (
//         <div className={style.Wall}>

//             <div className={style.head}>
//                 <h4 className={style.h4Head}>Consciente By Aleja M</h4>
//                 <img src={logoBlanco} alt="logoBlanco" className={style.imgHead} />
//             </div>

//             {pathname === "/wall" && <h1 className={style.titulo}>Hola {nombre}</h1>}

//             {contenido.map((contenido,index) => {
//                     if (contenido.type === "video") {
//                         return (
//                             <Video key={index} contenido={contenido}/>
//                         )
//                     } else if (contenido.type === "audio") {
//                         return (
//                             <Audio key={index} contenido={contenido}/>
//                         )
//                     } else if (contenido.type === "libro") {
//                         return (
//                             <Libro key={index} contenido={contenido}/>
//                         )
//                     } else if (contenido.type === "journal") {
//                         return (
//                             <Journal key={index} contenido={contenido}/>
//                         )
//                     } ;
//                     return null;
//             })}

//         </div>
//     )
// };

// export default Wall;
