import "./style.css";
import { useEffect, useState } from "react";
import CardRestaurante from "../CardRestaurante";

import semImagem from "../../assets/sem-imagem.jpg";

import SemRestaurantes from "../SemRestaurantes";

import { UseFetch } from "../../contexto/regraDeNegocio";

const Restaurantes = () => {
  const [filtro, setFiltro] = useState("");
  const { restaurantes, setRestaurantes, handleListarRestaurantes } =
    UseFetch();

  useEffect(() => {
    handleListarRestaurantes();
  }, []);

  const resultado =
    restaurantes.length &&
    restaurantes.filter((r) =>
      r.nome.toLowerCase().includes(filtro.toLowerCase())
    );

  return (
    <div className="restaurantes">
      <div className="restaurantes__input">
        <div className="restaurantes__input__busca">
          <input
            placeholder="Buscar"
            onChange={(e) => setFiltro(e.target.value)}
          />
        </div>
      </div>
      <div
        className={resultado && resultado.length > 0 && "restaurantes__lista"}
      >
        {resultado && resultado.length > 0 ? (
          resultado.map((r) => (
            <CardRestaurante
              nome={r.nome}
              descricao={r.descricao}
              imagem={semImagem}
            />
          ))
        ) : (
          <SemRestaurantes />
        )}
      </div>
    </div>
  );
};

export default Restaurantes;
