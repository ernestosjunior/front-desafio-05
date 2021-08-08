import "./style.css";
import { useState } from "react";
import InputSenha from "../../componentes/InputSenha";
import { UseFetch } from "../../contexto/regraDeNegocio";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  buttonBack: {
    backgroundColor: "transparent",
    color: "#D13201",
    textTransform: "none",
    fontWeight: 600,
    fontSize: "14px",
    borderRadius: "20px",
  },
  buttonNext: {
    marginRight: theme.spacing(1),
    backgroundColor: "#D13201",
    color: "#FFFFFF",
    textTransform: "none",
    fontWeight: 600,
    fontSize: "14px",
    borderRadius: "20px",
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["", "", ""];
}

export default function Cadastro() {
  const { handleCadastro, categorias } = UseFetch();
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const steps = getSteps();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    control,
  } = useForm({
    defaultValues: { restaurante: "" },
  });

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  const valores = getValues();
  const handleNext = () => {
    if (activeStep === 0) {
      if (
        !valores.nome ||
        !valores.email ||
        !valores.senha ||
        !valores.confirmarSenha
      ) {
        return;
      }
    }
    if (activeStep === 1) {
      if (!valores.restaurante || !valores.categoria) {
        return;
      }
    }
    if (activeStep === 2) {
      if (
        !valores.tempoEntregaEmMinutos ||
        !valores.taxaEntrega ||
        !valores.valorMinimoPedido
      ) {
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
              Nome
              <input
                {...register("nome", { required: true })}
                style={{ borderColor: errors.nome && "red" }}
                className="inputs-cadastro"
                type="text"
              />
              <p className="erro__input">
                {errors.nome && "Campo obrigatório"}
              </p>
            </label>
            <label className="label-cadastro">
              Email
              <input
                {...register("email", { required: true })}
                style={{ borderColor: errors.email && "red" }}
                className="inputs-cadastro"
              />
              <p className="erro__input">
                {errors.email && "Campo obrigatório"}
              </p>
            </label>
            <div>
              <InputSenha
                {...register("senha", { required: true })}
                label="Senha"
                style={{ borderColor: errors.senha && "red" }}
              />
              <p className="erro__input">
                {errors.senha && "Campo obrigatório"}
              </p>
            </div>

            <div>
              <InputSenha
                {...register("confirmarSenha", { required: true })}
                label="Confirmar Senha"
                style={{ borderColor: errors.confirmarSenha && "red" }}
              />
              <p className="erro__input">
                {errors.confirmarSenha && "Campo obrigatório"}
              </p>
              <p className="erro__input">
                {valores.confirmarSenha !== valores.senha &&
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
              <Controller
                name="restaurante"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    className="inputs-cadastro"
                    style={{ borderColor: errors.restaurante && "red" }}
                    {...field}
                  />
                )}
              />
              <p className="erro__input">
                {errors.restaurante && "Campo obrigatório"}
              </p>
            </label>
            <div>
              <h2 className="label-select-textarea">Categoria</h2>
              <div>
                <select
                  {...register("categoria", { required: true })}
                  id="categoria"
                  name="categoria"
                  defaultValue="-1"
                  style={{ borderColor: errors.categoria && "red" }}
                >
                  <option value="-1" disabled>
                    Escolha uma categoria
                  </option>
                  {categorias?.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.nome}
                    </option>
                  ))}
                </select>
                <p className="erro__input">
                  {errors.categoria && "Campo obrigatório"}
                </p>
              </div>
            </div>
            <div>
              <h2 className="label-select-textarea">Descrição</h2>
              <textarea
                {...register("descricao", { required: true })}
                maxLength="50"
                className="textarea-cadastro"
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
                {...register("taxaEntrega", { required: true })}
                className="inputs-cadastro"
                style={{ borderColor: errors.taxaEntrega && "red" }}
              />
              <p className="erro__input">
                {errors.taxaEntrega && "Campo obrigatório"}
              </p>
            </label>
            <label className="label-cadastro">
              Tempo de entrega
              <input
                {...register("tempoEntregaEmMinutos", { required: true })}
                className="inputs-cadastro"
                style={{ borderColor: errors.tempoEntregaEmMinutos && "red" }}
              />
              <p className="erro__input">
                {errors.tempoEntregaEmMinutos && "Campo obrigatório"}
              </p>
            </label>
            <label className="label-cadastro">
              Valor mínimo do pedido
              <input
                {...register("valorMinimoPedido", { required: true })}
                className="inputs-cadastro"
                style={{ borderColor: errors.valorMinimoPedido && "red" }}
                placeholder="R$ 0,00"
              />
              <p className="erro__input">
                {errors.valorMinimoPedido && "Campo obrigatório"}
              </p>
            </label>
          </div>
        );
      default:
        return "Você será redirecionado a página de login";
    }
  }
  return (
    <div className="cadastro">
      <form className="form-cadastro" onSubmit={handleSubmit(handleCadastro)}>
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
                type="submit"
                // {activeStep === steps.length - 1 ? "submit" : "button"}
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
    </div>
  );
}
