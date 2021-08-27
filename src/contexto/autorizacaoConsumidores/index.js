import { useContext, createContext } from "react";
import { useLocalStorage } from "react-use";

const ClientAuthContext = createContext();

export function ClientAuthProvider({ children }) {
  const [gravarConsumidor, setGravarConsumidor, removeGravarConsumidor] =
    useLocalStorage("valorTokenConsumidor", "");

  return (
    <ClientAuthContext.Provider
      value={{
        removeGravarConsumidor,
        gravarConsumidor,
        setGravarConsumidor,
      }}
    >
      {children}
    </ClientAuthContext.Provider>
  );
}

export function UseClientAuth() {
  const { removeGravarConsumidor, gravarConsumidor, setGravarConsumidor } =
    useContext(ClientAuthContext);

  return {
    removeGravarConsumidor,
    gravarConsumidor,
    setGravarConsumidor,
  };
}
