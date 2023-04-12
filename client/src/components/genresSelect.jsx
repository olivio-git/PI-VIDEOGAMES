import { useEffect } from "react";

const GenresSelect = ({genres,plataforms}) => {
    useEffect (() => {
        
    }, [genres,plataforms])
    return ( 
        <div className="genre-container">
            <div>
                <label>Genres Info</label>
            {
                      genres && genres.map(m=>{
                        return(
                          <p key={m}>* {m}</p>
                        )
                      })
                    }
                <label>Genres Info</label>

                    <label>,GENRES: </label>
                    {
                      plataforms && plataforms.map(m=>{
                        return(
                          <p key={m}>* {m}</p>
                        )
                      })
                    }
                <p></p>
            </div>
        </div>
     );
}
 
export default GenresSelect;