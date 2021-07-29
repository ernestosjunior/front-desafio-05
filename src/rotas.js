import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./paginas/login";
import Cadastro from "./paginas/cadastro";
import Inicial from "./paginas/inicial";

function Rotas() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Inicial} />
          <Route path="/login" component={Login} />
          <Route path="/usuarios" component={Cadastro} />
        </Switch>
      </Router>
    </div>
  );
}

export default Rotas;
