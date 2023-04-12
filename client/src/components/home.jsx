import { useEffect, useState, useMemo, useRef } from 'react';
import { connect } from 'react-redux';
import { 
  getAllVideogames,
  getVideogameName,
  updateFiltrotype,
  updateFiltroSort,
  filterGenre
} from '../store/actions/videGameActions';
import {
  getGenres
} from '../store/actions/genreActions'
import Cards from './cards';
import Footer from './footer';
import InputSearch from './inputSearch';
import NavBar from './navbar';
import Pagination from './pagination';
import Spinner from './spinner';

const PAGE_SIZE = 15 ; // Defino el numero de elementos a mostrar
const filtro=[
  {label:'all',value:'all',txt:'Database and api'},
  {label:'bd',value:'bd',txt:'From the database'},
  {label:'api',value:'api',txt:'From the api'}
]
const order=[
  {label:'ningun',value:'all',txt:'Disorderly'},
  {label:'A-Z',value:'desc',txt:'A - Z'},
  {label:'Z-A',value:'asc',txt:'Z - A'}
]
const Home = ({ 
  videogames,
  setTotalGame,
  filtroType, 
  filtroOrder,
  genres,
  genreType,
  getAllVideogames,
  getVideogameName,
  updateFiltrotype,
  updateFiltroSort,
  getGenres,
  filterGenre
}) => {
  const [name,setName]=useState({
    name:''
  })
  const [currentPage, setCurrentPage] = useState(1); // Numero de pagina
  const [isLoading, setIsLoading] = useState(true);

  const filtroTypeRef = useRef(filtroType); //traer el estado actualizado
  const genreTypeRef = useRef(genreType); //traer el estado actualizado

  const totalVideogames =setTotalGame;
  const totalPages = Math.ceil(totalVideogames / PAGE_SIZE);
  const startIndex = 0;
  const endIndex = Math.min(startIndex + PAGE_SIZE, totalVideogames);


  const fetchPage = async (page) => {
    const filtroType = filtroTypeRef.current;
    setIsLoading(true);
    await getAllVideogames(page, filtroType);
    setIsLoading(false);
  };

  const handleType=async(e)=>{
    await updateFiltrotype(e.target.value);
    fetchPage(1,e.target.value);

  };
  const handleOrder=async(e)=>{
    await updateFiltroSort({orderBy:'name',order:e.target.value});
    fetchPage(1,e.target.value);
  }

  
  const paginatedVideogames = useMemo(
  () => videogames.slice(startIndex, endIndex),
  [videogames, startIndex, endIndex]
  );
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const fetchGenres=()=>{
     getGenres()
  }
  const handleGenreType=async(e)=>{
    const value=e.target.value;
    await filterGenre(value);
  }
    useEffect(() => {
      filtroTypeRef.current = filtroType;
      genreTypeRef.current=genreType;
      const fetchVideogames = async () => {
        await getAllVideogames(currentPage,filtroType);
        await fetchGenres();
        setIsLoading(false);
      };
      fetchVideogames();
      
      
    }, [getAllVideogames,currentPage,filtroType,genreType]);
  return (
    <div className="row theme-color">
      <div className="col-12">
        <NavBar />
      </div>
      <div className="col-12 theme-color container-search-select">
            <label>Genre</label>
            <select 
            className='select'
            onChange={handleGenreType}
            >
              {
                genres && genres.map(g=>{
                  return(
                    <option key={`G_${g.id}`} value={g.name}>{g.name}</option>
                )
                })
              }
            </select>
            <label>Sort</label>
            <select
            className='select'
            onChange={handleOrder}
            >
              {
                order.map(f=>{
                  return(
                    <option key={`key_${f.label}`} value={f.value}>{f.txt}</option>
                  )
                })
              }
            </select>
            <label>Data Source</label>
            <select
            className='select'
            value={filtroType}
            onChange={handleType}
            >
              {
                filtro.map(f=>{
                  return(
                    <option key={`key_${f.label}`} value={f.value}>{f.txt}</option>
                  )
                })
              }
            </select>
            <InputSearch 
            name={name} 
            setName={setName}  
            getAllVideogames={getAllVideogames}
            getVideogameName={getVideogameName} 
            searchBy={filtroType}
            />
      </div>
      <div className="col-12">
        {isLoading ? (
          <div className="spin-pag">
            <Spinner></Spinner>
            <br />
          </div>
        ) : ''}
        <div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              fetchPage={fetchPage}
              filtroType={filtroType}
            />
            <Cards videogames={paginatedVideogames} filtroOrder={filtroOrder}/>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              fetchPage={fetchPage}
              filtroType={filtroType}
            />
          </div>
      </div>
      <div className="col-12">
          <Footer></Footer>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    videogames: state.videogames,
    setTotalGame:state.setTotalGame,
    filtroType:state.filtroType,
    filtroOrder:state.filtroOrder,
    genres:state.genres,
    genreType:state.genreType
  };
};
const mapDispatchToProps = {
  getAllVideogames,
  getVideogameName,
  updateFiltrotype,
  updateFiltroSort,
  getGenres,
  filterGenre
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
