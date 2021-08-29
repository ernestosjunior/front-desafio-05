import { useState, createContext } from "react";
import { UseAuth } from "../../contexto/autorizacao";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { toast } from "react-toastify";
import { useLocalStorage } from "react-use";

const FetchContext = createContext();

export function FetchProvider({ children }) {
  const history = useHistory();
  const [carregando, setCarregando] = useState();
  const [produtos, setProdutos] = useState([]);
  const { setGravarUsuario, gravarUsuario } = UseAuth();
  const [categorias, setCategorias, removeCategorias] = useLocalStorage(
    "categorias",
    []
  );
  const [abrirCard, setAbrirCard] = useState(false);
  const [abrirPedido, setAbrirPedido] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [filtro, setFiltro] = useState("naoentregues");
  const [filtroBool, setFiltroBool] = useState(false);
  const pedidosFiltrados = pedidos.filter((p) => p.entregue === filtroBool);

  async function handleLogin(data) {
    const body = JSON.stringify(data);

    const response = await fetch("https://desafio5back.herokuapp.com/login", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body,
    });

    const login = await response.json();

    return login;
  }

  async function handleCategoria() {
    setCarregando(true);

    try {
      const response = await fetch(
        "https://desafio5back.herokuapp.com/categorias",
        {
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
        }
      );

      const tipoDeComida = await response.json();

      if (response.status !== 200) {
        toast.error(tipoDeComida);
      } else {
        setCategorias(tipoDeComida);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setCarregando(false);
    }
  }

  async function handleCadastro(data) {
    setCarregando(true);
    const {
      nomeUsuario,
      email,
      senha,
      nomeRestaurante,
      categoria,
      descricao,
      taxaEntrega,
      valorMinimo,
      tempoEntrega,
    } = data;

    const formatTaxa = taxaEntrega.replace(",", "").replace(".", "");
    const formatValorMin = valorMinimo.replace(",", "").replace(".", "");

    const dataRequerida = {
      nome: nomeUsuario,
      email,
      senha,
      restaurante: {
        nome: nomeRestaurante,
        descricao,
        idCategoria: categoria,
        taxaEntrega: formatTaxa,
        tempoEntregaEmMinutos: tempoEntrega,
        valorMinimoPedido: formatValorMin,
      },
    };

    const body = JSON.stringify(dataRequerida);

    const response = await fetch(
      "https://desafio5back.herokuapp.com/usuarios",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body,
      }
    );

    const cadastro = await response.json();

    return cadastro;
  }

  const listarProdutos = async () => {
    fetch("https://desafio5back.herokuapp.com/produtos", {
      headers: {
        authorization: `Bearer ${gravarUsuario.token}`,
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProdutos(data);
          return;
        }
        return;
      });
  };

  const adicionarProduto = async (corpo) => {
    const response = await fetch(
      `https://desafio5back.herokuapp.com/produtos`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${gravarUsuario.token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(corpo),
      }
    );
    const data = response.json();
    return data;
  };

  const editarProduto = async (id, corpo) => {
    const response = await fetch(
      `https://desafio5back.herokuapp.com/produtos/${id}`,
      {
        method: "PUT",
        headers: {
          authorization: `Bearer ${gravarUsuario.token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(corpo),
      }
    );
    const data = response.json();
    return data;
  };

  const removerProduto = async (id) => {
    const response = await fetch(
      `https://desafio5back.herokuapp.com/produtos/${id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${gravarUsuario.token}`,
          "content-type": "application/json",
        },
      }
    );
    const data = response.json();
    return data;
  };

  async function handleEditarPerfil(data) {
    setCarregando(true);
    const {
      nome,
      email,
      senha,
      restaurante,
      descricao,
      categoria,
      taxaEntrega,
      tempoEntregaEmMinutos,
      valorMinimoPedido,
      imagemBase,
      imagemBaseNome,
    } = data;

    const dataRequerida = {
      nome,
      email,
      senha,
      restaurante: {
        nome: restaurante,
        descricao,
        categoria_id: categoria,
        taxa_entrega: taxaEntrega,
        tempo_entrega_minutos: tempoEntregaEmMinutos,
        valor_minimo_pedido: valorMinimoPedido,
        imagem: imagemBase.slice(23),
        nome_imagem: imagemBaseNome,
      },
    };

    const body = JSON.stringify(dataRequerida);

    try {
      const response = await fetch(
        "https://desafio5back.herokuapp.com/usuarios",
        {
          method: "PUT",
          headers: {
            accept: "application/json",
            authorization: `Bearer ${gravarUsuario.token}`,
            "content-type": "application/json",
          },
          body,
        }
      );
      const novoPerfil = await response.json();

      if (response.status !== 200) {
        toast.error(novoPerfil);
      } else {
        setGravarUsuario(novoPerfil);
        toast.success("Perfil atualizado!", {
          onClose: () => {
            setAbrirCard(false);
            history.push("/");
          },
        });
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setCarregando(false);
    }
  }

  const handleListarPedidos = async () => {
    const response = await fetch("https://desafio5back.herokuapp.com/pedidos", {
      headers: {
        authorization: `Bearer ${gravarUsuario.token}`,
        "content-type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  };

  return (
    <FetchContext.Provider
      value={{
        handleLogin,
        handleCategoria,
        categorias,
        handleCadastro,
        carregando,
        produtos,
        setProdutos,
        listarProdutos,
        adicionarProduto,
        editarProduto,
        removerProduto,
        abrirCard,
        setAbrirCard,
        handleEditarPerfil,
        removeCategorias,
        handleListarPedidos,
        abrirPedido,
        setAbrirPedido,
        pedidos,
        setPedidos,
        filtro,
        setFiltro,
        filtroBool,
        setFiltroBool,
        pedidosFiltrados,
      }}
    >
      {children}
    </FetchContext.Provider>
  );
}

export function UseFetch() {
  const {
    handleLogin,
    handleCategoria,
    categorias,
    handleCadastro,
    handleFornecedores,
    carregando,
    produtos,
    setProdutos,
    listarProdutos,
    adicionarProduto,
    editarProduto,
    removerProduto,
    abrirCard,
    setAbrirCard,
    handleEditarPerfil,
    removeCategorias,
    handleListarPedidos,
    abrirPedido,
    setAbrirPedido,
    pedidos,
    setPedidos,
    filtro,
    setFiltro,
    filtroBool,
    setFiltroBool,
    pedidosFiltrados,
  } = useContext(FetchContext);

  return {
    handleLogin,
    handleCategoria,
    categorias,
    handleCadastro,
    handleFornecedores,
    carregando,
    produtos,
    setProdutos,
    listarProdutos,
    adicionarProduto,
    editarProduto,
    removerProduto,
    abrirCard,
    setAbrirCard,
    handleEditarPerfil,
    removeCategorias,
    handleListarPedidos,
    abrirPedido,
    setAbrirPedido,
    pedidos,
    setPedidos,
    filtro,
    setFiltro,
    filtroBool,
    setFiltroBool,
    pedidosFiltrados,
  };
}
