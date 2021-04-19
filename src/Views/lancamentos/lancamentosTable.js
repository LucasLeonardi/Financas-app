import React from 'react'
import currencyFormater from 'currency-formatter'

function LancamentoTable(props){

    const rows = props.lancamentos.map( lancamento => {
        return(
            <tr key={lancamento.id}>
                <td>{lancamento.descricao}</td>
                <td>{currencyFormater.format(lancamento.valor, {locale: 'pt-BR'})}</td>
                <td>{lancamento.tipo}</td>
                <td>{lancamento.mes}</td>
                <td>{lancamento.status}</td>
                <td>

                    <button type="button" 
                            className="btn btn-success" 
                            title="Efetivar"
                            onClick={e => props.atualizarStatus(lancamento, 'EFETIVADO')}>
                            <i className="pi pi-check p-mr-2"></i>
                    </button>

                    <button type="button" 
                            title="Cancelar"
                            className="btn btn-warning" 
                            onClick={e => props.atualizarStatus(lancamento, 'CANCELADO')}>
                            <i className="pi pi-times-circle p-mr-2"></i>
                    </button>

                    <button type="button" 
                            title="Excluir"
                            className="btn btn-danger" 
                            onClick={e => props.deletar(lancamento)}>
                            <i className="pi pi-trash p-mr-2"></i>
                    </button>

                    <button type="button" 
                            title="Editar"
                            className="btn btn-primary" 
                            onClick={e => props.editar(lancamento.id)}>
                            <i className="pi pi-pencil p-mr-2"></i>
                    </button>

                </td>
            </tr>
        )
    })

    return(
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Descrição</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Mês</th>
                    <th scope="col">Situação</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )

}

export default LancamentoTable