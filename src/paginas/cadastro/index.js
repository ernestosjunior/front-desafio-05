import "./style.css";
import { useState } from "react";
import InputSenha from "../../componentes/InputSenha";
import { UseFetch } from "../../contexto/regraDeNegocio";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import { isStepOptional, getSteps, useStyles } from "./utils";

export default function Cadastro() {
  const { handleCadastro, categorias } = UseFetch();
  const classes = useStyles();
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const steps = getSteps();
  const [carregando, setCarregando] = useState(false);
  const [form, setForm] = useState({
    nomeUsuario: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    nomeRestaurante: "",
    categoria: 0,
    descricao: "",
    taxaEntrega: "",
    valorMinimo: "",
    tempoEntrega: "",
  });
  const [erro, setErro] = useState({
    nomeUsuario: false,
    email: false,
    senha: false,
    confirmarSenha: false,
    nomeRestaurante: false,
    categoria: false,
    descricao: false,
    taxaEntrega: false,
    valorMinimo: false,
    tempoEntrega: false,
  });

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (activeStep === 0) {
      if (
        !form.nomeUsuario ||
        !form.email ||
        !form.senha ||
        !form.confirmarSenha
      ) {
        setErro((prevErro) => {
          return {
            ...prevErro,
            nomeUsuario: !form.nomeUsuario && true,
            email: !form.email && true,
            senha: !form.senha && true,
            confirmarSenha: !form.confirmarSenha && true,
          };
        });
        return;
      }
    }
    if (activeStep === 1) {
      if (!form.nomeRestaurante || !form.categoria) {
        setErro((prevErro) => {
          return {
            ...prevErro,
            nomeRestaurante: !form.nomeRestaurante && true,
            categoria: form.categoria === 0 && true,
          };
        });
        return;
      }
    }
    if (activeStep === 2) {
      if (!form.tempoEntrega || !form.taxaEntrega || !form.valorMinimo) {
        setErro((prevErro) => {
          return {
            ...prevErro,
            tempoEntrega: !form.tempoEntrega && true,
            taxaEntrega: !form.taxaEntrega && true,
            valorMinimo: !form.valorMinimo && true,
          };
        });
        return;
      }
    }

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <div className="content-cadastro">
            <label className="label-cadastro">
              Nome usuário
              <input
                onChange={(e) => {
                  setForm((prevForm) => {
                    return {
                      ...prevForm,
                      nomeUsuario: e.target.value,
                    };
                  });
                  setErro((prevErro) => {
                    return {
                      ...prevErro,
                      nomeUsuario: false,
                    };
                  });
                }}
                style={{ borderColor: erro.nomeUsuario && "red" }}
                className="inputs-cadastro"
                type="text"
                value={form.nomeUsuario}
              />
              <p className="erro__input">
                {erro.nomeUsuario && "Campo obrigatório"}
              </p>
            </label>
            <label className="label-cadastro">
              Email
              <input
                onChange={(e) => {
                  setForm((prevForm) => {
                    return {
                      ...prevForm,
                      email: e.target.value,
                    };
                  });
                  setErro((prevErro) => {
                    return {
                      ...prevErro,
                      email: false,
                    };
                  });
                }}
                style={{ borderColor: erro.email && "red" }}
                className="inputs-cadastro"
                value={form.email}
              />
              <p className="erro__input">{erro.email && "Campo obrigatório"}</p>
            </label>
            <div>
              <InputSenha
                onChange={(e) => {
                  setForm((prevForm) => {
                    return {
                      ...prevForm,
                      senha: e.target.value,
                    };
                  });
                  setErro((prevErro) => {
                    return {
                      ...prevErro,
                      senha: false,
                    };
                  });
                }}
                label="Senha"
                style={{ borderColor: erro.senha && "red" }}
                value={form.senha}
              />
              <p className="erro__input">{erro.senha && "Campo obrigatório"}</p>
            </div>

            <div>
              <InputSenha
                onChange={(e) => {
                  setForm((prevForm) => {
                    return {
                      ...prevForm,
                      confirmarSenha: e.target.value,
                    };
                  });
                  setErro((prevErro) => {
                    return {
                      ...prevErro,
                      confirmarSenha: false,
                    };
                  });
                }}
                label="Confirmar Senha"
                style={{ borderColor: erro.confirmarSenha && "red" }}
                value={form.confirmarSenha}
              />
              <p className="erro__input">
                {erro.confirmarSenha && "Campo obrigatório"}
              </p>
              <p className="erro__input">
                {form.confirmarSenha !== form.senha &&
                  "Campos senha e Confirmar senha devem ser iguais"}
              </p>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="content-cadastro">
            <label className="label-cadastro">
              Nome do restaurante
              <input
                type="text"
                className="inputs-cadastro"
                style={{ borderColor: erro.nomeRestaurante && "red" }}
                onChange={(e) => {
                  setForm((prevForm) => {
                    return {
                      ...prevForm,
                      nomeRestaurante: e.target.value,
                    };
                  });
                  setErro((prevErro) => {
                    return {
                      ...prevErro,
                      nomeRestaurante: false,
                    };
                  });
                }}
                value={form.nomeRestaurante}
              />
              <p className="erro__input">
                {erro.nomeRestaurante && "Campo obrigatório"}
              </p>
            </label>
            <div>
              <h2 className="label-select-textarea">Categoria</h2>
              <div>
                <select
                  onChange={(e) => {
                    setForm((prevForm) => {
                      return {
                        ...prevForm,
                        categoria: e.target.value,
                      };
                    });
                    setErro((prevErro) => {
                      return {
                        ...prevErro,
                        categoria: false,
                      };
                    });
                  }}
                  id="categoria"
                  name="categoria"
                  value={form.categoria}
                  style={{
                    borderColor: erro.categoria && "red",
                  }}
                >
                  <option value="0" disabled>
                    Escolha uma categoria
                  </option>
                  {categorias?.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.nome}
                    </option>
                  ))}
                </select>
                <p className="erro__input">
                  {erro.categoria && "Campo obrigatório"}
                </p>
              </div>
            </div>
            <div>
              <h2 className="label-select-textarea">Descrição</h2>
              <textarea
                onChange={(e) =>
                  setForm((prevForm) => {
                    return {
                      ...prevForm,
                      descricao: e.target.value,
                    };
                  })
                }
                maxLength="50"
                className="textarea-cadastro"
                value={form.descricao}
              />
              <h3 className="rodape-textarea">Máx.: 50 caracteres</h3>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="content-cadastro">
            <label className="label-cadastro">
              Taxa de entrega
              <input
                onChange={(e) => {
                  setForm((prevForm) => {
                    return {
                      ...prevForm,
                      taxaEntrega: e.target.value,
                    };
                  });
                  setErro((prevErro) => {
                    return {
                      ...prevErro,
                      taxaEntrega: false,
                    };
                  });
                }}
                className="inputs-cadastro"
                style={{ borderColor: erro.taxaEntrega && "red" }}
                value={form.taxaEntrega}
                placeholder="R$ 0,00"
              />
              <p className="erro__input">
                {erro.taxaEntrega && "Campo obrigatório"}
              </p>
            </label>
            <label className="label-cadastro">
              Tempo de entrega
              <input
                onChange={(e) => {
                  setForm((prevForm) => {
                    return {
                      ...prevForm,
                      tempoEntrega: e.target.value,
                    };
                  });
                  setErro((prevErro) => {
                    return {
                      ...prevErro,
                      tempoEntrega: false,
                    };
                  });
                }}
                className="inputs-cadastro"
                style={{ borderColor: erro.tempoEntrega && "red" }}
                value={form.tempoEntrega}
                placeholder="Em minutos"
              />
              <p className="erro__input">
                {erro.tempoEntrega && "Campo obrigatório"}
              </p>
            </label>
            <label className="label-cadastro">
              Valor mínimo do pedido
              <input
                onChange={(e) => {
                  setForm((prevForm) => {
                    return {
                      ...prevForm,
                      valorMinimo: e.target.value,
                    };
                  });
                  setErro((prevErro) => {
                    return {
                      ...prevErro,
                      valorMinimo: false,
                    };
                  });
                }}
                className="inputs-cadastro"
                style={{ borderColor: erro.valorMinimo && "red" }}
                placeholder="R$ 0,00"
                value={form.valorMinimo}
              />
              <p className="erro__input">
                {erro.valorMinimo && "Campo obrigatório"}
              </p>
            </label>
          </div>
        );
      default:
        return "Você será redirecionado a página de login";
    }
  }

  const handleCadastrar = async (e) => {
    e.preventDefault();
    setCarregando(true);
    const resposta = await handleCadastro(form);
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
    history.push("/login");
  };

  return (
    <div className="cadastro">
      <form className="form-cadastro" onSubmit={(e) => handleCadastrar(e)}>
        <div className="header-cadastro">
          <h1 className="titulos-paginas titulo-cadastro">Cadastro</h1>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption"></Typography>
                );
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={`${index}`} className="step" {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </div>
        <div>
          <div className="content-botoes">
            <div>{getStepContent(activeStep)}</div>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.buttonBack}
                type="button"
              >
                Anterior
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                className={classes.buttonNext}
                type={activeStep === steps.length ? "submit" : "button"}
              >
                {activeStep === steps.length - 1 ? "Criar conta" : "Próximo"}
              </Button>
              <br />
              <br />
              <span className="fazer-login">
                Já tem uma conta? <Link to="/login">Login</Link>
              </span>
            </div>
          </div>
        </div>
      </form>
      <Backdrop className={classes.backdrop} open={carregando}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
