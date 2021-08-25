import "./style.css";
import { useEffect } from "react";
import Header from "../../componentes/Header";
import SemProdutos from "../../componentes/SemProdutos";
import Produtos from "../../componentes/Produtos";
import Perfil from "../../componentes/Perfil";
import { UseFetch } from "../../contexto/regraDeNegocio";
import Pedidos from "../../componentes/Pedidos";

const Inicial = () => {
  const { produtos, listarProdutos } = UseFetch();

  useEffect(() => {
    listarProdutos();
  }, []);

  return (
    <>
      <Header />
      <div className="container__produtos">
        {!produtos.length ? <SemProdutos /> : <Produtos produtos={produtos} />}
      </div>
      <Perfil />

      {/* Deixei os pedidos aqui só pra testar como ficou na tela */}
      <Pedidos />
    </>
  );
};

export default Inicial;
