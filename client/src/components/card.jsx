import { Link } from "react-router-dom";

const Card = (props) => {
    return ( 
        <div>
            <div className="card" style={{backgroundImage:`url(${props.image})`}}>
            <div className="card-title">
                <h1>{props.name.toUpperCase()}</h1>
            </div>
            <div className="card-text">
            <label>Generos:</label>
            {
                props.genres.map(g=>{
                    return(
                        <p key={`key_${g.id}`}>*{g.name}</p>
                        ) //*accion,survivar
                    })    
            }   
            </div>
            <button className="btn-link btn-view-more">
            <Link className="btn-link" to={`/details/${props.id}`} >View More</Link>
            </button>
            </div>
        </div>
     );
}
 
export default Card;