import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { forwardRef } from "react";
import "./style.css";

const InputSenha = forwardRef((props, ref) => {
  const [verSenha, setVerSenha] = useState(false);

  return (
    <div className="div__input__senha">
      <label className={`label__login__cadastro ${props.className}`}>
        {props.label}
        <input
          ref={ref}
          {...props}
          className="input__senha"
          style={props.style}
          type={verSenha ? "text" : "password"}
          value={props.value}
        />
        <FontAwesomeIcon
          className="eye-senha"
          onClick={() => setVerSenha(!verSenha)}
          icon={verSenha ? faEye : faEyeSlash}
        />
      </label>
    </div>
  );
});

export default InputSenha;
