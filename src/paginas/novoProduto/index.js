import { useState } from "react";
import "./style.css";
import Header from "../../componentes/Header";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { UseFetch } from "../../contexto/regraDeNegocio";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(12px)",
      color: "#0D8A4F",
      "& + $track": {
        opacity: 1,
        backgroundColor: "rgba(42, 176, 113, 0.2)",
        borderColor: "#0D8A4F",
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: "none",
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

const schema = yup.object().shape({
  nome: yup.string().required("Campo obrigatório."),
  preco: yup.string().required("Campo obrigatório."),
});

const NovoProduto = () => {
  const classes = useStyles();
  const history = useHistory();
  const { adicionarProduto, produtos, setProdutos } = UseFetch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [state, setState] = useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleAddProduto = async (data) => {
    const valorFormatado = data.preco.replace(",", "").replace(".", "");
    const corpo = {
      nome: data.nome,
      descricao: data.descricao,
      preco: valorFormatado,
      ativo: state.checkedA,
      permite_observacoes: state.checkedB,
    };
    const resposta = await adicionarProduto(corpo);
    if (resposta.erro) {
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
    toast.success("Produto cadastrado com sucesso!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    const novosProdutos = [...produtos];
    novosProdutos.push(resposta);
    setProdutos(novosProdutos);
    history.push("/");
  };

  return (
    <div>
      <Header />
      <Backdrop className={classes.backdrop} open={true}>
        <form onSubmit={handleSubmit(handleAddProduto)}>
          <div className="modal">
            <div className="modal__esquerda">
              <h1 className="modal__esquerda__titulo">Novo produto</h1>
              <label>
                Nome
                <input
                  className="input__nome"
                  {...register("nome")}
                  style={{ borderColor: errors.nome && "red" }}
                />
                <p className="erro__input">{errors.nome?.message}</p>
              </label>
              <label>
                Descrição
                <textarea
                  className="input__descricao"
                  maxLength="80"
                  {...register("descricao")}
                ></textarea>
                <span className="descricao__obs">Máx.: 80 caracteres</span>
              </label>
              <label>
                Valor
                <input
                  type="number"
                  className="input__valor"
                  pattern="[0-9]+([,\.][0-9]+)?"
                  min="0"
                  step="any"
                  placeholder="R$ 00,00"
                  {...register("preco")}
                  style={{ borderColor: errors.preco && "red" }}
                />
                <p className="erro__input">{errors.preco?.message}</p>
              </label>
              <div className="input__checkbox">
                <AntSwitch
                  checked={state.checkedA}
                  onChange={handleChange}
                  name="checkedA"
                />
                <p>Ativar produto</p>
              </div>
              <div className="input__checkbox">
                <AntSwitch
                  checked={state.checkedB}
                  onChange={handleChange}
                  name="checkedB"
                />
                <p>Permitir observações</p>
              </div>
            </div>
            <div className="modal__direita">
              <div></div>
              <div>
                <Link to="/">
                  <button className="btn__clean__laranja">Cancelar</button>
                </Link>
                <button className="btn__laranja" type="submit">
                  Adicionar produto ao cardápio
                </button>
              </div>
            </div>
          </div>
        </form>
      </Backdrop>
    </div>
  );
};

export default NovoProduto;
