import "./style.css";
import { useState, useEffect } from "react";
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
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

const schema = yup.object().shape({
  nome: yup.string().required("Campo não pode ser nulo"),
  email: yup.string().required("Campo não pode ser nulo"),
  restaurante: yup.string().required("Campo não pode ser nulo"),
  categoria: yup
    .number()
    .positive()
    .integer()
    .required("Campo não pode ser nulo"),
  descricao: yup.string().required("Campo não pode ser nulo"),
  taxaEntrega: yup.string().required("Campo não pode ser nulo"),
  tempoEntregaEmMinutos: yup.string().required("Campo não pode ser nulo"),
  valorMinimoPedido: yup.string().required("Campo não pode ser nulo"),
  senha: yup.string().required("Campo não pode ser nulo"),
  confirmarSenha: yup.string().required("Campo não pode ser nulo"),
});

export default function Cadastro() {
  const { handleCadastro, handleCategoria, categorias } = UseFetch();
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
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    handleCategoria();
  }, []);

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    const valores = getValues();
    if (
      !valores.nome ||
      !valores.email ||
      !valores.senha ||
      !valores.confirmarSenha
    ) {
      return;
    }
    if (!valores.restaurante || !valores.categoria || !valores.descricao) {
      return;
    }
    if (
      !valores.tempoEntregaEmMinutos ||
      !valores.taxaEntrega ||
      !valores.valorMinimoPedido
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
          <div className="content-cadastro">
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
          <div className="content-cadastro">
            <label>
              Nome do restaurante
              <Controller
                name="restaurante"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <input type="text" className="inputs-cadastro" {...field} />
                )}
              />
            </label>
            <h2 className="label-select-textarea">Categoria</h2>
            <select
              id="categoria"
              name="categoria"
              defaultValue="-1"
              {...register("categoria", { required: true })}
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
            <h2 className="label-select-textarea">Descrição</h2>
            <textarea
              maxLength="50"
              className="textarea-cadastro"
              {...register("descricao", { required: true })}
            />
            <h3 className="rodape-textarea">Máx.: 50 caracteres</h3>
          </div>
        );
      case 2:
        return (
          <div className="content-cadastro">
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
                {...register("tempoEntregaEmMinutos", { required: true })}
              />
            </label>
            <label>
              Valor mínimo do pedido
              <input
                className="inputs-cadastro"
                placeholder="R$ 0,00"
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
