import "./style.css";
import { Link } from "react-router-dom";

const SemProdutos = () => {
  return (
    <div className="sem-produtos">
      <p>
        Você ainda não tem nenhum produto no seu cardápio. Gostaria de adicionar
        um novo produto?
      </p>
      <Link to="/novo-produto">
        <button>Adicionar produto ao cardápio</button>
      </Link>
    </div>
  );
};

export default SemProdutos;
