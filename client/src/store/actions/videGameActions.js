import axios from 'axios';
import { 
  GET_VIDEOGAMES, 
  POST_VIDEOGAMES,
  GET_VIDEOGAME_NAME,
  UPDATE_FILTROTYPE,
  GET_VIDEOGAMES_ID, 
  DELETE_VIDEOGAME, 
  UPDATE_FILTROSORT,
  FILTER_GENRE
} from './actionsType';
export function getAllVideogames(page,from){
    let url = `https://api-production-e030.up.railway.app/videogames/page/${page}?from=${from}`;
    return function(dispatch){
        return axios.get(url)
        .then((response)=>{
            dispatch({
                type:GET_VIDEOGAMES,
                payload:response.data,
            })
        })
    }
};
export function updateFiltrotype(type){
  return function(dispatch){
    return dispatch({
      type:UPDATE_FILTROTYPE,
      payload:type
    })
}};
export function updateFiltroSort(order){
  return function(dispatch){
    return dispatch({
      type:UPDATE_FILTROSORT,
      payload:order
    })
  }
}
export function postVideogames(newVideogame) {
    return function(dispatch) {
      return axios.post('https://api-production-e030.up.railway.app/videogames', newVideogame)
        .then((response) => {
          dispatch({
            type: POST_VIDEOGAMES,
            payload: response.data,
          })
        })
    }
};
export function getVideogameName(name,from){
  let url=`https://api-production-e030.up.railway.app/videogames/${name}?from=${from}`;

  return function(dispatch){
    return axios.get(url)
    .then((response)=>{
      dispatch({
        type:GET_VIDEOGAME_NAME,
        payload:response.data
      })
    })
  }
}
export function getVideogameId(id){
  let url=`https://api-production-e030.up.railway.app/videogames/id/${id}`;
  return function(dispatch){
    return axios.get(url)
    .then((response)=>{
      dispatch({
        type:GET_VIDEOGAMES_ID,
        payload:response.data
      })
    })
  }
};
export function deleteVideogame(id){
  let url=`https://api-production-e030.up.railway.app/videogames/${id}`
  return function(dispatch){
    return axios.delete(url)
    .then(()=>{
      dispatch({
        type:DELETE_VIDEOGAME,
        payload:'bd'
      })
    })
  }
}
export function filterGenre(type){
  let url=`https://api-production-e030.up.railway.app/videogames/sort/${type}`;
  return function(dispatch){
    return axios.get(url)
    .then((response)=>{
      console.log(response.data)
      dispatch({
        type:FILTER_GENRE,
        payload:{
          genre:type,
          data:response.data
        }
      })
    })
  }
}