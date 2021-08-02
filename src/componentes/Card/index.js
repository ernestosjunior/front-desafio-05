import { useState } from "react";
import { Link } from "react-router-dom";
import { UseFetch } from "../../contexto/regraDeNegocio";
import { toast } from "react-toastify";
import "./style.css";

import { ReactComponent as IconEditar } from "../../assets/icon-editar.svg";

const Card = ({
  id,
  nome,
  descricao,
  preco,
  imagem,
  ativo,
  permite_observacoes,
}) => {
  const [visivel, setVisivel] = useState(false);

  const { removerProduto, produtos, setProdutos } = UseFetch();

  const handleRemoverProduto = async () => {
    const { erro } = await removerProduto(id);

    if (erro) {
      toast.error(erro, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    const novosProdutos = produtos.filter((p) => p.id !== id);
    setProdutos(novosProdutos);
    toast.success("Produto removido com sucesso!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="card" onMouseEnter={() => setVisivel(!visivel)}>
      {visivel && (
        <div className="card__opcoes">
          <button
            className="card__opcoes__btn-excluir"
            onClick={() => handleRemoverProduto()}
          >
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
