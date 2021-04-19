import React from 'react'
import { withRouter } from 'react-router-dom';
import LancamentoService from '../../app/service/lancamentoService';
import LocalstorageService from '../../app/service/localstorageService';
import Card from '../../Components/card';
import FormGroup from '../../Components/forme-group';
import SelectMenu from '../../Components/select-menu';
import * as messagens from '../../Components/toastr';


class CadastrarLancamento extends React.Component{

    state = {
        id: null,
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        valor : '',
        status : '',
        usuario: null,
        atualizando: false
    }

    componentDidMount(){
        const params = this.props.match.params
        if(params.id){
            this.service.obterPorId(params.id)
                .then(response => {
                    this.setState({...response.data, atualizando : true})
                }).catch(erro => {
                    if(erro.response && erro.response.data){
                        messagens.mensagemError(erro.response.data)
                    }       
                })
        }
    }

    atualizar = () =>{
        const { ano, mes, tipo, descricao, valor, id, usuario } = this.state;
        const lancamento = { ano, mes, tipo, descricao, valor, id, usuario };

        this.service.alterar(lancamento)
            .then(response =>{
                this.props.history.push('/consulta-lancamentos')
                messagens.mensagemSucesso("Lançamento editado com sucesso")
            }).catch(erro =>{
                messagens.mensagemError("Ocorreu um erro ao editar um lançamento")
            })

    }

    submit = () =>{

        const usuarioLogado = LocalstorageService.resgatar('_usuario_logado')
        const { ano, mes, tipo, descricao, valor } = this.state;
        const lancamento = { ano, mes, tipo, descricao, valor, usuario : usuarioLogado.id };

        try{
            this.service.validar(lancamento)
        }catch(erro){
            const msgs = erro.mensagens;
            msgs.forEach((msg, i) => {
                messagens.mensagemError(msg)
            });
            return false;
        }
        
        
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
            <Card title={this.state.atualizando ? 'Editar Lançamento' : 'Cadastrar Lançamento'}>

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
                        {this.state.atualizando ?
                            (
                                <button className="btn btn-primary" onClick={this.atualizar}>
                                   <i className="pi pi-refresh"></i> Atualizar
                                </button>
                            ) : (
                                <button className="btn btn-success" onClick={this.submit}>
                                   <i className="pi pi-save"></i> Cadastrar
                                </button>
                            )
                        }
                        <button className="btn btn-danger" onClick={e => this.props.history.push('/consulta-lancamentos')}>
                            <i className="pi pi-times"></i> Cancelar
                        </button>
                    </div>
                </div>
                
            </Card>
        )
    }
}

export default withRouter (CadastrarLancamento)