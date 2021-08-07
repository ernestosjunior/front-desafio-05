import "./style.css";
import { ReactComponent as UploadIcon } from "../../assets/bg-upload.svg";
import { ReactComponent as IconUpload } from "../../assets/icon-upload.svg";

const InputUpload = ({ imagemBase, setImagemBase, setImagemBaseNome }) => {
  const converterBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const imagemUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await converterBase64(file);
    setImagemBaseNome(e.target.files[0].name);
    setImagemBase(base64);
  };
  return (
    <div className="input__upload__container" onClick={() => setImagemBase("")}>
      <div className="input__upload">
        {imagemBase ? (
          <img src={imagemBase} height="200px" alt="" />
        ) : (
          <>
            <UploadIcon className="input__upload__icon" />
            <label>
              <IconUpload />
              Clique para adicionar uma imagem
              <input
                type="file"
                onChange={(e) => {
                  imagemUpload(e);
                }}
              />
            </label>
          </>
        )}
      </div>
      {imagemBase && (
        <p className="alert">Clique para remover e enviar nova imagem</p>
      )}
    </div>
  );
};

export default InputUpload;
