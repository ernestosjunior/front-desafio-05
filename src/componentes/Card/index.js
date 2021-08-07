import { useState } from "react";
import { Link } from "react-router-dom";
import { UseFetch } from "../../contexto/regraDeNegocio";
import { toast } from "react-toastify";
import "./style.css";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

import { ReactComponent as IconEditar } from "../../assets/icon-editar.svg";

export const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const Card = ({ id, nome, descricao, preco, imagem }) => {
  console.log(imagem);
  const [visivel, setVisivel] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const classes = useStyles();
  const { removerProduto, produtos, setProdutos } = UseFetch();

  const handleRemoverProduto = async () => {
    setCarregando(true);
    const resposta = await removerProduto(id);
    if (resposta.erro) {
      setCarregando(false);
      toast.error(resposta.erro, {
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
    setCarregando(false);
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
      <div className="card__front">
        <div>
          <h1>{nome}</h1>
          <p>{descricao}</p>
          <p className="card__preco">R$ {(preco / 100).toFixed(2)}</p>
        </div>
        <div className="card__imagem">
          <img src={imagem} />
        </div>
      </div>

      <Backdrop className={classes.backdrop} open={carregando}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Card;
