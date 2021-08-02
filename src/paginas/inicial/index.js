import "./style.css";
import Header from "../../componentes/Header";
import SemProdutos from "../../componentes/SemProdutos";
import Produtos from "../../componentes/Produtos";

import { UseFetch } from "../../contexto/regraDeNegocio";

const Inicial = () => {
  const { produtos } = UseFetch();
  return (
    <>
      <Header />
      <div className="container__produtos">
        {!produtos.length ? <SemProdutos /> : <Produtos produtos={produtos} />}
      </div>
    </>
  );
};

export default Inicial;
