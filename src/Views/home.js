import React from 'react'
import UsuarioService from '../app/service/usuarioService'
import LocalstorageService from '../app/service/localstorageService'


class Home extends React.Component{

    state = {
        valor: 0
    }

    constructor(){
        super();
        this.usuarioService = new UsuarioService();
    }

    componentDidMount(){
        const usuarioLogado = LocalstorageService.resgatar('_usuario_logado')

        this.usuarioService.obterSaldoPorIdUsuario(usuarioLogado.id)
            .then(response => {
                this.setState({valor: response.data})
            }).catch(erro =>{
                console.log(erro.response)
            })
    }

    render(){
        return(
            <div className="jumbotron">
                <h1 className="display-3">Bem vindo!</h1>
                <p className="lead">Esse é seu sistema de finanças.</p>
                <p className="lead">Seu saldo para o mês atual é de R$ {this.state.valor}</p>
                <hr className="my-4"/>
                <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                <p className="lead">
                    <a  className="btn btn-primary btn-lg" 
                        href="#/cadastro" 
                        role="button">
                        <i className="fa fa-users"></i>  
                            Cadastrar Usuário
                    </a>
                    <a  className="btn btn-danger btn-lg" 
                        href="#/cadastro-lancamentos" 
                        role="button">
                        <i className="fa fa-users"></i>  
                            Cadastrar Lançamento
                    </a>
                </p>
            </div>
        )
    }
}

export default Home
