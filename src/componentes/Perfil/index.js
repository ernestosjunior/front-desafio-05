import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputSenha from "../InputSenha";
import InputUpload from "../inputUpload";
import { UseFetch } from "../../contexto/regraDeNegocio";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./style.css";

const schema = yup.object().shape({
  nome: yup.string().required("Campo não pode ser nulo"),
  email: yup.string().required("Campo não pode ser nulo"),
  restaurante: yup.string().required("Campo não pode ser nulo"),
  categoria: yup
    .number()
    .positive()
    .integer()
    .required("Campo não pode ser nulo"),
  taxaEntrega: yup.string().required("Campo não pode ser nulo"),
  tempoEntregaEmMinutos: yup.string().required("Campo não pode ser nulo"),
  valorMinimoPedido: yup.string().required("Campo não pode ser nulo"),
  senha: yup.string().required("Campo não pode ser nulo"),
  confirmarSenha: yup.string().required("Campo não pode ser nulo"),
});

export default function Perfil() {
  const [imagemBase, setImagemBase] = useState("");
  const [imagemBaseNome, setImagemBaseNome] = useState("");
  const {
    handleCategoria,
    categorias,
    abrirCard,
    setAbrirCard,
    handleEditarPerfil,
  } = UseFetch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    handleCategoria();
  }, []);

  return (
    <div className={`overlay ${abrirCard ? "" : "fechado"}`}>
      <form
        className="modal_perfil"
        onSubmit={handleSubmit(handleEditarPerfil)}
      >
        <div className="modal_esquerda_perfil">
          <h1 className="modal__esquerda__editar__titulo margem-titulo">
            Editar Perfil
          </h1>
          <label className="label-input-perfil">
            Nome
            <input
              className="inputs-editar-perfil"
              type="text"
              style={{ borderColor: errors.nome && "red" }}
              {...register("nome", { required: true })}
            />
            <p className="erro__input">{errors.nome?.message}</p>
          </label>
          <label className="label-input-perfil">
            Email
            <input
              className="inputs-editar-perfil"
              style={{ borderColor: errors.email && "red" }}
              {...register("email", { required: true })}
            />
            <p className="erro__input">{errors.email?.message}</p>
          </label>
          <label className="label-input-perfil">
            Nome do restaurante
            <input
              type="text"
              style={{ borderColor: errors.restaurante && "red" }}
              className="inputs-editar-perfil input-restaurante"
              {...register("restaurante", { required: true })}
            />
            <p className="erro__input">{errors.restaurante?.message}</p>
          </label>
          <h2 className="label-select-textarea">Categoria</h2>
          <select
            id="categoria"
            name="categoria"
            style={{ borderColor: errors.categoria && "red" }}
            {...register("categoria", { required: true })}
          >
            <option value="" disabled selected>
              Escolha uma categoria
            </option>
            {categorias?.map((categoria) => (
              <option value={categoria.id}>{categoria.nome}</option>
            ))}
            <p className="erro__input">{errors.categoria?.message}</p>
          </select>
          <h2 className="label-select-textarea">Descrição</h2>
          <textarea
            maxlength="50"
            className="textarea-editar-perfil"
            style={{ borderColor: errors.descricao && "red" }}
            {...register("descricao", { required: true })}
          />
          <h3 className="rodape-textarea">Máx.: 50 caracteres</h3>
          <label className="label-input-perfil">
            Taxa de entrega
            <input
              className="inputs-editar-perfil"
              style={{ borderColor: errors.taxaEntrega && "red" }}
              {...register("taxaEntrega", { required: true })}
            />
            <p className="erro__input">{errors.taxaEntrega?.message}</p>
          </label>
          <label className="label-input-perfil">
            Tempo de entrega
            <input
              className="inputs-editar-perfil"
              style={{ borderColor: errors.tempoEntregaEmMinutos && "red" }}
              {...register("tempoEntregaEmMinutos", { required: true })}
            />
            <p className="erro__input">
              {errors.tempoEntregaEmMinutos?.message}
            </p>
          </label>
          <label className="label-input-perfil">
            Valor mínimo do pedido
            <input
              className="inputs-editar-perfil"
              style={{ borderColor: errors.valorMinimoPedido && "red" }}
              placeholderCampo="R$ 0,00"
              {...register("valorMinimoPedido", { required: true })}
            />
            <p className="erro__input">{errors.valorMinimoPedido?.message}</p>
          </label>
          <InputSenha
            className="margem-senha"
            label="Senha"
            {...register("senha", { required: true })}
          />
          <InputSenha
            className="margem-senha"
            label="Confirmar Senha"
            {...register("confirmarSenha", { required: true })}
          />
        </div>
        <div className="modal_direita_perfil">
          <InputUpload
            imagemBase={imagemBase}
            setImagemBase={setImagemBase}
            setImagemBaseNome={setImagemBaseNome}
          />
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
      </form>
    </div>
  );
}
