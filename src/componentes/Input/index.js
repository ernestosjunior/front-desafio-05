import TextField from "@material-ui/core/TextField";
import "./style.css";

export default function Input({ nomeCampo, idCampo }) {
  return (
    <div className="flex-column div-input">
      <label htmlFor={nomeCampo} className="label-login-cadastro">
        {nomeCampo}
      </label>
      <TextField
        className="inputs-login-cadastro"
        id={idCampo}
        variant="outlined"
      />
    </div>
  );
}
