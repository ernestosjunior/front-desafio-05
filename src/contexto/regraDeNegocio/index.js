import { useState, createContext } from "react";
import { UseAuth } from "../../contexto/autorizacao";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { toast } from "react-toastify";

const FetchContext = createContext();

export function FetchProvider({ children }) {
  const history = useHistory();
  const [carregando, setCarregando] = useState();
  const [produtos, setProdutos] = useState([]);
  const { setGravarUsuario, gravarUsuario } = UseAuth();

  async function handleLogin(data) {
    setCarregando(true);
    const body = JSON.stringify(data);

    try {
      const response = await fetch("https://desafio5back.herokuapp.com/login", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body,
      });

      const login = await response.json();

      if (response.status !== 200) {
        toast.error(login);
      } else {
        setGravarUsuario(login);
        history.push("/");
        toast.success(`Olá, ${login.usuario.nome}`, {
          onClose: () => {},
        });
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setCarregando(false);
    }
  }

  async function handleCadastro(data) {
    if (data.senha !== data.confirmar_senha) {
      toast.error("As senhas devem ser iguais");
      return;
    }

    setCarregando(true);
    const { confirmar_senha, ...dataRequerida } = data;
    const body = JSON.stringify(dataRequerida);

    try {
      const response = await fetch(
        "https://desafio5back.herokuapp.com/cadastro",
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

      if (response.status !== 200) {
        toast.error(cadastro);
      } else {
        toast.success("Cadastro feito!", {
          onClose: () => {
            history.push("/login");
          },
        });
        history.push("/login");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setCarregando(false);
    }
  }

  const listarProdutos = async () => {
    fetch("https://desafio5back.herokuapp.com/produtos", {
      headers: {
        authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjI4MDMyMDIwfQ.XLLqW2A_F-OatBhuvAWIWscXREHkEVjQq2MdvXYv-sc`,
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
          authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjI4MDMyMDIwfQ.XLLqW2A_F-OatBhuvAWIWscXREHkEVjQq2MdvXYv-sc`,
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
          authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjI4MDMyMDIwfQ.XLLqW2A_F-OatBhuvAWIWscXREHkEVjQq2MdvXYv-sc`,
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
          authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjI4MDMyMDIwfQ.XLLqW2A_F-OatBhuvAWIWscXREHkEVjQq2MdvXYv-sc`,
          "content-type": "application/json",
        },
      }
    );
    const data = response.json();
    return data;
  };

  return (
    <FetchContext.Provider
      value={{
        handleLogin,
        handleCadastro,
        carregando,
        produtos,
        setProdutos,
        listarProdutos,
        adicionarProduto,
        editarProduto,
        removerProduto,
      }}
    >
      {children}
    </FetchContext.Provider>
  );
}

export function UseFetch() {
  const {
    handleLogin,
    handleCadastro,
    handleFornecedores,
    carregando,
    produtos,
    setProdutos,
    listarProdutos,
    adicionarProduto,
    editarProduto,
    removerProduto,
  } = useContext(FetchContext);

  return {
    handleLogin,
    handleCadastro,
    handleFornecedores,
    carregando,
    produtos,
    setProdutos,
    listarProdutos,
    adicionarProduto,
    editarProduto,
    removerProduto,
  };
}
