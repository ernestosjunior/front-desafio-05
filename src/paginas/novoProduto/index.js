import "./style.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import Header from "../../componentes/Header";
import { UseFetch } from "../../contexto/regraDeNegocio";
import { useHistory } from "react-router-dom";
import { schema, useStyles, AntSwitch } from "./utils";
import InputUpload from "../../componentes/inputUpload";

const NovoProduto = () => {
  const [ativo, setAtivo] = useState(true);
  const [permiteObservacoes, setPerimiteObservacoes] = useState(true);
  const [carregando, setCarregando] = useState(false);
  const [imagemBase, setImagemBase] = useState("");
  const [imagemBaseNome, setImagemBaseNome] = useState("");

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

  const handleAddProduto = async (data) => {
    setCarregando(true);
    const valorFormatado = data.preco.replace(",", "").replace(".", "");
    const corpo = {
      nome: data.nome,
      descricao: data.descricao,
      preco: valorFormatado,
      ativo: ativo,
      permite_observacoes: permiteObservacoes,
      imagem: imagemBase,
      nomeImagem: imagemBaseNome,
    };
    const resposta = await adicionarProduto(corpo);
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
                  checked={ativo}
                  onChange={handleAtivo}
                  name="ativo"
                />
                <p>Ativar produto</p>
              </div>
              <div className="input__checkbox">
                <AntSwitch
                  checked={permiteObservacoes}
                  onChange={handlePermiteObservacoes}
                  name="permiteObservacoes"
                />
                <p>Permitir observações</p>
              </div>
            </div>
            <div className="modal__direita">
              <InputUpload
                imagemBase={imagemBase}
                setImagemBase={setImagemBase}
                setImagemBaseNome={setImagemBaseNome}
              />
              <div className="modal__direita__footer">
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
      <Backdrop className={classes.backdrop} open={carregando}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default NovoProduto;
