import React from 'react'
import { withRouter } from 'react-router-dom';
import LancamentoService from '../../app/service/lancamentoService';
import LocalstorageService from '../../app/service/localstorageService';
import Card from '../../Components/card';
import FormGroup from '../../Components/forme-group';
import SelectMenu from '../../Components/select-menu';
import LancamentoTable from './lancamentosTable';
import * as messagens from '../../Components/toastr';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

class CadastrarLancamento extends React.Component{

    state = {
        id: null,
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        valor : '',
        usuario: ''
    }

    submit = () =>{
        
        const usuarioLogado = LocalstorageService.resgatar('_usuario_logado')
        const { ano, mes, tipo, descricao, valor } = this.state;
        const lancamento = { ano, mes, tipo, descricao, valor, usuario : usuarioLogado.id };

        this.service.salvar(lancamento)
            .then(response =>{
                this.props.history.push('/consulta-lancamentos')
                messagens.mensagemSucesso("Lançamento cadastrado com sucesso")
            }).catch(erro =>{
                messagens.mensagemError("Ocorreu um erro ao salvar um lançamento")
            })
    }


    constructor(){
        super();
        this.service = new LancamentoService();
    }

    render(){

        const tipos = this.service.obterListatipos();
        const meses = this.service.obterListaMeses();

        return(
            <Card title="Cadastro de Lançamentos">

                <div className="row">
                    <div className="col-md-12">
                        <FormGroup id="inputDescricao" label="Descrição: *">
                            <input id="inputDescricao" 
                                   type="text" 
                                   className="form-control" 
                                   value={this.state.descricao}
                                   onChange={e => this.setState({descricao : e.target.value})}/>
                        </FormGroup>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputAno" label="Ano: *">
                            <input id="inputAno" 
                                   type="text" 
                                   value={this.state.ano}
                                   className="form-control" 
                                   onChange={e => this.setState({ano : e.target.value})} />
                        </FormGroup>
                    </div>

                    <div className="col-md-6">
                        <FormGroup id="inputMes" label="Mês: *">
                            <SelectMenu id="inputStatus" 
                                        lista={meses} 
                                        className="form-control" 
                                        value={this.state.mes}
                                        onChange={e => this.setState({mes : e.target.value})}/>
                        </FormGroup>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <FormGroup id="inputValor" label="Valor: *">
                            <input id="inputValor" 
                                   type="text" 
                                   className="form-control" 
                                   value={this.state.valor}
                                   onChange={e => this.setState({valor : e.target.value})}/>
                        </FormGroup>
                    </div>

                    <div className="col-md-4">
                        <FormGroup id="inputTipo" label="Tipo: *">
                            <SelectMenu id="inputTipo" 
                                        lista={tipos} 
                                        className="form-control" 
                                        value={this.state.tipo}
                                        onChange={e => this.setState({tipo : e.target.value})}/>
                        </FormGroup>
                    </div>

                    <div className="col-md-4">
                        <FormGroup id="inputStatus" label="Status: *">
                            
                        </FormGroup>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-md-6">
                        <button className="btn btn-success" onClick={this.submit}>Cadastrar</button>
                        <button className="btn btn-danger" onClick={this.props.history.push('/consulta-lancamentos')}>Cancelar</button>
                    </div>
                </div>
                
            </Card>
        )
    }
}

export default withRouter (CadastrarLancamento)