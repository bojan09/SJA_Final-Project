import "./Footer.css";
import { Link } from "react-router-dom";

import logo from "../../Archive/logo_white.svg";

const Footer = () => {
  return (
    <footer>
      <div className="footer-items">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo_img" />
          </Link>
        </div>
        <ul className="footer-links">
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
        <span className="copyright">Baby’s Food Place copyright © 2021</span>
      </div>
    </footer>
  );
};

export default Footer;
