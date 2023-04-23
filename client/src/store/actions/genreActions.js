import axios from "axios";
import { GET_GENRES } from './actionsType';

export function getGenres(){
    return function(dispatch){
        return axios.get('https://api-production-e030.up.railway.app/genres/')
        .then((response)=>{
            dispatch({
                type:GET_GENRES,
                payload:response.data
            })
        });
    }
}