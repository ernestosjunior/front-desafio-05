import { Link } from "react-router-dom";
export default function Login() {
  return (
    <div className="login">
      <forms className="forms-login">
        <h1 className="titulos-paginas">Login</h1>
        <button className="botao-principal">Enviar</button>
        <spam>
          Ainda não tem uma conta? <Link>Cadastre-se</Link>
        </spam>
      </forms>
    </div>
  );
}
