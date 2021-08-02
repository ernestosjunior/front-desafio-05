import { Link } from "react-router-dom";
import InputSenha from "../../componentes/InputSenha";
import { useForm } from "react-hook-form";
import { UseFetch } from "../../contexto/regraDeNegocio";
import "./style.css";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Insira um email válido.")
    .required("Campo obrigatório."),
  senha: yup.string().required("Campo obrigatório."),
});

export default function Login() {
  const { handleLogin } = UseFetch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div className="login">
      <form className="forms-login" onSubmit={handleSubmit(handleLogin)}>
        <h1 className="titulos-paginas margem-titulo">Login</h1>
        <label>
          Email
          <input
            type="text"
            className="inputs-login"
            style={{ borderColor: errors.email && "red" }}
            {...register("email", { required: true })}
          />
        </label>
        <p className="erro__input">{errors.email?.message}</p>
        <br />
        <InputSenha {...register("senha", { required: true })} />
        <p className="erro__input">{errors.senha?.message}</p>
        <div className="flex-column item-center cadastrar">
          <button className="botao-principal-login">Enviar</button>
          <spam className="cadastrar">
            Ainda não tem uma conta? <Link to="/usuarios">Cadastre-se</Link>
          </spam>
        </div>
      </form>
    </div>
  );
}
