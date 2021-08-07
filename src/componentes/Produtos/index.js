import "./style.css";
import Card from "../Card";

import { Link } from "react-router-dom";

const Produtos = ({ produtos }) => {
  return (
    <div className="produtos">
      <div className="produtos__btn__adicionar">
        <Link to="/novo-produto">
          <button>Adicionar produto ao cardápio</button>
        </Link>
      </div>
      <div className="produtos__lista">
        {produtos.map((p) => (
          <Card
            key={p.id}
            id={p.id}
            nome={p.nome}
            descricao={p.descricao}
            preco={p.preco}
            imagem={p.imagem}
          />
        ))}
      </div>
    </div>
  );
};

export default Produtos;
