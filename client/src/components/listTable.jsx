import NavBar from "./navbar";
import {connect} from 'react-redux'
import { getAllVideogames,deleteVideogame } from "../store/actions/videGameActions";
import { useEffect } from "react";
import Footer from "./footer";
const ListTable = ({videogames,getAllVideogames,deleteVideogame}) => {
  const deleteGame=async(id)=>{
    await deleteVideogame(id)
    const fetchVideogames = async () => {
      await getAllVideogames(1,'bd');
    };
    fetchVideogames();
  }
  
  useEffect(() => {
    const fetchVideogames = async () => {
      await getAllVideogames(1,'bd');
    };
    fetchVideogames();
  }, [getAllVideogames])
    return ( 
        <div className="row">
            <div>
                <NavBar ></NavBar>
            </div>
            <div className='col-12'>
            </div>
            <div className="col-12 container-list">
            <table>
                    <thead>
                      <tr>
                        <th>Nro</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Imagen</th>
                        <th>Description</th>
                        <th>Delete/EDit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        videogames && videogames.map((v,index)=>{
                          return(
                            <tr key={v.id}>
                              <td>{index+1}</td>
                              <td>{v.id}</td>
                              <td>{v.name}</td>
                              <td><img style={{width:'70px'}} src={v.image} alt="imagen" /></td>
                              <td>{v.description}</td>
                              <td  >
                                <button className='editDelet' onClick={()=>deleteGame(v.id)} >Delete </button>
                                <button className='deletEit' onClick={()=>deleteGame(v.id)} > Edit</button>
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
            </div>
            <div className="col-12">
                      <Footer></Footer>
            </div>
        </div>
     );
}
 
const mapStateToProps = (state) => {
  return {
     videogames: state.videogames
  };
};
const mapDispatchToProps = {
  getAllVideogames,
  deleteVideogame

};
export default connect(mapStateToProps,mapDispatchToProps)(ListTable);