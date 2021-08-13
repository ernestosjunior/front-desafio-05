import { Link } from "react-router-dom";
import InputSenha from "../../componentes/InputSenha";
import "./style.css";

export default function ConsumidorLogin() {

  return (
    <div className="login-consumidor">
      <form className="forms-login-consumidor">
        <div className="titulos-paginas margem-titulo-consumidor">
          <h1>Login</h1>
          <h1 className="barril">Barril <span>!!</span></h1>
        </div>
        <label>
          Email
          <input
            type="text"
            className="inputs-login-consumidor"
          />
        </label>
        <br />
        <InputSenha
          label="Senha"
        />
        <div className="flex-column item-center cadastrar">
          <button className="botao-principal-login">Enviar</button>
          <spam className="cadastrar">
            Ainda não tem uma conta? <Link to="/consumidor-cadastro">Cadastre-se</Link>
          </spam>
        </div>
      </form>
    </div>
  );
}
