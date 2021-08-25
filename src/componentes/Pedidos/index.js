import "./style.css";

const Pedidos = () => {
  return (
    <div className="modal-pedidos">
      <div className="buttons">
        {/* Listagem de pedidos entregues e não entregues

          Não entregues como padrão */}
        <button className="btn btn-não-entregue" style={{ backgroundColor: "#D13201", color: "white" }}>Não entregues</button>

        {/* Ao clicar em entregues, exibir apenas os entregues e inverter as cores dos botões */}
        <button className="btn btn-entregue" style={{ backgroundColor: "#F0F0F0" }}>Entregues</button>
      </div>
      <div className="grid">
        <span className="grid-header">Pedido</span>
        <span className="grid-header">Items</span >
        <span className="grid-header">Endereço</span>
        <span className="grid-header">Cliente</span>
        <span className="grid-header">Total</span>

        {/* Items separados apenas pelo <></> o css faz o resto*/}
        <>
          <span className="grid-items"> <strong>0001</strong></span>
          <span className="grid-items">Items do pedido</span>
          <span className="grid-items">Endereço do Cliente</span>
          <span className="grid-items">Nome do Cliente</span>
          <span className="grid-items"><strong>R$ 199,98</strong></span>
        </>
        <>
          <span className="grid-items"><strong>0002</strong></span>
          <span className="grid-items">Items do pedido</span>
          <span className="grid-items">Endereço do Cliente</span>
          <span className="grid-items">Nome do Cliente</span>
          <span className="grid-items"><strong>R$ 199,98</strong></span>
        </>
        <>
          <span className="grid-items"><strong>0003</strong></span>
          <span className="grid-items">Items do pedido</span>
          <span className="grid-items">Endereço do Cliente</span>
          <span className="grid-items">Nome do Cliente</span>
          <span className="grid-items"><strong>R$ 199,98</strong></span>
        </>
      </div>
    </div>
  )
};

export default Pedidos;
