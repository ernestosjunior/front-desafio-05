import { Link, useHistory } from "react-router-dom";
import InputSenha from "../../componentes/InputSenha";
import "./style.css";
import { useForm } from "react-hook-form";
import { UseFetch } from "../../contexto/regraDeNegocio";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const schema = yup.object().shape({
  nome: yup.string().required("Campo não pode ser nulo"),
  email: yup.string().required("Campo não pode ser nulo"),
  telefone: yup.number().required("Campo não pode ser nulo"),
  senha: yup.string().required("Campo não pode ser nulo"),
  confirmarSenha: yup
    .string()
    .oneOf([yup.ref("senha"), null], "As senhas devem ser iguais"),
});

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function ConsumidorCadastro() {
  const { handleCadastroConsumidor } = UseFetch();
  const [carregando, setCarregando] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleCadastrar = async (data) => {
    setCarregando(true);
    const resposta = await handleCadastroConsumidor(data);
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
    setCarregando(false);
    toast.success("Usuário cadastrado com sucesso!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    history.push("/consumidor-login");
  };

  return (
    <div className="cadastro-consumidor">
      <form
        className="forms-cadastro-consumidor"
        onSubmit={handleSubmit(handleCadastrar)}
      >
        <h1 className="titulos-paginas margem-titulo-cadastro-consumidor">
          cadastro
        </h1>
        <label className="label-cadastro">
          Nome usuário
          <input
            className="inputs-cadastro"
            type="text"
            style={{ borderColor: errors.nome && "red" }}
            {...register("nome", { required: true })}
          />
          <p className="erro__input">{errors.nome?.message}</p>
        </label>
        <br />
        <label>
          Email
          <input
            type="text"
            className="inputs-cadastro-consumidor"
            style={{ borderColor: errors.email && "red" }}
            {...register("email", { required: true })}
          />
          <p className="erro__input">{errors.email?.message}</p>
        </label>
        <br />
        <label className="label-cadastro">
          Telefone
          <input
            className="inputs-cadastro"
            type="text"
            style={{ borderColor: errors.telefone && "red" }}
            {...register("telefone", { required: true })}
          />
          <p className="erro__input">{errors.telefone?.message}</p>
        </label>
        <br />
        <InputSenha
          label="Senha"
          style={{ borderColor: errors.senha && "red" }}
          {...register("senha", { required: true })}
        />
        <p className="erro__input">{errors.senha?.message}</p>
        <br />
        <InputSenha
          label="Confirmar Senha"
          style={{ borderColor: errors.confirmarSenha && "red" }}
          {...register("confirmarSenha", { required: true })}
        />
        <p className="erro__input">{errors.confirmarSenha?.message}</p>
        <div className="flex-column item-center cadastrar">
          <button className="botao-principal-login">Enviar</button>
          <spam className="cadastrar">
            Já tem uma conta? <Link to="/consumidor-login">Login</Link>
          </spam>
        </div>
      </form>
      <Backdrop className={classes.backdrop} open={carregando}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
