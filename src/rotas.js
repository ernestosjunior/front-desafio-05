import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./paginas/login";
import Cadastro from "./paginas/cadastro";
import { AuthProvider } from "./contexto/autorizacao";
import { UseAuth } from "./contexto/autorizacao";
import { FetchProvider } from "./contexto/regraDeNegocio";

function AuthPath(props) {
  const { token } = UseAuth();

  return (
    <Route render={() => (token ? props.children : <Redirect to="/login" />)} />
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
            <AuthPath></AuthPath>
          </Switch>
        </FetchProvider>
      </AuthProvider>
    </Router>
  );
}

export default Rotas;
