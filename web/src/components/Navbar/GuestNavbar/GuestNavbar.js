import { Link } from "react-router-dom";
import "./GuestNavbar.css";

const NavbarUserButtons = () => {
  return (
    <div className="guest-navbar_buttons">
      <Link to="/login">
        <button className="log-in_btn guest-navbar_btn">Log in</button>
      </Link>
      <p className="or">or</p>
      <Link to="/create-account">
        <button className="create-account_btn guest-navbar_btn">
          Create Account
        </button>
      </Link>
    </div>
  );
};

export default NavbarUserButtons;
