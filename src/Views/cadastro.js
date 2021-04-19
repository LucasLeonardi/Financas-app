import React from 'react'
import Card from '../Components/card'
import FormGroup from '../Components/forme-group'
import { withRouter } from 'react-router-dom';
import UsuarioService from '../app/service/usuarioService';
import { mensagemSucesso, mensagemError } from '../Components/toastr';

class Cadastro extends React.Component{

    state = {
        nome : '',
        email : '',
        senha : '',
        repetirSenha : ''
    }

    constructor(){
        super();
        this.usuarioService = new UsuarioService();
    }

    cadastrar = () => {
        const { nome, email, senha, repetirSenha } = this.state;
        const usuarioValidar = { nome, email, senha, repetirSenha };

        try{
            this.usuarioService.validar(usuarioValidar)
        }catch(erro){
            const msgs = erro.mensagens;
            msgs.forEach((msg, i) => {
                mensagemError(msg)
            });
            return false;
        }

        const usuario = {
            email: this.state.email,
            nome: this.state.nome,
            senha: this.state.senha
        }

        this.usuarioService.cadastrarUsuario(usuario)
            .then( response => {
                mensagemSucesso('Usuario cadastrado com sucesso, faça o login para continuar.')
                this.props.history.push('/login')
            }).catch( error => {
                if(error.response && error.response.data){
                    mensagemError(error.response.data)
                }
            })
    }

    encaminharLogin = () => {
        this.props.history.push('/login')
    }


    render(){
        return(
                <Card title="Cadastro de Usuario">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bs-component">
                                <FormGroup label="Nome *" htmlFor="inputName">
                                    <input  type="text"
                                            id="inputName" 
                                            name="nome"
                                            className="form-control"
                                            onChange={e => this.setState({nome : e.target.value})}/>
                                </FormGroup>

                                <FormGroup label="Email *" htmlFor="inputEmail">
                                    <input  type="email"
                                            id="inputEmail"
                                            name="email"
                                            className="form-control"
                                            onChange={e => this.setState({email : e.target.value})}/>
                                </FormGroup>
                                
                                <FormGroup label="Senha *" htmlFor="inputSenha">
                                    <input  type="password" 
                                            className="form-control" 
                                            id="inputSenha"
                                            onChange={e => this.setState({senha : e.target.value})}/>
                                </FormGroup>

                                <FormGroup label="Repita Senha *" htmlFor="inputRepetirSenha">
                                    <input  type="password" 
                                            className="form-control" 
                                            id="inputRepetirSenha" 
                                            onChange={e => this.setState({repetirSenha : e.target.value})}/>
                                </FormGroup> 

                                <button onClick={this.cadastrar} type="button" className="btn btn-success">
                                    Registrar
                                </button>

                                <button onClick={this.encaminharLogin} type="button" className="btn btn-danger">
                                    Cancelar    
                                </button> 

                            </div>
                        </div>
                    </div>
                </Card>
        )
    }
}

export default withRouter (Cadastro)