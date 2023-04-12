import { useEffect} from "react";
import { connect } from 'react-redux';
import { useParams } from "react-router-dom";
import { getVideogameId } from "../store/actions/videGameActions";
import Footer from "./footer";
import NavBar from "./navbar";
import RatingsStarts from "./ratings";

const Details = ({gameDetail,getVideogameId}) => {
  const { id } = useParams();
  const text = gameDetail.description;
  let clearText;
  if(/<\/?p>|<br\s?\/?>/.test(text)){
  clearText = text.replace(/<\/?p>|<br\s?\/?>/g, "");
  }else{
  clearText = text;
  }
  useEffect(() => {
    const fetchVideogames = async () => {
        await getVideogameId(id);
      };
      fetchVideogames();
  }, [id,getVideogameId]);
    return ( 
        <div className="row">
            <div className="col-12">
                <NavBar></NavBar>
            </div>
            <div className="col-4">
                <div className="container-one">
                    <div className="card"  style={{backgroundImage:`url(${gameDetail.image||gameDetail.background_image})`}}>
                    </div>
                </div>
            </div>
            <div className="col-8 ct-mid">
                <div className="container-two">
                <div className="col-6 name-rating-description">
                  <p>ID: {gameDetail.id}</p>
                  <p>Date released: {gameDetail.released?gameDetail.released:gameDetail.releaseDate}</p>
                  <h1>{gameDetail.name}</h1>
                  <RatingsStarts rating={gameDetail.rating}></RatingsStarts>
                  <p>Description: {clearText}</p>
                </div>
                <div className="col-6">
                <div>
                  <label>GENRES</label>
                  <table>
                    <thead>
                      <tr>
                        <th>Nro</th>
                        <th>Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {gameDetail.genres && gameDetail.genres.map((genre, index) => (
                        <tr key={genre.id}>
                          <td>{index+1}</td>
                          <td>{genre.name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div>
                <label>PLATAFORMS</label>
                  <table>
                    <thead>
                      <tr>
                        <th>Nro</th>
                        <th>Name</th>
                      </tr>
                    </thead>
                    <tbody>
                    {gameDetail.platforms && gameDetail.platforms.map((platform, index) => (
                    <tr key={index}>
                      <td>{index+1}</td>
                      <td>{typeof platform === 'object' ? platform.platform.name : platform}</td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
                </div>
                </div>
            </div>
            <div className="col-12">
                <Footer/>
            </div>
        </div>
     );
}
const mapStateToProps = (state) => {
    return {
      gameDetail:state.gameDetail
    };
};
  
const mapDispatchToProps = {
    getVideogameId
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Details);