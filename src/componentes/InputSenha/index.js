import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState, forwardRef } from "react";
import TextField from "@material-ui/core/TextField";
import "./style.css";

const InputSenha = forwardRef(
  ({ nomeCampo, idCampo, value, setValue, name, onBlur }, ref) => {
    const [verSenha, setVerSenha] = useState(false);

    return (
      <div className="flex-column div-input-senha">
        <label htmlFor={nomeCampo} className="label-login-cadastro">
          {nomeCampo}
        </label>
        <TextField
          type={verSenha ? "text" : "password"}
          className="inputs-login-cadastro"
          id={idCampo}
          variant="outlined"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          name={name}
          ref={ref}
          onBlur={onBlur}
        />
        <FontAwesomeIcon
          className="eye-senha"
          onClick={() => setVerSenha(!verSenha)}
          icon={verSenha ? faEye : faEyeSlash}
        />
      </div>
    );
  }
);

export default InputSenha;
