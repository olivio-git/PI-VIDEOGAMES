import { useSelector, useDispatch } from 'react-redux';
import { setFiltroType, setFiltroSearch } from '../actions/filtroActions';

const Filtro = () => {
  const filtroType = useSelector(state => state.filtroReducer.filtroType);
  const filtroSearch = useSelector(state => state.filtroReducer.filtroSearch);
  const dispatch = useDispatch();

  const handleTypeChange = (e) => {
    dispatch(setFiltroType(e.target.value));
  };

  const handleSearchChange = (e) => {
    dispatch(setFiltroSearch(e.target.value));
  };

  return (
    <div>
      <select value={filtroType} onChange={handleTypeChange}>
        <option value="">Todos</option>
        <option value="accion">Acción</option>
        <option value="aventura">Aventura</option>
        <option value="deporte">Deporte</option>
      </select>
      <input type="text" value={filtroSearch} onChange={handleSearchChange} />
    </div>
  );
};

export default Filtro;
