import { ADD_DATA, ADD_COMMENT, ADD_SET_LIKE, ADD_CHAT, CONT_FILTER, SET_DATA } from "./actionsTypes";

const inicialState = {
    data: {},
    contFilter: []
};

const reducer = (state = inicialState, { type, payload }) => {
    switch (type) {
        case ADD_DATA:
            return {
                ...state,
                data: payload,
            }
        case SET_DATA:
            return {
                ...state,
                data: {}
            }
        case ADD_COMMENT:
            const newComment = {
                usuario: payload.usuario,
                comentario: payload.comentario
            };
            const [contenido] = state.data.contenido.filter(cont => cont.id === payload.id);
            contenido.comentarios = [...contenido.comentarios, newComment];
            return {
                ...state,
                data: {
                    ...state.data,
                    contenido: state.data.contenido.map(contenido => {
                        if (contenido.id === payload.id) {
                            return {
                                ...contenido,
                                comentarios: contenido.comentarios
                            }
                        };
                        return contenido;
                    })
                }
            }
        case ADD_SET_LIKE:
            return {
                ...state,
                data: {
                    ...state.data,
                    contenido: state.data.contenido.map(contenido => {
                        if (contenido.id === payload.id) {
                            return {
                                ...contenido,
                                likes: payload.likes
                            }
                        };
                        return contenido;
                    })
                }
            }
        case ADD_CHAT:
            return {
                ...state,
                data: {
                    ...state.data,
                    chat: [
                        ...state.data.chat,
                        payload
                    ]
                }
            }
        case CONT_FILTER:
            const newCont = state.data.contenido && state.data.contenido.filter(cont => {
                if (cont.categoria === payload || cont.subcategoria === payload) {
                    return cont
                }
                return null
            })
            return {
                ...state,
                contFilter: newCont
            }
        default:
            return state
    }
};

export default reducer;