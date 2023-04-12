import { 
    GET_VIDEOGAMES,
    GET_GENRES, 
    POST_VIDEOGAMES,
    GET_VIDEOGAME_NAME,
    UPDATE_FILTROTYPE,
    GET_VIDEOGAMES_ID, 
    DELETE_VIDEOGAME, 
    UPDATE_FILTROSORT,
    FILTER_GENRE
} from '../actions/actionsType';
const initialState={
    videogames:[],
    genres:[],
    setTotalGame:0,
    filtroType:'all',
    filtroOrder: {
        orderBy: 'name',
        order: 'all'
    },
    gameDetail:[],
    genreType:'all'
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case GET_VIDEOGAMES:
        return {
            ...state,
            videogames:action.payload.games,
            setTotalGame:action.payload.totalGame
        }
        case GET_GENRES:
        return{
            ...state,
            genres:action.payload
        }
        case POST_VIDEOGAMES:
        return {
            ...state,
            videogames: [...state.videogames, action.payload]
        }
        case GET_VIDEOGAME_NAME:
            return{
                ...state,
                videogames:action.payload.games,
                setTotalGame:action.payload.totalGame
        }
        case UPDATE_FILTROTYPE:
            return{
                ...state,
                filtroType:action.payload
        };
        case GET_VIDEOGAMES_ID:
            return{
                ...state,
                gameDetail:action.payload
        }
        case DELETE_VIDEOGAME:
        return {
            ...state,
            filtroType:action.payload
        }
        case UPDATE_FILTROSORT:
            return {
                ...state,
                filtroOrder:action.payload
        }
        case FILTER_GENRE:
            return{
                ...state,
                genreType:action.payload.genre,
                videogames:action.payload.data
            }
        default:
        return {...state,};
    }
}

export default reducer;