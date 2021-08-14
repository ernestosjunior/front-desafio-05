import "./style.css";
import { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import Header from "../../componentes/Header";
import { UseFetch } from "../../contexto/regraDeNegocio";
import { schema, useStyles, AntSwitch } from "./utils";
import InputUpload from "../../componentes/inputUpload";

const EditarProduto = () => {
  const [ativo, setAtivo] = useState(true);
  const [permiteObservacoes, setPerimiteObservacoes] = useState(true);
  const [carregando, setCarregando] = useState(false);
  const [imagemBase, setImagemBase] = useState("");
  const [imagemBaseNome, setImagemBaseNome] = useState("");

  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const { produtos, editarProduto } = UseFetch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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
      setPerimiteObservacoes(produtoEdicao[0].permite_observacoes);
      return;
    }
  }, []);

  const handleEditarProduto = async (data) => {
    setCarregando(true);
    const imagemBaseFormatada = imagemBase.slice(23);
    const corpo = {
      nome: data.nome,
      descricao: data.descricao,
      preco: data.preco.replace(",", "").replace(".", ""),
      ativo: ativo,
      permiteObservacoes: permiteObservacoes,
      imagem: imagemBaseFormatada,
      nomeImagem: imagemBaseNome,
    };

    console.log(corpo);

    const resposta = await editarProduto(id, corpo);
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
                  style={{ borderColor: errors.nome && "red" }}
                />
                <p className="erro__input">{errors.nome?.message}</p>
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
                  style={{ borderColor: errors.preco && "red" }}
                  {...register("preco")}
                />
                <p className="erro__input">{errors.preco?.message}</p>
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
              <InputUpload
                imagemUrl={produtoEdicao[0].imagem}
                imagemBase={imagemBase}
                setImagemBase={setImagemBase}
                setImagemBaseNome={setImagemBaseNome}
              />
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
      <Backdrop className={classes.backdrop} open={carregando}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default EditarProduto;
