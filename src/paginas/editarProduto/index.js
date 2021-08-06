import { useEffect, useState } from "react";
import "./style.css";
import Header from "../../componentes/Header";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import { Link, useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
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
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const { produtos, setProdutos, editarProduto } = UseFetch();

  const [ativo, setAtivo] = useState(true);
  const [permiteObservacoes, setPerimiteObservacoes] = useState(true);

  const handleAtivo = (event) => {
    if (event.target.name === "ativo") {
      setAtivo(event.target.checked);
      return;
    }
    return;
  };

  const handlePermiteObservacoes = (event) => {
    if (event.target.name === "permiteObservacoes") {
      setPerimiteObservacoes(event.target.checked);
      return;
    }
    return;
  };

  const produtoEdicao = produtos.filter((p) => p.id === Number(id));

  useEffect(() => {
    if (produtoEdicao.length) {
      setAtivo(produtoEdicao[0].ativo);
      setPerimiteObservacoes(produtoEdicao[0].permiteObservacoes);
      return;
    }
  }, []);

  const handleEditarProduto = async (data) => {
    const corpo = {
      nome: data.nome,
      descricao: data.descricao,
      preco: data.preco.replace(",", "").replace(".", ""),
      ativo: ativo,
      permite_observacoes: permiteObservacoes,
    };

    const resposta = await editarProduto(id, corpo);
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
    toast.success("Produto atualizado com sucesso!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    history.push("/");
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
                  defaultValue={produtoEdicao.length && produtoEdicao[0].nome}
                />
              </label>
              <label>
                Descrição
                <textarea
                  className="input-descricao"
                  maxLength="80"
                  {...register("descricao")}
                  defaultValue={
                    produtoEdicao.length ? produtoEdicao[0].descricao : ""
                  }
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
                  defaultValue={
                    produtoEdicao.length &&
                    (produtoEdicao[0].preco / 100).toFixed(2)
                  }
                  {...register("preco")}
                />
              </label>
              <div className="form-checkbox">
                <AntSwitch
                  checked={ativo}
                  onChange={handleAtivo}
                  name="ativo"
                />
                <p>Ativar produto</p>
              </div>
              <div className="form-checkbox">
                <AntSwitch
                  checked={permiteObservacoes}
                  onChange={handlePermiteObservacoes}
                  name="permiteObservacoes"
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
