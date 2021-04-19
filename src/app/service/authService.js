import LocalstorageService from "./localstorageService";


class AuthService {

    static isUsuarioAutenticado(){
        const usuario = LocalstorageService.resgatar('_usuario_logado')
        return usuario && usuario.id;
    }

    static removerUsuarioLogado(){
        LocalstorageService.removerItem('_usuario_logado')
    }
}

export default AuthService