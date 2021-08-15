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
              <Route path="/login" component={Login} />
              <Route path="/usuarios" component={Cadastro} />
              <Route path="/consumidor-login" component={ConsumidorLogin} />
              <Route
                path="/consumidor-cadastro"
                component={ConsumidorCadastro}
              />
              <AuthPath>
                <Route path="/" exact component={Inicial} />
                <Route path="/novo-produto" component={NovoProduto} />
                <Route path="/editar-produto/:id" component={EditarProduto} />
              </AuthPath>
              <ClientAuthPath>
                <Route
                  path="/lista-produtos"
                  //component={}
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
