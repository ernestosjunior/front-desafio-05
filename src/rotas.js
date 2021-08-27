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
              <Route exact path="/login" component={Login} />
              <Route exact path="/usuarios" component={Cadastro} />
              <Route
                exact
                path="/consumidor-login"
                component={ConsumidorLogin}
              />
              <Route
                path="/consumidor-cadastro"
                component={ConsumidorCadastro}
              />
              <AuthPath>
                <Route exact path="/" component={Inicial} />
                <Route exact path="/novo-produto" component={NovoProduto} />
                <Route
                  exact
                  path="/editar-produto/:id"
                  component={EditarProduto}
                />
              </AuthPath>
              <ClientAuthPath>
                <Route
                  exact
                  path="/lista-restaurantes"
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
