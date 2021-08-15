import { Link, useHistory } from "react-router-dom";
import InputSenha from "../../componentes/InputSenha";
import { useForm } from "react-hook-form";
import { UseFetch } from "../../contexto/regraDeNegocio";
import { UseClientAuth } from "../../contexto/autorizacaoConsumidores";
import "./style.css";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
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

export default function ConsumidorLogin() {
  const { handleLoginConsumidor } = UseFetch();
  const { setGravarConsumidor } = UseClientAuth();
  const history = useHistory();
  const [carregando, setCarregando] = useState(false);
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogar = async (data) => {
    setCarregando(true);
    const resposta = await handleLoginConsumidor(data);

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
    setGravarConsumidor(resposta);
    setCarregando(false);
    history.push("/lista-restaurantes");
    toast.success(`Olá, ${resposta.consumidor.nome}`, {
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
    <div className="login-consumidor">
      <form
        className="forms-login-consumidor"
        onSubmit={handleSubmit(handleLogar)}
      >
        <div className="titulos-paginas margem-titulo-consumidor">
          <h1>Login</h1>
          <h1 className="barril">
            Barril <span>!!</span>
          </h1>
        </div>
        <label>
          Email
          <input
            type="text"
            className="inputs-login-consumidor"
            style={{ borderColor: errors.email && "red" }}
            {...register("email", { required: true })}
          />
        </label>
        <br />
        <InputSenha
          label="Senha"
          style={{ borderColor: errors.senha && "red" }}
          {...register("senha", { required: true })}
        />
        <div className="flex-column item-center cadastrar">
          <button className="botao-principal-login">Enviar</button>
          <spam className="cadastrar">
            Ainda não tem uma conta?{" "}
            <Link to="/consumidor-cadastro">Cadastre-se</Link>
          </spam>
        </div>
      </form>
      <Backdrop className={classes.backdrop} open={carregando}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
