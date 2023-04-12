import { Route, Routes } from 'react-router-dom';
import './App.css';
import Details from './components/details';
import Home from './components/home';
import LandingPage from './components/landingPage';
import ListTable from './components/listTable';
import NewGame from './components/newGame';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage></LandingPage>}/>
      <Route path="/home" element={<Home></Home>}/>
      <Route path="/form" element={<NewGame></NewGame>}/>
      <Route path="/details/:id" element={<Details></Details>}/>
      <Route path="/lisTable" element={<ListTable></ListTable>}/>
    </Routes>
  );
}

export default App;
