import "./styles.css";
import { useState, useEffect } from "react";
import Header from "../../componentes/Header";
import SemPedidos from "../../componentes/SemPedidos";
import info from "../../assets/info.png";

import { UseFetch } from "../../contexto/regraDeNegocio";

const filtros = [
  {
    id: 1,
    label: "Não Entregues",
    valor: "naoentregues",
    bool: false,
  },
  {
    id: 2,
    label: "Entregues",
    valor: "entregues",
    bool: true,
  },
];

const Pedidos = () => {
  const [filtro, setFiltro] = useState("naoentregues");
  const [filtroBool, setFiltroBool] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [verMais, setVerMais] = useState(false);

  const { handleListarPedidos } = UseFetch();

  useEffect(async () => {
    const resposta = await handleListarPedidos();
    if (!resposta.erro) {
      setPedidos(resposta);
      return;
    }
  }, []);

  const pedidosFiltrados = pedidos.filter((p) => p.entregue === filtroBool);

  const slicer = (array, size) => {
    const resp = array.slice(0, size);
    console.log(resp);
    return resp;
  }

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

          {pedidosFiltrados.length
            ? pedidosFiltrados.map((p) => (
              <>
                <span className="grid-items">
                  {" "}
                  <div className="id-item">
                    <img src={info} className="btn-info" alt="btn_info" />
                    <span>{p.id}</span>
                  </div>
                </span>
                <span className="grid-items grid-produtos">
                  {!verMais && p.produtos.length > 2
                    ?
                    (
                      slicer(p.produtos, 1).map((i) => (
                        <ul>
                          <li>
                            {i.nome} - {i.quantidade} uni
                          </li>
                          <br />
                        </ul>
                      ))
                    )
                    :
                    (
                      p.produtos.map((i) => (
                        <ul>
                          <li>
                            {i.nome} - {i.quantidade} uni
                          </li>
                        </ul>
                      ))
                    )
                  }
                  {
                    p.produtos.length > 2 ?
                      <button
                        onClick={() => setVerMais(!verMais)}
                        className={
                          p.produtos.length < 2
                            ? "ver-menos"
                            : "ver-mais"
                        }
                      >
                        {verMais ? "ver menos" : "ver mais"}
                      </button>

                      :
                      ""
                  }
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
    </div>
  );
};

export default Pedidos;
