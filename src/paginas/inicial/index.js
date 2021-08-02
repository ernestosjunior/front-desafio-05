import "./style.css";
import Header from "../../componentes/Header";
import SemProdutos from "../../componentes/SemProdutos";
import Produtos from "../../componentes/Produtos";

import { useState } from "react";
const Inicial = () => {
  const [produtos, setProdutos] = useState([]);

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
