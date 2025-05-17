import { ADD_DATA, ADD_COMMENT, ADD_SET_LIKE, ADD_CHAT, CONT_FILTER, CHANGE_PASSWORD, SET_DATA, RECOVER_PASSWORD } from "./actionsTypes";
import axios from "axios";
import Swal from "sweetalert2";

// const URL = "https://consciente-d3bf4b26b4b3.herokuapp.com";
const URL = "https://api.conscientebyalejam.com";
// const URL = "http://localhost:3001";

export const addData = (dataInput) => {
    return async (dispatch) => {
        try {
            const { data: contenido } = await axios.get(`${URL}/api/contenido`);
            const { data: chat } = await axios.get(`${URL}/api/chat`);
            const contInvertido = contenido.reverse();
            if (dataInput.url === "localStorage") {
                const data = {
                    contenido: contInvertido,
                    chat,
                    usuario: dataInput.usuario
                }
                return dispatch({
                    type: ADD_DATA,
                    payload: data
                })
            } else if (dataInput.url === "login") {
                const { data: usuario } = await axios.post(`${URL}/login`, {
                    email: dataInput.email,
                    password: dataInput.password
                });
                const data = {
                    contenido,
                    chat,
                    usuario
                }
                return dispatch({
                    type: ADD_DATA,
                    payload: data
                })
            } else if (dataInput.url === "registry") {
                const { data: usuario } = await axios.post(`${URL}/registry`, {
                    nombre: dataInput.nombre,
                    apellido: dataInput.apellido,
                    email: dataInput.email,
                    password: dataInput.password
                });
                const data = {
                    contenido,
                    chat,
                    usuario
                }
                return dispatch({
                    type: ADD_DATA,
                    payload: data
                })
            }
        } catch (error) {
            if (error.response.status === 401) {
                Swal.fire({
                    title: "Error",
                    text: "Usuario o contraseña incorrectos",
                    icon: "error",
                    confirmButtonText: "Aceptar"
                });
                console.log(error);
            } else if (error.response.status === 400) {
                Swal.fire({
                    title: "Correo registrado",
                    text: "Este correo ya ha sido registrado",
                    icon: "warning",
                    confirmButtonText: "Aceptar"
                });
                console.log(error);
            } else if (error.response.status === 404) {
                Swal.fire({
                    title: "Error de servidor",
                    text: "El servidor no responde",
                    icon: "warning",
                    confirmButtonText: "Aceptar"
                });
                console.log(error);
            }
        }
    }
};

export const setData = () => {
    try {
        return {
            type: SET_DATA
        }
    } catch (error) {
        console.log(error);
    }
};

export const addComment = (comentario) => {
    return async (dispatch) => {
        try {
            await axios.post(`${URL}/actualizar/comentario/contenido/${comentario.id}`, {
                usuario: comentario.usuario,
                comentario: comentario.comentario
            });
            return dispatch({
                type: ADD_COMMENT,
                payload: comentario
            })
        } catch (error) {
            console.log(error);
        }
    }
};

export const addSetLike = ({ id, email }) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post(`${URL}/actualizar/like/contenido/${id}`, {
                email
            });
            return dispatch({
                type: ADD_SET_LIKE,
                payload: {
                    id,
                    likes: data
                }
            })
        }
        catch (error) {
            console.log(error);
        }
    }
};

export const addChat = (chat) => {
    return async (dispatch) => {
        try {
            //! ESTE SE CANCELA POR AHORA
            // const { data } = await axios.post(`${URL}/add/chat`, {
            //     usuario: chat.usuario,
            //     siglas: chat.siglas,
            //     mensaje: chat.mensaje,
            //     fecha: chat.fecha
            // });
            // console.log(data);
            return dispatch({
                type: ADD_CHAT,
                payload: chat
            })
        } catch (error) {
            console.log(error);
        }
    }
};

export const contFilter = (categoria) => {
    try {
        return {
            type: CONT_FILTER,
            payload: categoria
        }
    } catch (error) {
        console.log(error);
    }
};

export const changePassword = (datos) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post(`${URL}/actualizar/password`, {
                actual: datos.actual,
                nueva: datos.nueva,
                email: datos.email
            });
            Swal.fire({
                title: "Contraseña cambiada",
                text: "La contraseña ha sido cambiada correctamente",
                icon: "success",
                confirmButtonText: "Aceptar"
            });
            return dispatch({
                type: CHANGE_PASSWORD,
                payload: data
            })
        } catch (error) {
            console.log(error);
        }
    }
};

export const recoverPassword = (email) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post(`${URL}/recuperar`, {
                email
            });
            Swal.fire({
                title: "Correo enviado",
                text: "Se ha enviado un correo a tu dirección de correo electrónico",
                icon: "success",
                confirmButtonText: "Aceptar"
            });
            return dispatch({
                type: RECOVER_PASSWORD,
                payload: data
            })
        } catch (error) {
            console.log(error);
        }
    }
};

export const resetPassword = ({ nueva, token }) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post(`${URL}/reset-password/${token}`, {
                nueva
            });
            Swal.fire({
                title: "Contraseña restablecida",
                text: "La contraseña ha sido restablecida correctamente, puedes iniciar sesión con la nueva contraseña",
                icon: "success",
                confirmButtonText: "Aceptar"
            });
            return dispatch({
                type: CHANGE_PASSWORD,
                payload: data
            })
        } catch (error) {
            if (error.response.status === 400) {
                console.log(error);
                Swal.fire({
                    title: "Error",
                    text: "Token de restablecimiento inválido o expirado, solicite un nuevo enlace de restablecimiento",
                    icon: "error",
                    confirmButtonText: "Aceptar"
                });
            }
        }
    }
};