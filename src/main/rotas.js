import React from 'react'

import { Route, Switch, HashRouter } from 'react-router-dom'
import Cadastro from '../Views/cadastro'
import consultaLancamento from '../Views/lancamentos/consulta-lancamento'
import Home from '../Views/home'
import Login from '../Views/login'
import cadastroLancamento from '../Views/lancamentos/cadastro-lancamento'


function Rotas(){
    return(
        <HashRouter>
            <Switch>
                <Route path="/home" component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/cadastro" component={Cadastro}/>
                <Route path="/consulta-lancamentos" component={consultaLancamento}/>
                <Route path="/cadastro-lancamentos" component={cadastroLancamento}/>
            </Switch>
        </HashRouter>
    )
}

export default Rotas