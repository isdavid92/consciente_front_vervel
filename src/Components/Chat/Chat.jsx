import style from "./Chat.module.css";
import logoBlanco from "../../Assets/Img/logoBlanco.png";
import enviar from "../../Assets/Img/enviar.png";
import perfilAleja from "../../Assets/Img/perfilAleja.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addChat } from "../../redux/actions";
import { io } from "socket.io-client";

const Chat = () => {

    // const URL = "http://localhost:3001";
    const URL = "https://consciente-d3bf4b26b4b3.herokuapp.com";

    const socket = io(URL, { transports: ['websocket'] });
    const usuarioGlobal = useSelector(state => state.data.usuario);
    const chatGlobal = useSelector(state => state.data.chat);
    const [usuario, setUsuario] = useState(null);
    const [chat, setChat] = useState([]);
    const [mensaje, setMensaje] = useState("");
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setMensaje(e.target.value);
    };

    const handleTiempo = (fecha) => {
        const segundos = Math.floor((Date.now() - new Date(fecha.año, fecha.mes - 1, fecha.dia, fecha.hora.hora, fecha.hora.minuto)) / 1000);
        const formatos = [[31536000, 'año'], [2592000, 'mes'], [86400, 'día'], [3600, 'hora'], [60, 'minuto'], [1, 'segundo']];
        const [valor, nombre] = formatos.find(([v]) => segundos >= v) || [1, 'segundo'];
        const cantidad = Math.floor(segundos / valor);
        return `hace ${cantidad} ${nombre}${cantidad > 1 ? 's' : ''}`;
    };

    const handleSend = () => {
        if (mensaje !== "") {
            socket.emit("chat_message", {
                usuario: usuario.nombre,
                siglas: `${usuario.nombre.charAt(0)}${usuario.apellido.charAt(0)}`,
                mensaje: mensaje,
                fecha: {
                    dia: new Date().getDate(),
                    mes: new Date().getMonth() + 1,
                    año: new Date().getFullYear(),
                    hora: {
                        hora: new Date().getHours(),
                        minuto: new Date().getMinutes()
                    }
                }
            });
            setMensaje("");
        };
    };

    useEffect(() => {
        if (usuarioGlobal) {
            setUsuario(usuarioGlobal);
            setChat(chatGlobal);
        }
    }, [usuarioGlobal, chatGlobal]);

    useEffect(() => {
        const end = document.getElementById("end");
        if (end) {
            end.scrollIntoView({ behavior: "smooth" });
        };
    }, [chat]);

    useEffect(() => {
        socket.on("connect", () => {
            usuario && socket.emit("user_connected", {
                usuario: usuario.nombre,
            });
        });
        socket.on("chat_message", (mensaje) => {
            console.log(`Mensaje de ${mensaje.usuario}: ${mensaje.mensaje}`);
            console.log(mensaje);
            dispatch(addChat(mensaje))
        });
        if (!usuario) return () => {
            socket.off("connect");
            socket.off("chat_message");
        }
    }, [usuario]);

    return (
        <div className={style.Chat}>

            <div className={style.head}>
                <h4 className={style.h4Head}>Consciente By Aleja M</h4>
                <img src={logoBlanco} alt="logoBlanco" className={style.imgHead} />
            </div>

            {chat.map((mensaje, index) => {
                if (mensaje.usuario === "EquipoConsciente") {
                    return (
                        <div key={index} className={style.Mensaje}>
                            <div className={style.MensajeAleja}>
                                <h3 className={style.usuarioAleja}>Equipo Consciente:</h3>
                                <p className={style.mensajeAleja}>{mensaje.mensaje}</p>
                                <p className={style.tiempo}>{handleTiempo(mensaje.fecha)}</p>
                            </div>
                            <img src={perfilAleja} alt="perfilAleja" className={style.imgAleja} />
                        </div>
                    )
                } else {
                    return (
                        <div key={index} className={style.Mensaje}>
                            <div className={style.siglas}>
                                <h1 className={style.h1Siglas}>{mensaje.siglas}</h1>
                            </div>
                            <div className={style.MensajeUsuario}>
                                <h3 className={style.usuario}>{mensaje.usuario}:</h3>
                                <p className={style.mensaje}>{mensaje.mensaje}</p>
                                <p className={style.tiempo}>{handleTiempo(mensaje.fecha)}</p>
                            </div>
                        </div>
                    )
                }
            })}

            <div id="end" />

            <div className={style.inputMensaje}>
                <input
                    className={style.input}
                    placeholder="Escribe tu mensaje..."
                    type="text"
                    onChange={handleChange}
                    value={mensaje}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                />
                <img
                    className={style.enviar}
                    src={enviar}
                    alt="enviar"
                    onClick={() => handleSend()}
                />
            </div>

        </div>
    )
};

export default Chat;