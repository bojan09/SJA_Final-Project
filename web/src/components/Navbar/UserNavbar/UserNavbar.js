import { Link } from "react-router-dom";
import { useLogout } from "../../../hooks/useLogout";
import "./UserNavbar.css";

const NavbarButtons = () => {
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };
  return (
    <div className="user-navbar_buttons">
      <Link to="/my-recipes">
        <button className="user-navbar_btn user-navbar_btn-recipes">
          MY RECIPES
        </button>
      </Link>
      <span className="user-navbar_btn-dot"></span>

      <Link to="/user-profile">
        <button className="user-navbar_btn user-navbar_btn-profile">
          MY PROFILE
        </button>
      </Link>
      <span className="user-navbar_btn-dot"></span>

      <button
        onClick={handleLogout}
        className="user-navbar_btn user-navbar_logout-btn"
      >
        LOG OUT
      </button>
    </div>
  );
};

export default NavbarButtons;
