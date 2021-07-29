import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./paginas/login";
import Cadastro from "./paginas/cadastro";

function Rotas() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/usuarios" component={Cadastro} />
        </Switch>
      </Router>
    </div>
  );
}

export default Rotas;
