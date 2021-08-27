import "./styles.css";
import { Link } from "react-router-dom";

const BotoesHeader = () => {
  return (
    <div className="header__btns__container">
      <button className="header__btns__opcoes">
        <Link to="/">Cardápio</Link>
      </button>
      <button className="header__btns__opcoes">
        <Link to="/pedidos">Pedidos</Link>
      </button>
    </div>
  );
};

export default BotoesHeader;
