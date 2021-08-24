import ItemCarrinho from "./ItemPedido";
import "./style.css";

import Logo from "../../assets/logo_padrao.png";

const DetalhePedido = () => {
  return (
    <div className="detalhe-pedido-container">
      <div className="detalhe-pedido-modal">
        <span className="fechar-modal">&times;</span>
        <div className="pedido-info">
          <h1 className="pedido-id">0001</h1>
          <h3 className="nome-consumidor">Nome Consumidor</h3>
        </div>
        <p className="endereco"><span>Endereço de Entrega: </span>Av. Tancredo Neves, 2227, ed. Salvador Prime, sala 901:906; 917:920 - Caminho das Árvores, Salvador - BA, 41820-021</p>
        <div className="produtos">
          <ItemCarrinho
            nomeProduto="Pizza Portuguesa"
            quantidade="1"
            precoProduto="9999"
            imagemProduto={Logo}
          />
          <ItemCarrinho
            nomeProduto="Pizza Marguerita"
            quantidade="2"
            precoProduto="19998"
            imagemProduto={Logo}
          />
          <ItemCarrinho
            nomeProduto="Pizza Calabresa"
            quantidade="2"
            precoProduto="19998"
            imagemProduto={Logo}
          />
        </div>
        <div className="container-enviar-pedido">
          <div className="preco">
            <h3>Total</h3>
            <h3>R$ 308,87</h3>
          </div>

          {/* Quando o pedido não foi entregue ainda */}
          <button className="btn-nao-entregue">Enviar Pedido</button>


          {/* Quando o pedido foi entregue  */}
          <button className="btn-entregue">Enviar Pedido</button>
        </div>
      </div>
    </div>
  );
};

export default DetalhePedido;
