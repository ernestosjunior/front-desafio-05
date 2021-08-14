import { Link } from "react-router-dom";
import InputSenha from "../../componentes/InputSenha";
import "./style.css";

export default function ConsumidorCadastro() {

  return (
    <div className="cadastro-consumidor">
      <form className="forms-cadastro-consumidor">
        <h1 className="titulos-paginas margem-titulo-cadastro-consumidor">cadastro</h1>
        <label className="label-cadastro">
          Nome usuário
          <input
            className="inputs-cadastro"
            type="text"
          />
        </label>
        <br />
        <label>
          Email
          <input
            type="text"
            className="inputs-cadastro-consumidor"
          />
        </label>
        <br />
        <label className="label-cadastro">
          Telefone
          <input
            className="inputs-cadastro"
            type="text"
          />
        </label>
        <br />
        <InputSenha
          label="Senha"
        />
        <br />
        <InputSenha
          label="Confirmar Senha"
        />
        <div className="flex-column item-center cadastrar">
          <button className="botao-principal-login">Enviar</button>
          <spam className="cadastrar">
            Já tem uma conta? <Link to="/consumidor-login">Login</Link>
          </spam>
        </div>
      </form>
    </div>
  );
}
