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
import { AuthProvider } from "./contexto/autorizacao";
import { UseAuth } from "./contexto/autorizacao";
import { FetchProvider } from "./contexto/regraDeNegocio";
import ConsumidorLogin from "./paginas/loginConsumidor";
import ConsumidorCadastro from "./paginas/cadastroConsumidor";
import { ClientAuthProvider } from "./contexto/autorizacaoConsumidores";
import { UseClientAuth } from "./contexto/autorizacaoConsumidores";
import ListaRestaurantes from "./paginas/listaRestaurantes";

function AuthPath(props) {
  const { gravarUsuario } = UseAuth();

  return (
    <Route
      render={() => (gravarUsuario ? props.children : <Redirect to="/login" />)}
    />
  );
}

function ClientAuthPath(props) {
  const { gravarConsumidor } = UseClientAuth();

  return (
    <Route
      render={() =>
        gravarConsumidor ? props.children : <Redirect to="/consumidor-login" />
      }
    />
  );
}

function Rotas() {
  return (
    <Router>
      <AuthProvider>
        <ClientAuthProvider>
          <FetchProvider>
            <Switch>
              <Route path="/login" exact component={Login} />
              <Route path="/usuarios" exact component={Cadastro} />
              <Route
                path="/consumidor-login"
                exact
                component={ConsumidorLogin}
              />
              <Route
                path="/consumidor-cadastro"
                component={ConsumidorCadastro}
              />
              <AuthPath>
                <Route path="/" exact component={Inicial} />
                <Route path="/novo-produto" exact component={NovoProduto} />
                <Route
                  path="/editar-produto/:id"
                  exact
                  component={EditarProduto}
                />
              </AuthPath>
              <ClientAuthPath>
                <Route
                  path="/lista-restaurantes"
                  exact
                  component={ListaRestaurantes}
                />
              </ClientAuthPath>
            </Switch>
          </FetchProvider>
        </ClientAuthProvider>
      </AuthProvider>
    </Router>
  );
}

export default Rotas;
