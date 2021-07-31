import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./paginas/login";
import Cadastro from "./paginas/cadastro";
import Inicial from "./paginas/inicial";
import NovoProduto from "./paginas/novoProduto";

function Rotas() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Inicial} />
          <Route path="/login" component={Login} />
          <Route path="/usuarios" component={Cadastro} />
          <Route path="/novo-produto" component={NovoProduto} />
        </Switch>
      </Router>
    </div>
  );
}

export default Rotas;