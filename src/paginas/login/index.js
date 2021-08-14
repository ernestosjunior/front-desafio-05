import { Link, useHistory } from "react-router-dom";
import InputSenha from "../../componentes/InputSenha";
import { useForm } from "react-hook-form";
import { UseFetch } from "../../contexto/regraDeNegocio";
import { UseAuth } from "../../contexto/autorizacao";
import { useEffect, useState } from "react";
import "./style.css";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Insira um email válido.")
    .required("Campo obrigatório."),
  senha: yup.string().required("Campo obrigatório."),
});

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function Login() {
  const { handleLogin, handleCategoria } = UseFetch();
  const { setGravarUsuario } = UseAuth();
  const [carregando, setCarregando] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    handleCategoria();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogar = async (data) => {
    setCarregando(true);
    const resposta = await handleLogin(data);

    if (resposta.erro) {
      setCarregando(false);
      toast.error(resposta.erro, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    setGravarUsuario(resposta);
    setCarregando(false);
    history.push("/");
    toast.success(`Olá, ${resposta.usuario.nome}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="login">
      <form className="forms-login" onSubmit={handleSubmit(handleLogar)}>
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
        <InputSenha
          label="Senha"
          style={{ borderColor: errors.senha && "red" }}
          {...register("senha", { required: true })}
        />
        <p className="erro__input">{errors.senha?.message}</p>
        <div className="flex-column item-center cadastrar">
          <button className="botao-principal-login">Enviar</button>
          <spam className="cadastrar">
            Ainda não tem uma conta? <Link to="/usuarios">Cadastre-se</Link>
          </spam>
        </div>
      </form>
      <Backdrop className={classes.backdrop} open={carregando}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
