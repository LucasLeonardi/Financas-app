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

class ConsultaLancamento extends React.Component{

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        lancamentos: [],
        showConfirmDialoge: false,
        deletarLancamento: {}
    }

    buscar = () =>{

        if(!this.state.ano){
            messagens.mensagemError('O preenchimento do campo ANO é obrigatório')
            return false;
        }
        
        const usuarioLogado = LocalstorageService.resgatar('_usuario_logado')

        const lancamentoFiltro = {
            ano: this.state.ano ,
            mes: this.state.mes,
            tipo: this.state.tipo,
            usuario: usuarioLogado.id,
            descricao: this.state.descricao
        }

        this.service.consultar(lancamentoFiltro)
            .then(resposta => {
                this.setState({lancamentos: resposta.data})
            }).catch(erro => {
                console.log(erro)
            })
    }

    constructor(){
        super();
        this.service = new LancamentoService();
    }

    editar = (id) =>{
        console.log(id)
    }

    abrirConfirmacao = (lancamento) =>{
        this.setState({showConfirmDialoge : true, deletarLancamento : lancamento})
    }

    cancelarDeletarLancamento = () =>{
        this.setState({showConfirmDialoge : false, deletarLancamento : {}})
    }

    deletar = () =>{
        this.service.deletar(this.state.deletarLancamento.id)
            .then(response =>{
                this.setState({showConfirmDialoge : false})
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(this.state.deletarLancamento)
                lancamentos.splice(index, 1)
                this.setState(lancamentos)
                messagens.mensagemSucesso('Lancamento deletado com sucesso')
            }).catch(erro =>{
                this.setState({showConfirmDialoge : false})
                messagens.mensagemError('Ocorreu um erro ao tentar deletar um lancamento')
            })
    }

    render(){

        const confirmDialogeFooter = (
            <div>
                <Button label="Sim" icon="pi pi-check" onClick={this.deletar} autoFocus />
                <Button label="Não" icon="pi pi-times" onClick={this.cancelarDeletarLancamento} className="p-button-text" />
            </div>
        )

        const meses = this.service.obterListaMeses();

        const tipos = this.service.obterListatipos();

        return(
            <Card title = "Buscar Lançamentos">

                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">

                            <FormGroup htmlFor="inputAno" label="Ano: *">
                                <input  type="text" 
                                        className="form-control" 
                                        id="inputAno"
                                        value={this.state.ano}
                                        onChange={e => this.setState({ano: e.target.value})}
                                        placeholder="Digite o Ano"/>
                            </FormGroup>

                            <FormGroup htmlFor="inputDesc" label="Descrição: ">
                                <input  type="text" 
                                        className="form-control" 
                                        id="inputDesc"
                                        value={this.state.descricao}
                                        onChange={e => this.setState({descricao: e.target.value})}
                                        placeholder="Digite a Descrição"/>
                            </FormGroup>

                            <FormGroup htmlFor="inputMes" label="Mês:">
                                <SelectMenu id="inputMes" 
                                            value={this.state.mes}
                                            onChange={e => this.setState({mes: e.target.value})}  
                                            className="form-control" 
                                            lista={meses} />
                            </FormGroup>

                            <FormGroup htmlFor="inputTipo" label="Tipo:">
                                <SelectMenu id="inputTipo" 
                                            className="form-control" 
                                            value={this.state.tipo}
                                            onChange={e => this.setState({tipo: e.target.value})} 
                                            lista={tipos} />
                            </FormGroup>

                            <button onClick={this.buscar} className="btn btn-success">Buscar</button>
                            <button className="btn btn-danger">Cadastrar</button>

                        </div>
                    </div>
                </div>

                <br/>

                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentoTable lancamentos={this.state.lancamentos} 
                                             deletar={this.abrirConfirmacao}
                                             editar={this.editar} />
                        </div>
                    </div>
                </div>

                <div>
                    <Dialog header="ATENÇÃO" 
                            visible={this.state.showConfirmDialoge} 
                            style={{ width: '50vw' }} 
                            footer={confirmDialogeFooter}
                            onHide={() => this.setState({showConfirmDialoge : false})}>
                        <p>Deseja realmente excluir esse lançamento ?</p>
                    </Dialog>
                </div>

            </Card>
        )
    }
}

export default withRouter (ConsultaLancamento)