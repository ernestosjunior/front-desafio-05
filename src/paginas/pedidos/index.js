import "./styles.css";
import { useEffect } from "react";
import Header from "../../componentes/Header";
import SemPedidos from "../../componentes/SemPedidos";
import info from "../../assets/info.png";
import DetalhePedido from "../../componentes/DetalhePedido";
import filtros from "../../utils/filtros";
import { UseFetch } from "../../contexto/regraDeNegocio";

const Pedidos = () => {
  const {
    handleListarPedidos,
    setAbrirPedido,
    setPedidos,
    filtro,
    setFiltro,
    setFiltroBool,
    pedidosFiltrados,
  } = UseFetch();

  useEffect(async () => {
    const resposta = await handleListarPedidos();
    if (!resposta.erro) {
      setPedidos(resposta);
      return;
    }
  }, []);

  return (
    <div className="pedidos">
      <Header />
      <div className="pedidos__container">
        <div className="pedidos__btns__opcoes">
          {filtros.map((f) => (
            <button
              style={{
                backgroundColor: filtro === f.valor && "#D13201",
                color: filtro === f.valor && "#FFFFFF",
              }}
              id={`btn-op${f.id}`}
              onClick={() => {
                setFiltro(f.valor);
                setFiltroBool(f.bool);
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="grid">
          <span className="grid-header">Pedido</span>
          <span className="grid-header">Items</span>
          <span className="grid-header">Endereço</span>
          <span className="grid-header">Cliente</span>
          <span className="grid-header">Total</span>

          {/* Items separados apenas pelo <></> o css faz o resto*/}
          {pedidosFiltrados.length
            ? pedidosFiltrados.map((p) => (
                <>
                  <span className="grid-items">
                    {" "}
                    <div className="id-item">
                      <img
                        src={info}
                        className="btn-info"
                        alt="btn_info"
                        onClick={() => setAbrirPedido(true)}
                      />
                      <span>{p.id}</span>
                    </div>
                  </span>
                  <span className="grid-items">
                    {p.produtos.map((i) => (
                      <ul>
                        <li>
                          {i.nome} - {i.quantidade} uni
                        </li>
                      </ul>
                    ))}
                  </span>
                  <span className="grid-items">
                    {
                      (p.consumidor_endereco.endereco,
                      p.consumidor_endereco.complemento,
                      p.consumidor_endereco.cep)
                    }
                  </span>
                  <span className="grid-items">{p.consumidor.nome}</span>
                  <span className="grid-items">
                    <strong>R$ {(p.valor_total / 100).toFixed(2)}</strong>
                  </span>
                </>
              ))
            : ""}
        </div>
        {!pedidosFiltrados.length && <SemPedidos />}
      </div>
      <DetalhePedido />
    </div>
  );
};

export default Pedidos;
