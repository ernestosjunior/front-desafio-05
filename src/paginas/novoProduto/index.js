import { useState } from "react";
import "./style.css";

import Header from "../../componentes/Header";

import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";

import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";

import { Link } from "react-router-dom";

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

const NovoProduto = () => {
  const classes = useStyles();

  const [state, setState] = useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div>
      <Header />
      <Backdrop className={classes.backdrop} open={true}>
        <div className="modal">
          <div className="modal__esquerda">
            <h1 className="modal__esquerda__titulo">Novo produto</h1>
            <label>
              Nome
              <input className="input__nome" />
            </label>
            <label>
              Descrição
              <textarea className="input__descricao" maxlength="80"></textarea>
              <span className="descricao__obs">Máx.: 80 caracteres</span>
            </label>
            <label>
              Valor
              <input
                type="number"
                className="input__valor"
                min="0"
                placeholder="R$ 00,00"
              />
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
              <button className="btn__laranja">
                Adicionar produto ao cardápio
              </button>
            </div>
          </div>
        </div>
      </Backdrop>
    </div>
  );
};

export default NovoProduto;
