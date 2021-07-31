import { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

import { ReactComponent as IconEditar } from "../../assets/icon-editar.svg";

const Card = ({ nome, descricao, preco, imagem }) => {
  const [visivel, setVisivel] = useState(false);
  return (
    <div className="card" onClick={() => setVisivel(!visivel)}>
      {visivel && (
        <div className="opcoes-card ">
          <button className="btn-excluir">Excluir produto do catálogo</button>
          <Link to="/editar-produto">
            <button className="btn-editar">
              Editar produto <IconEditar />
            </button>
          </Link>
        </div>
      )}
      <div>
        <h1>{nome}</h1>
        <p>{descricao}</p>
        <p className="card-preco">R$ {preco / 100}</p>
      </div>
      <div className="imagem"></div>
    </div>
  );
};

export default Card;
