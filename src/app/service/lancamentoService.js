import ApiService from "../apiservices";
import ErroValidacao from "../exception/erroValidacao";


class LancamentoService extends ApiService{
    constructor(){
        super('/api/lancamentos')
    }

    obterListaMeses(){
        return [
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
    }

    obterListatipos(){
        return [
            {label: 'Selecione....' , value: ''},
            {label: 'Despesa', value: 'DESPESA'},
            {label: 'Receita', value: 'RECEITA'}
        ]
    }

    consultar(lancamentoFiltro){
        let params = `?ano=${lancamentoFiltro.ano}`

        if(lancamentoFiltro.mes){
            params = `${params}&mes=${lancamentoFiltro.mes}`
        }

        if(lancamentoFiltro.tipo){
            params = `${params}&tipo=${lancamentoFiltro.tipo}`
        }

        if(lancamentoFiltro.status){
            params = `${params}&status=${lancamentoFiltro.status}`
        }

        if(lancamentoFiltro.usuario){
            params = `${params}&usuario=${lancamentoFiltro.usuario}`
        }

        if(lancamentoFiltro.descricao){
            params = `${params}&descricao=${lancamentoFiltro.descricao}`
        }

        return this.get(params)
    }

    alterarStatus(id, status){
        return this.put(`/${id}/statusAtualizado`, {status})
    }

    validar(lancamento){
        const erros = [];

        if(!lancamento.descricao){
            erros.push("Informe uma descrição")
        }

        if(!lancamento.ano){
            erros.push("Informe o ano")
        }

        if(!lancamento.mes){
            erros.push("Informe o mês")
        }

        if(!lancamento.valor){
            erros.push("Informe um valor")
        }

        if(!lancamento.tipo){
            erros.push("Informe o tipo")
        }

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros)
        }
    }

    salvar(lancamento){
        return this.post('/', lancamento)
    }

    deletar(id){
        return this.delete(`/${id}`)
    }

    obterPorId(id){
        return this.get(`/${id}`)
    }

    alterar(lancamento){
        return this.put(`/${lancamento.id}`, lancamento)
    }
}

export default LancamentoService