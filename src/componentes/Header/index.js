import "./style.css";
import { useHistory } from "react-router-dom";

import Logo from "../../assets/logo_padrao.png";

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
        src={gravarUsuario.restaurante[0].imagem ? gravarUsuario.restaurante[0].imagem : Logo}
        className="header__logo"
        alt="Logo"
        onClick={() => setAbrirCard(true)}
        style={{ cursor: "pointer" }}
      />
      <div className="header__conteudo">
        <div className="header_items">
          <h1 className="nome_restaurante">{gravarUsuario.restaurante[0].nome}</h1>
          <div className="header_buttons">
            <button className="btn btn_cardapio">Cardápio</button>
            <button className="btn btn_pedidos">Pedidos</button>
          </div>
        </div>
        {!path.includes("/novo-produto") & !path.includes("/editar-produto") ? (
          <button onClick={() => handleLogout()}><span className="logout_btn">Logout</span></button>
        ) : (
          ""
        )}
      </div>
    </header>
  );
};

export default Header;
