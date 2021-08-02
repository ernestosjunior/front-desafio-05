import "./style.css";
import { useHistory } from "react-router-dom";
import { useContext } from "react";

import Logo from "../../assets/pizarria.png";

const Header = () => {
  const path = window.location.pathname;
  const history = useHistory();

  const handleLogout = () => {
    history.push("/login");
  };

  return (
    <header>
      <img src={Logo} className="header__logo" alt="Logo" />
      <div className="header__conteudo">
        <h1>Pizza Pizzaria & Delivery</h1>
        {!path.includes("/novo-produto") & !path.includes("/editar-produto") ? (
          <button onClick={() => handleLogout()}>Logout</button>
        ) : (
          ""
        )}
      </div>
    </header>
  );
};

export default Header;
