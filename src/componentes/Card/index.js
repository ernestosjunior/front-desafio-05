import { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

import { ReactComponent as IconEditar } from "../../assets/icon-editar.svg";

const Card = ({ nome, descricao, preco, imagem, id }) => {
  const [visivel, setVisivel] = useState(false);
  return (
    <div className="card" onClick={() => setVisivel(!visivel)}>
      {visivel && (
        <div className="card__opcoes">
          <button className="card__opcoes__btn-excluir">
            Excluir produto do catálogo
          </button>
          <Link to={`/editar-produto/${id}`}>
            <button className="card__opcoes__btn-editar">
              Editar produto <IconEditar />
            </button>
          </Link>
        </div>
      )}
      <div>
        <h1>{nome}</h1>
        <p>{descricao}</p>
        <p className="card__preco">R$ {preco / 100}</p>
      </div>
      <div className="card__imagem"></div>
    </div>
  );
};

export default Card;
