import ApiService from '../apiservices'

class UsuarioService extends ApiService{

    constructor(){
        super('/api/users')
    }

    autenticar(credenciais){
        return this.post('/autenticar', credenciais)
    }

    obterSaldoPorIdUsuario(idUsuario){
        return this.get(`/${idUsuario}/saldo`);
    }
}

export default UsuarioService