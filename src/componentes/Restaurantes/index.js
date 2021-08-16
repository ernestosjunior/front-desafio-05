import "./style.css";
import CardRestaurante from "../CardRestaurante";

const Restaurantes = ({ restaurantes }) => {
  return (
    <div className="restaurantes">
      <div className="restaurantes__input">
        <div className="restaurantes__input__busca">
          <input placeholder="Buscar" />
        </div>
      </div>
      <div className="restaurantes__lista"></div>
    </div>
  );
};

export default Restaurantes;
