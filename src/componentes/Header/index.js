import "./style.css";
import { useHistory } from "react-router-dom";

import Logo from "../../assets/logo_padrao.png";
import BotoesHeader from "../BotoesHeader";

import { UseAuth } from "../../contexto/autorizacao";
import { UseFetch } from "../../contexto/regraDeNegocio";

const Header = () => {
  const path = window.location.pathname;
  const history = useHistory();

  const { removeGravarUsuario, gravarUsuario, removeCategorias } = UseAuth();
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
        src={
          gravarUsuario.restaurante[0].imagem
            ? gravarUsuario.restaurante[0].imagem
            : Logo
        }
        className="header__logo"
        alt="Logo"
        onClick={() => setAbrirCard(true)}
        style={{ cursor: "pointer" }}
      />
      <div className="header__conteudo">
        <h1 className="nome_restaurante">
          {gravarUsuario.restaurante[0].nome}
        </h1>
        <div className="header__botoes">
          <BotoesHeader />
          {!path.includes("/novo-produto") &
          !path.includes("/editar-produto") ? (
            <button
              onClick={() => handleLogout()}
              className="header__conteudo__button"
            >
              <span className="logout_btn">Logout</span>
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
