import { useState, useEffect } from "react";
import "./style.css";
import Header from "../../componentes/Header";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UseFetch } from "../../contexto/regraDeNegocio";

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

const EditarProduto = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { register, handleSubmit } = useForm();
  const { produtos } = UseFetch();

  const [state, setState] = useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const produtoEdicao = produtos.filter((p) => p.id === Number(id));

  const handleEditarProduto = (data) => {
    console.log(id);
  };

  return (
    <div>
      <Header />
      <Backdrop className={classes.backdrop} open={true}>
        <form onSubmit={handleSubmit(handleEditarProduto)}>
          <div className="modal__editar">
            <div className="modal__esquerda__editar">
              <h1 className="modal__esquerda__editar__titulo">
                Editar Produto
              </h1>
              <label>
                Nome
                <input
                  className="input-nome"
                  {...register("nome")}
                  value={produtoEdicao.length && produtoEdicao[0].nome}
                />
              </label>
              <label>
                Descrição
                <textarea
                  className="input-descricao"
                  maxLength="80"
                  {...register("descricao")}
                  value={produtoEdicao.length ? produtoEdicao[0].descricao : ""}
                ></textarea>
                <span className="descricao-obs">Máx.: 80 caracteres</span>
              </label>
              <label>
                Valor
                <input
                  type="number"
                  className="input-valor"
                  pattern="[0-9]+([,\.][0-9]+)?"
                  min="0"
                  step="any"
                  placeholder="R$ 00,00"
                  value={
                    produtoEdicao.length &&
                    (produtoEdicao[0].preco / 100).toFixed(2)
                  }
                />
              </label>
              <div className="form-checkbox">
                <AntSwitch
                  checked={state.checkedA}
                  onChange={handleChange}
                  name="checkedA"
                />
                <p>Ativar produto</p>
              </div>
              <div className="form-checkbox">
                <AntSwitch
                  checked={state.checkedB}
                  onChange={handleChange}
                  name="checkedB"
                />
                <p>Permitir observações</p>
              </div>
            </div>
            <div className="modal__editar__direita">
              <div></div>
              <div>
                <Link to="/">
                  <button className="btn__clean__laranja">Cancelar</button>
                </Link>
                <button className="btn__laranja">Salvar alterações</button>
              </div>
            </div>
          </div>
        </form>
      </Backdrop>
    </div>
  );
};

export default EditarProduto;
