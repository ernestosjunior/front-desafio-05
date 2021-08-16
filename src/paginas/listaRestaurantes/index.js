import "./style.css";
import { useEffect } from "react";
import HeaderConsumidor from "../../componentes/HeaderConsumidor";
import Restaurantes from "../../componentes/Restaurantes";
import { UseFetch } from "../../contexto/regraDeNegocio";

const Inicial = () => {
  const { produtos, listarProdutos } = UseFetch();

  useEffect(() => {}, []);

  return (
    <>
      <HeaderConsumidor />
      <div className="container__restaurantes">
        <Restaurantes />
      </div>
    </>
  );
};

export default Inicial;
