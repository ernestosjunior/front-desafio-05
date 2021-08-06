import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./paginas/login";
import Cadastro from "./paginas/cadastro";
import Inicial from "./paginas/inicial";
import NovoProduto from "./paginas/novoProduto";
import EditarProduto from "./paginas/editarProduto";
import EditarPerfil from "./paginas/editarPerfil";
import { AuthProvider } from "./contexto/autorizacao";
import { UseAuth } from "./contexto/autorizacao";
import { FetchProvider } from "./contexto/regraDeNegocio";

function AuthPath(props) {
  const { gravarUsuario } = UseAuth();

  return (
    <Route
      render={() => (gravarUsuario ? props.children : <Redirect to="/login" />)}
    />
  );
}

function Rotas() {
  return (
    <Router>
      <AuthProvider>
        <FetchProvider>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/usuarios" component={Cadastro} />
            <AuthPath>
              <Route path="/" exact component={Inicial} />
              <Route path="/novo-produto" component={NovoProduto} />
              <Route path="/editar-produto/:id" component={EditarProduto} />
              <Route path="/editar-perfil" component={EditarPerfil} />
            </AuthPath>
          </Switch>
        </FetchProvider>
      </AuthProvider>
    </Router>
  );
}

export default Rotas;
