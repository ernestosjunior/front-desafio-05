import { useContext, createContext } from "react";
import { useLocalStorage } from "react-use";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [gravarUsuario, setGravarUsuario, removeGravarUsuario] =
    useLocalStorage("valorToken", "");

  return (
    <AuthContext.Provider
      value={{
        removeGravarUsuario,
        gravarUsuario,
        setGravarUsuario,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function UseAuth() {
  const { removeGravarUsuario, gravarUsuario, setGravarUsuario } =
    useContext(AuthContext);

  return {
    removeGravarUsuario,
    gravarUsuario,
    setGravarUsuario,
  };
}
