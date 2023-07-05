import React from "react";
import { useLocation, Link } from "react-router-dom";
import logo from "../images/VectorlogoW.svg";

function Header({ userEmail, onLogout, text, way, loggedIn }) {
  const url = useLocation();

  const links = () => {
      return (
        <div className="header__link">
          <Link to={"/"} style={{ color: "#fff", textDecorationLine: "none" }}>{userEmail ? `${userEmail}` : ''}</Link>
          <Link to={way} onClick={onLogout} style={{textDecorationLine: "none", marginLeft: "24px",  color: loggedIn ? "#A9A9A9" : "#fff"}}>{text}</Link>
        </div>
      );
  };
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="лого" />
      {links()}
    </header>
  );
}

export default Header;
