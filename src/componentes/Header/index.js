import "./style.css";
import { useHistory } from "react-router-dom";

import Logo from "../../assets/pizarria.png";

import { UseAuth } from "../../contexto/autorizacao";
import { UseFetch } from "../../contexto/regraDeNegocio";

const Header = () => {
  const path = window.location.pathname;
  const history = useHistory();

  const { removeGravarUsuario, gravarUsuario } = UseAuth();
  const { setAbrirCard, categorias } = UseFetch();

  const handleLogout = () => {
    removeGravarUsuario();
    history.push("/login");
  };
  const imagemBanner = categorias.filter(
    (categoria) => categoria.id === gravarUsuario.restaurante[0].categoria_id
  );

  return (
    <header
      style={{
        backgroundImage: `url(${imagemBanner[0].imagem})`,
      }}
    >
      <img
        src={Logo}
        className="header__logo"
        alt="Logo"
        onClick={() => setAbrirCard(true)}
        style={{ cursor: "pointer" }}
      />
      <div className="header__conteudo">
        <h1>{gravarUsuario.restaurante[0].nome}</h1>
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
