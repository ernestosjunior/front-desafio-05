import "./style.css";
import Card from "../Card";

import { Link } from "react-router-dom";

const Produtos = ({ produtos }) => {
  return (
    <div className="produtos">
      <div className="btn-adicionar-prod">
        <Link to="/novo-produto">
          <button>Adicionar produto ao cardápio</button>
        </Link>
      </div>
      <div className="lista-produtos">
        {produtos.map((p) => (
          <Card nome={p.nome} descricao={p.descricao} preco={p.preco} />
        ))}
      </div>
    </div>
  );
};

export default Produtos;
