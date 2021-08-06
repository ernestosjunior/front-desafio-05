import { useState, useContext, createContext } from "react";
import { useLocalStorage } from "react-use";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [gravarUsuario, setGravarUsuario, removeGravarUsuario] =
    useLocalStorage("valorToken", "");
  const [carregando, setCarregando] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        removeGravarUsuario,
        gravarUsuario,
        setGravarUsuario,
        carregando,
        setCarregando,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function UseAuth() {
  const {
    removeGravarUsuario,
    gravarUsuario,
    setGravarUsuario,
    carregando,
    setCarregando,
  } = useContext(AuthContext);

  return {
    removeGravarUsuario,
    gravarUsuario,
    setGravarUsuario,
    carregando,
    setCarregando,
  };
}
