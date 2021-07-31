import { Link } from "react-router-dom";
import Input from "../../componentes/Input";
import "./style.css";

export default function Login() {
  return (
    <div className="login">
      <forms className="forms-login">
        <h1 className="titulos-paginas">Login</h1>
        <Input nomeCampo="E-mail" idCampo="email" />
        <Input nomeCampo="Senha" idCampo="senha" />
        <button className="botao-principal">Enviar</button>
        <spam>
          Ainda não tem uma conta? <Link>Cadastre-se</Link>
        </spam>
      </forms>
    </div>
  );
}