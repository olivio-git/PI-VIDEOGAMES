import axios from "axios";
import { GET_GENRES } from './actionsType';

export function getGenres(){
    return function(dispatch){
        return axios.get('http://localhost:3001/genres/')
        .then((response)=>{
            dispatch({
                type:GET_GENRES,
                payload:response.data
            })
        });
    }
}