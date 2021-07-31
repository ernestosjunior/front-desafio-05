import { Link } from "react-router-dom";
import Input from "../../componentes/Input";
import InputSenha from "../../componentes/InputSenha";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useEffect } from "react";
import { UseFetch } from "../../contexto/regraDeNegocio";
import "./style.css";

export default function Login() {
  const [senhaLogin, setSenhaLogin] = useState("");
  const { handleLogin } = UseFetch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (
      errors.email?.type === "required" ||
      errors.senha?.type === "required"
    ) {
      // toast.error("Digite email e senha");
    }
  }, [errors.email, errors.senha]);

  return (
    <div className="login">
      <form className="forms-login" onSubmit={handleSubmit(handleLogin)}>
        <h1 className="titulos-paginas margem-titulo">Login</h1>
        <Input
          nomeCampo="E-mail"
          idCampo="email"
          {...register("email", { required: true })}
        />
        <InputSenha
          nomeCampo="Senha"
          idCampo="senha"
          value={senhaLogin}
          setValue={setSenhaLogin}
          {...register("senha", { required: true })}
        />
        <div className="flex-column item-center">
          <button className="botao-principal">Enviar</button>
          <spam className="cadastrar">
            Ainda não tem uma conta? <Link>Cadastre-se</Link>
          </spam>
        </div>
      </form>
    </div>
  );
}
