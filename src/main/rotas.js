import React from 'react'

import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'
import Cadastro from '../Views/cadastro'
import consultaLancamento from '../Views/lancamentos/consulta-lancamento'
import Home from '../Views/home'
import Login from '../Views/login'
import cadastroLancamento from '../Views/lancamentos/cadastro-lancamento'
import { AuthConsumer } from './provedorAutenticacao'



function RotaAutenticada({component : Component , isUsuarioAutenticado, ...props}){
    return(
        <Route {...props} render={(componentProps) => {
            if(isUsuarioAutenticado){
                return(
                    <Component {...componentProps} />
                )
            }else{
                return(
                    <Redirect to={{pathname : '/login', state : {from : componentProps.location}}} />
                )
            }
        }}></Route>
    )
}

function Rotas(props){
    return(
        <HashRouter>
            <Switch>  
                <Route path="/login" component={Login}/>
                <Route path="/cadastro" component={Cadastro}/>

                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home" component={Home}/>
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consulta-lancamentos" component={consultaLancamento}/>
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-lancamentos/:id?" component={cadastroLancamento}/>
            </Switch>
        </HashRouter>
    )
}

export default () => (
    <AuthConsumer>
        {(context) => (
            <Rotas isUsuarioAutenticado={context.isAutenticado}/>
        )}
    </AuthConsumer>
)