import "./style.css";
import { useHistory } from "react-router-dom";

import Logo from "../../assets/logo_padrao.png";

import { UseAuth } from "../../contexto/autorizacao";
import { UseFetch } from "../../contexto/regraDeNegocio";

const HeaderConsumidor = () => {
  const path = window.location.pathname;
  const history = useHistory();

  const { removeGravarUsuario, gravarUsuario } = UseAuth();
  const { setAbrirCard, categorias } = UseFetch();

  const handleLogout = () => {
    removeGravarUsuario();
    history.push("/login");
  };

  return (
    <header className="header__consumidor">
      <img
        src={Logo}
        className="header__logo"
        alt="Logo"
        onClick={() => setAbrirCard(true)}
        style={{ cursor: "pointer" }}
      />
      <div className="header__conteudo">
        <h1 className="nome_restaurante"></h1>
        <button onClick={() => handleLogout()}>
          <span className="logout_btn">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default HeaderConsumidor;
