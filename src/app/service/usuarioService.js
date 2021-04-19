import ApiService from '../apiservices'
import ErroValidacao from '../exception/erroValidacao'

class UsuarioService extends ApiService{

    constructor(){
        super('/api/users')
    }

    autenticar(credenciais){
        return this.post('/autenticar', credenciais)
    }

    obterSaldoPorIdUsuario(idUsuario){
        return this.get(`/${idUsuario}/saldo`)
    }

    cadastrarUsuario(usuario){
        return this.post('/', usuario)
    }
    
    validar(usuario){
        const msg = []

        if(!usuario.nome){
            msg.push('O campo Nome é obrigatório')
        }

        if(!usuario.email){
            msg.push('O campo Email é obrigatório')
        }else if(!this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
            msg.push('O email incerido não é valido')
        }

        if(!usuario.senha){
            msg.push('O campo Senha é obrigatório')
        }

        if(!usuario.repetirSenha){
            msg.push('O campo Repita Senha é obrigatório')
        }

        if(usuario.senha !== usuario.repetirSenha){
            msg.push('As senhas digitadas tem que ser iguais')
        }

        if(msg && msg.length > 0){
            throw new ErroValidacao(msg)
        }
    }
}

export default UsuarioService