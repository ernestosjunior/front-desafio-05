import TextField from "@material-ui/core/TextField";
import "./style.css";
import { forwardRef } from "react";

const Input = forwardRef(
  ({ nomeCampo, idCampo, tipoCampo, placeholderCampo, name, onBlur }, ref) => {
    return (
      <div className="flex-column div-input">
        <label htmlFor={nomeCampo} className="label-login-cadastro">
          {nomeCampo}
        </label>
        <TextField
          className="inputs-login-cadastro"
          id={idCampo}
          variant="outlined"
          type={tipoCampo}
          placeholder={placeholderCampo ? placeholderCampo : ""}
          name={name}
          ref={ref}
          onBlur={onBlur}
        />
      </div>
    );
  }
);

export default Input;
