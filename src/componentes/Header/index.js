import "./style.css";

import Logo from "../../assets/pizarria.png";

const Header = () => {
  return (
    <header>
      <img src={Logo} className="logo" alt="Logo" />
      <div className="header-content">
        <h1>Pizza Pizzaria & Delivery</h1>
        <button>Logout</button>
      </div>
    </header>
  );
};

export default Header;
