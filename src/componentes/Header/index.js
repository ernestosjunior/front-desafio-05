import "./style.css";

import Logo from "../../assets/pizarria.png";

const Header = () => {
  const path = window.location.pathname;
  return (
    <header>
      <img src={Logo} className="header__logo" alt="Logo" />
      <div className="header__conteudo">
        <h1>Pizza Pizzaria & Delivery</h1>
        {!path.includes("/novo-produto") & !path.includes("/editar-produto") ? (
          <button>Logout</button>
        ) : (
          ""
        )}
      </div>
    </header>
  );
};

export default Header;
