import { NavLink } from 'react-router-dom';
import logo from '../assets/logoYellow.png';
const NavBar = () => {
  return (
    <div className="navbar">
      <nav>
        <ul>
          <li>
            <img className="logo" src={logo} alt="logo" />
          </li>
          <li>
            <NavLink className="bt bt-ini" exact='true'to="/">
              LANDING PAGE
            </NavLink>
          </li>
          <li>
            <NavLink className="bt" to="/home">
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink className="bt" to="/form">
              CREATE
            </NavLink>
          </li>
          <li>
            <NavLink className="bt" to="/lisTable">
              BOARDS
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
