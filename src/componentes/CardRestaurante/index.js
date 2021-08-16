import "./style.css";

const CardRestaurante = ({ id, nome, descricao, preco, imagem }) => {
  return (
    <div className="card">
      <div className="card__front">
        <div>
          <h1>{nome}</h1>
          <p>{descricao}</p>
          <p className="card__preco">$$</p>
        </div>
        <div className="card__imagem">
          <img src={imagem} />
        </div>
      </div>
    </div>
  );
};

export default CardRestaurante;
