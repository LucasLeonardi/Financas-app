import React from 'react'

import { Route, Switch, HashRouter } from 'react-router-dom'
import Cadastro from '../Views/cadastro'
import Login from '../Views/login'

function Rotas(){
    return(
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/cadastro" component={Cadastro}/>
            </Switch>
        </HashRouter>
    )
}

export default Rotas