import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "./style.css";

const InputSenha = () => {
  const [verSenha, setVerSenha] = useState(false);

  return (
    <div className="div__input__senha">
      <label className="label__login__cadastro">
        Senha
        <input className="input__senha" type={verSenha ? "text" : "password"} />
        <FontAwesomeIcon
          className="eye-senha"
          onClick={() => setVerSenha(!verSenha)}
          icon={verSenha ? faEye : faEyeSlash}
        />
      </label>
    </div>
  );
};

export default InputSenha;
