import "./style.css";
import { makeStyles } from "@material-ui/core/styles";
import {
  Stepper,
  Step,
  StepLabel,
  Typography,
  Button,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../../componentes/Input";
import InputSenha from "../../componentes/InputSenha";
import { UseFetch } from "../../contexto/regraDeNegocio";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
    padding: "11px 40px 11px 40px",
    background: "#D13201",
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
  const [senhaCadastro, setSenhaCadastro] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (
      errors.email?.type === "required" ||
      errors.nome?.type === "required" ||
      errors.restaurante?.type === "required" ||
      errors.taxa_entrega?.type === "required" ||
      errors.tempo_entrega_minutos?.type === "required" ||
      errors.valor_minimo_pedido?.type === "required" ||
      errors.categoria?.type === "required" ||
      errors.descricao?.type === "required" ||
      errors.senha?.type === "required" ||
      errors.confirmar_senha?.type === "required"
    ) {
      toast.error("Todos os campos são obrigatórios");
    }
  }, [
    errors.email,
    errors.senha,
    errors.nome,
    errors.restaurante,
    errors.taxa_entrega,
    errors.tempo_entrega_minutos,
    errors.valor_minimo_pedido,
    errors.categoria,
    errors.descricao,
    errors.confirmar_senha,
  ]);

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
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
            <Input
              nomeCampo="Nome de usuário"
              idCampo="nome"
              {...register("nome", { required: true })}
            />
            <Input
              nomeCampo="E-mail"
              idCampo="email"
              {...register("email", { required: true })}
            />
            <InputSenha
              nomeCampo="Senha"
              idCampo="senha"
              value={senhaCadastro}
              setValue={setSenhaCadastro}
              {...register("senha", { required: true })}
            />
            <InputSenha
              nomeCampo="Confirmar Senha"
              idCampo="confirmar_senha"
              value={confirmarSenha}
              setValue={setConfirmarSenha}
              {...register("confirmar_senha", { required: true })}
            />
          </div>
        );
      case 1:
        return (
          <div>
            <Input
              nomeCampo="Nome do Restaurante"
              idCampo="restaurante"
              tipoCampo="text"
              {...register("restaurante", { required: true })}
            />
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
            <Input
              nomeCampo="Taxa de entrega"
              idCampo="taxa_entrega"
              tipoCampo="text"
              {...register("taxa_entrega", { required: true })}
            />
            <Input
              nomeCampo="Tempo estimado de entrega"
              idCampo="tempo_entrega_minutos"
              tipoCampo="text"
              {...register("tempo_entrega_minutos", { required: true })}
            />
            <Input
              nomeCampo="Valor minimo do pedido"
              idCampo="valor_minimo_pedido"
              tipoCampo="text"
              placeholderCampo="R$ 0,00"
              {...register("valor_minimo_pedido", { required: true })}
            />
          </div>
        );
      default:
        return "Erro";
    }
  }
  return (
    <div className="cadastro">
      <form
        className="form-cadastro"
        onSubmit={
          activeStep === steps.length - 1 && handleSubmit(handleCadastro)
        }
      >
        <h1 className="titulos-paginas titulo-cadastro">Cadastro</h1>
        <div>
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
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>

          <div className="inputs-cadastro">
            <Typography>{getStepContent(activeStep)}</Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Anterior
              </Button>
              <Button
                variant="contained"
                color="#"
                onClick={handleNext}
                className={classes.button}
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
