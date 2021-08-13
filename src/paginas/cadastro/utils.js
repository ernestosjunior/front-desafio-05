import { makeStyles } from "@material-ui/core/styles";

export const getSteps = () => {
  return ["", "", ""];
};

export const isStepOptional = (step) => {
  return step === 1;
};

export const useStyles = makeStyles((theme) => ({
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
