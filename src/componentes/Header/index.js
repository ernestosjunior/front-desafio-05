import "./style.css";
import { useHistory } from "react-router-dom";

import Logo from "../../assets/pizarria.png";

import { UseAuth } from "../../contexto/autorizacao";
import { UseFetch } from "../../contexto/regraDeNegocio";

const Header = () => {
  const path = window.location.pathname;
  const history = useHistory();

  const { removeGravarUsuario } = UseAuth();
  const { setAbrirCard } = UseFetch();

  const handleLogout = () => {
    removeGravarUsuario();
    history.push("/login");
  };

  return (
    <header>
      <img
        src={Logo}
        className="header__logo"
        alt="Logo"
        onClick={setAbrirCard(true)}
      />
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
