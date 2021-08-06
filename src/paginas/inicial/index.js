import "./style.css";
import { useEffect } from "react";
import Header from "../../componentes/Header";
import SemProdutos from "../../componentes/SemProdutos";
import Produtos from "../../componentes/Produtos";
import Perfil from "../../componentes/Perfil";
import { UseFetch } from "../../contexto/regraDeNegocio";

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
    </>
  );
};

export default Inicial;
