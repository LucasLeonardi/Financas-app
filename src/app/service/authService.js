import LocalstorageService from "./localstorageService";


class AuthService {

    static isUsuarioAutenticado(){
        const usuario = LocalstorageService.resgatar('_usuario_logado')
        return usuario && usuario.id;
    }

    static removerUsuarioLogado(){
        LocalstorageService.removerItem('_usuario_logado')
    }

    static logar(usuario){
        LocalstorageService.adicionar('_usuario_logado', usuario)
    }

    static obterUsuarioAutenticado(){
        return LocalstorageService.resgatar('_usuario_logado')
    }
}

export default AuthService