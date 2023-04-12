const InputSearch = ({name,getAllVideogames,getVideogameName,searchBy,setName}) => {
    const handleChange = (e) => {
        const { value } = e.target;
        if (value.trim() === '') { //verificamos si esta vvacio entonces actualizamos el estado a vacio
          setName({
            ...name,
            name: ''
          });
          getAllVideogames(1,searchBy)
        } else {  //caso contrario > ejecutamos la busqueda
          setName({
            ...name,
            name: value
          });
          getVideogameName(value, searchBy);
        }
      };
    return ( 
        <input className="search" placeholder="Search" value={name.name} onChange={handleChange} name="name" type="search" />
     );
}
 
export default InputSearch;