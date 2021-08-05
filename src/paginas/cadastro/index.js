import "./style.css";
import { useState } from "react";
import InputSenha from "../../componentes/InputSenha";
import { UseFetch } from "../../contexto/regraDeNegocio";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import React from "react";
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
  const { handleCadastro } = UseFetch();
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const steps = getSteps();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const valores = getValues();

  console.log(valores);

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (
      !valores.nome ||
      !valores.email ||
      !valores.senha ||
      !valores.confirmarSenha
    ) {
      return;
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
          <div>
            <label>
              Nome
              <input
                className="inputs-cadastro"
                type="text"
                {...register("nome", { required: true })}
              />
            </label>
            <label>
              Email
              <input
                className="inputs-cadastro"
                {...register("email", { required: true })}
              />
            </label>
            <InputSenha
              label="Senha"
              {...register("senha", { required: true })}
            />
            <InputSenha
              label="Confirmar Senha"
              {...register("confirmarSenha", { required: true })}
            />
          </div>
        );
      case 1:
        return (
          <div>
            <label>
              Nome do restaurante
              <input
                type="text"
                className="inputs-cadastro"
                {...register("restaurante", { required: true })}
              />
            </label>
            <h2 className="label-select-textarea">Categoria</h2>
            <select
              id="categoria"
              name="categoria"
              {...register("categoria", { required: true })}
            >
              <option value="" disabled selected>
                Escolha uma categoria
              </option>
              <option value="Diversos">Diversos</option>
              <option value="Lanches">Lanches</option>
              <option value="Carnes">Carnes</option>
              <option value="Massas">Massas</option>
              <option value="Pizzas">Pizzas</option>
              <option value="Japonesa">Japonesa</option>
              <option value="Chinesa">Chinesa</option>
              <option value="Mexicano">Mexicano</option>
              <option value="Brasileira">Brasileira</option>
              <option value="Italiana">Italiana</option>
              <option value="Árabe">Árabe</option>
            </select>
            <h2 className="label-select-textarea">Descrição</h2>
            <textarea
              maxlength="50"
              className="textarea-cadastro"
              {...register("descricao", { required: true })}
            />
            <h3 className="rodape-textarea">Máx.: 50 caracteres</h3>
          </div>
        );
      case 2:
        return (
          <div>
            <label>
              Taxa de entrega
              <input
                className="inputs-cadastro"
                {...register("taxaEntrega", { required: true })}
              />
            </label>
            <label>
              Tempo de entrega
              <input
                className="inputs-cadastro"
                {...register("tempoEntregaMinutos", { required: true })}
              />
            </label>
            <label>
              Valor mínimo do pedido
              <input
                className="inputs-cadastro"
                placeholderCampo="R$ 0,00"
                {...register("valorMinimoPedido", { required: true })}
              />
            </label>
          </div>
        );
      default:
        return "Você será redirecionado a página de login";
    }
  }
  return (
    <div className="cadastro">
      <form
        className="form-cadastro"
        onSubmit={
          // activeStep === steps.length - 1 &&
          handleSubmit(handleCadastro)
        }
      >
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
                <Step key={label} className="step" {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </div>
        <div>
          <div>
            <Typography>{getStepContent(activeStep)}</Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.buttonBack}
              >
                Anterior
              </Button>
              <Button
                variant="contained"
                color="#"
                onClick={handleNext}
                className={classes.buttonNext}
                type="submit"
              >
                {activeStep === steps.length - 1 ? "Criar conta" : "Próximo"}
              </Button>
              <br />
              <spam className="fazer-login">
                Já tem uma conta? <Link to="/login">Login</Link>
              </spam>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
