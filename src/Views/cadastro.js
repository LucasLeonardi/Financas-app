import React from 'react'
import Card from '../Components/card'
import FormGroup from '../Components/forme-group'

class Cadastro extends React.Component{

    state = {
        nome : '',
        email : '',
        senha : '',
        repetirSenha : ''
    }

    cadastrar = () => {
        console.log(this.state)
    }


    render(){
        return(
            <div className="container">
                <Card title="Cadastro de Usuario">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="bs-component">
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

                                <button type="button" className="btn btn-danger">
                                    Cancelar    
                                </button> 

                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }
}

export default Cadastro