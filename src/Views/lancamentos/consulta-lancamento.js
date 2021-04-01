import React from 'react'
import { withRouter } from 'react-router-dom';
import LancamentoService from '../../app/service/lancamentoService';
import LocalstorageService from '../../app/service/localstorageService';
import Card from '../../Components/card';
import FormGroup from '../../Components/forme-group';
import SelectMenu from '../../Components/select-menu';
import LancamentoTable from './lancamentosTable';

class ConsultaLancamento extends React.Component{

    state = {
        ano: '',
        mes: '',
        tipo: '',
        lancamentos: []
    }

    buscar = () =>{
        const usuarioLogado = LocalstorageService.resgatar('_usuario_logado')

        const lancamentoFiltro = {
            ano: this.state.ano ,
            mes: this.state.mes,
            tipo: this.state.tipo,
            usuario: usuarioLogado.id
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

    render(){

        const meses = [
            {label: 'Selecione....' , value: ''},
            {label: 'Janeiro' , value: 1},
            {label: 'Favereiro' , value: 2},
            {label: 'Março' , value: 3},
            {label: 'Abril', value: 4},
            {label: 'Maio', value: 5},
            {label: 'Junho', value: 6},
            {label: 'Julho', value: 7},
            {label: 'Agosto', value: 8},
            {label: 'Setembro', value: 9},
            {label: 'Outubro', value: 10},
            {label: 'Novembro', value: 11},
            {label: 'Dezembro', value: 12}
        ]

        const tipos = [
            {label: 'Selecione....' , value: ''},
            {label: 'Despesa', value: 'DESPESA'},
            {label: 'Receita', value: 'RECEITA'}
        ]

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
                            <LancamentoTable lancamentos={this.state.lancamentos} />
                        </div>
                    </div>
                </div>

            </Card>
        )
    }
}

export default withRouter (ConsultaLancamento)