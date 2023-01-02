import "./Navbar.css";
import { Link } from "react-router-dom";
import GuestNavbar from "./GuestNavbar/GuestNavbar";
import UserNavbar from "./UserNavbar/UserNavbar";
import { useAuthContext } from "../../hooks/useAuthContext";
import logo from "../../Archive/logo_color.svg";

const Navbar = () => {
  const { user } = useAuthContext();
  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="logo_img" />
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/breakfast">Breakfast</Link>
          </li>
          <span className="dot"></span>
          <li>
            <Link to="/brunch">Brunch</Link>
          </li>
          <span className="dot"></span>
          <li>
            <Link to="/lunch">Lunch</Link>
          </li>
          <span className="dot"></span>
          <li>
            <Link to="/dinner">Dinner</Link>
          </li>
        </ul>
      </nav>
      {user && (
        <div>
          <UserNavbar />
        </div>
      )}

      {!user && (
        <div>
          <GuestNavbar />
        </div>
      )}
    </header>
  );
};

export default Navbar;
