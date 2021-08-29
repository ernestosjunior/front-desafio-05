import ItemCarrinho from "./ItemPedido";
import "./style.css";

import { UseFetch } from "../../contexto/regraDeNegocio";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const DetalhePedido = () => {
  const { abrirPedido, setAbrirPedido, pedidoDetalhado, handleEnviarPedido } =
    UseFetch();
  const [total, setTotal] = useState(0);
  const [carregando, setCarregando] = useState(false);
  const history = useHistory();

  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  }));
  const classes = useStyles();

  useEffect(() => {
    if (!pedidoDetalhado) {
      return;
    }

    const valores = pedidoDetalhado?.produtos;
    const precos = [];
    for (const item of valores) {
      precos.push(item.preco * item.quantidade);
    }

    const valor = precos.reduce((acc, x) => acc + x);

    const valorT = (valor / 100).toFixed(2);
    setTotal(valorT);
  }, [pedidoDetalhado]);

  const handleEnviar = async (data) => {
    setCarregando(true);
    const resposta = await handleEnviarPedido(data);

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
    setCarregando(false);
    history.push("/");
    toast.success(`Pedido a caminho!`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setAbrirPedido(false);
  };

  return (
    <div className={abrirPedido ? "detalhe-pedido-container" : "fechado"}>
      <div className="detalhe-pedido-modal">
        <span className="fechar-modal" onClick={() => setAbrirPedido(false)}>
          &times;
        </span>
        <div className="pedido-info">
          <h1 className="pedido-id">{pedidoDetalhado?.id}</h1>
          <h3 className="nome-consumidor">
            {pedidoDetalhado?.consumidor.nome}
          </h3>
        </div>
        <p className="endereco">
          <span>Endereço de Entrega: </span>
          {pedidoDetalhado?.consumidor_endereco.endereco +
            ", " +
            pedidoDetalhado?.consumidor_endereco.complemento +
            ". " +
            pedidoDetalhado?.consumidor_endereco.cep}
        </p>
        <div className="pedido-produtos">
          {pedidoDetalhado?.produtos.map((pp) => (
            <ItemCarrinho
              nomeProduto={pp.nome}
              quantidade={pp.quantidade}
              precoProduto={pp.preco}
              imagemProduto={pp.imagem}
            />
          ))}
        </div>
        <div className="container-enviar-pedido">
          <div className="preco">
            <h3>Total</h3>
            <h3>R$ {total}</h3>
          </div>
          {pedidoDetalhado?.entregue ? (
            <button className="btn-entregue" type="button">
              Enviar Pedido
            </button>
          ) : (
            <button
              onClick={() => handleEnviar(pedidoDetalhado?.id)}
              className="btn-nao-entregue"
            >
              Enviar Pedido
            </button>
          )}
        </div>
      </div>
      <Backdrop className={classes.backdrop} open={carregando}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default DetalhePedido;
