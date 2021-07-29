import TextField from "@material-ui/core/TextField";

export default function Input({ nomeCampo, idCampo }) {
  return (
    <div>
      {nomeCampo}
      <TextField id={idCampo} variant="outlined" />
    </div>
  );
}
