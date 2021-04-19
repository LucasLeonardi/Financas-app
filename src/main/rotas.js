import React from 'react'

import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'
import Cadastro from '../Views/cadastro'
import consultaLancamento from '../Views/lancamentos/consulta-lancamento'
import Home from '../Views/home'
import Login from '../Views/login'
import cadastroLancamento from '../Views/lancamentos/cadastro-lancamento'
import AuthService from '../app/service/authService'


const IsUsuarioAutenticado = () => {
    return false;
}


function RotaAutenticada({component : Component , ...props}){
    return(
        <Route {...props} render={(componentProps) => {
            if(AuthService.isUsuarioAutenticado()){
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

function Rotas(){
    return(
        <HashRouter>
            <Switch>  
                <Route path="/login" component={Login}/>
                <Route path="/cadastro" component={Cadastro}/>

                <RotaAutenticada path="/home" component={Home}/>
                <RotaAutenticada path="/consulta-lancamentos" component={consultaLancamento}/>
                <RotaAutenticada path="/cadastro-lancamentos/:id?" component={cadastroLancamento}/>
            </Switch>
        </HashRouter>
    )
}

export default Rotas