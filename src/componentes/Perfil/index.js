import { useEffect } from "react";
import { useForm } from "react-hook-form";
import InputSenha from "../InputSenha";
import { UseFetch } from "../../contexto/regraDeNegocio";
import { Link } from "react-router-dom";
import "./style.css";

export default function Perfil() {
  const { handleCategoria, categorias, abrirCard, setAbrirCard } = UseFetch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setAbrirCard(true);
    handleCategoria();
  }, []);

  return (
    <div className={`overlay ${abrirCard ? "" : "fechado"}`}>
      <div className="modal_perfil">
        <div className="modal_esquerda_perfil">
          <h1 className="modal__esquerda__editar__titulo">Editar Perfil</h1>
          <label>
            Nome
            <input
              className="inputs-editar-perfil"
              type="text"
              {...register("nome", { required: true })}
            />
          </label>
          <label>
            Email
            <input
              className="inputs-editar-perfil"
              {...register("email", { required: true })}
            />
          </label>
          <label>
            Nome do restaurante
            <input
              type="text"
              className="inputs-editar-perfil"
              {...register("restaurante", { required: true })}
            />
          </label>
          <h2 className="label-select-textarea">Categoria</h2>
          <select
            id="categoria"
            name="categoria"
            {...register("categoria", { required: true })}
          >
            <option value="" disabled selected>
              Escolha uma categoria
            </option>
            {categorias?.map((categoria) => (
              <option value={categoria.id}>{categoria.nome}</option>
            ))}
          </select>
          <h2 className="label-select-textarea">Descrição</h2>
          <textarea
            maxlength="50"
            className="textarea-editar-perfil"
            {...register("descricao", { required: true })}
          />
          <h3 className="rodape-textarea">Máx.: 50 caracteres</h3>
          <label>
            Taxa de entrega
            <input
              className="inputs-editar-perfil"
              {...register("taxaEntrega", { required: true })}
            />
          </label>
          <label>
            Tempo de entrega
            <input
              className="inputs-editar-perfil"
              {...register("tempoEntregaMinutos", { required: true })}
            />
          </label>
          <label>
            Valor mínimo do pedido
            <input
              className="inputs-editar-perfil"
              placeholderCampo="R$ 0,00"
              {...register("valorMinimoPedido", { required: true })}
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
        <div className="modal_direita_perfil">
          <img alt="logo do restaurante"></img>
          <div>
            <Link to="/">
              <button
                className="btn__clean__laranja"
                onClick={() => setAbrirCard(false)}
              >
                Cancelar
              </button>
            </Link>
            <button type="submit" className="btn__laranja">
              Salvar alterações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
